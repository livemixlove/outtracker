import React, { Component } from 'react'

import '../styles/ChatConsole.scss'
import ChatHistoryViewer from './ChatHistoryViewer'
import ChatInput from './ChatInput'

class ChatConsole extends Component {
    render() {
        return (
            <div className='chat-console-parent'>
                <div className='chat-console-panel'>
                    <ChatHistoryViewer />
                    <ChatInput />
                </div>
            </div>
        )
    }
}

export default ChatConsole
