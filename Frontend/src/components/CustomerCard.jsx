import { Card, CardContent, Typography, Box } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const CustomerCard = ({ user }) => {
  if (!user) return null;

  return (
    <Card sx={{ maxWidth: 400, m: 2, borderRadius: 3, boxShadow: 4,
      cursor: 'pointer',
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'scale(1.1)',
      }, }}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <PersonIcon fontSize="large" color="primary" />
          <Typography variant="h5" fontWeight={600}>
            {user.firstName} {user.lastName}
          </Typography>
        </Box>

        <Typography variant="body1" color="text.secondary">
          <strong>ID:</strong> {user.id}
        </Typography>

        <Typography variant="body1" color="text.secondary">
          <strong>Email:</strong> {user.email}
        </Typography>
        {user.phoneNumber && (
          <Typography variant="body1" color="text.secondary">
            <strong>Phone:</strong> {user.phoneNumber}
          </Typography>
        )}
        {user.gender && (
          <Typography variant="body1" color="text.secondary">
            <strong>Gender:</strong> {user.gender}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerCard;
