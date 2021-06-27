import React from 'react';
import { connect } from 'react-redux';
import TabComp from '../components/TabComp';
import CardComp from '../components/CardComp'
import { getNewsAction, getNewsByCat } from '../action';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { URL_API } from '../helper';

class CategoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newsKategori: []
        }
    }

    // kalau tembak url langsung:
    componentDidMount() {
        this.props.getNewsByCat(this.props.location.pathname.split("/")[2])
    }

    printCard = () => {
        let dataCard = [...this.props.newsKategori]
        return dataCard.splice(5, dataCard.length).map((item, index) => {
            return (
                <CardComp data={item} />
            )
        })
    }

    onClickDetail = async (idNews) => {
        try {
            // menambahkan view
            let formData = new FormData()
            let data = this.props.news.filter(item => item.idnews === idNews)
            console.log(data)
            data[0].view += 1
            console.log(data)
            console.log(data[0])

            formData.append('data', JSON.stringify(data[0]))
            // formData.append('data', JSON.stringify({id: 1}))
            console.log("FD",formData.get("data"))
            let res = await axios.patch(URL_API + `/news/update-view`, {
                idnews: data[0].idnews,
                view: data[0].view
            })
            console.log("res data", res.data)
            this.props.history.push(`/detail-news?id=${idNews}`)
        } catch (error) {
            console.log("error menambahkan view", error)
        }
    }
    printSideCard = () => {
        let hasil = [...this.props.newsKategori]
        console.log("hasil ", hasil)
        return hasil.splice(0, 4).map((item, index) => {
            return (
                <div style={{ width: "40%", cursor: 'pointer' }} onClick={() => this.onClickDetail(item.idnews)}>
                    <img src={item.images} style={{ width: '100%' }} />
                    <span style={{ fontWeight: 'bold' }}>{item.judul}</span>
                </div>
            )
        })
    }
    render() {
        let { newsKategori } = this.props
        let randomIndex = Math.floor(Math.random() * newsKategori.length)
        return (
            <div className="container">
                <TabComp />
                {
                    newsKategori.length > 0 &&
                    <div className="d-flex justify-content-between p-4 m-auto">
                        <div style={{ width: '50%', cursor: 'pointer' }}>
                            <div style={{ height: '60vh', width: '100%' }} onClick={() => this.onClickDetail(newsKategori[0].idnews)}>
                                <img src={newsKategori[0].images}
                                    style={{ height: '100%', width: '100%' }} />
                            </div>
                            <div className="mt-2" style={{ width: '100%' }}>
                                <h6>{newsKategori[0].author}</h6>
                                <h5>{newsKategori[0].judul}</h5>
                            </div>
                        </div>
                        <div style={{ width: '50%', paddingLeft: '2%' }} className='d-flex flex-wrap justify-content-evenly'>
                            {this.printSideCard()}
                        </div>
                    </div>
                }
                <div >
                    <h4>Berita Lainnya dari {this.props.location.pathname.split("/")[2]}</h4>
                    <hr />
                </div>
                <div className="d-flex justify-content-evenly flex-wrap">
                    {this.printCard()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ NewsReducer }) => {
    return {
        news: NewsReducer.news_list,
        newsKategori: NewsReducer.news_kategori
    }
}
export default withRouter(connect(mapStateToProps, { getNewsByCat, getNewsAction })(CategoryPage));