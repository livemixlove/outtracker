import React, { Component } from 'react'

class CannotEndMessage extends Component {
    render() {
        return (
            [
                <p>You cannot end an outage, as there is no active outage.</p>,
            ]
        )
    }
}

export default CannotEndMessage
