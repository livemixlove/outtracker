
import Outtracker from "./Outtracker";
import GenericUserMessage from "./GenericUserMessage";

class _InputDelegator {
    inputString = null
    genericUserMessage = new GenericUserMessage()
    processInput(input, user) {
        this.inputString = input

        if( Outtracker.isAwaitingResponse()) {
            Outtracker.takeResponse(input)
        } else if(this.inputIsForOuttracker()){
            Outtracker.takeInputText(this.inputStringWithoutTarget())
        } else {
            this.genericUserMessage.postMessage(input)
        }
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