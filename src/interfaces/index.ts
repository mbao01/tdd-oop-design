export interface Quiz {
  id?: string;
  title: string;
  courseCode?: string;
  questions: Question[];
}

export interface Question {
  question: string;
  choices: string[];
  answer?: number[]; // Provided by Teacher
  submission?: number[]; // Provided by Student
}

export interface GradePoint {
  grade: string;
  point: number;
}
