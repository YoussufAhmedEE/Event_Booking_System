import { Dialog, DialogTitle, DialogContent, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

const CongratsDialog = ({ open, handleClose }) => {
  const [width, height] = useWindowSize();

  return (
<>
    {open && <Confetti width={width} height={height} numberOfPieces={300} recycle={false} />}

    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth >

      {/* Confetti Effect */}
      

      <DialogTitle>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          style={{ textAlign: "center", fontSize: "28px", fontWeight: "bold", color: "#2196f3" }}
        >
          🎉 Congratulations! 🎉
        </motion.div>
      </DialogTitle>

      <DialogContent sx={{ textAlign: "center", overflow: "hidden" }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <Typography variant="h6" sx={{ mb: 3 }}>
            You have successfully booked your spot for the event!
          </Typography>

          <Button variant="contained" color="primary" onClick={handleClose}>
             Let's Go!
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default CongratsDialog;
