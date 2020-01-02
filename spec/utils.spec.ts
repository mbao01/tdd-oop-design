import sinon from "sinon";
import quiz from "../mocks/quiz.json";
import {
  cgpaToDegree,
  calculateGradePoint,
  printQuestion,
  makeSubmission
} from "../src/utils";

describe("Utility functions", function() {
  describe("#nextQuestion", function() {
    it("should set the non-enumerable '_index' and '_current' question", function() {});

    it("should set 'next' property value to null if all questions are answered", function() {});
  });

  describe("#makeSubmission", function() {
    it("should set the 'submission' property on the current question and move to the next question", function() {
      let index = 0;
      let thisObj: any = {
        _index: index,
        _current: JSON.parse(JSON.stringify(quiz.questions[index])),
        next: sinon.spy(),
        print: sinon.spy()
      };

      makeSubmission.call(thisObj, [1, 2]);

      expect(thisObj.print.calledOnce).toBeTrue();

      expect(thisObj.next.calledOnce).toBeTrue();

      expect(thisObj.next.calledImmediatelyAfter(thisObj.print)).toBeTrue();

      expect(thisObj._current.submission).toEqual([1, 2]);
    });
  });

  describe("#printQuestion", function() {
    it("should return a pretty format of the question and choices", function() {
      let index = 0;
      expect(
        printQuestion.call({
          _index: index,
          _current: JSON.parse(JSON.stringify(quiz.questions[index]))
        })
      ).toEqual(
        "Q1. Tell me something\n\t(0) One\n\t(1) Two\n\t(2) Three\n\t(3) Four\n"
      );
    });

    it("should return a pretty format of the question with selected choices unmarked", function() {
      let index = 0;
      expect(
        printQuestion.call(
          {
            _index: index,
            _current: JSON.parse(JSON.stringify(quiz.questions[index]))
          },
          [1, 2]
        )
      ).toEqual(
        "Q1. Tell me something\n\t(-) One\n\t(1) Two\n\t(2) Three\n\t(-) Four\n"
      );
    });
  });

  describe("#calculateGradePoint", function() {
    it("should caclulate the grade and grade point from score", function() {
      let credit = 4;

      expect(calculateGradePoint(20, credit)).toEqual({
        grade: "F",
        point: 0
      });

      expect(calculateGradePoint(42, credit)).toEqual({
        grade: "E",
        point: 4
      });

      expect(calculateGradePoint(47, credit)).toEqual({
        grade: "D",
        point: 8
      });

      expect(calculateGradePoint(52, credit)).toEqual({
        grade: "C",
        point: 12
      });

      expect(calculateGradePoint(61, credit)).toEqual({
        grade: "B",
        point: 16
      });

      expect(calculateGradePoint(87, credit)).toEqual({
        grade: "A",
        point: 20
      });

      // Score should be in percentage
      expect(calculateGradePoint(145, credit)).toEqual({
        grade: "---",
        point: 0
      });
    });
  });

  describe("#cgpaToDegree", function() {
    it("should return the degree based on the cgpa", function() {
      expect(cgpaToDegree(0)).toEqual("Fail");

      expect(cgpaToDegree(1.2)).toEqual("Pass");

      expect(cgpaToDegree(2.0)).toEqual("Third Class");

      expect(cgpaToDegree(2.5)).toEqual("Second Class Lower");

      expect(cgpaToDegree(3.6)).toEqual("Second Class Upper");

      expect(cgpaToDegree(4.8)).toEqual("First Class");

      // Max CGPA is 5.0
      expect(cgpaToDegree(5.6)).toEqual("---");
    });
  });
});
