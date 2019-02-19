import MessageRelayer from "./MessageRelayer";
import { demoUserName } from "./OuttakerActionTypes";
import store from "./StoreSingleton";
import { resetStore } from "./OuttrackerActions";
import { MESSAGE_STATUS_CODES } from "./OuttrackerTypes";

describe('input delegator', () => {
    it('should put any non outtracker message into the history', () => {
        const nonCommandText = 'Hey there!'
        MessageRelayer.processMessage(nonCommandText, demoUserName )
        const mostRecentMessage = store.getState().messageHistory.last()
        expect(mostRecentMessage.text).toEqual(nonCommandText)
        expect(mostRecentMessage.messageStatusCode).toEqual(MESSAGE_STATUS_CODES.NEUTRAL)
        store.dispatch(resetStore())
    })
})