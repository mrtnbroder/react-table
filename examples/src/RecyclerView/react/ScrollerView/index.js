
import * as React from 'react'
import { Dimension } from '../../utils'

class ScrollerView extends React.PureComponent {

  scroller = null

  dy = 0
  dx = 0

  componentDidMount() {
    this.init()
  }

  init = () => {
    this.props.recyclerView.updateDimensions(this.getScrollerDimension())
  }

  onScroll = (e) => {
    const scrollLeft = this.getScrollLeft()
    const scrollTop = this.getScrollTop()

    const dx = this.dx - scrollLeft
    const dy = this.dy - scrollTop

    this.dx = scrollLeft
    this.dy = scrollTop

    this.props.recyclerView.scrollBy(dx, dy)
  }

  getScrollerDimension = () => {
    const scroller = this.getScrollerRef()

    return Dimension.of(scroller.offsetWidth, scroller.offsetHeight)
  }

  getScrollTop = () => {
    const scroller = this.getScrollerRef()

    return scroller.scrollTop
  }

  getScrollLeft = () => {
    const scroller = this.getScrollerRef()

    return scroller.scrollLeft
  }

  setScrollerRef = (scroller) => this.scroller = scroller

  getScrollerRef = () => this.scroller

  render() {
    return React.cloneElement(
      this.props.scroller, {
        onScroll: this.onScroll,
        ref: this.setScrollerRef,
      },
      this.props.children
    )
  }
}

const style = { height: 400, width: 400, background: 'lightgray', overflowY: 'auto', overflowX: 'hidden' }

export default ScrollerView
