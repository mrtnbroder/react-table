import * as React from 'react'
import { findDOMNode } from 'react-dom'
import * as mobx from 'mobx'
// import * as R from 'ramda'

const ORIENTATION = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
}

const mkViewModel = (
  params,
  props,
  ctx,
) => {
  const vm = mobx.observable({
    // -- Model
    // @private
    _anchor: {
      index: 0,
      offset: 0,
    },
    _range: [0, props.visible + 8],
    _lastScrollTop: 0,
    _lastScrollLeft: 0,
    _viewport: null,
    // @public
    // -- View
    // @private
    /**
     *  _bufferLimit can not be smaller than items visible in viewport
     */
    _bufferLimit: mobx.computed(() => Math.max(8, props.visible)),
    // @public
    containerStyle: mobx.computed(() => ({
      contain: 'layout',
      height: `${props.visible * props.itemHeight}px`,
      overflowY: 'auto',
      width: '100%',
      position: 'relative',
      margin: 0,
      padding: 0,
    })),
    items: mobx.computed(() =>
      props.dataSource.map((item) => ({
        ...item,
        style: {
          height: props.itemHeight,
          transform: `translateY(${item.index * props.itemHeight}px)`,
        },
      })
    )),
    // -- Actions
    // @private
    _fill: mobx.action((from, to) => {
      vm._range = [from, to]
    }),
    _onScrollVerticallyBy: mobx.action((dy) => {
      const maxSize = props.dataSource.length - 1
      vm._anchor = vm._calculateAnchoredItem(vm._anchor, vm._viewport.scrollTop)
      const lastScreenItem = vm._calculateAnchoredItem(vm._anchor, vm._viewport.offsetHeight + vm._viewport.scrollTop)

      if (dy > 0) { // direction = downwards
        // console.log('DOWN')
        vm._fill(Math.max(vm._anchor.index - vm._bufferLimit, 0), Math.min(lastScreenItem.index + vm._bufferLimit, maxSize))
      } else { // direction = upwards
        // console.log('UP')
        vm._fill(Math.max(vm._anchor.index - vm._bufferLimit, 0), Math.min(lastScreenItem.index + vm._bufferLimit, maxSize))
      }
    }),
    _onScrollHorizontallyBy: (dx) => {
      if (dx > 0) {
        // direction = left
        console.log('LEFT')
      } else {
        // direction = right
        console.log('RIGHT')
      }
    },
    _calculateAnchoredItem: (anchor, dy) => {
      const totalItemHeight = (props.dataSource.length - 1) * props.itemHeight
      const index = Math.floor(dy / props.itemHeight, 0)
      const offset = index * props.itemHeight

      return {
        offset,
        index,
      }
    },
    // @public
    componentDidMount() {
      const node = findDOMNode(this)

      mobx.runInAction(() => {
        vm._viewport = node
      })
    },
    onScroll: mobx.action(() => {
      const dx = vm._viewport.scrollLeft - vm._lastScrollLeft
      const dy = vm._viewport.scrollTop - vm._lastScrollTop

      vm._lastScrollLeft = vm._viewport.scrollLeft
      vm._lastScrollTop = vm._viewport.scrollTop

      if (props.direction === ORIENTATION.VERTICAL) {
        vm._onScrollVerticallyBy(dy)
      } else {
        vm._onScrollHorizontallyBy(dx)
      }
    }),
  })

  return vm
}

mkViewModel.defaultProps = {
  direction: 'vertical',
  itemHeight: 48,
}

export default mkViewModel
