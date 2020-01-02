import sinon from "sinon";
import quiz from "../mocks/quiz.json";
import quizWithAnswer from "../mocks/quiz-with-answer.json";
import { Teacher } from "../src/teacher";
import { Course } from "../src/course";
import { Student } from "../src/student";

describe("Teacher", function() {
  const teacherMock = {
    name: "Ayomide Bakare",
    email: "bakkareayomideo@gmail.com",
    age: 43
  };
  let teacher;
  let courseStub;

  beforeEach(function() {
    teacher = new Teacher(teacherMock.name, teacherMock.age, teacherMock.email);
    courseStub = sinon.stub(
      new Course("MDB-101", "Introduction to Mongo DB", 3)
    );
  });

  it("should add course to teach", function() {
    expect(teacher.teachCourse(courseStub)).toEqual(
      "You're now teaching this course"
    );
  });

  it("should throw an exception if teacher is already teaching course to be added", function() {
    expect(function() {
      teacher.teachCourse(courseStub);
      teacher.teachCourse(courseStub);
    }).toThrowError("You're already teaching this course");
  });

  it("should return all courses teacher teaches", function() {
    teacher.teachCourse(courseStub);

    expect(teacher.courses).toEqual([courseStub]);
  });

  it("should add student to course", function() {
    let studentStub = sinon.stub(
      new Student("Ayomide Bakare", 24, "bakkareayomideo@gmail.com")
    );
    teacher.teachCourse(courseStub);

    expect(teacher.addStudentToCourse("MDB-101", studentStub)).toEqual(
      "Student enrolled in course"
    );
  });

  it("should throw an exception if course is not taught by teacher when adding student to course", function() {
    let studentStub = sinon.stub(
      new Student("Ayomide Bakare", 24, "bakkareayomideo@gmail.com")
    );

    expect(function() {
      teacher.addStudentToCourse("MDB-101", studentStub);
    }).toThrowError("You're not teaching this course");
  });

  it("should be able to create multiple quizzes for course", function() {
    let quizObj = JSON.parse(JSON.stringify(quizWithAnswer));

    teacher.teachCourse(courseStub);

    expect(teacher.addQuizToCourse("MDB-101", quizObj)).toEqual(
      "Quizzes added to course"
    );
  });

  it("should throw an exception if course is not taught by teacher when adding quiz to course", function() {
    let quizObj = JSON.parse(JSON.stringify(quiz));

    expect(function() {
      teacher.addQuizToCourse("MDB-101", quizObj);
    }).toThrowError("You're not teaching this course");
  });

  it("should be able to assign multiple quizzes to student", function() {
    let quizObj = JSON.parse(JSON.stringify(quiz));
    let student = new Student(
      "Ayomide Bakare",
      24,
      "bakkareayomideo@gmail.com"
    );
    let course = new Course("MDB-101", "Introduction to Mongo DB", 3);

    teacher.teachCourse(course);
    teacher.addStudentToCourse("MDB-101", student);
    teacher.addQuizToCourse("MDB-101", {
      ...quizObj,
      id: "1",
      courseCode: "MDB-101"
    });

    expect(
      teacher.assignQuizzesToStudent("bakkareayomideo@gmail.com", "MDB-101", [
        "1"
      ])
    ).toEqual("Quizzes added to student");

    // Will not add same/duplicate quiz to student
    expect(
      teacher.assignQuizzesToStudent("bakkareayomideo@gmail.com", "MDB-101", [
        "1"
      ])
    ).toEqual("Quizzes added to student");
  });

  it("should throw an exception when adding quizzes to student that don't exist", function() {
    let quizObj = JSON.parse(JSON.stringify(quiz));

    teacher.teachCourse(courseStub);
    teacher.addQuizToCourse("MDB-101", quizObj);

    expect(function() {
      teacher.assignQuizzesToStudent("student@gmail.com", "MDB-101", [1]);
    }).toThrowError("Student does not exist");
  });

  it("should throw an exception when assigning quizzes of course that don't exist", function() {
    expect(function() {
      teacher.assignQuizzesToStudent("student@gmail.com", "MDB-101", [1]);
    }).toThrowError("This course does not exist");
  });

  describe("#grade", function() {
    it("should calculate​ each​ student's​​ total​ ​grade​ accumulated​ over​ a semester for​ their​ classes", function() {
      let quizObj = JSON.parse(JSON.stringify(quiz));
      let student = new Student(
        "Ayomide Bakare",
        24,
        "bakkareayomideo@gmail.com"
      );
      let course = new Course("MDB-101", "Introduction to Mongo DB", 3);

      teacher.teachCourse(course);
      teacher.addStudentToCourse("MDB-101", student);
      teacher.addQuizToCourse("MDB-101", {
        ...quizObj,
        id: "1",
        courseCode: "MDB-101"
      });

      teacher.assignQuizzesToStudent("bakkareayomideo@gmail.com", "MDB-101", [
        "1"
      ]);

      const reports = teacher.gradeStudentsForAllCourses();
      const student1 = reports[0];

      expect(student1.email).toEqual("bakkareayomideo@gmail.com");
      expect(student1.courses[0].quizzes[0].score).toEqual(0);
      expect(student1.courses[0].score).toEqual(0);
      expect(student1.courses[0].grade).toEqual("F");
      expect(student1.totalCredits).toEqual(3);
      expect(student1.cgpa).toEqual("0.00");
      expect(student1.degree).toEqual("Fail");
    });

    it("should calculate​ each​ student's​​ total​ ​grade​ accumulated​ over​ a semester for​ their​ classes", function() {
      let student1 = new Student(
        "Ayomide Bakare",
        24,
        "bakkareayomideo@gmail.com"
      );
      let student2 = new Student("John Doe", 24, "jdoe@gmail.com");
      let course1 = new Course("MDB-101", "Introduction to Mongo DB", 3);
      let course2 = new Course("MTH-332", "Linear Algebra", 2);

      teacher.teachCourse(course1);
      teacher.teachCourse(course2);

      teacher.addStudentToCourse("MDB-101", student1);
      teacher.addStudentToCourse("MTH-332", student1);
      teacher.addStudentToCourse("MDB-101", student2);

      teacher.addQuizToCourse("MDB-101", {
        ...JSON.parse(JSON.stringify(quizWithAnswer)),
        id: "1",
        courseCode: "MDB-101"
      });
      teacher.addQuizToCourse("MDB-101", {
        ...JSON.parse(JSON.stringify(quizWithAnswer)),
        id: "2",
        courseCode: "MDB-101"
      });

      teacher.assignQuizzesToStudent("bakkareayomideo@gmail.com", "MDB-101", [
        "1"
      ]);
      teacher.assignQuizzesToStudent("jdoe@gmail.com", "MDB-101", ["1", "2"]);

      let solve1: any = student1.solveQuiz("MDB-101", "1");
      // moves to next question after submitting answer for current question
      solve1.submit([0, 3]);
      solve1.submit([2, 3, 0]);

      const reports = teacher.gradeStudentsForAllCourses();
      const student1Report = reports[0];
      const student2Report = reports[1];

      expect(student1Report.email).toEqual("bakkareayomideo@gmail.com");
      expect(student1Report.courses[0].quizzes[0].score).toBeCloseTo(66.67);
      expect(student1Report.courses[0].score).toBeCloseTo(66.67);
      expect(student1Report.courses[0].grade).toEqual("B");
      expect(student1Report.totalCredits).toEqual(5);
      expect(student1Report.cgpa).toEqual("2.40");
      expect(student1Report.degree).toEqual("Second Class Lower");

      expect(student2Report.email).toEqual("jdoe@gmail.com");
      expect(student2Report.courses[0].quizzes[0].score).toBeCloseTo(0);
      expect(student2Report.courses[0].score).toBeCloseTo(0);
      expect(student2Report.courses[0].grade).toEqual("F");
      expect(student2Report.totalCredits).toEqual(3);
      expect(student2Report.cgpa).toEqual("0.00");
      expect(student2Report.degree).toEqual("Fail");
    });
  });
});
