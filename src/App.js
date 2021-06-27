import React from 'react';
import { Route, Switch } from "react-router-dom";
import HeadlinePage from './pages/headlinePage';
import NavbarComp from './components/NavbarComp'
import SearchedPage from './pages/searchedPage';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/register';
import VerificationPage from './pages/verificationPage';
import NewsPage from './pages/newsPage';
import { keepLogin } from './action/authAction'
import axios from 'axios';
import { URL_API } from './helper';
import { connect } from 'react-redux';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.reLogin()
  }

  reLogin = () => {
    let token = localStorage.getItem("tkn_id")
    if (token) {
      const headers = {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
      axios.post(URL_API + `/users/keeplogin`, {}, headers)
        .then(res => {
          // this.props.keepLogin(res.data[0])
          this.props.keepLogin(res.data)
        })
        .catch(err => {
          console.log("Keep Login Error :", err)
        })
    }
  }

  render() {
    return (
      <>
        <NavbarComp />
        <Switch>
          <Route path="/" component={HeadlinePage} exact />
          <Route path="/register" component={RegisterPage} />
          <Route path="/kategori-page" component={HeadlinePage} />
          {/* <Route path="/search" component={SearchedPage} /> */}
          <Route path="/login" component={LoginPage} />
          <Route path="/verification" component={VerificationPage} />
          <Route path="/add-news" component={NewsPage} />
        </Switch>
      </>
    );
  }
}

const mapStateToProps = ({ authReducer }) => {
  return {
    role: authReducer.role
  }
}

export default connect(mapStateToProps, { keepLogin })(App);