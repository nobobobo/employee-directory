import React from "react";

function Search({ term, handleInputChange }) {
    return (
        <form className="mx-auto">
            <div className="form-group">
                <label >Search Term:</label>
                <input
                    type="text"
                    onChange={handleInputChange}
                    className="form-control"
                    id="searchTerm"
                    placeholder="Search by first name"
                    />
            </div>
        </form>
    )

}

export default Search;
