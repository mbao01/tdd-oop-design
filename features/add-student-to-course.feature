Feature: Teacher should add Students to Course


    Background:
        Given a school named "The Computer Institute"
            And a teacher with email "teacher@email.com" and name "Philip"
            And a student with email "student@email.com" and name "Ayomide"
            And a course with course code "MDB-101"

    Scenario: Teacher can assign course to student
        Given that MDB-101 exists
        Then Ayomide is assigned MDB-101 by Philip
