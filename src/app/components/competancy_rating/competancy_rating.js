import * as React from "react";
import { useEffect, useState, useRef, createContext } from "react";
import BundelCompetancy from "./bundel_competancy";
import {
  getCompetancy,
  updateCompetancyWeight,
  saveCompetancy,
} from "./../../redux/index";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Loading from "./../common/loading/loading";
import TextField from "@mui/material/TextField";
import { getDateYYYYMMDD,throttle } from "../../util/util";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import { getDateWithTime } from '../../util/util';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import "./competancy.css";

export const AssessmentContext = createContext();

function CompetancyRating(props) {
  const { getCompetancy, updateCompetancyWeight, saveCompetancy, loading } =
    props;
  const [competancyData, SetCompetancyData] = useState([]);
  const [competancyDataHandel, SetCompetancyDataHandel] = useState([]);
  const stateRef = useRef();
  const assDateStateRef = useRef();
  useEffect(() => {
    assDateStateRef.current = getDateYYYYMMDD(new Date()) +
      "T" +
      new Date().toString().match(/\d{2}:\d{2}:\d{2}/g) +
      ".000Z"    
  }, []);

  const [{ playerName }] = useState({
    playerName: (JSON.parse(localStorage.getItem("childInfo")).length !== 0) ? `${JSON.parse(localStorage.getItem("childInfo")).first_name} ${JSON.parse(localStorage.getItem("childInfo")).last_name}`
      : `${JSON.parse(localStorage.getItem("localStore")).first_name} ${JSON.parse(localStorage.getItem("localStore")).last_name}`,
  });

  const [backdropOpen, setBackdropOpen] = React.useState(false);

  const [{ goalLevel }] = useState({
    goalLevel: (JSON.parse(localStorage.getItem("childInfo")).length !== 0) ? JSON.parse(localStorage.getItem("childInfo")).goal_level || '' : JSON.parse(localStorage.getItem("localStore")).goal_level || ''
  })
  const [{ timeFrame }] = useState({
    timeFrame: (JSON.parse(localStorage.getItem("childInfo")).length !== 0) ? JSON.parse(localStorage.getItem("childInfo")).time_frame || '' : JSON.parse(localStorage.getItem("localStore")).time_frame || ''
  })
  const playsObj = {
    right: 'Right handed',
    left: 'Left hannded'
  };

  
  const[{ playerDescription }] = useState({
    playerDescription: (JSON.parse(localStorage.getItem("childInfo")).length !== 0) ? `${playsObj[JSON.parse(localStorage.getItem("childInfo")).plays] || ''}, ${JSON.parse(localStorage.getItem("childInfo")).player_type || ''},${JSON.parse(localStorage.getItem("childInfo")).height || ''} ${JSON.parse(localStorage.getItem("childInfo")).height_type || ''},${JSON.parse(localStorage.getItem("childInfo")).weight || ''} ${JSON.parse(localStorage.getItem("childInfo")).weight_type || ''}`
      : `${playsObj[JSON.parse(localStorage.getItem("childInfo")).plays] || ''}, ${JSON.parse(localStorage.getItem("childInfo")).player_type || ''},${JSON.parse(localStorage.getItem("childInfo")).height || ''} ${JSON.parse(localStorage.getItem("childInfo")).height_type || ''},${JSON.parse(localStorage.getItem("childInfo")).weight || ''} ${JSON.parse(localStorage.getItem("childInfo")).weight_type || ''}`,
  });
  const [dotPosition, setDotPosition] = useState({x: 0, y: 0});

  const current_level = localStorage.getItem("current_level");
  const navigate = useNavigate();
  const updateBundelCompetancyRating = (i, j, weight) => {
    //updateCompetancyWeight(i, j, weight);
    const data = competancyData;
    data[i].values[j].assigned_weight = weight;
    data[i].values[j].invalidWeight = false;
  };
  useEffect(() => {
    getCompetancy(current_level);
  }, []);
  useEffect(() => {
    if (props.isSaved) {
      navigate("../playerdevelopment");
    } else if (props.isSaved === false) {
      alert("Issue occured while saving competancy.");
    }
  }, [props.isSaved]);
  useEffect(() => {
    if (competancyDataHandel.length <= 0) {
      props.competancyData.forEach((comp) => {
        comp.values.forEach((co) => {
            // if (co.prev_weight) {
            co.prev_weight = co.assigned_weight;
          // } else {
              // co.prev_weight = co.assigned_weight;
          // }
        });
      })
      SetCompetancyDataHandel(props.competancyData);
    }
    stateRef.current = props.competancyData;
    SetCompetancyData(props.competancyData);
  }, [props.competancyData]);
  const [assDate, setAssDate] = useState(getDateYYYYMMDD(new Date()));
 
  const setDate = (selectedDate) => {
    const currentDate = getDateYYYYMMDD(selectedDate) +
      "T" +
      new Date().toString().match(/\d{2}:\d{2}:\d{2}/g) +
      ".000Z";
    assDateStateRef.current = currentDate;
    setAssDate(
      currentDate
    );
  };
  const onSumbit = () => {
    let flag = true;
    setBackdropOpen(!backdropOpen);
    stateRef.current.forEach((x) => {
      flag =
        x.values.every((y) => y.hasOwnProperty('assigned_weight') && y.assigned_weight > 0) && flag;
    });
    const assignedWeights = stateRef.current.map((x) => {
      return {
        ...x,
        values: x.values.map(y => {
          if (y.assigned_weight && y.assigned_weight > 0) {
            return {
              ...y,
              invalidWeight: false
            }
          } else {
            return {
              ...y,
              invalidWeight: true
            }
          }
        })
      }
    });
    SetCompetancyDataHandel(assignedWeights);
    if (flag) {
      saveCompetancy(
        stateRef.current.map((x) => {
          return {
            ...x,
            assessment_date: assDateStateRef.current.match(/T/g)
              ? assDateStateRef.current
              : getDateWithTime(new Date()),
          };
        })
      );
    } else {
      alert("Please rate all the questions.");
    }
  };
  const throttledClick = useRef(throttle(onSumbit, 3000,this)).current;


  const getDotPosition = (e) => {
    if ([...e.target.classList].indexOf('MuiButton-root') >= 0) {
      const { top, left } = e.target.parentElement.getBoundingClientRect();
      setDotPosition({x: left - 15 ,y: top + window.scrollY + 10});
    }
  };

  return (
    <AssessmentContext.Provider value={{ getDotPosition }}>
      <div id="CompetancyDetails">
        {/* { dotPosition.y > 0 && <div className="dot-indicator" style={{top: dotPosition.y + 'px', left:  dotPosition.x + 'px'}}></div>} */}
        <Typography
          sx={{ display: "block" }}
          component="h3"
          variant="h3"
          align="center"
          color="text.primary"
        >
          Player Assessment
        </Typography>
        <Box
          sx={{
            p: 2,
          }}
        >

          <div className="player-details">
            <table>
              <tbody>
                <tr className="player-content">
                  <td>
                    <Typography
                      sx={{ display: "block" }}
                      component="p"
                      variant="h6"
                      align="left"
                      color="text.primary"
                    >
                      Player
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      sx={{ display: "block" }}
                      component="p"
                      variant="h6"
                      align="left"
                      color="text.primary"
                    >
                      {playerName}
                    </Typography>
                  </td>
                </tr>
                <tr className="player-content">
                  <td>
                    <Typography
                      sx={{ display: "block" }}
                      component="p"
                      variant="h6"
                      align="left"
                      color="text.primary"
                    >
                      Player description
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      sx={{ display: "block" }}
                      component="p"
                      variant="h6"
                      align="left"
                      color="text.primary"
                    >
                      {playerDescription}
                    </Typography>
                  </td>
                </tr>
                <tr className="player-content">
                  <td>
                    <Typography
                      sx={{ display: "block" }}
                      component="p"
                      variant="h6"
                      align="left"
                      color="text.primary"
                    >
                      Player Evaluation 
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      sx={{ display: "block" }}
                      component="p"
                      variant="h6"
                      align="left"
                      color="text.primary"
                    >
                      {current_level}
                    </Typography>
                  </td>
                </tr>
                <tr className="player-content">
                  <td>
                    <Typography
                      sx={{ display: "block" }}
                      component="p"
                      variant="h6"
                      align="left"
                      color="text.primary"
                    >
                      Goal Level 
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      sx={{ display: "block" }}
                      component="p"
                      variant="h6"
                      align="left"
                      color="text.primary"
                    >
                      {goalLevel}

                    </Typography>
                  </td>
                </tr>
                <tr className="player-content">
                  <td>
                    <Typography
                      sx={{ display: "block" }}
                      component="p"
                      variant="h6"
                      align="left"
                      color="text.primary"
                    >
                      Time Frame
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      sx={{ display: "block" }}
                      component="p"
                      variant="h6"
                      align="left"
                      color="text.primary"
                    >
                      {timeFrame}
                    </Typography>
                  </td>
                </tr>
                <tr className="player-content">
                  <td>
                    <Typography
                      sx={{ display: "block" }}
                      component="p"
                      variant="h6"
                      align="left"
                      color="text.primary"
                    >
                      Assessment Date
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      sx={{ display: "block" }}
                      component="p"
                      variant="h6"
                      align="left"
                      color="text.primary"
                    >
                      <input
                        type="date"
                        defaultValue={assDate}
                        id="AssessmentDate"
                        name="assessmentDate"
                        onChange={(e) => {
                          setDate(e.target.value);
                        }}
                      ></input>
                    </Typography>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Box>
        <Loading open={loading} />
        {competancyDataHandel && competancyDataHandel.length > 0 ? (
          [...competancyDataHandel].map((x, i) => (
            <div key = { x }>
              <BundelCompetancy 
              {...x}
              key={x.competency_bundle}
              updateBundelCompetancyRating={updateBundelCompetancyRating.bind(
                this,
                i
              )}
              />
            </div>
          ))
        ) : (
          <p> Data Loading... </p>
        )}
        <Box
          component="form"
          noValidate
          autoComplete="off"
          className="fieldbox"
          style={{display: 'flex', justifyContent: 'center'}}
        >
          <Button
            style={{width: '350px'}}
            variant="contained"
            color="secondary"
            onClick={()=>throttledClick()}
          >
            Submit
          </Button>
        </Box>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={backdropOpen}
        >
          <CircularProgress color="inherit" />
          {backdropOpen}
        </Backdrop>
      </div>
    </AssessmentContext.Provider>
  );
}

// export default CompetancyRating;

const mapDispatchToProps = (dispatch) => {
  return {
    getCompetancy: (current_level) => dispatch(getCompetancy(current_level)),
    updateCompetancyWeight: (bundel, competancy, weight) =>
      dispatch(updateCompetancyWeight({ bundel, competancy, weight })),
    saveCompetancy: (data) => dispatch(saveCompetancy({ data })),
  };
};

const mapStateToProps = (state) => {
  return {
    competancyData: state.competancy.competancyData,
    loading: state.competancy.loading,
    isSaved: state.competancy.isSaved,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompetancyRating);

/*
[...document.querySelectorAll('#CompetancyDetails > div')].filter((x, i) => ( i != 0 && x)).forEach(x => {
    const h = [...x.querySelectorAll('.MuiListItemSecondaryAction-root')];
    h.forEach(x => {
    const f = x.querySelectorAll('Button')[Math.floor((Math.random() * 9) +1)];
    console.log(f.click())
})
})
*/
