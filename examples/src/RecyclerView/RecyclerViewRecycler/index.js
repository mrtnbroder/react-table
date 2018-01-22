// @flow

opaque type View = any

export interface IRecyclerViewRecycler {

  /**
   *  Tag
   */
  _tag: 'RecyclerViewRecycler';

  /**
   *  Obtain a view initialized for the given position.
   *  This method should be used by RecyclerView.LayoutManager implementations
   *  to obtain views to represent data from an RecyclerView.Adapter.
   *
   *  The Recycler may reuse a cached view if one is available for the
   *  correct view type. If the adapter has not indicated that the data at
   *  the given position has changed, the Recycler will attempt to hand back
   *  a cached view that was previously initialized for that data
   *  without rebinding.
   */
  getViewForPosition(position: number): View;

  /**
  * Returns a View that can be binded to the given Adapter position.
  */
  getViewForPositionAndType(position: number, type: string): View;
  recycleView(view: View): void;
}

export class RecyclerViewRecycler implements IRecyclerViewRecycler {
  _tag = 'RecyclerViewRecycler'

  _cache = {}

  getViewForPositionAndType = (position, type) => {
    if (this._cache[type] && this._cache[type].length) {
      return this._cache[type].pop()
    } else {
      return null
    }
  }
}
