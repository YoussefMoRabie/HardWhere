import "./Navbar.css";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import MemoryOutlinedIcon from "@mui/icons-material/MemoryOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import GradeIcon from "@mui/icons-material/Grade";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Grid, List, ListItem, ListItemText } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useLocation, useSearchParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import { BiCaretLeft } from "react-icons/bi";

const useStyles = makeStyles({
  listBtn: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    background: "#f3f3f3",
  },
  Btn: {
    borderRadius: 50,
  },
  listText: {
    textAlign: "center",
  },
});
const theme = createTheme({
  typography: {
    fontFamily: "comfortaa",
  },
  palette: {
    primary: {
      main: "#efef18",
    },
    secondary: {
      main: "#251c57",
    },
  },
});

const Btntheme = createTheme({
  typography: {
    fontFamily: "comfortaa",
  },
  palette: {
    primary: {
      main: "#efef18",
    },
    secondary: {
      main: "#251c57",
    },
  },
  shape: {
    borderRadius: 50,
  },
});
const Navbar = (props) => {
  //cust_ssn
  const { state } = useLocation();
  console.log(state, "Home");
  const classes = useStyles();
  const navLinks = [
    {
      title: "Laptops",
      path: "/labtops",
    },
    {
      title: "Mobiles",
      path: "/mobiles",
    },
    {
      title: "Headphones",
      path: "/headphones",
    },
    {
      title: "Screens",
      path: "/screens",
    },
    {
      title: "Accessories",
      path: "/accessories",
    },
  ];
  const his = useNavigate();
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      his("/search/" + e.target.value);
    }
  };
  const handleCategoryClick = (lin) => {
    his(lin.path, { state: state });
  };
  const iscust = () => {
    return state == null || state.auth === "customer";
  };
  const isemp = () => {
    return state != null && state.auth !== "customer";
  };
  const top100Films = [];
  return (
    <ThemeProvider theme={theme}>
      {iscust() && (
        <div>
          <div className="header">
            <Grid container spacing={2} justifyContent={"space-between"}>
              <Grid item>
                <Link to="/" state={state}>
                  <Stack alignItems="center" direction={"row"}>
                    <MemoryOutlinedIcon
                      fontSize="large"
                      sx={{ color: "#251c57" }}
                    />
                    <span className="name">HardWhere</span>
                  </Stack>
                </Link>
              </Grid>

              <Grid item sm={5}>
                <Stack>
                  <Autocomplete
                    onKeyDown={handleKeyDown}
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    fullWidth={true}
                    sx={{
                      backgroundColor: "white",
                      borderRadius: 3,
                      "& input:hover": { boxShadow: "none" },
                    }}
                    options={top100Films.map((option) => option.title)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        margin="none"
                        placeholder="How can we help you..."
                        size="small"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& > fieldset": {
                              border: "none",
                              boxShadow: "none",
                            },
                          },
                        }}
                        InputProps={{
                          ...params.InputProps,
                          type: "search",
                        }}
                      />
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item sm={"auto"}>
                <div className="buttons">
                  <ThemeProvider theme={Btntheme}>
                    {!state && (
                      <Link to="/Signin" className="Link">
                        <Button
                          variant="contained"
                          color="primary"
                          endIcon={
                            <PermIdentityOutlinedIcon fontSize="inherit" />
                          }
                          sx={{
                            color: "#251c57",
                            fontWeight: "bold",
                            minWidth: 115,
                            backgroundColor: "transparent",
                          }}
                        >
                          Sign In
                        </Button>
                      </Link>
                    )}
                    {
                      // if no customer, no Cart
                      state && (
                        <>
                          <Link to="/Cart" className="Link" state={state}>
                            <Button
                              variant="contained"
                              color="primary"
                              endIcon={<ShoppingCartOutlinedIcon />}
                              sx={{
                                color: "#251c57",
                                fontWeight: "bold",
                                minWidth: 90,
                                backgroundColor: "transparent",
                              }}
                            >
                              Cart
                            </Button>
                          </Link>
                          <Link to="/wishlist" className="Link" state={state}>
                            <Button
                              variant="contained"
                              color="primary"
                              startIcon={<FavoriteIcon />}
                              sx={{
                                color: "#251c57",
                                fontWeight: "bold",
                                minWidth: 90,
                                backgroundColor: "transparent",
                              }}
                            >
                              WishList
                            </Button>
                          </Link>
                          <BiCaretLeft />

                          <Link to="/userpage" className="Link" state={state}>
                            <div>
                              {
                                <Avatar
                                  style={{
                                    display: "inline",
                                    padding: "5px",
                                    backgroundColor: "darkcyan",
                                  }}
                                >
                                  {state.f_name[0]}
                                </Avatar>
                              }{" "}
                              <span id="userName">
                                {state.f_name} {state.l_name}
                              </span>
                            </div>
                          </Link>
                          <Button
                            variant="contained"
                            color="primary"
                            endIcon={<LogoutIcon />}
                            onClick={(e) => {
                              window.localStorage.clear();
                              window.history.replaceState(null, null, "/");
                              his("/Signin");
                            }}
                            sx={{
                              color: "#251c57",
                              fontWeight: "bold",
                              minWidth: 90,
                              backgroundColor: "transparent",
                            }}
                          >
                            Log out
                          </Button>
                        </>
                      )
                    }
                  </ThemeProvider>
                </div>
              </Grid>
            </Grid>
          </div>
          <List
            className={classes.listBtn}
            sx={{
              padding: 0,
            }}
          >
            {navLinks.map((navLink) => (
              <ListItem
                onClick={(e) => {
                  handleCategoryClick(navLink);
                }}
                key={navLink.title}
                sx={{ borderRadius: 10 }}
                className={classes.Btn}
                button
              >
                <ListItemText
                  className={classes.listText}
                  primary={navLink.title}
                />
              </ListItem>
            ))}
          </List>
        </div>
      )}
      {isemp() && (
        <div>
          <div className="header">
            <Grid item>
              <Link to="/" state={state}>
                <Stack alignItems="center" direction={"row"}>
                  <MemoryOutlinedIcon
                    fontSize="large"
                    sx={{ color: "#251c57" }}
                  />
                  <span className="name">HardWhere</span>
                </Stack>
              </Link>
            </Grid>
            <div>
              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <div>
                  <Link to="/updatecustomer" className="Link" state={state}>
                    <div>
                      {
                        <Avatar
                          style={{
                            display: "inline",
                            padding: "5px",
                            backgroundColor: "darkcyan",
                          }}
                        >
                          {state.f_name[0]}
                        </Avatar>
                      }{" "}
                      <span id="userName">
                        {state.f_name} {state.l_name}
                      </span>
                    </div>
                  </Link>
                </div>
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<LogoutIcon />}
                    onClick={(e) => {
                      window.localStorage.clear();
                      window.history.replaceState(null, null, "/");
                      his("/Signin");
                    }}
                    sx={{
                      color: "#251c57",
                      fontWeight: "bold",
                      minWidth: 90,
                      backgroundColor: "transparent",
                    }}
                  >
                    Log out
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ThemeProvider>
  );
};

export default Navbar;
