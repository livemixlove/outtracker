import store from "./StoreSingleton";
import { postSuccessfulOuttrackerMessageFromOuttracker, postFailureOuttrackerMessageFromOuttracker } from "./OuttrackerActions";

class OuttrackerResponder {
    constructor() {
        // if (this.getCommand === undefined) {
        //     throw new TypeError('Must set a getCommand method')
        // }
        if (this.postMessage === undefined) {
            throw new TypeError('Must set a postMessage method')
        } 
    }

    postSuccessfulOuttrackerMessage(message) {
        store.dispatch(postSuccessfulOuttrackerMessageFromOuttracker(message))
    }

    postFailureOuttrackerMessage(message) {
        store.dispatch(postFailureOuttrackerMessageFromOuttracker(message))
    }
}

export default OuttrackerResponder