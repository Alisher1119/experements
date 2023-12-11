import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BS_HEADERS} from "./mock/bs-datatable/header/headers";
import {items} from "./mock/bs-datatable/data/data";
import {Datatable} from 'custom-rb-datatable/components/Datatable';

function App() {
  return (
    <div className="App">
      <Datatable
          headers={BS_HEADERS}
          items={items}
          className={'table table-striped'}
      >
        <thead><tr><th>test</th></tr></thead>
      </Datatable>
    </div>
  );
}

export default App;
