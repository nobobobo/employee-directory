import React from "react";

function TableElm(props) {
    console.log(props);
    return (
        <tr>
            <td><img src={props.picture.thumbnail} /></td>
            <td>{props.name.first}</td>
            <td>{props.name.last}</td>
            <td>{props.phone}</td>
            <td>{props.email}</td>
        </tr>
    );
}

export default TableElm;