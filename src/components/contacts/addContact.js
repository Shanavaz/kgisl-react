import React from 'react'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import config from '../../config/config'
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

class CreateContact extends React.Component {


    constructor(props) {
        super(props)
        this.nameRef = React.createRef()
        this.numRef = React.createRef()
        this.incomingRef = React.createRef()
        this.outgoingRef = React.createRef()
        this.locationRef = React.createRef()
        this.dateRef = React.createRef()

        this.state = {
            name: '',
            number: '',
            incomingcc: '',
            outgoingcc: '',
            location: '',
            createdDate: '',
            toggleAlert: false
        }
    }

    componentWillMount() {
        console.log('create new')

    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.nameRef.current.value)
        let reqData = {
            name: this.nameRef.current.value,
            createdDate: this.state.createdDate,
            number: this.numRef.current.value,
            incomingCallCount: this.incomingRef.current.value,
            outGoingCallCount: this.outgoingRef.current.value,
            location: this.locationRef.current.value,
        }
        console.log(reqData)
        var url = config.server.protocol + config.server.serverUrl + config.server.contextpath + '/createcontact';
        axios.post(url, reqData)
            .then(result => {
                console.log(result.status)
                if (result.status === 201) {
                    this.setState({
                        toggleAlert: !this.state.toggleAlert
                    })
                    window.location.href = '/';

                }
            })

    }

    handleChange = (event) => {
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
        const { toggleAlert } = this.state
        return (
            <center>
                <h1>Create a contact</h1>
                {this.state.toggleAlert ?
                    <Alert severity="success">Contact created!!</Alert> :
                    <p></p>}
                <form >
                    <div><TextField name="name" inputRef={this.nameRef} label="Name" onKeyPress={this.handleChange} /></div>
                    <div><TextField name="number" inputRef={this.numRef} label="Number" /></div>
                    <div><TextField name="incoming" inputRef={this.incomingRef} label="Incoming call count" /></div>
                    <div><TextField name="outgoing" inputRef={this.outgoingRef} label="Outgoing call count" /></div>
                    <div><TextField name="location" inputRef={this.locationRef} label="Location" /></div>
                    <div><TextField type="date" name="date" inputRef={this.dateRef} onChange={this.handleChange} /></div>
                    <div style={{ marginTop: '5px' }}>
                        <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                            Submit</Button>
                    </div>
                </form>
                <div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={toggleAlert}
                        autoHideDuration={6000}
                        onClose={this.handleCloseAlert}
                        message="Contact created"
                    />
                </div>
            </center>
        )
    }
}

export default CreateContact