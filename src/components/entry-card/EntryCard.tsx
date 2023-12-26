import {
    Button,
    Card, CardActions, CardContent,
    CardMedia, Slider,
    Typography
} from "@mui/material";
import {useState} from "react";
import {GameInformation} from "../../models/GameInformation.ts";


const marks = [
    {
        value: 0,
        label: 'Hard Pass',
    },
    {
        value: 2,
        label: 'Nah',
    },
    {
        value: 4,
        label: 'Mid',
    },
    {
        value: 6,
        label: 'Good',
    },
    {
        value: 8,
        label: 'Hype!',
    },
];

type EntryCardProps = {
    GameInformation: GameInformation,
    editable?: boolean,
    rating?: number,
}

function EntryCard(props: EntryCardProps) {
    const [rating, setRating] = useState<number>(props.rating ?? 0)

    const handleRatingChange = (_event: Event, newValue: number | number[]) => {
        setRating(newValue as number);
    };

    return (
        <div>
            <Card sx={{ minWidth: 275 }}>
                <CardMedia
                    sx={{ height: 240 }}
                    image={props.GameInformation.image_url}
                    title={props.GameInformation.name}
                />
                <CardContent style={{overflow: "hidden", textOverflow: "ellipsis", width: '45rem'}}>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.GameInformation.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.GameInformation.description}
                    </Typography>
                    <div style={{margin: "30px"}} >
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
                <CardActions>
                    <Button href={props.GameInformation.game_url} size="small">Learn More</Button>
                </CardActions>
            </Card>
            <br />
            <br />
        </div>
    );
}

export default EntryCard;