import HelloResponder from './HelloResponder';
import StartResponder from './StartResponder';
import BadCommandResponder from './BadCommandResponder';

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
        const commandExists = this.respondIfCommandExists()
        if(!commandExists) this.respondToBadCommand()
    }

    takeResponse(input){
        
    }

    respondIfCommandExists(){
        let foundResponder = false
        this.currentResponder = null
        this.responders.forEach(responder => {
            if(this.cleanInput === responder.getCommand()){
                responder.postMessage()
                this.currentResponder = responder
                foundResponder = true
            }
        })
        return foundResponder
    }

    respondToBadCommand(){
        this.badCommandResponder.postMessage()
    }

    isAwaitingResponse() {
        return  this._isAwaitingResponse
    }   
}

const Outtracker = new _Outtracker(
    [
        new HelloResponder(),
        new StartResponder(), 
    ]
)

export default Outtracker