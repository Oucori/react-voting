import {GameInformation} from "../models/GameInformation.ts";
import axios from "axios";

const steamUrl = "https://store.steampowered.com/api/appdetails?appids=";

const GameIds = [1086940, 427520, 1966720]

export async function getGameInformations(): Promise<GameInformation[]> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
        const axiosInstance = axios.create();

        const GameInformations: GameInformation[] = [];
        for (const gameId of GameIds) {
            const html = (await axiosInstance.get(steamUrl + gameId)).data;
            const gameData = html[gameId].data;

            const GameInformation: GameInformation = {
                id: gameId,
                name: gameData["name"],
                image_url: gameData["header_image"],
                description: gameData["short_description"],
                game_url: "https://store.steampowered.com/app/" + gameId,
            }

            console.log(GameInformation)

            GameInformations.push(GameInformation);
        }
        resolve(GameInformations);
    });
}