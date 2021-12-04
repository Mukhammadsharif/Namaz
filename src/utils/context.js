import React, {createContext, useState } from "react";

export const MusicContext = createContext({})

export function GlobalProvider({ children }) {
    const [music, setMusic] = useState('first')
    return (
        <MusicContext.Provider value={{music, setMusic}}>
            {children}
        </MusicContext.Provider>
    )
}