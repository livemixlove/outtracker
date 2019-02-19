import React from 'react'
import ReactDOMServer from 'react-dom/server';
import moment from 'moment'

import OuttrackerResponder from "./OuttrackerResponder";
import StartMessage from './StartMessage';
import { MESSAGE_STATUS_CODES, dateFormat } from './OuttrackerTypes';
import store from './StoreSingleton';
import { createOutage } from './OuttrackerActions';
import NoMultipleOutageMessage from './NoMultipleOutageMessage';


class StartResponder extends OuttrackerResponder {
    responseStatus = MESSAGE_STATUS_CODES.SUCCESS
    outage = null
    noMultipleWarning = false
    getCommand(){
        return 'start'
    }

    performAction(){
        this.outage = {
            startTime: moment().format(dateFormat),
        }

        if(store.getState().currentOutageId){
            this.noMultipleWarning = true
        } else {
            store.dispatch(createOutage(this.outage))
        }
    }

    postMessage() {
        if(this.noMultipleWarning){
            this.postSuccessfulOuttrackerMessage(ReactDOMServer.renderToString(<NoMultipleOutageMessage outage={this.outage}/>))
            this.reset()
            this.responseStatus = MESSAGE_STATUS_CODES.FAILURE
        } else {
            this.postSuccessfulOuttrackerMessage(ReactDOMServer.renderToString(<StartMessage outage={this.outage}/>))
            this.reset()
            
        }
    }

    reset(){
        this.outage = null
        this.noMultipleWarning = false
    }
}

export default StartResponder