import sinon from "sinon";
import { Student } from "../src/student";
import { Course } from "../src/course";
import quiz from "../mocks/quiz.json";

describe("Student", function() {
  const studentMock = {
    name: "Ayomide Bakare",
    email: "bakkareayomideo@gmail.com",
    age: 24
  };
  let student;

  beforeEach(function() {
    student = new Student(studentMock.name, studentMock.age, studentMock.email);
  });

  it("should get student's profile", function() {
    expect(student.profile).toEqual(studentMock);
  });

  it("should add course to take for the semester", function() {
    let course = sinon.createStubInstance(Course);

    expect(student.takeCourse(course)).toEqual("Student is now taking course");
  });

  it("should not add course already added", function() {
    let course = sinon.createStubInstance(Course);

    // Add/register course initially
    student.takeCourse(course);

    // Register same course again
    expect(function() {
      student.takeCourse(course);
    }).toThrowError("Student is already registered for this course");
  });

  it("should get all registered courses code", function() {
    let course = sinon.createStubInstance(Course);
    student.takeCourse(course);

    expect(student.coursesCodes.length).toBeGreaterThan(0);
  });

  it("should add quizzes to take and return all quizzes", function() {
    // Add quiz
    student.addQuizzes([quiz]);

    expect(student.quizzes).toEqual([quiz]);
  });

  it("should get a single quiz by quiz id and course code", function() {
    student.addQuizzes([{ ...quiz, courseCode: "MDB-101", id: "1" }]);

    expect(student.getQuiz("MDB-101", "1")).toEqual({
      ...quiz,
      courseCode: "MDB-101",
      id: "1"
    });
  });

  describe("solving a quiz", function() {
    let activeQuiz, solve;

    beforeEach(function() {
      activeQuiz = JSON.parse(
        JSON.stringify({ ...quiz, courseCode: "MDB-101", id: "1" })
      );
      student = new Student(
        studentMock.name,
        studentMock.age,
        studentMock.email
      );
      student.addQuizzes([activeQuiz]);
      solve = student.solveQuiz("MDB-101", "1");
    });

    it("should return quiz if assigned to student", function() {
      expect(solve).toBeTruthy();
    });

    it("should submit answer first question in a quiz", function() {
      // Current question index
      expect(solve._index).toEqual(0);
      expect(solve.print()).toEqual(
        "Q1. Tell me something\n\t(0) One\n\t(1) Two\n\t(2) Three\n\t(3) Four\n"
      );
      // moves to next question after submitting answer for current question
      solve.submit([0, 3]);

      // check that submission was made
      expect(activeQuiz.questions[0]).toEqual({
        ...quiz.questions[0],
        submission: [0, 3]
      });

      // check that next question was selected after submission
      expect(solve._index).toEqual(1);
    });

    it("should skip solving second question and move to next question", function() {
      // moves to second question after submitting answer for current question
      solve.submit([0, 3]);

      // current question
      expect(solve._index).toEqual(1);
      // Print question
      expect(solve.print()).toEqual(
        "Q2. Which group does a bat belong to?\n\t(0) Flying bird\n\t(1) Rodent\n\t(2) Blind\n\t(3) Mammal\n"
      );

      // Skip current question and move to next question
      solve.next();
      expect(solve._index).toEqual(2);
    });

    it("should submit answer to third question", function() {
      // Answer first question
      solve.submit([0, 3]);
      // Answer second question
      solve.submit([2, 3, 1]);

      // Prints third question
      expect(solve._index).toEqual(2);

      expect(solve.print()).toEqual(
        "Q3. Can you use a shovel to eat?\n\t(0) Strongly Agree\n\t(1) Agree\n\t(2) Neutral\n\t(3) Disagree\n\t(4) Strongly Disagree\n"
      );

      // Move to next question
      expect(solve.next()._index).toEqual(2);
    });

    it("should throw an exception when all questions been answered", function() {
      // Answer first question
      solve.submit([0, 3]);
      // Answer second question
      solve.submit([2, 3, 1]);
      // Answer second question
      solve.submit([1]);

      expect(function() {
        student.solveQuiz("MDB-101", "1");
      }).toThrowError("You've completed this quiz");
    });

    it("show throw an exception if there are no questions in quiz", function() {
      student.addQuizzes([{ id: "2", courseCode: "MDB-101", questions: [] }]);

      expect(function() {
        student.solveQuiz("MDB-101", "2");
      }).toThrowError("No questions available in this quiz");
    });

    it("show throw an exception if quiz does not exist", function() {
      expect(function() {
        student.solveQuiz("MTH-332", "3");
      }).toThrowError("Quiz does not exist");
    });
  });
});
