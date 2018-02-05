// @flow

import { RecyclerViewState } from '../RecyclerViewState'
import { RecyclerViewRecycler } from '../RecyclerViewRecycler'

import type { IRecyclerViewAdapter } from '../RecyclerViewAdapter'
import type { IRecyclerViewLayoutManager } from '../RecyclerViewLayoutManager'

/**
 *  RecyclerView
 *
 *  Controls the Layout, Adapter and Animator
 *
 *  Usage:
 *  @example:
 *
 *  const dataSource = new DataSource([...])
 *  const recyclerView = new RecyclerView()
 *  const layoutManager = new LinearLayoutManager(recyclerView)
 *  const adapter = new MyRecyclerViewAdapter(recyclerView, dataSource)
 *
 *  recyclerView.setAdapter(adapter)
 *  recyclerView.setLayoutManager(layoutManager)
 */
export interface IRecyclerView {
  /**
   *  Tag
   */
  _tag: 'RecyclerView';

  /**
   *  A reference to the currently attached RecyclerViewAdapter instance
   */
  adapter: IRecyclerViewAdapter<*, *>;

  /**
   *  A reference to the currently attached RecyclerViewLayoutManager instance
   */
  layoutManager: IRecyclerViewLayoutManager;

  setAdapter(IRecyclerViewAdapter<*, *>): void;
  setLayoutManager(IRecyclerViewLayoutManager): void;
  getAdapter(): IRecyclerViewAdapter<*, *>;
  getLayoutManager(): IRecyclerViewLayoutManager;
}

export class RecyclerView implements IRecyclerView {
  _tag = 'RecyclerView'

  adapter = null
  layoutManager = null

  _recycler = new RecyclerViewRecycler()
  _state = new RecyclerViewState()

  setAdapter = (adapter) => {
    this.adapter = adapter
  }

  getAdapter = () => {
    return this.adapter
  }

  setLayoutManager = (layoutManager) => {
    this.layoutManager = layoutManager
  }

  getLayoutManager = () => {
    return this.layoutManager
  }

  setDimensions = (dimension) => {
    this.layoutManager.setDimensions(dimension, this.adapter)
    this.layoutManager.onLayoutChildren(this._recycler, this.adapter)
  }

  scrollBy = (dx, dy, scrollLeft, scrollTop) => {
    this.layoutManager.scrollHorizontallyBy(dx, scrollLeft, this.adapter, this._recycler, this._state)
    this.layoutManager.scrollVerticallyBy(dy, scrollTop, this.adapter, this._recycler, this._state)
  }
}
