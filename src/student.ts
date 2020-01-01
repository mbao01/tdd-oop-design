import { Person } from "./person";
import { Quiz, Question } from "./interfaces";
import { printQuestion, makeSubmission } from "./utils";
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

  solveQuiz(courseCode: string, quizId: string) {
    const quiz = this._quizzes.find(
      ({ courseCode: _courseCode, id }) =>
        _courseCode == courseCode && id == quizId
    );

    if (quiz) {
      const questions = quiz.questions;
      if (questions.length > 0) {
        let unsolvedIndices: number[] = [];
        questions.forEach(({ submission }, index) => {
          if (!submission || submission.length == 0) {
            unsolvedIndices.push(index);
          }
        });

        return Student._nextQuestion(questions, unsolvedIndices);
      } else {
        console.log("No questions available in this quiz, check back later");
      }
    }
  }

  private static _nextQuestion(questions: Question[], indices: number[]) {
    if (indices.length > 0) {
      const index: number = <number>indices.shift();

      const obj: any = {
        index,
        next: Student._nextQuestion(questions, indices),
        current: questions[index],
        print: printQuestion,
        submit: makeSubmission
      };

      Object.defineProperty(obj, "current", {
        enumerable: false,
        writable: false,
        configurable: false
      });
      Object.defineProperty(obj, "index", {
        enumerable: false,
        writable: false,
        configurable: false
      });
      Object.defineProperty(obj, "next", {
        enumerable: false,
        writable: false,
        configurable: false
      });

      return obj;
    } else {
      return "You have completed the quiz";
    }
  }
}
