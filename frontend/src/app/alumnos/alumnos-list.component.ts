import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Alumno } from '../api/models';
import { BlogApiService, getApiErrorMessage } from '../api/blog-api.service';

@Component({
  selector: 'app-alumnos-list',
  imports: [RouterLink],
  templateUrl: './alumnos-list.component.html',
})
export class AlumnosListComponent implements OnInit {
  private readonly api = inject(BlogApiService);

  alumnos: Alumno[] = [];
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.api.getAlumnos().subscribe({
      next: (alumnos) => {
        this.alumnos = alumnos;
        this.loading = false;
      },
      error: (error: unknown) => {
        this.errorMessage = getApiErrorMessage(error);
        this.loading = false;
      },
    });
  }

  deleteAlumno(alumno: Alumno): void {
    if (!window.confirm(`¿Eliminar a ${alumno.nombre} ${alumno.apellido}?`)) {
      return;
    }

    this.api.deleteAlumno(alumno.id).subscribe({
      next: () => {
        this.alumnos = this.alumnos.filter((item) => item.id !== alumno.id);
      },
      error: (error: unknown) => {
        this.errorMessage = getApiErrorMessage(error);
      },
    });
  }
}
