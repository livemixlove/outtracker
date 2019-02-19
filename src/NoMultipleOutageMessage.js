import React, { Component } from 'react'

class NoMultipleOutageMessage extends Component {
    render() {
        const { startTime } = this.props.outage
        return ([
            <p>Sorry, you are already tracking an outage. <br />
            You can only track one outage at a time!</p>,
        ])
    }
}

export default NoMultipleOutageMessage