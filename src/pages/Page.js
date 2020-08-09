import React from 'react';
import Navbar from "../components/Navbar";
import Body from "../components/Body";


function Page() {
    return (
        <div>
            <Navbar />
            <div className="container">
                <Body />
            </div>
        </div>
    );
}

export default Page;