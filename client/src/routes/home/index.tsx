import { Container } from "@/components/ui";

import UploadForm from "./components/upload-form";
import styles from "./styles.module.css";

export default function Home() {
  return (
    <section className={styles.home}>
      <Container className={styles.home__container}>
        <h2 className={styles.home__title}>Sistema de carga de datos</h2>
        <p className={styles.home__text}>
          Selecciona un archivo CSV para cargar.
        </p>
        <UploadForm />
      </Container>
    </section>
  );
}
