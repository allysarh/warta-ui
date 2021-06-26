import { ACTIVE_INDEX, GET_KATEGORI, GET_NEWS, NEWS_BY_CAT } from "../helper"

const INITIAL_STATE = {
    news_list: [],
    news_kategori: []
}

export const NewsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_NEWS:
            return { ...state, news_list: action.payload }
        case NEWS_BY_CAT:
            return {...state, news_kategori: action.payload}
        default:
            return state
    }
}