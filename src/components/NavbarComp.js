import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext'
import { TabMenu } from 'primereact/tabmenu';
import { Button } from 'primereact/button';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { authLogout } from '../action/authAction'
import axios from 'axios';
import { AutoComplete } from 'primereact/autocomplete';
import { Dropdown } from 'primereact/dropdown';

class NavbarComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            activeIndex: null,
            selectedInput: null,
            filteredNews: [],
            searchRedirect: false
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

        this.logoutitems = [
            {
                label: `Hello, ${this.props.username}`,
                items: [
                    { label: 'Create News', icon: 'pi pi-fw pi-pencil', command: () => this.props.history.push('/add-news') },
                    { label: 'Logout', icon: 'pi pi-fw pi-sign-in', command: () => this.props.authLogout() }
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


    }

    onSelectSuggestion = (e) => {
        this.props.history.push(`/detail-news?idnews=${e.value.idnews}`)
        this.setState({ selectedInput: null })
    }

    handleKeyPress = (e) => {
        // console.log(e)
        let { selectedInput } = this.state
        if (selectedInput) {
            let query = ''
            if (selectedInput.includes(" ")) {
                query = selectedInput.replace(" ", "%")
            } else {
                query = selectedInput
            }

            if (e.code == "Enter") {
                return this.props.history.push(`/search?query=${query}`)
            }
        
            this.props.history.push(`/search?query=${query}`)
        }
    }

    render() {
        
        return (
            <div>
                <div style={{ height: '15vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', borderBottom: '1px solid #efefef' }}>
                    <div style={{ width: '40%' }}>
                        <i className="pi pi-facebook mx-2"></i>
                        <i className="pi pi-twitter mx-2"></i>
                        <i className="pi pi-youtube mx-2"></i>
                        {/* <span>{Date.now()}</span> */}
                    </div>
                    <Link style={{ justifyContent: 'center', width: '100%', textDecoration: 'none', color: 'black', fontFamily: 'times-new-roman' }} to="/">
                        <h2 style={{ textAlign: 'center' }}>Warta.<span style={{ color: 'grey' }}>com</span></h2>
                    </Link>

                    <div style={{ width: '40%' }}>
                        <Menubar
                            model={this.props.username ? this.logoutitems : this.items}
                            end={
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
                                </span>
                            }
                            style={{ border: 'none' }}
                        />
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = ({ authReducer, NewsReducer }) => {
    return {
        ...authReducer,
        news: NewsReducer.news_list,
        filteredNews: NewsReducer.filtered_news
    }
}
export default withRouter(connect(mapStateToProps, { authLogout })(NavbarComp));

