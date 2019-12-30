/**
 * I assumed teachers and students are persons and not robots/machines
 * Each person has an age, name and email.
 * I choose email to be the unique identifier for each Person
 * i.e no two persons can have the same email
 */
export class Person {
  protected _age: number;
  protected _name: string;
  protected _email: string;

  constructor(name: string, age: number, email: string) {
    this._age = age;
    this._name = name;
    this._email = email;
  }

  get email() {
    return this._email;
  }

  get name() {
    return this._name;
  }

  get profile() {
    return {
      name: this._name,
      age: this._age,
      email: this._email
    };
  }
}
