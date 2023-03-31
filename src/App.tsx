import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
  IonApp,
  IonButton,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonTitle,
  setupIonicReact
} from '@ionic/react';
import { BLE } from '@ionic-native/ble';
import React, { useState } from 'react';
import { useRef } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
// import { firebaseConfig } from './';
// import Login from './pages/Login';
// import Register from './pages/Register';

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

interface Device {
  id: string;
  name?: string;
  rssi: number;
}

// Initialize the Firebase app and create a database reference
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const App: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [newDevices, setNewDevices] = useState<Device[]>([]);

  // Use a useRef to keep track of the device IDs
  const deviceIds = useRef<Set<string>>(new Set());

  const startScan = () => {
    setScanning(true);
    setNewDevices([]);
    deviceIds.current.clear(); // Clear device IDs before starting a new scan

    BLE.scan([], 5).subscribe(
      (device) => {
        // Use a type assertion to treat the device object as a Device
        const typedDevice = device as Device;
  
        // Check if the device ID already exists in the deviceIds Set
        const deviceExists = deviceIds.current.has(typedDevice.id);
  
        // Only add the device to the array if it doesn't already exist
        if (!deviceExists) {
          setNewDevices((prevDevices) => [...prevDevices, typedDevice]);
          deviceIds.current.add(typedDevice.id); // Add the device ID to the deviceIds Set
          database.ref('devices/').push(typedDevice.id);
        }
      },
      (error) => {
        console.error(error);
      }
    );
    setTimeout(() => stopScan(), 5000);
  };

  const stopScan = () => {
    setScanning(false);
    BLE.stopScan();
  };

  return (
    <IonApp>
      <IonContent className="ion-padding">
        {/* <Login />
        <Register /> */}
        <IonButton
          onClick={startScan}
          disabled={scanning}
          color={scanning ? 'medium' : 'primary'}
          expand="block"
        >
          {scanning ? 'Scanning...' : 'Start Scan'}
        </IonButton>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Discovered Devices</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {newDevices.map((device, index) => {
            return (
              <IonItem key={index}>
                <IonLabel>
                  <h4>ID: {device.id}</h4>
                  <h3>Name: {device.name || 'Unknown'}</h3>
                  <p>RSSI: {device.rssi}</p>
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonApp>
  );
};

export default App;
