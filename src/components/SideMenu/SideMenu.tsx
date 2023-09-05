"use client";

import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import cardsConfig from "@/utils/cardsConfig";
import { FormControlLabel, Switch } from "@mui/material";
import { useRouter } from "next/navigation";

interface ISideMenuProps {
  isGameMode?: boolean;
  toggleSwitch?: () => void;
}

const SideMenu: React.FC<ISideMenuProps> = ({ isGameMode, toggleSwitch }) => {
  const router = useRouter();

  const [open, setState] = useState(false);

  const background = Boolean(isGameMode)
    ? "linear-gradient(180deg,#fd6a63,#feb46b 100%,#fff 0,#fff)"
    : "linear-gradient(180deg, #009aac, #00be83 100%,#fff 0,#fff)";

  //@ts-ignore
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  return (
    <AppBar
      position="static"
      style={{
        background,
      }}
    >
      <Container maxWidth="xl" disableGutters={true}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            style={{ justifySelf: "flex-start" }}
            onClick={toggleDrawer(true)}
            sx={{
              mr: 2,
              display: "block",
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* The outside of the drawer */}
          <Drawer
            //from which side the drawer slides in
            anchor="left"
            //if open is true --> drawer is shown
            open={open}
            //function that is called when the drawer should close
            onClose={toggleDrawer(false)}
            //function that is called when the drawer should open
          >
            {/* The inside of the drawer */}
            <Box
              sx={{
                p: 2,
                height: 1,
                backgroundColor: "#dbc8ff",
              }}
            >
              {/* 
                  when clicking the icon it calls the function toggleDrawer 
                  and closes the drawer by setting the variable open to false
                  */}
              <IconButton sx={{ mb: 2 }} onClick={toggleDrawer(false)}>
                <CloseIcon />
              </IconButton>

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ mb: 2, minWidth: 200 }}>
                <ListItemButton onClick={() => router.replace(`/`)} key="Main">
                  <ListItemText primary="Main Page" />
                </ListItemButton>
                {cardsConfig.categories.map((category) => (
                  <ListItemButton
                    onClick={() => router.replace(`/category/${category.url}`)}
                    key={category.name}
                  >
                    <ListItemText primary={category.name} />
                  </ListItemButton>
                ))}
              </Box>
            </Box>
          </Drawer>

          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {isGameMode !== undefined ? (
              <FormControlLabel
                value="gameMode"
                control={<Switch color="primary" onClick={toggleSwitch} />}
                label="Game mode"
                labelPlacement="start"
              />
            ) : (
              <span>English For Kids</span>
            )}
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default SideMenu;
