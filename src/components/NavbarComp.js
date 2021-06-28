import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext'
import { TabMenu } from 'primereact/tabmenu';
import { Button } from 'primereact/button';
<<<<<<< HEAD
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authLogout } from '../action/authAction'
=======
import { Link, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import { AutoComplete } from 'primereact/autocomplete';
import { connect } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
>>>>>>> 1f0488ccf9077228bbd96bb135bc2da6a0870e1b

class NavbarComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
<<<<<<< HEAD
            activeIndex: null
=======
            activeIndex: null,
            selectedInput: null,
            filteredNews: []

>>>>>>> 1f0488ccf9077228bbd96bb135bc2da6a0870e1b
        }

        this.items = [
            {
                label: 'Account',
                items: [
<<<<<<< HEAD
                    { label: 'Login', icon: 'pi pi-fw pi-user', command: () => this.redirect("login") },
                    { label: 'Register', icon: 'pi pi-fw pi-id-card', command: () => { this.redirect("register") } }
                ]
            }
        ]
    }
    redirect = (input) => {
        this.setState({ redirect: input })
    }
    render() {
        if (this.state.redirect === "login") {
            return <Redirect to="/login" />
        } else if (this.state.redirect === "register") {
            return <Redirect to="/register" />
        }
        return (
            <div>
                <div style={{ height: '12vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', borderBottom: '1px solid #efefef' }}>
=======
                    { label: 'Login', icon: 'pi pi-fw pi-user', command: () => this.props.history.push('/login') },
                    { label: 'Register', icon: 'pi pi-fw pi-id-card', command: () => this.props.history.push('/register') }
                ]
            }
        ]


    }

    searchNews = (e) => {
        let filteredNews;
        if (!e.query.trim().length) {
            filteredNews = [...this.props.news];
        }
        else {
            filteredNews = this.props.news.filter((item) => {
                console.log(item)
                return item.judul.toLowerCase().includes(e.query.toLowerCase());
            });
        }
        this.setState({ filteredNews });
        // this.props.filterNewsAction(filteredNews)

    }

    onSelectSuggestion = (e) => {
        this.props.history.push(`/detail-news?idnews=${e.value.idnews}`)
        this.setState({ selectedInput: null })
    }

    handleKeyPress = () => {
        // console.log(e)
        let { selectedInput } = this.state
        if(selectedInput){
            let query = ''
            if (selectedInput.includes(" ")) {
                query = selectedInput.replace(" ", "%")
            } else {
                query = selectedInput
            }
    
            // if (e.code == "Enter") {
            //     alert("enter")
            // }
            this.props.history.push(`/search?query=${query}`)
        }
    }
    render() {
        return (
            <div>
                <div style={{ height: '15vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', borderBottom: '1px solid #efefef' }}>
>>>>>>> 1f0488ccf9077228bbd96bb135bc2da6a0870e1b
                    <div style={{ width: '40%' }}>
                        <i className="pi pi-facebook mx-2"></i>
                        <i className="pi pi-twitter mx-2"></i>
                        <i className="pi pi-youtube mx-2"></i>
                    </div>
                    <Link style={{ justifyContent: 'center', width: '100%', textDecoration: 'none', color: 'black' }} to="/">
<<<<<<< HEAD
                        <h2 style={{ textAlign: 'center' }}>Warta<span style={{ color: 'grey' }}>Com</span></h2>
                    </Link>
=======
                        <h2 style={{ textAlign: 'center' }}>Warta.<span style={{ color: 'grey' }}>com</span></h2>
                    </Link>

>>>>>>> 1f0488ccf9077228bbd96bb135bc2da6a0870e1b
                    <div style={{ width: '40%' }}>
                        <Menubar
                            model={this.items}
                            end={
<<<<<<< HEAD
                                <span className="p-input-icon-left">
                                    <i className="pi pi-search" />
                                    <InputText placeholder="Search news..." type="text" />
=======
                                <span className="d-flex align-items-center">
                                    <i className="pi pi-search mx-2" onClick={this.handleKeyPress} />
                                    <AutoComplete field="judul"
                                        value={this.state.selectedInput}
                                        suggestions={this.state.filteredNews}
                                        completeMethod={this.searchNews}
                                        onChange={(e) => this.setState({ selectedInput: e.value })}
                                        onSelect={(e) => this.onSelectSuggestion(e)}
                                        // onKeyPress={(e) => this.handleKeyPress(e)}
                                    />
>>>>>>> 1f0488ccf9077228bbd96bb135bc2da6a0870e1b
                                </span>
                            }
                            style={{ border: 'none' }}
                        />
                    </div>
<<<<<<< HEAD
                    {
                        this.props.username ?
                            <div className="mx-2">
                                Hello, {this.props.username}
                            </div> : null
                            // <div onClick={this.props.authLogout}>
                            //     Logout
                            // </div>
                    }
=======
>>>>>>> 1f0488ccf9077228bbd96bb135bc2da6a0870e1b
                </div>
            </div>
        );
    }
}

<<<<<<< HEAD
const mapStateToProps = ({ authReducer }) => {
    return {
        ...authReducer
    }
}

export default connect(mapStateToProps, { authLogout })(NavbarComp);
=======
const mapStateToProps = ({ NewsReducer }) => {
    return {
        news: NewsReducer.news_list,
        filteredNews: NewsReducer.filtered_news
    }
}
export default withRouter(connect(mapStateToProps)(NavbarComp));
>>>>>>> 1f0488ccf9077228bbd96bb135bc2da6a0870e1b
