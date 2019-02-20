import React, { Component } from 'react'
import PropTypes from 'prop-types'

class RecordSingleMessage extends Component {
    render() {
        const { text } = this.props
        return ([
            <p>Message saved to current outage:</p>,
            <p><strong>Message: </strong>{text}</p>,
        ])
    }
}

RecordSingleMessage.propTypes = {
    text: PropTypes.string.isRequired,
}

export default RecordSingleMessage
