import firebase from 'firebase/compat/app';
import React, { useState } from 'react';
import {
    IonToast,
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonButton,
    IonText,
    IonLabel,
} from '@ionic/react';
import { Link, useHistory } from 'react-router-dom';
// Import the functions you need from the SDKs you need
import 'firebase/compat/auth';
import 'firebase/compat/database';

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

const Register: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const history = useHistory();

    const register = async () => {
        try {
            await auth.createUserWithEmailAndPassword(email, password);
            history.goBack();
            setToastMessage('Registration successful!');
        } catch (error) {
            const firebaseError = error as firebase.FirebaseError;
            console.log(firebaseError);
            setToastMessage('Error registering: ' + firebaseError.message);
        } finally {
            setShowToast(true);
        }
    };

    return (
        <div className="sign-up">
            <IonPage>
                <IonContent fullscreen className="ion-padding">
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonText color="primary">
                                    <h1 className="header-text">Sign Up</h1>
                                </IonText>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonLabel color="primary" position="floating">Email</IonLabel>
                                <IonInput
                                    required
                                    placeholder="Email"
                                    type="email"
                                    value={email}
                                    onIonChange={(e) => setEmail(e.detail.value as string)}
                                />
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonLabel color="primary" position="floating">Password</IonLabel>
                                <IonInput
                                    required
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    onIonChange={(e) => setPassword(e.detail.value as string)}
                                />
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonButton onClick={register} expand="block" color="primary">
                                    Create account
                                </IonButton>
                                <IonToast
                                    isOpen={showToast}
                                    onDidDismiss={() => setShowToast(false)}
                                    message={toastMessage}
                                    duration={2000}
                                />
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonText color="primary">
                                    <p className="footer-text">
                                        Already have account? {' '}
                                        <Link to="" onClick={(e) => {
                                            e.preventDefault();
                                            history.goBack();
                                        }}>
                                            <span>Sign In</span>
                                        </Link>
                                    </p>
                                </IonText>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        </div>
    );
};

export default Register;
