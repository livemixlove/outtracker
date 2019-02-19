import React, { Component } from 'react'

class HelloMessage extends Component {
    render() {
        return (
            [
                'Hello, DemoUser!  You can report an outage by typing:',
                <strong>@outtracker start</strong>,
                <span>or get all options with <strong>@outtracker --help</strong></span>
            ]
        )
    }
}

export default HelloMessage