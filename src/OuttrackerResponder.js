import store from "./StoreSingleton";
import { postSuccessfulMessageFromOuttracker, postFailureMessageFromOuttracker } from "./OuttrackerActions";

class OuttrackerResponder {
    constructor() {
        if (this.getCommand === undefined) {
            throw new TypeError('Must set a getCommand method')
        }
        if (this.postMessage === undefined) {
            throw new TypeError('Must set a postMessage method')
        } 
    }

    postSuccessfulMessage(message) {
        store.dispatch(postSuccessfulMessageFromOuttracker(message))
    }

    postFailureMessage(message) {
        store.dispatch(postFailureMessageFromOuttracker(message))
    }
}

export default OuttrackerResponder