import HelloResponder from './responders/HelloResponder'
import StartResponder from './responders/StartResponder'
import BadCommandResponder from './responders/BadCommandResponder'
import { MESSAGE_STATUS_CODES, outtrackerUserName } from './OuttrackerTypes'
import store from './StoreSingleton'
import RecordSingleResponder from './responders/RecordSingleResponder'
import RecordResponder from './responders/RecordResponder'
import EndResponder from './responders/EndResponder'
import EndRecordResponder from './responders/EndRecordResponder'
import { recordInputToOutage } from './OuttrackerActions'
import HelpResponder from './responders/HelpResponder'
import Chatbot from './Chatbot'


class _Outtracker extends Chatbot {
    get name() {
        return outtrackerUserName
    }

    get BadCommandResponder() {
        return OuttrackerBadCommandResponder
    }
}

const Outtracker = new _Outtracker(
    [
        new HelloResponder(),
        new StartResponder(),
        new EndResponder(),
        new RecordSingleResponder(),
        new RecordResponder(),
        new EndRecordResponder(),
        new HelpResponder(),
    ],
)

export default Outtracker
