// @flow
import * as React from 'react'
import { observer } from 'mobx-react'

import TextCell from '../TextCell'

const Row = observer(({ columns, data }) => (
  <tr>
    {columns.map((column) => (
      <TextCell
        key={column.property}
        column={column}
        data={data}
        />
    ))}
  </tr>
))

Row.displayName = 'Row'

export default Row
