export interface LessonModel {
  id: number;
  id_teacher: number;
  id_language: number;
  id_topic: number;
  id_state: number;
  title: string;
  if_user_joined: number;
  start_time: Date;
  duration_minutes: number;
  min_attendees: number;
  max_attendees: number;
  description: string;
  teacher_login: string;
  teacher_first_name: string;
  teacher_last_name: string;
  teacher_rate: number;
  teacher_num_rates: number;
  language_name: string;
  topic_name: string;
  users_join: number;
}
