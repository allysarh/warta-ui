import React from 'react';
import axios from 'axios';
import { URL_API } from '../helper';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

class VerificationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            otp: ''
        }
    }

    onBtnVerified = async () => {
        try {
            let headers = {
                headers: {
                    "Authorization": `Bearer ${this.props.location.pathname.split('/')[2]}`
                }
            }
            let res = await axios.patch(URL_API + `/users/verified`, {
                otp: this.state.otp
            }, headers)

            alert(res.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <div>
                <div style={{ backgroundImage: `url(https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iakrd_gRdPCg/v0/-1x-1.jpg)`, width: '100%', height: '60vh' }}>
                    <div className="text-center">
                        <h1 style={{ fontSize: '50px', color: '#fff' }}>Hello, Please Verification your Email Address</h1>
                        <div className="my-5">
                            <h4 style={{ color: '#fff' }}>Type your OTP</h4>
                            <InputText style={{ width: '30%' }} id="otp" type="text" aria-describedby="username-help" value={this.state.otp} onChange={(e) => this.setState({ otp: e.target.value })} />
                            {/* <Input style={{ width: '30%', position: 'relative', left: '28vw' }} type="text" innerRef={(e) => setOTP(e)} /> */}
                            <hr className="my-5" />
                            <Button onClick={this.onBtnVerified} style={{ width: '15rem' }} label="Sign Up" className="p-button-rounded p-button-success" />
                            {/* <Button onClick={btnVerified} className="my-3" color="primary">Verification Account</Button> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default VerificationPage;