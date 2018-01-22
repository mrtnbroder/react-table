// @flow

/**
 *  RecyclerViewAdapter
 *
 *  Provides views (acts as a bridge between data and view).
 *
 *  - Creates views for the LayoutManager when it requests a view for a specific
 *    position
 *  - Binds an item to a view
 *  - Notifies RecyclerView about changes in the DataSource
 *  - Handles item interactions (e.g. click events)
 *  - Manages multiple view types
 *  - Recycler Recovery (onFailedToRecycle)
 *
 */
export interface IRecyclerViewAdapter<Context, View> {
  _tag: 'RecyclerViewAdapter';
  _recylerView: Context;
  /**
   *  Called by the RecyclerView when RecyclerViewLayoutManager is in need
   *  of a new view and RecyclerViewRecyler has no available view.
   */
  onCreateView(viewType: number): View;

  /**
   * Called by RecyclerView to display the data at the specified position.
   * The position is the position of the item within the adapter's data set.
   */
  onBindView(view: View, position: number): void;

  /**
   *  Returns the total number of items in the dataSource held by the adapter.
   */
  getItemCount(): number;
}

export class RecyclerViewAdapter implements IRecyclerViewAdapter<any, any> {
  _tag = 'RecyclerViewAdapter'
  _recylerView = null
  onCreateView() {}
  onBindView() {}
  getItemCount() { return 0 }
}

export class MyRecyclerViewAdapter extends RecyclerViewAdapter {
  // @private
  // @public
  _items = []

  constructor(recylerView, items) {
    super()
    this._recylerView = recylerView
    this._items = items
  }

  onCreateView(viewType) {
    return {}
  }

  onBindView(view, position) {
    const item = this.items[position]
    view.dessert = item.dessert
    view.carbs = item.carbs
  }

  getItemCount() {
    return this._items.getSize()
  }
}
