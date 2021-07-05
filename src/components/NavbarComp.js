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
            searchRedirect: false,
            redirect: false,
            path: '',
            redirectSearch: false,
            pathHistory: ''
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
            { label: 'Create News', icon: 'pi pi-fw pi-pencil', command: () => this.props.history.push('/add-news') },
            { label: 'Logout', icon: 'pi pi-fw pi-sign-in', command: () => this.props.authLogout() }
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
        this.setState({ path: e.value.idnews, redirect: true })
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
                // this.setState({ redirectSearch: true, pathHistory: query })
                this.props.history.push(`/search?query=${query}`)
            }
        }
    }

    render() {
        return (
            <div className="row" style={{ width: '100%', borderBottom: '1px solid #eaeae8' }}>
                <div
                    className="col-12 col-sm-12 col-md-12 col-lg-4 d-flex align-items-center justify-content-center" >
                    <i className="pi pi-facebook mx-2"></i>
                    <i className="pi pi-twitter mx-2"></i>
                    <i className="pi pi-youtube mx-2"></i>
                </div>
                <Link to="/" style={{ cursor: 'pointer', textDecoration: 'none', color: 'black' }}
                    className="col-6 col-sm-6 col-md-6 col-lg-4 d-flex align-items-center justify-content-center">
                    <h2 style={{ textAlign: 'center' }}>Warta.<span style={{ color: 'grey' }}>com</span></h2>
                </Link>
                <div className="col-6 col-sm-6 col-md-6 col-lg-4 d-flex align-items-center justify-content-center" style={{ height: '100px' }}>
                    <Menubar
                        model={this.props.username ?
                            [
                                {
                                    label: `Helo, ${this.props.username}`,
                                    items: this.logoutitems
                                }
                            ]
                            : this.items}
                        end={
                            <span className="d-flex align-items-center"
                                style={{ width: '100%' }}>
                                <i className="pi pi-search mx-2" />
                                <AutoComplete field="judul"
                                    placeholder="Cari berita ..."
                                    value={this.state.selectedInput}
                                    suggestions={this.state.filteredNews}
                                    completeMethod={this.searchNews}
                                    onChange={(e) => this.setState({ selectedInput: e.value })}
                                    onSelect={(e) => this.onSelectSuggestion(e)}
                                    onKeyPress={(e) => this.handleKeyPress(e)}
                                />

                            </span>
                        }
                        style={{ border: 'none' }}
                    />
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

{/* <div style={{ height: '15vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', borderBottom: '1px solid #efefef' }}>
                    <div style={{ width: '20%' }}>
                        <i className="pi pi-facebook mx-2"></i>
                        <i className="pi pi-twitter mx-2"></i>
                        <i className="pi pi-youtube mx-2"></i> */}
{/* <span>{Date.now()}</span> */ }
{/* </div>
                    <Link style={{ justifyContent: 'center', width: '40%', textDecoration: 'none', color: 'black', fontFamily: 'times-new-roman' }} to="/">
                        <h2 style={{ textAlign: 'center' }}>Warta.<span style={{ color: 'grey' }}>com</span></h2>
                    </Link>
                    <div style={{ width: '40%' }}>
                        <Menubar
                            style={{ width: '100%' }}
                            model={this.props.username ?
                                [
                                    {
                                        label: `${this.props.username}`,
                                        items: this.logoutitems
                                    }
                                ]
                                : this.items} */}
                //             end={
                //                 <span className="d-flex align-items-center">
                //                     <i className="pi pi-search mx-2" onClick={this.handleKeyPress} />
                //                     <AutoComplete field="judul"
                //                         value={this.state.selectedInput}
                //                         suggestions={this.state.filteredNews}
                //                         completeMethod={this.searchNews}
                //                         onChange={(e) => this.setState({ selectedInput: e.value })}
                //                         onSelect={(e) => this.onSelectSuggestion(e)}
                //                     // onKeyPress={(e) => this.handleKeyPress(e)}
                //                     />
                //                 </span>
                //             }
                //             style={{ border: 'none' }}
                //         />
                //     </div>
                // </div>