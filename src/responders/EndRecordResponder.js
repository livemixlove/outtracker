import React from 'react'
import ReactDOMServer from 'react-dom/server';

import OuttrackerResponder from './OuttrackerResponder';
import { MESSAGE_STATUS_CODES } from '../OuttrackerTypes';
import store from '../StoreSingleton';
import { exitRecordMode } from '../OuttrackerActions';
import EndRecordMessage from '../messages/EndRecordMessage';


class EndRecordResponder extends OuttrackerResponder {
    responseStatus = MESSAGE_STATUS_CODES.SUCCESS

    getCommand(){
        return 'end_record'
    }

    performAction() {
        store.dispatch(exitRecordMode())
    }

    postMessage() {
        this.postSuccessfulOuttrackerMessage(ReactDOMServer.renderToString(<EndRecordMessage />))
        
    }
}

export default EndRecordResponder