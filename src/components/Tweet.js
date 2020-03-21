import React, {Component} from 'react';

import '../styles/css/Tweet.css';

import like from '../like.png'
import api from '../services/api';

export default class Tweet extends Component {
    
    handleLike = async () => {
        const { _id } = this.props.tweet;

        await api.post(`likes/${_id}`);
    }
    
    render() {

        const { tweet } = this.props;

        return(
            <li className="tweet">
                <strong>{tweet.author}</strong>
                <p>{tweet.content}</p>
                <button type="button" onClick={this.handleLike}>
                    <img className="like-img" src={like} alt="like"/>
                    <span>{tweet.likes}</span> 
                </button>
            </li>
        )
    }
}