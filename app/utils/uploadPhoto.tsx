import { FIREBASE_STORAGE } from "@/FirebaseConfig"
import { ref as storeRef, uploadBytes, uploadString } from "firebase/storage";
import { ref as dataRef, getDatabase, set } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
// const user = auth.currentUser;
const db = getDatabase();

const storage = FIREBASE_STORAGE;

async function fetchBlob(photo: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response as Blob); // Type assertion to Blob
        };
        xhr.onerror = function (e) {
            console.error(e);
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", photo, true);
        xhr.send(null);
    });
}

export async function uploadItem(itemName: string, uri: string, description:string){
    const user = auth.currentUser;

        if(user){
            const userPhotos = storeRef(storage, 'users/' + user.uid + '/' + itemName);
            const blob: Blob = await fetchBlob(uri);

            uploadBytes(userPhotos, blob).then((snapshot) => {
                console.log("Uploaded a blob");
                console.log(snapshot.metadata.fullPath);
                set(dataRef(db, 'users/' + user.uid + '/inventory/' + itemName), {
                    itemDescription: description,
                    imagePath: snapshot.metadata.fullPath,
                    name: itemName,
                })
            });

        } else {
            console.log("error user not signed in");
            console.log(user)
        }
}