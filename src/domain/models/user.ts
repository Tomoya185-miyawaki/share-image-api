export class User {
  private _id: number;
  private _name: string;
  private _email: string;
  private _password: string;

  get id(): number {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get email(): string {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  get password(): string {
    return this._password;
  }

  set password(password: string) {
    this._password = password;
  }

  constructor(name: string = null, email: string = null) {
    this._name = name;
    this._email = email;
  }
}
