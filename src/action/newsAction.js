import axios from "axios"
import { GET_NEWS, URL_API } from "../helper"

export const getNewsAction = () =>{
    return async (dispacth) =>{
        try {
            let getAllNews = await axios.get(URL_API + `/news/get-news`)
            // console.log("news action", getAllNews.data)
            dispacth({
                type: GET_NEWS,
                payload: getAllNews.data
            })
        } catch (error) {
            console.log("error get news action", error)
        }
    }
}
