import React, { useState, useRef } from 'react';
import {
    IonContent,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonList,
    IonItem,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonPage,
} from '@ionic/react';
import { BLE } from '@ionic-native/ble';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import './ScanBluetooth.css';

// Assuming you have already initialized firebase in your App.tsx
export const firebaseConfig = {
    apiKey: "AIzaSyBs65rTCrW3dbRtiFPoNTNBSKNYSR6bSzk",
    authDomain: "eigenintershiptest.firebaseapp.com",
    projectId: "eigenintershiptest",
    storageBucket: "eigenintershiptest.appspot.com",
    messagingSenderId: "949736203523",
    appId: "1:949736203523:web:675ac2113e3d99a9b6f536",
    measurementId: "G-RKQ5PTBW6F"
};

// Initialize the Firebase app and create a database reference
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

interface Device {
    id: string;
    name?: string;
    rssi: number;
}

const ScanBluetooth: React.FC = () => {
    const [scanning, setScanning] = useState(false);
    const [newDevices, setNewDevices] = useState<Device[]>([]);

    // Use a useRef to keep track of the device IDs
    const deviceIds = useRef<Set<string>>(new Set());

    // ... (keep your existing code for startScan and stopScan functions)
    const startScan = () => {
        database.ref('devices/').remove();
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
        <div className="scan-bluetooth">
            <IonPage>
                <IonContent fullscreen className="ion-padding app-content">
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonText color="primary">
                                    <h1 className="header-text">Bluetooth Scanner</h1>
                                </IonText>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonButton
                                    onClick={startScan}
                                    disabled={scanning}
                                    color={'primary'}
                                    expand="block"
                                >
                                    {scanning ? 'Scanning...' : 'Start Scan'}
                                </IonButton>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
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
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        </div>
    );
};

export default ScanBluetooth;
