const styles = {
  sidebar: {
    width: "100px",
    bgcolor: "#0b5b97",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    py: 2,
    ml: "10px",
    my: "15px",
  },

  sidebarLogo: { width: 60, height: 60, objectFit: "contain" },

  sidebarList: {
    width: "100%",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  sidebarItem: (active) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    py: 1.5,
    borderRadius: active ? "20px 0px 0px 20px" : "0px",
    bgcolor: active ? "white" : "transparent",
    color: active ? "#0b5b97" : "white",
    ml: active ? "8px" : "0px",
    "&:hover": { bgcolor: active ? "white" : "rgba(255,255,255,0.2)" },
    cursor: "pointer",
  }),

  settingsItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    py: 1.5,
    mx: "5px",
    color: "white",
    "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
    cursor: "pointer",
  },

  divider: { width: "80%", bgcolor: "rgba(255,255,255,0.3)", mb: 2 },

  listItemText: {
    textAlign: "center",
    fontSize: "11px",
    "& span": { fontSize: "11px" },
  },
};

export default styles;
