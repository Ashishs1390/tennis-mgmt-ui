import React, { useEffect, useState} from "react";
import { yupResolver } from '@hookform/resolvers/yup';
import { styled, darken } from '@mui/material/styles';
import FormHelperText from '@mui/material/FormHelperText';
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link, useParams, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { get } from "../../api/axios.api";
import { connect } from 'react-redux';
// import { postDetails, emailValidation } from "./../../../../redux/index";
import { postDetails, emailValidation } from "./../../redux/index";

// import { postDetails, emailValidation } from  "./basicInfo/"

const Root = styled('div')(({ theme }) => ({
    '& .Register3-leftSection': {},

    '& .Register3-rightSection': {
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
    first_name: yup.string().required('You must enter your name'),
    last_name: yup.string().required('You must enter your name'),
    email: yup.string().email('You must enter a valid email').required('You must enter a email'),
    password: yup
        .string()
        .required('Please enter your password.')
        .min(4, 'Password is too short - should be 4 chars minimum.'),
    passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    //current_level: yup .string() .required("select one option")
    // acceptTermsConditions: yup.boolean().oneOf([true], 'The terms and conditions must be accepted.'),
});

const defaultValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    current_level: {}
    // acceptTermsConditions: false,

};

function Registration(props) {
    const { control,register, formState, handleSubmit, reset } = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema),
    });
    const navigate = useNavigate();
    const {
        registration: { data, error, registration },
        postDetails,
        emailValidation,
    } = props;
    const [levels , setLevels] = useState({})
    const { isValid, dirtyFields, errors } = formState;
    const [age, setAge] = React.useState('');
    const params = useParams();
    const { role } = params;

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    useEffect(() => {
        if (role === "player") {
            get("/api/tennismgmt/list/agegrouplist")
                .then((x) => {
                    console.log(x.data.data.itn_level_mapping);
                    console.log(x.data.data.itn_level);
                    setLevels({
                        itn_level_mapping: x.data.data.itn_level_mapping,
                        itn_level: x.data.data.itn_level
                    })

                })
        }
    }, []);

    const onSubmit = (data) => {
        reset(defaultValues);
        const outObj = { ...data, role: role };
        if (role == "parent" || role == "coach") {
            delete outObj["current_level"];
        }
        postDetails(outObj);
        navigate("/");
    }
     


    return (
        <Root className="flex flex-col flex-auto items-center justify-center shrink-0 p-16 md:p-24">
            <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex w-full max-w-400 md:max-w-3xl rounded-20 shadow-2xl overflow-hidden"
            >
                <Card
                    className="Register3-leftSection  flex flex-col w-full max-w-sm items-center justify-center shadow-0"
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
                                        Tennis
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
                            name="registerForm"
                            noValidate
                            className="flex flex-col justify-center w-full"
                            onSubmit={handleSubmit((data) => {
                                console.log(data);
                                onSubmit(data)
                            })}
                        >
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
                            <Controller
                                name="last_name"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        {...register("last_name")}
                                        className="mb-16"
                                        label="Last Name"
                                        autoFocus
                                        type="name"
                                        error={!!errors.last_name}
                                        helperText={errors?.last_name?.message}
                                        variant="outlined"
                                        required
                                        fullWidth
                                    />
                                )}
                            />
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        {...register("email")}
                                        className="mb-16"
                                        label="Email"
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

                            <Controller
                                name="passwordConfirm"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        className="mb-16"
                                        label="Password (Confirm)"
                                        type="password"
                                        error={!!errors.passwordConfirm}
                                        helperText={errors?.passwordConfirm?.message}
                                        variant="outlined"
                                        required
                                        fullWidth
                                    />
                                )}
                            />
                            {role == "player" &&
                            !(levels 
                            && Object.keys(levels).length === 0
                            && Object.getPrototypeOf(levels) === Object.prototype) &&
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Current Game Level</InputLabel>
                                <Controller
                                                name="current_level"
                                                control={control}
                                                render={({ field }) =>
                                                    <Select
                                                        {...field}
                                                       
                                                        label="Current Game Level"
                                                        control={control}
                                                    // onChange={handleChange}      
                                                    >
                                                        {
                                                            levels.itn_level.map((level) => {
                                                                return <MenuItem  key={level} value={level}>{levels.itn_level_mapping[level]}</MenuItem>
                                                            })
                                                        }
                                                    </Select>}
                                    />
                                </FormControl>
                            </Box>
                            }
                            {/* <Controller
                                name="acceptTermsConditions"
                                control={control}
                                render={({ field }) => (
                                    <FormControl className="items-center" error={!!errors.acceptTermsConditions}>
                                        <FormControlLabel
                                            label="I read and accept terms and conditions"
                                            control={<Checkbox {...field}
                                                {...register("acceptTermsConditions")}

                                            
                                            />}
                                        />
                                        <FormHelperText>{errors?.acceptTermsConditions?.message}</FormHelperText>
                                    </FormControl>
                                )}
                            /> */}

                            <Button
                                variant="contained"
                                color="primary"
                                className="w-full mx-auto mt-16"
                                aria-label="Register"
                                disabled={_.isEmpty(dirtyFields) || !isValid}
                                type="submit"
                            >
                                Create an account
                            </Button>
                        </form>
                    </CardContent>

                    <div className="flex flex-col items-center justify-center pb-32">
                        <span className="font-normal">Already have an account?</span>
                        <Link className="font-normal" to="/pages/auth/login-3">
                            Login
                        </Link>
                    </div>
                </Card>

                <div className="Register3-rightSection hidden md:flex flex-1 items-center justify-center p-64">
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

// export default Registration;
const mapDispatchToProps = (dispatch) => {
    return {
        postDetails: (outObj) => dispatch(postDetails(outObj)),
        emailValidation: (outObj) => dispatch(emailValidation(outObj)),
    };
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
