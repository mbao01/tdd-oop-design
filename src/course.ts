import { Student } from "./student";
import { Quiz } from "./interfaces";

/**
 * Course Class
 *
 * @export
 * @class Course
 */
export class Course {
  private _code: string;
  private _title: string;
  private _credit: number;
  private _quizzes: Quiz[]; // does not include answer property
  private _solutions: Quiz[]; // includes answer property
  private _students: Student[];

  /**
   * Creates an instance of Course.
   *
   * @param {string} code
   * @param {string} title
   * @param {number} credit
   * @memberof Course
   */
  constructor(code: string, title: string, credit: number) {
    this._code = code;
    this._title = title;
    this._credit = credit;
    this._quizzes = [];
    this._solutions = [];
    this._students = [];
  }

  /**
   * get course code
   *
   * @readonly
   * @type {string}
   * @memberof Course
   */
  get code(): string {
    return this._code;
  }

  /**
   * get course profile
   *
   * @readonly
   * @type {{ code: string; title: string; credit: number }}
   * @memberof Course
   */
  get profile(): { code: string; title: string; credit: number } {
    return { code: this._code, title: this._title, credit: this._credit };
  }

  /**
   * get quizzes under course
   *
   * @readonly
   * @type {Quiz[]}
   * @memberof Course
   */
  get quizzes(): Quiz[] {
    return this._quizzes;
  }

  /**
   * marking guide: get quizzes with solution to each question
   *
   * @readonly
   * @type {Quiz[]}
   * @memberof Course
   */
  get solutions(): Quiz[] {
    return this._solutions;
  }

  /**
   * get all students taking this course
   *
   * @readonly
   * @type {Student[]}
   * @memberof Course
   */
  get students(): Student[] {
    return this._students;
  }

  /**
   * add a new/unique quiz to the course and returns added quiz
   *
   * @param {Quiz} quiz
   * @returns {Quiz}
   * @memberof Course
   */
  addQuiz(quiz: Quiz): Quiz {
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

  /**
   * register or add a student to this course
   *
   * @param {Student} student
   * @returns {string}
   * @memberof Course
   */
  registerStudent(student: Student): string {
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
