import HelloResponder from './responders/HelloResponder'
import StartResponder from './responders/StartResponder'
import BadCommandResponder from './responders/BadCommandResponder'
import { MESSAGE_STATUS_CODES, outtrackerUserName } from './OuttrackerTypes'
import store from './StoreSingleton'
import RecordSingleResponder from './responders/RecordSingleResponder'
import RecordResponder from './responders/RecordResponder'
import EndResponder from './responders/EndResponder'
import EndRecordResponder from './responders/EndRecordResponder'
import { recordInputToOutage } from './OuttrackerActions'
import HelpResponder from './responders/HelpResponder'


class _Outtracker {
    responders = []

    currentResponder = null

    badCommandResponder = new BadCommandResponder()

    fullInput = null

    constructor(responders) {
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
        return string.includes(`@${outtrackerUserName}`)
    }
}

const Outtracker = new _Outtracker(
    [
        new HelloResponder(),
        new StartResponder(),
        new EndResponder(),
        new RecordSingleResponder(),
        new RecordResponder(),
        new EndRecordResponder(),
        new HelpResponder(),
    ],
)

export default Outtracker
