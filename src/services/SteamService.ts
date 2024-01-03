import {getCurrentUserId, supabase} from "./SupabaseService.ts";
import {EnrichedGameInformation, GameInformation} from "../models/GameInformation.ts";


function getEmptyEnrichedData(GameInformations: GameInformation[]) {
    return GameInformations.map((gameInfo: GameInformation) => {
        return {
            ...gameInfo,
            overall_rating: -1,
            personal_rating: -1,
        }
    });
}

function getOverallRating(relatedRatings: { rating: number | null }[] ) {
    return relatedRatings.reduce((acc: number, rating) => {
        return acc + rating.rating!;
    }, 0) / relatedRatings.length;
}

function getEnrichedData(ratings: { rating: number | null, game: number, user: string }[], gameInfo: GameInformation, userId: string) {
    const relatedRatings = ratings.filter((rating) => rating.game === gameInfo.id);

    let overall_rating = getOverallRating(relatedRatings);

    if (relatedRatings.length === 0) overall_rating = -1;

    let personal_rating = relatedRatings.find((rating) => rating.user === userId)?.rating;

    if (personal_rating === undefined || personal_rating === null) personal_rating = -1;

    return {
        ...gameInfo,
        overall_rating,
        personal_rating,
    }
}

export async function getGameInformations(): Promise<EnrichedGameInformation[]> {
    const GameInformations  = (await supabase.from("GameInfo").select("*")).data as GameInformation[];

    if(!GameInformations) return [];

    const {data: ratings} = await supabase.from("GameRating").select("*");

    if(!ratings) return getEmptyEnrichedData(GameInformations as GameInformation[]);

    const userId =  await getCurrentUserId() ?? "";

    const enrichedData: EnrichedGameInformation[] = GameInformations.map((gameInfo: GameInformation) => getEnrichedData(ratings, gameInfo, userId));

    return enrichedData.sort((a, b) => b.overall_rating - a.overall_rating);
}

export async function getGameInformation(id: number): Promise<EnrichedGameInformation | null> {
    const { data} = await supabase.from("GameInfo").select("*").eq("id", id);

    if(!data) return null;

    const GameInformation = data[0] as GameInformation;

    const {data: ratings} = await supabase.from("GameRating").select("*").eq("game", id);

    if(!ratings) return getEmptyEnrichedData([GameInformation])[0];

    const userId =  await getCurrentUserId() ?? "";

    return getEnrichedData(ratings, GameInformation, userId);
}