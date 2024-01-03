export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            "Discord Guild Table": {
                Row: {
                    created_at: string | null
                    enabled_commands: string[] | null
                    id: string
                    name: string | null
                }
                Insert: {
                    created_at?: string | null
                    enabled_commands?: string[] | null
                    id: string
                    name?: string | null
                }
                Update: {
                    created_at?: string | null
                    enabled_commands?: string[] | null
                    id?: string
                    name?: string | null
                }
                Relationships: []
            }
            FleetOverviewChannel: {
                Row: {
                    active: boolean
                    channel_id: string
                    created_at: string
                    guild_id: string
                    message_id: string
                }
                Insert: {
                    active?: boolean
                    channel_id: string
                    created_at?: string
                    guild_id: string
                    message_id: string
                }
                Update: {
                    active?: boolean
                    channel_id?: string
                    created_at?: string
                    guild_id?: string
                    message_id?: string
                }
                Relationships: []
            }
            GameInfo: {
                Row: {
                    created_at: string
                    description: string | null
                    game_url: string
                    id: number
                    image_url: string | null
                    name: string
                    updated_at: string
                }
                Insert: {
                    created_at?: string
                    description?: string | null
                    game_url: string
                    id?: number
                    image_url?: string | null
                    name: string
                    updated_at?: string
                }
                Update: {
                    created_at?: string
                    description?: string | null
                    game_url?: string
                    id?: number
                    image_url?: string | null
                    name?: string
                    updated_at?: string
                }
                Relationships: []
            }
            GameList: {
                Row: {
                    created_at: string
                    id: number
                    proposed_by: number | null
                }
                Insert: {
                    created_at?: string
                    id?: number
                    proposed_by?: number | null
                }
                Update: {
                    created_at?: string
                    id?: number
                    proposed_by?: number | null
                }
                Relationships: []
            }
            GameRating: {
                Row: {
                    created_at: string
                    game: number
                    id: number
                    rating: number | null
                    user: string
                }
                Insert: {
                    created_at?: string
                    game: number
                    id?: number
                    rating?: number | null
                    user?: string
                }
                Update: {
                    created_at?: string
                    game?: number
                    id?: number
                    rating?: number | null
                    user?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "GameRating_game_fkey"
                        columns: ["game"]
                        isOneToOne: false
                        referencedRelation: "GameInfo"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "GameRating_user_fkey"
                        columns: ["user"]
                        isOneToOne: false
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            Items: {
                Row: {
                    classification: string | null
                    created_at: string
                    grade: number | null
                    id: string
                    itemName: string
                    manufacturer: string | null
                    name: string | null
                    size: number | null
                    subType: string | null
                    type: string | null
                }
                Insert: {
                    classification?: string | null
                    created_at?: string
                    grade?: number | null
                    id?: string
                    itemName: string
                    manufacturer?: string | null
                    name?: string | null
                    size?: number | null
                    subType?: string | null
                    type?: string | null
                }
                Update: {
                    classification?: string | null
                    created_at?: string
                    grade?: number | null
                    id?: string
                    itemName?: string
                    manufacturer?: string | null
                    name?: string | null
                    size?: number | null
                    subType?: string | null
                    type?: string | null
                }
                Relationships: []
            }
            "Order Table": {
                Row: {
                    active: boolean
                    created_at: string
                    id: number
                    item: string
                    message_id: string | null
                    price: number
                    seller_discord_id: string
                    stock: number
                    type: Database["public"]["Enums"]["order_type"] | null
                }
                Insert: {
                    active?: boolean
                    created_at?: string
                    id?: number
                    item: string
                    message_id?: string | null
                    price: number
                    seller_discord_id: string
                    stock: number
                    type?: Database["public"]["Enums"]["order_type"] | null
                }
                Update: {
                    active?: boolean
                    created_at?: string
                    id?: number
                    item?: string
                    message_id?: string | null
                    price?: number
                    seller_discord_id?: string
                    stock?: number
                    type?: Database["public"]["Enums"]["order_type"] | null
                }
                Relationships: []
            }
            Ships: {
                Row: {
                    created_at: string
                    id: string
                    implemented: boolean
                    maxCrew: number
                    minCrew: number
                    name: string
                    role: string | null
                    scu: number
                }
                Insert: {
                    created_at?: string
                    id: string
                    implemented: boolean
                    maxCrew?: number
                    minCrew?: number
                    name: string
                    role?: string | null
                    scu?: number
                }
                Update: {
                    created_at?: string
                    id?: string
                    implemented?: boolean
                    maxCrew?: number
                    minCrew?: number
                    name?: string
                    role?: string | null
                    scu?: number
                }
                Relationships: []
            }
            User: {
                Row: {
                    created_at: string
                    discord_displayname: string | null
                    discord_uid: string
                    org_member: boolean
                    rsi_handle: string | null
                    rsi_verified: boolean
                    Ships: string[] | null
                }
                Insert: {
                    created_at?: string
                    discord_displayname?: string | null
                    discord_uid: string
                    org_member?: boolean
                    rsi_handle?: string | null
                    rsi_verified?: boolean
                    Ships?: string[] | null
                }
                Update: {
                    created_at?: string
                    discord_displayname?: string | null
                    discord_uid?: string
                    org_member?: boolean
                    rsi_handle?: string | null
                    rsi_verified?: boolean
                    Ships?: string[] | null
                }
                Relationships: []
            }
            "Voice Manager Hubs Table": {
                Row: {
                    created_at: string | null
                    defaultNameTemplate: string | null
                    guildId: string | null
                    hubId: string
                    ownerEditPermissions: boolean | null
                    permittedRoles: string[] | null
                    voiceChannelCount: number
                }
                Insert: {
                    created_at?: string | null
                    defaultNameTemplate?: string | null
                    guildId?: string | null
                    hubId: string
                    ownerEditPermissions?: boolean | null
                    permittedRoles?: string[] | null
                    voiceChannelCount?: number
                }
                Update: {
                    created_at?: string | null
                    defaultNameTemplate?: string | null
                    guildId?: string | null
                    hubId?: string
                    ownerEditPermissions?: boolean | null
                    permittedRoles?: string[] | null
                    voiceChannelCount?: number
                }
                Relationships: [
                    {
                        foreignKeyName: "Voice Manager Hubs Table_guildId_fkey"
                        columns: ["guildId"]
                        isOneToOne: false
                        referencedRelation: "Discord Guild Table"
                        referencedColumns: ["id"]
                    }
                ]
            }
            "Voice Manager Voice Channel Table": {
                Row: {
                    created_at: string | null
                    guildId: string | null
                    hubId: string
                    ownerId: string
                    voiceId: string
                }
                Insert: {
                    created_at?: string | null
                    guildId?: string | null
                    hubId: string
                    ownerId: string
                    voiceId: string
                }
                Update: {
                    created_at?: string | null
                    guildId?: string | null
                    hubId?: string
                    ownerId?: string
                    voiceId?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "Voice Manager Voice Channel Table_guildId_fkey"
                        columns: ["guildId"]
                        isOneToOne: false
                        referencedRelation: "Discord Guild Table"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "Voice Manager Voice Channel Table_hubId_fkey"
                        columns: ["hubId"]
                        isOneToOne: false
                        referencedRelation: "Voice Manager Hubs Table"
                        referencedColumns: ["hubId"]
                    }
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            get_user_authority_level: {
                Args: {
                    uid: string
                }
                Returns: number
            }
            hnswhandler: {
                Args: {
                    "": unknown
                }
                Returns: unknown
            }
            ivfflathandler: {
                Args: {
                    "": unknown
                }
                Returns: unknown
            }
            vector_avg: {
                Args: {
                    "": number[]
                }
                Returns: string
            }
            vector_dims: {
                Args: {
                    "": string
                }
                Returns: number
            }
            vector_norm: {
                Args: {
                    "": string
                }
                Returns: number
            }
            vector_out: {
                Args: {
                    "": string
                }
                Returns: unknown
            }
            vector_send: {
                Args: {
                    "": string
                }
                Returns: string
            }
            vector_typmod_in: {
                Args: {
                    "": unknown[]
                }
                Returns: number
            }
        }
        Enums: {
            order_type: "Sell" | "Buy"
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

export type Tables<
    PublicTableNameOrOptions extends
            | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
            Database[PublicTableNameOrOptions["schema"]]["Views"])
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
            Row: infer R
        }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
            Database["public"]["Views"])
        ? (Database["public"]["Tables"] &
            Database["public"]["Views"])[PublicTableNameOrOptions] extends {
                Row: infer R
            }
            ? R
            : never
        : never

export type TablesInsert<
    PublicTableNameOrOptions extends
            | keyof Database["public"]["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
            Insert: infer I
        }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
        ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
                Insert: infer I
            }
            ? I
            : never
        : never

export type TablesUpdate<
    PublicTableNameOrOptions extends
            | keyof Database["public"]["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
            Update: infer U
        }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
        ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
                Update: infer U
            }
            ? U
            : never
        : never

export type Enums<
    PublicEnumNameOrOptions extends
            | keyof Database["public"]["Enums"]
        | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
        : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
        ? Database["public"]["Enums"][PublicEnumNameOrOptions]
        : never
