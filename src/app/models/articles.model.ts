import {TopicModel} from "./topic.model";

export interface ArticlesModel {
  id: number;
  id_title: string;
  contents: string;
  topics: TopicModel[];
  time_posted: string;
  id_author: number;
  teacher_login: string;
  teacher_first_name: string;
  teacher_last_name: string;
  teacher_rate: number;
  teacher_num_rates: number;
}
