import React from 'react';
import { Route, Switch } from "react-router-dom";
import HeadlinePage from './pages/headlinePage';
import NavbarComp from './components/NavbarComp'
import SearchedPage from './pages/searchedPage';
import LoginPage from './pages/loginPage';
import { connect } from 'react-redux';
import { getNewsAction } from './action';
import CategoryPage from './pages/categoryPage';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.getNewsAction()
  }
  render() {
    return (
      <>
        <NavbarComp />
        <Switch>
          <Route path="/" component={HeadlinePage} exact />
          <Route path="/search" component={SearchedPage} />
          <Route path="/login" component={LoginPage} />
          <Route path={`/kategori`} component={CategoryPage} />
        </Switch>
      </>
    );
  }
}

const mapStateToProps = ({NewsReducer}) =>{
  return {
      news: NewsReducer.news_list,
      kategori: NewsReducer.kategori
  }
}

export default connect(mapStateToProps, {getNewsAction})(App);