export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  age: number | null;
  createdAt: string;
  updatedAt: string;
}

export type UserDto = Omit<User, "password">;

export function toUserDto(user: User): UserDto {
  const { password: _, ...userDto } = user;
  return userDto;
}
