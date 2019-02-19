import React, { Component } from 'react'

class StartRecordMessage extends Component {
    render() {
        return (
            [
                <p>outtracker is now in record mode.</p>,
                <p>You can exit this mode by entering:</p>,
                <p><strong>@outtracker end_record</strong></p>,
            ]
        )
    }
}

export default StartRecordMessage
