// import React, { useState } from 'react';
// import { IonInput, IonButton, IonToast } from '@ionic/react';
// import { auth } from '../components/firebaseConfig';
// import firebase from 'firebase/compat/app';

// const Register: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState('');

//   const register = async () => {
//     try {
//       await auth.createUserWithEmailAndPassword(email, password);
//       setToastMessage('Registration successful!');
//     } catch (error) {
//       const firebaseError = error as firebase.FirebaseError;
//       setToastMessage('Error registering: ' + firebaseError.message);
//     } finally {
//       setShowToast(true);
//     }
//   };

//   return (
//     <div>
//       <IonInput
//         placeholder="Email"
//         type="email"
//         value={email}
//         onIonChange={(e) => setEmail("")}
//       />
//       <IonInput
//         placeholder="Password"
//         type="password"
//         value={password}
//         onIonChange={(e) => setPassword("")}
//       />
//       <IonButton onClick={register} expand="block">
//         Register
//       </IonButton>
//       <IonToast
//         isOpen={showToast}
//         onDidDismiss={() => setShowToast(false)}
//         message={toastMessage}
//         duration={2000}
//       />
//     </div>
//   );
// };

// export default Register;
