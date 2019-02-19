import React from 'react'
import ReactDOMServer from 'react-dom/server'

import OuttrackerResponder from './OuttrackerResponder'
import { MESSAGE_STATUS_CODES } from '../OuttrackerTypes'
import store from '../StoreSingleton'
import { addDescibeToOutage } from '../OuttrackerActions'
import RecordSingleMessage from '../messages/RecordSingleMessage'
import RecordSingleErrorMessage from '../messages/RecordSingleErrorMessage'


class RecordSingleResponder extends OuttrackerResponder {
    responseStatus = MESSAGE_STATUS_CODES.SUCCESS

    canSave = false

    getCommand() {
        return 'record'
    }

    getArgs() {
        return '<text>'
    }

    performAction(text) {
        this.outageId = store.getState().currentOutageId
        if (this.outageId) {
            this.text = text
            this.canSave = true
            store.dispatch(addDescibeToOutage(text))
        }
    }

    postMessage() {
        if (this.canSave) {
            this.postSuccessfulOuttrackerMessage(ReactDOMServer.renderToString(<RecordSingleMessage text={this.text} />))
        } else {
            this.postSuccessfulOuttrackerMessage(ReactDOMServer.renderToString(<RecordSingleErrorMessage text={this.text} />))
        }
    }
}

export default RecordSingleResponder
