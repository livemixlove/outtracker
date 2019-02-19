import commander from 'commander'
import stringArgv from 'string-argv'

import store from '../StoreSingleton'
import {
    postSuccessfulOuttrackerMessageFromOuttracker,
    postFailureOuttrackerMessageFromOuttracker,
} from '../OuttrackerActions'

class OuttrackerResponder {
    hasArgs = false

    constructor() {
        if (this.postMessage === undefined) {
            throw new TypeError('Must set a postMessage method')
        }
        if (this.getArgs && this.getCommand) {
            this.setupCommandParser()
        }
    }

    setupCommandParser() {
        this.hasArgs = true
        commander
            .command(this.getCommand() + ' ' + this.getArgs())
            .action((args) => {
                this.performAction(args)
            })
    }

    processMessageAndPerformAction(inputText) {
        const args = this.turnStringIntoArgs(inputText)
        if (this.hasArgs) {
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
        return ['./', './', ...stringArgv(inputText)]
    }
}

export default OuttrackerResponder
