import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import {
    demoUserName, outtrackerUserName, MESSAGE_STATUS_CODES, ChatMessagePropTypes,
} from '../OuttrackerTypes'

import '../styles/MessageRow.scss'

class MessageRow extends Component {
    static propTypes = {
        message: ChatMessagePropTypes.isRequired,
    }

    render() {
        const { message } = this.props

        let messageBubble
        let leftAlign
        if (message.user === demoUserName) {
            // obviously woudn't hardcode this for a non-demo application
            messageBubble = <UserMessage message={message} />
            leftAlign = true
        } else if (message.user === outtrackerUserName) {
            messageBubble = <OuttrackerMessage message={message} />
            leftAlign = false
        }

        const rowClasses = classnames(
            {
                'left-align': leftAlign,
                'right-align': !leftAlign,
                success: message.messageStatusCode === MESSAGE_STATUS_CODES.SUCCESS,
                neutral: message.messageStatusCode === MESSAGE_STATUS_CODES.NEUTRAL,
                failure: message.messageStatusCode === MESSAGE_STATUS_CODES.FAILURE,
            },
        )

        return (
            <div className={'message-row ' + rowClasses}>
                <UserAndDateForRow user={message.user} dateTimeString={message.dateTime} />
                <div className={'message-row-flex-container ' + rowClasses}>
                    {messageBubble}
                </div>
            </div>
        )
    }
}

export default MessageRow

const UserMessage = ({ message }) => (
    <div className='chat-message chat-message-left'>
        <div dangerouslySetInnerHTML={{ __html: message.text }} />
    </div>
)

UserMessage.propTypes = {
    message: ChatMessagePropTypes.isRequired,
}

const OuttrackerMessage = ({ message }) => (
    <div className='chat-message chat-message-right'>
        <div dangerouslySetInnerHTML={{ __html: message.text }} />
    </div>
)
OuttrackerMessage.propTypes = {
    message: ChatMessagePropTypes.isRequired,
}

const UserAndDateForRow = ({ user, dateTimeString }) => (
    <div className='chat-message-date-time'>
        {user}
        {' '}
-
        {' '}
        {dateTimeString}
    </div>
)

UserAndDateForRow.propTypes = {
    user: PropTypes.string.isRequired,
    dateTimeString: PropTypes.string.isRequired,
}
