import { Card, CardActionArea, CardMedia, CardContent, Typography, Box } from "@mui/material";

const EventCard = ({ event, onClick }) => {
  const imageUrl = event.EventImages && event.EventImages.length > 0
    ? event.EventImages[0].imageUrl
    : 'https://via.placeholder.com/400x200?text=No+Image';

  const tagsToShow = event.Tags?.slice(0, 3) || [];

  return (
    <Card sx={{
      maxWidth: 345, borderRadius: 3, boxShadow: 3,
      cursor: 'pointer',
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'scale(1.1)',
      },
    }}>
      <CardActionArea onClick={() => onClick(event)}>
        <CardMedia
          component="img"
          height="180"
          width="331"
          image={imageUrl}
        />
        <CardContent>
          <Typography gutterBottom component="div">
            {event.name}
          </Typography>
          <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {tagsToShow.map((tag, idx) => (
              <Typography
                key={idx}
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: '0.75rem', background: '#eee', px: 1, borderRadius: 1 }}
              >
                #{tag.name}
              </Typography>
            ))}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EventCard;
