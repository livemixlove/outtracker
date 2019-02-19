import OuttrackerTypes, { MESSAGE_STATUS_CODES } from "./OuttakerActionTypes";

export const resetStore = ( ) => {
    return {
            type: OuttrackerTypes.RESET_STORE,
        }
}

export const postSuccessfulMessageFromOuttracker = (message) => (
    {
        type: OuttrackerTypes.ADD_MESSAGE_TO_CHAT_HISTORY,
        result: {
            message,
            user: 'outtracker',
            messageStatusCode: MESSAGE_STATUS_CODES.SUCCESS
        }
    }
)

export const postFailureMessageFromOuttracker = (message) => (
    {
        type: OuttrackerTypes.ADD_MESSAGE_TO_CHAT_HISTORY,
        result: {
            message,
            user: 'outtracker',
            messageStatusCode: MESSAGE_STATUS_CODES.FAILURE
        }
    }
)