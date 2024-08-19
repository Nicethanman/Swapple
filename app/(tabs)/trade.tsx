import {View, Text, SafeAreaView, ScrollView} from 'react-native'
import React, {ReactElement, useEffect, useState} from 'react'
import { FIREBASE_AUTH, FIREBASE_DATABASE } from '@/FirebaseConfig';
import { ref as dataRef, getDatabase, onValue } from "firebase/database";
import ProfileButton from '@/components/ProfileButton';
import { router } from 'expo-router';

const Trade = () => {

    const auth = FIREBASE_AUTH;
    const db = FIREBASE_DATABASE;
    const [idNamePairs, setIdNamePairs] = useState<{[id: string]: string}>({}); //store the user id and username in react state

    useEffect(() => {

            const userRef = dataRef(db, 'users');
            onValue(userRef, (snapshot) => {
                var idNamePairsTemp: {[id: string]: string} = {};
                snapshot.forEach((childSnapshot) => {

                    if(auth.currentUser && childSnapshot.key != auth.currentUser.uid){
                        idNamePairsTemp[childSnapshot.val().username] = childSnapshot.key;
                    }

                });
                console.log(idNamePairsTemp);
                setIdNamePairs(idNamePairsTemp);
            });
    }, [db, auth])

    const goToTradeScreen = (id: string)  =>  {
        router.navigate(`requestTrade?id=${id}`);
    } 

    return (
        <SafeAreaView className="flex flex-col">
            <View className="flex items-center shadow-md bg-white pt-20 pb-7">
                <Text className='items-center text-xl'>Select a profile to start trading!</Text>
            </View>
            <ScrollView>
            <View className="p-8">
                {Object.entries(idNamePairs).map(([name, id]) => (
                    <ProfileButton username={name} handlePress={() => goToTradeScreen(id)} textStyles={''} containerStyles={'h-12'} profilePic='../../assets/icons/profile.png'/>
                ))}
            </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Trade;