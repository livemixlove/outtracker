import Immutable from 'immutable'
import moment from 'moment'

import OuttrackerActionTypes from "./OuttakerActionTypes";
import { OuttrackerStateRecord, ChatMessageRecord, dateFormat } from './OuttrackerTypes';
import createReducer from './util/CreateReducer';

const ADD_MESSAGE_TO_CHAT_HISTORY = (state,action) => {
    const { message, user, messageStatusCode } = action.result
        const newMessage = new ChatMessageRecord({
            text: message,
            user,
            dateTime: moment().format(dateFormat),
            messageStatusCode,
        })
        state = state.update('messageHistory', messageHistory => messageHistory.push(newMessage))
    return state
}

const CREATE_OUTAGE = (state,action) => {
    return state
}

const ADD_DESCIBE_TO_OUTAGE = (state,action) => {
    return state
}

const SET_IS_RECORDING_ALL_INPUTS = (state,action) => {
    return state
}

const RECORD_INPUT_TO_OUTAGE = (state,action) => {
    return state
}

const RESET_STORE = (state,action) => {
    return state
}

const initialState = OuttrackerStateRecord({
    messageHistory: new Immutable.List(),
    outagesById: new Immutable.Map(),
    outageDescriptorListsByOutageId: new Immutable.Map(),
    isRecordingAllInputs: false,
})

const handlers = {
    [OuttrackerActionTypes.ADD_MESSAGE_TO_CHAT_HISTORY]: ADD_MESSAGE_TO_CHAT_HISTORY,
    [OuttrackerActionTypes.RESET_STORE]: RESET_STORE,
    [OuttrackerActionTypes.SET_IS_RECORDING_ALL_INPUTS]: SET_IS_RECORDING_ALL_INPUTS,
    [OuttrackerActionTypes.RECORD_INPUT_TO_OUTAGE]: RECORD_INPUT_TO_OUTAGE,
    [OuttrackerActionTypes.CREATE_OUTAGE]: CREATE_OUTAGE,
    [OuttrackerActionTypes.ADD_DESCIBE_TO_OUTAGE]: ADD_DESCIBE_TO_OUTAGE,
}

const reducer = createReducer(initialState, handlers)

export default reducer