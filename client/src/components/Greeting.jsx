import React from 'react'
import { Link } from 'react-router-dom';

// Can be implmenent to setup a greeting page insted of redirecting
// Needs styling
export default function Greeting() {
    return (
        <div>
            <Link to="/page/1" > <button>Get Started</button></Link>
        </div>
    )
}
