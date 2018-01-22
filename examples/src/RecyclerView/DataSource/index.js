// @flow

interface IDataSource<T> {
  _data: Array<T>;
  _size: number;
  constructor(Array<T>): void;
  getDataAtIndex(number): T;
  getAllData(): Array<T>;
  getSize(): number;
  compare(any): boolean;
  equals(any): boolean;
}

export class DataSource implements IDataSource<Array<*>> {

  _data = []
  _size = 0

  constructor(_data) {
    this._data = _data
    this._size = _data.length
  }

  getDataForIndex(index) {
    return this._data[index]
  }

  getAllData() {
    return this._data
  }

  // replaceItemAtIndex(position, item) {
  //   this._data[position] = item
  //   return this
  // }

  getSize() {
    return this._size
  }

  compare(x) {
    return this._data === x
  }

  equals(x) {
    return this === x
  }

}

DataSource.of = (ds) => new DataSource(ds)
