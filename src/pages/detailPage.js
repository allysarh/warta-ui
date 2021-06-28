import axios from 'axios';
import React from 'react';
import TabComp from '../components/TabComp';
import { URL_API } from '../helper';
import { Chip } from 'primereact/chip';

class DetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailNews: {},
            tanggal: null
        }
    }

    componentDidMount() {
        this.getDetailNews()

    }
    getDetailNews = async () => {
        try {
            let idNews = this.props.location.search.split("=")[1]
            let res = await axios.get(URL_API + `/news/get-news?idnews=${idNews}`)
            this.setState({ detailNews: res.data[0] })
            let tanggal = this.state.detailNews.date.split("T")[0]
            this.tanggal(tanggal)
            
        } catch (error) {
            console.log("error get detail news", error)
        }
    }

    tanggal = (tanggal) => {
        let bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November']
        let output = tanggal.split('-')
        let printTanggal = `${output[2]} ${bulan[1]} ${output[0]}`
        this.setState({ tanggal: printTanggal })
    }
    render() {
        let { images, judul, author, view, deskripsi, date, kategori } = this.state.detailNews
        let halo = "halo \n a"

        console.log("halo", halo)
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <TabComp />
                <div className="m-5" style={{ width: '70vw' }}>
                    <h1 style={{ fontSize: '40px', fontStyle: 'italic', fontFamily: 'georgia, "times new roman", times, seri' }}>{judul}</h1>
                    <hr />
                    <div style={{ alignItems: 'left', width: '80vw', padding: '1%' }}>
                        <h6 className="my-3">Kategori Berita: {kategori}</h6>
                        <Chip label="Facebook" icon="pi pi-facebook" className="p-mr-2 p-mb-2" />
                        <Chip label="Twitter" icon="pi pi-twitter" className="p-mr-2 p-mb-2 mx-2" />
                        <Chip label="Mail" icon="pi pi-envelope" className="p-mr-2 p-mb-2 mx-2" />
                        <Chip label="Share" icon="pi pi-share-alt" className="p-mr-2 p-mb-2 mx-2" />
                        <Chip label={`Dilihat: ${view}`} icon="pi pi-eye" className="p-mr-2 p-mb-2 mx-2" />
                    </div>
                </div>
                <img src={images} style={{ width: '80vw' }} />
                <div className="my-3" style={{ width: '80vw' }}>
                    <div className="d-flex flex-column">
                        <span style={{ fontFamily: 'helvetica, arial', fontWeight: 'bold', fontSize: '15px', margin: '1%' }}>Penulis: {author}</span>
                        <span style={{ fontFamily: 'helvetica, arial', fontWeight: '500', fontSize: '13px', margin: '1%' }}>{this.state.tanggal}</span>
                    </div>
                    <p className="my-3" style={{ fontSize: '20px', fontFamily: 'georgia, times new roman', lineHeight: '30px', textAlign: 'justify' }}>
                        {deskripsi}
                    </p>
                </div>
            </div>
        );
    }
}

export default DetailPage;