import React, { Component } from 'react'
import classnames from 'classnames'

import { outtrackerUserName } from './OuttrackerTypes';
import { demoUserName } from './OuttrackerTypes';

import './MessageRow.scss'
import { MESSAGE_STATUS_CODES } from './OuttrackerTypes';

class MessageRow extends Component {
    render() {
        const { message } = this.props

        let messageBubble 
        let leftAlign
        if(message.user === demoUserName) {
            // obviously woudn't hardcode this for a non-demo application
            messageBubble = <UserMessage message={message} />
            leftAlign = true
        } else if ( message.user === outtrackerUserName) {
            messageBubble = <OuttrackerMessage message={message} />
            leftAlign = false
        }

        const rowClasses = classnames(
            {
            'left-align': leftAlign,
            'right-align': !leftAlign,
            'success': message.messageStatusCode === MESSAGE_STATUS_CODES.SUCCESS,
            'neutral': message.messageStatusCode === MESSAGE_STATUS_CODES.NEUTRAL,
            'failure': message.messageStatusCode === MESSAGE_STATUS_CODES.FAILURE,
        })

        return <div className={'message-row ' +rowClasses}>
                    <DateTimeForRow dateTimeString={message.dateTime} />
                    <div className={'message-row-flex-container ' +rowClasses}>
                        {messageBubble}
                    </div>
                </div>
    }
}

export default MessageRow

const UserMessage = ({message}) => (
    <div className='chat-message chat-message-left'>
        <div dangerouslySetInnerHTML={{ __html: message.text }} />
    </div>
)
const OuttrackerMessage = ({message}) => (
    <div className='chat-message chat-message-right'>
        <div dangerouslySetInnerHTML={{ __html: message.text }} />
    </div>
)

const DateTimeForRow = ({dateTimeString}) => (
    <div className='chat-message-date-time'>
        {dateTimeString}
    </div>
)