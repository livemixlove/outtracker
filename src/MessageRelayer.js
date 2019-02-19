
import Outtracker from "./Outtracker";
import GenericUserMessage from "./messages/GenericUserMessage";
import { MESSAGE_STATUS_CODES } from "./OuttrackerTypes";

class _MessageRelayer {
    inputString = null
    genericUserMessage = new GenericUserMessage()
    processMessage(input) {
        this.inputString = input
        this.resetResponseStatus()
        this.sendUnprocessedInputToOuttracker()
        this.getResponseFromOuttrackerIfAny()
        this.postUserMessage()
        this.triggerPostFromOuttrackerIfAny()
    }

    sendUnprocessedInputToOuttracker() {
        Outtracker.takeInputTextForRecording(this.inputString)
    }

    resetResponseStatus(){
        this.currentResponseStatus = MESSAGE_STATUS_CODES.NEUTRAL
    }

    getResponseFromOuttrackerIfAny() {
        // ideally you'd decouple MessageRelayer and Outtracker
        // probably setting up a something like a "MessageRecipient" abstract class 
        if(this.inputIsForOuttracker()){
            Outtracker.takeCommandInputText(this.inputStringWithoutTarget())
            this.currentResponseStatus = Outtracker.getResponseStatus()
        }
    }

    triggerPostFromOuttrackerIfAny() {
        if(this.inputIsForOuttracker()){
            Outtracker.performActionAndRespond()
        }
    }

    postUserMessage() {
        this.genericUserMessage.postMessageWithStatus(
            this.inputString, 
            this.currentResponseStatus
        )
    }

    inputIsForOuttracker(){
        const targetUser = this.getTargetUserFromInputString()
        return (targetUser === 'outtracker')
    }

    inputStringWithoutTarget(){
        const targetName = this.getTargetUserFromInputString()
        return this.inputString.replace(`@${targetName}`,'').trim()
    }

    getTargetUserFromInputString() {
        if(!this.inputString) return null
        const trimmedInput = this.inputString.trim()
        const splitInput = trimmedInput.split(' ').map(s => s.toLowerCase())
        const firstToken = splitInput[0]
        if(firstToken && firstToken.includes('@')){
            return firstToken.replace('@','')
        } else {
            return null
        }
    }
}

const MessageRelayer = new _MessageRelayer()

export default MessageRelayer