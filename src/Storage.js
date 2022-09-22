import React from 'react'
import { useState } from "react";
import { useCookies } from 'react-cookie';
import { auth, db, storage } from "./firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function Storage() {

    const [data, setData] = useState();

    const uploadData = () => {
        console.log(data);
        const storageRef = ref(storage, data.name);
        const uploadTask = uploadBytesResumable(storageRef, data);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                alert(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                });
            }
        );
    };
    return (
        <div>
            <input type="file" onChange={(e) => setData(e.target.files[0])} />
            <button onClick={uploadData}> uploadData</button>
        </div>
    )
}
