import UserProfile from "../components/profile/UserProfile";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

function ProfilePage(props) {
console.log(props.session)
  return (<UserProfile/>)
  
 
}
export async function getServerSideProps(context:GetServerSidePropsContext) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      
      redirect:{
        destination:'/auth',
        permanent:false
      }
    };
  }
  return {
    props:{session}
  }
}
export default ProfilePage;
