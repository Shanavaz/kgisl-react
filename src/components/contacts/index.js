import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import config from '../../config/config'
import axios from 'axios'
import generateData from './generateData';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Modal from '@material-ui/core/Modal';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {
    Button
} from '@material-ui/core';


class Contacts extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            data: [],
            originalData: [],
            open: false,
            openDialog: false,
            isMenuOpen: false,
            anchorEl: null,
            deleteDialog: false,
        }
    }



    componentWillMount() {

        var url = config.server.protocol + config.server.serverUrl + config.server.contextpath + '/fetchallcontacts';
        console.log(url)
        axios.get(url)
            .then(result => {
                console.log(result.data.data)
                // res = result.data.apiResults
                this.setState({
                    data: generateData(result.data.data),
                    originalData: generateData(result.data.data)
                })
            })

    }

    handleDialogClose = () => {
        console.log(this.state.openModal)
        this.setState({
            openModal: false
        })
    };

    handleDialogOpen = (event, row) => {
        console.log(row)
        this.setState({
            open: !this.state.open
        })
    };

    handleDeleteDialogToggle = (event) => {
        this.setState({
            deleteDialog: !this.state.deleteDialog
        })
    };

    handleMenuOpen = (event) => {
        console.log(event)
        console.log(this.state.isMenuOpen)
        this.setState({
            anchorEl: event.currentTarget,
            isMenuOpen: !this.state.isMenuOpen
        })
    };

    handleMenuClose = (event, row) => {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen,
            anchorEl: null
        })
    };

    handleUpdateContact = (event, row) => {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen,
            anchorEl: null
        })
    };

    handleDeleteContact = (event, row) => {
        this.setState({
            deleteDialog: false,
            anchorEl: null
        })
    };

    searchName = (event) => {
        this.setState({
            data: this.state.originalData
        })
        let filteredData = []
        for (let i = 0; i < (this.state.data).length; i++) {
            console.log(this.state.data[i].name)
            let contactName = this.state.data[i].name
            if (((contactName).toLowerCase()).includes((event.target.value).toLowerCase())) {
                filteredData.push(this.state.data[i])
            }
        }
        this.setState({
            data: filteredData
        })

        if (event.target.value === '') {
            this.setState({
                data: this.state.originalData
            })
        }
    };

    render() {


        const { open, isMenuOpen, deleteDialog } = this.state


        return (
            <React.Fragment>
                <div>
                    Search
                    <input type='text' style={{ marginBottom: '10px', padding: '7px', margin: '10px' }}
                        onKeyUp={this.searchName} />
                </div>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Number</TableCell>
                                <TableCell align="right">Incoming Call Count</TableCell>
                                <TableCell align="right">Location</TableCell>
                                <TableCell align="right">Outgoing Call Count</TableCell>
                                <TableCell align="right">Created Date</TableCell>
                                <TableCell align="right">Options</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {this.state.data.map((row, index) => {
                                return (
                                    <ContactRow
                                        key={index}
                                        row={row}
                                        handleOpen={this.handleOpen}
                                    />
                                );
                            })
                            } */}
                            {this.state.data.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">{row.name}</TableCell>
                                    <TableCell align="right">{row.number}</TableCell>
                                    <TableCell align="right">{row.incomingCallCount}</TableCell>
                                    <TableCell align="right">{row.location}</TableCell>
                                    <TableCell align="right">{row.outGoingCallCount}</TableCell>
                                    <TableCell align="right">{row.createdDate}</TableCell>
                                    <TableCell align="right">
                                        <IconButton style={{ padding: 8 }} onClick={this.handleMenuOpen}>
                                            <MoreHorizIcon ></MoreHorizIcon>
                                        </IconButton>
                                        <Dialog
                                            open={open} onClose={this.handleDialogClose}
                                            aria-labelledby="form-dialog-title">
                                            <DialogTitle id="form-dialog-title">Update</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>
                                                    Please fill out</DialogContentText>
                                                <form>
                                                    <TextField autoFocus margin="dense" id="name" label="Name" type="text" fullWidth />
                                                    <TextField autoFocus margin="dense" id="name" label="Number" type="text" fullWidth />
                                                    <TextField autoFocus margin="dense" id="name" label="Incoming call count" type="text" fullWidth />
                                                    <TextField autoFocus margin="dense" id="name" label="Outgoing call count" type="text" fullWidth />
                                                    <TextField autoFocus margin="dense" id="name" label="Location" type="text" fullWidth />
                                                    <TextField autoFocus margin="dense" id="name" type="date" fullWidth />
                                                </form>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={this.handleDialogOpen} color="primary">Cancel</Button>
                                                <Button onClick={this.handleUpdateContact} color="primary">Update</Button>
                                            </DialogActions>
                                        </Dialog>
                                        <Dialog
                                            open={deleteDialog} onClose={this.handleDialogClose}
                                            aria-labelledby="form-dialog-title">
                                            <DialogTitle id="form-dialog-title">Are you sure?</DialogTitle>
                                            <DialogActions>
                                                <Button onClick={this.handleDeleteDialogToggle} color="primary">Cancel</Button>
                                                <Button onClick={this.handleDeleteContact} color="primary">Delete</Button>
                                            </DialogActions>
                                        </Dialog>
                                        <Menu
                                            anchorEl={this.state.anchorEl}
                                            id={row.id}
                                            open={Boolean(this.state.anchorEl)}
                                            onClose={this.handleMenuClose}
                                        >
                                            <MenuItem onClick={(e) => { this.handleDialogOpen(e, row) }}>Update</MenuItem>
                                            <MenuItem onClick={this.handleDeleteDialogToggle}>Delete</MenuItem>
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </React.Fragment>
        );
    }
}


// class ContactRow extends React.Component {
//     state = {
//         anchorEl: null,
//     };

//     handleSettingsClick = event => {
//         this.setState({ anchorEl: event.currentTarget });
//     };

//     handleSettingsClose = () => {
//         this.setState({ anchorEl: null });
//     };

//     render() {
//         const { anchorEl } = this.state;
//         const { product, classes, handleOpen } = this.props;
//         console.log(product);

//         return (
  
//       );
//     }
// }

export default Contacts