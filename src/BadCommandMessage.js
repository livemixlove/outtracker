import React, { Component } from 'react'

class BadCommandMessage extends Component {
    render() {
        return ([
            <p><span className='warning-text'>Sorry, outtracker doesn’t understand your command</span></p>,
            <p><span>type: <strong>@outtracker --help</strong> for a list of supported commands</span></p>,
        ]
        )
    }
}

export default BadCommandMessage