import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.css';
import Nav from './components/main/NavBar'
import Header from './components/main/Header'
// import Main from './components/main'
// import { Contacts } from '@material-ui/icons';
import Paper from '@material-ui/core/Paper';
import Contacts from './components/contacts'
import Container from '@material-ui/core/Container';

class App extends React.Component {

  // console.log(window.location.pathname)

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

  componentWillMount() {
    console.log(this.props)
    console.log(window.location.pathname)

  }

  setPathName = (path) => {
    console.log(path)
    this.setState({ pathName: path })
  }

  setLoginVariable = (value) => {
    this.setState({
      isLoggedIn: value
    })
  }

  render() {
    return (
      <React.Fragment>
        <Nav />
        {/* <Paper elevation={2} variant={'elevation'} style={{ background: '#f4f8f9' }} > */}

        {this.state.isLoggedIn === true ?
          <Container maxWidth="lg" style={{ backgroundColor: '#f4f8f9' }}>
            <Router>
              {/* {this.state.pathName === '/' ? null :
                <Header></Header>
              } */}
              <Switch>
                <Route path="/contacts" children={<Contacts />} />
                <Route exact path="/" component={Contacts} />
              </Switch>
            </Router>
          </Container>
          :
          <Router>
            {/* {this.state.pathName == '/' ? null :
              <Header name="Power Electricals"></Header>
            } */}
            {/* <Header name="Power Electricals">
            </Header> */}
            <Route path="/" children={<Contacts />} />
            <Redirect to='/' />
          </Router>
        }
        {/* </Paper > */}

      </React.Fragment>
    );
  }
}

export default App;