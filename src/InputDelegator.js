
import Outtracker from "./Outtracker";
import GenericUserMessage from "./GenericUserMessage";
import { MESSAGE_STATUS_CODES } from "./OuttrackerTypes";

class _InputDelegator {
    inputString = null
    genericUserMessage = new GenericUserMessage()
    processInput(input) {
        this.inputString = input
        this.resetResponseStatus()
        this.sendOuttrackerRawInput()
        this.getResponseFromOuttrackerIfAny()
        this.postUserMessage()
        this.triggerPostFromOuttrackerIfAny()
    }

    sendOuttrackerRawInput() {
        Outtracker.takeAnyInputText(this.inputString)
    }

    resetResponseStatus(){
        this.currentResponseStatus = MESSAGE_STATUS_CODES.NEUTRAL
    }

    getResponseFromOuttrackerIfAny() {
        if(this.inputIsForOuttracker()){
            Outtracker.takeInputText(this.inputStringWithoutTarget())
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

    inputStringWithoutTarget(){
        const targetName = this.getTargetUserFromInputString()
        return this.inputString.replace(`@${targetName}`,'')
    }
}

const InputDelegator = new _InputDelegator()

export default InputDelegator