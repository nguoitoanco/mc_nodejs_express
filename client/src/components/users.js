import React, {Component} from 'react';
import './users.css';
import Modal from 'react-modal';
// import Validation from 'react-validation';
// import "./validation.js";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import {Button, FormGroup} from 'react-bootstrap';
import validator from 'validator';
import 'bootstrap/dist/css/bootstrap.min.css';

export const required = (value) => {
    if (validator.isEmpty(value + '')) {
        return <small className="form-text text-danger">This field is required</small>;
    }
};

export const email = (value) => {
    if (!validator.isEmail(value)) {
        return <small className="form-text text-danger">Invalid email format</small>;
    }
};

export const minLength = (value) => {
    if (value.trim().length < 6) {
        return <small className="form-text text-danger">Password must be at least 6 characters long</small>;
    }
};
export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            modalIsOpen: false,
            modalMode: '',
            name: '',
            age: '',
            comment: '',
            id: 0
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        // We capture the value and change state as user changes the value here.
        this.logChange = this.logChange.bind(this);
        // Function where we submit data.
        this.handleEdit = this.handleEdit.bind(this);
    }

    openModal(user, mode) {
        if (mode === 'add') {
            this.setState({
                modalIsOpen: true,
                modalMode: mode,
                name: '',
                age: '',
                comment: '',
                id: ''
            });
        } else {
            this.setState({
                modalIsOpen: true,
                modalMode: mode,
                name: user.name,
                age: user.age,
                comment: user.comment,
                id: user.id
            });
        }
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
        window.location.reload();
    }

    logChange(e) {
        this.setState({
            [e.target.name]: e.target.value //setting value edited by the admin in state.
        });
    }

    handleEdit(event) {
        //Edit functionality
        console.log('handle edit');
        event.preventDefault();
        let data = {
            name: this.state.name,
            age: this.state.age,
            comment: this.state.comment,
            id: this.state.id,
            mode: this.state.modalMode
        };
        console.log('data mode:' + data.mode);

        let url = "http://localhost:5000/users/create";
        if (data.mode === 'edit') {
            url = "http://localhost:5000/users/edit";
        }

        console.log("fetch url:" + url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server.");
            }
            return response.json();
        }).then(function(data) {
            console.log(data);
            if (data === "success") {
                this.setState({
                    msg: "User has been submitted."
                });
            }
            alert('User has been submitted!');
        }).catch(function(err) {
            console.log(err);
        });
    }

    deleteUser(user){
        console.log('delete user');
        var data = {
            id: user.id
        };

        fetch("http://localhost:5000/users/delete", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            if(data === "success"){
                this.setState({msg: "User has been deleted."});
            }

            alert('User has been deleted.');
            window.location.reload();
        }).catch(function(err) {
            console.log(err);
        });
    }

    componentDidMount() {
        let self = this;
        fetch('http://localhost:5000/users', {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({
                users: data
            });
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    render() {
        return (
            <div className="container">
                <div className="panel panel-default p50 uth-panel">
                    <h2>User List</h2>
                    <Button className="btn btn-success float-right" onClick={() => this.openModal({}, 'add')}>Add User</Button>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Comment</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.users.map(user =>
                            <tr key={user.id}>
                                <td>{user.id} </td>
                                <td>{user.name} </td>
                                <td>{user.age}</td>
                                <td>{user.comment}</td>
                                <td><Button className="btn btn-info mr-1" onClick={() => this.openModal(user, 'edit')}>Edit</Button>
                                    <Button className="btn btn-danger" onClick={() => this.deleteUser(user)}>Delete</Button>
                                </td>
                            </tr>
                        )}

                            {/*Modal to edit the user data*/}
                            <Modal
                                isOpen={this.state.modalIsOpen}
                                onRequestClose={this.closeModal}
                                ariaHideApp={false}
                                contentLabel="Example Modal" >
                                <Form onSubmit={this.handleEdit} method="POST">
                                    <FormGroup role="form">
                                    <label>Name</label>
                                    <Input onChange={this.logChange} className="form-control" value={this.state.name} placeholder='Name' name='name' validations={[required]}/>
                                    <label>Age</label>
                                    <Input onChange={this.logChange} className="form-control" value={this.state.age} placeholder='Age' name='age' validations={[required]}/>
                                    <label>comment</label>
                                    <Input onChange={this.logChange} className="form-control" value={this.state.comment} placeholder='comment' name='comment' validations={[required]}/>
                                    <div className="submit-section">
                                        <Button className="btn btn-primary mt-3" type="submit">Submit</Button>
                                    </div>
                                    </FormGroup>
                                </Form>
                            </Modal>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}