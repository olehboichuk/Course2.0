import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TopicModel} from '../models/topic.model';
import {ArticleModel} from '../models/article.model';
import {ArticlesModel} from '../models/articles.model';

@Injectable({
  providedIn: 'root'
})

export class ArticleService {
  // URIs
  private topicsURL = '/api/topics';
  private articleURL = '/api/articles';


  constructor(private http: HttpClient) {
  }

  getTopics() {
    return this.http.get<TopicModel[]>(this.topicsURL);
  }

  createArticle(article: ArticleModel) {
    return this.http.post(this.articleURL, article);
  }

  getArticles() {
    return this.http.get<ArticlesModel[]>(this.articleURL);
  }

  deleteArticleById(id: number) {
    return this.http.delete(this.articleURL + '/' + id);
  }

  getArticleById(id: number) {
    return this.http.get<ArticlesModel>(this.articleURL + '/' + id);
  }

  editArticle(article: ArticleModel) {
    return this.http.put(this.articleURL, article);
  }
}
