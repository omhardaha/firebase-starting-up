import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot, query, where } from "firebase/firestore";

function AuthBase() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookie] = useCookies(['user']);
    const connectionRef = collection(db, "users")
    const ageQuery = query(connectionRef, where("born", "<", 100))

    useEffect(() => {
        // onSnapshot(connectionRef,(data)=>{ // All data
        //     console.log(data.docs);
        // })
        onSnapshot(ageQuery, (data) => { // only ageQuery Data
            console.log(data.docs);
        })
    })

    const signUp = async () => {
        console.log(email, password);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    const signIn = async () => {
        console.log(email, password);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setCookie("user", user, {
                    path: "/"
                });
                console.log(user);
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    };

    const signInWithGooglePopUp = async () => {
        const provider = new GoogleAuthProvider();
        console.log(email, password);
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log(user);
                setCookie("user", user, {
                    path: "/"
                });

            }).catch((error) => {
                console.log(error);
            });
    };

    const storeData = async () => {
        console.log(email, password);
        try {
            const docRef = await addDoc(connectionRef, {
                first: "Ada gf",
                last: "Lovelace",
                born: 1815
            });
            console.log("Document written with ID: ", docRef);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const showData = () => {
        getDocs(connectionRef).then((response) => {
            console.log(response);
        })
    };

    const updateData = () => {
        const docToUpdate = doc(db, 'users', '30TPgeoTuBPwosSRA3Tx')

        updateDoc(docToUpdate, {
            first: "Adsa f",
            last: "Loveflace",
            born: 1815,
            bforn: 1815
        }).then(() => {
            alert("data Updated")
        }).catch((error) => {
            alert(error.message)
        })
    };

    const deleteData = () => {
        const docToUpdate = doc(db, 'users', '30TPgeoTuBPwosSRA3Tx')

        deleteDoc(docToUpdate).then(() => {
            alert("data Deleted")
        }).catch((error) => {
            alert(error.message)
        })
    };

    return (
        <div>
            {cookies.user && <div> Email = {cookies.user.email}</div>}

            <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Email" />
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="text" placeholder="Password" />

            <button onClick={signUp}> SignUp</button>
            <button onClick={signIn}> SignIn</button>
            <button onClick={signInWithGooglePopUp}> pPopUpSignIn</button>
            <button onClick={storeData}> Store Data</button>
            <button onClick={showData}> Show Data</button>
            <button onClick={updateData}> Update Data</button>
            <button onClick={deleteData}> Delete Data </button>
        </div>
    );
}

export default AuthBase;
