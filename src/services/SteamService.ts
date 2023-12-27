import {supabase} from "./SupabaseService.ts";
import {EnrichedGameInformation, GameInformation} from "../models/GameInformation.ts";


export async function getGameInformations(): Promise<EnrichedGameInformation[]> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
        const { data} = await supabase.from("GameInfo").select("*");

        if(!data) return resolve([]);

        const GameInformations = data as GameInformation[];

        const {data: ratings} = await supabase.from("GameRating").select("*");

        console.log("Logging Ratings: ")
        console.log(ratings)

        if(!ratings) {
            const enrichedData: EnrichedGameInformation[] = GameInformations.map((gameInfo: GameInformation) => {
                return {
                    ...gameInfo,
                    overall_rating: 0,
                    personal_rating: 0,
                }
            });
            return resolve(enrichedData);
        } else {
            const userId = (await supabase.auth.getSession() ).data.session?.user.id ?? "";

            const enrichedData: EnrichedGameInformation[] = GameInformations.map((gameInfo: GameInformation) => {
                const overall_rating = ratings.reduce((acc: number, rating) => {
                    if(rating.game === gameInfo.id) {
                        if(!rating.rating) return acc;
                        return acc + rating.rating ?? 0;
                    }
                    return acc;
                }, 0) / ratings.length;

                return {
                    ...gameInfo,
                    overall_rating,
                    personal_rating: ratings.find((rating) => rating.game === gameInfo.id && rating.user === userId)?.rating || 0,
                }
            });

            console.log("Logging Enriched Data: ")
            console.log(enrichedData);

            return resolve(enrichedData.sort((a, b) => b.overall_rating - a.overall_rating));
        }
    });
}