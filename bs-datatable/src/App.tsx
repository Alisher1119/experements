import React from 'react';
import './App.scss';
import Datatable from "./lib/components/Datatable";
import {BS_HEADERS} from "./mock/bs-datatable/header/headers";
import {items} from "./mock/bs-datatable/data/data";

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
