import React from 'react'
import moment from 'moment'
import ReactDOMServer from 'react-dom/server';

import HelloMessage from './HelloMessage';
import store from './StoreSingleton';
import MessageRelayer from './MessageRelayer';
import { resetStore } from './OuttrackerActions';
import BadCommandMessage from './BadCommandMessage';
import { demoUserName } from './OuttakerActionTypes';
import { MESSAGE_STATUS_CODES, dateFormat } from './OuttrackerTypes';
import StartMessage from './StartMessage';
import DescribeMessage from './DescribeMessage';
import StartRecordMessage from './StartRecordMessage';
import EndRecordMessage from './EndRecordMessage';
import EndMessage from './EndMessage';
import SummaryMessage from './SummaryMessage';


describe('outage tracker', () => {
    it('respond to blank input with a helpful message', () => {
        MessageRelayer.processMessage('@outtracker', demoUserName )
        const helloMessage = ReactDOMServer.renderToString(<HelloMessage />)
        const mostRecentMessage = store.getState().messageHistory.last()
        expect(mostRecentMessage.text).toEqual(helloMessage)
        expect(mostRecentMessage.messageStatusCode).toEqual(MESSAGE_STATUS_CODES.SUCCESS)
        store.dispatch(resetStore())
    })

    it('should respond with an error message on bad command', () => {
        const badCommand = 'laskdjflkasjdf'
        MessageRelayer.processMessage(`@outtracker ${badCommand}`, demoUserName)
        const badCommandMessage = ReactDOMServer.renderToString(<BadCommandMessage />)
        const mostRecentMessage = store.getState().messageHistory.last()
        expect(mostRecentMessage.text).toEqual(badCommandMessage)
        expect(mostRecentMessage.messageStatusCode).toEqual(MESSAGE_STATUS_CODES.FAILURE)
        store.dispatch(resetStore())
    })

    it('should start tracking an outage', () => {
        store.dispatch(resetStore())
        MessageRelayer.processMessage('@outtracker start', demoUserName )
        const outage = {
            startTime: moment().format(dateFormat)
        }
        const startMessage = ReactDOMServer.renderToString(<StartMessage outage={outage} />)
        const mostRecentMessage = store.getState().messageHistory.last()
        expect(mostRecentMessage.text).toEqual(startMessage)
        expect(mostRecentMessage.messageStatusCode).toEqual(MESSAGE_STATUS_CODES.SUCCESS)
    })

    it('should describe an outage with a message', () => {
        const message = 'this is a message'
        MessageRelayer.processMessage(`@outtracker describe "${message}"`, demoUserName )
        const describeMessage = ReactDOMServer.renderToString(<DescribeMessage text={message} />)
        const mostRecentMessage = store.getState().messageHistory.last()
        expect(mostRecentMessage.text).toEqual(describeMessage)
        expect(mostRecentMessage.messageStatusCode).toEqual(MESSAGE_STATUS_CODES.SUCCESS)
    })

    it('should start recording all submited inputs', () => {
        MessageRelayer.processMessage(`@outtracker record`, demoUserName )
        const recordMessage = ReactDOMServer.renderToString(<StartRecordMessage />)
        const mostRecentMessage = store.getState().messageHistory.last()
        expect(mostRecentMessage.text).toEqual(recordMessage)
        expect(mostRecentMessage.messageStatusCode).toEqual(MESSAGE_STATUS_CODES.SUCCESS)
    })

    let currentOutageId
    it('should record a submited message while recording', () => {
        const message = 'this is a recorded input message'
        MessageRelayer.processMessage(message, demoUserName )
        const state = store.getState()
        currentOutageId = state.currentOutageId
        const mostRecentRecordedDescriptor = state.outageDescriptorListsByOutageId.get(currentOutageId).last()
        expect(mostRecentRecordedDescriptor.text).toEqual(message)
    })

    it('should end recording inputs', () => {
        MessageRelayer.processMessage(`@outtracker end_record`, demoUserName )
        const endRecordMessage = ReactDOMServer.renderToString(<EndRecordMessage />)
        const mostRecentMessage = store.getState().messageHistory.last()
        expect(mostRecentMessage.text).toEqual(endRecordMessage)
        expect(mostRecentMessage.messageStatusCode).toEqual(MESSAGE_STATUS_CODES.SUCCESS)
    })

    it('should end tracking an outage', () => {
        MessageRelayer.processMessage(`@outtracker end`, demoUserName )
        const endMessage = ReactDOMServer.renderToString(<EndMessage />)
        const numberOfChatMessages = store.getState().messageHistory.count()
        const secondToLastMessage = store.getState().messageHistory.get(numberOfChatMessages - 2)
        expect(secondToLastMessage.text).toEqual(endMessage)
        expect(secondToLastMessage.messageStatusCode).toEqual(MESSAGE_STATUS_CODES.SUCCESS)
    })

    it('should show a summary of the outage', () => {
        const endMessage = ReactDOMServer.renderToString(<SummaryMessage outageId={currentOutageId} />)
        const mostRecentMessage = store.getState().messageHistory.last()
        expect(mostRecentMessage.text).toEqual(endMessage)
        expect(mostRecentMessage.messageStatusCode).toEqual(MESSAGE_STATUS_CODES.SUCCESS)
    })

})