import { GradePoint } from "../interfaces";

function makeSubmission(submission: number[]) {
  this.current.submission = submission;
  this.print(submission);
  return this.next;
}

function printQuestion(answers: number[]) {
  let text = `Q${this.index + 1}. ${this.current.question}\n`;
  this.current.choices.forEach((choice: string, index: number) => {
    text += `\t(${
      answers ? (answers.includes(index) ? index : "-") : index
    }) ${choice}\n`;
  });

  console.log(text);

  return this;
}

function calculateGradePoint(score: number, credit: number): GradePoint {
  let grade = "X",
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

function cgpaToDegree(cgpa: string | number) {
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

export { cgpaToDegree, printQuestion, makeSubmission, calculateGradePoint };
