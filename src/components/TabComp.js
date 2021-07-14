import React from 'react';
import { InputText } from 'primereact/inputtext'
import { TabMenu } from 'primereact/tabmenu';
import { connect } from 'react-redux';
import { getNewsByCat } from '../action'
import { Link, Redirect, withRouter } from 'react-router-dom'

class TabComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: null,
            kategori: null
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


    onClickKategori = (e) => {
        this.props.getNewsByCat(e.value.label)

        if (e.value.label === "Home") {
            this.props.history.push(`/`)
        } else {
            this.props.history.push(`/kategori/${e.value.label}`)
        }
    }

    render() {
        let index = this.menu.findIndex(item => item.label === this.props.location.pathname.split("/")[2])
        return (
                <TabMenu
                    style={{ height: '100%', width: 'auto', margin: 'auto', padding: 'auto' }}
                    model={this.menu}
                    activeIndex={index != -1 ? index : 0}
                    onTabChange={e => this.onClickKategori(e)}
                />

        );
    }
}
const mapStateToProps = ({ NewsReducer }) => {
    return {
        news: NewsReducer.news_list,
        newsKategori: NewsReducer.news_kategori
    }
}
export default withRouter(connect(mapStateToProps, { getNewsByCat })(TabComp));