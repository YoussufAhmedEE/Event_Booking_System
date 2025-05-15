import { Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";

const EventCard = ({ event, onClick }) => {
  const imageUrl = event.EventImages && event.EventImages.length > 0
    ? event.EventImages[0].imageUrl
    : 'https://via.placeholder.com/400x200?text=No+Image';

  return (
    
    <Card sx={
      { maxWidth: 345, borderRadius: 3, boxShadow: 3,
          cursor: 'pointer',
                transition: 'transform 0.3s ease',
                '&:hover': {
                    transform: 'scale(1.1)',
                }, }
      
      }>
      <CardActionArea onClick={() => onClick(event)}>
        <CardMedia
          component="img"
          height="180"
          image={imageUrl}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {event.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EventCard;
