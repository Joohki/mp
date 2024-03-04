import UserProfile from "../components/profile/UserProfile";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import {useEffect,useState} from 'react'
import Loader from "@/components/ui/Loader";
import {useRouter} from 'next/router'
function ProfilePage() {

  return (<UserProfile/>)
  
 
}
export async function getServerSideProps(context:GetServerSidePropsContext) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      
      redirect:{
        destination:'/auth',
        permanent:true
      }
    };
  }
  return {
    props:{session}
  }
}
export default ProfilePage;
