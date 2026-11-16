import { Routes } from '@angular/router';
import { AlumnoDetailComponent } from './alumnos/alumno-detail.component';
import { AlumnoFormComponent } from './alumnos/alumno-form.component';
import { AlumnosListComponent } from './alumnos/alumnos-list.component';
import { PostDetailComponent } from './posts/post-detail.component';
import { PostFormComponent } from './posts/post-form.component';
import { PostsListComponent } from './posts/posts-list.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'alumnos' },
  { path: 'alumnos', component: AlumnosListComponent },
  { path: 'alumnos/nuevo', component: AlumnoFormComponent },
  { path: 'alumnos/:id/editar', component: AlumnoFormComponent },
  { path: 'alumnos/:id', component: AlumnoDetailComponent },
  { path: 'posts', component: PostsListComponent },
  { path: 'posts/nuevo', component: PostFormComponent },
  { path: 'posts/:id/editar', component: PostFormComponent },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: '**', redirectTo: 'alumnos' },
];
