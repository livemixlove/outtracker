import React, { Component } from 'react'
import $ from 'jquery'

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
        return (
            <div className='chat-input-holder'>
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

export default ChatInput