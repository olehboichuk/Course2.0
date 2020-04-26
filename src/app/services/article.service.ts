import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TopicModel} from '../models/topic.model';
import {ArticleModel} from '../models/article.model';
import {ArticlesModel} from '../models/articles.model';
import {Router} from '@angular/router';
import {Uris} from './uris';
import {LessonModel} from '../models/lesson.model';

@Injectable({
  providedIn: 'root'
})

export class ArticleService {

  constructor(private http: HttpClient, private uri: Uris) {
  }

  getTopics() {
    return this.http.get<TopicModel[]>(this.uri.topicsURL);
  }

  createArticle(article: ArticleModel) {
    return this.http.post(this.uri.articleURL, article);
  }

  getArticles() {
    return this.http.get<ArticlesModel[]>(this.uri.articleURL);
  }

  deleteArticleById(id: number) {
    return this.http.delete(this.uri.articleURL + '/' + id);
  }

  getArticleById(id: number) {
    return this.http.get<ArticlesModel>(this.uri.articleURL + '/' + id);
  }

  editArticle(article: ArticleModel) {
    return this.http.put(this.uri.articleURL, article);
  }

  createLesson(lesson: LessonModel) {
    return this.http.post(this.uri.lessonURL, lesson);
  }
}
