import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import reducer from '../store';
import { selectBoards, newBoard, getBoards, resetBoards } from '../store/boardsSlice';
import { useNavigate } from "react-router-dom";
import { post } from "./../../../api/axios.api";
import { postBoardData, getBoardData } from './../../../redux/index';
import { connect } from "react-redux";


const Root = styled('div')(({ theme }) => ({
  '& .board': {
    transitionProperty: 'box-shadow border-color',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },
}));

function Boards(props) {
  const dispatch = useDispatch();
  // const boards = useSelector(selectBoards);
  const navigate = useNavigate();
  const [boards, setBoard] = useState([]);

  const { postBoardData, newBoardData, getBoardData, boardData } = props;
  useEffect(() => {
    getBoardData();
  }, []);

  useEffect(() => {
    setBoard(boardData);
  }, [boardData]);


  useEffect(() => {
    console.log(boards)
  }), [boards];

  // useEffect(() => {
  //   dispatch(getBoards());
  //   return () => {
  //     dispatch(resetBoards());
  //   };
  // }, [dispatch]);

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const postBoard = () => {
    
    post('/api/tennismgmt/boards/newboard', { board_name: "Untitled Board"}).then((x) => {
      console.log('Board added successfully');
      
    })
  }

 
  const boardOne = () => {
    postBoardData();
  };
  useEffect(() => {
    if (!(newBoardData
      && Object.keys(newBoardData).length === 0
      && Object.getPrototypeOf(newBoardData) === Object.prototype)) {
      console.log('---------board------------');
      console.log(newBoardData);
      navigate(`/board/${newBoardData.id}`);

    }
  }, [newBoardData]);

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <Root className="flex grow shrink-0 flex-col items-center">
      <div className="flex grow shrink-0 flex-col items-center container px-16 md:px-24">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.1 } }}>
          <Typography
            className="mt-44 sm:mt-88 sm:py-24 text-32 sm:text-40 font-bold"
            color="inherit"
          >
            Scrumboard App
          </Typography>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-wrap w-full justify-center py-32 px-16"
        >
          {boards && boards.map((board) => (
            <motion.div variants={item} className="w-224 h-224 p-16" key={board.id}>
              {/* <p>Ashish</p> */}
              <Paper
                // to={`/apps/scrumboard/boards/${board.id}/${board.uri}`}
                className="board flex flex-col items-center justify-center w-full h-full rounded-16 py-24 shadow hover:shadow-lg cursor-pointer"
                role="button"
                // component={Link}
              >
                <Icon className="text-56" color="action">
                  assessment
                </Icon>
                <Typography className="text-16 font-medium text-center pt-16 px-32" color="inherit">
                  {board.board_name}
                </Typography>
              </Paper>
            </motion.div>
          ))}
          <motion.div variants={item} className="w-224 h-224 p-16">
            <Paper
              className="flex flex-col items-center justify-center w-full h-full rounded-16 py-24 shadow hover:shadow-lg outline-none cursor-pointer"
              onClick={() => boardOne()}
              onKeyDown={() => boardOne()}
              role="button"
              tabIndex={0}
            >
              <Icon className="text-56" color="secondary">
                add_circle
              </Icon>
              <Typography className="text-16 font-medium text-center pt-16 px-32" color="inherit">
                Add new board
              </Typography>
            </Paper>
          </motion.div>
        </motion.div>
      </div>
    </Root>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    postBoardData: () => dispatch(postBoardData()),
    getBoardData: () => dispatch(getBoardData())
  }
};

const mapStateToProps = (state) => {
  console.log('------------boards-------------')
  console.log(state);
  return {
    newBoardData: state.newBoardData.data,
    boardData: state.boardData.data,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Boards);


// export default withReducer('scrumboardApp', reducer)(Boards);
