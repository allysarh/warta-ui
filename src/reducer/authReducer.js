const INITIAL_STATE = {
    iduser: null,
    username: '',
    email: '',
    role: ''
}

export const authReducer = (state = INITIAL_STATE, action) => {
    // console.log("Data user reducer :", action.payload)
    switch (action.type) {
        case "LOGIN_SUCCESS":
            delete action.payload.password
            return { ...state, ...action.payload }
        case "LOGOUT":
            return INITIAL_STATE
        default:
            return state
    }
}