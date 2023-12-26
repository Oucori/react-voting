export type SupabaseUser = {
    id:                 string;
    aud:                string;
    role:               string;
    email:              string;
    email_confirmed_at: Date;
    phone:              string;
    confirmed_at:       Date;
    last_sign_in_at:    Date;
    app_metadata:       AppMetadata;
    user_metadata:      DiscordUserData;
    identities:         Identity[];
    created_at:         Date;
    updated_at:         Date;
}

export type AppMetadata = {
    provider:  string;
    providers: string[];
}

export type Identity = {
    identity_id:     string;
    id:              string;
    user_id:         string;
    identity_data:   DiscordUserData;
    provider:        string;
    last_sign_in_at: Date;
    created_at:      Date;
    updated_at:      Date;
    email:           string;
}

export type DiscordUserData = {
    avatar_url:     string;
    custom_claims:  CustomClaims;
    email:          string;
    email_verified: boolean;
    full_name:      string;
    iss:            string;
    name:           string;
    phone_verified: boolean;
    picture:        string;
    provider_id:    string;
    sub:            string;
}

export type CustomClaims = {
    global_name: string;
}
