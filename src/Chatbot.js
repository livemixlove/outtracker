

class Chatbot {
    responders = []

    currentResponder = null

    

    fullInput = null

    constructor(responders) {
        if (typeof this.name === 'undefined') {
            throw new Error('You must provide a name getter')
        }
        if (typeof this.BadCommandResponder === 'undefined') {
            throw new Error('You must provide a BadCommandResponder getter')
        }
        
        this.responders = responders || []
    }


    // "public" methods

    takeCommand(input) {
        this.fullInput = input
        this.currentCommand = this.getCommandFromInputString(input)
        this.currentCommandExists = this.checkIfCommandExistsAndSetCurrentResponder()
    }

    performActionAndRespond() {
        let errorProcessingCommand = false
        if (this.currentCommandExists) {
            try {
                this.currentResponder.processMessageAndPerformAction(this.fullInput)
                this.currentResponder.postMessage()
            } catch (e) {
                console.error(e)
                errorProcessingCommand = true
            }
        }
        if (!this.currentCommandExists || errorProcessingCommand) this.respondToBadCommand()
    }

    takeInputTextForRecording(input) {
        if (store.getState().isRecordingAllInputs) {
            if (!this.stringHasOuttrackerName(input)) {
                store.dispatch(recordInputToOutage(input))
            }
        }
    }

    // "private" methods

    checkIfCommandExistsAndSetCurrentResponder() {
        let foundResponder = false
        this.currentResponder = null
        this.responseStatus = MESSAGE_STATUS_CODES.FAILURE
        this.responders.forEach((responder) => {
            if (this.currentCommand === responder.getCommand()) {
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

    getResponseStatus() {
        return this.responseStatus
    }

    respondToBadCommand() {
        this.badCommandResponder.postMessage()
    }

    getCommandFromInputString(input) {
        return input.trim().split(' ')[0]
    }

    stringHasOuttrackerName(string) {
        return string.includes(`@${this.name}`)
    }
}

export default Chatbot
