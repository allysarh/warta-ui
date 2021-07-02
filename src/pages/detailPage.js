import axios from 'axios';
import React from 'react';
import TabComp from '../components/TabComp';
import { URL_API } from '../helper';
import { Chip } from 'primereact/chip';
import { connect } from 'react-redux';
import { getNewsAction } from '../action'
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { AvatarGroup } from 'primereact/avatargroup';
import { Badge } from 'primereact/badge';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';

class DetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailNews: {},
            tanggal: null,
            komentar: '',
            dataKomentar: []
        }
    }

    componentDidMount() {
        this.props.getNewsAction()
        this.props.getNewsAction()
        this.getDetailNews()
        this.getKomentar()

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

    onBtnComment = () => {
        // console.log("Cek Comment :", this.state.detailNews.idnews)
        console.log("Cek User :", this.props.idstatus)
        // let token = localStorage.getItem("tkn_id")
        // if (token) {
        //     const headers = {
        //         headers: {
        //             "Authorization": `Bearer ${token}`
        //         }
        //     }
        if (this.props.idstatus == 1) {
            axios.post(URL_API + `/news/add-komentar`, {
                idnews: this.state.detailNews.idnews,
                komentar: this.state.komentar,
                iduser: this.props.id
            })
                .then(res => {
                    console.log("Cek Comment :", res.data)
                    // alert("Success Add Comment ✅")
                    this.toast.show({ severity: 'success', detail: 'Success Add Comment ✅', life: 3000 })
                    this.getKomentar()
                })
                .catch(err => {
                    console.log("Error Comment :", err)
                })
        } else {
            console.log("Account Not Verified")
            this.toast.show({ severity: 'error', detail: 'Account Not Verified, Please Register & Verified Account !', life: 3000 })
        }
        // }
    }

    getKomentar = async () => {
        try {
            let idNews = this.props.location.search.split("=")[1]
            let komentar = await axios.get(URL_API + `/news/get-komentar?idnews=${idNews}`)
            console.log("komentar", komentar.data)
            this.setState({ dataKomentar: komentar.data })
        } catch (error) {
            console.log(error)
        }
    }

    printKomentar = () => {
        console.log("username:",this.state.dataKomentar)
        return this.state.dataKomentar.map((item, index) => {
            return (
                <div className="card" style={{ border: 'none', background: 'none', width: '80vw', margin: '1%' }}>
                    <Card>
                        <div className="d-flex align-items-center">
                            <Avatar icon="pi pi-user" className="p-mr-2" size="large" shape="circle" />
                            <h6 className="mx-2">{item.username ? item.username : 'Anonymous'}</h6>
                        </div>
                        <p>{item.komentar}</p>
                        <div style={{ float: 'right' }} className="d-flex align-items-center">
                            <i className="pi pi-thumbs-up mx-2"></i>
                            <Badge value="2"></Badge>
                            <i className="pi pi-thumbs-down mx-2"></i>
                            <Badge value="2"></Badge>
                        </div>
                    </Card>
                </div>
            )
        })
    }
    render() {
        let { images, judul, author, view, deskripsi, date, kategori } = this.state.detailNews
        let halo = "halo \n a"

        console.log("halo", halo)
        return (
            <div className="container-fluid" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div className="row m-auto p-auto" style={{ height: '50px' }}>
                    <TabComp />
                </div>
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
                    <p className="my-3"
                        style={{ fontSize: '20px', fontFamily: 'georgia, times new roman', lineHeight: '30px', textAlign: 'justify' }}>
                        {deskripsi}
                    </p>
                    <hr />
                </div>

                {/* KOLOM KOMENTAR */}
                <div>
                    <h5>Komentar :</h5>
                    {this.printKomentar()}
                </div>
                <div style={{ width: '80vw' }}>
                    <Messages ref={(el) => this.toast = el} />
                </div>
                <div className="card" style={{ border: 'none', background: 'none', width: '80vw' }}>
                    <h6 style={{ fontFamily: 'Montserrat', fontWeight: '600', fontSize: '20px' }}>Comment</h6>
                    <InputTextarea value={this.state.komentar} onChange={(e) => this.setState({ komentar: e.target.value })} rows={5} cols={30} autoResize />
                </div>
                <div className="my-5" style={{ width: '30rem', margin: 'auto' }}>
                    <Button onClick={this.onBtnComment} style={{ width: '30rem' }} label="Create Comment" className="p-button-rounded" />
                </div>
            </div>
        );
    }
}

const mapToProps = ({ authReducer }) => {
    return {
        id: authReducer.iduser,
        idstatus: authReducer.idstatus
    }
}

export default connect(mapToProps, { getNewsAction })(DetailPage);
