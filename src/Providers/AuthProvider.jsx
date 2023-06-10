import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged,  signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import axios from "axios";


export const AuthContext = createContext();
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [ loading, setLoading ] =useState(true);

    const createUser = async (email, password,name,photo) => {
        setLoading(true);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, {
            displayName: name,
            photoURL:photo
          });
        await signOut(auth); // Signing out the user after successful registration
          
    }

   

    const logOut = () => {
        setLoading(true);
        localStorage.removeItem('access-token')
        return signOut(auth);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, loggedUser => {
            setUser(loggedUser);
            if(loggedUser?.email){
                axios.post('http://localhost:5000/jwt',{email:loggedUser?.email,})
                .then(data=>{
                    localStorage.setItem('access-token',data.data)
                    setLoading(false);
                })
            }
            else{
                localStorage.removeItem('access-token')
                setLoading(false);
            }
        })

        return () => {
            unsubscribe();
        }
    }, [])

    const authInfo ={
        user,
        loading,
        createUser,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;