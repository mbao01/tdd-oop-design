import { Person } from "../src/person";

describe("Person", function() {
  const personMock = {
    name: "Ayomide Bakare",
    email: "bakkareayomideo@gmail.com",
    age: 24
  };
  let person;

  beforeEach(function() {
    person = new Person(personMock.name, personMock.age, personMock.email);
  });

  it("should create a new person", function() {
    expect(person).toBeInstanceOf(Person);
  });

  it("should return person's email", function() {
    expect(person.email).toEqual(personMock.email);
  });

  it("should return person's name", function() {
    expect(person.name).toEqual(personMock.name);
  });

  it("should return person's profile", function() {
    expect(person.profile).toEqual(personMock);
  });
});
