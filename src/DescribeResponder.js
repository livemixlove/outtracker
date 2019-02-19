import React from 'react'
import ReactDOMServer from 'react-dom/server';
import moment from 'moment'

import OuttrackerResponder from "./OuttrackerResponder";
import StartMessage from './StartMessage';
import { MESSAGE_STATUS_CODES, dateFormat } from './OuttrackerTypes';
import store from './StoreSingleton';
import { createOutage, addDescibeToOutage } from './OuttrackerActions';
import DescribeMessage from './DescribeMessage';


class DescribeResponder extends OuttrackerResponder {
    responseStatus = MESSAGE_STATUS_CODES.SUCCESS
    getCommand(){
        return 'describe'
    }

    getArgs(){
        return '<describeText>'
    }

    performAction(describeText){
        this.text = describeText
        store.dispatch(addDescibeToOutage(describeText))
    }

    postMessage() {

        this.postSuccessfulOuttrackerMessage(ReactDOMServer.renderToString(<DescribeMessage text={this.text}/>))
        return MESSAGE_STATUS_CODES.SUCCESS
    }
}

export default DescribeResponder