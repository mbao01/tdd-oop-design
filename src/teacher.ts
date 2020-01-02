import { Person } from "./person";
import { Course } from "./course";
import { Student } from "./student";
import { Quiz } from "./interfaces";
import { cgpaToDegree, calculateGradePoint } from "./utils";

/**
 *
 */
export class Teacher extends Person {
  private _courses: Course[];

  constructor(
    name: string,
    age: number,
    email: string,
    courses: Course[] = []
  ) {
    super(name, age, email);

    this._courses = courses;
  }

  get courses() {
    return this._courses;
  }

  // Add a course for a teacher to teach
  teachCourse(course: Course) {
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

  // I assume that student's are not in ALL classes that a teacher teaches
  addStudentToCourse(courseCode: string, student: Student) {
    const course = this._courses.find(({ code }) => code == courseCode);

    if (course) {
      course.registerStudent(student);
      return "Student enrolled in course";
    } else {
      throw new Error("You're not teaching this course");
    }
  }

  addQuizToCourse(courseCode: string, quiz: Quiz) {
    const course = this._courses.find(({ code }) => code == courseCode);

    if (course) {
      course.addQuiz(quiz);
      return "Quizzes added to course";
    } else {
      throw new Error("You're not teaching this course");
    }
  }

  assignQuizzesToStudent(
    studentEmail: string,
    courseCode: string,
    quizIds?: string[]
  ) {
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
        console.log(filteredQuizzes);
        student.addQuizzes(filteredQuizzes);
        return "Quizzes added to student";
      } else {
        throw new Error("Student does not exist");
      }
    } else {
      throw new Error("This course does not exist");
    }
  }

  gradeStudentsForAllCourses() {
    let students: {
      age: number;
      name: string;
      email: string;
      courses: {
        code: string;
        title: string;
        score?: number; // expressed in percentage
        credit: number;
        grade?: string;
        point?: number;
        quizzes: {
          id: string;
          title: string;
          score: number; // expressed in percentage
        }[];
      }[];
      totalCredits?: number;
      totalPoints?: number;
      cgpa?: string | number;
      degree?: string;
    }[] = [];

    this._courses.forEach((_course: Course) => {
      _course.students.forEach(_student => {
        let studentIndex = students.findIndex(
          ({ email }) => email == _student.email
        );

        if (studentIndex < 0) {
          students.push({
            ..._student.profile,
            courses: []
          });

          studentIndex = students.length - 1;
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

          const course = students[studentIndex].courses.find(
            ({ code }) => code == _course.code
          );

          if (course) {
            course.quizzes.push({
              id: quiz.id,
              title: quiz.title,
              score: (100 * score) / quiz.questions.length // Assuming every quiz must have atleast one question
            });
          } else {
            students[studentIndex].courses.push({
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

    students.forEach(student => {
      let totalCredits = 0,
        totalPoints = 0;
      student.courses.forEach(course => {
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

      student.totalCredits = totalCredits;
      student.totalPoints = totalPoints;
      student.cgpa = (totalPoints / totalCredits).toFixed(2);
      student.degree = cgpaToDegree(student.cgpa);
    });

    return students;
  }
}
