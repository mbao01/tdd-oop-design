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

  /**
   * returns person's email address
   *
   * @readonly
   * @memberof Person
   */
  get email() {
    return this._email;
  }

  /**
   * returns person's name
   *
   * @readonly
   * @memberof Person
   */
  get name() {
    return this._name;
  }

  /**
   * returns person's profile
   *
   * @readonly
   * @memberof Person
   */
  get profile() {
    return {
      name: this._name,
      age: this._age,
      email: this._email
    };
  }
}
