import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useNavigate, Link, Outlet } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Button from '@mui/material/Button';
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import "./PlayerDevelopment.css";
import PlayerDevelopmentListItem from "./PlayerDevelopmentListItem";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import FormatBoldIcon from '@mui/icons-material/FormatBold';
// import DatesPopUp from './../../css-components/DatesPopUp/DatesPopUp';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import moment from 'moment';
import { getDateWithTime } from './../../util/util';

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

import { getPersonalDevPageInfo, getPersonalDevOnDate, fetchDetails } from "./../../redux/index";
import { connect } from "react-redux";

import { emptyCompetancySave } from '../../redux/index'

import Loading from "../common/loading/loading";
// import DatesPopUp from "../../css-components/DatesPopUp/DatesPopUp";
import { getDateDDMMYYYY } from '../../util/util';
import PlayerDevelopmentDatesSection from "./PlayerDevelopmentDatesSection";

const rolesArr = ["coach", "parent"];
const rolesOrder = ["player", "parent", "coach"];

const radioSelectionList = (data) => data.reduce(
  (a, c) => c.role ?
    (a[c.role]
      ? { ...a, [c.role]: [...a[c.role], c.assessment_date] }
      : { ...a, [c.role]: [c.assessment_date] }) : a,
  {}
);
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function PlayerDevelopment(props) {
  const navigate = useNavigate();
  const [compData, setCompetancyData] = useState([]);
  const [datesArr, setDatesArr] = useState({});
  const [maxDate, setMaxDate] = useState("");
  const [displayRowArr, setDisplayRow] = useState([]);
  const [selectedRoles, setSelectedRole] = useState(['parent', 'coach']);
  const [hideScores, setHideScore] = useState(true);
  const [selectedCheckBox, setSelectedCheckBox] = useState({ player: [], parent: [], coach: [] });
  const {
    getPersonalDevPageInfo,
    pdpData: { progressBarData, assessmentDates, assessmentNewDates, loading = false },
    userInfo
  } = props;
  //const [selectedRadios, setSelectedRadios] = useState({player: radioSelectionList.player[0], parent: radioSelectionList.parent[0], coach: radioSelectionList.coach[0]});
  const [selectedRadios, setSelectedRadios] = useState({ player: '', parent: '', coach: '' });
  const child_email = localStorage.getItem("child_email")
  const localStore = localStorage.getItem("localStore");

  useEffect(() => {
    localStorage.setItem("childInfo", JSON.stringify(userInfo.data));
  }, [userInfo]);

  // const [{ playerName }] = useState({
  //   playerName: (JSON.parse(localStorage.getItem("childInfo")).length !== 0) ? `${JSON.parse(localStorage.getItem("childInfo")).first_name} ${JSON.parse(localStorage.getItem("childInfo")).last_name}`
  //     : `${JSON.parse(localStorage.getItem("localStore")).first_name} ${JSON.parse(localStorage.getItem("localStore")).last_name}`,
  // });
  const [userName, setUserName] = useState("");
  const [childEmail, setEmail] = useState("");
  const [role, setRole] = useState("");
  useEffect(() => {
    setTimeout(() => {
      const { first_name, last_name, role } = JSON.parse(localStore);
      const fullName = `${first_name} ${last_name}`;
      setRole(role);
      setUserName(fullName);
    })

  }, [localStore]);
  useEffect(() => {
    const current_level = localStorage.getItem("current_level");
    getPersonalDevPageInfo(current_level);
    props.emptyCompetancySave();
  }, []);
  useEffect(() => {
    setEmail(child_email);

  }, [child_email]);

  useEffect(() => {
    if (role == "parent" || role == "coach") {
      props.fetchDetails(childEmail);
    }
  }, [role]);



  const updateCheckBoxSelection = (value, role) => {
    if (!selectedCheckBox[role].includes(value)) {
      selectedCheckBox[role].push(value);
    } else {
      const index = selectedCheckBox[role].indexOf(value);
      if (index > -1) {
        selectedCheckBox[role].splice(index, 1);
        if (selectedCheckBox[role].length >= 0) {
          selectedCheckBox[role].push([]);
        }
      }
    }
    props.getPersonalDevOnDate({ ...selectedCheckBox });
    setSelectedCheckBox({ ...selectedCheckBox });
  }

  const handleRoleChange = (ev, role) => {
    const selectedRoleIndex = selectedRoles.indexOf(role);
    if (selectedRoleIndex >= 0) {
      selectedRoles.splice(selectedRoleIndex, 1);
      setSelectedRole([...selectedRoles]);
    } else {
      setSelectedRole([...selectedRoles, role]);
    }
  };

  const orderByRoles = (data, rolesOrder) => {
    return Object.keys(data).map((item) => {
      var n = rolesOrder.indexOf(item);
      return [n, { [item]: data[item] }]
    }).sort().reduce(function (acc, j) {
      if (acc) {
        acc = { ...acc, ...j[1] }
      }
      return acc;
    }, {});
  }

  const splicedByRoles = (data) => {
    Object.keys(data).map((item) => {
      return data[item];
    }).reduce((acc, i) => {
      return acc;
    }, {});
  }

  const updateNav = (link) => {
    navigate(link);
    // setMenuOpen(false);
  };

  useEffect(() => {
    if (
      progressBarData && assessmentNewDates && assessmentNewDates.length != 0
    ) {
      setCompetancyData([...progressBarData]);
      const data = radioSelectionList([...assessmentNewDates]);
      console.log(data, 'data');
      const orderedData = orderByRoles(data, rolesOrder);
      const splicedData = splicedByRoles(orderedData);
      const getValue = (val) => {
        return val && val.length >= 0 ? val[0] : [];
      }
      if (selectedRadios.player === '') {
        setSelectedRadios({ player: getValue(data?.player), parent: getValue(data?.parent), coach: getValue(data?.coach) })
      }
      if (selectedCheckBox.player.length === 0) {
        let obj = {
          player: [],
          parent: [],
          coach: []
        };
        obj.player.push(getValue(data?.player));
        obj.parent.push(getValue(data?.parent));
        obj.coach.push(getValue(data?.coach));

        setSelectedCheckBox({ ...obj });
      } else {
        let newDates = Object.keys(data).reduce((acc, curr) => {
          if (!acc[curr]) {
            acc[curr] = [];
          }
          const datesArray = data[curr].map((element) => new Date(element));
          acc[curr].push(getDateWithTime(new Date((Math.max(...datesArray)))));
          return acc;
        }, {});
        setSelectedCheckBox({ ...newDates });

        // let dates = Object.keys(data).reduce((acc, curr) => {
        //   if (curr == coach) {
              
        //     }
        // }, {
        //   coach: [],
        //   player: [],
        //   parent:[]
        // })

      }
      setDatesArr(orderedData);
      let getMaxDate = new Date(
        Math.max(...assessmentNewDates.map((e) => new Date(e.assessment_date)))
      );

      getMaxDate = getDateWithTime(getMaxDate);
      setMaxDate(getMaxDate);
      setDisplayRow([getMaxDate]);
    }
  }, [progressBarData]);

  const handleHideScores = (ev) => {
    setHideScore(!hideScores);

  }
  useEffect(() => {
    console.log('----selectedCheckBox-----')
    console.log(selectedCheckBox);
  }, [selectedCheckBox])


  const updateRadioSelections = (value, object) => {
    const selectedDates = { ...selectedRadios, [object]: value };
    props.getPersonalDevOnDate(selectedDates);
    setSelectedRadios(selectedDates);
  }
  return (
    // <div>"test"</div>
    <div className="PlayerAssessmentPage">
      {/* <FormatBoldIcon>C</FormatBoldIcon> */}
      <Loading open={loading} />
      <div className="RolesContainer">
        <FormGroup>
          {rolesArr.map((role, i) => {
            return (
              <>
                <FormControlLabel
                  control={<Checkbox />}
                  key={role}
                  label={role[0].toUpperCase() + role.substring(1)}
                  checked={!!selectedRoles.find(x => x === role)}
                  onChange={(ev) => {
                    handleRoleChange(ev, role);
                  }}
                />
                <span className="alphabet">{`[${role[0].toUpperCase()}]`}</span>
              </>
            );
          })}
        </FormGroup>
      </div>
      <div className="hideScoreContainer">
        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} label="show scores" onChange={(ev) => {
            handleHideScores(ev);
          }} />
        </FormGroup>
      </div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div" className="assessmentheader">
          Player assessment -skill view
        </Typography>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">Name: {userInfo.data.first_name} {userInfo.data.last_name}</Typography>
      </Box>

      <div className="NewAssessment">
        <Button className="assessment-btn" variant="contained"
          onClick={() => {
            updateNav("../assessments");
          }}
        >

          Assessments
        </Button>
      </div>
      {/* <PlayerDevelopmentDatesSection datesArr={datesArr} /> */}
      <div className="checkboxcontainer">
        {
          Object.keys(datesArr).map((x, index) => {
            return (
              <Grid className="DatesRole" key={x} item xs={12} md={2}>
                <Item>
                  <Typography variant="h6" component="div">
                    {x[0].toUpperCase() + x.slice(1)}
                  </Typography>
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    {
                      datesArr[x].map((value, i) => {
                        return (
                          <ListItem key={value} disablePadding>
                            <ListItemButton role={undefined} dense>
                              <ListItemIcon>
                                <FormControlLabel
                                  value={value}
                                  onChange={() => {
                                    // updateRadioSelections(value, x, false);
                                    updateCheckBoxSelection(value, x)
                                  }}
                                  // inputprops={{ "aria-labelledby": labelId }}
                                  control={<Checkbox />}
                                  checked={selectedCheckBox[x].includes(value)}
                                  label={`${getDateDDMMYYYY(value)}`}
                                />
                              </ListItemIcon>
                            </ListItemButton>
                          </ListItem>
                        )
                      })
                    }
                  </List>
                </Item>
              </Grid>
            )
          })
        }
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <List className="MainCompetancyList">
            {compData.map((item, index) => {
              return (
                <ListItem
                  className="CompetancyListItem"
                  key={item.competency_bundle}
                >
                  <ListItemText className="CompetancyBundleLabel">
                    {item.competency_bundle}
                  </ListItemText>
                  <List className="SubCompetancyList">
                    {item.competencies.map((val, index) => {
                      return (
                        <PlayerDevelopmentListItem
                          val={val}
                          index={index}
                          maxDate={maxDate}
                          displayRowArr={displayRowArr}
                          selectedRoles={selectedRoles}
                          hideScores={hideScores}
                          assessmentDates={assessmentNewDates}
                        ></PlayerDevelopmentListItem>
                      );
                    })}
                  </List>
                </ListItem>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    getPersonalDevPageInfo: (current_level) =>
      dispatch(getPersonalDevPageInfo(current_level)),
    getPersonalDevOnDate: (data) => dispatch(getPersonalDevOnDate(data)),
    emptyCompetancySave: () => dispatch(emptyCompetancySave()),
    fetchDetails: (email) => dispatch(fetchDetails(email)),

  };
};

const mapStateToProps = (state) => {
  return {
    pdpData: state.personalDevelopment.pdpData,
    userInfo: state.getData
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerDevelopment);
