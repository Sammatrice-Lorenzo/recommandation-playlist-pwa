import React, { useState, useEffect } from 'react';

import {
    f7,
    f7ready,
    App,
    Panel,
    Views,
    View,
    Popup,
    Page,
    Navbar,
    Toolbar,
    NavRight,
    Link,
    Block,
    BlockTitle,
    LoginScreen,
    LoginScreenTitle,
    List,
    ListItem,
    ListInput,
    ListButton,
    BlockFooter
} from 'framework7-react';


import routes from '../js/routes';
import store from '../js/store';

const MyApp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const f7params = {
        name: 'Recommandation playlist musicale',
        theme: 'auto',
        darkMode: true,
        colors: {
            primary: '#400073',
        },

        store: store,
        routes: routes,

        // Register service worker (only on production build)
        serviceWorker: process.env.NODE_ENV ==='production' ? {
            path: '/service-worker.js',
        } : {},
    };
    const alertLoginData = () => {
        f7.dialog.alert('Username: ' + username + '<br>Password: ' + password, () => {
        f7.loginScreen.close();
    });
  }
  f7ready(() => {


  })

    return (
        <App { ...f7params }>

            {/* Left panel with cover effect */}
            <Panel left cover dark>
            <View>
                <Page>
                <Navbar title="Left Panel"/>
                <Block>Left panel content goes here</Block>
                </Page>
            </View>
            </Panel>


            {/* Right panel with reveal effect*/}
            <Panel right reveal dark>
            <View>
                <Page>
                <Navbar title="Right Panel"/>
                <Block>Right panel content goes here</Block>
                </Page>
            </View>
            </Panel>


            {/* Your main view, should have "view-main" class */}
            <View main className="safe-areas" url="/" />

        {/* Popup */}
        <Popup id="my-popup">
            <View>
            <Page>
                <Navbar title="Popup">
                <NavRight>
                    <Link popupClose>Close</Link>
                </NavRight>
                </Navbar>
                <Block>
                <p>Popup content goes here.</p>
                </Block>
            </Page>
            </View>
        </Popup>

        <LoginScreen id="my-login-screen">
            <View>
            <Page loginScreen>
                <LoginScreenTitle>Login</LoginScreenTitle>
                <List form>
                <ListInput
                    type="text"
                    name="username"
                    placeholder="Your username"
                    value={username}
                    onInput={(e) => setUsername(e.target.value)}
                ></ListInput>
                <ListInput
                    type="password"
                    name="password"
                    placeholder="Your password"
                    value={password}
                    onInput={(e) => setPassword(e.target.value)}
                ></ListInput>
                </List>
                <List>
                <ListButton title="Sign In" onClick={() => alertLoginData()} />
                <BlockFooter>
                    Some text about login information.<br />Click "Sign In" to close Login Screen
                </BlockFooter>
                </List>
            </Page>
            </View>
        </LoginScreen>
        </App>
    )
}
export default MyApp;