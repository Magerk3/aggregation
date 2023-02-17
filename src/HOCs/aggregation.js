import { useEffect, useState } from "react";

export const aggregation = (WrappedComponent, groupBy) => {
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