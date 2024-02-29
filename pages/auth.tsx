import AuthForm from '../components/auth/AuthForm';
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {useRouter} from "next/router";
import Loader from '../components/ui/Loader'

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
    return <Loader/>;
  }else{
  return (<AuthForm />)
  }
}

export default AuthPage;
