import OuttrackerResponder from "./OuttrackerResponder";
import store from './StoreSingleton';
import OuttrackerTypes, { demoUserName } from './OuttakerActionTypes';
import { MESSAGE_STATUS_CODES } from './OuttrackerTypes';


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

    postMessageWithStatus(message, status) {
        store.dispatch({
            type: OuttrackerTypes.ADD_MESSAGE_TO_CHAT_HISTORY,
            result: {
                message: message,
                user: demoUserName,
                messageStatusCode: status,
            }
        })
    }

}

export default GenericUserMessage