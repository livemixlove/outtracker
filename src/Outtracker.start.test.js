import React from 'react'
import ReactDOMServer from 'react-dom/server';
import moment from 'moment'


import StartMessage from "./StartMessage";
import InputDelegator from "./InputDelegator";
import store from './StoreSingleton';
import { resetStore } from './OuttrackerActions';
import { demoUserName } from './OuttakerActionTypes';
import OutageCreationSuccessMessage from './OutageCreationSuccessMessage';
import { MESSAGE_STATUS_CODES, dateFormat } from './OuttrackerTypes';

describe('outage tracker start outage', () => {
    it('should ask for an outage name after prompting to start an outage', () => {
        store.dispatch(resetStore())
        InputDelegator.processInput('@outtracker start', demoUserName )
        const message = {
            dateTime: moment().format(dateFormat)
        }
        const StartMessage = ReactDOMServer.renderToString(<StartMessage message={message} />)
        const mostRecentMessage = store.getState().messageHistory.last()
        expect(mostRecentMessage.text).toEqual(StartMessage)
        expect(mostRecentMessage.messageStatusCode).toEqual(MESSAGE_STATUS_CODES.SUCCESS)
    })
})