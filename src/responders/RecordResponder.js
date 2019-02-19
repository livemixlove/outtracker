import React from 'react'
import ReactDOMServer from 'react-dom/server';

import OuttrackerResponder from './OuttrackerResponder';
import { MESSAGE_STATUS_CODES } from '../OuttrackerTypes';
import store from '../StoreSingleton';
import { enterRecordMode } from '../OuttrackerActions';
import StartRecordMessage from '../messages/StartRecordMessage';


class RecordResponder extends OuttrackerResponder {
    responseStatus = MESSAGE_STATUS_CODES.SUCCESS
    
    getCommand(){
        return 'record'
    }

    performAction() {
        store.dispatch(enterRecordMode())
    }

    postMessage() {
        this.postSuccessfulOuttrackerMessage(ReactDOMServer.renderToString(<StartRecordMessage />))
        
    }
}

export default RecordResponder