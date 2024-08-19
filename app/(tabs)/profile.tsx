import {View, Text, SafeAreaView, Image, TouchableOpacity, StyleSheet, ScrollView} from 'react-native'
import { ref as storeRef, getDownloadURL, getBlob} from "firebase/storage";
import { ref as dataRef, getDatabase, onValue } from "firebase/database";
import React, {ReactElement, useEffect, useState} from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { FIREBASE_STORAGE, FIREBASE_AUTH } from '@/FirebaseConfig';

const Profile = () => {

    const auth = FIREBASE_AUTH;
    const [user, setUser] = useState<string | null>('');
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const db = getDatabase();
    const storage = FIREBASE_STORAGE;

    // useEffect(() => {

    //     const unsubscribe = auth.onAuthStateChanged(async (user) => {
    //         if(user){
    //             setUser(user.displayName);
    //             const userInventory = dataRef(db, `users/${user.uid}/inventory`);
    //             setImageUrls([]);

    //             onValue(userInventory, async (snapshot) => {
                    
    //                 const urls: string[] = [];
    //                 const promises: Promise<void>[] = [];

    //                 snapshot.forEach((childSnapshot) => {
    //                     const promise = getDownloadURL(storeRef(storage, childSnapshot.val().imagePath))
    //                     .then(async (url) => {
                        
    //                         if(!imageUrls.includes(url)){
    //                             urls.push(url);
    //                         }

    //                     });
    //                     promises.push(promise);
    //                 });

    //                 await Promise.all(promises);
    //                 setImageUrls(urls);
    //                 console.log(urls.length);
                    
    //             });
                
    //         }
    //     });


    //     return () => unsubscribe();
    // }, [db, storage]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
            setUser(user.displayName);
            const userInventory = dataRef(db, `users/${user.uid}/inventory`);
    
            // Clean up previous listener if there was one
            const handleDataChange = (snapshot: any) => {
              const urls: string[] = [];
              const promises: Promise<void>[] = [];
    
              snapshot.forEach((childSnapshot: any) => {
                const promise = getDownloadURL(storeRef(storage, childSnapshot.val().imagePath))
                  .then((url: string) => {
                    if (!urls.includes(url)) {
                      urls.push(url);
                    }
                  });
                promises.push(promise);
              });
    
              Promise.all(promises).then(() => {
                setImageUrls(urls);
                console.log(urls.length);
              });
            };
    
            const unsubscribeData = onValue(userInventory, handleDataChange);
    
            return () => {
              unsubscribeData(); // Cleanup listener
            };
    
          } else {
            setUser(null);
            setImageUrls([]);
          }
        });
    
        return () => {
          unsubscribe(); // Cleanup auth state listener
        };
      }, [db, storage]);

    const logOut = async () => {
        await auth.signOut().then(() => {
            setImageUrls([]);
            router.replace("sign_in");
        });
    }

    const addItem = () => {
        router.navigate("camera");
    }

    return (
        <SafeAreaView className="flex flex-col">
            <View className="flex flex-row bg-gray-200 pt-20 pb-7">
                <View className='basis-1/3'/>
                <View className='basis-1/3 items-center'>
                <Image 
                        source={require('../../assets/icons/profile.png')}
                        className="bg-white rounded-full p-10 w-24 h-24"
                        resizeMode="stretch"
                        >                
                    </Image>
                    <Text className="text-2xl font-medium mt-2">{user}</Text>
                </View>
                <View className='basis-1/3 mt-3 items-center'>
                <TouchableOpacity 
                    onPress={logOut}
                    activeOpacity={0.7}
                    className='ml-5'>
                        <Image
                        source={require("../../assets/icons/logout.png")}
                        tintColor={"gray"}
                        />
                </TouchableOpacity>
                <Text style={styles.redText}>Logout</Text>
                <Text></Text>
                </View>
            </View>
            <CustomButton title="Add Trade Item" handlePress={addItem} textStyles={''} containerStyles={'h-12'} isLoading={false}></CustomButton>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.container}>
                {imageUrls.map((url, index) => (
                    <Image key={index} source={{uri : url}} style={styles.imageCard}/>
                ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    
    redText: {
      color: 'gray',
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    scrollContainer: {
        flex: 1,
        padding: 35,
        paddingBottom: 500,
    },
    imageCard: {
        width: 165,
        height: 245,
        resizeMode: "cover",
        borderWidth: 5,
        borderRadius: 7,
        marginBottom: 22,
    },
    itemHeader: {
        fontSize: 18,
        marginBottom: 12,
        marginLeft: 5,
    }

  });

export default Profile;
