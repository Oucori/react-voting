import './App.css'
import {useEffect, useState} from "react";
import {EnrichedGameInformation} from "./models/GameInformation.ts";
import {getGameInformations} from "./services/SteamService.ts";
import EntryCard from "./components/entry-card/EntryCard.tsx";
import {Session} from '@supabase/supabase-js';
import {Button} from "@mui/material";
import {getDiscordUserFromSession, supabase} from "./services/SupabaseService.ts";

function App() {

    const [gameInformation, setGameInformation] = useState<EnrichedGameInformation[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [session, setSession] = useState<Session>();

    function handleLogin() {
        supabase.auth.signInWithOAuth({
            provider: 'discord',
        }).then(() => {
            supabase.auth.getSession().then((session) => {
                if(session.data.session) {
                    setSession(session.data.session);
                    setIsLoggedIn(true);
                }
            });
        })
    }

    function handleLogout() {
        supabase.auth.signOut().then(() => {
            setIsLoggedIn(false);
        })
    }

    useEffect(() => {
        console.log("UseEffect [ isLoggedIn ]");
        supabase.auth.getSession().then((session) => {
            if(!session.data.session) {
                handleLogin();
            } else {
                setIsLoggedIn(true);
                setSession(session.data.session);
            }
        }).catch(handleLogin)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [!isLoggedIn]);

    useEffect(() => {
        console.log("UseEffect [ gameInformation ]");
        getGameInformations().then(d=> { setGameInformation(d) })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn && !gameInformation]);

    return (
    <>
        <div>
            { isLoggedIn && <>
                <h1>Welcome {getDiscordUserFromSession(session!).custom_claims.global_name}!</h1>
                <Button onClick={handleLogout}>Sign Out</Button>
            </>}

            { gameInformation.map((game) => (
                <div key={game.name}>
                    <EntryCard GameInformation={game} />
                </div>
            ))}
        </div>
    </>
  )
}

export default App
