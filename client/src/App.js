import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {
    constructor() {
        super();
        this.state = {items: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users')
            .then(response => {
                console.log(response.data);
                this.setState({items: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <div className="App">
                <h1>User List</h1>
                <div>
                    <table className="table table-hover" align="center">
                        <thead>
                        <tr>
                            <th width="10%">ID</th>
                            <th width="30%">NAME</th>
                            <th width="10%">AGE</th>
                            <th width="40%">COMMENTS</th>
                            <th width="10%">ACTIONS</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.items.map(item =>
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.age}</td>
                                    <td>{item.comment}</td>
                                    <td><a>Edit</a>&nbsp;<a>Delete</a></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    // render() {
    //   return (
    //     <div className="App">
    //       <header className="App-header">
    //         <img src={logo} className="App-logo" alt="logo" />
    //         <p>
    //           Edit <code>src/App.js</code> and save to reload.
    //         </p>
    //         <a
    //           className="App-link"
    //           href="https://reactjs.org"
    //           target="_blank"
    //           rel="noopener noreferrer"
    //         >
    //           Learn React
    //         </a>
    //       </header>
    //     </div>
    //   );
    // }
}

export default App;
