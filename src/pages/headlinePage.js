import React from 'react';
import { InputText } from 'primereact/inputtext'
import { TabMenu } from 'primereact/tabmenu';
import { Button } from 'primereact/button';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { URL_API } from '../helper'
import { connect } from 'react-redux';
import { getNewsAction } from '../action'
import { Carousel } from 'primereact/carousel';
import { Card } from 'primereact/card';
import CardComp from '../components/CardComp'
import TabComp from '../components/TabComp';
import StockComp from '../components/StockComp';
import { TickerTape, Timeline } from 'react-tradingview-embed';
import ReactWeather from 'react-open-weather';
import WeatherComp from '../components/WeatherComp';


class HeadlinePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTrending: []
        }
        this.menu = [
            { label: 'Home' },
            { label: 'Politik' },
            { label: 'Kesehatan' },
            { label: 'Bisnis' },
            { label: 'Olahraga' },
            { label: 'Teknologi' },
            { label: 'Global' }
        ]
    }


    printImages = (news) => {
        return (
            <div>
                <div style={{ width: '100%', height: '70vh', overflow: 'hidden', objectFit: 'cover', position: 'relative', zIndex: 1, top: 0 }}>
                    <img src={news.images} style={{ width: '100%', filter: 'grayscale(50%)' }} />
                </div>
                <div style={{ position: 'absolute', top: '270px', zIndex: 2, width: '100%', marginLeft: '4%' }}>
                    <Card style={{ width: '40%', backgroundColor: '#e8ecef', height: 'auto' }}>
                        <h4>{news.judul}</h4>
                        <Button label="Baca Lebih" className="mt-1 p-button-rounded" icon="pi pi-arrow-right" style={{ float: 'right' }} />
                    </Card>
                </div>
            </div>
        )
    }

    printCardKategori = () => {
        return this.state.newsPrint.map((item, index) => {
            return <CardComp data={item} />
        })
    }

    printCard = () => {
        return this.props.news.map((item, index) => {
            return <CardComp data={item} />
        })
    }
    componentDidMount() {
        this.props.getNewsAction()
    }
    printDataTrending = () => {
        let dataTrending = this.props.news.sort((a, b) => {
            return b.view - a.view
        })
        console.log("data:", dataTrending)
        return dataTrending.splice(0, 5).map((item, index) => {
            return (
                <table style={{ fontFamily: 'times-new-roman' }}>
                    <tr>
                        <td style={{ width: '5%' }}>{index + 1}.</td>
                        <td>{item.judul}</td>
                    </tr>
                </table>
            )
        })
    }
    render() {
        console.log(this.props.news)
        return (
            <div style={{ height: '100%', width: '100%' }} className="container-fluid">
                <TabComp />
                <div className="my-3">
                    <TickerTape widgetProps={{ colorTheme: 'light' }} />
                </div>
                <div className="mt-3">
                    <Carousel value={this.props.news} circular={true} numVisible={1} numScroll={1} autoplayInterval={3000} itemTemplate={this.printImages} />
                </div>
                <div className="px-4" style={{ fontFamily: 'times-new-roman', fontStyle: 'italic', fontWeight: 'bolder' }}>
                    <h3>Rangkuman Berita untuk {this.props.username ? this.props.username : "Anda"} Hari Ini</h3>
                    <hr />
                </div>
                <div className="d-flex justify-content-around">
                    <div className=" d-flex justify-content-around flex-wrap" style={{ width: '60%' }}>
                        {this.printCard()}
                    </div>
                    <div style={{ width: '35%' }}>
                        <div style={{ border: '1px solid #eaeae8', padding: '5%', marginTop: '30px', marginBottom: '20px' }}>
                            <span style={{ fontSize: '10px' }}>Berita yang paling banyak dilihat</span>
                            <h3>#Trending : </h3>
                            {
                                this.printDataTrending()
                            }
                        </div>
                        <WeatherComp />
                        <StockComp />
                        <div className="my-3">
                            <h4>Update Bisnis Global</h4>
                            <hr />
                            <Timeline widgetProps={{ colorTheme: 'light' }} />
                        </div>
                    </div>
                </div>

            </div>
        );

    }
}


const mapStateToProps = ({ NewsReducer, authReducer }) => {
    return {
        news: NewsReducer.news_list,
        kategori: NewsReducer.kategori,
        username: authReducer.username
    }
}

export default connect(mapStateToProps, { getNewsAction })(HeadlinePage);
