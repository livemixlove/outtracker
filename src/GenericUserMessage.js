import React from 'react'
import ReactDOMServer from 'react-dom/server';

import OuttrackerResponder from "./OuttrackerResponder";
import RequestNameMessage from './RequestNameMessage';
import store from './StoreSingleton';
import OuttrackerTypes, { MESSAGE_STATUS_CODES, demoUserName } from './OuttakerActionTypes';


class GenericUserMessage extends OuttrackerResponder {
    postMessage(message) {
        store.dispatch({
            type: OuttrackerTypes.ADD_MESSAGE_TO_CHAT_HISTORY,
            result: {
                message: message,
                user: demoUserName,
                messageStatusCode: MESSAGE_STATUS_CODES.NEUTRAL,
            }
        })
    }
}

export default GenericUserMessage