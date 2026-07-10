import Papa from "papaparse";
import { usersRepository } from "@/repositories/users.repository.js";
import { toUserDto } from "@/models/user.model.js";
import { BadRequestError } from "@/shared/errors.js";
import type { NextFunction, Request, Response } from "express";

interface CsvRow {
  name?: string;
  email?: string;
  age?: string;
}

interface RowError {
  row: number;
  details: Record<string, string>;
}

function validateRow(row: CsvRow) {
  const errors: Record<string, string> = {};

  if (!row.name?.trim()) {
    errors["name"] = "El campo 'name' no puede estar vacío.";
  }

  if (!row.email?.trim()) {
    errors["email"] = "El campo 'email' no puede estar vacío.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email.trim())) {
    errors["email"] = "El formato del campo 'email' es inválido.";
  }

  if (row.age !== undefined && row.age !== "") {
    const ageNum = Number(row.age);
    if (!Number.isInteger(ageNum) || ageNum <= 0) {
      errors["age"] = "El campo 'age' debe ser un número positivo.";
    }
  }

  return errors;
}

export const uploadController = {
  async upload(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        throw new BadRequestError("No se envió ningún archivo.");
      }

      const csvString = req.file.buffer.toString("utf-8");
      const parsed = Papa.parse<CsvRow>(csvString, {
        header: true,
        skipEmptyLines: true,
      });

      const success = [];
      const errors: RowError[] = [];

      for (let i = 0; i < parsed.data.length; i++) {
        const row = parsed.data[i]!;
        const rowErrors = validateRow(row);

        if (Object.keys(rowErrors).length > 0) {
          errors.push({ row: i + 1, details: rowErrors });
          continue;
        }

        const age = row.age ? parseInt(row.age, 10) : null;

        try {
          const user = await usersRepository.createFromCsv({
            name: row.name!.trim(),
            email: row.email!.trim(),
            age,
          });
          success.push(toUserDto(user));
        } catch (dbError: unknown) {
          const message =
            dbError instanceof Error &&
            dbError.message.includes("unique")
              ? "El email ya está registrado."
              : "Error al crear el usuario.";
          errors.push({ row: i + 1, details: { email: message } });
        }
      }

      return res.status(200).json({ ok: true, data: { success, errors } });
    } catch (error) {
      return next(error);
    }
  },
};
