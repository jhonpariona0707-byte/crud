import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlumnoInput } from '../api/models';
import { BlogApiService, getApiErrorMessage } from '../api/blog-api.service';

@Component({
  selector: 'app-alumno-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './alumno-form.component.html',
})
export class AlumnoFormComponent implements OnInit {
  private readonly api = inject(BlogApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  alumno: AlumnoInput = { nombre: '', apellido: '', edad: null, correo: '' };
  id: number | null = null;
  loading = false;
  saving = false;
  errorMessage = '';

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam === null) {
      return;
    }

    const id = Number(idParam);
    if (!Number.isInteger(id) || id < 1) {
      this.errorMessage = 'El identificador del alumno no es válido.';
      return;
    }

    this.id = id;
    this.loading = true;
    this.api.getAlumno(id).subscribe({
      next: (alumno) => {
        this.alumno = {
          nombre: alumno.nombre,
          apellido: alumno.apellido,
          edad: alumno.edad,
          correo: alumno.correo,
        };
        this.loading = false;
      },
      error: (error: unknown) => {
        this.errorMessage = getApiErrorMessage(error);
        this.loading = false;
      },
    });
  }

  save(): void {
    this.saving = true;
    this.errorMessage = '';
    const request = this.id === null
      ? this.api.createAlumno(this.alumno)
      : this.api.updateAlumno(this.id, this.alumno);

    request.subscribe({
      next: (alumno) => {
        void this.router.navigate(['/alumnos', alumno.id]);
      },
      error: (error: unknown) => {
        this.errorMessage = getApiErrorMessage(error);
        this.saving = false;
      },
    });
  }
}
