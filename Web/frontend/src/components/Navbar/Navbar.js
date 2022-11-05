import './Navbar.css'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
const Navbar = () => {
  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 }];
  const styles = theme => ({
    notchedOutline: {
      borderWidth: "1px",
      borderColor: "yellow !important"
    }
  });
  return (
    <div className="header">
      <div className="logo">
        <span class="material-symbols-outlined">memory</span>
        <span className='name'>HardWhere</span></div>
      <Stack spacing={2} sx={{ width: 800, border: 'none', }}   >
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          fullWidth={true}
          sx={{ backgroundColor: 'white', borderRadius: 3 }}
          options={top100Films.map((option) => option.title)}
          renderInput={(params) => (
            <TextField
              {...params}
              
              margin="none"
              placeholder='How can we help you...'
              disableListWrap='false'
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& > fieldset": {
                    border: "none"
                  }
                }
              }}
              InputProps={{
                ...params.InputProps,
                type: 'search',

              }}
            />
          )}
        />
      </Stack>
      <div className="buttons">
        <Stack direction="row" spacing={2} sx={{display: "block"}}>
          <Button variant="contained" sx={{
            fontWeight: 'bold', borderRadius: 50, backgroundColor: 'transparent', color: "#251c57",
            "&:hover": { backgroundColor: 'transparent', color: "#251c57" }
          }}>Sign In <span class="material-symbols-outlined">
              person
            </span></Button>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" sx={{
            fontWeight: 'bold',
            borderRadius: 50, backgroundColor: 'transparent', color: "#251c57",
            "&:hover": { backgroundColor: 'transparent', color: "#251c57" }
          }}>Cart <span class="material-symbols-outlined">
              shopping_cart
            </span> </Button>
        </Stack>
      </div>



    </div>
  );
}

export default Navbar;

