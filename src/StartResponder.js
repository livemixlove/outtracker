import React from 'react'
import ReactDOMServer from 'react-dom/server';

import OuttrackerResponder from "./OuttrackerResponder";
import RequestNameMessage from './RequestNameMessage';


class StartResponder extends OuttrackerResponder {
    getCommand(){
        return 'start'
    }

    postMessage() {
        this.postSuccessfulOuttrackerMessage(ReactDOMServer.renderToString(<RequestNameMessage />))
    }
}

export default StartResponder