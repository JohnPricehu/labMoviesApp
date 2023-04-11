import { createContext, useState, useEffect } from 'react';
import supabase from '../supabaseClient';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleSession = (event, session) => {
      setUser(session?.user ?? null);
    };
  
    // Listening for authentication status changes
    const { data: authListener } = supabase.auth.onAuthStateChange(handleSession);
  
    // Initialising user sessions
    handleSession(null, () => supabase.auth.session());
  
    return () => {
      authListener.unsubscribe();
    };
  }, []);
  

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
