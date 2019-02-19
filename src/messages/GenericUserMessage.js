// import OuttrackerResponder from '../responders/OuttrackerResponder';
import store from '../StoreSingleton';
import OuttrackerTypes from '../OuttrakerActionTypes';
import { MESSAGE_STATUS_CODES, demoUserName } from '../OuttrackerTypes';


// class GenericUserMessage extends OuttrackerResponder {
class GenericUserMessage  {
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