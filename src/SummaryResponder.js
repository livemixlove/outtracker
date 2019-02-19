import React from 'react'
import ReactDOMServer from 'react-dom/server';
import OuttrackerResponder from "./OuttrackerResponder";
import { MESSAGE_STATUS_CODES } from './OuttrackerTypes';
import store from './StoreSingleton';
import { endCurrentOutage, exitRecordMode } from './OuttrackerActions';
import EndMessage from './EndMessage';
import SummaryMessage from './SummaryMessage';


class EndResponder extends OuttrackerResponder {
    
    getCommand(){
        return 'end'
    }

    performAction() {
        this.outageId = store.getState().currentOutageId
        store.dispatch(exitRecordMode())
        store.dispatch(endCurrentOutage())
    }

    postMessage() {
        this.postSuccessfulOuttrackerMessage(ReactDOMServer.renderToString(<EndMessage outageId={this.outageId}/>))
        this.postSuccessfulOuttrackerMessage(ReactDOMServer.renderToString(<SummaryMessage outageId={this.outageId}/>))
        return MESSAGE_STATUS_CODES.SUCCESS
    }
}

export default EndResponder