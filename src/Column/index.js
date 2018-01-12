// @flow
import * as React from 'react'
import { observer } from 'mobx-react'

import HeaderCell from '../HeaderCell'
import TextCell from '../TextCell'

export type Fixed = 'left' | 'right'
export type Order = 'asc' | 'desc' | 'inital'
export type Alignment = 'left' | 'center' | 'right'

export type Props = {
  property?: string,
  title?: string | React.Element<*>,
  /**
   *  Makes the column take a 'fixed' position to either the left
   *  side or the right. Use this if you need a specific column to
   *  always stay visible and stick to one of the sides.
   *  Note that the order of fixed columns is preserved, but not the order
   *  of the whole columns array. An example would be (ignoring all other
   *  properties for now here, just looking at the 'fixed' attribute, where
   *  A and B are actually undefined):
   *
   *  [A, '1 left', '2 left', B, '1 right', '2 right']
   *
   *  would render the columns like
   *
   *  ['1 left', '2 left', A, B, '1 right', '2 right']
   */
  fixed?: Fixed,
  // Overrides the position of the column
  // If a position is given twice, the first one will take precedence.
  // 0 = first
  // X = last
  position?: number,
  // alignment of text within the column.
  // numeric columns should be right aligned.
  align?: Alignment,
  children: React.ChildrenArray<*>,
  // row: { [string]: any },
}

const Column = observer((props: Props) => null)

Column.defaultProps = {
  header: <HeaderCell/>,
  cell: <TextCell/>,
}

export default Column
