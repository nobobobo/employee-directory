import React from 'react';
import Navbar from "../components/Navbar";
import Table from "../components/Table";


function Page() {
    return (
        <div>
            <Navbar />
            <div className="container">
                <Table />
            </div>
        </div>
    );
}

export default Page;