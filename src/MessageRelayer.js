
import Outtracker from './Outtracker'
import GenericUserMessage from './messages/GenericUserMessage'
import { MESSAGE_STATUS_CODES, outtrackerUserName } from './OuttrackerTypes'

class _MessageRelayer {
    inputString = null

    recipientName = null

    listenerFunctions = []

    recipient = null

    genericUserMessage = new GenericUserMessage()

    // "public" methods

    processMessage(input) {
        this.reset()
        
        this.inputString = input
        this.getRecipientFromInput()
        this.sendUnprocessedInputToListeners()
        this.getResponseFromRecipientIfAny()
        this.postUserMessage()
        this.triggerPostFromRecipientIfAny()
    }

    registerListener(listener) {
        this.listenerFunctions.push(listener)
    }

    // "private" methods

    reset() {
        this.inputString = null
        this.currentResponseStatus = MESSAGE_STATUS_CODES.NEUTRAL
        this.recipient = null
    }

    getRecipientFromInput() {
        const recipientName = this.getTargetUserFromInputString()
        if (recipientName === outtrackerUserName) {
            this.recipient = Outtracker
        }
    }

    sendUnprocessedInputToListeners() {
        this.listenerFunctions.forEach(
            listenerFunction => listenerFunction(this.inputString),
        )
    }

    getResponseFromRecipientIfAny() {
        if (this.recipient) {
            this.recipient.takeCommandInputText(this.inputStringWithoutTarget())
            this.currentResponseStatus = this.recipient.getResponseStatus()
        }
    }

    triggerPostFromRecipientIfAny() {
        if (this.recipient) {
            this.recipient.performActionAndRespond()
        }
    }

    postUserMessage() {
        this.genericUserMessage.postMessageWithStatus(
            this.inputString,
            this.currentResponseStatus,
        )
    }

    inputStringWithoutTarget() {
        const targetName = this.getTargetUserFromInputString()
        return this.inputString.replace(`@${targetName}`, '').trim()
    }

    getTargetUserFromInputString() {
        if (!this.inputString) return null
        const trimmedInput = this.inputString.trim()
        const splitInput = trimmedInput.split(' ').map(s => s.toLowerCase())
        const firstToken = splitInput[0]
        if (firstToken && firstToken.includes('@')) {
            return firstToken.replace('@', '')
        }
        return null
    }
}

const MessageRelayer = new _MessageRelayer()

MessageRelayer.registerListener(
    input => Outtracker.takeInputTextForRecording(input),
)

export default MessageRelayer
