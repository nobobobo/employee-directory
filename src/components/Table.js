import React, { useEffect, useState } from "react";
import API from "../utils/API";
import TableElm from "./TableElm";

function Table() {

    const [order, setOrder] = useState({
        by: "default",
        asc: false
    });
    const [arrow, setArrow] = useState({
        first:"△▽",
        last:"△▽",
        phone:"△▽",
        email:"△▽",
    })
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        console.log(order);
        API.search()
            .then(res => {
                setEmployees(res.data.results);
            }).catch(err => console.log(err));
    }, []);

    const compare = (a, b, key) => {
        if (key === "first" || key === "last") {
            return a["name"][key] > b["name"][key] ? 1 : -1;
        } else {
            return a[key] > b[key] ? 1 : -1
        }
    }
    const sortOnColumn = (event) => {
        let key = event.target.id;

        const sorted = [].concat(employees);

        let arrowObj = {
            first:"△▽",
            last:"△▽",
            phone:"△▽",
            email:"△▽",
        }

        if (key === order.by && order.asc) {
            sorted.sort((a, b) => { return -1 * compare(a, b, key) });
            setOrder({ by: key, asc: false });
            arrowObj[key] = "△▼";
        } else {
            sorted.sort((a, b) => { return compare(a, b, key) });
            setOrder({ by: key, asc: true });
            arrowObj[key] = "▲▽";
        }

        setEmployees(sorted);
        setArrow(arrowObj);
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col"><div id="first" onClick={sortOnColumn}>First Name {arrow.first}</div></th>
                    <th scope="col"><div id="last" onClick={sortOnColumn}>Last Name  {arrow.last}</div></th>
                    <th scope="col"><div id="phone" onClick={sortOnColumn}>Phone #  {arrow.phone}</div></th>
                    <th scope="col"><div id="email" onClick={sortOnColumn}>Email  {arrow.email}</div></th>
                </tr>
            </thead>
            <tbody>
                {employees.map(elm => <TableElm key={elm.email} {...elm} />)}
            </tbody>
        </table>
    );
}

export default Table;
