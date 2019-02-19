import React, { Component } from 'react';
import { Provider } from 'react-redux'

import store from './StoreSingleton'
import './app.scss'
import ChatConsole from './ChatConsole';
import InputDelegator from './InputDelegator';
import { demoUserName } from './OuttakerActionTypes';

class App extends Component {
    componentDidMount() {
        this.startAppWithResponseFromOuttracker()
    }

    startAppWithResponseFromOuttracker(){
        InputDelegator.processInput('@outtracker', demoUserName)
        // TODO remove these following lines
        InputDelegator.processInput('@outtracker start', demoUserName)
        InputDelegator.processInput('@outtracker describe "asdf hahah"', demoUserName)
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
