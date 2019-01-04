import React, {Component} from 'react';
import './users.css';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import {Button, FormGroup} from 'react-bootstrap';
import validator from 'validator';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const toastStyle = {
    fontFamily: 'sans-serif',
    color: '#FFFFFF'
};
export const required = (value) => {
    if (validator.isEmpty(value.toString())) {
        return <small className="form-text text-danger">This field is required.</small>;
    }
};

export const number = (value) => {
    if (!validator.isNumber(value.toString())) {
        return <small className="form-text text-danger">Invalid number format.</small>;
    }
};

export const minLength = (value, minL) => {
    if (value.trim().length < minL) {
        return <small className="form-text text-danger">Password must be at least {minL} characters long.</small>;
    }
};

export const maxLength = (value, maxL) => {
    if (value.trim().length > maxL) {
        return <small className="form-text text-danger">Password cannot be longer than {maxL} characters.</small>;
    }
};
export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            name: '',
            age: '',
            comment: '',
            id: 0,
            limit: 10,
            btnShowMoreTitle: 'Show more users',
            totalUsers:0
        };
        // We capture the value and change state as user changes the value here.
        this.logChange = this.logChange.bind(this);
        this.LoadMoreUsersButton = this.LoadMoreUsersButton.bind(this);
        // Function where we submit data.
        this.handleEdit = this.handleEdit.bind(this);
    }

    logChange(e) {
        this.setState({
            [e.target.name]: e.target.value //setting value edited by the admin in state.
        });
    }

    cancelUser() {
        this.setState({
            name: '',
            age: '',
            comment: ''
        });
    }

    fetchUserList(callback) {
        let self = this;
        fetch('http://localhost:5000/users?limit=' + self.state.limit, {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({
                totalUsers: data.totalUsers,
                users: data.users,
                limit: data.users.length
            });
        }).catch(err => {
            console.log('caught it!', err);
            toast.error(err.toString);
        });

        if (typeof callback === 'function') {
            return callback();
        }
    }

    handleEdit(event) {
        let self = this;
        //Edit functionality
        console.log('handle edit');
        event.preventDefault();
        let data = {
            name: this.state.name,
            age: this.state.age,
            comment: this.state.comment,
            id: this.state.id
        };

        fetch('http://localhost:5000/users/create', {
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
            if (data.errors !== undefined && data.errors.length > 0) {
                let errors = '';
                data.errors.forEach(function (err) {
                    toast.error(err.msg);
                });
            } else {
                toast.success('User has been added!');
                self.fetchUserList();
            }
        }).catch(function(err) {
            console.log(err);
            toast.error(err.toString);
        });
    }

    deleteUser(user){
        console.log('delete user');
        let self = this;
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
            if (data.errors !== undefined && data.errors.length > 0) {
                let errors = '';
                data.errors.forEach(function (err) {
                    toast.error(err.msg);
                });
            } else {
                toast.success('User has been deleted!');
                self.fetchUserList();
            }
        }).catch(function(err) {
            console.log(err);
            toast.error(err.toString);
        });
    }

    plusAge(userId){
        console.log('plus user age');
        let self = this;
        let data = {
            id: userId
        };

        fetch("http://localhost:5000/users/agePlus", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            if (data.errors !== undefined && data.errors.length > 0) {
                let errors = '';
                data.errors.forEach(function (err) {
                    toast.error(err.msg);
                });
            } else {
                toast.success("User's age has been added.");
                self.fetchUserList();
            }
        }).catch(function(err) {
            console.log(err);
            toast.error(err.toString);
        });
    }

    componentDidMount() {
        this.fetchUserList();
    }

    loadMoreUsers() {
        let self = this;
        self.state.limit = this.state.limit + 10;
        self.setState({
            btnShowMoreTitle: 'Loading more user'
        });
        self.fetchUserList(function () {
            self.setState({
                btnShowMoreTitle: 'Show more user'
            });
        });
    }

    LoadMoreUsersButton() {
        if (this.state.limit < this.state.totalUsers) {
            return <Button className="btn btn-primary" onClick={() => this.loadMoreUsers()}>
                {this.state.btnShowMoreTitle}</Button>;
        }
        return '';
    }

    render() {
        return (
            <div className="container">
                <div className="panel panel-default p50 uth-panel">
                    <h2>New User Info</h2>
                    <Form onSubmit={this.handleEdit} method="POST">
                        <FormGroup role="form">
                            <label>Name</label>
                            <Input onChange={this.logChange} className="form-control" maxLength="10"
                                   value={this.state.name} placeholder='Name' name='name' validations={[required]}/>
                            <label>Age</label>
                            <Input onChange={this.logChange} className="form-control" maxLength="3" type="number"
                                   value={this.state.age} placeholder='Age' name='age' validations={[required]}/>
                            <label>comment</label>
                            <textarea onChange={this.logChange} className="form-control"
                                   value={this.state.comment}
                                   placeholder='comment' name='comment' validations={[required]}/>
                            <div className="submit-section mt-3 text-center">
                                <Button className="btn btn-primary mr-3" type="submit">Add User</Button>
                                <Button className="btn btn-dark" onClick={() => this.cancelUser()}>Cancel</Button>
                            </div>
                        </FormGroup>
                    </Form>
                </div>
                <hr />
                <div className="panel panel-default p50 uth-panel">
                    <h2>User List</h2>
                    <table className="table table-hover">
                        <thead>
                        </thead>
                        <tbody>
                        {this.state.users.map(user =>
                            <tr key={user.id}>
                                <td>{user.id} </td>
                                <td>{user.name} ({user.age}) </td>
                                <td className="textarea_wrap">{user.comment}</td>
                                <td><Button className="btn btn-info mr-1" onClick={() => this.plusAge(user.id)}>+1</Button>
                                    <Button className="btn btn-danger" onClick={() => this.deleteUser(user)}>Delete</Button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <div className="action text-center mb-3">
                    <this.LoadMoreUsersButton/>
                </div>


                <div className="message" style={toastStyle}>
                    <ToastContainer/>
                </div>
            </div>
        );
    }
}