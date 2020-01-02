import { Teacher } from "./teacher";
import { Student } from "./student";

/**
 * This only serves as a container to hold all teachers.
 * Assume this is a faculty or a school.
 */
export class School {
  private _teachers: Teacher[];
  private _students: Student[];
  private _name: string;

  constructor(name: string) {
    this._name = name;
    this._teachers = [];
    this._students = [];
  }

  get profile() {
    return {
      name: this._name
    };
  }

  addTeacher(teacher: Teacher) {
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

  getTeacherByEmail(teacherEmail) {
    return this._teachers.find(({ email }) => email == teacherEmail);
  }

  removeTeacher(teacherEmail: string) {
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

  addStudent(student: Student) {
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

  getStudentByEmail(studentEmail) {
    return this._students.find(({ email }) => email == studentEmail);
  }

  removeStudent(studentEmail: string) {
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
