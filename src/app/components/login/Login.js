import React, { useState, useEffect, useCallback } from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { styled, darken } from '@mui/material/styles';
import { motion } from 'framer-motion';
import axios from "axios";
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate, Link,  } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import Cookies from "js-cookie";

const Root = styled('div')(({ theme }) => ({
    '& .Login3-leftSection': {},

    '& .Login3-rightSection': {
        background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
            theme.palette.primary.dark,
            0.5
        )} 100%)`,
        color: theme.palette.primary.contrastText,
    },
}));

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
    email: yup.string().email('You must enter a valid email').required('You must enter a email'),
    password: yup
        .string()
        .required('Please enter your password.')
        .min(4, 'Password is too short - should be 4 chars minimum.'),
});

const defaultValues = {
    email: '',
    password: ''
};

function Login3Page(props) {
    const { register, control, formState, handleSubmit, reset } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema),
    });
    const { onAuth } = props;
    const navigate = useNavigate();
    const [role, setRole] = useState("player");
    const [errmsg, setErrmsg] = useState({});
    const { isValid, dirtyFields, errors } = formState;
    const [isLoggedIn, setISLoggedIn] = useState(
        Cookies.get("token") == null ? false : true
      );

    useEffect(() => {
        if (isLoggedIn && Cookies.get("token") !== '') {
            navigate("/profilepage");
        }
      });

    const loginCall = (fields, role) => {
        console.log(fields);
        const localStore = {};
        axios
            .post(`http://18.237.239.203:8000/api/tennismgmt/login`, { ...fields }, { withCredentials: true })
            .then((response) => {
                console.log(response);
                localStore.current_level = response.data.current_level;
                localStore.email = response.data.email;
                localStore.first_name = response.data.first_name;
                localStore.last_name = response.data.last_name;
                localStore.role = response.data.role;

                // onAuth(true);
                localStorage.setItem('localStore', JSON.stringify(localStore));
                localStorage.setItem('current_level', response.data.current_level);
                console.log("-------------level check----------------")
                console.log(response.data.role);
                if (response.data.role == "player") {
                    // navigate(`/user/${response.data.role}`);
                        navigate("/profilepage");
                } else {
                    console.log("---------else-------------")
                    navigate(`/link/player`)
                }
            })
            .catch((error) => {
                console.log("-------error--------");
                console.log(error);
                setErrmsg({ ...error.response.data });
            });
    };

    function onSubmit(data) {
        loginCall(data, role);
        // reset(defaultValues);
    }

    return (
        <Root className="flex flex-col flex-auto items-center justify-center shrink-0 p-16 md:p-24">
            <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex w-full max-w-400 md:max-w-3xl rounded-20 shadow-2xl overflow-hidden"
            >
                <Card
                    className="Login3-leftSection flex flex-col w-full max-w-sm items-center justify-center shadow-0"
                    square
                >
                    <CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { delay: 0.2 } }}
                        >
                            <div className="flex items-center mb-48">
                                <img className="logo-icon w-48" src="assets/images/logos/fuse.svg" alt="logo" />
                                <div className="border-l-1 mr-4 w-1 h-40" />
                                <div>
                                    <Typography className="text-24 font-semibold logo-text" color="inherit">
                                        TENNIS
                                    </Typography>
                                    <Typography
                                        className="text-16 tracking-widest -mt-8 font-700"
                                        color="textSecondary"
                                    >
                                        LMS
                                    </Typography>
                                </div>
                            </div>
                        </motion.div>

                        <form
                            name="loginForm"
                            noValidate
                            className="flex flex-col justify-center w-full"
                            onSubmit={handleSubmit((data) => {
                                onSubmit(data)
                            })}
                        >
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        {...register("email")}
                                        className="mb-16"
                                        label="Email"
                                        autoFocus
                                        type="email"
                                        error={!!errors.email}
                                        helperText={errors?.email?.message}
                                        variant="outlined"
                                        required
                                        fullWidth
                                    />
                                )}
                            />

                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        {...register("password")}
                                        className="mb-16"
                                        label="Password"
                                        type="password"
                                        error={!!errors.password}
                                        helperText={errors?.password?.message}
                                        variant="outlined"
                                        required
                                        fullWidth
                                    />
                                )}
                            />

                            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
                                {/* <Controller
                                    name="remember"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl>
                                            <FormControlLabel label="Remember Me" control={<Checkbox {...field} />} />
                                        </FormControl>
                                    )}
                                /> */}

                                {/* <Link className="font-normal" to="/pages/auth/forgot-password-2">
                                    Forgot Password?
                                </Link> */}
                            </div>

                            <Button
                                variant="contained"
                                color="primary"
                                className="w-full mx-auto mt-16"
                                aria-label="LOG IN"
                                disabled={_.isEmpty(dirtyFields) || !isValid}
                                type="submit"
                            >
                                Login
                            </Button>
                        </form>
{/* 
                        <div className="my-24 flex items-center justify-center">
                            <Divider className="w-32" />
                            <span className="mx-8 font-semibold">OR</span>
                            <Divider className="w-32" />
                        </div> */}
{/* 
                        <Button variant="outlined" color="primary" size="small" className="w-192 mb-8">
                            Log in with Google
                        </Button>

                        <Button variant="outlined" color="primary" size="small" className="w-192">
                            Log in with Facebook
                        </Button> */}
                        {!(
                            errmsg &&
                            Object.keys(errmsg).length === 0 &&
                            Object.getPrototypeOf(errmsg) === Object.prototype
                        ) && (
                            <div className="login-error-msg flex flex-col items-center justify-center pb-3">
                                    <p>{errmsg.message}</p>
                                </div>
                            )}
                    </CardContent>

                    <div className="flex flex-col items-center justify-center pb-32">
                        <span className="font-normal">Don't have an account?</span>
                        <Link className="font-normal" to="/registration/player">
                            Create a player account
                        </Link>
                        <Link className="font-normal" to="/registration/parent">
                            Create a parent account
                        </Link>
                        <Link className="font-normal" to="/registration/coach">
                            Create a coach account
                        </Link>
                    </div>
                </Card>

                <div className="Login3-rightSection flex hidden md:flex flex-1 items-center justify-center p-64">
                    <div className="max-w-320">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                        >
                            <Typography
                                color="inherit"
                                className="text-32 sm:text-44 font-semibold leading-tight"
                            >
                                Welcome <br />
                                to the <br /> Tennis LMS!
                            </Typography>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { delay: 0.3 } }}
                        >
                            <Typography variant="subtitle1" color="inherit" className="mt-32 font-medium">
                                Powerful and professional admin template for Web Applications, CRM, CMS, Admin
                                Panels and more.
                            </Typography>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </Root>
    );
}

export default Login3Page;
