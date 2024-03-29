import * as React from "react";
import { useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
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
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { connect } from "react-redux";
import { getVideosForAnalysis, selectVideoAnalysis } from "../../redux/videoanalysis/videoAnalysisActions";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import Paper from '@mui/material/Paper';
import './stroke-analysis.css'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteData } from './../../api/axios.api';
import useUserDetails from './../../custom-hooks/get-userDetails';
// import { SELECT_VIDEO_FOR_ANALYSIS } from "../../../redux/videoanalysis/videoAnalysisActionsTypes";


function StrockAnalysisList(props) {
  const [checkedVideo, setCheckedVideo] = React.useState([]);
  const [disableChecked, setDisableChecked] = React.useState(false);
  const [disableCheckedDel, setDisableCheckedDel] = React.useState(false);
  const [deleteItem, setDeleteItem] = React.useState([]);
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const { getVideosForAnalysis, selectVideoAnalysis, videoAnalysis = { email: '', frames: [] } } = props;
  const [playerName] = useUserDetails(); 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmitForDel = () => {
    deleteData('/api/tennismgmt/videoanalysis/history', { data: { videos: deleteItem } }).then((res) => {
      getVideosForAnalysis();

    });
    setOpen(false);
  }

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

  const handleDelete = (val) => {
    setDeleteItem([{ src: val.src }]);
    handleClickOpen();
  }

  useEffect(() => {
    if (checkedVideo.length == 0) {
      setDisableChecked(true);
      setDisableCheckedDel(true);
    } else {
      setDisableCheckedDel(false)
    }
  }, [checkedVideo])


  const handleToggle = (value) => () => {
    // console.log(value.target);
    const currentIndex = checkedVideo.findIndex(x => x.id === value.id);
    const currentSelectedList = [...checkedVideo];
    if (currentIndex === -1) {
      if (!(currentSelectedList.length > 4)){
        currentSelectedList.push(value);
        setTimeout(() => {
          if (currentSelectedList.length > 4) {
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
  videoAnalysis.data.sort(function (a, b) {

    return new Date(b.date) - new Date(a.date);
  });


  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={12}>
          <Typography className= "stroke-header" variant="h4" gutterBottom component="div">
            Stroke (Video) Analysis List for {playerName}
          </Typography>
          <div className="wrapper1">
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              {videoAnalysis.data && videoAnalysis.data.length > 0 && videoAnalysis.data.map((value, i) => {
                const labelId = `checkbox-list-secondary-label-${i}`;
                return (
                  <React.Fragment key={i}>
                   
                    <ListItem
                      alignItems="flex-start"
                      secondaryAction={
                        <div>
                        <Checkbox
                          edge="false"
                          onChange={handleToggle(value)}
                          inputProps={{ "aria-labelledby": labelId }}
                          // disabled={isChecked(value)}
                          />
                          <DeleteIcon onClick={()=> handleDelete(value)} />
                        </div>
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
                            {value.role}
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
              <Paper elevation={1}>
                <Button className="btn-select" variant="contained" disabled={disableChecked} fullWidth="true" onClick={() => { selectVideoForAnalysis() }}>Compare</Button>
              </Paper>
              {/* <Paper elevation={2}>
                <Button className="btn-delete" variant="contained" disabled={disableCheckedDel}  fullWidth="true" onClick= { handleClickOpen }>Delete</Button>
              </Paper> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <div>
        
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure that you want to delete this items?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
             {/* Are you sure that you want to delete this items. */}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            
            <Button onClick={handleSubmitForDel} autoFocus>
              Yes
            </Button>
            <Button onClick={handleClose}>No</Button>
          </DialogActions>
        </Dialog>
      </div>
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
