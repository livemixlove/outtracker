
import Outtracker from './Outtracker'
import GenericUserMessage from './messages/GenericUserMessage'
import { MESSAGE_STATUS_CODES, outtrackerUserName } from './OuttrackerTypes'

class _MessageRelayer {
    inputMessage = null

    listenerFunctions = []

    recipient = null

    genericUserMessage = new GenericUserMessage()

    // "public" methods

    processMessage(message) {
        this.reset()

        this.inputMessage = message
        this.getRecipientFromMessage()
        this.sendUnprocessedMessageToListeners()
        this.getResponseFromRecipientIfAny()
        this.postUserMessage()
        this.triggerPostFromRecipientIfAny()
    }

    registerListener(listener) {
        this.listenerFunctions.push(listener)
    }

    // "private" methods

    reset() {
        this.currentResponseStatus = MESSAGE_STATUS_CODES.NEUTRAL
        this.inputMessage = null
        this.recipient = null
    }

    getRecipientFromMessage() {
        const recipientName = this.getRecipientUserFromMessage()
        if (recipientName === outtrackerUserName) { // hardcoded because there aren't any others...
            this.recipient = Outtracker
        }
    }

    sendUnprocessedMessageToListeners() {
        this.listenerFunctions.forEach(
            listenerFunction => listenerFunction(this.inputMessage),
        )
    }

    getResponseFromRecipientIfAny() {
        if (this.recipient) {
            this.recipient.takeCommand(this.inputStringWithoutRecipient())
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
            this.inputMessage,
            this.currentResponseStatus,
        )
    }

    inputStringWithoutRecipient() {
        const recipientName = this.getRecipientUserFromMessage()
        return this.inputMessage.replace(`@${recipientName}`, '').trim()
    }

    getRecipientUserFromMessage() {
        if (!this.inputMessage) return null
        const trimmedInput = this.inputMessage.trim()
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
