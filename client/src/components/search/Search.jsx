// import React from 'react';
import { Link }  from 'react-router-dom';
import './search.css';
import React from 'react';

const Search = ({ value, getSearch, getSearchBy, searchBy }) => {
    return (
        <div className="search-bar">
            <div className="aud">
              <Link className='add-user' to='/new-employee'>ADD NEW EMPLOYEE</Link>
            </div>
            <input value={value} onChange={getSearch} className="search" placeholder="Search employee" />
            <select className="select" onChange={getSearchBy} value={searchBy}>
                <option value="">Select</option>
                <option value="first_name">firstName</option>
                <option value="last_name">lastName</option>
                <option value="email">Email</option>
                <option value="city">City</option>
                <option value="state">State</option>
            </select>
        </div>
    )
}

export default Search