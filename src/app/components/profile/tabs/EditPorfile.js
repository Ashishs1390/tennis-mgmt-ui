import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { useParams, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { get, put } from '../../../api/axios.api';
import { connect } from 'react-redux';
import { postDetails } from '../../../redux/index';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
    first_name: yup.string().required('Please enter your first name'),
    last_name: yup.string().required('Please enter your last name'),
    yob: yup.string().required('Please enter your year of birth'),
});

const defaultValues = {
    first_name: '',
    last_name: '',
    backhand: '',
    current_level: '',
    forehand: '',
    goal_level: '',
    height: '',
    height_type: '',
    player_type: '',
    plays: '',
    racquet: '',
    racquet_string: '',
    racquet_tension: '',
    time_frame: '',
    weight: '',
    weight_type: '',
    yob: ''
};

function UpdateUser(props) {
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState(false);
    const {
        registration: { data, error, registration },
        postDetails,
        getData,
        profileData
    } = props;
    console.log(profileData);
    // const prevValues = {
    //     first_name: 'Abcde',
    //     last_name: 'evrtre',
    //     backhand: 'twohanded',
    //     current_level: '',
    //     forehand: 'onehanded',
    //     goal_level: '',
    //     height: '165',
    //     height_type: '',
    //     player_type: 'aggressive',
    //     plays: 'left',
    //     racquet: 'abct',
    //     string: 'qbrte',
    //     tension: 'pics',
    //     time_frame: '12.35',
    //     weight: '66',
    //     weight_type: '',
    //     yob: '9963'
    // };

    const [prevValues, setPrevValues] = useState(defaultValues);
    const { control, register, formState, handleSubmit, reset, setValue, getValues } = useForm({
        mode: 'onChange',
        defaultValues: { ...defaultValues, ...prevValues },
        resolver: yupResolver(schema),
    });
    const [levels, setLevels] = useState({ itn_level: [] });
    const [errMessage, setErrMessage] = useState(null);
    const { isValid, dirtyFields, errors } = formState;

    console.log('BIB:', formState, errors);
    const params = useParams();
    const { role } = params;
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
        // reset();
        setIsEdit(false);
    }

    const toggleEdit = () => {
        if (isEdit) {
            closeEditDetails();
        } else {
            editDetails();
        }
    }
    const handleRadioChange = (event, controlType) => {
        console.log(controlType, event.target.value);
        //setValue(controlType, event.target.value);
    };

    useEffect(() => {
        get('/api/tennismgmt/list/agegrouplist')
            .then((x) => {
                setLevels({
                    itn_level_mapping: x.data.data.itn_level_mapping,
                    itn_level: x.data.data.itn_level
                })
            });
    }, []);

    useEffect(() => {
        setPrevValues({...profileData});
    }, [profileData]);

    useEffect(() => {
        setValue('first_name', prevValues.first_name);
        setValue('last_name', prevValues.last_name);
        setValue('backhand', prevValues.backhand);
        setValue('current_level', prevValues.current_level);
        setValue('forehand', prevValues.forehand);
        setValue('goal_level', prevValues.goal_level);
        setValue('height', prevValues.height);
        setValue('height_type', prevValues.height_type);
        setValue('player_type', prevValues.player_type);
        setValue('plays', prevValues.plays);
        setValue('racquet', prevValues.racquet);
        setValue('racquet_string', prevValues.racquet_string);
        setValue('racquet_tension', prevValues.racquet_tension);
        setValue('time_frame', prevValues.time_frame);
        setValue('weight', prevValues.weight);
        setValue('weight_type', prevValues.weight_type);
        setValue('yob', prevValues.yob);
        setValue('notes', prevValues.notes);
    }, [prevValues]);

    const onChangeRadio = (control, event) => {
        setPrevValues({...prevValues, [control]: event.target.value});
    }

    const onSubmit = (data) => {
        console.log('BIB@:', data, getValues());
        delete data.current_level;
        delete data.email;
        put('/api/tennismgmt/registration/authed', { ...prevValues }).then((x) => {
            // window.location.reload();
        }).catch(err => {
            setErrMessage('Some thing went wrong. Please retry or connect admin.');
        });
    }



    return (
        <motion.div variants={container} initial="hidden" animate="show">
            <form
                name='registerForm'
                noValidate
                className='flex flex-col justify-center w-full'
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
                            {!isEdit ? <CardContent>
                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">Email</Typography>
                                    <Typography>{prevValues.email}</Typography>
                                </div>
                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">First Name</Typography>
                                    <Typography>{prevValues.first_name}</Typography>
                                </div>
                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">Last Name</Typography>
                                    <Typography>{prevValues.last_name}</Typography>
                                </div>
                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">Year of birth</Typography>
                                    <Typography>{prevValues.yob}</Typography>
                                </div>
                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">Weight</Typography>
                                    <Typography>{prevValues.weight + ' ' + prevValues.weight_type}</Typography>
                                </div>
                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">Height</Typography>
                                    <Typography>{prevValues.height + ' ' + prevValues.height_type}</Typography>
                                </div>
                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">Current level</Typography>
                                    <Typography>{prevValues.current_level}</Typography>
                                </div>
                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">Goal level</Typography>
                                    <Typography>{prevValues.goal_level}</Typography>
                                </div>
                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">Time frame</Typography>
                                    <Typography>{prevValues.time_frame}</Typography>
                                </div>
                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">racquet</Typography>
                                    <Typography>{prevValues.racquet}</Typography>
                                </div>
                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">String</Typography>
                                    <Typography>{prevValues.racquet_string}</Typography>
                                </div>
                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">Tension</Typography>
                                    <Typography>{prevValues.racquet_tension}</Typography>
                                </div>
                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">Plays</Typography>
                                    <Typography>{prevValues.plays}</Typography>
                                </div>
                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">Forehand</Typography>
                                    <Typography>{prevValues.forehand}</Typography>
                                </div>
                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">Backhand</Typography>
                                    <Typography>{prevValues.backhand}</Typography>
                                </div>
                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">Player type</Typography>
                                    <Typography>{prevValues.player_type}</Typography>
                                </div>
                                <div className="mb-24">
                                    <Typography className="font-semibold mb-4 text-15">Player type</Typography>
                                    <Typography>{prevValues.notes}</Typography>
                                </div>
                            </CardContent> :
                                <CardContent className='flex flex-col items-left justify-left w-full py-10 max-w-620'>
                                    { errMessage ? <Box
                                        sx={{
                                            display: 'block',
                                            color: '#f00'
                                        }}
                                    >
                                        {errMessage}
                                    </Box>: ''}
                                    <div className="mb-24">
                                        <Typography className="font-semibold mb-4 text-15">Email</Typography>
                                        <Typography>{prevValues.email}</Typography>
                                    </div>
                                    <Controller
                                        name='first_name'
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                {...register('first_name')}
                                                className='mb-16 w-1/2'
                                                label='First Name'
                                                autoFocus
                                                type='text'
                                                error={!!errors.first_name}
                                                helperText={errors?.first_name?.message}
                                                variant='outlined'
                                                required
                                            />
                                        )}
                                    />
                                    <Controller
                                        name='last_name'
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                {...register('last_name')}
                                                className='mb-16 w-1/2'
                                                label='Last Name'
                                                type='text'
                                                error={!!errors.last_name}
                                                helperText={errors?.last_name?.message}
                                                variant='outlined'
                                                required
                                            />
                                        )}
                                    />

                                    <Controller
                                        name='yob'
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                {...register('yob')}
                                                className='mb-16 w-1/2'
                                                label='Year of birth'
                                                type='number'
                                                error={!!errors.yob}
                                                helperText={errors?.yob?.message}
                                                variant='outlined'
                                                required
                                            />
                                        )}
                                    />

                                    <CardContent className='flex flex-row w-1/2 max-w-620 justify-left p-0'>
                                        <Controller
                                            name='weight'
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    {...register('weight')}
                                                    className='mb-16'
                                                    label='Weight'
                                                    type='number'
                                                    variant='outlined'
                                                />
                                            )}
                                        />
                                        <FormControl
                                            className='mb-16 ml-8'
                                        >
                                            <Controller
                                                name='weight_type'
                                                control={control}
                                                render={({ field }) => (
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby='demo-row-radio-buttons-group-label'
                                                        name='row-radio-buttons-group'
                                                        {...field}
                                                        {...register('weight_type')}
                                                        variant='outlined'
                                                        onChange={(event) => onChangeRadio('weight_type', event)}
                                                    >
                                                        <FormControlLabel value='lbs' control={<Radio />} label='Lbs' />
                                                        <FormControlLabel value='kg' control={<Radio />} label='Kg' />
                                                    </RadioGroup>
                                                )}
                                            />
                                            {errors?.weight_type?.message ? <FormHelperText>{errors?.weight_type?.message}</FormHelperText> : ''}
                                        </FormControl>
                                    </CardContent>
                                    <CardContent className='flex flex-row w-1/2 max-w-620 justify-left p-0'>
                                        <Controller
                                            name='height'
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    className='mb-16'
                                                    label='height'
                                                    variant='outlined'
                                                    {...register('height')}
                                                />
                                            )}
                                        />
                                        <FormControl
                                            className='mb-16 ml-8'
                                        >
                                            <Controller
                                                name='height_type'
                                                control={control}
                                                render={({ field }) => (
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby='demo-row-radio-buttons-group-label'
                                                        name='row-radio-buttons-group'
                                                        variant='outlined'
                                                        {...field}
                                                        {...register('height_type')}
                                                        onChange={(event) => onChangeRadio('height_type', event)}
                                                    >
                                                        <FormControlLabel value='in' control={<Radio />} label='in' />
                                                        <FormControlLabel value='cm' control={<Radio />} label='cm' />
                                                    </RadioGroup>
                                                )}
                                            />
                                            {errors?.height_type?.message ? <FormHelperText>{errors?.height_type?.message}</FormHelperText> : ''}

                                        </FormControl>

                                    </CardContent>
                                    <FormControl className='mb-16 w-1/2'>
                                        <InputLabel id='demo-simple-select-label'>Current Level</InputLabel>
                                        <Controller
                                            name='current_level'
                                            control={control}
                                            render={({ field }) =>
                                                <Select
                                                    {...field}
                                                    label='Current Game Level'
                                                    control={control}
                                                    disabled={true}
                                                >
                                                    {
                                                        levels.itn_level.map((level) => {
                                                            return <MenuItem key={level} value={level}>{levels.itn_level_mapping[level]}</MenuItem>
                                                        })
                                                    }
                                                </Select>}
                                        />
                                    </FormControl>
                                    <FormControl className='mb-16 w-1/2'>
                                        <InputLabel id='demo-simple-select-label'>Goal Level</InputLabel>
                                        <Controller
                                            name='goal_level'
                                            control={control}
                                            render={({ field }) =>
                                                <Select
                                                    {...field}
                                                    label='Goal level'
                                                    {...register('goal_level')}
                                                    control={control}
                                                >
                                                    {
                                                        levels.itn_level.map((level) => {
                                                            return <MenuItem key={level} value={level}>{levels.itn_level_mapping[level]}</MenuItem>
                                                        })
                                                    }
                                                </Select>}
                                        />
                                    </FormControl>
                                    <Controller
                                        name='time_frame'
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                className='mb-16 w-1/2'
                                                label='Time Frame'
                                                type='text'
                                                variant='outlined'
                                                {...register('time_frame')}

                                            />
                                        )}
                                    />
                                    <CardContent className='flex flex-row w-1/2 max-w-620 justify-left p-0'>
                                        <Controller
                                            name='racquet'
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    {...register('racquet')}
                                                    className='mb-16'
                                                    label='Racquet'
                                                    type='text'
                                                    variant='outlined'
                                                />
                                            )}
                                        />
                                        <Controller
                                            name='racquet_string'
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    {...register('racquet_string')}
                                                    className='mb-16 ml-8'
                                                    label='String'
                                                    type='text'
                                                    variant='outlined'
                                                />
                                            )}
                                        />

                                        <Controller
                                            name='racquet_tension'
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    {...register('racquet_tension')}
                                                    className='mb-16 ml-8'
                                                    label='Tension'
                                                    type='text'
                                                    variant='outlined'
                                                />
                                            )}
                                        />
                                    </CardContent>
                                    <FormControl
                                        className='mb-16 w-1/2'

                                    >
                                        <FormLabel id='demo-row-radio-buttons-group-label'>Plays</FormLabel>
                                        <Controller
                                            name='plays'
                                            control={control}
                                            render={({ field }) => (
                                                <RadioGroup
                                                    row
                                                    aria-labelledby='demo-row-radio-buttons-group-label'
                                                    name='row-radio-buttons-group'
                                                    className='ml-32'
                                                    {...field}
                                                    {...register('plays')}
                                                    label='Plays'
                                                    variant='outlined'
                                                    onChange={(event) => onChangeRadio('plays', event)}
                                                >
                                                    <FormControlLabel value='right' control={<Radio />} label='Right' />
                                                    <FormControlLabel value='left' control={<Radio />} label='Left' />
                                                </RadioGroup>
                                            )} />
                                    </FormControl>
                                    <FormControl

                                        className='mb-16 w-1/2'
                                        variant='outlined'>
                                        <FormLabel id='demo-row-radio-buttons-group-label'>Forehand</FormLabel>
                                        <Controller
                                            name='forehand'
                                            control={control}
                                            render={({ field }) => (

                                                <RadioGroup
                                                    row
                                                    aria-labelledby='demo-row-radio-buttons-group-label'
                                                    name='row-radio-buttons-group'
                                                    className='ml-32'
                                                    {...field}
                                                    {...register('forehand')}
                                                    onChange={(event) => onChangeRadio('forehand', event)}
                                                >
                                                    <FormControlLabel value='onehanded' control={<Radio />} label='Onehanded' />
                                                    <FormControlLabel value='twohanded' control={<Radio />} label='Twohanded' />
                                                </RadioGroup>

                                            )}
                                        />
                                    </FormControl>
                                    <FormControl

                                        className='mb-16 w-1/2'
                                        variant='outlined'>
                                        <FormLabel id='demo-row-radio-buttons-group-label'>Backhand</FormLabel>
                                        <Controller
                                            name='backhand'
                                            control={control}
                                            render={({ field }) => (

                                                <RadioGroup
                                                    row
                                                    aria-labelledby='demo-row-radio-buttons-group-label'
                                                    name='row-radio-buttons-group'
                                                    className='ml-32'
                                                    {...field}
                                                    {...register('backhand')}
                                                    onChange={(event) => onChangeRadio('backhand', event)}
                                                >
                                                    <FormControlLabel value='onehanded' control={<Radio />} label='Onehanded' />
                                                    <FormControlLabel value='twohanded' control={<Radio />} label='Twohanded' />
                                                </RadioGroup>

                                            )}
                                        />
                                    </FormControl>
                                    <FormControl

                                        className='mb-16 w-1/2'
                                        variant='outlined'>
                                        <FormLabel id='demo-row-radio-buttons-group-label'>Player type</FormLabel>
                                        <Controller
                                            name='player_type'
                                            control={control}
                                            render={({ field }) => (
                                                <RadioGroup
                                                    className='ml-32'
                                                    aria-labelledby='demo-radio-buttons-group-label'
                                                    name='radio-buttons-group'
                                                    {...field}
                                                    {...register('player_type')}
                                                    onChange={(event) => onChangeRadio('player_type', event)}

                                                >
                                                    <FormControlLabel value='counterPuncher' control={<Radio />} label='Counter Puncher' />
                                                    <FormControlLabel value='aggressive' control={<Radio />} label='Aggressive' />
                                                    <FormControlLabel value='allCourtPlayer' control={<Radio />} label='All-Court Player' />
                                                    <FormControlLabel value='netRusher' control={<Radio />} label='Net Rusher' />

                                                </RadioGroup>
                                            )}
                                        />
                                    </FormControl>

                                    <Controller
                                        name='notes'
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                {...register('notes')}
                                                className='mb-16 w-1/2'
                                                label='Notes'
                                                type='text'
                                                multiline
                                                rows={5}
                                                variant='outlined'
                                                required
                                            />
                                        )}
                                    />

                                    {role == 'player' &&
                                        !(levels
                                            && Object.keys(levels).length === 0
                                            && Object.getPrototypeOf(levels) === Object.prototype) &&
                                        <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                                <InputLabel id='demo-simple-select-label'>Current Game Level</InputLabel>
                                                <Controller
                                                    name='current_level'
                                                    control={control}
                                                    render={({ field }) =>
                                                        <Select
                                                            {...field}

                                                            label='Current Game Level'
                                                            control={control}
                                                        // onChange={handleChange}      
                                                        >
                                                            {
                                                                levels.itn_level.map((level) => {
                                                                    return <MenuItem key={level} value={level}>{levels.itn_level_mapping[level]}</MenuItem>
                                                                })
                                                            }
                                                        </Select>}
                                                />
                                            </FormControl>
                                        </Box>
                                    }
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        className='w-1/3 mx-auto mt-16'
                                        aria-label='Register'
                                        disabled={_.isEmpty(dirtyFields) || !isValid}
                                        type='submit'
                                    >
                                        Update account
                                    </Button>

                                </CardContent>}

                        </Card>
                    </div>
                </div>
            </form>
        </motion.div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        postDetails: (outObj) => dispatch(postDetails(outObj))
    };
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
