import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddProduct from '../Admin/AddProduct';
import AddAdmin from '../Manager/AddAdmin'
import AddShipping from "../Manager/AddShipping";
import AddStorage from "../Manager/AddStorages";
import UpdateSupplier from "../Manager/UpdateSupp";
import AddSupplier from "../Manager/AddSupplier";
import UpdateProduct from "../Admin/UpdateProduct";
import Delete from "../Admin/DeleteProduct";
import UpdateStorage from "../Manager/UpdateStorage";
import UpdateShipping from "../Manager/UpdateShipping";
import UpdateEmployee from "../Manager/UpdateEmployee";
import DeleteEmployee from "../Manager/DltEmployee";
import DeleteSupplier from "../Manager/DltSupp";
import DeleteStorage from "../Manager/DltStorage";
import DeleteCompany from "../Manager/DltShipping";
import { useLocation } from 'react-router-dom';
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const AdminPanel = (props) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const {state}=useLocation();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div>
      <AppBar sx={{backgroundColor:'#e99f18'}} position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="warning"
          textColor="inherit"
          scrollButtons={true}
          variant="scrollable"
          // scrollButtons="auto"
          aria-label="full width tabs example"
        >
          <Tab disabled={state.auth!='employee'} label="Add Product" {...a11yProps(0)} />
          <Tab disabled={state.auth != 'employee'} label="Update Product" {...a11yProps(1)} />
          <Tab disabled={state.auth != 'employee'} label="Delete Product" {...a11yProps(2)} />
          <Tab disabled={state.auth != 'manager'} label="Add Employee" {...a11yProps(1)} />
          <Tab disabled={state.auth != 'manager'} label="Update Employee" {...a11yProps(4)} />
          <Tab disabled={state.auth != 'manager'} label="Delete Employee" {...a11yProps(5)} />
          <Tab disabled={state.auth != 'manager'} label="Update Shipping Company" {...a11yProps(7)} />
          <Tab disabled={state.auth != 'manager'} label="Detele Shipping Company" {...a11yProps(8)} />
          <Tab disabled={state.auth != 'manager'}label="Add Storage" {...a11yProps(9)} />
          <Tab disabled={state.auth != 'manager'}label="Update Storage" {...a11yProps(10)} />
          <Tab disabled={state.auth != 'manager'}label="Delete Storage" {...a11yProps(11)} />
          <Tab disabled={state.auth != 'manager'}label="Add Supplier" {...a11yProps(12)} />
          <Tab disabled={state.auth != 'manager'}label="Update Supplier" {...a11yProps(13)} />
          <Tab disabled={state.auth != 'manager'}label="Delete Supplier" {...a11yProps(14)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >

{state.auth=='employee'&& <TabPanel disabled value={value} index={0} dir={theme.direction}>
          <AddProduct />
        </TabPanel>}
        {state.auth=='employee'&&<TabPanel value={value} index={1} dir={theme.direction}>
          <UpdateProduct />
        </TabPanel>}
        {state.auth=='employee'&&<TabPanel value={value} index={2} dir={theme.direction}>
          <Delete />
        </TabPanel>}
        <TabPanel value={value} index={3} dir={theme.direction}>
          <AddAdmin />
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          <UpdateEmployee />
        </TabPanel>
        <TabPanel value={value} index={5} dir={theme.direction}>
          <DeleteEmployee />
        </TabPanel>
        <TabPanel value={value} index={6} dir={theme.direction}>
          <AddShipping />
        </TabPanel>
        <TabPanel value={value} index={7} dir={theme.direction}>
          <UpdateShipping />
        </TabPanel>
        <TabPanel value={value} index={8} dir={theme.direction}>
          <DeleteCompany />
        </TabPanel>
        <TabPanel value={value} index={9} dir={theme.direction}>
          <AddStorage />
        </TabPanel>
        <TabPanel value={value} index={10} dir={theme.direction}>
          <UpdateStorage />
        </TabPanel>
        <TabPanel value={value} index={11} dir={theme.direction}>
          <DeleteStorage />        </TabPanel>
        <TabPanel value={value} index={12} dir={theme.direction}>
          <AddSupplier />
        </TabPanel>
        <TabPanel value={value} index={13} dir={theme.direction}>
          <UpdateSupplier />
        </TabPanel>
        <TabPanel value={value} index={14} dir={theme.direction}>
          <DeleteSupplier />       
           </TabPanel>
      </SwipeableViews>
    </div>
  );
}

export default AdminPanel;