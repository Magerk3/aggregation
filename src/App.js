import React, { useEffect } from "react";
import { useState } from "react";

const aggregation = (WrappedComponent, groupBy) => {
    return (props) => {
        const [data, setData] = useState([]);
        useEffect(() => {
            const newData = [];
            for(let item of props.list){
                const newDate = new Date(item.date);
                //console.log(newDate)
                newData.push({
                    year: newDate.getFullYear(),
                    month: newDate.getMonth(),
                    date: item.date,
                    amount: item.amount,
                });
            }
        
            newData.sort((a, b) => new Date(a.date) - new Date(b.date));
            setData(newData)
            console.log(data)
            
        },[props.list]);
        const groupList = (data, groupBy) => {
            if(groupBy === undefined){
               return data 
            } 
            else {
                return data.reduce((acc, curr) => {
                if(groupBy === 'year') {
                    const existingYear = acc.find(item => item.year === curr.year);
                    if(existingYear) existingYear.amount += curr.amount;
                    else acc.push(curr)
                } else if(groupBy === 'month') {
                    const existingMonth = acc.find(item => item.month === curr.month)
                    if(existingMonth) existingMonth.amount += curr.amount;
                    else acc.push(curr)
                } 
                return acc;
            },[])
            } 
        }
        return <WrappedComponent list={groupList(data, groupBy)} />;
    };
};

const AggrByMounth = aggregation(MonthTable, 'month');
const AggrByYear = aggregation(YearTable, 'year');
const AggrBySort = aggregation(SortTable);

function YearTable(props) {
    console.log("YearTable", props);

    return (
        <div>
            <h2>Year Table</h2>
            <table>
                <tr>
                    <th>Year</th>
                    <th>Amount</th>
                </tr>
                {props.list.map((item) => (
                    <tr>
                        <td>{item.year}</td>
                        <td>{item.amount}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

function SortTable(props) {
    console.log("SortTable", props);

    return (
        <div>
            <h2>Sort Table</h2>
            <table>
                <tr>
                    <th>Date</th>
                    <th>Amount</th>
                </tr>
                {props.list.map((item) => (
                    <tr>
                        <td>{item.date}</td>
                        <td>{item.amount}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

function MonthTable(props) {
    console.log("MonthTable", props);

    return (
        <div>
            <h2>Month Table</h2>
            <table>
                <tr>
                    <th>Month</th>
                    <th>Amount</th>
                </tr>
                {props.list.map((item) => (
                    <tr>
                        <td>{item.month}</td>
                        <td>{item.amount}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

// 1. Загрузите данные с помощью fetch: https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hoc/aggregation/data/data.json
// 2. Не забудьте вынести URL в переменные окружения (не хардкодьте их здесь)
// 3. Положите их в state
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
            <AggrByMounth list={list} />
            <AggrByYear list={list} />
            <AggrBySort list={list} />
        </div>
    );
};
export default App;
