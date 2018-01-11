// @flow
import * as React from 'react'
import { observer } from 'mobx-react'

import Row from '../Row'

import type { ColumnInput } from '../Column'

import mkViewModel from './viewModel'
import connect from './connect'

import type { ViewModel } from './viewModel'

const columnsCount = 8
const fixedColumnsCount = 2
const columnsWidth = 200
const rowsCount = 7
const rowHeight = 48
const headerCellHeight = 56

type Props = {
  columns: Array<ColumnInput>,
  rows: Array<{ [string]: any }>,
  vm: ViewModel,
}

const __html = `
.tables-container {
  position: relative;
  height: ${rowsCount * rowHeight + headerCellHeight}px;
  overflow: hidden;
}

.fixed-table-center {
  overflow-x: auto;
  overflow-y: hidden;
  flex: 1 1 auto;
}

.fixed-table-left {
  flex: 1 0 auto;
  height: ${rowsCount * rowHeight + headerCellHeight}px;
  overflow: hidden;
  position: relative;
  z-index: 1;
  transition: box-shadow 200ms cubic-bezier(0.0, 0.0, 0.2, 1);
}

.fixed-table-left--box-shadow {
  transition: box-shadow 200ms cubic-bezier(0.4, 0.0, 1, 1);
  box-shadow: 6px 0 6px -4px rgba(0, 0, 0, 0.15)
}

.fixed-table-right {
  flex: 1 0 auto;
  height: ${rowsCount * rowHeight + headerCellHeight}px;
  overflow: hidden;
  position: relative;
  z-index: 1;
  transition: box-shadow 200ms cubic-bezier(0.0, 0.0, 0.2, 1);
}

.fixed-table-right--box-shadow {
  transition: box-shadow 200ms cubic-bezier(0.4, 0.0, 1, 1);
  box-shadow: -6px 0 6px -4px rgba(0, 0, 0, 0.15);
}

.table-inner,
.table-data {
  overflow: auto;
  height: ${rowsCount * rowHeight}px;
}

.table {
  border: 0;
  border-collapse: separate;
  border-spacing: 0;
  text-align: left;
  margin: 0;
  padding: 0;
  table-layout: fixed;
  white-space: nowrap;

  font-family: 'Roboto', sans-serif;
}

.table-header {
  position: relative;
}

.table-inner--center,
.table-header--center {
  width: ${(columnsCount - fixedColumnsCount) * columnsWidth}px;
}

th, td {
  border: 0;
  margin: 0;
  padding: 0;
}

td {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: ${columnsWidth}px;
  height: ${rowHeight}px;
  color: rgba(0, 0, 0, 0.87);
  font-size: 13px;
}

th {
  width: ${columnsWidth}px;
  height: ${headerCellHeight}px;
  font-weight: 500;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.54);
}

tr {
  background: #fff;
  box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.12);
}

.tables {
  display: flex;
}

.align-right {
  text-align: right;
}
`

const HeaderCell = observer(({ column }) => (
  <th className={column.align === 'right' ? 'align-right' : ''}>
    {column.title}
  </th>
))

HeaderCell.displayName = 'HeaderCell'

const FixedTable = observer((props) => (
  <div className={`fixed-table-${props.side}`}>
    <table className={`table table-header table-header--${props.side}`}>
      <thead>
        <tr>
          {props.columns.map((column) =>
            <HeaderCell key={column.property} column={column}/>
          )}
        </tr>
      </thead>
    </table>
    <div className={`table-inner table-inner--${props.side}`}>
      <table className={`table table-data table-data--${props.side}`}>
        <tbody>
          {props.rows.map((data) =>
            <Row key={data.id} columns={props.columns} data={data}/>
          )}
        </tbody>
      </table>
    </div>
  </div>
))

FixedTable.displayName = 'FixedTable'

const Table = (props: Props) => (
  <React.Fragment>
    <style dangerouslySetInnerHTML={{ __html }} />
    <div className='tables-container'>
      <div className='tables'>
        <FixedTable side='left' columns={props.vm.columnsLeft} rows={props.rows}/>
        <FixedTable side='center' columns={props.vm.columns} rows={props.rows}/>
        <FixedTable side='right' columns={props.vm.columnsRight} rows={props.rows}/>
      </div>
    </div>
  </React.Fragment>
)

export default connect(mkViewModel, Table)
