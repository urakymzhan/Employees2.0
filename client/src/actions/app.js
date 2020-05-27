// action creator

const apiUrl = 'http://localhost:5000/'

// get all employees
export const getData = () => dispatch => {

    fetch(`${apiUrl}api/employees`)
        .then(response => response.json())
        .then(employees => {
             dispatch({
                type: "LOAD_EMPLOYEES",
                payload: employees
            })
        })
        .catch(err => {
            dispatch({
                type: "EMPLOYEES_LOAD_FAILED",
                payload: err.message
            })
        })
}

// add employee
export const addEmployee = (employee) => dispatch => {

    console.log("employee", employee);

    fetch(`${apiUrl}api/employees`, {
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
// edit employee
export const editEmployee = (employee) => dispatch => {

    fetch(`${apiUrl}api/employee/${employee._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee)
      })
        .then(res => res.json())
        .then(response => {
            dispatch({
                type: "EDIT_EMPLOYEE",
                payload: response
            })
        })
        .catch(err => {
            dispatch({
                type: "EDIT_EMPLOYEE_FAILED",
                payload: err.message
            })
    })
}
// delete employee
export const deleteEmployee = (e, _id) => dispatch => {
    e.preventDefault();

    fetch(`${apiUrl}api/employee/${_id}`, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(response => {
            dispatch({
                type: "DELETE_EMPLOYEE",
                payload: response
            })
        })
        .catch(err => {
            dispatch({
                type: "DELETE_EMPLOYEE_FAILED",
                payload: err.message
            })
    })
}