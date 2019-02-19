import React, { Component } from 'react'

class BadCommandMessage extends Component {
    render() {
        return ([
            <span className='warning-text'>Sorry, outtracker doesn’t understand your command</span>,
            <span>type: <strong>@outtracker —help</strong> for a list of supported commands</span>,
        ]
        )
    }
}

export default BadCommandMessage