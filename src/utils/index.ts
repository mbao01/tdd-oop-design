import { GradePoint, Question } from "../interfaces";

/**
 * set's current question and index to next unanswered question
 *
 * @returns {*}
 */
function nextQuestion(): any {
  if (this._indices && this._indices.length > 0) {
    const index: number = <number>this._indices.shift();
    this._index = index;
    this._current = this._questions[index];

    return this;
  }

  this.next = null;
  this.print = null;
  this.submit = null;
  return this;
}

/**
 * set submission on current question
 *
 * @param {number[]} submission
 * @returns {number[]}
 */
function makeSubmission(submission: number[]): number[] {
  this._current.submission = submission;
  this.print(submission);

  // Move to next question after submission
  this.next();

  return submission;
}

/**
 * returns nicely readable current question and choices
 *
 * @param {number[]} [answers]
 * @returns {string}
 */
function printQuestion(answers?: number[]): string {
  let text = `Q${this._index + 1}. ${this._current.question}\n`;
  this._current.choices.forEach((choice: string, index: number) => {
    text += `\t(${
      answers ? (answers.includes(index) ? index : "-") : index
    }) ${choice}\n`;
  });

  return text;
}

/**
 * calculates grade and grade points based on score and credit
 *
 * @param {number} score
 * @param {number} credit
 * @returns {GradePoint}
 */
function calculateGradePoint(score: number, credit: number): GradePoint {
  let grade = "---",
    gradePoint = 0;

  if (score < 40) {
    grade = "F";
    gradePoint = 0;
  } else if (score >= 40 && score < 45) {
    grade = "E";
    gradePoint = 1;
  } else if (score >= 45 && score < 50) {
    grade = "D";
    gradePoint = 2;
  } else if (score >= 50 && score < 60) {
    grade = "C";
    gradePoint = 3;
  } else if (score >= 60 && score < 70) {
    grade = "B";
    gradePoint = 4;
  } else if (score >= 70 && score <= 100) {
    grade = "A";
    gradePoint = 5;
  }

  return {
    grade,
    point: gradePoint * credit
  };
}

/**
 * return degree corresponding to cgpa
 *
 * @param {(string | number)} cgpa
 * @returns {string}
 */
function cgpaToDegree(cgpa: string | number): string {
  let degree = "---";

  if (cgpa < 1.0) {
    degree = "Fail";
  } else if (cgpa >= 1.0 && cgpa < 1.5) {
    degree = "Pass";
  } else if (cgpa >= 1.5 && cgpa < 2.4) {
    degree = "Third Class";
  } else if (cgpa >= 2.4 && cgpa < 3.5) {
    degree = "Second Class Lower";
  } else if (cgpa >= 3.5 && cgpa < 4.5) {
    degree = "Second Class Upper";
  } else if (cgpa >= 4.5 && cgpa <= 5.0) {
    degree = "First Class";
  }

  return degree;
}

export {
  cgpaToDegree,
  printQuestion,
  nextQuestion,
  makeSubmission,
  calculateGradePoint
};
