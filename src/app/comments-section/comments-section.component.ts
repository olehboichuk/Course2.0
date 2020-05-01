import {Component, OnInit} from '@angular/core';
import {CommentModel} from '../models/comment.model';
import {ActivatedRoute, Router} from '@angular/router';
import {LessonService} from '../services/lesson.service';
import * as jwt_decode from 'jwt-decode';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.scss']
})
export class CommentsSectionComponent implements OnInit {

  newComment = '';
  comments: CommentModel[];
  userId: number;
  lessonId: number;

  constructor(private snackBar: MatSnackBar,
              private router: Router,
              private lessonService: LessonService,
              private route: ActivatedRoute,
              public userService: UserService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.lessonId = +params['lessonId'];
      this.userId = jwt_decode(localStorage.getItem('token')).id;
      this.loadComments();
      this.refreshData();
    });
  }

  private loadComments() {
    this.lessonService.getAllComments(this.lessonId).subscribe(comments => {
      this.comments = comments;
    });
  }

  private refreshData() {
    setInterval(() => {
      this.loadComments();
    }, 5000);
  }

  addComment() {
    if (this.newComment.trim() === '') {
      return;
    }
    const comment = <CommentModel> {
      id_author: this.userId,
      id_lesson: this.lessonId,
      contents: this.newComment,
      time_posted: new Date()
    };
    this.lessonService.addComment(comment).subscribe(res => {
      this.newComment = '';
      this.loadComments();
    });
  }

  redirectToProfile(id: number) {
    if (this.userId != id) {
      this.userService.getUserRoleById(id).subscribe(data => {
        let roles = [];
        for (const i in data) {
          roles[i] = data[i].name;
        }
        if (roles.includes('TEACHER')) {
          this.router.navigate(['/teacher-profile', id]);
        } else if (roles.includes('STUDENT')) {
          this.router.navigate(['/student-profile', id]);
        }
      });
    }
  }

  deleteMyComment(comment: CommentModel) {
    this.lessonService.deleteComment(comment.id).subscribe(data => {
        this.comments.splice(this.comments.indexOf(comment), 1);
        this.snackBar.open('Deleted a comment');
      },
      error => {
        this.snackBar.open('Error!');
      }
    )
  }

}
