"use client";

import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

//drawer elements used
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import cardsConfig from "@/utils/cardsConfig";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

//search as JSX

interface ISideMenuProps {
  router: AppRouterInstance;
}

const SideMenu: React.FC<ISideMenuProps> = ({ router }) => {
  /*
  react useState hook to save the current open/close state of the drawer,
  normally variables dissapear afte the function was executed
  */
  const [open, setState] = useState(false);

  /*
  function that is being called every time the drawer should open or close,
  the keys tab and shift are excluded so the user can focus between
  the elements with the keys
  */
  //@ts-ignore
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    //changes the function state according to the value of open
    setState(open);
  };

  return (
    <AppBar
      position="static"
      style={{
        background:
          "linear-gradient(180deg, #009aac, #00be83 100%,#fff 0,#fff)",
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
            English for kids
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default SideMenu;
