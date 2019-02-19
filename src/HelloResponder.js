import React from 'react'
import ReactDOMServer from 'react-dom/server';

import OuttrackerResponder from "./OuttrackerResponder";
import HelloMessage from "./HelloMessage";
import { MESSAGE_STATUS_CODES } from './OuttrackerTypes';


class HelloResponder extends OuttrackerResponder {
    responseStatus = MESSAGE_STATUS_CODES.SUCCESS

    getCommand(){
        return ''
    }

    postMessage() {
        this.postSuccessfulOuttrackerMessage(ReactDOMServer.renderToString(<HelloMessage />))
        return MESSAGE_STATUS_CODES.SUCCESS
    }
}

export default HelloResponder