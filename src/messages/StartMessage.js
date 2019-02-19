import React, { Component } from 'react'

class StartMessage extends Component {
    render() {
        const { startTime } = this.props.outage
        return ([
            <p>Ok! outtracker is tracking a new outage.</p>,
            <p><strong>Start time: </strong>{startTime}</p>
        ])
    }
}

export default StartMessage