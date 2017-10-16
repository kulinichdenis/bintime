import React, { Component } from 'react';
import Table from './Table'
import ITEMS from '../helpers/fakeData'

class App extends Component {
  render() {
    return (
      <div>
        <Table
          data={ITEMS}
          columns={['brand', 'title', 'description']}
          sortBy="brand"
        />
        <Table
          data={ITEMS}
          columns={['id', 'brand', 'title', 'count']}
          summary={['count']}
          sortBy="id"
        />

        <Table
          data={ITEMS}
          columns={['brand', 'description', 'title', 'count', 'price']}
          summary={['count', 'price']}
        />
      </div>
    );
  }
}

export default App
