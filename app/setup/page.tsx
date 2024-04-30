'use client'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { redirect } from 'next/navigation';
import { create_user, user_exists } from '../lib/db/action';
import { useEffect, useState } from 'react';

function SetUpPage() {
  const { user, isLoading } = useUser()
  const token = user?.token;

  const [error, setError]  = useState(false)


  if (token != '') {
    redirect('/my-blogs')
  }


  const external = user?.sub ? user.sub.split("|")[1] : "";
  const username = user?.name ? user.name : "User"

  useEffect(() => {
    const success = create_user(external, username)

    if(!success){
      setError(true)

      return
    }

    user.token = user_exists(external)
    redirect('/my-blogs')

    
  }, []);

  return (
    <>
      {!isLoading &&
        <div>Seting Up your account</div>
      }
      {error &&
        <div>Something went wrong</div>
      }
    </>
  )
}

export default withPageAuthRequired(SetUpPage, {
  onRedirecting: () => <div></div>,
  onError: error => <div></div>
});