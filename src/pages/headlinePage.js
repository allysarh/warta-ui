import React from 'react';
import { InputText } from 'primereact/inputtext'
import { TabMenu } from 'primereact/tabmenu';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { URL_API } from '../helper'
import { connect } from 'react-redux';
import { getNewsAction } from '../action'
import { Carousel } from 'primereact/carousel';
import { Card } from 'primereact/card';

class HeadlinePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
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

    componentDidMount() {
        this.setState({ images: this.props.news.map(i => i.images) })
    }
    onClickKategori = (e) => {
        this.setState({ activeIndex: e.index })
        let kategori = e.value.label
        console.log("kategori: ", kategori)
    }

    printImages = (news) => {
        return (
            <div>
                <div style={{ width: '100%', height: '70vh', overflow: 'hidden', objectFit: 'cover', position: 'relative', zIndex: 1, top: 0 }}>
                    <img src={news.images} style={{ width: '100%', filter: 'grayscale(50%)' }} />
                </div>
                <div style={{ position: 'absolute', top: '220px', zIndex: 2, width: '100%', marginLeft: '4%' }}>
                    <Card style={{width: '40%', backgroundColor: '#e8ecef', height: 'auto'}}>
                        <h4>{news.judul}</h4>
                        <Button label="Baca Lebih" className="mt-1 p-button-rounded" icon="pi pi-arrow-right" style={{float: 'right'}} />
                    </Card>
                </div>
            </div>
        )
    }
    render() {
        console.log("news:", this.props.news)
        return (
            <div style={{ height: '100vh', width: '100%' }} className="container-fluid">
                <TabMenu
                    style={{ height: '10%', width: '50vw', margin: 'auto', padding: 'auto' }}
                    model={this.menu}
                    activeIndex={this.state.activeIndex}
                    onTabChange={e => this.onClickKategori(e)}
                />
                <div className="mt-3">
                    <Carousel value={this.props.news} numVisible={1} numScroll={1} autoplayInterval={5000} itemTemplate={this.printImages} />
                </div>
            </div>
        );
    }
}


const mapStateToProps = ({ NewsReducer }) => {
    return {
        news: NewsReducer.news_list
    }
}

export default connect(mapStateToProps, { getNewsAction })(HeadlinePage);