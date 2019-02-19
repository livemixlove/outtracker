import React, { Component } from 'react';
import { Provider } from 'react-redux'

import store from './StoreSingleton'
import './app.scss'
import ChatConsole from './ChatConsole';
import MessageRelayer from './MessageRelayer';
import { demoUserName } from './OuttakerActionTypes';

class App extends Component {
    componentDidMount() {
        this.startAppWithResponseFromOuttracker()
    }

    startAppWithResponseFromOuttracker(){
        MessageRelayer.processMessage('@outtracker', demoUserName)
        // TODO remove these following lines
        MessageRelayer.processMessage('@outtracker start', demoUserName)
        // MessageRelayer.processMessage('@outtracker start', demoUserName)
        MessageRelayer.processMessage('@outtracker describe "asdf hahah"', demoUserName)
        MessageRelayer.processMessage('@outtracker record', demoUserName)
        MessageRelayer.processMessage('hello hello', demoUserName)
        MessageRelayer.processMessage('no way no way hey hey', demoUserName)
        MessageRelayer.processMessage('@outtracker end', demoUserName)
    }

    render() {
        return (
            <Provider store={store}>
                <ChatConsole />
            </Provider>
        );
    }
}

export default App;
