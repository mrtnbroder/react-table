// @flow

export interface IRecyclerViewState {
  getItemCount(): number,
  // getOrientation(): 'horizontal' | 'vertical'
}

export class RecyclerViewState implements IRecyclerViewState {

  _itemCount = 0

  // state = {
  //   items: [],
  //   orientation: 'vertical',
  // }

  // constructor(state) {
  //   Object.assign(this.state, state)
  // }

  getItemCount() {
    return this._itemCount
  }

  // getOrientation() {
  //   return this.state.orientation
  // }

}
