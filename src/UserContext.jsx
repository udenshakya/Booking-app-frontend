import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({})

export function UserContextProvider({children}){
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    // useEffect(()=>{
    //     if(!user){
    //         axios.get('/profile').then(({data})=>{
    //             setUser(data)
    //         })
    //     }
    // },[])

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            if (!user) {
              const { data } = await axios.get('/profile');
              setUser(data);
              setReady(true)
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
      
        fetchUserData();
      }, []);
      

    return (
        <UserContext.Provider value={{user,setUser,ready}} >
            {children}
        </UserContext.Provider>
    )
}