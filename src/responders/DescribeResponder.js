import React from 'react'
import ReactDOMServer from 'react-dom/server';

import OuttrackerResponder from './OuttrackerResponder';
import { MESSAGE_STATUS_CODES } from '../OuttrackerTypes';
import store from '../StoreSingleton';
import { addDescibeToOutage } from '../OuttrackerActions';
import DescribeMessage from '../messages/DescribeMessage';


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
        
    }
}

export default DescribeResponder