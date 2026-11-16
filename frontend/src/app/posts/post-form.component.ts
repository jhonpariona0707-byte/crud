import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostInput } from '../api/models';
import { BlogApiService, getApiErrorMessage } from '../api/blog-api.service';

@Component({
  selector: 'app-post-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './post-form.component.html',
})
export class PostFormComponent implements OnInit {
  private readonly api = inject(BlogApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  post: PostInput = { title: '', content: '' };
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
      this.errorMessage = 'El identificador del post no es válido.';
      return;
    }

    this.id = id;
    this.loading = true;
    this.api.getPost(id).subscribe({
      next: (post) => {
        this.post = { title: post.title, content: post.content };
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
      ? this.api.createPost(this.post)
      : this.api.updatePost(this.id, this.post);

    request.subscribe({
      next: (post) => {
        void this.router.navigate(['/posts', post.id]);
      },
      error: (error: unknown) => {
        this.errorMessage = getApiErrorMessage(error);
        this.saving = false;
      },
    });
  }
}
