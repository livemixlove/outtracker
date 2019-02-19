import React, { Component } from 'react';
import { Provider } from 'react-redux'

import store from './StoreSingleton'
import './app.scss'
import ChatConsole from './ChatConsole';


class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <ChatConsole />
        </Provider>
    );
  }
}

export default App;
