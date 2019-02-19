import React from 'react'
import ReactDOMServer from 'react-dom/server';
import moment from 'moment'

import OuttrackerResponder from "./OuttrackerResponder";
import StartMessage from './StartMessage';
import { MESSAGE_STATUS_CODES, dateFormat } from './OuttrackerTypes';
import store from './StoreSingleton';
import { createOutage, enterRecordMode } from './OuttrackerActions';
import StartRecordMessage from './StartRecordMessage';


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