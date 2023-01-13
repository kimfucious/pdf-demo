import { useEffect, useState } from "react";
import type { AuthUser } from "../types";

interface Payload {
    authUser: AuthUser | null | undefined;
    setAuthUser: (u: AuthUser) => void;
}
export default function useAuthUser(): Payload {
    const [authUser, setAuthUser] = useState<AuthUser | null | undefined>();
    const storedUser = localStorage.getItem("auth-user");

    useEffect(() => {
        if (storedUser) {
            // put in state
            console.log("Stored User");
        } else {
            console.log("No stored user");
        }
    }, [storedUser]);

    return { authUser, setAuthUser };
}
