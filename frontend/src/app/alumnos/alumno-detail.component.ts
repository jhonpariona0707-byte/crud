import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Alumno } from '../api/models';
import { BlogApiService, getApiErrorMessage } from '../api/blog-api.service';

@Component({
  selector: 'app-alumno-detail',
  imports: [RouterLink],
  templateUrl: './alumno-detail.component.html',
})
export class AlumnoDetailComponent implements OnInit {
  private readonly api = inject(BlogApiService);
  private readonly route = inject(ActivatedRoute);

  alumno: Alumno | null = null;
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isInteger(id) || id < 1) {
      this.errorMessage = 'El identificador del alumno no es válido.';
      this.loading = false;
      return;
    }

    this.api.getAlumno(id).subscribe({
      next: (alumno) => {
        this.alumno = alumno;
        this.loading = false;
      },
      error: (error: unknown) => {
        this.errorMessage = getApiErrorMessage(error);
        this.loading = false;
      },
    });
  }
}
