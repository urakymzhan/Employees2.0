
const initialState = {
    employees: [],
    isLoading: false,
}

// reducer
export default function(state=initialState, action ) {
    const { type, payload } = action;

    switch(type) {
        case "LOAD_EMPLOYEES":
            return {
                ...state,
                employees: payload,
                isLoading: false
            }
        case "LOAD_EMPLOYEES_FAILED":
            return {
                ...state,
                isLoading: true
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
                isLoading: false
            }
        default:
            return state;
    }

}
