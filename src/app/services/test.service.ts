import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TopicModel} from '../models/topic.model';
import {ArticleModel} from '../models/article.model';
import {ArticlesModel} from '../models/articles.model';
import {Uris} from './uris';
import {TestModel} from '../models/test.model';
import {UserAnswerModel} from '../models/userAnswer.model';

@Injectable({
  providedIn: 'root'
})

export class TestService {

  constructor(private http: HttpClient, private uri: Uris) {
  }

  getTests() {
    return this.http.get<TestModel[]>(this.uri.testURL);
  }

  createTest(test: TestModel) {
    return this.http.post(this.uri.testURL, test);
  }

  deleteTestById(id: number) {
    return this.http.delete(this.uri.testURL + '/' + id);
  }

  getTestById(id: number) {
    return this.http.get<TestModel>(this.uri.testURL + '/' + id);
  }

  editTest(test: TestModel) {
    return this.http.put(this.uri.testURL, test);
  }

  addUserAnswers(user_answer: UserAnswerModel) {
    return this.http.post(this.uri.userTestURL, user_answer);
  }

  ifUserPassTest(id_test: number) {
    return this.http.get<UserAnswerModel[]>(this.uri.userTestURL +'/'+ id_test);
  }
}
