import {
    Badge,
    Button,
    Card, CardContent,
    CardMedia, Slider, Toolbar,
    Typography
} from "@mui/material";
import {useState} from "react";
import {EnrichedGameInformation} from "../../models/GameInformation.ts";
import SendIcon from '@mui/icons-material/Send';
import {supabase} from "../../services/SupabaseService.ts";
import {getGameInformation} from "../../services/SteamService.ts";

const RatingMap = new Map<number, {
    display: string,
    color: "success" | "warning" | "info" | "error"
}>([
    [0, {
        display: "Hard Pass",
        color: "error"
    }],
    [1, {
        display: "Nah",
        color: "warning"
    }],
    [2, {
        display: "Nah / Okay",
        color: "warning"
    }],
    [3, {
        display: "Okay",
        color: "info"
    }],
    [4, {
        display: "Okay / Good",
        color: "info"
    }],
    [5, {
        display: "Almost Good",
        color: "success"
    }],
    [6, {
        display: "Good",
        color: "success"
    }],
    [7, {
        display: "Good / Hype!",
        color: "success"
    }],
    [8, {
        display: "Hype!",
        color: "success"
    }],
])

const marks = [
    {
        value: 0,
        label: RatingMap.get(0)?.display,
    },
    {
        value: 1,
        label: RatingMap.get(1)?.display,
    },
    {
        value: 3,
        label: RatingMap.get(3)?.display,
    },
    {
        value: 6,
        label: RatingMap.get(6)?.display,
    },
    {
        value: 8,
        label: RatingMap.get(8)?.display,
    },
];

type EntryCardProps = {
    GameInformation: EnrichedGameInformation,
    editable?: boolean,
}

function EntryCard(props: EntryCardProps) {
    const [gameInformation, setGameInformation] = useState<EnrichedGameInformation>(props.GameInformation)
    const [rating, setRating] = useState<number>(props.GameInformation.personal_rating ?? 0)
    const handleRatingChange = (_event: Event, newValue: number | number[]) => {
        setRating(newValue as number);
    };

    function handleVote() {
        supabase.from('GameRating').upsert({
            game: props.GameInformation.id,
            rating: rating,
        }).then((result) => {
            if(result.error) return console.error(result.error);

            UpdateCard();
            console.log(`Voted ${rating} for ${props.GameInformation.name}`)
        })

    }

    function UpdateCard() {
        getGameInformation(props.GameInformation.id).then((result) => {
            if(result) setGameInformation(result)
        });
    }


    return (
        <div>
            <Badge hidden={gameInformation.overall_rating < 0} badgeContent={RatingMap.get(gameInformation.overall_rating)?.display} color={RatingMap.get(gameInformation.overall_rating)?.color}>
                <Card sx={{minWidth: 275}}>

                    <CardMedia
                        sx={{height: 240}}
                        image={gameInformation.image_url}
                        title={gameInformation.name}
                    />
                    <CardContent style={{overflow: "hidden", textOverflow: "ellipsis", width: '45rem'}}>
                        <Typography gutterBottom variant="h5" component="div">
                            {gameInformation.name} ({gameInformation.id})
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {gameInformation.description}
                        </Typography>
                        <div style={{margin: "30px"}}>
                            <Slider
                                marks={marks}
                                max={8}
                                min={0}
                                value={rating}
                                onChange={handleRatingChange}
                                size="medium"
                            />
                        </div>
                    </CardContent>
                    <Toolbar sx={{ justifyContent: "space-between" }}>
                        <Button href={gameInformation.game_url} size="small">Learn More</Button>
                        <Badge
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            hidden={gameInformation.personal_rating < 0}
                            badgeContent={RatingMap.get(gameInformation.personal_rating)?.display}
                            color={RatingMap.get(gameInformation.personal_rating)?.color}
                        >
                            <Button variant="contained" onClick={handleVote} endIcon={<SendIcon />}>
                                Vote
                            </Button>
                        </Badge>
                    </Toolbar>
                </Card>
            </Badge>

            <br/>
            <br/>
        </div>
    );
}

export default EntryCard;