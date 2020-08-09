import React, { useEffect, useState } from "react";
import API from "../utils/API";
import TableElm from "./TableElm";

function Table() {

    const [order, setOrder] = useState({
        by: "default",
        asc: false
    });
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        console.log(order);
        API.search()
            .then(res => {
                setEmployees(res.data.results);
            }).catch(err => console.log(err));
    }, []);

    const compareFirstName = (a, b, key) => {
        if (key === "first" || key === "last") {
            return a["name"][key] > b["name"][key] ? 1 : -1;
        } else {
            return a[key] > b[key] ? 1 : -1
        }
    }
    const sortOnColumn = (event) => {
        let key = event.target.id;

        const sorted = [].concat(employees);

        if (key === order.by && order.asc){
            sorted.sort((a, b) => { return -1*compareFirstName(a,b,key)});
            setOrder({by: key, asc: false});
        } else {
            sorted.sort((a, b) => { return compareFirstName(a,b,key)});
            setOrder({by: key, asc: true});
        } 

        setEmployees(sorted);
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col"><div id="first" onClick={sortOnColumn}>First Name</div></th>
                    <th scope="col"><div id="last" onClick={sortOnColumn}>Last Name</div></th>
                    <th scope="col"><div id="phone" onClick={sortOnColumn}>Phone #</div></th>
                    <th scope="col"><div id="email" onClick={sortOnColumn}>Email</div></th>
                </tr>
            </thead>
            <tbody>
                {employees.map(elm => <TableElm key={elm.email} {...elm} />)}
            </tbody>
        </table>
    );
}

export default Table;
