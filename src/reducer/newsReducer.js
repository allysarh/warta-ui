import { GET_NEWS } from "../helper"

const INITIAL_STATE = {
    news_list: []
}

export const NewsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_NEWS:
            // console.log("news_list:", action.payload)
            return { ...state, news_list: action.payload }
        default:
            return state
    }
}