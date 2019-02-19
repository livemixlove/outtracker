import React, { Component } from 'react'
import store from './StoreSingleton';
import { OUTAGE_RECORD_TYPES } from './OuttrackerTypes';
import { demoUserName } from './OuttakerActionTypes';

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
        return (
            [
                <p><strong>Outage Summary:</strong></p>,
                <p><strong>Start Time:</strong> {startTime}</p>,
                <p><strong>End Time:</strong> {endTime}</p>,
                <span>
                    {outageDescriptors.map(outageDescriptor => 
                        <DescriptorItem outageDescriptor={outageDescriptor} />
                    )}
                </span>
            ]
        )
    }
}

export default SummaryMessage


const DescriptorItem = ({outageDescriptor}) => {
    if(outageDescriptor.type === OUTAGE_RECORD_TYPES.RECORDED_INPUT){
        return <RecordedInput outageDescriptor={outageDescriptor} />
    } else if (outageDescriptor.type === OUTAGE_RECORD_TYPES.DESCRIBE) {
        return <RecordedDescribe outageDescriptor={outageDescriptor} />
    }
}

const RecordedInput = ({outageDescriptor}) => (
    <div className="descriptor-item">
        <p>
            <strong>Recorded keystrokes:</strong> 
            (user: {demoUserName}, {outageDescriptor.dateTime}) 
            &nbsp; {outageDescriptor.text}
        </p>
    </div>
)

const RecordedDescribe = ({outageDescriptor}) => (
<div className="descriptor-item">
        <p>
            <strong>Recorded message:</strong> 
            (user: {demoUserName}, {outageDescriptor.dateTime}) 
            &nbsp; {outageDescriptor.text}
        </p>
    </div>
)