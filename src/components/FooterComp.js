import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Avatar } from 'primereact/avatar';
import { Chip } from 'primereact/chip';

class FooterComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subscription: ''
        }
    }
    render() {
        return (
            <div style={{ width: '100%', height: '20vh', borderTop: '1px solid #eaeae8', marginTop: '2%' }}
                className="row d-flex justify-content-center align-items-center justify-content-around p-auto">
                <div className="col-6 col-lg-2 " style={{ fontFamily: 'new-times-roman' }}>
                    <h3>Warta.Com</h3>
                    <Avatar icon="pi pi-facebook" />
                    <Avatar icon="pi pi-twitter" className="mx-2" />
                    <Avatar icon="pi pi-youtube" />
                </div>
                <div className="col-6 col-lg-3" style={{ marginTop: '50px' }}>
                    <Chip label="Support" />
                    <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
                        <li>Contact Us</li>
                        <li>FAQ</li>
                        <li>Downloads</li>
                    </ul>
                </div>
                <div className="col-6 col-lg-3" style={{ marginTop: '50px' }}>
                    <Chip label="Warta.com" />
                    <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
                        <li>About Us</li>
                        <li>Career</li>
                        <li>New Room</li>
                    </ul>
                </div>
                <div className="col-6 col-lg-3">
                    <span className="p-float-label p-input-icon-right">
                        <i className="pi pi-envelope" />
                        <InputText id="righticon" value={this.state.subscription} onChange={(e) => this.setState({ subscription: e.target.value })} />
                        <label htmlFor="righticon">Subscription</label>
                    </span>
                    <div>
                        Subscribe to our latest news
                    </div>
                </div>
            </div>
        );
    }
}

export default FooterComp;