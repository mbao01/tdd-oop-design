import { Teacher } from "../src/teacher";
import { Course } from "../src/course";
import { Student } from "../src/student";
import { School } from "../src/school";
import quiz from "../mocks/quiz.json";

describe("Teacher", function() {
  let teacher1: Teacher;
  let mongoDB: Course;
  let student1: Student;
  let student2: Student;

  beforeEach(function() {
    teacher1 = new Teacher("Paul Ryan", 45, "paul.ryan@edu.ng");
  });

  it("should create a new school", function() {
    const schoolName = "International School";
    const school = new School(schoolName);

    expect(school.profile.name).toEqual(schoolName);
  });

  it("should prevent duplicate teachers with same email", function() {
    teacher1.addQuizToCourse(mongoDB.code, quiz);

    expect(mongoDB.quizzes[mongoDB.quizzes.length - 1]).toEqual({
      ...quiz,
      id: "1",
      courseCode: mongoDB.code
    });
  });

  it("should add course to teach", function() {});

  it("should be able to create multiple quizzes for course", function() {});

  it("should add student to course", function() {});

  it("should calculate​ each​ student's​​ total​ ​grade​ accumulated​ over​ a semester for​ their​ classes", function() {});

  //demonstrates use of expected exceptions
  describe("#resume", function() {
    it("should throw an exception if song is already playing", function() {
      expect(function() {
        // player.resume();
      }).toThrowError("song is already playing");
    });
  });
});
