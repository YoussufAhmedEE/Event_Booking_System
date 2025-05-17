const styles = {
  container: {
    display: "flex",
    height: "100vh",
    bgcolor: "#c8dded",
    overflow: "hidden",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  sidebar: {
    width: 100,
    bgcolor: "#1B0099",
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
    color: active ? "#1B0099" : "white",
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

  mainWrapper: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    mt: "15px",
    ml: "10px",
  },

  navbar: {
    background: "white",
    boxShadow: "none",
    borderBottom: "1px solid #ccc",
    p: 1,
    width: "calc(100% - 20px)",
  },

  navbarTitle: { color: "#1B0099", mr: 2 },

  searchWrapper: { flexGrow: 1, display: "flex", justifyContent: "center" },

  searchBox: {
    display: "flex",
    alignItems: "center",
    width: 600,
    p: "6px 12px",
    borderRadius: "20px",
    boxShadow: "none",
    border: "1px solid #ccc",
  },

  searchIcon: { color: "#888", mr: 1 },

  userGreeting: { color: "#555", mr: 2 },

  subSidebar: {
    width: 230,
    mt: "5px",
    bgcolor: "#F5F5F5",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    height: "calc(100% - 20px)",
    p: 2,
    boxShadow: "2px 0px 5px rgba(0,0,0,0.1)",
  },

  subSidebarItem: (active) => ({
    background: active
      ? "linear-gradient(to right, #1B0099, #4A00E0)"
      : "transparent",
    borderRadius: "10px 0px 0px 10px",
    color: active ? "white" : "black",
    transition: "background 0.3s ease",
    width: "215px",
    cursor: "pointer",
    my: "10px",
    "&:hover": {
      background: active
        ? "linear-gradient(to right, #1B0099, #4A00E0)"
        : "#e0e0e0",
    },
  }),

  mainContent: { flexGrow: 1, padding: 2, overflow: "auto", maxWidth: "100%" },

  divider: { width: "80%", bgcolor: "rgba(255,255,255,0.3)", mb: 2 },

  listItemText: {
    textAlign: "center",
    fontSize: "11px",
    "& span": { fontSize: "11px" },
  },
};

export default styles;
