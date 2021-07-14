import React from 'react';
import axios from 'axios';
import { URL_API } from '../helper';
import { Editor } from 'primereact/editor';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { connect } from 'react-redux';
import { Messages } from 'primereact/messages';

class NewsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            judul: '',
            deskripsi: '',
            author: '',
            kategori: '',
            images: '',
            selectedKategori: null,
            fileName: "Select File",
            fileUpload: null,
            fileSrc: null
        }

        this.kategori = [
            { label: 'Politik' },
            { label: 'Kesehatan' },
            { label: 'Bisnis' },
            { label: 'Olahraga' },
            { label: 'Teknologi' },
            { label: 'Global' }
        ];

        this.onBtnKategori = this.onBtnKategori.bind(this);
        this.onBtnAdd = this.onBtnAdd.bind(this);
    }

    onBtnKategori(e) {
        this.setState({ selectedKategori: e.value });
    }

    header = () => {
        return (
            <span className="ql-formats">
                <button className="ql-bold" aria-label="Bold"></button>
                <button className="ql-italic" aria-label="Italic"></button>
                <button className="ql-underline" aria-label="Underline"></button>
            </span>
        )
    }

    onBtnFile = (e) => {
        if (e.target.files[0]) {
            var reader = new FileReader()
            this.setState({
                fileName: e.target.files[0].name,
                fileUpload: e.target.files[0],
                fileSrc: URL.createObjectURL(e.target.files[0])
            })
        } else {
            this.setState({
                fileName: "Select File",
                fileUpload: null,
                fileSrc: `https://safetyaustraliagroup.com.au/wp-content/uploads/2019/05/image-not-found.png`
            })
        }
    }

    onBtnAdd = () => {
        console.log("Cek User :", this.props.idstatus)
        let formData = new FormData()
        let data = {
            judul: this.state.judul,
            deskripsi: this.state.deskripsi,
            kategori: this.state.selectedKategori.label,
            author: this.state.author,
            images: this.state.images
            // images: this.state.fileUpload
            // view: 0
        }
        // console.log("Cek data :", this.state.fileUpload)

        formData.append('data', JSON.stringify(data))
        // formData.append('images', this.state.fileUpload)
        // console.log("Cek data :", this.state.fileUpload.name)
        if (this.props.idstatus == 2) {
            console.log("Verified please !")
            this.toast.show({ severity: 'error', detail: 'Your Account Not Verified !', life: 3000 })
        } else {
            axios.post(URL_API + '/news/add', data)
                .then(res => {
                    this.toast.show({ severity: 'success', detail: 'Add News Success', life: 3000 })
                    console.log("Add News Success :", res.data)
                })
                .catch(err => {
                    console.log("Error Post :", err)
                })
        }
    }

    render() {
        let header = this.header()
        return (
            <div className="add-img">
                <h2 className="text-center mb-5" style={{ fontFamily: 'Montserrat', fontWeight: '600', fontSize: '60px', color: 'antiquewhite' }}>Create News</h2>
                <div className="container">
                    <div className="p-grid p-formgrid p-fluid">
                        <div className="p-col-12 p-mb-2 p-lg-4 p-mb-lg-0" style={{ alignItems: 'center' }}>
                            <Messages ref={(el) => this.toast = el} style={{ margin: 'auto' }} />
                            <div className="p-field p-fluid mb-5">
                                <h6 style={{ fontFamily: 'Montserrat', fontWeight: '600', fontSize: '20px', color: 'antiquewhite' }}>News Title</h6>
                                <InputText id="judul" type="text" aria-describedby="username-help" value={this.state.judul} onChange={(e) => this.setState({ judul: e.target.value })} />
                                <small id="username-help" style={{ float: 'right', color: 'red', fontSize: '12px' }}><i>*Required</i></small>
                            </div>
                            <div className="card" style={{ border: 'none', background: 'none' }}>
                                <h6 style={{ fontFamily: 'Montserrat', fontWeight: '600', fontSize: '20px', color: 'antiquewhite' }}>Description</h6>
                                <InputTextarea value={this.state.deskripsi} onChange={(e) => this.setState({ deskripsi: e.target.value })} rows={5} cols={30} autoResize />
                                {/* <Editor style={{ height: '320px' }} value={this.state.deskripsi} onTextChange={(e) => this.setState({ deskripsi: e.htmlValue })} /> */}
                            </div>
                            <small id="username-help" style={{ float: 'right', color: 'red', fontSize: '12px' }}><i>*Required</i></small>
                            {/* <div className="mt-5">
                                <div className="row" style={{ justifyContent: 'center' }}>
                                    <div className="col-md-7 text-center"> */}
                            {/* {this.state.fileSrc == null ? (
                                            <>
                                                <img src="https://portal.bimakota.go.id/upload/not_image.png" width="300em" height="auto" />
                                            </>
                                        ) : (
                                            <>
                                                <img src={this.state.fileSrc} width="300em" height="auto" />
                                            </>
                                        )} */}
                            {/* &nbsp;
                                    </div>
                                    <div className="col-md-5 mt-3 py-5">
                                        <InputText type="file" label={this.state.fileName} onChange={this.onBtnFile} style={{ border: 'none', background: 'none', fontFamily: 'Montserrat', fontWeight: '600', fontSize: '17px' }}></InputText>
                                    </div>
                                </div>
                            </div> */}
                            <div className="p-field p-fluid my-5">
                                <h6 style={{ fontFamily: 'Montserrat', fontWeight: '600', fontSize: '20px', color: 'antiquewhite' }}>Image</h6>
                                <InputText id="images" type="text" aria-describedby="username-help" value={this.state.images} onChange={(e) => this.setState({ images: e.target.value })} />
                                <small id="username-help" style={{ float: 'right', color: 'red', fontSize: '12px' }}><i>*Required</i></small>
                            </div>
                            <div className="d-flex my-5" style={{}}>
                                <div className="col-md-8" style={{ width: '52vw' }}>
                                    <h6 style={{ fontFamily: 'Montserrat', fontWeight: '600', fontSize: '20px', color: 'antiquewhite' }}>Author</h6>
                                    <InputText id="author" type="text" aria-describedby="username-help" value={this.state.author} onChange={(e) => this.setState({ author: e.target.value })} />
                                    <small id="username-help" style={{ float: 'right', color: 'red', fontSize: '12px' }}><i>*Required</i></small>
                                </div>
                                <div className="col-md-4 mx-5" style={{ width: '20rem' }}>
                                    <h6 style={{ fontFamily: 'Montserrat', fontWeight: '600', fontSize: '20px', color: 'antiquewhite' }}>Category</h6>
                                    <Dropdown value={this.state.selectedKategori} options={this.kategori} onChange={this.onBtnKategori} optionLabel="label" placeholder="Choose Category" />
                                </div>
                            </div>
                        </div>
                        <div className="" style={{ width: '30rem', margin: 'auto' }}>
                            <Button onClick={this.onBtnAdd} style={{ width: '30rem' }} label="Create News" className="p-button-rounded" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapToProps = ({ authReducer }) => {
    return {
        id: authReducer.iduser,
        idstatus: authReducer.idstatus
        // ...authReducer
    }
}

export default connect(mapToProps)(NewsPage);