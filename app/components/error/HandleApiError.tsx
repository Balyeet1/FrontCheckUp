"use client"
import LogoutUser from "../Logout";
import { SERVER_DOWN, TOKEN_EXPIRED } from "@/app/lib/errors/apiErrorMessages";

const HandleApiError = ({ errorMessage }: { errorMessage: string }) => {
    switch (errorMessage) {
        case TOKEN_EXPIRED:
        case SERVER_DOWN:
            return <LogoutUser />;
        default:
            return <div>Something went wrong. Please try again later.</div>;
    }

};

export default HandleApiError;