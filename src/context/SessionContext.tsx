"use client";
import { createContext, useContext } from "react";
import { Session } from "next-auth";

const SessionContext = createContext<Session | null>(null);

export const useAppSession = () => useContext(SessionContext);

export const SessionProviderCustom = ({
    session,
    children,
}: {
    session: Session | null;
    children: React.ReactNode;
}) => {
    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    );
};
