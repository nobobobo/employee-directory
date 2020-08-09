import React, { useEffect, useState } from "react";
import API from "../utils/API";
import TableElm from "./TableElm";

function Table() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        API.search()
            .then(res => {
                setEmployees(res.data.results);
            }).catch(err => console.log(err));
    }, []);

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Phone #</th>
                    <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody>
                {employees.map(elm => <TableElm {...elm} />)}
            </tbody>
        </table>
    );
}

export default Table;
