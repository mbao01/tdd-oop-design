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

export interface Report {
  age: number;
  name: string;
  email: string;
  courses: {
    code: string;
    title: string;
    score?: number; // expressed in percentage
    credit: number;
    grade?: string;
    point?: number;
    quizzes: {
      id: string;
      title: string;
      score: number; // expressed in percentage
    }[];
  }[];
  totalCredits?: number;
  totalPoints?: number;
  cgpa?: string | number;
  degree?: string;
}
