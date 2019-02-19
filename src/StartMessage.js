import React, { Component } from 'react'

class StartMessage extends Component {
    render() {
        const { dateTime } = this.props.message
        return ([
            <p>Ok! outtracker is has started to track an outage.</p>,
            <p><strong>Start time:</strong>{dateTime}</p>
        ])
    }
}

export default StartMessage