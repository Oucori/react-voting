export type GameInformation = {
    id: number
    name: string,
    image_url: string,
    description: string,
    game_url: string,
}

export type EnrichedGameInformation = GameInformation & {
    overall_rating: number,
    personal_rating: number,
}