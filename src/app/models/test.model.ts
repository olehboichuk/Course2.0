import {QuestionModel} from './question.model';
import {UserAnswerModel} from './userAnswer.model';

export class TestModel {
  public id: number;
  public id_author: number;
  public test_name: string;
  public questions: QuestionModel[];
  public top_user_answer: UserAnswerModel[];
  public time_posted: Date;
  public questions_number: number;
  public teacher_login: string;
  public teacher_first_name: string;
  public teacher_last_name: string;
}
