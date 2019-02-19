import React, { Component } from 'react'

class RequestNameMessage extends Component {
    render() {
        return ([
            'Oh no!  There’s an outage!  Let’s keep track of it.',
            <strong>What is a good name for this outage?</strong>
        ])
    }
}

export default RequestNameMessage