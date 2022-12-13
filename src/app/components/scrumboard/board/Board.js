
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Hidden from '@mui/material/Hidden';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Toolbar from '@mui/material/Toolbar';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import { useRef, useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import withRouter from '@fuse/core/withRouter';
import { useDeepCompareEffect } from '@fuse/hooks';
import GlobalStyles from '@mui/material/GlobalStyles';
import reducer from '../store';
import { reorderCard, reorderList, resetBoard, getBoard } from '../store/boardSlice';
import BoardAddList from './BoardAddList';
import BoardList from './BoardList';
import BoardTitle from './BoardTitle';
import BoardCardDialog from './dialogs/card/BoardCardDialog';
import BoardSettingsSidebar from './sidebars/settings/BoardSettingsSidebar';
import { connect } from "react-redux";

import { getBoardData } from './../../../redux/index';

function Board(props) {
  console.log('render');
  const dispatch = useDispatch();
  const [ board, setBoard ] = useState([]);
  const { boardData, error } = props;
  console.log(boardData);
  // const board = useSelector(({ scrumboardApp }) => scrumboardApp.board);
  // const board = {
  //   "name": "Untitled Board",
  //   "uri": "untitled-board",
  //   "id": "355ad979",
  //   "settings": {
  //     "color": "",
  //     "subscribed": true,
  //     "cardCoverImages": true
  //   },
  //   "lists": [],
  //   "cards": [],
  //   "members": [
  //     {
  //       "id": "56027c1930450d8bf7b10758",
  //       "name": "Alice Freeman",
  //       "avatar": "assets/images/avatars/alice.jpg"
  //     },
  //     {
  //       "id": "26027s1930450d8bf7b10828",
  //       "name": "Danielle Obrien",
  //       "avatar": "assets/images/avatars/danielle.jpg"
  //     },
  //     {
  //       "id": "76027g1930450d8bf7b10958",
  //       "name": "James Lewis",
  //       "avatar": "assets/images/avatars/james.jpg"
  //     },
  //     {
  //       "id": "36027j1930450d8bf7b10158",
  //       "name": "John Doe",
  //       "avatar": "assets/images/avatars/Velazquez.jpg"
  //     }
  //   ],
  //   "labels": [
  //     {
  //       "id": "26022e4129ad3a5sc28b36cd",
  //       "name": "High Priority",
  //       "class": "bg-red text-white"
  //     },
  //     {
  //       "id": "56027e4119ad3a5dc28b36cd",
  //       "name": "Design",
  //       "class": "bg-orange text-white"
  //     },
  //     {
  //       "id": "5640635e19ad3a5dc21416b2",
  //       "name": "App",
  //       "class": "bg-blue text-white"
  //     },
  //     {
  //       "id": "6540635g19ad3s5dc31412b2",
  //       "name": "Feature",
  //       "class": "bg-green text-white"
  //     }
  //   ]
  // };
  useEffect(() => {
    props.getBoardData();
  }, []);

  useEffect(() => {
    setBoard(boardData);
  }, [boardData]);

  const routeParams = useParams();
  const containerRef = useRef(null);
  const [settingsDrawerOpen, setSettingsDrawerOpen] = useState(false);

  // useDeepCompareEffect(() => {
  //   dispatch(getBoard(routeParams));
  //   return () => {
  //     dispatch(resetBoard());
  //   };
  // }, [dispatch, routeParams]);

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped nowhere
    if (!destination) {
      return;
    }

    // did not move anywhere - can bail early
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    // reordering list
    if (result.type === 'list') {
      dispatch(reorderList(result));
    }

    // reordering card
    if (result.type === 'card') {
      dispatch(reorderCard(result));
    }
  }

  function toggleSettingsDrawer(state) {
    setSettingsDrawerOpen(state === undefined ? !settingsDrawerOpen : state);
  }

  // if (!board) {
  //   console.log(board,'not')
  //   return null;
  // }

  return (
    <>
      <GlobalStyles
        styles={(theme) => ({
          '#fuse-main': {
            height: '100vh',
          },
        })}
      />
      <div className="flex flex-1 flex-auto flex-col w-full h-full relative" ref={containerRef}>
        <AppBar position="static" color="primary" elevation={0}>
          <Toolbar className="flex items-center justify-between px-4 sm:px-24 h-48 sm:h-64 sm:h-96 container">
            <Hidden smDown>
              <Button
                to="/apps/scrumboard/boards/"
                component={Link}
                variant="contained"
                color="secondary"
              >
                <Icon>assessment</Icon>
                <span className="px-8">Boards</span>
              </Button>
            </Hidden>

            <Hidden smUp>
              <IconButton
                color="inherit"
                to="/apps/scrumboard/boards/"
                component={Link}
                size="large"
              >
                <Icon>assessment</Icon>
              </IconButton>
            </Hidden>

            <div className="flex flex-1 justify-center items-center">
              <BoardTitle />
            </div>

            <IconButton color="inherit" onClick={() => toggleSettingsDrawer(true)} size="large">
              <Icon>settings</Icon>
            </IconButton>
          </Toolbar>
        </AppBar>

        <div className={clsx('flex flex-1 overflow-x-auto overflow-y-hidden')}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list" type="list" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  className="flex container py-16 md:py-24 px-8 md:px-12"
                >
                  {!board && board.lists.map((list, index) => (
                    <BoardList key={list.id} list={list} index={index} />
                  ))}
                  {provided.placeholder}

                  {/* <BoardAddList /> */}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <SwipeableDrawer
          anchor="right"
          className="absolute overflow-hidden"
          classes={{
            paper: 'absolute w-320',
          }}
          BackdropProps={{
            classes: {
              root: 'absolute',
            },
          }}
          container={containerRef.current}
          ModalProps={{
            keepMounted: true,
            style: { position: 'absolute' },
          }}
          open={settingsDrawerOpen}
          onOpen={(ev) => {}}
          onClose={() => toggleSettingsDrawer(false)}
          disableSwipeToOpen
        >
          {/* <BoardS0ettingsSidebar /> */}
        </SwipeableDrawer>

        {/* <BoardCardDialog /> */}
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBoardData: () => dispatch(getBoardData())
  }
};

const mapStateToProps = (state) => {
  return {
    boardData: state.boardData.data,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);



