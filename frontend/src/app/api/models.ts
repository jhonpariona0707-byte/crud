export interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  edad: number | null;
  correo: string;
}

export type AlumnoInput = Omit<Alumno, 'id'>;

export interface Post {
  id: number;
  title: string;
  content: string;
}

export type PostInput = Omit<Post, 'id'>;
