import { authOption } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import React from "react";


const fromServer = async (role: string) => {
    try {
        const session = await getServerSession(authOption)
        const _role = session?.user?.role
        if (_role === role) {
            return true
        }

        return "false"
    } catch (err) {
        return false
    }
}

export function useAuth(role: string) {
    try {
      const [auth, setAuth] = React.useState<boolean>();
  
      const Verify = () => {
        const session: any = useSession();
        const _role = session?.data?.user?.role;
  
        if (_role === role) {
          return true;
        }
  
        return false;
      };
  
      setAuth(Verify())
  
      return auth;
    } catch (err) {
      return false;
    }
  }
  

useAuth.fromServer = fromServer;
