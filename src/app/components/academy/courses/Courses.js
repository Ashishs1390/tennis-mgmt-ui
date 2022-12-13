import _ from '@lodash';
import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import Icon from '@mui/material/Icon';
import InputLabel from '@mui/material/InputLabel';
import LinearProgress from '@mui/material/LinearProgress';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

import { getAcademyData } from './../../../redux/index';
import { connect } from "react-redux";
// import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ConstructionOutlined } from '@mui/icons-material';
// import reducer from '../store';
// import { getCategories, selectCategories } from '../store/categoriesSlice';
// import { setCourses, selectCourses } from '../store/coursesSlice';

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

function Courses(props) {

  const blue = {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#2196f3',
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565c0',
    900: '#0d47a1',
    A100: '#82b1ff',
    A200: '#448aff',
    A400: '#2979ff',
    A700: '#2962ff'
  };

  const amber = {
    50: '#fff8e1',
    100: '#ffecb3',
    200: '#ffe082',
    300: '#ffd54f',
    400: '#ffca28',
    500: '#ffc107',
    600: '#ffb300',
    700: '#ffa000',
    800: '#ff8f00',
    900: '#ff6f00',
    A100: '#ffe57f',
    A200: '#ffd740',
    A400: '#ffc400',
    A700: '#ffab00'
  };

  const blueGrey = {
    50: '#eceff1',
    100: '#cfd8dc',
    200: '#b0bec5',
    300: '#90a4ae',
    400: '#78909c',
    500: '#607d8b',
    600: '#546e7a',
    700: '#455a64',
    800: '#37474f',
    900: '#263238',
    A100: '#cfd8dc',
    A200: '#b0bec5',
    A400: '#78909c',
    A700: '#455a64'
  };
  const green = {
    50: '#e8f5e9',
    100: '#c8e6c9',
    200: '#a5d6a7',
    300: '#81c784',
    400: '#66bb6a',
    500: '#4caf50',
    600: '#43a047',
    700: '#388e3c',
    800: '#2e7d32',
    900: '#1b5e20',
    A100: '#b9f6ca',
    A200: '#69f0ae',
    A400: '#00e676',
    A700: '#00c853'
  };
  const colorObj = {
    blue,
    amber,
    blueGrey,
    green
  }

  const theme = useTheme();
  const [filteredData, setFilteredData] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [courses, setCourses] = useState([]);
  const [categories, setCategory] = useState([]);
  const { getAcademyData, academyData } = props;

  useEffect(() => {
    getAcademyData();
  }, []);

  useEffect(() => {
    if (academyData.academyStepsData) {
      let data = academyData.academyStepsData[0].courses.map((val) => {
        val.steps = academyData.academyData;
        return val;
      });
      setCourses([...data]);

      let cats = academyData.academyStepsData[0].categories.map((val) => {
        val.color = colorObj[val.color][500];
        return val;
      });
      setCategory([...cats]);
    }
  }, [academyData]);
  useEffect(() => {
    console.log(categories);
  }, [categories]);

  useEffect(() => {
    function getFilteredArray() {
      if (searchText.length === 0 && selectedCategory === 'all') {
        return courses;
      }
      return _.filter(courses, (item) => {
        if (selectedCategory !== 'all' && item.category !== selectedCategory) {
          return false;
        }
        return item.title.toLowerCase().includes(searchText.toLowerCase());
      });
    }

    if (courses) {
      let data = getFilteredArray();
      setFilteredData(data);
    }
  }, [courses,searchText, selectedCategory]);

  function handleSelectedCategory(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSearchText(event) {
    setSearchText(event.target.value);
  }

  function buttonStatus(course) {
    switch (course.activeStep) {
      case course.totalSteps:
        return 'Completed';
      case 0:
        return 'Start';
      default:
        return 'Continue';
    }
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
      <div className="flex flex-col flex-1 max-w-2xl w-full mx-auto px-8 sm:px-16 py-24">
        <div className="flex flex-col shrink-0 sm:flex-row items-center justify-between py-24">
          <TextField
            label="Search for a course"
            placeholder="Enter a keyword..."
            className="flex w-full sm:w-320 mb-16 sm:mb-0 mx-16"
            value={searchText}
            inputProps={{
              'aria-label': 'Search',
            }}
            onChange={handleSearchText}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl className="flex w-full sm:w-320 mx-16" variant="outlined">
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              label="Category"
              value={selectedCategory}
              onChange={handleSelectedCategory}
            >
              <MenuItem value="all">
                <em> All </em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem value={category.value} key={category.id}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {useMemo(() => {
          const container = {
            show: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          };

          const item = {
            hidden: {
              opacity: 0,
              y: 20,
            },
            show: {
              opacity: 1,
              y: 0,
            },
          };

          return (
            filteredData &&
            (filteredData.length > 0 ? (
              <motion.div
                className="flex flex-wrap py-24"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {filteredData.map((course) => {
                  const category = categories.find((_cat) => _cat.value === course.category);
                  return (
                    <motion.div
                      variants={item}
                      className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16"
                      key={course.id}
                    >
                      <Card className="flex flex-col h-256 shadow">
                        <div
                          className="flex shrink-0 items-center justify-between px-24 h-64"
                          style={{
                            background: category.color,
                            color: theme.palette.getContrastText(category.color),
                          }}
                        >
                          <Typography className="font-medium truncate" color="inherit">
                            {category.label}
                          </Typography>
                          <div className="flex items-center justify-center opacity-75">
                            <Icon className="text-20 mx-8" color="inherit">
                              access_time
                            </Icon>
                            <div className="text-14 font-medium whitespace-nowrap">
                              {course.length}
                              min
                            </div>
                          </div>
                        </div>
                        <CardContent className="flex flex-col flex-auto items-center justify-center">
                          <Typography className="text-center text-16 font-medium">
                            {course.title}
                          </Typography>
                          <Typography
                            className="text-center text-13 mt-8 font-normal"
                            color="textSecondary"
                          >
                            {course.updated}
                          </Typography>
                        </CardContent>
                        <CardActions className="justify-center pb-24">
                          <Button
                            to={`/academy/courses/${course.id}/${course.slug}`}
                            component={Link}
                            className="justify-start px-32"
                            color="primary"
                            variant="outlined"
                          >
                            {buttonStatus(course)}
                          </Button>
                        </CardActions>
                        <LinearProgress
                          className="w-full"
                          variant="determinate"
                          value={(course.activeStep * 100) / course.totalSteps}  // need to move to localstorage
                          color="secondary"
                        />
                        <div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <Typography color="textSecondary" className="text-24 my-24">
                  No courses found!
                </Typography>
              </div>
            ))
          );
        }, [filteredData, categories, theme.palette])}
      </div>
    </Root>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAcademyData: () => dispatch(getAcademyData()),
  }
};
const mapStateToProps = (state) => {
  return {
    academyData: state.academyData.data,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Courses);

