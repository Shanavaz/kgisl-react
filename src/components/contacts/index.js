import React from 'react';
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
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
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
import Snackbar from '@material-ui/core/Snackbar';


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

    updateAndGetData = (data) => {
        this.setState({
            data: data
        })
    }

    render() {

        return (
            <React.Fragment>
                <h1 style = {{marginTop:'0px'}}>Contacts</h1>
                <div>
                    Search
                    <input type='text' style={{ marginBottom: '10px', padding: '7px', margin: '10px' }}
                        onKeyUp={this.searchName} label='Name'/>
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
                            {this.state.data.map((row, index) => {
                                return (
                                    <ContactRow
                                        key={index}
                                        row={row}
                                        updateAndGetData={this.updateAndGetData}
                                    // handleOpen={this.handleOpen}
                                    />
                                );
                            })
                            }
                            {/* {this.state.data.map((row) => (
                                
                            ))} */}
                        </TableBody>
                    </Table>
                </TableContainer>
            </React.Fragment>
        );
    }
}


class ContactRow extends React.Component {

    constructor(props) {
        super(props)

        this.nameRef = React.createRef()
        this.numRef = React.createRef()
        this.incomingRef = React.createRef()
        this.outgoingRef = React.createRef()
        this.locationRef = React.createRef()
        this.dateRef = React.createRef()

        this.state = {
            data: [],
            originalData: [],
            open: false,
            openDialog: false,
            isMenuOpen: false,
            anchorEl: null,
            deleteDialog: false,
            name: '',
            number: '',
            incomingcc: '',
            outgoingcc: '',
            location: '',
            createdDate: '',
            toggleAlert: false
        }
    }

    handleDialogClose = () => {
        this.setState({
            open: false
        })
    };

    handleDialogOpen = (event, row) => {
        console.log(row)
        console.log(row.createdDate)
        this.setState({
            open: !this.state.open,
            name: row.name,
            number: row.number,
            incomingcc: row.incomingCallCount,
            outgoingcc: row.outGoingCallCount,
            location: row.location,
            createdDate: row.createdDate,
        })
    };

    handleDeleteDialogToggle = (event, row) => {
        console.log(row)
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

        let reqData = {
            id: row.id,
            name: this.nameRef.current.value,
            createdDate: this.dateRef.current.value,
            number: this.numRef.current.value,
            incomingCallCount: this.incomingRef.current.value,
            outGoingCallCount: this.outgoingRef.current.value,
            location: this.locationRef.current.value,
        }
        console.log(reqData)
        var url = config.server.protocol + config.server.serverUrl + config.server.contextpath + '/updatecontact';
        axios.put(url, reqData)
            .then(result => {
                console.log(result.data.message)
                var url = config.server.protocol + config.server.serverUrl + config.server.contextpath + '/fetchallcontacts';
                console.log(url)
                axios.get(url)
                    .then(res => {
                        this.props.updateAndGetData(res.data.data)
                        this.setState({
                            toggleAlert: !this.state.toggleAlert
                        })
                    })
            })
        this.setState({
            isMenuOpen: !this.state.isMenuOpen,
            anchorEl: null,
            open: false
        })
        // window.location.href = '/';
    };

    handleDeleteContact = (event, row) => {
        var url = config.server.protocol + config.server.serverUrl + config.server.contextpath + '/deletecontactbyid/' + row.id;
        console.log(url)
        axios.delete(url).then(result => {
            // res = result.data.apiResults
            console.log(result.data)
        })
        this.setState({
            deleteDialog: false,
            anchorEl: null
        })
        window.location.href = '/';
    };

    modifyDate = (event) => {
        console.log(event.target.value)
        console.log(event.target.type)
        console.log(event.target.name)
        if (event.target.name === 'date') {
            this.setState({
                createdDate: event.target.value
            })
        }
    }

    handleCloseAlert = () => {
        this.setState({
            toggleAlert: !this.state.toggleAlert
        })
    }


    render() {
        const { row } = this.props;
        const { open, deleteDialog, toggleAlert } = this.state

        return (
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
                                <TextField autoFocus margin="dense" id="name" defaultValue={this.state.name} inputRef={this.nameRef} label="Name" type="text" fullWidth />
                                <TextField margin="dense" id="number" defaultValue={this.state.number} inputRef={this.numRef} label="Number" type="text" fullWidth />
                                <TextField margin="dense" id="incoming" defaultValue={this.state.incomingcc} inputRef={this.incomingRef} label="Incoming call count" type="text" fullWidth />
                                <TextField margin="dense" id="outgoing" defaultValue={this.state.outgoingcc} inputRef={this.outgoingRef} label="Outgoing call count" type="text" fullWidth />
                                <TextField margin="dense" id="location" defaultValue={this.state.location} inputRef={this.locationRef} label="Location" type="text" fullWidth />
                                <TextField margin="dense" id="date" name="date" value={this.state.createdDate} inputRef={this.dateRef} type="date" fullWidth onChange={this.modifyDate} />
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleDialogClose} color="primary">Cancel</Button>
                            <Button onClick={(e) => (this.handleUpdateContact(e, row))} color="primary">Update</Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={deleteDialog} onClose={this.handleDialogClose}
                        aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Are you sure?</DialogTitle>
                        <DialogActions>
                            <Button onClick={this.handleDeleteDialogToggle} color="primary">Cancel</Button>
                            <Button onClick={(e) => { this.handleDeleteContact(e, row) }} color="primary">Delete</Button>
                        </DialogActions>
                    </Dialog>
                    <Menu
                        anchorEl={this.state.anchorEl}
                        id={row.id}
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleMenuClose}
                    >
                        <MenuItem onClick={(e) => { this.handleDialogOpen(e, row) }}>Update</MenuItem>
                        <MenuItem onClick={(e) => { this.handleDeleteDialogToggle(e, row) }}>Delete</MenuItem>
                    </Menu>
                    <div>
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            open={toggleAlert}
                            autoHideDuration={6000}
                            onClose={this.handleCloseAlert}
                            message="Contact updated"
                        />
                    </div>
                </TableCell>
            </TableRow>
        );
    }
}

export default Contacts