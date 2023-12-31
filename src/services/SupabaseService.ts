import {createClient, Session} from "@supabase/supabase-js";
import {DiscordUserData} from "../models/User.ts";
import {Database} from "../models/Supabase.ts";

export const supabase = createClient<Database>('https://rlwucxrcbtyqrssqlcnq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTc1NTg0NSwiZXhwIjoxOTU1MzMxODQ1fQ.EK29ds3CcqRIaE8A84WwdFn3E6mePXeCRxaBESzDX_I')

export function getDiscordUserFromSession(session: Session) {
    return session.user.user_metadata as DiscordUserData;
}

export async function getCurrentUserId() {
    return (await supabase.auth.getSession()).data.session?.user.id;
}