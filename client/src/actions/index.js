<<<<<<< HEAD
// action creators

const baseUrl = 'http://localhost:5000/'


// get all employees
export const getData = () => dispatch => {  // call getData with dispatch
    // async
    fetch(`${baseUrl}api/employees`)
        .then(res => res.json())
        .then(employees => { // 200 OK
            dispatch({
                type: "LOAD_EMPLOYEES",
                payload: employees
            })
        })
        .catch(err => { // 500 
            dispatch({
                type: "LOAD_EMPLOYEES_FAILED",
                payload: err.message
            })
        })
}
// add
export const addEmployee = (employee) => dispatch => {
    fetch(`${baseUrl}api/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee)
    })
        .then(res => res.json())
        .then(response => {
            dispatch({
                type: "ADD_EMPLOYEE",
                payload: response
            })
        })
        .catch(err => {
            dispatch({
                type: "ADD_EMPLOYEE_FAILED",
                payload: err.message
            })
        })
}



=======

import { getData, addEmployee, editEmployee, deleteEmployee } from './app';
// import { } from './employee';

export {
    getData,
    addEmployee,
    editEmployee,
    deleteEmployee
}

>>>>>>> with-redux
