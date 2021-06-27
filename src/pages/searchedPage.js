import React from 'react';
import { connect } from 'react-redux';
import TabComp from '../components/TabComp'
import { getNewsAction } from '../action'
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

    printSearch = () => {
        return this.state.queryNews.map((item, index) => {
            return (
                <div className="d-flex align-items-center justify-content-around p-5" style={{borderTop: '1px solid #cad1d6', borderBottom:'1px solid #cad1d6'}}>
                    <div style={{display: 'flex'}}>
                        {item.date}
                    </div>
                    <div style={{fontFamily: 'georgia, "times new roman'}}>
                        <p style={{fontFamily: 'helvetica, arial', fontSize :'11px'}}>{item.kategori.toUpperCase()}</p>
                        <h4 style={{fontSize: '23px' }}>{item.judul}</h4>
                        <p style={{fontSize: '14px'}}>{item.deskripsi.substr(0, 100)} ...</p>
                        <p style={{fontSize: '12px'}}>By: {item.author}</p>
                    </div>
                    <img src={item.images} style={{ width: '200px', height: '100px' }} />
                </div>
            )
        })
    }
    render() {
        return (
            <div className="container-fluid">
                <TabComp />
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
export default connect(mapStateToProps, { getNewsAction })(SearchedPage);