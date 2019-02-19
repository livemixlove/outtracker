import HelloResponder from './HelloResponder';
import StartResponder from './StartResponder';
import BadCommandResponder from './BadCommandResponder';
import { MESSAGE_STATUS_CODES } from './OuttrackerTypes';


class _Outtracker {
    _isAwaitingResponse = false

    responders = []
    currentResponder = null
    badCommandResponder = new BadCommandResponder()

    constructor(responders){
        this.responders = responders
    }

    takeInputText(input) {
        this.cleanInput = input.trim()
        this.currentCommandExists = this.checkIfCommandExistsAndSetCurrentResponder()
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
 
    postResponse() {
        if(this.currentCommandExists){
            this.currentResponder.postMessage()
        }
        if(!this.currentCommandExists) this.respondToBadCommand()
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
    ]
)

export default Outtracker