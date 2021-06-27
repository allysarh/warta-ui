import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { URL_API } from '../helper';

class CardComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    onClickCard = async () => {
        try {
            let { idnews, view } = this.props.data
            view += 1
            let res = await axios.patch(URL_API + `/news/update-view`, {
                idnews, view: view
            })
            console.log(res.data)
        } catch (error) {
            console.log("error patch click card", error)
        }
    }
    render() {
        let { idnews, judul, images, date } = this.props.data
        const header = (
            <img alt="Card"
                src={images}
                style={{ height: '200px' }}
                onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
        );
        return (
            <Link to={`/detail-news?id=${idnews}`} style={{ textDecoration: 'none' }} onClick={this.onClickCard}>
                <Card title={judul} subTitle={`Tanggal: ${date.split("T")[0]}`} style={{ width: '25em', height: '25em', margin: '1%' }} header={header}>
                </Card>
            </Link>
        );
    }
}

export default CardComp;