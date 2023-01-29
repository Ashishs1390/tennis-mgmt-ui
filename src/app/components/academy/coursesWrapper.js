import React, { useState, useEffect } from 'react';
import Courses from './courses/Courses'
import { styled, useTheme } from '@mui/material/styles';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';

// import "./courses.css";

const Root = styled('div')(({ theme }) => ({
    '& .header': {
        background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
        color: theme.palette.getContrastText(theme.palette.primary.main),
        '& .header-icon': {
            position: 'absolute',
            top: -64,
            left: 0,
            opacity: 0.04,
            fontSize: 512,
            width: 512,
            height: 512,
            pointerEvents: 'none',
        },
    },
}));
function CoursesWrapper() {
    const [isPayment, setIsPayment] = useState(true)
    let localData = localStorage.getItem("localStore");
    localData = JSON.parse(localData);

    useEffect(() => {
        setIsPayment(localData.isPayment);
    }, [localData])
    
    if (isPayment) {
        return <Courses/>
    }
    return (
        <Root className="flex flex-col flex-auto shrink-0 w-full">
            <div className="header relative overflow-hidden flex shrink-0 items-center justify-center h-200 sm:h-288">
                <div className="flex flex-col max-w-2xl mx-auto w-full p-24 sm:p-32">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0 } }}>
                        <Typography color="inherit" className="text-24 sm:text-44 font-bold tracking-tight">
                            Welcome to Academy
                        </Typography>
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }}>
                        <Typography
                            color="inherit"
                            className="text-12 sm:text-14 mt-8 sm:mt-16 opacity-75 leading-tight sm:leading-loose"
                        >
                            Our courses will step you through the process of building a small application, or
                            adding a new feature to an existing application. Our courses will step you through the
                            process of building a small application, or adding a new feature to an existing
                            application.
                        </Typography>
                    </motion.div>
                </div>

                <Icon className="header-icon">school</Icon>
            </div>
            <div className="overflow-hidden flex shrink-0 items-center justify-center content-margin">
                <h1>Please Subscription..!!</h1>
            </div>
        </Root>
    )

    
}

export default CoursesWrapper;