import React, {Component} from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import validator from 'validator';
import 'bootstrap/dist/css/bootstrap.min.css';
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {LANGUAGE} from "../language/multiLanguage";
import Langs from '../language/language';
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
            username: this.state.username,
            password: this.state.password
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
                localStorage.setItem('mc.node.js.express.login.token', response.loginToken);
                toast.success(Langs[self.state.currentLanguage]["msg.login.success"]);
                self.onCloseModal();
                self.props.onClick();
            } else {
                localStorage.setItem('mc.node.js.express.login.token', '');
                toast.error(Langs[self.state.currentLanguage]["msg.login.error"]);
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
        console.log('render login');
        let currentLang = localStorage.getItem('mc.node.js.express.language');
        if (!currentLang) {
            currentLang = LANGUAGE.ENGLISH;
        }
        return (
            <div className="container text-right">
                <Button className="btn mt-1" onClick={this.onOpenModal}>{Langs[currentLang]["btn.login"]}</Button>
                <Modal className="modal-sm col-sm-6 mb-3" style={customStyles} isOpen={this.state.isOpen} onRequestClose={this.onCloseModal} ariaHideApp={false} contentLabel="Example Modal" >
                    <div className="panel panel-default">
                        <h2>{Langs[currentLang]["lbl.login.page"]}</h2>
                        <Form onSubmit={this.doLogin.bind(this)} ref={c => { this.form = c }} method="POST">
                            <div className="form-group">
                                <label>{Langs[currentLang]["lbl.user.name"]}</label>
                                <Input onChange={this.logChange} className="form-control"
                                       value={this.state.username} placeholder={Langs[currentLang]["lbl.user.name"]} name='username' validations={[required]}/>
                            </div>
                            <div className="form-group">
                                <label>{Langs[currentLang]["lbl.user.password"]}</label>
                                <Input onChange={this.logChange} className="form-control" type="password"
                                       value={this.state.password} placeholder={Langs[currentLang]["lbl.user.password"]} name="password" validations={[required]}/>
                            </div>
                            <div className="submit-section mt-3 mb-3 text-center">
                                <CheckButton className="btn btn-primary mr-3" type="submit">{Langs[currentLang]["btn.login"]}</CheckButton>
                            </div>
                        </Form>
                    </div>
                </Modal>
            </div>
        );
    }
}