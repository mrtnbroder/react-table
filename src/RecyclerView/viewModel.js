import * as React from 'react'
import { findDOMNode } from 'react-dom'
import * as mobx from 'mobx'
import * as R from 'ramda'
import DataSource from './DataSource'

const mkViewModel = (
  _params,
  props,
  _context,
) => {
  const ds = DataSource.of(props.dataSource)
  const vm = mobx.observable({
    // -- Model
    // @private
    _viewport: null,
    _lastScrollTop: 0,
    _anchor: {
      offset: 0,
      index: 0,
    },
    _bufferLimit: 10,
    // @public
    items: [],
    // -- View
    // @private
    // @public
    dataSourceTotalItemCount: mobx.computed(() => ds.getItemCount()),
    // containerStyle: mobx.computed(() => ({
    //   contain: 'layout',
    //   height: `${7 * props.itemHeight}px`,
    //   overflowY: 'auto',
    //   width: '100%',
    //   position: 'relative',
    //   margin: 0,
    //   padding: 0,
    // })),
    // -- Actions
    // @private
    _fill: mobx.action((range) => {
      vm.items = range.map((x) => ds.getItemAtIndex(x))
    }),
    _calculateAnchoredItem: (anchor, dy) => {
      const totalItemHeight = vm.dataSourceTotalItemCount * props.itemHeight
      const index = Math.floor(dy / props.itemHeight, 0)
      const offset = index * props.itemHeight

      return {
        offset,
        index,
      }
    },
    _onScrollVerticallyBy: mobx.action((dy) => {
      vm._anchor = vm._calculateAnchoredItem(vm._anchor, vm._viewport.scrollTop)
      const lastScreenItem = vm._calculateAnchoredItem(vm._anchor, vm._viewport.offsetHeight + vm._viewport.scrollTop)

      if (dy > 0) { // direction = downwards
        // console.log('DOWN')
        vm._fill(R.range(Math.max(vm._anchor.index - vm._bufferLimit, 0), Math.min(lastScreenItem.index + vm._bufferLimit, vm.dataSourceTotalItemCount)))
      } else { // direction = upwards
        // console.log('UP')
        vm._fill(R.range(Math.max(vm._anchor.index - vm._bufferLimit, 0), Math.min(lastScreenItem.index + vm._bufferLimit, vm.dataSourceTotalItemCount)))
      }
    }),
    // @public
    onScroll() {
      const dy = vm._viewport.scrollTop - vm._lastScrollTop

      vm._lastScrollTop = vm._viewport.scrollTop

      vm._onScrollVerticallyBy(dy)
    },
    componentDidMount() {
      const node = findDOMNode(this)
      mobx.runInAction(() => {
        vm._viewport = node.parentNode
        vm._viewport.onscroll = vm.onScroll
        vm._viewport.style.contain = 'layout'
        vm._viewport.style.height = `${7 * props.itemHeight}px`
        vm._viewport.style.overflowY = 'auto'
        vm._viewport.style.width = '100%'
        vm._viewport.style.position = 'relative'
        vm._viewport.style.margin = '0px'
        vm._viewport.style.padding = '0px'
      })
    },
    componentWillReceiveProps(nextProps) {
      if (!ds.compare(nextProps.dataSource)) {
        mobx.runInAction(() => {
          ds.update(nextProps.dataSource)
        })
      }
    }
  })

  vm._fill(R.range(0, 20))

  return vm
}

mkViewModel.defaultProps = {
  direction: 'vertical',
  itemHeight: 48,
}

export default mkViewModel
