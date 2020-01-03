import { Person } from "./person";
import { Quiz, Question } from "./interfaces";
import { printQuestion, makeSubmission, nextQuestion } from "./utils";
import { Course } from "./course";

/**
 * Student Class
 *
 * @export
 * @class Student
 * @extends {Person}
 */
export class Student extends Person {
  protected _quizzes: Quiz[];
  protected _coursesCodes: string[];

  /**
   * Creates an instance of Student.
   *
   * @param {string} name
   * @param {number} age
   * @param {string} email
   * @memberof Student
   */
  constructor(name: string, age: number, email: string) {
    super(name, age, email);

    this._quizzes = [];
    this._coursesCodes = [];
  }

  /**
   * get all codes of courses taken by student
   *
   * @readonly
   * @type {string[]}
   * @memberof Student
   */
  get coursesCodes(): string[] {
    return this._coursesCodes;
  }

  /**
   * return quizzes assigned to student
   *
   * @readonly
   * @type {Quiz[]}
   * @memberof Student
   */
  get quizzes(): Quiz[] {
    return this._quizzes;
  }

  /**
   * adds course's code to student's list of courses
   *
   * @param {Course} course
   * @returns {string}
   * @memberof Student
   */
  takeCourse(course: Course): string {
    const courseIndex = this._coursesCodes.findIndex(
      code => code == course.code
    );

    if (courseIndex < 0) {
      this._coursesCodes.push(course.code);
      return "Student is now taking course";
    } else {
      throw new Error("Student is already registered for this course");
    }
  }

  /**
   * assign multiple quizzes to student
   *
   * @param {Quiz[]} quizzes
   * @memberof Student
   */
  addQuizzes(quizzes: Quiz[]) {
    this._quizzes.push(...JSON.parse(JSON.stringify(quizzes)));
  }

  /**
   * get student quiz by quiz id and course code
   *
   * @param {string} courseCode
   * @param {string} quizId
   * @returns {Quiz}
   * @memberof Student
   */
  getQuiz(courseCode: string, quizId: string): Quiz {
    const quiz = this._quizzes.find(
      ({ courseCode: _courseCode, id }) =>
        _courseCode == courseCode && id == quizId
    );

    return quiz;
  }

  /**
   * get quiz to solve by quiz by quiz id and course code
   *
   * @param {string} courseCode
   * @param {string} quizId
   * @returns {({
   *     next: Function | null;
   *     print: Function | null;
   *     submit: Function | null;
   *   })}
   * @memberof Student
   */
  solveQuiz(
    courseCode: string,
    quizId: string
  ): {
    next: Function | null;
    print: Function | null;
    submit: Function | null;
  } {
    const quiz = this._quizzes.find(
      ({ courseCode: _courseCode, id }) =>
        _courseCode == courseCode && id == quizId
    );

    if (quiz) {
      const questions = quiz.questions;
      if (questions && questions.length > 0) {
        let unsolvedIndices: number[] = [];
        questions.forEach(({ submission }, index) => {
          if (!submission || submission.length == 0) {
            unsolvedIndices.push(index);
          }
        });

        if (unsolvedIndices && unsolvedIndices.length > 0) {
          const index = unsolvedIndices.shift();

          const obj: any = {
            next: nextQuestion,
            print: printQuestion,
            submit: makeSubmission,
            _index: index,
            _current: questions[index],
            _indices: unsolvedIndices,
            _questions: questions
          };

          const hidden = {
            enumerable: false,
            configurable: false
          };

          Object.defineProperty(obj, "_index", hidden);
          Object.defineProperty(obj, "_current", hidden);
          Object.defineProperty(obj, "_indices", hidden);
          Object.defineProperty(obj, "_questions", {
            ...hidden,
            writable: false
          });

          return obj;
        }

        throw new Error("You've completed this quiz");
      } else {
        throw new Error("No questions available in this quiz");
      }
    } else {
      throw new Error("Quiz does not exist");
    }
  }
}
