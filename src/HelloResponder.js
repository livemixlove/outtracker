import React from 'react'
import ReactDOMServer from 'react-dom/server';

import OuttrackerResponder from "./OuttrackerResponder";
import HelloMessage from "./HelloMessage";


class HelloResponder extends OuttrackerResponder {
    getCommand(){
        return ''
    }

    postMessage() {
        this.postSuccessfulOuttrackerMessage(ReactDOMServer.renderToString(<HelloMessage />))
    }
}

export default HelloResponder