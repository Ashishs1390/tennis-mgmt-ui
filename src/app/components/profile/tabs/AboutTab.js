import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { emailValidation, fetchDetails } from "./../../../redux/index";
import { connect } from 'react-redux';


function AboutTab(props) {
  const [data, setData] = useState({});

  const {
    getData,
    emailValidation,
    fetchDetails
  } = props;

  useEffect(() => {
    localStorage.setItem("childInfo", JSON.stringify(getData.data));
  }, [getData]);

  // useEffect(() => {
  //   axios.get('/api/profile/about').then((res) => {
  //     setData(res.data);
  //   });
  // }, []);
  useEffect(() => {
    fetchDetails();
  }, []);
  useEffect(() => {
    if (getData.data.length != 0) {
      console.log(getData);
      setData(getData.data);
      // const obj = {
      //   first_name: getData.data.first_name,
      //   last_name: getData.data.last_name,
      //   email: getData.data.email
      // }
      // updateValue(obj, setInputs, inputs, 'registrationForm')
    }
  }, [getData])


  // if (!data) {
  //   return null;
  // }

  // const { general, work, contact, groups, friends } = data;

  const container = {
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <div className="md:flex max-w-2xl">
        <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
          <Card component={motion.div} variants={item} className="w-full mb-32 rounded-16 shadow">
            <AppBar position="static" elevation={0}>
              <Toolbar className="px-8">
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  className="flex-1 px-12 font-medium"
                >
                  Personal Information
                </Typography>
              </Toolbar>
            </AppBar>

            <CardContent>
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Email</Typography>
                <Typography>{ data.email}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">First Name</Typography>
                <Typography>{ data.first_name}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Last Name</Typography>
                <Typography>{data.last_name}</Typography>
              </div>
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Role</Typography>
                <Typography>{data.role}</Typography>
              </div>
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Current Level</Typography>
                <Typography>{data.current_level}</Typography>
              </div>
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Parent Email</Typography>
                {data.parent_email && data.parent_email.map((em,index) => {
                  return (<Typography key={em}>{em || "Parent not assigned"}</Typography>)
                }) }
              </div>
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Coach Email</Typography>
                {data.coach_email && data.coach_email.map((em, index) => {
                  return (<Typography key={em}>{em || "Coach not assigned"}</Typography>)
                })}

              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col md:w-320">
          <Card component={motion.div} variants={item} className="w-full mb-32 rounded-16 shadow">
            <AppBar position="static" elevation={0}>
              <Toolbar className="px-8">
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  className="flex-1 px-12 font-medium"
                >
                  Friends
                </Typography>
                <Button color="inherit" size="small">
                  See 454 more
                </Button>
              </Toolbar>
            </AppBar>
     
          </Card>

          <Card component={motion.div} variants={item} className="w-full mb-32 rounded-16 shadow">
            <AppBar position="static" elevation={0}>
              <Toolbar className="px-8">
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  className="flex-1 px-12 font-medium"
                >
                  Joined Groups
                </Typography>
                <Button color="inherit" size="small">
                  See 6 more
                </Button>
              </Toolbar>
            </AppBar>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    emailValidation: (outObj) => dispatch(emailValidation(outObj)),
    fetchDetails: () => dispatch(fetchDetails())
  };
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutTab);
