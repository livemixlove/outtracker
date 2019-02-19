import Immutable from 'immutable'
import moment from 'moment'

import OuttrackerActionTypes from "./OuttrakerActionTypes";
import { OuttrackerStateRecord, ChatMessageRecord, dateFormat, OutageRecord, OutageRecordedInput, OutageDescriptor } from './OuttrackerTypes';
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
    const { outage } = action.result
    const newOutageId = state.outagesById.count() + 1
    state = state.setIn(['outagesById', newOutageId], new OutageRecord(outage))
    state = state.set('currentOutageId', newOutageId)
    return state
}

const END_OUTAGE = (state, action) => {
    const currentOutageId = state.currentOutageId
    const endTime = moment().format(dateFormat)
    state = state.setIn(['outagesById', currentOutageId, 'endTime'], endTime)
    state = state.set('currentOutageId', null)
    return state
}

const SET_IS_RECORDING_ALL_INPUTS = (state,action) => {
    const { isRecordingAllInputs } = action.result
    state = state.set('isRecordingAllInputs', isRecordingAllInputs)
    return state
}

const ADD_DESCIBE_TO_OUTAGE = (state, action) => {
    return addOutageDescriptorOfType(state, action, OutageDescriptor)
}

const RECORD_INPUT_TO_OUTAGE = (state,action) => {
    return addOutageDescriptorOfType(state, action, OutageRecordedInput)
}

const addOutageDescriptorOfType = (state, action, DesciptorType) => {
    const { text } = action.result
    const currentOutageId = state.currentOutageId
    state = state.update(
        'outageDescriptorListsByOutageId', 
        descriptors => {
            if(!descriptors.has(state.currentOutageId)){
                descriptors = descriptors.set(
                    currentOutageId, 
                    new Immutable.List()
                )
            }
            descriptors = descriptors.update(currentOutageId, list => 
                list.push(new DesciptorType({
                    outageId: currentOutageId,
                    dateTime: moment().format(dateFormat),
                    text,
                })))
            return descriptors
    })
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
    currentOutageId: null,
})

const handlers = {
    [OuttrackerActionTypes.ADD_MESSAGE_TO_CHAT_HISTORY]: ADD_MESSAGE_TO_CHAT_HISTORY,
    [OuttrackerActionTypes.RESET_STORE]: RESET_STORE,
    [OuttrackerActionTypes.SET_IS_RECORDING_ALL_INPUTS]: SET_IS_RECORDING_ALL_INPUTS,
    [OuttrackerActionTypes.RECORD_INPUT_TO_OUTAGE]: RECORD_INPUT_TO_OUTAGE,
    [OuttrackerActionTypes.CREATE_OUTAGE]: CREATE_OUTAGE,
    [OuttrackerActionTypes.END_OUTAGE]: END_OUTAGE,
    [OuttrackerActionTypes.ADD_DESCIBE_TO_OUTAGE]: ADD_DESCIBE_TO_OUTAGE,
}

const reducer = createReducer(initialState, handlers)

export default reducer