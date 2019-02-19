import React from 'react'
import ReactDOMServer from 'react-dom/server';

import OuttrackerResponder from "./OuttrackerResponder";
import StartMessage from './StartMessage';
import { MESSAGE_STATUS_CODES } from './OuttrackerTypes';


class StartResponder extends OuttrackerResponder {
    responseStatus = MESSAGE_STATUS_CODES.SUCCESS
    getCommand(){
        return 'start'
    }

    postMessage() {

        // create outage with dateTime

        this.postSuccessfulOuttrackerMessage(ReactDOMServer.renderToString(<StartMessage />))
        return MESSAGE_STATUS_CODES.SUCCESS
    }
}

export default StartResponder