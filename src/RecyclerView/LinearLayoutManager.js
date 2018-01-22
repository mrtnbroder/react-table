

interface IRecyclerViewLayoutManager {
  /**
   *  Add a view to the currently attached RecyclerView if needed.
   *  LayoutManagers should use this method to add views obtained from a
   *  RecyclerView.Recycler using getViewForPosition(number).
   */
  addView(view: View): void,

  /**
   *  Remove a view from the currently attached RecyclerView if needed.
   *  LayoutManagers should use this method to completely remove a child view
   *  that is no longer needed.
   */
  removeView(view: View): void,

  /**
   *  Return the current number of child views attached to the parent RecyclerView.
   */
  getViewCount(): number,

  /**
   *  Finds the view which represents the given adapter position.
   *
   *  This method traverses each child since it has no information about
   *  child order. Override this method to improve performance if your
   *  LayoutManager keeps data about child views.
   */
  findViewByPosition(position: number): ?View,

  /**
   *  Query if horizontal scrolling is currently supported.
   *  The default implementation returns false.
   */
  canScrollHorizontally(): boolean,

  /**
   *  Query if vertical scrolling is currently supported.
   *  The default implementation returns false.
   */
  canScrollVertically(): boolean,
}

class RecyclerViewLayoutManager implements ILayoutManager {

  _views = []

  addView(view) {
    this._views.push(view)
  }

  removeView(view) {
    this._views = this._view.filter((x) => x === view)
  }

  canScrollVertically() {
    return false
  }

  canScrollHorizontally() {
    return false
  }

  findViewByPosition(position) {
    return null
  }
}
