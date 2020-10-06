import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Nav from './components/main/NavBar'
import Contacts from './components/contacts'
import Container from '@material-ui/core/Container';
import CreateContact from './components/contacts/addContact';

class App extends React.Component {


  constructor() {
    super()

    let isLoggedIn = true
    const token = localStorage.getItem('token')
    console.log(token)
    if (token == null) {
      console.log('null token')
      isLoggedIn = false
    }
    else {
      isLoggedIn = true
    }

    this.state = {
      renderSplit: true,
      pathName: '/',
      isLoggedIn,
    }
  }


  render() {
    return (
      <React.Fragment>
        <Nav />
          <Container maxWidth="lg" style={{ backgroundColor: '#f4f8f9', height: '90vh',width: '92vw', marginLeft: '96px' }}>
            <Router>
              <Switch>
                <Route path="/contacts" children={<Contacts />} />
                <Route path="/createcontact" children={<CreateContact />} />
                <Route exact path="/" component={Contacts} />
              </Switch>
            </Router>
          </Container>

      </React.Fragment>
    );
  }
}

export default App;