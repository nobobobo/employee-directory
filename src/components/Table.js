import React from "react";
import TableElm from "./TableElm";

function Table({sortOnColumn, arrow, employees}) {

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
                {employees.filtered.map(elm => <TableElm key={elm.email} {...elm} />)}
            </tbody>
        </table>
    );
}

export default Table;
