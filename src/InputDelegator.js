import store from "./StoreSingleton";
import Outtracker from "./Outtracker";
import OuttrackerTypes, { MESSAGE_STATUS_CODES } from "./OuttakerActionTypes";

class InputDelegator {
    inputString = null
    processInput(input, user) {
        this.inputString = input

        if( Outtracker.isAwaitingResponse()) {
            Outtracker.takeResponse(input)
        } else if(this.inputIsForOuttracker()){
            Outtracker.takeInputText(this.inputStringWithoutTarget())
        } else {
            store.dispatch({
                type: OuttrackerTypes.ADD_MESSAGE_TO_CHAT_HISTORY,
                result: {
                    message: this.inputString,
                    user,
                    messageStatusCode: MESSAGE_STATUS_CODES.NEUTRAL,
                }
            })
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

export default InputDelegator