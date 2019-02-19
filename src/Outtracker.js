import HelloResponder from './HelloResponder';
import StartResponder from './StartResponder';
import BadCommandResponder from './BadCommandResponder';
import { MESSAGE_STATUS_CODES } from './OuttrackerTypes';
import store from './StoreSingleton';
import DescribeResponder from './DescribeResponder';
import RecordResponder from './RecordResponder';
import EndResponder from './EndResponder';
import EndRecordResponder from './EndRecordResponder';
import { recordInputToOutage } from './OuttrackerActions';


class _Outtracker {
    responders = []
    currentResponder = null
    badCommandResponder = new BadCommandResponder()

    constructor(responders){
        this.responders = responders
    }

    takeInputText(input) {
        this.cleanInput = input.trim().split(' ')[0]
        this.rawInput = input.trim()
        this.currentCommandExists = this.checkIfCommandExistsAndSetCurrentResponder()
    }

    takeAnyInputText(input){
        if(store.getState().isRecordingAllInputs) {
            store.dispatch(recordInputToOutage(input))
        }
    }

    checkIfCommandExistsAndSetCurrentResponder(){
        let foundResponder = false
        this.currentResponder = null
        this.responseStatus = MESSAGE_STATUS_CODES.FAILURE
        this.responders.forEach(responder => {
            if(this.cleanInput === responder.getCommand()){
                this.setCurrentResponder(responder)
                foundResponder = true
            }
        })
        return foundResponder
    }

    setCurrentResponder(responder) {
        this.currentResponder = responder
        this.responseStatus = this.currentResponder.responseStatus
    }
 
    performActionAndRespond() {
        let errorProcessingCommand = false
        if(this.currentCommandExists){
            try {
            this.currentResponder.processInputAndPerformAction(this.rawInput)
            this.currentResponder.postMessage()
            } catch {
                errorProcessingCommand = true
            }
        }
        if(!this.currentCommandExists || errorProcessingCommand ) this.respondToBadCommand()
    }

    getResponseStatus(){
        return this.responseStatus
    }

    respondToBadCommand(){
        this.badCommandResponder.postMessage()
    }
}

const Outtracker = new _Outtracker(
    [
        new HelloResponder(),
        new StartResponder(), 
        new DescribeResponder(),
        new RecordResponder(),
        new EndRecordResponder(),
    new EndResponder(), 
        // new ListResponder(), 
    ]
)

export default Outtracker