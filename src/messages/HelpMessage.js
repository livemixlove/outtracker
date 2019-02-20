import React, { Component } from 'react'

const helpItems = [
    { command: 'start', description: 'starts tracking an outage' },
    { command: 'record "<message>"', description: 'records a message to an outage' },
    { command: 'start_recording', description: 'starts recording all input to an outage' },
    { command: 'end_recording', description: 'stops recording input to an outage' },
    { command: 'end', description: 'ends tracking an outage' },
]

class HelpMessage extends Component {
    render() {
        return (
            <div className='help-items-container'>
                {helpItems.map(item => <HelpItem key={item.command} {...item} />)}
            </div>
        )
    }
}

export default HelpMessage

const HelpItem = ({ command, description }) => (
    <div className='help-item'>
        <div className='help-item-command'>
            @outtracker {command}
        </div>
        <div className='help-item-description'>
            {description}
        </div>
    </div>
)
