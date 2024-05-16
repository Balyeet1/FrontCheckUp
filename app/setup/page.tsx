'use client'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { create_user, user_exists } from '../lib/db/user_api_action';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function SetUpPage({ req, res }: { req: any, res: any }) {
  const { user, isLoading } = useUser()
  const token = user?.token;
  const router = useRouter()

  const [error, setError] = useState(false)


  if (token != '') {
    router.push('/my-blogs')
  }


  const external = user?.sub ? user.sub.split("|")[1] : "";
  const username = user?.name ? user.name : "User"

  useEffect(() => {
    const success = create_user(external, username)

    if (!success) {
      setError(true)

      return
    }

    const get_user_token = async () => {

      const token = await user_exists(external)

      if (token == "") {
        setError(true)
        return
      }

      router.push('/my-blogs')
    }

    get_user_token()

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