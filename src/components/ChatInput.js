import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import $ from 'jquery'

import '../styles/ChatInput.scss'
import MessageRelayer from '../MessageRelayer'

const ENTER_KEY = 13

class ChatInput extends Component {
    static propTypes = {
        recording: PropTypes.bool.isRequired,
    }

    componentDidMount() {
        this.setupHandleEnterKey()
    }

    setupHandleEnterKey() {
        $(document).on('keypress', (e) => {
            if (e.which === ENTER_KEY) {
                this.handleSubmit()
                e.preventDefault()
            }
        })
    }

    getInputValue() {
        const value = $(this.textarea).val()
        return value
    }

    handleSubmit = () => {
        const inputValue = this.getInputValue()
        MessageRelayer.processMessage(inputValue)
        this.clearInput()
    }

    clearInput() {
        $(this.textarea).val('')
    }

    render() {
        const { recording } = this.props
        return (
            <div className='chat-input-holder'>
                {recording && <RecordingIndicator />}
                <textarea
                    className='main-chat-input'
                    wrap='soft'
                    ref={(ref) => { this.textarea = ref }}
                />
                <span
                    className='submit-button'
                    onClick={this.handleSubmit}
                >
                    Submit
                </span>
            </div>
        )
    }
}

ChatInput = connect(mapStateToProps)(ChatInput)
export default ChatInput

function mapStateToProps(state) {
    return {
        recording: state.isRecordingAllInputs,
    }
}

const RecordingIndicator = () => (
    <div className='input-recording-indicator'>
        <div className='record-icon' />outtracker is recording all input to current outage history...
    </div>
)
