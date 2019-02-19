import React from 'react'
import ReactDOMServer from 'react-dom/server';

import OuttrackerResponder from "./OuttrackerResponder";
import { MESSAGE_STATUS_CODES } from './OuttrackerTypes';
import HelpMessage from './HelpMessage';


class HelpResponder extends OuttrackerResponder {
    responseStatus = MESSAGE_STATUS_CODES.SUCCESS

    getCommand(){
        return 'help'
    }

    postMessage() {
        this.postSuccessfulOuttrackerMessage(ReactDOMServer.renderToString(<HelpMessage />))
    }
}

export default HelpResponder