import sinon from "sinon";
import { Course } from "../src/course";
import quiz from "../mocks/quiz.json";
import quizWithAnswer from "../mocks/quiz-with-answer.json";
import { Student } from "../src/student";

describe("Course", function() {
  let courseMock = {
    code: "MDB-101",
    title: "Introduction to MongoDB",
    credit: 3
  };
  let course;

  beforeEach(function() {
    course = new Course(courseMock.code, courseMock.title, courseMock.credit);
  });

  it("should create a new course", function() {
    expect(course).toBeInstanceOf(Course);
  });

  it("should return course code", function() {
    expect(course.code).toEqual(courseMock.code);
  });

  it("should return course profile", function() {
    expect(course.profile).toEqual(courseMock);
  });

  it("should be return quizzes under course", function() {
    expect(course.quizzes).toEqual([]);
  });

  it("should be return quizzes with solution", function() {
    expect(course.solutions).toEqual([]);
  });

  it("should return all students taking course", function() {
    expect(course.students).toEqual([]);
  });

  it("should add new quiz to course", function() {
    const newQuiz = course.addQuiz(quizWithAnswer);

    expect(newQuiz).toEqual({
      ...quiz,
      id: "1",
      courseCode: courseMock.code
    });

    // Check if quiz is in course quizzes
    expect(course.quizzes).toEqual([
      {
        ...quiz,
        id: "1",
        courseCode: courseMock.code
      }
    ]);

    // Check if solutions has quiz with answers
    expect(course.solutions).toEqual([
      {
        ...quizWithAnswer,
        id: "1",
        courseCode: courseMock.code
      }
    ]);
  });

  it("should register new student to course", function() {
    const student = sinon.createStubInstance(Student);

    expect(course.registerStudent(student)).toEqual("Student added to course");
  });

  it("should throw an exception if student is currently taking course", function() {
    let student = sinon.createStubInstance(Student);

    // Register new student
    course.registerStudent(student);

    // Register same student again, throws an exception
    expect(function() {
      course.registerStudent(student);
    }).toThrowError("Student already registered for course");
  });
});
