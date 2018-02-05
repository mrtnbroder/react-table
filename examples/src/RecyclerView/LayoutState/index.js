// @flow

import { Dimension } from '../utils'

import type { RecyclerViewState } from '../RecyclerViewState'
import type { RecyclerViewRecycler } from '../RecyclerViewRecycler'

export const LAYOUT_START = -1
export const LAYOUT_END = 1
export const ITEM_DIRECTION_HEAD = -1
export const ITEM_DIRECTION_TAIL = 1

type ItemDirection = typeof ITEM_DIRECTION_HEAD | typeof ITEM_DIRECTION_TAIL
type LayoutDirection = typeof LAYOUT_START | typeof LAYOUT_END

export interface ILayoutState {
  _tag: 'LayoutState',

  /**
   * Pixel offset where layout should start
   */
  offset: number;

  /**
   * Number of pixels that we should fill, in the layout direction.
   */
  available: number;

  /**
   * Used if you want to pre-layout items that are not yet visible.
   * The difference with available is that, when recycling, distance laid out for
   * extra is not considered to avoid recycling visible children.
   */
  extra: number;

  /**
   * Current position on the adapter to get the next item.
   */
  currentPosition: number;

  /**
   * Defines the direction in which the data adapter is traversed.
   * Should be ITEM_DIRECTION_HEAD or ITEM_DIRECTION_TAIL
   */
  itemDirection: ItemDirection;

  /**
   * Defines the direction in which the data adapter is traversed.
   * Should be ITEM_DIRECTION_HEAD or ITEM_DIRECTION_TAIL
   */
  layoutDirection: LayoutDirection;

  /**
   * Used when LayoutState is constructed in a scrolling state.
   * It should be set the amount of scrolling we can make without creating a new view.
   * Settings this is required for efficient view recycling.
   */
  scrollingOffset: number;

  /**
   * The most recent scrollBy() amount.
   */
  lastScrollDelta: number;

  /**
   * @return true if there are more items in the data adapter
   */
  hasMore(state: RecyclerViewState): boolean;

  /**
   * Gets the view for the next element that we should layout.
   * Also updates current item index to the next item, based on itemDirection
   *
   * @return The next element that we should layout.
   */
  next(recycler: RecyclerViewRecycler): View;

  // CUSTOM START (MARTIN STUFF)

  /**
   * Remaining space available to fill in pixels.
   */
  remaining: number;

  /**
   * Viewport dimensions.
   */
  viewport: Class<Dimension>;

  /**
   * Scroller dimensions.
   */
  scroller: Class<Dimension>;

  // CUSTOM END
}

export class LayoutState implements ILayoutState {
  _tag = 'LayoutState'

  offset = 0
  available = 0
  currentPosition = 0
  scrollingOffset = 0
  lastScrollDelta = 0
  extra = 0
  itemDirection = ITEM_DIRECTION_TAIL
  layoutDirection = LAYOUT_END

  remaining = 0
  viewport = Dimension.of(0, 0)
  scroller = Dimension.of(0, 0)
  lastPosition = 0

  hasMore(state) {
    return this.currentPosition >= 0 && this.currentPosition < state.getItemCount()
  }

  next(recycler) {
    const view = recycler.getViewForPosition(this.currentPosition)
    this.currentPosition = this.currentPosition + this.itemDirection
    return view
  }
}
