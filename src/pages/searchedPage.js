import React from 'react';
import { connect } from 'react-redux';
import TabComp from '../components/TabComp'
import { getNewsAction, updateViewAction } from '../action'
import { Link } from 'react-router-dom'

class SearchedPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queryNews: [],
            query: ''
        }
    }

    componentDidMount() {
        this.getFIlteredNews()
    }
    getFIlteredNews = () => {
        this.props.getNewsAction()
        let query = this.props.location.search.split("=")[1].split("%")
        let queryConvert = this.props.location.search.split("=")[1].replace("%", " ")
        let data = [...this.props.news]
        let filter = []

        query.forEach(element => {
            let regex = new RegExp(`${element}`, "ig")
            data.forEach((item) => {
                if (item.deskripsi.match(regex)) {
                    filter.push(item)
                }
            });
        })

        this.setState({ queryNews: filter, query: queryConvert })
        console.log("filter", filter)
    }

    tanggal = (tanggal) => {
        let bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November']
        let output = tanggal.split('-')
        return `${output[2]} ${bulan[1]} ${output[0]}`
    }

    printSearch = () => {
        return this.state.queryNews.map((item, index) => {

            return (
                <div className="d-flex align-items-center justify-content-around p-5" style={{ borderTop: '1px solid #cad1d6', borderBottom: '1px solid #cad1d6' }}
                >
                    <div style={{ display: 'flex' }}>
                        {this.tanggal(item.date.split("T")[0])}
                    </div>
                    <Link style={{ fontFamily: 'georgia, "times new roman', cursor: 'pointer', textDecoration: 'none', color: 'black', width: '60%' }} onClick={this.props.updateViewAction} to={`/detail-news?id=${item.idnews}`}>
                        <p style={{ fontFamily: 'helvetica, arial', fontSize: '11px' }}>{item.kategori.toUpperCase()}</p>
                        <h4 style={{ fontSize: '23px' }}>{item.judul}</h4>
                        <p style={{ fontSize: '14px' }}>{item.deskripsi.substr(0, 100)} ...</p>
                        <p style={{ fontSize: '12px' }}>By: {item.author}</p>
                    </Link>
                    <img src={item.images} style={{ width: '200px', height: '100px' }} />
                </div>
            )
        })
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row m-auto p-auto" style={{ height: '50px' }}>
                    <TabComp />
                </div>
                <div className="my-3 d-flex alignt-items-center">
                    <span className="mx-2">Menampilkan {this.state.queryNews.length} hasil untuk:  </span>
                    <h4>{`"${this.state.query}"`}</h4>
                </div>
                {this.printSearch()}
            </div>
        );
    }
}

const mapStateToProps = ({ NewsReducer }) => {
    return {
        news: NewsReducer.news_list,
        filteredNews: NewsReducer.filtered_news
    }
}
export default connect(mapStateToProps, { getNewsAction, updateViewAction })(SearchedPage);