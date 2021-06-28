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

class HeadlinePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

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


    render() {
        return (
            <div style={{ height: '100%', width: '100%' }} className="container-fluid">
                <TabComp />
                <div className="mt-3">
                    <Carousel value={this.props.news} circular={true} numVisible={1} numScroll={1} autoplayInterval={3000} itemTemplate={this.printImages} />
                </div>
                <div className="m-3 d-flex justify-content-around flex-wrap">
                    {this.printCard()}
                </div>

            </div>
        );

    }
}


const mapStateToProps = ({ NewsReducer }) => {
    return {
        news: NewsReducer.news_list,
        kategori: NewsReducer.kategori
    }
}

export default connect(mapStateToProps, { getNewsAction })(HeadlinePage);