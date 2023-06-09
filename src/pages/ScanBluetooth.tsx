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
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
} from '@ionic/react';
import { BLE } from '@ionic-native/ble';
import './ScanBluetooth.css';
import { database } from '../App';

// Initialize the Firebase app and create a database reference

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
    BLE.enable();

    const toggleScan = () => {
        if (scanning) {
            // Stop scanning

            stopScan();
        } else {
            // Start scanning
            startScan();
        }
    };

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
                                    onClick={toggleScan}
                                    color={scanning ? 'medium' : 'primary'}
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
                                                <IonCard>
                                                    <IonCardHeader>
                                                        <IonCardTitle>Name: {device.name || 'Unknown'}</IonCardTitle>
                                                    </IonCardHeader>

                                                    <IonCardContent>
                                                        ID: {device.id}
                                                    </IonCardContent>
                                                </IonCard>
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
