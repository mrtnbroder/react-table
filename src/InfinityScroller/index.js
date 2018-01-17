// @flow
import * as React from 'react'
import { observer } from 'mobx-react'

export type InfinityScrollerProps = {
  rows: Array<*>,
  children?: React.Node,
}

const InfinityScroller = ({
  rows,
  children,
  ...props
}: InfinityScrollerProps) => React.Children.only(children)

InfinityScroller.displayName = 'InfinityScroller'

export default observer(InfinityScroller)
