import './Navbar.css'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import MemoryOutlinedIcon from '@mui/icons-material/MemoryOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Grid } from '@mui/material';
import { ThemeProvider, createTheme, } from '@mui/material/styles'
import { Link } from 'react-router-dom';

const theme = createTheme({
  typography: {
    fontFamily: "comfortaa"
  }
  ,
  palette: {
    primary: {
      main: "#efef18"
    },
    secondary: {
      main: "#251c57"
    }
  }
})

const Btntheme = createTheme({
  typography: {
    fontFamily: "comfortaa"
  }
  ,
  palette: {
    primary: {
      main: "#efef18"
    },
    secondary: {
      main: "#251c57"
    }
  },
  shape: {
    borderRadius: 50
  }
})
const Navbar = () => {
  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 }];
  return (
    <ThemeProvider theme={theme}>
      <Grid>
        <div className="header">
          <Grid container spacing={2} justifyContent={"space-between"}>
            <Grid item sm={"auto"}>
              <Stack alignItems="center" direction={"row"}>
                <MemoryOutlinedIcon
                  fontSize="large"
                  sx={{ color: "#251c57" }}
                />
                <span className="name">HardWhere</span>
              </Stack>
            </Grid>
            <Grid item sm={5}>
              <Stack>
                <Autocomplete
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  fullWidth={true}
                  sx={{ backgroundColor: "white", borderRadius: 3 }}
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
                  <Link to="/Signin" className="loginLink">
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={<PermIdentityOutlinedIcon fontSize="inherit" />}
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
                </ThemeProvider>
              </div>
            </Grid>
          </Grid>
        </div>
        <Grid
          className="links"
          sx={{ backgroundColor: "#efefef" }}
          container
          justifyContent={"space-evenly"}
        >
          <ThemeProvider theme={Btntheme}>
            <Button color="secondary" href="#text-buttons">
              Labtops
            </Button>
            <Button color="secondary" href="#text-buttons">
              Mobile Phones
            </Button>
            <Button color="secondary" href="#text-buttons">
              Headphones
            </Button>
            <Button color="secondary" href="#text-buttons">
              Accessories
            </Button>
            <Button color="secondary" href="#text-buttons">
              Offers
            </Button>
          </ThemeProvider>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Navbar;

