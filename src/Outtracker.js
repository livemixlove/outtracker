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
import HelpResponder from './HelpResponder';


class _Outtracker {
    responders = []
    currentResponder = null
    badCommandResponder = new BadCommandResponder()

    constructor(responders){
        this.responders = responders
    }

    takeInputTextForRecording(input){
        if(store.getState().isRecordingAllInputs) {
            store.dispatch(recordInputToOutage(input))
        }
    }

    takeCommandInputText(input) {
        this.fullInput = input
        this.currentCommand = this.getCommandFromInputString(input)
        this.currentCommandExists = this.checkIfCommandExistsAndSetCurrentResponder()
    }

    checkIfCommandExistsAndSetCurrentResponder(){
        let foundResponder = false
        this.currentResponder = null
        this.responseStatus = MESSAGE_STATUS_CODES.FAILURE
        this.responders.forEach(responder => {
            if(this.currentCommand === responder.getCommand()){
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
                this.currentResponder.processMessageAndPerformAction(this.fullInput)
                this.currentResponder.postMessage()
            } catch(e) {
                console.error(e)
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

    getCommandFromInputString(input) {
        return input.trim().split(' ')[0]
    }
}

const Outtracker = new _Outtracker(
    [
        new HelloResponder(),
        new StartResponder(), 
        new EndResponder(), 
        new DescribeResponder(),
        new RecordResponder(),
        new EndRecordResponder(),
        new HelpResponder(),
    ]
)

export default Outtracker