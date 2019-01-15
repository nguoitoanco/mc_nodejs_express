import React, {Component} from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import validator from 'validator';
import 'bootstrap/dist/css/bootstrap.min.css';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Multilanguage} from "../multilanguage/Multilanguage";
import Langs from '../multilanguage/language';
import {Redirect} from "react-router-dom";
import Modal from "react-modal";
import {Button} from "react-bootstrap";

const BASE_API_URL = 'http://localhost:5000/';
const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        background            : '#d9edf7'
    }
};
const required = (value) => {
    if (validator.isEmpty(value.toString())) {
        return <small className="form-text text-danger">Field is required.</small>;
    }
};

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            currentLanguage: 0,
            isOpen: false
        };
        // We capture the value and change state as user changes the value here.
        this.logChange = this.logChange.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
    }

    logChange(e) {
        this.setState({
            [e.target.name]: e.target.value //setting value edited by the admin in state.
        });
    }

    doLogin(event) {
        let self = this;
        event.preventDefault();
        let data = {
            name: this.state.username,
            age: this.state.password
        };

        fetch(BASE_API_URL + 'users/login', {
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
        }).then(function(response) {
            console.log(response);
            if (response.loginResult) {
                toast.error(Langs[self.state.currentLanguage]["msg.login.success"]);
            } else {
                localStorage.set('mc.node.js.express.login.token', response.loginToken);
                toast.success(Langs[self.state.currentLanguage]["msg.login.error"]);
            }
        }).catch(function(err) {
            console.log(err);
            toast.error(err.message);
        });
    }

    componentDidMount() {
        this.setState({
            username:'',
            password:''
        });
    }

    changeLanguage(language) {
        console.log('click change language to:' + language);
        this.setState({
            currentLanguage:language
        });
    }

    onCloseModal() {
        this.setState({
            isOpen:false
        });
    }

    onOpenModal() {
        this.setState({
            isOpen:true
        });
    }

    render() {
        let currLanguages = Langs[this.state.currentLanguage];
        return (
            <div className="container">
                <Button onClick={this.onOpenModal}>Login</Button>
                <Modal className="modal-sm col-sm-6 mb-3" style={customStyles} isOpen={this.state.isOpen} onRequestClose={this.onCloseModal} ariaHideApp={false} contentLabel="Example Modal" >
                    <div className="panel panel-default">
                        <h2>{currLanguages["lbl.login.page"]}</h2>
                        <Form onSubmit={this.doLogin.bind(this)} ref={c => { this.form = c }} method="POST">
                            <div className="form-group">
                                <label>{currLanguages["lbl.user.name"]}</label>
                                <Input onChange={this.logChange} className="form-control" maxLength="10"
                                       value={this.state.username} placeholder={currLanguages["lbl.user.name"]} name='username' validations={[required]}/>
                            </div>
                            <div className="form-group">
                                <label>{currLanguages["lbl.user.password"]}</label>
                                <Input onChange={this.logChange} className="form-control" maxLength="3" type="password"
                                       value={this.state.password} placeholder={currLanguages["lbl.user.password"]} name="password" validations={[required]}/>
                            </div>
                            <div className="submit-section mt-3 mb-3 text-center">
                                <CheckButton className="btn btn-primary mr-3" type="submit">{currLanguages["btn.login"]}</CheckButton>
                            </div>
                        </Form>
                    </div>
                </Modal>

                {/*<div className="message" style={toastStyle}>*/}
                    {/*<ToastContainer/>*/}
                {/*</div>*/}
            </div>
        );
    }
}