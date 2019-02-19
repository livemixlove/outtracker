import React, { Component } from 'react'

class DescribeMessage extends Component {
    render() {
        const { text } = this.props
        return ([
            <p>Message saved to current outage:</p>,
            <p><strong>Message: </strong>{text}</p>
        ])
    }
}

export default DescribeMessage