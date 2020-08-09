import React, { useEffect, useState } from "react";
import API from "../utils/API";
import Table from "./Table";
import Search from "./Search";

function Body() {

    const [order, setOrder] = useState({
        by: "default",
        asc: false
    });

    const [arrow, setArrow] = useState({
        first: "△▽",
        last: "△▽",
        phone: "△▽",
        email: "△▽",
    })

    const [employees, setEmployees] = useState({
        original: [],
        filtered: [],
        term: ""
    });


    useEffect(() => {
        API.search()
            .then(res => {
                setEmployees({...employees, original:res.data.results, filtered: res.data.results});
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

        const sortOrg = [].concat(employees.original);
        const sortFlt = [].concat(employees.filtered);

        let arrowObj = {
            first: "△▽",
            last: "△▽",
            phone: "△▽",
            email: "△▽",
        }

        if (key === order.by && order.asc) {
            sortOrg.sort((a, b) => { return -1 * compare(a, b, key) });
            sortFlt.sort((a, b) => { return -1 * compare(a, b, key) });
            setOrder({ by: key, asc: false });
            arrowObj[key] = "△▼";
        } else {
            sortOrg.sort((a, b) => { return compare(a, b, key) });
            sortFlt.sort((a, b) => { return compare(a, b, key) });
            setOrder({ by: key, asc: true });
            arrowObj[key] = "▲▽";
        }

        setEmployees({...employees, original: sortOrg, filtered: sortFlt});
        setArrow(arrowObj);
    }

    const handleInputChange = event => {
        const { value } = event.target;
        setEmployees({...employees, term: value,});

        const filtOrg = employees.original.filter((emp) => {return (
              emp.name.first.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
              emp.name.last.toLowerCase().indexOf(value.toLowerCase()) > -1 
            );});
        
        setEmployees({...employees, filtered: filtOrg}); 
    }

    return (
        <div>
            <div className="row">
                <Search term= {employees.term} handleInputChange={handleInputChange}/>
            </div>
            <div className="row">
                <Table sortOnColumn={sortOnColumn} arrow={arrow} employees={employees} />
            </div>
        </div>

    );
}

export default Body;
