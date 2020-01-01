import { Student } from "./student";
import { Quiz } from "./interfaces";

export class Course {
  private _code: string;
  private _title: string;
  private _credit: number;
  private _quizzes: Quiz[]; // does not include answer property
  private _solutions: Quiz[]; // includes answer property
  private _students: Student[];

  constructor(code: string, title: string, credit: number) {
    this._code = code;
    this._title = title;
    this._credit = credit;
    this._quizzes = [];
    this._solutions = [];
    this._students = [];
  }

  get code() {
    return this._code;
  }

  get profile() {
    return { code: this._code, title: this._title, credit: this._credit };
  }

  get quizzes() {
    return this._quizzes;
  }

  get solutions() {
    return this._solutions;
  }

  get students() {
    return this._students;
  }

  addQuiz(quiz: Quiz) {
    const solution = {
      ...quiz,
      id: (this._quizzes.length + 1).toString(),
      courseCode: this._code
    };

    const _quiz = {
      ...quiz,
      id: (this._quizzes.length + 1).toString(),
      questions: quiz.questions.map(({ question, choices }) => ({
        question,
        choices
      })),
      courseCode: this._code
    };

    this._solutions.push(solution);

    this._quizzes.push(_quiz);

    return _quiz;
  }

  registerStudent(student: Student) {
    const studentIndex = this._students.findIndex(
      ({ email }) => email == student.email
    );

    if (studentIndex < 0) {
      student.takeCourse(this);
      this._students.push(student);
      return "Student added to course";
    } else {
      throw new Error("Student already registered for course");
    }
  }
}
