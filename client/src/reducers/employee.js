
const initialState = {
    employee: {}
}

export default function(state=initialState, action) {
    const { type, payload }  = action;

    switch(type) {
        case "":
            return {

            }
        default:
            return state;
    }
}