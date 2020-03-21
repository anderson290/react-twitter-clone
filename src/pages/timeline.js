import React, { Component } from 'react';
import socket from 'socket.io-client';
import api from '../services/api';

import '../styles/css/timeline.css';
import Tweet from './../components/Tweet';
import twitterLogo from '../twitter-logo.png';

export default class Timeline extends Component {

    state = {
        tweets: [],
        newTweet: ''
    };

    //quando inicializa
    async componentDidMount() {
        this.subscribeToEvents();
        const response = await api.get('/tweets');
        this.setState({ tweets: response.data });
    }

    //socket real time
    subscribeToEvents = () => {
        const io = socket('http://localhost:3000');

        io.on('tweet', data => {
            this.setState({ tweets: [data, ...this.state.tweets] })
        })
        io.on('like', data => {

            //percorrendo tweets e atualizando likes
            this.setState({
                tweets: this.state.tweets.map(tweet =>
                    tweet._id === data._id ? data : tweet
                )
            })
        })
    }

    handleInputChange = e => {
        this.setState({ newTweet: e.target.value });
    }

    handleNewTweet = async e => {

        if (e.keyCode !== 13) return;

        const content = this.state.newTweet;
        const author = localStorage.getItem('@GoTwitter:username');

        await api.post('/tweets', { content, author });

        this.setState({ newTweet: '' });
    }


    render() {
        return (
            <div className="timeline-wrapper">
                <div className="center-object">
                    <img className="header-img-logo" height={24} src={twitterLogo} alt="GoTwitter" />


                    <form>
                        <textarea
                            value={this.state.newTweet}
                            onChange={this.handleInputChange}
                            onKeyDown={this.handleNewTweet}
                            placeholder="o que esta acontecendo?" />
                    </form>
                </div>

                <ul>
                    {this.state.tweets.map(tweet => (
                        <Tweet key={tweet._id} tweet={tweet} />
                    ))}
                </ul>


            </div>
        );
    }
}