import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { URL_API } from '../helper';
import { connect } from 'react-redux';
import { getNewsAction, updateViewAction } from '../action'

class CardComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    // onCardClick = () =>{
    //     this.props.updateViewAction(idnews, view)
    // }
    render() {
        let { idnews, judul, images, date, view, kategori } = this.props.data
        const header = (
            <img alt="Card"
                src={images}
                style={{ height: '200px', border: '30px', borderRadius: '30px' }}
                onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
        );
        return (
            <Link to={`/detail-news?id=${idnews}`} style={{ textDecoration: 'none' }} onClick={() => this.props.updateViewAction(idnews, view)}>
                <div style={
                    {
                        display: 'flex',
                        margin: '1%',
                        borderRadius: '20px',
                        padding: '10px',
                        marginTop: '40px',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        textDecoration: 'none',
                        color: 'black',
                        width: '25em',
                        height: '10em',
                        boxShadow: '2px 2px 2px #c7c6c4',
                        border: '1px solid #c7c6c4'
                    }
                }>
                    <div style={{width: '50%', height: '130px'}}>
                        <img alt="Card"
                            src={images}
                            style={{ width: '90%', height: '100%', border: '30px', borderRadius: '20px' }}
                            onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
                    </div>
                    <div style={{width: '50%', height: '100px', display:'flex', justifyContent:'center', flexDirection:'column'}}>
                        <span style={{fontSize: '12px'}}>{kategori}</span>
                        <span style={{fontSize: '15px', fontWeight:'bold'}}>{judul}</span>
                        <span style={{fontSize: '12px'}}>{date.split("T")[0]}</span>
                    </div>
                </div>
            </Link>
        );
    }
}

export default connect(null, { updateViewAction, getNewsAction })(CardComp);