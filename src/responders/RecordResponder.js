import React from 'react'
import ReactDOMServer from 'react-dom/server'

import OuttrackerResponder from './OuttrackerResponder'
import { MESSAGE_STATUS_CODES } from '../OuttrackerTypes'
import store from '../StoreSingleton'
import { enterRecordMode } from '../OuttrackerActions'
import StartRecordMessage from '../messages/StartRecordMessage'
import RecordSingleErrorMessage from '../messages/RecordSingleErrorMessage'


class RecordResponder extends OuttrackerResponder {
    responseStatus = MESSAGE_STATUS_CODES.SUCCESS

    canRecord = false

    getCommand() {
        return 'start_recording'
    }

    performAction() {
        this.outageId = store.getState().currentOutageId
        if (this.outageId) {
            this.canRecord = true
            store.dispatch(enterRecordMode())
        }
    }

    postMessage() {
        if (this.canRecord) {
            this.postSuccessfulOuttrackerMessage(ReactDOMServer.renderToString(<StartRecordMessage />))
        } else {
            this.postSuccessfulOuttrackerMessage(
                ReactDOMServer.renderToString(
                    <RecordSingleErrorMessage text={this.text} />,
                ),
            )
        }
        this.reset()
    }

    reset() {
        this.canRecord = false
    }
}

export default RecordResponder
