import axios from "axios"
import { GET_NEWS, NEWS_BY_CAT, URL_API } from "../helper"

export const getNewsAction = () => {
    return async (dispacth) => {
        try {
            let getAllNews = await axios.get(URL_API + `/news/get-news`)
            console.log("news action", getAllNews.data)
            dispacth({
                type: GET_NEWS,
                payload: getAllNews.data
            })
        } catch (error) {
            console.log("error get news action", error)
        }
    }
}

export const getNewsByCat = (kategori) => {
    return async (dispacth) => {
        try {
            let getNewsKategori = await axios.get(URL_API + `/news/get-news?kategori=${kategori}`)
            // console.log("news action k", getNewsKategori.data)
            dispacth({
                type: NEWS_BY_CAT,
                payload: getNewsKategori.data
            })
        } catch (error) {
            console.log("error get news action", error)
        }
    }
}

export const updateViewAction = (idnews, view) => {
    return async (dispacth) => {
        try {
            view += 1
            let res = await axios.patch(URL_API + `/news/update-view`, {
                idnews, view: view
            })
            console.log(res.data)
            getNewsAction()
            getNewsAction()
            getNewsAction()
        } catch (error) {
            console.log("error get news action", error)
        }
    }
    
}
