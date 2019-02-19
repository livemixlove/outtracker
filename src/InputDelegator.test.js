import InputDelegator from "./InputDelegator";
import { MESSAGE_STATUS_CODES, demoUserName } from "./OuttakerActionTypes";
import store from "./StoreSingleton";
import { resetStore } from "./OuttrackerActions";

describe('input delegator', () => {
    it('should put any non outtracker message into the history', () => {
        const nonCommandText = 'Hey there!'
        InputDelegator.processInput(nonCommandText, demoUserName )
        const mostRecentMessage = store.getState().messageHistory.last()
        expect(mostRecentMessage.text).toEqual(nonCommandText)
        expect(mostRecentMessage.messageStatusCode).toEqual(MESSAGE_STATUS_CODES.NEUTRAL)
        store.dispatch(resetStore())
    })
})