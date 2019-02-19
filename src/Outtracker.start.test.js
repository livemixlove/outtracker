import React from 'react'
import ReactDOMServer from 'react-dom/server';
import moment from 'moment'


import RequestNameMessage from "./RequestNameMessage";
import InputDelegator from "./InputDelegator";
import store from './StoreSingleton';
import { resetStore } from './OuttrackerActions';
import { demoUserName, MESSAGE_STATUS_CODES } from './OuttakerActionTypes';
import OutageCreationSuccessMessage from './OutageCreationSuccessMessage';

describe('outage tracker start outage', () => {
    const inputDelegator = new InputDelegator()
    it('should ask for an outage name after prompting to start an outage', () => {
        store.dispatch(resetStore())
        inputDelegator.processInput('@outtracker start', demoUserName )
        const requestNameMessage = ReactDOMServer.renderToString(<RequestNameMessage />)
        const mostRecentMessage = store.getState().messageHistory.last()
        expect(mostRecentMessage.text).toEqual(requestNameMessage)
        expect(mostRecentMessage.messageStatusCode).toEqual(MESSAGE_STATUS_CODES.SUCCESS)
    })

    it('should accept a name for the outage and provide a start summary', () => {
        const outage = {
            name: 'the great outage',
            dateTime: moment().format('LLLL')
        }
        inputDelegator.processInput(outage.name)
        const creationMessage = ReactDOMServer.renderToString(<OutageCreationSuccessMessage outage={outage} />)
        const mostRecentMessage = store.getState().messageHistory.last()
        expect(mostRecentMessage.text).toEqual(creationMessage)
    })

    // it('should cancel start action on word cancel', () => {
    //     sdfsdf()
    // })

    // it('should give an error when starting a second outage while one is still active', () => {
    //     sdfsdf()
    // })
})