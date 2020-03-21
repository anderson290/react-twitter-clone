import React, { Component } from 'react';

import twitterLogo from '../twitter-logo.png';

import '../styles/css/login.css';

export default class Login extends Component {

    state = {
        username: '',
    };

    handleInputChange = event => {
        this.setState({ username: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        const { username } = this.state;

        if (!username.length) return;

        localStorage.setItem('@GoTwitter:username', username);

        this.props.history.push('/timeline');
    }

    render() {
        return (
            <div className="login-wrapper">
                <div className="center-object">
                    <img className="logo-img" src={twitterLogo} alt="GoTwitter" />

                    <form onSubmit={this.handleSubmit}>
                        <input type="text" className="w-100 "
                            value={this.state.username}
                            onChange={this.handleInputChange}
                            placeholder="Nome do usuário" />

                        <button type="submit" className="button">Entrar</button>
                    </form>
                </div>


            </div>
        )
    }
}