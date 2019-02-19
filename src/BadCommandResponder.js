import React from 'react'
import ReactDOMServer from 'react-dom/server';

import OuttrackerResponder from "./OuttrackerResponder";
import RequestNameMessage from './RequestNameMessage';
import BadCommandMessage from './BadCommandMessage';


class BadCommandResponder extends OuttrackerResponder {
    getCommand(){
        return '*'
    }

    postMessage() {
        this.postFailureOuttrackerMessage(ReactDOMServer.renderToString(<BadCommandMessage />))
    }
}

export default BadCommandResponder