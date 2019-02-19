import React from 'react'
import ReactDOMServer from 'react-dom/server';

import HelloMessage from './HelloMessage';
import store from './StoreSingleton';
import InputDelegator from './InputDelegator';
import { resetStore } from './OuttrackerActions';
import BadCommandMessage from './BadCommandMessage';
import { demoUserName, MESSAGE_STATUS_CODES } from './OuttakerActionTypes';


describe('outage tracker general', () => {
    it('respond to blank input with a helpful message', () => {
        InputDelegator.processInput('@outtracker', demoUserName )
        const helloMessage = ReactDOMServer.renderToString(<HelloMessage />)
        const mostRecentMessage = store.getState().messageHistory.last()
        expect(mostRecentMessage.text).toEqual(helloMessage)
        expect(mostRecentMessage.messageStatusCode).toEqual(MESSAGE_STATUS_CODES.SUCCESS)
        store.dispatch(resetStore())
    })

    it('should respond with an error message on bad command', () => {
        const badCommand = 'laskdjflkasjdf'
        InputDelegator.processInput(`@outtracker ${badCommand}`, demoUserName)
        const badCommandMessage = ReactDOMServer.renderToString(<BadCommandMessage />)
        const mostRecentMessage = store.getState().messageHistory.last()
        expect(mostRecentMessage.text).toEqual(badCommandMessage)
        expect(mostRecentMessage.messageStatusCode).toEqual(MESSAGE_STATUS_CODES.FAILURE)
        store.dispatch(resetStore())
    })

    it('should respond with an error message on bad command', () => {
        const badCommand = 'laskdjflkasjdf'
        InputDelegator.processInput(`@outtracker ${badCommand}`, demoUserName)
        const badCommandMessage = ReactDOMServer.renderToString(<BadCommandMessage />)
        const mostRecentMessage = store.getState().messageHistory.last()
        expect(mostRecentMessage.text).toEqual(badCommandMessage)
        expect(mostRecentMessage.messageStatusCode).toEqual(MESSAGE_STATUS_CODES.FAILURE)
        store.dispatch(resetStore())
    })

    // it('should respond with an error message on bad option', () => {
    //     sdfsdf()
    // })

})