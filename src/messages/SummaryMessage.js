import React, { Component } from 'react'
import store from '../StoreSingleton'
import { OUTAGE_RECORD_TYPES, demoUserName } from '../OuttrackerTypes'

class SummaryMessage extends Component {
    getPropsWithoutReduxConnect() {
        const state = store.getState()
        const outage = state.outagesById.get(this.props.outageId)
        const outageDescriptors = state.outageDescriptorListsByOutageId.get(this.props.outageId).toArray()
        return {
            startTime: outage.startTime,
            endTime: outage.endTime,
            outageDescriptors,
        }
    }

    render() {
        const {
            startTime,
            endTime,
            outageDescriptors,
        } = this.getPropsWithoutReduxConnect()

        const { outageId } = this.props
        return (
            <span className='summary-wrapper'>
                <p>
                    <span className='summary-title'><strong>Outage Summary</strong></span>
                    <strong>Start Time:</strong> {startTime}<br />
                    <strong>End Time:</strong> {endTime}<br />
                    <strong>Outage Id:</strong> {outageId}<br />
                </p>
                <hr />
                <span>
                    {outageDescriptors.map((outageDescriptor, ind) => (
                        <DescriptorItem
                            key={ind}
                            outageDescriptor={outageDescriptor}
                        />
                    ))}
                </span>
            </span>
        )
    }
}

export default SummaryMessage


const DescriptorItem = ({ outageDescriptor }) => {
    if (outageDescriptor.type === OUTAGE_RECORD_TYPES.RECORDED_INPUT) {
        return <RecordedInput outageDescriptor={outageDescriptor} />
    } if (outageDescriptor.type === OUTAGE_RECORD_TYPES.DESCRIBE) {
        return <RecordedDescribe outageDescriptor={outageDescriptor} />
    }
}

const RecordedInput = ({ outageDescriptor }) => (
    <div className='descriptor-item'>
        <p>
            <strong>Recorded keystrokes:</strong> <br />
            (user: {demoUserName}, {outageDescriptor.dateTime})<br />
            {outageDescriptor.text}
        </p>
    </div>
)

const RecordedDescribe = ({ outageDescriptor }) => (
    <div className='descriptor-item'>
        <p>
            <strong>Recorded message:</strong> <br />
            (user: {demoUserName}, {outageDescriptor.dateTime}) <br />
            {outageDescriptor.text}
        </p>
    </div>
)
