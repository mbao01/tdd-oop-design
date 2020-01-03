import sinon from "sinon";
import { School } from "../src/school";
import { Student } from "../src/student";
import { Teacher } from "../src/teacher";
import { Course } from "../src/course";

describe("School", function() {
  let school;
  let schoolMock = {
    name: "The Computer Institute"
  };

  beforeEach(function() {
    school = new School(schoolMock.name);
  });

  it("should create a new school", function() {
    expect(school).toBeInstanceOf(School);
  });

  it("should return school's profile", function() {
    expect(school.profile).toEqual(schoolMock);
  });

  describe("#Course", function() {
    let courseStub;

    beforeEach(function() {
      courseStub = sinon.stub(
        new Course("MDB-101", "Introduction to Mongo DB", 3)
      );
    });

    it("should add course to school", function() {
      expect(school.addCourse(courseStub)).toEqual(
        "Course added to this school"
      );
    });

    it("should throw an exception if course to be added already exist in school", function() {
      expect(function() {
        school.addCourse(courseStub);
        school.addCourse(courseStub);
      }).toThrowError("Course already exist in school");
    });

    it("should get course in school", function() {
      school.addCourse(courseStub);

      expect(school.getCourse("MDB-101")).toEqual(courseStub);
    });

    it("should remove course from school", function() {
      school.addCourse(courseStub);

      expect(school.removeCourse("MDB-101")).toEqual(
        "Course removed from school"
      );
    });

    it("should throw an exception if teacher to me removed does not exist in school", function() {
      expect(function() {
        school.removeCourse("MTH-332");
      }).toThrowError("Course does not exist in this school");
    });
  });

  describe("#Teacher", function() {
    let teacherStub;

    beforeEach(function() {
      teacherStub = sinon.stub(
        new Teacher("Ayomide Bakare", 43, "bakkareayomideo@gmail.com")
      );
    });

    it("should add teacher to school", function() {
      expect(school.addTeacher(teacherStub)).toEqual(
        "Teacher employed in this school"
      );
    });

    it("should throw an exception if teacher to be added already exist in school", function() {
      expect(function() {
        school.addTeacher(teacherStub);
        school.addTeacher(teacherStub);
      }).toThrowError("Teacher already work here");
    });

    it("should get teacher in school", function() {
      school.addTeacher(teacherStub);

      expect(school.getTeacherByEmail("bakkareayomideo@gmail.com")).toEqual(
        teacherStub
      );
    });

    it("should remove teacher from school", function() {
      school.addTeacher(teacherStub);

      expect(school.removeTeacher("bakkareayomideo@gmail.com")).toEqual(
        "Teacher sacked from this school"
      );
    });

    it("should throw an exception if teacher to me removed does not exist in school", function() {
      expect(function() {
        school.removeTeacher("tracey@email.com");
      }).toThrowError("Teacher does not teach in this school");
    });
  });

  describe("#Student", function() {
    let studentStub;

    beforeEach(function() {
      studentStub = sinon.stub(
        new Student("Ayomide Bakare", 24, "bakkareayomideo@gmail.com")
      );
    });

    it("should add student to school", function() {
      expect(school.addStudent(studentStub)).toEqual(
        "Student enrolled in school"
      );
    });

    it("should throw an exception if student to be added already exist in school", function() {
      expect(function() {
        school.addStudent(studentStub);
        school.addStudent(studentStub);
      }).toThrowError("Student already in this school");
    });

    it("should get student in school", function() {
      school.addStudent(studentStub);

      expect(school.getStudentByEmail("bakkareayomideo@gmail.com")).toEqual(
        studentStub
      );
    });

    it("should remove student from school", function() {
      school.addStudent(studentStub);

      expect(school.removeStudent("bakkareayomideo@gmail.com")).toEqual(
        "Student expelled from school"
      );
    });

    it("should throw an exception if student to me removed does not exist in school", function() {
      expect(function() {
        school.removeStudent("bakkareayomideo@gmail.com");
      }).toThrowError("Student does not exist in this school");
    });
  });
});
