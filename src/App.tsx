import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
  IonApp,
  setupIonicReact
} from '@ionic/react';
import Login from './pages/Login';
import ScanBluetooth from './pages/ScanBluetooth';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Register from './pages/Register';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

setupIonicReact();

export const firebaseConfig = {
  apiKey: "AIzaSyBs65rTCrW3dbRtiFPoNTNBSKNYSR6bSzk",
  authDomain: "eigenintershiptest.firebaseapp.com",
  projectId: "eigenintershiptest",
  storageBucket: "eigenintershiptest.appspot.com",
  messagingSenderId: "949736203523",
  appId: "1:949736203523:web:675ac2113e3d99a9b6f536",
  measurementId: "G-RKQ5PTBW6F"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const database = firebase.database();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/login" component={Login} exact />
          <Route path="/scan-bluetooth" component={ScanBluetooth} exact />
          <Route path="/sign-up" component={Register} exact />
          <Redirect from="/" to="/login" exact />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
