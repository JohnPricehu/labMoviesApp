import { createContext, useState, useEffect } from 'react';
import supabase from '../supabaseClient';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleSession = (event, session) => {
      setUser(session?.user ?? null);
    };
  
    // 监听认证状态变化
    const { data: authListener } = supabase.auth.onAuthStateChange(handleSession);
  
    // 初始化用户会话
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
