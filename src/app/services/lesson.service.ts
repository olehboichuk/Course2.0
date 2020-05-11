import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Uris} from './uris';
import {LessonModel} from '../models/lesson.model';
import {CommentModel} from '../models/comment.model';
import {map} from 'rxjs/operators';
// @ts-ignore
import {Response} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LessonService {

  constructor(private http: HttpClient, private uri: Uris) {
  }

  createLesson(lesson: LessonModel) {
    return this.http.post(this.uri.lessonURL, lesson);
  }

  updateLesson(lesson: LessonModel) {
    return this.http.put(this.uri.lessonURL, lesson);
  }

  getLessons() {
    return this.http.get<LessonModel[]>(this.uri.lessonURL);
  }

  terminateLesson(id: number) {
    return this.http.delete(this.uri.lessonURL + '/' + id);
  }

  getLessonById(id: number) {
    return this.http.get<LessonModel>(this.uri.lessonURL + '/' + id);
  }

  joinLesson(id: number) {
    return this.http.get(this.uri.joinURL + id);
  }

  leaveLesson(id: number) {
    return this.http.delete(this.uri.joinURL + id);
  }


  getAllComments(id: number) {
    return this.http.get<CommentModel[]>(this.uri.commentsURL + '/' + id);
  }

  deleteComment(id: number) {
    return this.http.delete(this.uri.commentsURL + '/' + id);
  }

  addComment(comment: CommentModel) {
    return this.http.post<CommentModel>(this.uri.commentsURL + '/' + comment.id_lesson, comment)
      .pipe(map((response: Response) => response) );
  }

}
