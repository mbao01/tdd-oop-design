import { Teacher } from "./teacher";
import { Student } from "./student";

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
   * @param {*} teacherEmail
   * @returns {Teacher}
   * @memberof School
   */
  getTeacherByEmail(teacherEmail): Teacher {
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
   * @param {*} studentEmail
   * @returns {Student}
   * @memberof School
   */
  getStudentByEmail(studentEmail): Student {
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
