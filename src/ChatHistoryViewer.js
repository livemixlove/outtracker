import React, { Component } from 'react'
import { connect } from 'react-redux'

import './ChatHistoryViewer.scss'
import MessageRow from './MessageRow'

class ChatHistoryViewer extends Component {
    render() {
        const { messageHistory } = this.props
        return (
            <div className='chat-history-viewer-holder'>
                {messageHistory.map(message => {
                    return <MessageRow message={message} />
                })}
            </div>
        )
    }
}

ChatHistoryViewer = connect(mapStateToProps)(ChatHistoryViewer)
export default ChatHistoryViewer


function mapStateToProps(state, props) {
    return {messageHistory: state.messageHistory.toArray()}
}   
