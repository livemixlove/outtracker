import React from 'react'
import ReactDOMServer from 'react-dom/server';
import moment from 'moment'

import OuttrackerResponder from "./OuttrackerResponder";
import StartMessage from './StartMessage';
import { MESSAGE_STATUS_CODES, dateFormat } from './OuttrackerTypes';
import store from './StoreSingleton';
import { createOutage } from './OuttrackerActions';


class EndResponder extends OuttrackerResponder {
    responseStatus = MESSAGE_STATUS_CODES.SUCCESS
    getCommand(){
        return 'end'
    }

    postMessage() {
        // const outage = {
        //     startTime: moment().format(dateFormat),
        // }

        // store.dispatch(createOutage(outage))

        // this.postSuccessfulOuttrackerMessage(ReactDOMServer.renderToString(<StartMessage outage={outage}/>))
        // return MESSAGE_STATUS_CODES.SUCCESS
    }
}

export default EndResponder