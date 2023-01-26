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
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { emailValidation, fetchDetails } from "./../../../redux/index";
import { connect } from 'react-redux';
import { Box } from '@mui/system';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { put } from '../../../api/axios.api';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import EditPorfile from './EditPorfile';
import "./tabs.css"

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  first_name: yup.string().required('You must enter your name'),
  last_name: yup.string().required('You must enter your name'),
  //current_level: yup .string() .required("select one option")
  // acceptTermsConditions: yup.boolean().oneOf([true], 'The terms and conditions must be accepted.'),
});

const defaultValues = {
  first_name: '',
  last_name: '',
  // acceptTermsConditions: false,
};

function AboutTab(props) {
  const [data, setData] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const {
    getData,
    emailValidation,
    fetchDetails,
    auth
  } = props;
  const { control, register, formState, handleSubmit, reset, setValue } = useForm({
    mode: 'onChange',
    // defaultValues: { ...defaultValues },
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
  const [role] = useState(auth.user.role[0]);
  const [errMessage, setErrMessage] = useState(null);
  const [prevValues, setPrevValues] = useState({});

  useEffect(() => {
    localStorage.setItem("childInfo", JSON.stringify(getData.data));
  }, [getData]);

  useEffect(() => {
    console.log('Role:', props);
    // axios.get('/api/profile/about').then((res) => {
    //   setData(res.data);
    // });
  }, []);
  useEffect(() => {
    fetchDetails();
  }, []);
  useEffect(() => {
    if (getData.data.length != 0) {
      setData(getData.data);
      setValue('first_name', getData.data.first_name);
      setValue('last_name', getData.data.last_name);
      setPrevValues({...getData.data});
    }
  }, [getData]);

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

  const editDetails = () => {
    setIsEdit(true);
  }

  const closeEditDetails = () => {
    reset();
    setValue('first_name', getData.data.first_name);
    setValue('last_name', getData.data.last_name);
    setIsEdit(false);
  }

  const toggleEdit = () => {
    if (isEdit) {
      closeEditDetails();
    } else {
      editDetails();
    }
  }

  const onSubmit = (data) => {
    reset(defaultValues);
    console.log('SUBmit:', data);
    delete data.current_level;
    delete data.email;
    put('/api/tennismgmt/registration/authed', { ...data }).then((x) => {
      window.location.reload();
    }).catch(err => {
      setErrMessage('Some thing went wrong. Please retry or connect admin.');
    });
  }

  return (
    <>
      {
        role !== 'player' ?
          <motion.div variants={container} initial="hidden" animate="show">
            <form
              name="registerForm"
              noValidate
              onSubmit={handleSubmit((data) => {
                onSubmit(data)
              })}
            >
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
                        {/* {isEdit ? <Button variant="contained" size="small" color="success"> Submit </Button> : ''} */}
                        <Button variant="contained" size="small" color="success" onClick={toggleEdit}>
                          {!isEdit ? <span className="material-icons">
                            edit
                          </span> :
                            <span className="material-icons">
                              close
                            </span>
                          }
                        </Button>
                      </Toolbar>
                    </AppBar>
                    { errMessage ? <Box
                                        sx={{
                                            display: 'block',
                                            color: '#f00'
                                        }}
                                    >
                                        {errMessage}
                                    </Box>: ''}
                    <CardContent>
                      <div className="mb-24">
                        <Typography className="font-semibold mb-4 text-15">Email</Typography>
                        <Typography>{data.email}</Typography>
                      </div>

                      <div className="mb-24">
                        {!isEdit ? <Typography className="font-semibold mb-4 text-15">First Name</Typography> : ''}
                        {!isEdit
                          ? <Typography>{data.first_name}</Typography>
                          :
                          <Controller
                            name="first_name"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                {...register("first_name")}
                                className="mb-16"
                                label="First Name"
                                autoFocus
                                type="name"
                                error={!!errors.first_name}
                                helperText={errors?.first_name?.message}
                                variant="outlined"
                                required
                                fullWidth
                              />
                            )}
                          />
                        }
                      </div>

                      <div className="mb-24">
                        {!isEdit ? <Typography className="font-semibold mb-4 text-15">Last Name</Typography> : ''}
                        {!isEdit ?
                          <Typography>{data.last_name}</Typography> :
                          <Controller
                            name="last_name"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                {...register("last_name")}
                                className="mb-16"
                                label="Last Name"
                                // autoFocus
                                type="name"
                                error={!!errors.last_name}
                                helperText={errors?.last_name?.message}
                                variant="outlined"
                                required
                                fullWidth
                              />
                            )}
                          />
                        }
                      </div>
                      <div className="mb-24">
                        <Typography className="font-semibold mb-4 text-15">Role</Typography>
                        <Typography>{data.role}</Typography>
                      </div>
                      {isEdit ? <Button
                                        variant='contained'
                                        color='primary'
                                        className='w-1/3 mx-auto mt-16'
                                        aria-label='Register'
                                        disabled={_.isEmpty(dirtyFields) || !isValid}
                                        type='submit'
                                    >
                                        Update account
                                    </Button> : ''}
                      {data.current_level &&
                        <div className="mb-24">
                          <Typography className="font-semibold mb-4 text-15">Current Level</Typography>
                          <Typography>{data.current_level}</Typography>
                        </div>
                      }
                      {data.parent_email && data.parent_email.length > 0 && <div className="mb-24">
                        <Typography className="font-semibold mb-4 text-15">Parent Email</Typography>
                        {data.parent_email.map((em, index) => {
                          return (<Typography key={em}>{em || "Parent not assigned"}</Typography>)
                        })}
                      </div>}
                      {/* <EditPorfile /> */}
                    </CardContent>
                  </Card>
                </div>

                <div className="flex flex-col md:w-320">
                  {data.children_email && data.children_email.length > 0 &&
                    <Card component={motion.div} variants={item} className="w-full mb-32 rounded-16 shadow">
                      <AppBar position="static" elevation={0}>
                        <Toolbar className="px-8">
                          <Typography
                            variant="subtitle1"
                            color="inherit"
                            className="flex-1 px-12 font-medium"
                          >
                            Players
                          </Typography>
                          <Button color="inherit" size="small">
                            {data.children_email.length}
                          </Button>
                        </Toolbar>
                        <Box className="tabs-content">
                          {data.children_email.map((ele, index) => {
                            return (<Typography key={ele}>{ele} </Typography>)
                          })}
                        </Box>
                      </AppBar>

                    </Card>
                  }
                  {data.parent_email && data.parent_email.length > 0 &&
                    <Card component={motion.div} variants={item} className="w-full mb-32 rounded-16 shadow">
                      <AppBar position="static" elevation={0}>
                        <Toolbar className="px-8">
                          <Typography
                            variant="subtitle1"
                            color="inherit"
                            className="flex-1 px-12 font-medium"
                          >
                            Parent
                          </Typography>
                          <Button color="inherit" size="small">
                            {data.parent_email.length}
                          </Button>
                        </Toolbar>
                        <Box className="tabs-content">
                          {data.parent_email.map((ele, index) => {
                            return (<Typography key={ele}>{ele} </Typography>)
                          })}
                        </Box>
                      </AppBar>

                    </Card>
                  }
                  {data.coach_email && data.coach_email.length > 0 &&
                    <Card component={motion.div} variants={item} className="w-full mb-32 rounded-16 shadow">
                      <AppBar position="static" elevation={0}>
                        <Toolbar className="px-8">
                          <Typography
                            variant="subtitle1"
                            color="inherit"
                            className="flex-1 px-12 font-medium"
                          >
                            Coaches
                          </Typography>
                          <Button color="inherit" size="small">
                            {data.coach_email.length}
                          </Button>
                        </Toolbar>
                        <Box className="tabs-content">
                          {data.coach_email.map((ele, index) => {
                            return (<Typography key={ele}>{ele} </Typography>)
                          })}
                        </Box>
                      </AppBar>

                    </Card>
                  }

                  {/* <Card component={motion.div} variants={item} className="w-full mb-32 rounded-16 shadow">
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
        </Card> */}
        
                </div>
              </div>
            </form>

          </motion.div> :
          <EditPorfile profileData={data} />
      }

    </>
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
