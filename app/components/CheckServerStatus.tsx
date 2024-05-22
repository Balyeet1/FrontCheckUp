import { checkServerStatus } from '@/app/lib/db/BackServer_api/api';
import { getSession } from '@auth0/nextjs-auth0';
import LogoutUser from './Logout';


const CheckServerStatus: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
    const isServerDown = checkServerStatus();
    let session = null;

    try {
        session = await getSession();
    } catch (error) {
        console.error(error);
    }

    if (!isServerDown) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <h1>Server is currently down for maintenance</h1>
                <p>Please try again later.</p>
                {session && <LogoutUser />}
            </div>
        );
    }

    return <>{children}</>;
};

export default CheckServerStatus;