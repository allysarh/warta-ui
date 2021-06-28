import React from 'react';
import axios from 'axios';
import { URL_API } from '../helper';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confPassword: '',
            email: ''
        }
        this.onBtnRegis = this.onBtnRegis.bind(this);
    }

    onBtnRegis = (e) => {
        if (this.state.username == '' || this.state.email == '' || this.state.password == '' || this.state.confPassword == '') {
            this.toast.show({ severity: 'error', detail: 'Isi Semua Form !', life: 3000 })
        } else {
            if (this.state.email.includes('@')) {
                axios.get(URL_API + `/users/get-all?email=${this.state.email}`)
                    .then(res => {
                        if (res.data.length > 0) {
                            this.toast.show({ severity: 'info', detail: 'Email sudah terdaftar !', life: 3000 })
                        } else {
                            if (this.state.password.length < 6) {
                                this.toast.show({ severity: 'warn', detail: 'Password minimum 6 character !', life: 3000 })
                            } else {
                                if (this.state.username.length < 5) {
                                    this.toast.show({ severity: 'warn', detail: 'Username minimum 6 character !', life: 3000 })
                                } else {
                                    axios.post(URL_API + `/users/register`, {
                                        username: this.state.username,
                                        password: this.state.password,
                                        email: this.state.email
                                    })
                                        .then(res => {
                                            this.toast.show({ severity: 'success', detail: 'Register Success, Check Your Email For Verification !', life: 3000 })
                                            console.log("Register Success", res.data)
                                        })
                                        .catch(err => {
                                            console.log("Error Register", err)
                                        })
                                }
                            }
                        }
                    })
            } else {
                this.toast.show({ severity: 'warn', detail: 'Email anda salah !', life: 3000 })
            }
        }
    }


    render() {
        let header = <h6>Pick a password</h6>;
        let footer = (
            <React.Fragment>
                <Divider />
                <p className="p-mt-2">Suggestions</p>
                <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: '1.5' }}>
                    <li>At least one lowercase</li>
                    <li>At least one uppercase</li>
                    <li>At least one numeric</li>
                    <li>Minimum 6 characters</li>
                </ul>
            </React.Fragment>
        );
        return (
            <div className="bg-img">
                <div className="container">
                    <div className="column">
                        <div style={{ alignItems: 'center' }}>
                            <h1 className="text-center">Register Page</h1>
                            <Messages ref={(el) => this.toast = el} style={{ width: '30rem', margin: 'auto' }} />
                            <div className="p-field p-fluid mt-5" style={{ width: '30rem', margin: 'auto' }}>
                                <h6>Username</h6>
                                <InputText id="username" type="username" aria-describedby="username-help" value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} />
                                <small id="username-help" style={{ float: 'right' }}>Minimum 5 characters</small>
                            </div>
                            <div className="p-field p-fluid my-3" style={{ width: '30rem', margin: 'auto' }}>
                                <h6>Email</h6>
                                <InputText id="email" type="email" aria-describedby="username-help" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                            </div>
                            <div className="card my-4" style={{ width: '30rem', background: 'none', margin: 'auto', border: 'none' }}>
                                <h6>Password</h6>
                                <Password value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} header={header} footer={footer} toggleMask />
                            </div>
                            <div className="card my-4" style={{ width: '30rem', background: 'none', margin: 'auto', border: 'none' }}>
                                <h6>Confirm Password</h6>
                                <Password value2={this.state.confPassword} onChange={(e) => this.setState({ confPassword: e.target.value })} toggleMask />
                            </div>
                            <div style={{ width: '30rem', margin: 'auto' }}>
                                <Button onClick={this.onBtnRegis} style={{ width: '30rem' }} label="Sign Up" className="p-button-rounded p-button-success" />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default RegisterPage;