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
import moment from 'moment';
import Paper from '@mui/material/Paper';
import './stroke-analysis.css'
// import { SELECT_VIDEO_FOR_ANALYSIS } from "../../../redux/videoanalysis/videoAnalysisActionsTypes";


function StrockAnalysisList(props) {
  const [checkedVideo, setCheckedVideo] = React.useState([]);
  const [disableChecked, setDisableChecked] = React.useState(false);
  const [age, setAge] = React.useState("");
  const { getVideosForAnalysis, selectVideoAnalysis, videoAnalysis = { email: '', frames: [] } } = props;

  const navigate = useNavigate();
  useEffect(() => {
    getVideosForAnalysis();
  }, []);



  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const selectVideoForAnalysis = () => {
    navigate("/videoanalysis/strockanalysislist");
  }

  const handleToggle = (value) => () => {
    const currentIndex = checkedVideo.findIndex(x => x.id === value.id);
    const currentSelectedList = [...checkedVideo];
    if (currentIndex === -1) {
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
  console.log('----------------');
  console.log(videoAnalysis.data);
  videoAnalysis.data.sort(function (a, b) {

    return new Date(b.date) - new Date(a.date);
  });


  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Typography className= "stroke-header" variant="h4" gutterBottom component="div">
            Stroke (Video) Analysis List
          </Typography>
          <div className="wrapper1">
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {videoAnalysis.data && videoAnalysis.data.length > 0 && videoAnalysis.data.map((value, i) => {
                console.log(value);
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
                        <Avatar alt="Remy Sharp" height={value.height} width={value.width} src={value.thumbnail_url || "/static/images/avatar/1.jpg"} />
                      </ListItemAvatar>
                      <ListItemText
                        secondary={<p style={{ fontStyle: "italic", margin: 0 }}>
                          <Typography
                            sx={{ display: "block" }}
                            component="h2"
                            variant="body2"
                            color="text.primary"
                          >
                            <b>Title: </b>
                            {value.title || value.id}
                          </Typography>
                          <Typography
                            sx={{ display: "block" }}
                            component="h2"
                            variant="body2"
                            color="text.primary"
                          >
                            <b>Author Name: </b>
                            {value.author_name || value.id}
                          </Typography>

                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            , posted on: {moment(value.date).format('DD-MMM-YYYY')}
                          </Typography>
                        </p>} />

                      <Divider variant="inset" component="li" />

                    </ListItem>
                  </React.Fragment>
                )
              })}
            </List>
          </div>
          <Box className="wrapper2">

            {/* <Button variant="contained" onClick={() => { console.log(props)}}>Filter</Button> */}
            <Box
              className="paper"
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                  m: 1,
                  width: 328,
                  height: 128
                },
              }}
            >
              <Paper elevation={3}>
                <Button className="btn-select" variant="contained" fullWidth="true" onClick={() => { selectVideoForAnalysis() }}>select</Button>
              </Paper>
            </Box>
          </Box>
        </Grid>
      </Grid>
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
  return { videoAnalysis: state.videoAnalysis };
};

export default connect(mapStateToProps, mapDispatchToProps)(StrockAnalysisList);
