import { Teacher } from "./teacher";
import { Student } from "./student";
import { Course } from "./course";

/**
 * School Class
 * This only serves as a container to hold all teachers.
 * Assume this is a faculty or a school.
 *
 * @export
 * @class School
 */
export class School {
  private _teachers: Teacher[];
  private _students: Student[];
  private _courses: Course[];
  private _name: string;

  /**
   * Creates an instance of School.
   *
   * @param {string} name
   * @memberof School
   */
  constructor(name: string) {
    this._name = name;
    this._teachers = [];
    this._students = [];
    this._courses = [];
  }

  /**
   * get school profile
   *
   * @readonly
   * @type {{ name: string }}
   * @memberof School
   */
  get profile(): { name: string } {
    return {
      name: this._name
    };
  }

  /**
   * add new course to school
   *
   * @param {Course} course
   * @returns {string}
   * @memberof School
   */
  addCourse(course: Course): string {
    // We don't want to add the same course here. Clones not allowed.
    const index = this._courses.findIndex(({ code }) => code == course.code);

    if (index < 0) {
      this._courses.push(course);
      return "Course added to this school";
    } else {
      throw new Error("Course already exist in school");
    }
  }

  /**
   * get course in school by course code
   *
   * @param {string} courseCode
   * @returns {Course}
   * @memberof School
   */
  getCourse(courseCode: string): Course {
    return this._courses.find(({ code }) => code == courseCode);
  }

  /**
   * remove course from this school
   *
   * @param {string} courseCode
   * @returns {string}
   * @memberof School
   */
  removeCourse(courseCode: string): string {
    const index = this._courses.findIndex(({ code }) => code == courseCode);

    if (index > -1) {
      this._courses.splice(index, 1);
      return "Course removed from school";
    } else {
      throw new Error("Course does not exist in this school");
    }
  }

  /**
   * add new teacher to school
   *
   * @param {Teacher} teacher
   * @returns {string}
   * @memberof School
   */
  addTeacher(teacher: Teacher): string {
    // We don't want to add the same teachers here. Clones not allowed.
    const index = this._teachers.findIndex(
      ({ email }) => email == teacher.email
    );

    if (index < 0) {
      this._teachers.push(teacher);
      return "Teacher employed in this school";
    } else {
      throw new Error("Teacher already work here");
    }
  }

  /**
   * get teacher in school by email
   *
   * @param {string} teacherEmail
   * @returns {Teacher}
   * @memberof School
   */
  getTeacherByEmail(teacherEmail: string): Teacher {
    return this._teachers.find(({ email }) => email == teacherEmail);
  }

  /**
   * remove teacher from this school
   *
   * @param {string} teacherEmail
   * @returns {string}
   * @memberof School
   */
  removeTeacher(teacherEmail: string): string {
    const index = this._teachers.findIndex(
      ({ email }) => email == teacherEmail
    );

    if (index > -1) {
      this._teachers.splice(index, 1);
      return "Teacher sacked from this school";
    } else {
      throw new Error("Teacher does not teach in this school");
    }
  }

  /**
   * add new student to school
   *
   * @param {Student} student
   * @returns {string}
   * @memberof School
   */
  addStudent(student: Student): string {
    // We don't want to add the same teachers here. Clones not allowed.
    const index = this._students.findIndex(
      ({ email }) => email == student.email
    );

    if (index < 0) {
      this._students.push(student);
      return "Student enrolled in school";
    } else {
      throw new Error("Student already in this school");
    }
  }

  /**
   * get student in school by email
   *
   * @param {string} studentEmail
   * @returns {Student}
   * @memberof School
   */
  getStudentByEmail(studentEmail: string): Student {
    return this._students.find(({ email }) => email == studentEmail);
  }

  /**
   * remove student from this school
   *
   * @param {string} studentEmail
   * @returns {string}
   * @memberof School
   */
  removeStudent(studentEmail: string): string {
    const index = this._students.findIndex(
      ({ email }) => email == studentEmail
    );

    if (index > -1) {
      this._students.splice(index, 1);
      return "Student expelled from school";
    } else {
      throw new Error("Student does not exist in this school");
    }
  }
}
