import React, { Component } from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'

import '../styles/ChatInput.scss'
import MessageRelayer from '../MessageRelayer'

const ENTER_KEY = 13

class ChatInput extends Component {
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

    handleSubmit = () => {
        const inputValue = this.getInputValue()
        MessageRelayer.processMessage(inputValue)
        this.clearInput()
    }

    getInputValue() {
        const value = $(this.textarea).val()
        return value
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
                    ref={ref => this.textarea = ref}
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

const RecordingIndicator = ({ recording }) => (
    <div className='input-recording-indicator'>
        <div className='record-icon' />
                {' '}
outtracker is recording all input to current outage history...
            </div>
)
