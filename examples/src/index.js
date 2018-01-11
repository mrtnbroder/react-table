
import * as React from 'react'
import { render } from 'react-dom'
import DevTools from 'mobx-react-devtools'
import App from './App'
import './index.css'

render(
  <React.Fragment>
    <App/>
    <DevTools/>
  </React.Fragment>,
  document.getElementById('root')
)
