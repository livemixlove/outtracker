import React, { Component } from 'react'

import './ChatInput.scss';

class ChatInput extends Component {
    render() {
        return (
            <div className='chat-input-holder'>
                <textarea 
                    className='main-chat-input' 
                    wrap='soft'
                />
                <span className='submit-button' >Submit</span>
            </div>
        )
    }
}

export default ChatInput