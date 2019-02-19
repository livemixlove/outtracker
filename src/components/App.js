import React, { Component } from 'react'
import { Provider } from 'react-redux'

import store from '../StoreSingleton'
import '../styles/app.scss'
import ChatConsole from './ChatConsole'
import MessageRelayer from '../MessageRelayer'
import { demoUserName } from '../OuttrackerTypes'

class App extends Component {
    componentDidMount() {
        this.startAppWithResponseFromOuttracker()
    }

    startAppWithResponseFromOuttracker() {
        MessageRelayer.processMessage('@outtracker', demoUserName)
        // uncomment these lines if you want to prepopulate chat
        // MessageRelayer.processMessage('@outtracker help', demoUserName)
        // MessageRelayer.processMessage('@outtracker start', demoUserName)
        // MessageRelayer.processMessage('@outtracker describe "some description of outage"', demoUserName)
        // MessageRelayer.processMessage('@outtracker record', demoUserName)
        // MessageRelayer.processMessage('hello hello', demoUserName)
        // MessageRelayer.processMessage('great words in a message', demoUserName)
        // MessageRelayer.processMessage('@outtracker end', demoUserName)
    }

    render() {
        return (
            <Provider store={store}>
                <ChatConsole />
            </Provider>
        )
    }
}

export default App
