// import React, { useState } from 'react';
// import { IonInput, IonButton, IonToast } from '@ionic/react';
// // import { auth } from './FirebaseConfig';
// import firebase from 'firebase/compat/app';

// const Login: React.FC = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showToast, setShowToast] = useState(false);
//     const [toastMessage, setToastMessage] = useState('');

//     const signIn = async () => {
//         try {
//             await auth.signInWithEmailAndPassword(email, password);
//             setToastMessage('Login successful!');
//         } catch (error) {
//             const firebaseError = error as firebase.FirebaseError;
//             setToastMessage('Error registering: ' + firebaseError.message);
//         }
//         finally {
//             setShowToast(true);
//         }
//     };

//     return (
//         <div>
//             <IonInput
//                 placeholder="Email"
//                 type="email"
//                 value={email}
//                 onIonChange={(e) => setEmail("")}
//             />
//             <IonInput
//                 placeholder="Password"
//                 type="password"
//                 value={password}
//                 onIonChange={(e) => setPassword("")}
//             />
//             <IonButton onClick={signIn} expand="block">
//                 Sign In
//             </IonButton>
//             <IonToast
//                 isOpen={showToast}
//                 onDidDismiss={() => setShowToast(false)}
//                 message={toastMessage}
//                 duration={2000}
//             />
//         </div>
//     );
// };

// export default Login;

import React from 'react';
import {
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

const Login: React.FC = () => {
  return (
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
              <IonInput type="email" required></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel color="primary" position="floating">Password</IonLabel>
              <IonInput type="password" required></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton expand="block" color="primary">Sign In</IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText color="primary">
                <p className="footer-text">Don't have an account? <span>Sign up</span></p>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
