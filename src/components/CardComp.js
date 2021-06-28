import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { URL_API } from '../helper';
import { connect } from 'react-redux';
import { updateViewAction } from '../action'

class CardComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let { idnews, judul, images, date, view } = this.props.data
        const header = (
            <img alt="Card"
                src={images}
                style={{ height: '200px' }}
                onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
        );
        return (
            <Link to={`/detail-news?id=${idnews}`} style={{ textDecoration: 'none' }} onClick={() => this.props.updateViewAction(idnews, view)}>
                <Card title={judul} subTitle={`Tanggal: ${date.split("T")[0]}`} style={{ width: '25em', height: '25em', margin: '1%' }} header={header}>
                </Card>
            </Link>
        );
    }
}

export default connect(null, {updateViewAction})(CardComp);