Feature: Grade Student

    Background:
        Given a school named "The Computer Institute"
            And a teacher with email "teacher@email.com" and name "Philip"
            And a student with email "student@email.com" and name "Ayomide"
            And a course with course code "MDB-101"
            And Ayomide is registered to course MDB-101


    Scenario: Teacher grade student
        Given that Ayomide has been assigned quiz by Philip
            And Ayomide has solved the quizzes under MDB-101
        Then Philip can grade Ayomide
