import React, { useState, useEffect, useCallback }  from 'react';
// import { getCompetancyDetails, updateConnectedChildren } from "./../../../redux/index";
import { getCompetancyDetails, updateConnectedChildren } from "./../../redux/index";
import { connect } from "react-redux";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
// import NavBarParent from "../../player-coach/NavBarParent/NarBarParent";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CompetancyAggrGraph from './CompetancyAggrGraph';
// import { get } from "../../../api/axios.api";
import { get } from "../../api/axios.api"

import { useNavigate, Link, Outlet } from "react-router-dom";
import { Routes, Route, useParams } from "react-router-dom";
import { removeAllNav, setParentCoachNav, resetNavigation } from './../../store/fuse/navigationSlice';
import useManageNavState from "../../custom-hooks/nav-manage";
import { useDispatch } from 'react-redux';

function CompetancyAggregation(props) {
    const navigate = useNavigate();
    const { getCompetancyDetails, aggregatedCompData: { aggrData }, selectedPlayers } = props;
    const [data, setData] = useState({});
    const [role, setRole] = useState("");
    // const [player,setPlayers] = useState([]);
    const dispatch = useDispatch();
    const [userDetails] = useManageNavState({ dispatch, removeAllNav, setParentCoachNav, resetNavigation });
    useEffect(() => {
        if (selectedPlayers.length == 0) {
            selectedPlayers.push(...JSON.parse(localStorage.getItem("child_email_aggr")));
        } else {
            localStorage.setItem("child_email_aggr", JSON.stringify(selectedPlayers));
        }
        getCompetancyDetails(selectedPlayers);
    }, []);
    useEffect(() => {
        setData({ ...aggrData });
    }, [aggrData]);
    useEffect(() => {
            let localStore = localStorage.getItem("localStore");
            localStore = JSON.parse(localStore);
            setRole(localStore.role);
    }, []);


    const routePlayerDevelop = (selectedEmail, current_level) => {
        get("/api/tennismgmt/linktoplayer/itn_level", {
            params: { email: selectedEmail},
        })
            .then((x) => {
                updateConnectedChildren(selectedEmail);
                localStorage.setItem("child_email", selectedEmail);
                localStorage.setItem("current_level", x.data.data.current_level);
                navigate(`../user/${role}/playerdevelopment`);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    
    return (
        <div>
            {/* <NavBarParent /> */}
            <Box
                sx={{
                    display: 'flex',
                    '& > :not(style)': {
                        m: 1,
                        width: 428,
                        height: 428,
                    },
                }}
            >

                {
                    Object.keys(data).map((d, index) => {
                        
                        return (
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Button onClick={() => routePlayerDevelop(d, 'u12Boys')}>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" variant="h5">
                                        {d}
                                        </Typography>
                                    </Button>
                                    <div>
                                        <CompetancyAggrGraph data={ data[d]}></CompetancyAggrGraph>
                                    </div>
                                    
                                </CardContent>
                               
                            </Card>
                    )
                })
            }
            </Box>
            <Outlet></Outlet>

        </div>
    )
}


const mapStateToProps = (state) => {
    console.log(state.aggregatedCompData),'-------------aggregatedCompData---------------';
    return {
        aggregatedCompData: state.aggregatedCompData,
        basicInfo: state.getData ? state.getData.data : {},
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getCompetancyDetails: (selectedPlayers) => dispatch(getCompetancyDetails(selectedPlayers)),
        updateConnectedChildren: (email) =>
            dispatch(updateConnectedChildren(email)),
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompetancyAggregation);

