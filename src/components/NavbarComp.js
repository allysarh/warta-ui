import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext'
import { TabMenu } from 'primereact/tabmenu';
import { Button } from 'primereact/button';
import { Link, Redirect, withRouter } from 'react-router-dom';

class NavbarComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            activeIndex: null
        }

        this.items = [
            {
                label: 'Account',
                items: [
                    { label: 'Login', icon: 'pi pi-fw pi-user', command: () => this.props.history.push('/login') },
                    { label: 'Register', icon: 'pi pi-fw pi-id-card', command: () => this.props.history.push('/register') }
                ]
            }
        ]
    }
    redirect = (input) =>{
        this.setState({redirect: input}, console.log(this.state.redirect))
        return <Redirect to="/login" />
    }
    render() {
        return (
            <div>
                <div style={{ height: '12vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', borderBottom: '1px solid #efefef' }}>
                    <div style={{ width: '40%' }}>
                        <i className="pi pi-facebook mx-2"></i>
                        <i className="pi pi-twitter mx-2"></i>
                        <i className="pi pi-youtube mx-2"></i>
                    </div>
                    <Link style={{ justifyContent: 'center', width: '100%', textDecoration: 'none', color: 'black' }} to="/">
                        <h2 style={{ textAlign: 'center' }}>Warta.<span style={{ color: 'grey' }}>com</span></h2>
                    </Link>
                    <div style={{ width: '40%' }}>
                        <Menubar
                            model={this.items}
                            end={
                                <span className="p-input-icon-left">
                                    <i className="pi pi-search" />
                                    <InputText placeholder="Search news..." type="text" />
                                </span>
                            }
                            style={{ border: 'none' }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(NavbarComp);