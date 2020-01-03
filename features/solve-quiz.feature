Feature: Student solve quiz in course

    Background:
        Given a school named "The Computer Institute"
            And a teacher with email "teacher@email.com" and name "Philip"
            And a student with email "student@email.com" and name "Ayomide"
            And a course with course code "MDB-101"

    Scenario: Quiz does not exist
        Given that Ayomide is registered to course MDB-101
            And Ayomide has been assigned quiz by Philip
            And quiz with $<quizId> does not exist
        Then Ayomide cannot solve quiz

    Scenario: Quiz does not have any question
        Given that Ayomide is registered to course MDB-101
            And Ayomide has been assigned quiz by Philip
            And that there are no question under quiz with $<quizId>
        Then Ayomide cannot solve quiz


    Scenario: Quiz does have question(s)
        Given that Ayomide is registered to course MDB-101
            And Ayomide has been assigned quiz by Philip
            And quiz with $<quizId> does not exist with questions
        Then Ayomide cannot solve quiz