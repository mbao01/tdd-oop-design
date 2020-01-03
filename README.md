#### I made some assumptions while creating this program;

#### Assumptions

1. The direct users of this are most likely people and not other software application.

2. All users are grouped under an umbrella, which is likely to be an educational institution (a School)

3. I changed Class(es) to Course(s) just for readability code-wise. I also think it captures the essense of learning. Learning is done in a Class, but a Course (or subject) is what is learnt. So quizzes can only exist on Courses not on Classes

4. Student email and Teacher email are unique identifier for each person type. Duplicates students and teachers are not allowed in the same school.

5. Students and Teachers must be added to a School to become functional

6. Students must be registered to a course a teacher takes to have access to the course content including quizzes.

7. Teachers create quizzes in courses and assigns a quiz to a Student. Student must be taking the course

8. Student can answer questions in a quiz completely or partially and continue at a later time before submissions are graded by teacher.

9. Teachers can grade student taking their course and quizes. Grades are returned for each quiz, course and cummulative.

#### Example

```TypeScript

// Create school
const school = new School('The Computer Institute');

// Create course
const course = new Course('MDB-101', 'Introduction to MongoDB', 3);

// Create teacher
const teacher = new Teacher("Ayomide Bakare", 43, 'teacher@gmail.com');

// Create student
const student = new Student("John Doe", 24, "student@gmail.com");

const quiz = {
    title: "Aggregation in MongoDB",
    questions: [
        {
            "question": "Tell me something",
            "choices": ["One", "Two", "Three", "Four"]
        },
        {
            "question": "Which group does a bat belong to?",
            "choices": ["Flying bird", "Rodent", "Blind", "Mammal"]
        },
        {
            "question": "Can you use a shovel to eat?",
            "choices": [
                "Strongly Agree",
                "Agree",
                "Neutral",
                "Disagree",
                "Strongly Disagree"
            ]
        }
    ]
}

// add teacher to school
school.addTeacher(teacher);

// add student to school
school.addTeacher(student);

// add course to school
school.addCourse(course);

// teacher takes course
teacher.teachCourse(course);

// teacher adds student to course
teacher.addStudentToCourse("MDB-101", student);

// teacher adds quiz to course
teacher.addQuizToCourse("MDB-101", quiz);

// teacher assigns quizzes to student
teacher.assignQuizzesToStudent("student@gmail.com", "MDB-101", ["1"]);

// student attempts to solve quiz
const solve = student.solveQuiz("MDB-101", "1");

// returns first question and choices
console.log(solve.print());

// submit answer for first question
solve.submit([0, 2]);

// returns second question and choices
console.log(solve.print());

// skip second question to third question
solve.next();

// returns third question and choices
console.log(solve.print());

// submit answer for third question
solve.submit([0, 2]);

// teacher grades students
const reports = teacher.gradeStudentsForAllCourses();

const studentReport = reports[0];

console.log(studentReport)

```
