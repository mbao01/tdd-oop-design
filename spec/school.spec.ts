import { School } from "../src/school";

describe("School", function() {
  let school: School;
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

  describe("Student", function() {
    it("should add teacher to school", function() {
      // let teacher = 1;
      // school.addTeacher(teacher);
    });

    it("should throw an exception if teacher to be added already exist in school", function() {});

    it("should get teacher in school", function() {});

    it("should remove teacher from school", function() {});

    it("should throw an exception if teacher to me removed does not exist in school", function() {});
  });

  describe("Student", function() {
    it("should add student to school", function() {});

    it("should throw an exception if student to be added already exist in school", function() {});

    it("should get student in school", function() {});

    it("should remove student from school", function() {});

    it("should throw an exception if student to me removed does not exist in school", function() {});
  });
});
