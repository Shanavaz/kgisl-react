// import React from 'react';
// import { Route, Router, Switch, Redirect } from 'react-router-dom';
// // import { connect } from 'react-redux';
// // import cx from 'classnames';
// // import { setMobileNavVisibility } from '../../reducers/Layout';
// // import { withRouter } from 'react-router-dom';

// import Header from './Header';
// import Footer from './Footer';
// /**
//  * Pages
//  */
// import Contacts from '../contacts';
// // import Reports from '../Reports';
// // import Repayment from '../Repayment';
// // import Components from '../Components';
// // import Tables from '../Tables';
// // import Purchase from '../../pages/Components/Panels/Purchase';
// // import Login from './Login';


// class Main extends React.Component {

//     // console.log(window.location.pathname)

//     constructor() {
//         super()

//         let isLoggedIn = true
//         const token = localStorage.getItem('token')
//         console.log(token)
//         if (token == null) {
//             console.log('null token')
//             isLoggedIn = false
//         }
//         else {
//             isLoggedIn = true
//         }

//         this.state = {
//             renderSplit: true,
//             pathName: '/',
//             isLoggedIn,
//         }
//     }

//     // componentWillMount() {
//     //   console.log(this.props)
//     //   console.log(window.location.pathname)

//     // }

//     setPathName = (path) => {
//         console.log(path)
//         this.setState({ pathName: path })
//     }

//     setLoginVariable = (value) => {
//         this.setState({
//             isLoggedIn: value
//         })
//     }

//     render() {
//         return (
//             <React.Fragment>
//                 {this.state.isLoggedIn === true ?
//                     <Router>
//                         <Switch>
//                             {/* <Route path="/Customer" children={<Customer />} /> */}
//                             {/* <Route path="/Product" children={<Product />} /> */}
//                             {/* <Route path="/Split" children={<Split />} /> */}
//                             <Route path="/Entry" children={<Contacts />} />
//                             <Route path="/" children={<Contacts />} />
//                         </Switch>
//                     </Router>
//                     :
//                     <Router>
//                         {/* {this.state.pathName == '/' ? null :
//                 <Header name="Power Electricals"></Header>
//               } */}
//                         {/* <Header name="Power Electricals">
//               </Header> */}
//                         <Route path="/" children={<Contacts />} />
//                         <Redirect to='/' />
//                     </Router>
//                 }
//             </React.Fragment>
//         );
//     }
// }

// export default Main;