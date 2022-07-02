export class Lazy<T extends Object> {
  private _value: T | undefined;

  constructor(private _getValue: () => T) {}

  public get value(): T {
    if (!this._value) {
      this._value = this._getValue();
    }
    return this._value;
  }

  public refresh(): T {
    this._value = this._getValue();
    return this._value;
  }
}
