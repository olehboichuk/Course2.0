export interface LessonModel {
  id: number;
  id_teacher: number;
  id_language: number;
  id_topic: number;
  title: string;
  start_time: Date;
  duration_minutes: number;
  min_attendees: number;
  max_attendees: number;
  description: string;
}
