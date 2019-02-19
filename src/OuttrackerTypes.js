import Immutable from 'immutable'

export const dateFormat = 'LL HH:mm:ss'

export const MESSAGE_STATUS_CODES = {
    NEUTRAL: 1,
    SUCCESS: 2,
    FAILURE: 3,
}

export const OUTAGE_RECORD_TYPES = {
    DESCRIBE: 1,
    RECORDED_INPUT: 2,
}

export const ChatMessageRecord = Immutable.Record({
    text: Immutable.List(),
    dateTime: null,
    user: null,
    messageStatusCode: MESSAGE_STATUS_CODES.NEUTRAL,
})

export const OutageRecord = Immutable.Record({
    name: null,
    outageId: null,
    startTime: null,
    endTime: null,
})

export const OutageDescriptor = Immutable.Record({
    type: OUTAGE_RECORD_TYPES.DESCRIBE,
    outageId: null,
    dateTime: null,
    text: null,
})

export const OutageRecordedInput = Immutable.Record({
    type: OUTAGE_RECORD_TYPES.RECORDED_INPUT,
    outageId: null,
    dateTime: null,
    text: null,
})

export const OuttrackerStateRecord = Immutable.Record({
    messageHistory: Immutable.List(),
    outagesById: Immutable.Map(),
    outageDescriptorListsByOutageId: Immutable.Map(),   
    isRecordingAllInputs: false,
    currentOutageId: null,
})
