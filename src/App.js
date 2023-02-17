import React, { useEffect, useState} from "react";
import { AggrByMonth } from "./components/AggrByMonth";
import { AggrBySort } from "./components/AggrBySort";
import { AggrByYear } from "./components/AggrByYear";




const App = () => {
    const [list, setList] = useState([]);

    async function fetchData() {
        const dataURL = process.env.REACT_APP_DATA_URL;
        const response = await fetch(dataURL);
        const json = await response.json();
        setList(json.list);
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div id="app">
            <AggrByMonth list={list} />
            <AggrByYear list={list} />
            <AggrBySort list={list} />
        </div>
    );
};
export default App;
