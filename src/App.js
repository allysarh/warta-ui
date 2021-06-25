import React from 'react';
import { Route, Switch } from "react-router-dom";
import HeadlinePage from './pages/headlinePage';
import NavbarComp from './components/NavbarComp'
import SearchedPage from './pages/searchedPage';
import LoginPage from './pages/loginPage';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <>
      <NavbarComp />
      <Switch>
        <Route path="/" component={HeadlinePage} exact/>
        <Route path="/kategori-page" component={HeadlinePage}/>
        <Route path="/search" component={SearchedPage}/>
        <Route path="/login" component={LoginPage}/>
      </Switch>
      </>
    );
  }
}
 
export default App;