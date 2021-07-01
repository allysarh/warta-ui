import React from 'react';
import axios from 'axios';
import { URL_API } from '../helper';
import { connect } from 'react-redux';
import { authLogin } from '../action/authAction'
import { Redirect } from 'react-router-dom'
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirect: true
        }
        this.onBtnLogin = this.onBtnLogin.bind(this);
    }

    onBtnLogin = () => {
        // console.log("Cek data :",this.props.users)
        // this.props.authLogin(this.state.email, this.state.password)
        axios.post(URL_API + `/users/login`, {
            email: this.state.email,
            password: this.state.password
        })
            .then(res => {
                if (res.data.idstatus == 1) {
                    this.props.authLogin(res.data)
                    localStorage.setItem('tkn_id', res.data.token)
                    // this.setState({ redirect: true })
                    // this.toast.show({ severity: 'success', detail: 'Login Success', life: 3000 })
                    console.log("Login Success", res.data)
                } else {
                    this.toast.show({ severity: 'error', detail: 'Account Not Verified, Please Check Your Email !', life: 3000 })
                }
            })
            .catch(err => {
                console.log("Error Login", err)
            })
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
        
        // if (this.state.redirect) {
        //     return <Redirect to="/" />
        // }
        if (this.props.id && this.props.idstatus == 1) {
            return <Redirect to="/" />
        }
        return (
            <div className="bg-img">
                <div className="container">
                    <h1 className="text-center mb-5" style={{ fontFamily: 'Montserrat', fontWeight: '600', fontSize:'50px', color: 'antiquewhite' }}>Login Page</h1>
                    <Messages ref={(el) => this.toast = el} style={{ width: '30rem', margin: 'auto' }} />
                    <div className="p-field p-fluid my-4" style={{ width: '30rem', margin: 'auto' }}>
                        <h6 style={{ fontFamily: 'Montserrat', fontWeight: '600', fontSize: '20px', color: 'antiquewhite' }}>Email</h6>
                        <InputText id="email" type="email" aria-describedby="username-help" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                    </div>
                    <div className="card my-4" style={{ width: '30rem', background: 'none', margin: 'auto', border: 'none' }}>
                        <h6 style={{ fontFamily: 'Montserrat', fontWeight: '600', fontSize: '20px', color: 'antiquewhite' }}>Password</h6>
                        <Password value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} toggleMask />
                    </div>
                    <div className="card my-5" style={{ width: '30rem', margin: 'auto', background: 'none' }}>
                        <Button onClick={this.onBtnLogin} style={{ width: '30rem' }} label="Sign In" className="p-button-rounded" />
                    </div>
                </div>
            </div >
        );
    }
}

const mapToProps = ({ authReducer }) => {
    return {
        id: authReducer.iduser,
        idstatus: authReducer.idstatus
    }
}

export default connect(mapToProps, { authLogin })(LoginPage);