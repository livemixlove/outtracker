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
    
    getCommand(){
        return 'record'
    }

    performAction() {
        store.dispatch(enterRecordMode())
    }

    postMessage() {
        this.postSuccessfulOuttrackerMessage(ReactDOMServer.renderToString(<StartRecordMessage />))
        return MESSAGE_STATUS_CODES.SUCCESS
    }
}

export default RecordResponder