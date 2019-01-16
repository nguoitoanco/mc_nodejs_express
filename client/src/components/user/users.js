import React, {Component} from 'react';
import './users.css';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Textarea from 'react-validation/build/textarea';
import {Button} from 'react-bootstrap';
import CheckButton from 'react-validation/build/button';
import validator from 'validator';
import 'bootstrap/dist/css/bootstrap.min.css';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {LANGUAGE, MultiLanguage} from "../language/multiLanguage";
import Langs from '../language/language';
import Login from '../admin/login';
import {BASE_API_URL} from '../constant';

const LOGIN_TOKEN_KEY = 'mc.node.js.express.login.token';
const toastStyle = {
    fontFamily: 'sans-serif',
    color: '#FFFFFF'
};
const required = (value) => {
    if (validator.isEmpty(value.toString())) {
        return <small className="form-text text-danger">Field is required.</small>;
    }
};

const number = (value) => {
    if (!validator.isNumeric(value.toString())) {
        return <small className="form-text text-danger">Field is invalid number format.</small>;
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
            totalUsers:0,
            currentLanguage: LANGUAGE.ENGLISH
        };

        // set current language
        localStorage.setItem('mc.node.js.express.language', LANGUAGE.ENGLISH);
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
        let token = localStorage.getItem(LOGIN_TOKEN_KEY) ? localStorage.getItem(LOGIN_TOKEN_KEY) : '';
        fetch(BASE_API_URL + 'users?limit=' + self.state.limit + '&&token=' + token, {
            method: 'GET'
        }).then(function(response) {
            if (response.status === 401) {
                throw new Error((Langs[self.state.currentLanguage]["msg.require.login"]));
            } else if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({
                totalUsers: data.totalUsers,
                users: data.users
            });

            // Reset limit search.
            self.state.limit = data.users.length < 10 ? 10 : data.users.length;

        }).catch(err => {
            console.log('caught it!', err);
            toast.error(err.message);
        });

        if (typeof callback === 'function') {
            return callback();
        }
    }

    handleEdit(event) {
        let self = this;
        event.preventDefault();
        let data = {
            name: this.state.name,
            age: this.state.age,
            comment: this.state.comment,
            id: this.state.id
        };

        let token = localStorage.getItem(LOGIN_TOKEN_KEY) ? localStorage.getItem(LOGIN_TOKEN_KEY) : '';
        fetch(BASE_API_URL + 'users/create?token=' + token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status === 401) {
                throw new Error((Langs[self.state.currentLanguage]["msg.require.login"]));
            } else if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            console.log(data);
            if (data.errors !== undefined && data.errors.length > 0) {
                data.errors.forEach(function (err) {
                    toast.error(err.msg);
                });
            } else {
                toast.success(Langs[self.state.currentLanguage]["msg.user.added"]);
                self.fetchUserList();
            }
        }).catch(function(err) {
            console.log(err);
            toast.error(err.message);
        });
    }

    deleteUser(user){
        console.log('delete user');
        let self = this;
        var data = {
            id: user.id
        };

        let token = localStorage.getItem(LOGIN_TOKEN_KEY) ? localStorage.getItem(LOGIN_TOKEN_KEY) : '';
        fetch(BASE_API_URL + "users/delete?token=" + token, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status === 401) {
                throw new Error((Langs[self.state.currentLanguage]["msg.require.login"]));
            } else if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            if (data.errors !== undefined && data.errors.length > 0) {
                data.errors.forEach(function (err) {
                    toast.error(err.msg);
                });
            } else {
                toast.success(Langs[self.state.currentLanguage]["msg.user.deleted"]);
                self.fetchUserList();
            }
        }).catch(function(err) {
            console.log(err);
            toast.error(err.message);
        });
    }

    plusAge(userId){
        console.log('plus user age');
        let self = this;
        let data = {
            id: userId
        };

        let token = localStorage.getItem(LOGIN_TOKEN_KEY) ? localStorage.getItem(LOGIN_TOKEN_KEY) : '';
        fetch(BASE_API_URL + "users/agePlus?token=" + token, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status === 401) {
                throw new Error((Langs[self.state.currentLanguage]["msg.require.login"]));
            } else if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            if (data.errors !== undefined && data.errors.length > 0) {
                data.errors.forEach(function (err) {
                    toast.error(err.msg);
                });
            } else {
                toast.success(Langs[self.state.currentLanguage]["msg.user.age.added"]);
                self.fetchUserList();
            }
        }).catch(function(err) {
            console.log(err);
            toast.error(err.message);
        });
    }

    componentDidMount() {
        this.fetchUserList();
    }

    loadMoreUsers() {
        let self = this;
        self.state.limit = this.state.limit + 10;
        self.fetchUserList();
    }

    LoadMoreUsersButton() {
        if (this.state.limit < this.state.totalUsers) {
            return <Button className="btn btn-primary" onClick={() => this.loadMoreUsers()}>
                {Langs[this.state.currentLanguage]["btn.show.more.users"]}</Button>;
        }
        return '';
    }

    changeLanguage(language) {
        console.log('click change language to:' + language);
        this.setState({
            currentLanguage:language
        });
    }

    loginSuccess(language) {
        console.log('Login success.');
        this.fetchUserList();
    }

    render() {
        let currLanguages = Langs[this.state.currentLanguage];
        return (
            <div className="container">
                <div className="row">
                <div className="col-sm-10 text-center">
                    <MultiLanguage framework="React" compiler="TypeScript" onClick={this.changeLanguage.bind(this)} />
                </div>
                <div className="col-sm-2 text-right">
                    <Login  onClick={this.loginSuccess.bind(this)} />
                </div>
                </div>
                <div className="panel panel-default p50 uth-panel mt-lg-1">
                    <h2>{currLanguages["lbl.new.user.info"]}</h2>
                    <div className="alert alert-success">
                        <strong>{currLanguages["msg.inform.create.user"]}</strong>
                    </div>
                    <Form onSubmit={this.handleEdit.bind(this)} ref={c => { this.form = c }} method="POST">
                        <div className="form-group">
                            <label>{currLanguages["lbl.name"]}</label>
                            <Input onChange={this.logChange} className="form-control" maxLength="10"
                                   value={this.state.name} placeholder={currLanguages["lbl.name"]} name='name' validations={[required]}/>
                        </div>
                        <div className="form-group">
                            <label>{currLanguages["lbl.age"]}</label>
                            <Input onChange={this.logChange} className="form-control" maxLength="3" type="number"
                                   value={this.state.age} placeholder={currLanguages["lbl.age"]} name="age" validations={[required, number]}/>
                        </div>
                        <div className="form-group">
                            <label>{currLanguages["lbl.comment"]}</label>
                            <Textarea onChange={this.logChange} className="form-control" value={this.state.comment}
                                      placeholder={currLanguages["lbl.comment"]} name='comment' validations={[required]}/>
                        </div>
                        <div className="submit-section mt-3 text-center">
                            <CheckButton className="btn btn-primary mr-3" type="submit">{currLanguages["btn.create.user"]}</CheckButton>
                            <Button className="btn btn-dark" onClick={() => this.cancelUser()}>{currLanguages["btn.cancel"]}</Button>
                        </div>
                    </Form>
                </div>
                <hr />
                <div className="panel panel-default p50 uth-panel">
                    <h2>{currLanguages["lbl.user.list"]}</h2>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>{currLanguages["lbl.user.id"]}</th>
                                <th>{currLanguages["lbl.user.name.age"]}</th>
                                <th>{currLanguages["lbl.comment"]}</th>
                                <th>{currLanguages["lbl.action"]}</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.users.map(user =>
                            <tr key={user.id}>
                                <td>{user.id} </td>
                                <td>{user.name} ({user.age}) </td>
                                <td className="textarea_wrap">{user.comment}</td>
                                <td><Button className="btn btn-info mr-1" onClick={() => this.plusAge(user.id)}>+1</Button>
                                    <Button className="btn btn-danger" onClick={() => this.deleteUser(user)}>{currLanguages["btn.delete"]}</Button>
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