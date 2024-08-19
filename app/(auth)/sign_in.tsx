import {Text, SafeAreaView, TextInput, Alert} from 'react-native';
import React from 'react';
import { FONTFAMILY } from '../../constants/theme' //this is for two levels deep from the route
import { useFonts } from 'expo-font';
import CustomButton from '@/components/CustomButton';
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '@/FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged} from 'firebase/auth';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { ref, set } from "firebase/database";

const SignIn = () => {

    const [email, changeEmail] = React.useState('');
    const [password, changePassword] = React.useState('');
    const auth = FIREBASE_AUTH;
    const db = FIREBASE_DATABASE;

    const [fontsLoaded] = useFonts({
        'Fredoka': require("../../assets/fonts/Fredoka-VariableFont_wdth,wght.ttf")
    });

    // useEffect(() => {

    //     const unsubscribe = auth.onAuthStateChanged(user => {
    //         if(user){
    //             router.replace("/home");
    //         }
    //     })

    //     return unsubscribe;

    // }, [])


    const signIn = () => {
        if(email == '' || password == ''){
            Alert.alert("Please enter valid credentials");
        } else {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                Alert.alert("success");
                router.replace("/home");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert(errorMessage + " Please try again");
            });
        }
    }

    const signUp = async () => {
        if (email == '' || password == '') {
            Alert.alert("Please fill out all the fields");
        } else {
            try {
                // Create user
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
    
                // Update the user's profile with the displayName
                const displayName = user.email.slice(0, user.email.indexOf("@"));
                await updateProfile(user, { displayName });
    
                // Set the user's data in the database
                await set(ref(db, 'users/' + user.uid), {
                    username: displayName,
                    email: user.email,
                });
    
                // Alert the user and navigate to the home page
                Alert.alert(`New user ${displayName} created!`);
                router.replace("/home");
            } catch (error) {
                // Handle errors
                Alert.alert("Error in signup: Please try again.");
            }
        }
    };

    // const signUp = async () => {

    //     if(email == '' || password == ''){
    //         Alert.alert("Please fill out all the fields");
    //     } else {
    //         const result = await createUserWithEmailAndPassword(auth, email, password)
    //         .then((userCredential) => {
    //             // Signed up 
    //             const user = userCredential.user;
    //             updateProfile(user, {
    //                 displayName: user?.email.slice(0, user?.email.indexOf("@"))
    //               }).then(() => {
    //                 Alert.alert(`New user ${user.displayName} created!`);
    //               }).catch((error) => {
    //                 Alert.alert("error in signup: " + error.message);
    //             });

    //             await set(ref(db, 'users/' + user.uid), {
    //                 username: user.displayName,
    //                 email: user.email,
    //             })

    //             router.replace("/home");

    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             Alert.alert(errorMessage + "Please Try again");
    //         });
    //     }
    // }

    return (
        <SafeAreaView className="items-center">
            <Text className="py-10 text-7xl text-primary mt-20" style={{...FONTFAMILY.fredoka}}>Swapple</Text>
            <TextInput 
            placeholder='Email'
            placeholderTextColor="white"
            value={email}
            onChangeText={changeEmail}
            className="color-white justify-center w-72 px-5 mb-3 rounded-lg py-2 bg-slate-300"
            />
            <TextInput 
            placeholder='Password'
            placeholderTextColor="white"
            value={password}
            onChangeText={changePassword}
            className="justify-center w-72 px-5 rounded-lg py-2 bg-slate-300"
            />
            <CustomButton title="Login" handlePress={signIn} isLoading={false} containerStyles="w-72 h-16 mt-8" textStyles="color-white"/>
            <Text className="mt-8">New to Swapple?</Text>
           <CustomButton title="Sign Up" handlePress={signUp} isLoading={false} containerStyles="w-36 h-12 mt-3" textStyles="color-white"/>
        </SafeAreaView> 
    );
}

export default SignIn;
