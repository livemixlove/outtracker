import React from 'react'
import ReactDOMServer from 'react-dom/server';
import moment from 'moment'

import OuttrackerResponder from "./OuttrackerResponder";
import StartMessage from './StartMessage';
import { MESSAGE_STATUS_CODES, dateFormat } from './OuttrackerTypes';
import store from './StoreSingleton';
import { createOutage, enterRecordMode, exitRecordMode } from './OuttrackerActions';
import EndRecordMessage from './EndRecordMessage';


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
        return MESSAGE_STATUS_CODES.SUCCESS
    }
}

export default EndRecordResponder