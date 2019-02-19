import React from 'react'
import ReactDOMServer from 'react-dom/server';
import moment from 'moment'

import OuttrackerResponder from "./OuttrackerResponder";
import StartMessage from './StartMessage';
import { MESSAGE_STATUS_CODES, dateFormat } from './OuttrackerTypes';
import store from './StoreSingleton';
import { createOutage } from './OuttrackerActions';


class StartResponder extends OuttrackerResponder {
    responseStatus = MESSAGE_STATUS_CODES.SUCCESS
    getCommand(){
        return 'start'
    }

    performAction(){
        this.outage = {
            startTime: moment().format(dateFormat),
        }

        store.dispatch(createOutage(this.outage))
    }

    postMessage() {
        this.postSuccessfulOuttrackerMessage(ReactDOMServer.renderToString(<StartMessage outage={this.outage}/>))
        this.reset()
        return MESSAGE_STATUS_CODES.SUCCESS
    }

    reset(){
        this.outage = null
    }
}

export default StartResponder