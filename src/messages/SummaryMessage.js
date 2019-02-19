import React, { Component } from 'react'
import PropTypes from 'prop-types'

import store from '../StoreSingleton'
import { OUTAGE_RECORD_TYPES, demoUserName, OutageDescriptorPropTypes } from '../OuttrackerTypes'

class SummaryMessage extends Component {
    static propTypes = {
        outageId: PropTypes.number.isRequired,
    }

    getPropsWithoutReduxConnect() {
        const state = store.getState()
        const outage = state.outagesById.get(this.props.outageId)
        const outageDescriptorsImm = state.outageDescriptorListsByOutageId.get(this.props.outageId)
        const outageDescriptors = outageDescriptorsImm ? outageDescriptorsImm.toArray() : []
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
                    {outageDescriptors.map(outageDescriptor => (
                        <DescriptorItem
                            key={outageDescriptor.dateTime}
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
    return null
}

DescriptorItem.propTypes = {
    outageDescriptor: OutageDescriptorPropTypes.isRequired,
}


const RecordedInput = ({ outageDescriptor }) => (
    <div className='descriptor-item'>
        <p>
            <strong>Recorded input:</strong> <br />
            (user: {demoUserName}, {outageDescriptor.dateTime})<br />
            {outageDescriptor.text}
        </p>
    </div>
)
RecordedInput.propTypes = {
    outageDescriptor: OutageDescriptorPropTypes.isRequired,
}

const RecordedDescribe = ({ outageDescriptor }) => (
    <div className='descriptor-item'>
        <p>
            <strong>Recorded message:</strong> <br />
            (user: {demoUserName}, {outageDescriptor.dateTime}) <br />
            {outageDescriptor.text}
        </p>
    </div>
)
RecordedDescribe.propTypes = {
    outageDescriptor: OutageDescriptorPropTypes.isRequired,
}
