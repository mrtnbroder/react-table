import React from 'react'
import ReactDOM from 'react-dom'
import { Catalog } from 'catalog'


ReactDOM.render(
  <Catalog
    title='React Material'
    pages={[
      {
        path: '/',                     // The path where the page can be accessed
        title: 'Introduction',         // The page title
        useBrowserHistory: true,
        component: require('./Intro')    // The documenation component
      },
      {
        title: 'Components',         // The page title
        pages: [
          {
            path: 'button',
            title: 'Buttons',
            component: require('./Buttons'),    // The documenation component
          },
          {
            path: 'specimen',
            title: 'Specimen',
            component: require('./specimen.md'),    // The documenation component
          },
        ]
      },
      // Other pages …
    ]}
  />,
  document.getElementById('root')
);
