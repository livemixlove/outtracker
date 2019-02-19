import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import $ from 'jquery'

import '../styles/ChatHistoryViewer.scss'
import MessageRow from './MessageRow'
import { ChatMessagePropTypes } from '../OuttrackerTypes'

class ChatHistoryViewer extends Component {
    static propTypes = {
        messageHistory: PropTypes.arrayOf(
            ChatMessagePropTypes,
        ).isRequired,
    }

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
                {messageHistory.map(message => <MessageRow key={message.dateTime} message={message} />)}
            </div>
        )
    }
}

ChatHistoryViewer = connect(mapStateToProps)(ChatHistoryViewer)
export default ChatHistoryViewer


function mapStateToProps(state) {
    return { messageHistory: state.messageHistory.toArray() }
}
