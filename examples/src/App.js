// @flow
import * as React from 'react'

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
        totalCount={vm.totalCount}
        >
        <Column
          fixed={vm.fixed}
          property='selected'
          // width={24}
          header={
            <SelectHeaderCell
              someSelected={vm.someSelected}
              checked={vm.allSelected}
              onSelectAll={vm.onSelectAll}
              pending={vm.pending}
              />
          }
          cell={
            <SelectCell
              onSelect={vm.onSelect}
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
              onSortChange={vm.onSortChange}
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
              onSortChange={vm.onSortChange}
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
              onSortChange={vm.onSortChange}
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
              onSortChange={vm.onSortChange}
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
              onSortChange={vm.onSortChange}
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
              onSortChange={vm.onSortChange}
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
              onSortChange={vm.onSortChange}
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
              onSortChange={vm.onSortChange}
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
              onDelete={vm.onDelete}
              pending={vm.pending}
              />
          }
          />
        <Column
          fixed='right'
          // width={24}
          cell={
            <EditCell
              onToggleEdit={vm.onToggleEdit}
              pending={vm.pending}
              />
          }
          />
      </Table>
    </Card>
  </React.Fragment>
)

export default connect(mkViewModel, App)
