import { Person } from "./person";
import { Quiz, Question } from "./interfaces";
import { printQuestion, makeSubmission, nextQuestion } from "./utils";
import { Course } from "./course";

/**
 *
 */
export class Student extends Person {
  protected _quizzes: Quiz[];
  protected _coursesCodes: string[];

  constructor(name: string, age: number, email: string) {
    super(name, age, email);

    this._quizzes = [];
    this._coursesCodes = [];
  }

  get coursesCodes() {
    return this._coursesCodes;
  }

  get quizzes() {
    return this._quizzes;
  }

  takeCourse(course: Course) {
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

  addQuizzes(quizzes: Quiz[]) {
    this._quizzes.push(...quizzes);
  }

  getQuiz(courseCode: string, quizId: string) {
    const quiz = this._quizzes.find(
      ({ courseCode: _courseCode, id }) =>
        _courseCode == courseCode && id == quizId
    );

    return quiz;
  }

  solveQuiz(courseCode: string, quizId: string): { next: any } {
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
