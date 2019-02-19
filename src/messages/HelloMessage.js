import React, { Component } from 'react'

class HelloMessage extends Component {
    render() {
        return (
            [
                <p>Hello, DemoUser!  You can report an outage by typing:</p>,
                <p><strong>@outtracker start</strong></p>,
                <p><span>or get all options with <strong>@outtracker help</strong></span></p>,
            ]
        )
    }
}

export default HelloMessage
