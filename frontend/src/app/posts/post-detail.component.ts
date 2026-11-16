import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Post } from '../api/models';
import { BlogApiService, getApiErrorMessage } from '../api/blog-api.service';

@Component({
  selector: 'app-post-detail',
  imports: [RouterLink],
  templateUrl: './post-detail.component.html',
})
export class PostDetailComponent implements OnInit {
  private readonly api = inject(BlogApiService);
  private readonly route = inject(ActivatedRoute);

  post: Post | null = null;
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isInteger(id) || id < 1) {
      this.errorMessage = 'El identificador del post no es válido.';
      this.loading = false;
      return;
    }

    this.api.getPost(id).subscribe({
      next: (post) => {
        this.post = post;
        this.loading = false;
      },
      error: (error: unknown) => {
        this.errorMessage = getApiErrorMessage(error);
        this.loading = false;
      },
    });
  }
}
