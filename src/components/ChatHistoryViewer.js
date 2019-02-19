import React, { Component } from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'

import '../styles/ChatHistoryViewer.scss'
import MessageRow from './MessageRow'

class ChatHistoryViewer extends Component {
    componentDidUpdate() {
        this.scrollToBottom()
    }

    scrollToBottom() {
        const $element = $(this.div)
        $element.scrollTop($element[0].scrollHeight)
    }

    render() {
        const { messageHistory } = this.props
        return (
            <div
                className='chat-history-viewer-holder'
                ref={(ref) => { this.div = ref }}
            >
                {messageHistory.map((message, ind) => <MessageRow key={ind} message={message} />)}
            </div>
        )
    }
}

ChatHistoryViewer = connect(mapStateToProps)(ChatHistoryViewer)
export default ChatHistoryViewer


function mapStateToProps(state) {
    return { messageHistory: state.messageHistory.toArray() }
}
