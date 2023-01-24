import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
    fetchLinkedPlayerList,
} from "./../../redux/index";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ListItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from "@mui/material/Button";
import { useNavigate, Link, Outlet } from "react-router-dom";
import CompetancyAggregation from "./CompetancyAggregation";
import "./compentacy.css";
// import NavBarParent from "../../player-coach/NavBarParent/NarBarParent";
function UserListAggregation(props) {
    const navigate = useNavigate();
    const { fetchLinkedPlayerList, selectedPlayerList } = props;
    const [showAggrePage, setShowAggrePage] = useState(true);
    const [selectedPlayers, setSelectedPlayers] = useState([...selectedPlayerList]);
    const updateCheckBoxSelection = (value) => {
        if (!selectedPlayers.includes(value)) {
            selectedPlayers.push(value);
        } else {
            const index = selectedPlayers.indexOf(value);
            if (index > -1) {
                selectedPlayers.splice(index, 1);
            }
        }
        setSelectedPlayers([...selectedPlayers]);
    }

    useEffect(() => {
        fetchLinkedPlayerList();
    }, []);
    const onSumbit = () => {
        if (selectedPlayers.length > 0) {
            setShowAggrePage(true);
        }
       
    }

    return (
        <Box sx={{ flexGrow: 1 }} className="AggregationWrapper">
            <Typography variant="h4" gutterBottom component="div" align="center" className="HomePageHeader">
                Player Comparison
            </Typography>
            {!showAggrePage &&
            <Grid container spacing={2} className="Ashish">
                    <Grid item xs={10} md={12} className="Ashish1">
                        {/* <NavBarParent></NavBarParent> */}

                    {
                        searchedPlayerList && searchedPlayerList.map((value) => {
                            return (
                                //className="aggregationList"
                                <ListItem key={value} className="Ashish2" > 
                                    <FormGroup>
                                        <FormControlLabel value={value}
                                            onChange={() => {
                                                updateCheckBoxSelection(value)
                                            }}
                                            className="labelWidth"
                                            
                                            control={<Checkbox />} label={value} />
                                    </FormGroup>
                                </ListItem>
                            )
                        })
                    }
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                        className="fieldbox buttonWrapper"
                        
                    >
                        <Button
                            sizeMedium
                            variant="contained"
                            color="primary"
                            onClick={onSumbit}
                        >
                            Button Compare
                        </Button>
                    </Box>
                </Grid>
                </Grid>
            }
            {showAggrePage && <div>
                {/* <Grid container spacing={2}> */}
                    <Grid item xs={10} md={12}>
                    <CompetancyAggregation selectedPlayers={selectedPlayers}></CompetancyAggregation>
                    </Grid>
                {/* </Grid> */}
            </div>}
        </Box>
    )
}
const mapStateToProps = (state) => {
    return state.linkPlayerReducer;
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchLinkedPlayerList: () => dispatch(fetchLinkedPlayerList()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(UserListAggregation);

// export default UserListAggregation;