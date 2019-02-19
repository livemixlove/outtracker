import React, { Component } from 'react'

class RequestNameMessage extends Component {
    render() {
        return ([
            <p>Oh no!  There’s an outage!  Let’s keep track of it.</p>,
            <p><strong>What is a good name for this outage?</strong></p>
        ])
    }
}

export default RequestNameMessage