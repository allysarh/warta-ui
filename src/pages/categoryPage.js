import React from 'react';
import { connect } from 'react-redux';
import TabComp from '../components/TabComp';
import CardComp from '../components/CardComp'
import { getNewsAction, getNewsByCat, updateViewAction } from '../action';
import { Link, withRouter } from 'react-router-dom';
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
        return dataCard.splice(4, dataCard.length).map((item, index) => {
            return (
                <CardComp data={item} />
            )
        })
    }

    printSideCard = () => {
        let hasil = [...this.props.newsKategori]

        return hasil.splice(0, 4).map((item, index) => {
            return (
                <Link
                to={`/detail-news?id=${item.idnews}`} 
                style={{ width: "40%", cursor: 'pointer', color: 'black', textDecoration: 'none' }} 
                onClick={() => this.props.updateViewAction(item.idnews, item.view)}>
                    <img src={item.images} style={{ width: '100%' }} />
                    <span style={{ fontWeight: 'bold' }}>{item.judul}</span>
                </Link>
            )
        })
    }
    render() {
        let { newsKategori } = this.props
        return (
            <div className="container">
                <TabComp />
                {
                    newsKategori.length > 0 &&
                    <div className="d-flex justify-content-between p-4 m-auto align-items-center">
                        <div style={{ width: '50%', cursor: 'pointer' }}>
                            <Link style={{ height: '60vh', width: '100%' }} onClick={() => this.props.updateViewAction(newsKategori[0].idnews, newsKategori[0].view)} 
                            to={`/detail-news?id=${newsKategori[0].idnews}`}>
                                <img src={newsKategori[0].images}
                                    style={{ height: '100%', width: '100%' }} />
                            </Link>
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
                <div style={{marginTop: '5%'}}>
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
export default withRouter(connect(mapStateToProps, { getNewsByCat, getNewsAction, updateViewAction })(CategoryPage));