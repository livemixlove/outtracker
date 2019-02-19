import React, { Component } from 'react'
import $ from 'jquery'
import {connect} from 'react-redux'

import './ChatInput.scss';
import InputDelegator from './InputDelegator';


class ChatInput extends Component {

    componentDidMount() {
        $(document).on('keypress',(e) => {
            if(e.which === 13) {
                this.handleSubmit()
                e.preventDefault()
            }
        });
    }

    handleSubmit = () => {
        const textValue = $(this.textarea).val()
        $(this.textarea).val('')
        InputDelegator.processInput(textValue)
    }

    render() {
        const { recording } = this.props
        return (
            <div className='chat-input-holder'>
                {recording && <RecordingIndicator />}
                <textarea 
                    className='main-chat-input'
                    wrap='soft'
                    ref={ ref => this.textarea = ref }
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

const RecordingIndicator = ({recording}) => (
    <div className='input-recording-indicator'>
        <div className='record-icon' /> outtracker is recording all input to current outage history...
    </div>
)