import { useEffect } from 'react'
import AuthBase from './AuthBase'
import Storage from './Storage'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

export default function App() {

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.displayName;
                alert(user.displayName)
                console.log(user.displayName);
            } else {
                alert("no user")
            }
        });
    }, [])


    return (
        <div>
            <Storage />
            <AuthBase />
        </div>
    )
}
