import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

class CardComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let {judul, deskripsi, images, kategori, date, author, view} = this.props.data
        const header = (
            <img alt="Card"
            src={images}
            style={{height: '200px'}}
            onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
        );
        return (
            <Card title={judul} subTitle={`Tanggal: ${date.split("T")[0]}`} style={{ width: '25em', height: 'auto', margin: '1%' }} header={header}>
            </Card>
        );
    }
}

export default CardComp;