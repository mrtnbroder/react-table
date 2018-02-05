// @flow

import RecyclerViewState from '../RecyclerViewState'
import { Dimension } from '../utils'
import {
  LayoutState,
  LAYOUT_START,
  LAYOUT_END,
  ITEM_DIRECTION_HEAD,
  ITEM_DIRECTION_TAIL,
} from '../LayoutState'

import type { IRecyclerView, RecyclerView } from '../RecyclerView'
import type { IRecyclerViewRecycler, RecyclerViewRecycler } from '../RecyclerViewRecycler'

const HORIZONTAL = 0
const VERTICAL = 1

type Orientation = 0 | 1

/**
 *  RecyclerViewLayoutManager
 *
 *  Manages layout, measurements and positioning of views.
 */
export interface IRecyclerViewLayoutManager {
  orientation: Orientation;

  constructor(recyclerView: RecyclerView, orientation: Orientation): void;

  /**
   *  Returns true when the orientation within the RecyclerViewState
   *  is set to HORIZONTAL
   */
  canScrollHorizontally(): boolean;

  /**
   *  Returns true when the orientation RecyclerViewState
   *  is set to VERTICAL
   */
  canScrollVertically(): boolean;

  /**
   *  Called when items have been added to the adapter.
   */
   onItemsAdded(recyclerView: IRecyclerView, positionStart: number, itemCount: number): void;

  /**
   *  Called when RecyclerViewAdapter.notifyDataSetChanged() is triggered
   *  instead of giving detailed information on what has actually changed.
   */
   onItemsChanged(recyclerView: IRecyclerView): void;

  /**
   *  Called when an item is moved withing the adapter.
   *
   *  Note that, an item may also change position in response to another
   *  ADD/MOVE/REMOVE operation. This callback is only called if and only if
   *  RecyclerViewAdapter.notifyItemMoved(fromPosition, toPosition) is called.
   */
   onItemsMoved(recyclerView: IRecyclerView, from: number, to: number, itemCount: number): void;

  /**
   *  Called when items have been removed from the adapter.
   */
   onItemsRemoved(recyclerView: IRecyclerView, positionStart: number, itemCount: number): void;

  /**
   *  Called when items have been changed in the adapter.
   */
   onItemsUpdated(recyclerView: IRecyclerView, positionStart: number, itemCount: number): void;

  /**
   *  Called when items have been changed in the adapter.
   */
   onLayoutChildren(recycler: RecyclerViewRecycler, state: RecyclerViewState): void;

  /**
   *  Sets the orientation of the layout.
   *  LinearLayoutManager will do its best to keep scroll position.
   */
   setOrientation(orientation: Orientation): void;

  /**
   *  Returns the current orientation of the layout.
   */
   getOrientation(): Orientation;

   /**
    *  Scroll vertically by dy pixels in screen coordinates and
    *  return the distance traveled.
    *
    *  The return value will be negative if dy was negative and scrolling
    *  proceeeded in that direction. Math.abs(result) may be less than dy if
    *  a boundary was reached.
    */
   scrollVerticallyBy(dy: number, scrollTop: number, recycler: RecyclerViewRecycler, state: RecyclerViewState): number;

   /**
    *  Scroll horizontally by dx pixels in screen coordinates and
    *  return the distance traveled.
    *
    *  The return value will be negative if dx was negative and scrolling
    *  proceeeded in that direction. Math.abs(result) may be less than dx if
    *  a boundary was reached.
    */
   scrollHorizontallyBy(dy: number, scrollLeft: number, recycler: RecyclerViewRecycler, state: RecyclerViewState): number;

   /*
    *  Scrolls the view. Returns the amount scrolled in pixels
    */
   scrollBy(delta: number, recycler: RecyclerViewRecyler, state: RecyclerViewState): number;

   /**
    * Fills the given layout, defined by the layoutState. This is fairly
    * independent from the rest of the LinearLayoutManager
    * and with little change, can be made publicly available as a helper class.

    * @return Number of pixels that it added. Useful for scroll functions.
    */
   fill(recycler: RecyclerViewRecycler, layoutState: LayoutState, state: RecyclerViewState): number;
}

export class RecyclerViewLayoutManager implements IRecyclerViewLayoutManager {

  // TODO: this could be a heap structure for faster insert/extract operations
  layouts = []

  orientation = VERTICAL

  canScrollHorizontally() {
    return this.orientation === HORIZONTAL
  }

  canScrollVertically() {
    return this.orientation === VERTICAL
  }

  onItemsAdded() { return void 0 }

  onItemsChanged() { return void 0 }

  onItemsMoved() { return void 0 }

  onItemsRemoved() { return void 0 }

  onItemsUpdated() { return void 0 }

  onLayoutChildren() { return void 0 }

  setOrientation(orientation) {
    this.orientation = orientation
  }

  getOrientation() {
    return this.orientation
  }

  scrollHorizontallyBy(dx, scrollLeft, adapter, recycler, state) {
    if (this.canScrollHorizontally()) {
      return this.scrollBy(dx, scrollLeft, adapter, recycler, state)
    }
    return 0
  }

  scrollVerticallyBy(dy, scrollTop, adapter, recycler, state) {
    if (this.canScrollVertically()) {
      return this.scrollBy(dy, scrollTop, adapter, recycler, state)
    }
    return 0
  }

  scrollBy(delta, recycler, state) {
    return 0
  }

}

export class LinearLayoutManager extends RecyclerViewLayoutManager {

  _recyclerView = null
  _state = new LayoutState()

  constructor(recyclerView, orientation) {
    super()

    this._recyclerView = recyclerView

    if (orientation) {
      this.setOrientation(orientation)
    }
  }

  findViewByPosition(position) {
    return this.layouts.findIndex((x) => +x.key === position)
  }

  scrollBy(delta, scrollTop, adapter, recycler, state) {
    // return early to prevent unnecessary work
    if (delta === 0) {
      return delta
    }

    this._state.scrollOffset = scrollTop
    const maxPos = Math.min(this._state.currentPosition, adapter.getItemCount() - 1)

    if (scrollTop >= this._state.steps[maxPos] && maxPos !== this._state.steps.length) {
      const nextPosition = this.findViewByPosition(this._state.currentPosition)
      const item = adapter.getItemFromPosition(this._state.offset)
      const viewType = adapter.getItemViewType(this._state.offset)
      const { height } = adapter.getItemDimensions(item)
      console.log('item.index: %d, position: %d', item.index, nextPosition);
      this.layouts[nextPosition] = adapter.renderItem(viewType, item, { transform: `translateY(${this._state.offset * height}px)`})
      this._state.lastPosition = this._state.currentPosition
      this._state.currentPosition = Math.min(this._state.currentPosition + 1, adapter.getItemCount() - 1)
      this._state.offset = Math.min(this._state.offset + 1, adapter.getItemCount() - 1)
      adapter.forceUpdate()
    }
    // if (scrollTop <= this._state.steps[this._state.currentPosition] && !this.inProgress) {
    //   this.inProgress = true
    //   const nextPosition = this.findViewByPosition(this._state.currentPosition)
    //   const item = adapter.getItemFromPosition(this._state.offset)
    //   const viewType = adapter.getItemViewType(this._state.offset)
    //   const { height } = adapter.getItemDimensions(item)
    //   console.log('item.index: %d, position: %d', item.index, nextPosition);
    //   this.layouts[nextPosition] = adapter.renderItem(viewType, item, { transform: `translateY(${this._state.offset * height}px)`})
    //   this._state.lastPosition = this._state.currentPosition
    //   this._state.currentPosition += 1
    //   this._state.offset += 1
    //   this.inProgress = false
    //   adapter.forceUpdate()
    // }

    // if (delta > 0) {
    //   this.fill(this._state)
    // } else {
    //   this.fillTowardsStart(this._state)
    // }
  }

  onLayoutChildren = (recycler, adapter) => {
    let spaceToFill = this._state.available + this._state.extra
    console.log('wat')
    while (spaceToFill > 0) {
      const position = this._state.offset
      const item = adapter.getItemFromPosition(position)
      const viewType = adapter.getItemViewType(position)
      const { height } = adapter.getItemDimensions(item)
      this.layouts.push(adapter.renderItem(viewType, item, { transform: `translateY(${position * height}px)`}))
      spaceToFill -= height
      this._state.offset++
    }
    // console.log(this._state);
    // console.log(this.layouts);
    adapter.forceUpdate()
  }

  fill = (recycler, layoutState, state) => {
    const view = layoutState.next(recycler)
    const start = layoutState.available

    return start - layoutState.available
  }

  setDimensions = (dimension, adapter) => {
    const itemCount = adapter.getItemCount()
    const sumItemHeight = (acc, _next, index) => {
      const item = adapter.getItemFromPosition(index)
      const { height } = adapter.getItemDimensions(item)
      return acc + height
    }
    const totalHeight = new Array(itemCount).fill(0).reduce(sumItemHeight, 0)
    this._state.steps = new Array(itemCount).fill(0).reduce((acc, _next, index) => {
      const item = adapter.getItemFromPosition(index)
      const { height } = adapter.getItemDimensions(item)
      const lastHeight = acc[index - 1] || 0
      return acc.concat([lastHeight + height])
    }, [])
    this._state.scroller = Dimension.of(dimension.width, totalHeight)
    this._state.viewport = dimension
    this._state.available = dimension.height
    this._state.extra = dimension.height * 2
    console.log(this._state);
  }
}
