
class DataSource {
  constructor(ds) {
    this.ds = ds
  }
  getItemAtIndex(position) {
    return this.ds[position]
  }
  replaceItemAtIndex(position, item) {
    this.ds[position] = item
    return this
  }
  getItemCount() {
    return this.ds.length - 1
  }
  update(ds) {
    // TODO: instead of just replacing the data source, we should check each
    // entry for equality and use replaceItemAtIndex(position, item) to only
    // update entries that changed.
    this.ds = this.ds.replace(ds)
  }
  compare(x) {
    return this.ds === x
  }
  equals(x) {
    return this === x
  }
}

DataSource.of = (ds) => new DataSource(ds)

export default DataSource
