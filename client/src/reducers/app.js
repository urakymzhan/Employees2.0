<<<<<<< HEAD

const initialState = {
    employees: [],
    isLoading: false,
}

// reducer
export default function(state=initialState, action ) {
    const { type, payload } = action;

    switch(type) {
=======
const initalState = {
    employees: [],
    isLoading: false,
    errors: "",

    search: '',
    searchBy: '',
    sortBy: '',
    toggleOrder: false
}
export default function(state = initalState, { type, payload }) {

    console.log("payload", payload);

    switch (type) {
>>>>>>> with-redux
        case "LOAD_EMPLOYEES":
            return {
                ...state,
                employees: payload,
                isLoading: false
            }
<<<<<<< HEAD
        case "LOAD_EMPLOYEES_FAILED":
            return {
                ...state,
                isLoading: true
=======
        case "EMPLOYEES_LOAD_FAILED":
            return {
                ...state,
                // even tho it failed we should be able to see list of employees but just show an eror. not sure about this part
                isLoading: false,
                // ideally show this message in Error Component if we have
                errors: payload
>>>>>>> with-redux
            }
        case "ADD_EMPLOYEE":
            return {
                ...state,
                employees: [payload, ...state.employees],
                isLoading: false
            }
        case "ADD_EMPLOYEE_FAILED":
            return {
                ...state,
<<<<<<< HEAD
                isLoading: false
=======
                isLoading: false,
                errors: payload
            }
        case "EDIT_EMPLOYEE":
            return {
                ...state,
                employees: state.employees.map(el => {
                          if (el.id === payload.id) {
                            return payload
                          }
                          return el
                        }),
                isLoading: false,
            }
        case "EDIT_EMPLOYEE_FAILED":
            return {
                ...state,
                isLoading: false,
                errors: payload
            }
        case "DELETE_EMPLOYEE":
            return {
                ...state,
                employees: state.employees.filter(el => el._id !== payload._id),
                isLoading: false,
            }
        case "DELETE_EMPLOYEE_FAILED":
            return {
                ...state,
                isLoading: false,
                errors: payload
>>>>>>> with-redux
            }
        default:
            return state;
    }
<<<<<<< HEAD

}
=======
}
>>>>>>> with-redux
