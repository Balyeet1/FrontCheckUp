import { getSession } from '@auth0/nextjs-auth0';
import Image from 'next/image';


export default async function ProfileServer() {
  const session = await getSession();
  const user = session?.user;

  return (
    user && (
      <div className='flex pt-5'>
        <Image src={user.picture} alt={user.name} width={75} height={75} className='w-auto h-auto'/>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
}