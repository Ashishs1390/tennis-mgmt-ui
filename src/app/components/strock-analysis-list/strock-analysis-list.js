import * as React from "react";
import { useEffect } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { connect } from "react-redux";
import { getVideosForAnalysis, selectVideoAnalysis } from "../../redux/videoanalysis/videoAnalysisActions";
import { useNavigate } from "react-router-dom";
// import { SELECT_VIDEO_FOR_ANALYSIS } from "../../../redux/videoanalysis/videoAnalysisActionsTypes";


function StrockAnalysisList(props) {
  const [checkedVideo, setCheckedVideo] = React.useState([]);
  const [disableChecked, setDisableChecked] = React.useState(false);
  const [age, setAge] = React.useState("");
  const { getVideosForAnalysis, selectVideoAnalysis, videoAnalysis = {email: '', frames: []}} = props;
  
  const navigate = useNavigate();
  useEffect(()=>{
    getVideosForAnalysis();
}, []);



  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const selectVideoForAnalysis = () => {
    console.log("-----------selectVideoForAnalysis-------------");
    console.log(navigate)
    navigate("/videoanalysis/strockanalysislist");
  } 

  const handleToggle = (value) => () => {
    const currentIndex = checkedVideo.findIndex(x => x.id === value.id);
    const currentSelectedList = [...checkedVideo];
    if(currentIndex === -1) {
      if (currentSelectedList.length > 4) {
        alert('not allowed');
      } else {
        currentSelectedList.push(value);
        setTimeout(() => {
          if (currentSelectedList.length > 3) {
            setDisableChecked(true);
          } else {
            setDisableChecked(false);
          }
        }, 10);
      }
    } else {
      setDisableChecked(false);
      currentSelectedList.splice(currentIndex, 1);
    }

    setCheckedVideo(currentSelectedList);
    selectVideoAnalysis(currentSelectedList);
  };

  const isChecked = (i) => {
    return checkedVideo.findIndex(x => x.id === i.id) === -1 ? true : false;
  };

  return (
    <>
      <Typography variant="h4" gutterBottom component="div">
        Stroke (Video) Analysis List
      </Typography>
      <Box>
        <Grid container spacing={2}>
          {/* <Grid item xs={10} md={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Player Name
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Select Player Name"
                onChange={handleChange}
              >
                <MenuItem value={10}>Kobara Obove</MenuItem>
                <MenuItem value={20}>Twenty Noun</MenuItem>
                <MenuItem value={30}>Rand Koltan</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
          <Grid item xs={10} md={2}>
            {/* <Button variant="contained" onClick={() => { console.log(props)}}>Filter</Button> */}
            <Button variant="contained" fullWidth = "true" onClick={() => { selectVideoForAnalysis() }}>select</Button>
          </Grid>
        </Grid>
      </Box>
      {/* <Stack spacing={2}>
        <Pagination
          count={10}
          variant="outlined"
          color="primary"
          showFirstButton
          showLastButton
        />
      </Stack> */}
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {videoAnalysis.data && videoAnalysis.data.length > 0 && videoAnalysis.data.map((value, i) => {
          const labelId = `checkbox-list-secondary-label-${i}`;
          return (
            <React.Fragment key={i}>
               <ListItem
                alignItems="flex-start"
                secondaryAction={
                  <Checkbox
                    edge="false"
                    onChange={handleToggle(value)}
                    inputProps={{ "aria-labelledby": labelId }}
                    disabled={isChecked(value) && disableChecked}
                  />
                }
              >
                <ListItemAvatar>
                   <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={`"Video ${i} ---- ${value.id}"`}
                  secondary={<p style={{ fontStyle: "italic", margin: 0 }}>
                    <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                       {value.id}, by
                      </Typography>
                      <Link href="#">
                         {" Sasha Frijanic (MOT2010)'s T-Log"}
                       </Link>
                       <Typography
                         sx={{ display: "inline" }}
                         component="span"
                         variant="body2"
                         color="text.primary"
                       >
                         , posted on: {value.date}
                      </Typography>
                  </p>}/>

                  <Divider variant="inset" component="li" />
                  
              </ListItem>
            </React.Fragment>
          )
        })}
      </List>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
      getVideosForAnalysis: () => dispatch(getVideosForAnalysis()),
    selectVideoAnalysis: (outObj) => dispatch(selectVideoAnalysis(outObj))
  };
};

const mapStateToProps = (state) => {
  return {videoAnalysis: state.videoAnalysis};
};

export default connect(mapStateToProps, mapDispatchToProps)(StrockAnalysisList);
