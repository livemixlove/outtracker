import commander from 'commander'
import stringArgv from 'string-argv'

import store from "./StoreSingleton";
import { postSuccessfulOuttrackerMessageFromOuttracker, postFailureOuttrackerMessageFromOuttracker } from "./OuttrackerActions";

class OuttrackerResponder {
    hasArgs = false
    constructor() {
        // if (this.getCommand === undefined) {
        //     throw new TypeError('Must set a getCommand method')
        // }
        if (this.postMessage === undefined) {
            throw new TypeError('Must set a postMessage method')
        } 
        if(this.getArgs && this.getCommand){
            this.hasArgs = true
            commander
                .command(this.getCommand() + ' ' + this.getArgs())
                .action(args => {
                    console.log('Paul C 2019-02-18 args:',args);
                    this.performAction(args)
                })
        }
    }

    processInputAndPerformAction(inputText){
        const args = this.turnStringIntoArgs(inputText)
        console.log('Paul C 2019-02-18 args:',args);
        if(this.hasArgs) {
            commander.parse(args)
        } else {
            this.performAction()
        }
    }

    performAction() {
        // default does nothing
    }

    postSuccessfulOuttrackerMessage(message) {
        store.dispatch(postSuccessfulOuttrackerMessageFromOuttracker(message))
    }

    postFailureOuttrackerMessage(message) {
        store.dispatch(postFailureOuttrackerMessageFromOuttracker(message))
    }

    turnStringIntoArgs(inputText) {
        console.log('Paul C 2019-02-18 inputText:',inputText);
        return ['./','./', ...stringArgv(inputText)]
    }
}

export default OuttrackerResponder