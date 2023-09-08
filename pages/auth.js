import AuthForm from '../components/auth/auth-form';
import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";
import {useRouter} from "next/router";


function AuthPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function get() {
      const session = await getSession();

      if (session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    }
    get();
  }, [router]);

  if (isLoading) {
    return <p>loading...</p>;
  }else{
  return (<AuthForm />)
  }
}

export default AuthPage;
