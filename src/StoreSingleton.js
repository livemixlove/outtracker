import { createStore } from 'redux'
import moment from 'moment'
import Immutable from 'immutable'
import OuttrackerTypes, { MESSAGE_STATUS_CODES } from './OuttakerActionTypes';



const OuttrackerStateRecord = Immutable.Record({
    messageHistory: Immutable.List()
})

const ChatMessageRecord = Immutable.Record({
    text: Immutable.List(),
    dateTime: null,
    user: null,
    messageStatusCode: MESSAGE_STATUS_CODES.NEUTRAL,
})

const initialState = OuttrackerStateRecord({
    messageHistory: new Immutable.List()
})

const reducer = (state = initialState, action) => {
    if(action.type === OuttrackerTypes.ADD_MESSAGE_TO_CHAT_HISTORY){
        const { message, user, messageStatusCode } = action.result
        const newMessage = new ChatMessageRecord({
            text: message,
            user,
            dateTime: moment().format('LLLL'),
            messageStatusCode,
        })
        state = state.update('messageHistory', messageHistory => messageHistory.push(newMessage))
    }
    if(action.type === OuttrackerTypes.RESET_STORE){
       state = initialState
    }
    return state
}

const store = createStore(reducer)
export default store