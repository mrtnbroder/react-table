// @flow
import * as React from 'react'
import { Dimension } from '../utils'

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
  onCreateView(viewType: number): Dimension;

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
  _items = []
  getItemViewType() {}
  getItemDimensions() {}
  renderItem() {}
  getItemCount() { return 0 }
}

export class MyRecyclerViewAdapter extends RecyclerViewAdapter {
  _items = []
  renderedItems = []

  constructor(context, recylerView, items) {
    super()
    this._context = context
    this._recylerView = recylerView
    this._items = items
  }

  getItemCount() {
    return this._items.getSize()
  }

  getAdapterPosition(position) {
    return this._items.getData().find((x) => x.index === position)
  }

  getItems() {
    return this._items.getData()
  }

  getItemFromPosition(position) {
    return this._items.getDataForIndex(position)
  }

  getItemDimensions(item) {
    return Dimension.of(100, 100)
  }

  getItemViewType(position) {
    const item = this._items[position]

    if (item) {
      return 'TYPE_PREMIUM'
    }

    return 'TYPE_BASIC'
  }

  forceUpdate() {
    this._context.forceUpdate()
  }

  renderItem = (viewType, data, style) => {
    return (
      <li key={data.index} style={style}>
        {data.dessert}
      </li>
    )
  }
}
