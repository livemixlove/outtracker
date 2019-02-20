import React, { Component } from 'react'
import PropTypes from 'prop-types'

class StartMessage extends Component {
    render() {
        const { startTime } = this.props.outage
        return ([
            <p>Ok! outtracker is tracking a new outage.</p>,
            <p><strong>Start time: </strong>{startTime}</p>,
        ])
    }
}

StartMessage.propTypes = {
    outage: PropTypes.shape({
        startTime: PropTypes.string.isRequired,
    }).isRequired,
}


export default StartMessage
