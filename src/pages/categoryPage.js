import React from 'react';
import { connect } from 'react-redux';
import TabComp from '../components/TabComp';
import CardComp from '../components/CardComp'
import { getKategori, getNewsAction, getNewsByCat } from '../action';

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
        // return this.props.newsKategori.map((item, index) =>{
        //     return (
        //         <CardComp data={item}/>
        //     )
        // })
    }

    printSideCard = () => {
        return this.props.newsKategori.splice(0, 4)
    }
    render() {
        let { newsKategori } = this.props
        let randomIndex = Math.floor(Math.random() * newsKategori.length)
        
        return (
            <div className="container">
                <TabComp />
                {
                    newsKategori.length > 0 &&
                    <div>
                        <div style={{ width: '50%' }}>
                            <div style={{ height: '60vh', marginTop: '2%', width: '100%' }}>
                                <img src={newsKategori[randomIndex].images}
                                    style={{ height: '100%', width: '100%' }} />
                            </div>
                            <div className="mt-2" style={{ width: '100%' }}>
                                <h6>{newsKategori[randomIndex].author}</h6>
                                <h5>{newsKategori[randomIndex].judul}</h5>
                            </div>
                        </div>
                        <div style={{ width: '50%' }}>

                        </div>
                    </div>
                }
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
export default connect(mapStateToProps, { getNewsByCat, getNewsAction })(CategoryPage);