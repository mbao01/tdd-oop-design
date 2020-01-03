import { Person } from "./person";
import { Course } from "./course";
import { Student } from "./student";
import { Quiz, Report } from "./interfaces";
import { cgpaToDegree, calculateGradePoint } from "./utils";

/**
 * Teacher Class
 *
 * @export
 * @class Teacher
 * @extends {Person}
 */
export class Teacher extends Person {
  private _courses: Course[];

  /**
   * Creates an instance of Teacher.
   *
   * @param {string} name
   * @param {number} age
   * @param {string} email
   * @param {Course[]} [courses=[]]
   * @memberof Teacher
   */
  constructor(
    name: string,
    age: number,
    email: string,
    courses: Course[] = []
  ) {
    super(name, age, email);

    this._courses = courses;
  }

  /**
   * get courses taken by teacher
   *
   * @readonly
   * @type {Course[]}
   * @memberof Teacher
   */
  get courses(): Course[] {
    return this._courses;
  }

  /**
   * add a course for a teacher to teach
   *
   * @param {Course} course
   * @returns {string}
   * @memberof Teacher
   */
  teachCourse(course: Course): string {
    const courseIndex = this._courses.findIndex(
      ({ code }) => code == course.code
    );

    if (courseIndex < 0) {
      this._courses.push(course);
      return "You're now teaching this course";
    } else {
      throw new Error("You're already teaching this course");
    }
  }

  /**
   * add student to course taken by this teacher
   *
   * I assume that student's are not in ALL classes that a teacher teaches
   * @param {string} courseCode
   * @param {Student} student
   * @returns {string}
   * @memberof Teacher
   */
  addStudentToCourse(courseCode: string, student: Student): string {
    const course = this._courses.find(({ code }) => code == courseCode);

    if (course) {
      course.registerStudent(student);
      return "Student enrolled in course";
    } else {
      throw new Error("You're not teaching this course");
    }
  }

  /**
   * add quiz to course taken by this teacher
   *
   * @param {string} courseCode
   * @param {Quiz} quiz
   * @returns {string}
   * @memberof Teacher
   */
  addQuizToCourse(courseCode: string, quiz: Quiz): string {
    const course = this._courses.find(({ code }) => code == courseCode);

    if (course) {
      course.addQuiz(quiz);
      return "Quizzes added to course";
    } else {
      throw new Error("You're not teaching this course");
    }
  }

  /**
   * assign quizzes from course taken by teacher to student taking a course
   *
   * @param {string} studentEmail
   * @param {string} courseCode
   * @param {string[]} [quizIds]
   * @returns {string}
   * @memberof Teacher
   */
  assignQuizzesToStudent(
    studentEmail: string,
    courseCode: string,
    quizIds?: string[]
  ): string {
    const course = this._courses.find(({ code }) => code == courseCode);

    if (course) {
      // Find student in course
      const student = course.students.find(
        ({ email }) => email == studentEmail
      );
      const quizzes = course.quizzes;
      let filteredQuizzes = quizzes
        .filter(({ id }) => quizIds.includes(id))
        .reduce((acc, quiz) => {
          const quizIndex = student.quizzes.findIndex(
            ({ id, courseCode }) =>
              id == quiz.id && courseCode == quiz.courseCode
          );

          if (quizIndex < 0) {
            acc.push(quiz);
          }

          return acc;
        }, []);

      if (student) {
        student.addQuizzes(filteredQuizzes);
        return "Quizzes added to student";
      } else {
        throw new Error("Student does not exist");
      }
    } else {
      throw new Error("This course does not exist");
    }
  }

  /**
   * grade students for the semester for courses taken by teacher
   *
   * @returns {Report[]}
   * @memberof Teacher
   */
  gradeStudentsForAllCourses(): Report[] {
    let studentsReports: Report[] = [];

    this._courses.forEach((_course: Course) => {
      _course.students.forEach(_student => {
        let reportIndex = studentsReports.findIndex(
          ({ email }) => email == _student.email
        );

        if (reportIndex < 0) {
          studentsReports.push({
            ..._student.profile,
            courses: []
          });

          reportIndex = studentsReports.length - 1;
        }

        _student.quizzes.forEach(quiz => {
          const solution = _course.solutions.find(
            ({ id, courseCode }) =>
              id == quiz.id && courseCode == quiz.courseCode
          );

          const score: number = quiz.questions.reduce(
            (acc, question, index) => {
              if (
                solution &&
                solution.questions &&
                solution.questions[index].answer &&
                question.submission &&
                solution.questions[index].answer.sort().toString() ==
                  question.submission.sort().toString()
              ) {
                acc = acc + 1;
              }
              return acc;
            },
            0
          );

          const course = studentsReports[reportIndex].courses.find(
            ({ code }) => code == _course.code
          );

          if (course) {
            course.quizzes.push({
              id: quiz.id,
              title: quiz.title,
              score: (100 * score) / quiz.questions.length // Assuming every quiz must have atleast one question
            });
          } else {
            studentsReports[reportIndex].courses.push({
              ..._course.profile,
              quizzes: [
                {
                  id: quiz.id,
                  title: quiz.title,
                  score: (100 * score) / quiz.questions.length // Assuming every quiz must have atleast one question
                }
              ]
            });
          }
        });
      });
    });

    studentsReports.forEach(studentReport => {
      let totalCredits = 0,
        totalPoints = 0;
      studentReport.courses.forEach(course => {
        let quizzesScore = course.quizzes.reduce((acc, quiz) => {
          acc = acc + quiz.score;

          return acc;
        }, 0);

        course.score = quizzesScore / course.quizzes.length;

        const { grade, point } = calculateGradePoint(
          course.score,
          course.credit
        );

        course.grade = grade;
        course.point = point;

        totalCredits += course.credit;
        totalPoints += course.point;
      });

      studentReport.totalCredits = totalCredits;
      studentReport.totalPoints = totalPoints;
      studentReport.cgpa = (totalPoints / totalCredits).toFixed(2);
      studentReport.degree = cgpaToDegree(studentReport.cgpa);
    });

    return studentsReports;
  }
}
