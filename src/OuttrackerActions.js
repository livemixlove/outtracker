import OuttrackerTypes from './OuttrakerActionTypes'
import { demoUserName, outtrackerUserName } from './OuttrackerTypes'
import { MESSAGE_STATUS_CODES } from './OuttrackerTypes'
import store from './StoreSingleton'

export const resetStore = () => ({
    type: OuttrackerTypes.RESET_STORE,
})

export const postSuccessfulOuttrackerMessageFromOuttracker = message => (
    {
        type: OuttrackerTypes.ADD_MESSAGE_TO_CHAT_HISTORY,
        result: {
            message,
            user: outtrackerUserName,
            messageStatusCode: MESSAGE_STATUS_CODES.SUCCESS,
        },
    }
)

export const postFailureOuttrackerMessageFromOuttracker = message => (
    {
        type: OuttrackerTypes.ADD_MESSAGE_TO_CHAT_HISTORY,
        result: {
            message,
            user: outtrackerUserName,
            messageStatusCode: MESSAGE_STATUS_CODES.FAILURE,
        },
    }
)

export const postSuccessfulMessageFromUser = message => (
    {
        type: OuttrackerTypes.ADD_MESSAGE_TO_CHAT_HISTORY,
        result: {
            message,
            user: demoUserName,
            messageStatusCode: MESSAGE_STATUS_CODES.SUCCESS,
        },
    }
)

export const postFailureMessageFromUser = message => (
    {
        type: OuttrackerTypes.ADD_MESSAGE_TO_CHAT_HISTORY,
        result: {
            message,
            user: demoUserName,
            messageStatusCode: MESSAGE_STATUS_CODES.FAILURE,
        },
    }
)
export const createOutage = (outage) => {
    const state = store.getState()
    if (!state.currentOutageId) {
        return {
            type: OuttrackerTypes.CREATE_OUTAGE,
            result: { outage },
        }
    }
    return {}
}

export const endCurrentOutage = () => ({
    type: OuttrackerTypes.END_OUTAGE,
    result: { },
})

export const addDescibeToOutage = text => ({
    type: OuttrackerTypes.ADD_DESCIBE_TO_OUTAGE,
    result: { text },
})

export const recordInputToOutage = text => ({
    type: OuttrackerTypes.RECORD_INPUT_TO_OUTAGE,
    result: { text },
})

export const enterRecordMode = () => ({
    type: OuttrackerTypes.SET_IS_RECORDING_ALL_INPUTS,
    result: { isRecordingAllInputs: true },
})

export const exitRecordMode = () => ({
    type: OuttrackerTypes.SET_IS_RECORDING_ALL_INPUTS,
    result: { isRecordingAllInputs: false },
})
