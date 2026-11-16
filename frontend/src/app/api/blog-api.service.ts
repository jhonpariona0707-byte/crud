import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno, AlumnoInput, Post, PostInput } from './models';

@Injectable({ providedIn: 'root' })
export class BlogApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/v1';

  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(`${this.baseUrl}/alumnos`);
  }

  getAlumno(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.baseUrl}/alumnos/${id}`);
  }

  createAlumno(alumno: AlumnoInput): Observable<Alumno> {
    return this.http.post<Alumno>(`${this.baseUrl}/alumnos`, { alumno });
  }

  updateAlumno(id: number, alumno: AlumnoInput): Observable<Alumno> {
    return this.http.patch<Alumno>(`${this.baseUrl}/alumnos/${id}`, { alumno });
  }

  deleteAlumno(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/alumnos/${id}`);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts`);
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`);
  }

  createPost(post: PostInput): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/posts`, { post });
  }

  updatePost(id: number, post: PostInput): Observable<Post> {
    return this.http.patch<Post>(`${this.baseUrl}/posts/${id}`, { post });
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/posts/${id}`);
  }
}

export function getApiErrorMessage(error: unknown): string {
  if (!(error instanceof HttpErrorResponse)) {
    return 'Ocurrió un error inesperado.';
  }

  if (error.status === 0) {
    return 'No se pudo conectar con Rails. Comprueba que el servidor esté iniciado.';
  }

  const body: unknown = error.error;
  if (body && typeof body === 'object') {
    const messages = Object.values(body).flatMap((value) =>
      Array.isArray(value) ? value.map(String) : [],
    );
    if (messages.length > 0) {
      return messages.join(' ');
    }
  }

  return `La solicitud falló (HTTP ${error.status}).`;
}
