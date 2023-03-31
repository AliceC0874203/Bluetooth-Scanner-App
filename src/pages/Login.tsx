// import { auth } from './';
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
import './Login.css';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { auth } from '../App';

// Import the functions you need from the SDKs you need

const Login: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const history = useHistory();

    const signIn = async () => {
        try {
            console.log(email, password);
            await auth.signInWithEmailAndPassword(email, password);
            history.replace('/scan-bluetooth');
            setToastMessage('Login successful!');
        } catch (error) {
            const firebaseError = error as firebase.FirebaseError;
            console.log(firebaseError);
            setToastMessage('Error login: ' + firebaseError.message);
        }
        finally {
            setShowToast(true);
        }
    };

    return (
        <div className="login">
            <IonPage>
                <IonContent fullscreen className="ion-padding">
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonText color="primary">
                                    <h1 className="header-text">Sign In</h1>
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
                                <IonButton onClick={signIn} expand="block" color="primary">
                                    Sign In
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
                                        Don't have an account?{' '}
                                        <Link to="/sign-up">
                                            <span>Sign up</span>
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

export default Login;
