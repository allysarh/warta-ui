import React from 'react';
import { Editor } from 'primereact/editor';
import { InputText } from 'primereact/inputtext';

class NewsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            judul: '',
            deskripsi: '',
            fileName: "Select File",
            fileUpload: null,
            fileSrc: null
        }
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

    render() {
        let header = this.header()
        return (
            <div className="container">
                <div className="p-grid p-formgrid p-fluid">
                    <h2 className="text-center my-5">Create News</h2>
                    <div className="p-col-12 p-mb-2 p-lg-4 p-mb-lg-0" style={{ alignItems: 'center', margin: 'auto' }}>
                        <div className="p-field p-fluid mb-5">
                            <h6>Judul</h6>
                            <InputText id="email" type="email" aria-describedby="username-help" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                            <small id="username-help" style={{ float: 'right', color: 'red', fontSize: '12px' }}>*Required</small>
                        </div>
                        <div className="card" style={{ border: 'none' }}>
                            <h6>Deskripsi</h6>
                            <Editor style={{ height: '320px' }} value={this.state.text1} onTextChange={(e) => this.setState({ text1: e.htmlValue })} />
                        </div>
                        <small id="username-help" style={{ float: 'right', color: 'red', fontSize: '12px' }}>*Required</small>
                        <div className="mt-5">
                            {/* <Input type="file" placeholder="Search File" onChange={this.onBtnFile} label={this.state.fileName} /> */}
                            <div className="row">
                                <div className="col-md-6 text-center">
                                    {/* <img id="imgpreview" style={{ maxWidth: '95%' }} className="col-8 mx-auto" alt="previ" src={this.state.fileUpload ? URL.createObjectURL(this.state.fileUpload) : "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg"} /> */}
                                    {this.state.fileSrc == null ? (
                                        <>
                                            <img src="https://portal.bimakota.go.id/upload/not_image.png" width="300em" height="auto" />
                                        </>
                                    ) : (
                                        <>
                                            <img src={this.state.fileSrc} width="150px" height="auto" />
                                        </>
                                    )}
                                    &nbsp;
                                </div>
                                <div className="col-md-6 py-5">
                                    <InputText type="file" label={this.state.fileName} onChange={this.onBtnFile}  style={{border:'none'}}></InputText>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsPage;