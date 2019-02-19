import React from 'react'
import ReactDOMServer from 'react-dom/server';
import OuttrackerResponder from './OuttrackerResponder';
import { MESSAGE_STATUS_CODES } from '../OuttrackerTypes';
import store from '../StoreSingleton';
import { endCurrentOutage, exitRecordMode } from '../OuttrackerActions';
import EndMessage from '../messages/EndMessage';
import SummaryMessage from '../messages/SummaryMessage';
import CannotEndMessage from '../messages/CannotEndMessage';

class EndResponder extends OuttrackerResponder {
    responseStatus = MESSAGE_STATUS_CODES.SUCCESS
    canEnd = false

    getCommand(){
        return 'end'
    }

    performAction() {
        this.outageId = store.getState().currentOutageId
        if(this.outageId){
            this.canEnd = true
            store.dispatch(exitRecordMode())
            store.dispatch(endCurrentOutage())
        } else {
            this.canEnd = false
        }
    }

    postMessage() {
        if(this.canEnd) {
            this.postSuccessfulOuttrackerMessage(ReactDOMServer.renderToString(<EndMessage outageId={this.outageId}/>))
            this.postSuccessfulOuttrackerMessage(ReactDOMServer.renderToString(<SummaryMessage outageId={this.outageId}/>))
        } else {
            this.postSuccessfulOuttrackerMessage(ReactDOMServer.renderToString(<CannotEndMessage outageId={this.outageId}/>))
        }
    }
    reset() {
        this.canEnd = false
    }
}

export default EndResponder