import React from 'react'
import ReactDOMServer from 'react-dom/server'

import OuttrackerResponder from './OuttrackerResponder'
import BadCommandMessage from '../messages/BadCommandMessage'
import { MESSAGE_STATUS_CODES } from '../OuttrackerTypes'


class BadCommandResponder extends OuttrackerResponder {
    responseStatus = MESSAGE_STATUS_CODES.FAILURE

    // getCommand() {
    //     return '*'// doesn't do anything
    // }

    postMessage() {
        this.postFailureOuttrackerMessage(ReactDOMServer.renderToString(<BadCommandMessage />))
    }
}

export default BadCommandResponder
