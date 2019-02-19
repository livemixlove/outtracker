import React from 'react'
import ReactDOMServer from 'react-dom/server'
import OuttrackerResponder from './OuttrackerResponder'
import { MESSAGE_STATUS_CODES } from '../OuttrackerTypes'
import store from '../StoreSingleton'
import { endCurrentOutage, exitRecordMode } from '../OuttrackerActions'
import EndMessage from '../messages/EndMessage'
import SummaryMessage from '../messages/SummaryMessage'


class EndResponder extends OuttrackerResponder {
    responseStatus = MESSAGE_STATUS_CODES.SUCCESS

    getCommand() {
        return 'end'
    }

    performAction() {
        this.outageId = store.getState().currentOutageId
        store.dispatch(exitRecordMode())
        store.dispatch(endCurrentOutage())
    }

    postMessage() {
        this.postSuccessfulOuttrackerMessage(ReactDOMServer.renderToString(<EndMessage outageId={this.outageId} />))
        this.postSuccessfulOuttrackerMessage(ReactDOMServer.renderToString(<SummaryMessage outageId={this.outageId} />))
    }
}

export default EndResponder
