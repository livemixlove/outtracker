import React, { Component } from 'react'
import { demoUserName } from './OuttakerActionTypes';

class OutageCreationSuccessMessage extends Component {
    render() {
        const { name, dateTime } = this.props.outage
        return (
            [
                <strong>Got it!</strong>,
                <span>{demoUserName} has reported a new outage</span>,
                <span>Outage name: {name}</span>,
                <span>Outage start time: {dateTime}</span>,
                <span>all commands will be for “{name}” outage until it is ended</span>,
            ]
        )
    }
}

export default OutageCreationSuccessMessage