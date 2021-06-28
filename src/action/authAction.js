// import axios from "axios"
// import { URL_API } from "../helper"

// export const authLogin = (email, password) => {
//     return async (dispatch) => {
//         try {
//             let res = await axios.post(URL_API + `/users/login`, {
//                 email, password // email berasal dari data backend
//             })
//             console.log("Cek Login :", res.data)
//             if (res.data.idstatus == 2) {
//                 localStorage.setItem('tkn_id', res.data.token)
//                 // Menyimpan data ke reducer
//                 dispatch({
//                     type: "LOGIN_SUCCESS",
//                     payload: { ...res.data }
//                 })
//             } else {
//                 dispatch({
//                     type: "LOGIN_SUCCESS",
//                     payload: { idstatus: res.data.idstatus }
//                 })
//             }
//         } catch (error) {
//             console.log("Error Cuy :", error)
//         }
//     }
// }

export const authLogin = (data) => {
    return {
        type: "LOGIN_SUCCESS",
        payload: data
    }
}

export const authLogout = () => {
    localStorage.removeItem('tkn_id')
    return {
        type: "LOGOUT"
    }
}

export const keepLogin = (data) => {
    return async (dispatch) => {
        try {
            localStorage.setItem('tkn_id', data.token)
            // console.log("Cart User 2", cart)
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: { ...data }
            })
        } catch (error) {
            console.log(error)
        }
    }
}