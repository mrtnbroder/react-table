// @flow
import * as React from 'react'
import * as mobx from 'mobx'

import './App.css'
import mkViewModel from './viewModel'

import { Card } from 'react-material'

import {
  // SORTABLE
  SortHeaderCell,
  // SELECTABLE
  SelectHeaderCell,
  SelectCell,
  // DELETEABLE
  DeleteCell,
  // EDITABLE
  EditCell,
  InputCell,
  // CORE
  Column,
  Table,
  connect,
} from 'react-table'

global.mobx = mobx

const App = ({ vm }) => (
  <React.Fragment>
    <button onClick={vm.changeDessert}>Change Row 3 Dessert</button>
    <button onClick={vm.toggleFixed}>Toggle Fixed Column</button>
    <button onClick={vm.addRow}>Add Row</button>
    <Card className='Card Card--center'>
      <header>
        <h2>Nutrition</h2>
      </header>
      <Table
        pending={vm.pending}
        rows={vm.rows}
        totalRows={vm.totalRows}
        >
        <Column
          fixed={vm.fixed}
          property='selected'
          width={72}
          header={
            <SelectHeaderCell
              someSelected={vm.someSelected}
              checked={vm.allSelected}
              onSelectAll={vm.handleSelectAll}
              pending={vm.pending}
              />
          }
          cell={
            <SelectCell
              pending={vm.pending}
              />
          }
          />
        <Column
          property='dessert'
          width={203}
          header={
            <SortHeaderCell
              order={vm.sortOrder}
              onSortChange={vm.handleSortChange}
              >
              Dessert (100g serving)
            </SortHeaderCell>
          }
          cell={
            <InputCell
              placeholder='Enter a dessert'
              />
          }
          />
        <Column
          align='right'
          property='calories'
          // width={108}
          header={
            <SortHeaderCell
              order={vm.sortOrder}
              onSortChange={vm.handleSortChange}
              >
              Calories
            </SortHeaderCell>
          }
          />
        <Column
          align='right'
          property='fat'
          // width={92}
          header={
            <SortHeaderCell
              order={vm.sortOrder}
              onSortChange={vm.handleSortChange}
              >
              Fat (g)
            </SortHeaderCell>
          }
          />
        <Column
          align='right'
          property='carbs'
          // width={106}
          header={
            <SortHeaderCell
              order={vm.sortOrder}
              onSortChange={vm.handleSortChange}
              >
              Carbs (g)
            </SortHeaderCell>
          }
          />
        <Column
          align='right'
          property='protein'
          // width={113}
          header={
            <SortHeaderCell
              order={vm.sortOrder}
              onSortChange={vm.handleSortChange}
              >
              Protein (g)
            </SortHeaderCell>
          }
          />
        <Column
          align='right'
          property='sodium'
          // width={126}
          header={
            <SortHeaderCell
              order={vm.sortOrder}
              onSortChange={vm.handleSortChange}
              >
              Sodium (mg)
            </SortHeaderCell>
          }
          />
        <Column
          align='right'
          property='calcium'
          // width={121}
          header={
            <SortHeaderCell
              order={vm.sortOrder}
              onSortChange={vm.handleSortChange}
              >
              Calcium (%)
            </SortHeaderCell>
          }
          />
        <Column
          align='right'
          property='iron'
          // width={98}
          header={
            <SortHeaderCell
              order={vm.sortOrder}
              onSortChange={vm.handleSortChange}
              >
              Iron (%)
            </SortHeaderCell>
          }
          />
        <Column
          fixed='right'
          // width={24}
          cell={
            <DeleteCell
              onDelete={vm.handleDelete}
              pending={vm.pending}
              />
          }
          />
        <Column
          fixed='right'
          // width={24}
          cell={
            <EditCell
              pending={vm.pending}
              />
          }
          />
      </Table>
    </Card>
  </React.Fragment>
)

export default connect(mkViewModel, App)
