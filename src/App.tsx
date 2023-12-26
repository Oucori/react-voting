import './App.css'
import {useEffect, useState} from "react";
import {GameInformation} from "./models/GameInformation.ts";
import {getGameInformations} from "./services/SteamService.ts";
import EntryCard from "./components/entry-card/EntryCard.tsx";
import {Session} from '@supabase/supabase-js';
import {Button} from "@mui/material";
import {getDiscordUserFromSession, supabase} from "./services/SupabaseService.ts";


function App() {

    const [gameInformation, setGameInformation] = useState<GameInformation[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [session, setSession] = useState<Session>();

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
    }, [!isLoggedIn]);



    function handleLogin() {
        supabase.auth.signInWithOAuth({
            provider: 'discord',
        }).then(response => {
            console.log(response.data);
            console.log("Logged in!");
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
