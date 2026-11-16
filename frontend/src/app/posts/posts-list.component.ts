import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '../api/models';
import { BlogApiService, getApiErrorMessage } from '../api/blog-api.service';

@Component({
  selector: 'app-posts-list',
  imports: [RouterLink],
  templateUrl: './posts-list.component.html',
})
export class PostsListComponent implements OnInit {
  private readonly api = inject(BlogApiService);

  posts: Post[] = [];
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.api.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.loading = false;
      },
      error: (error: unknown) => {
        this.errorMessage = getApiErrorMessage(error);
        this.loading = false;
      },
    });
  }

  deletePost(post: Post): void {
    if (!window.confirm(`¿Eliminar "${post.title}"?`)) {
      return;
    }

    this.api.deletePost(post.id).subscribe({
      next: () => {
        this.posts = this.posts.filter((item) => item.id !== post.id);
      },
      error: (error: unknown) => {
        this.errorMessage = getApiErrorMessage(error);
      },
    });
  }
}
