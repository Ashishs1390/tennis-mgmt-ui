import React, { useState, useEffect, useRef } from "react";
import YoutubeComponent from './youtube.component';
import { connect } from "react-redux";
import { post } from "./../../api/axios.api";
// import "./player.css";
import { useParams } from "react-router-dom";
// import {fetchVideo}  from "./../../../redux/index";
import { fetchVideo } from "./../../redux/index";
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import { getDateWithTime } from '../../util/util';

function VideoPlayerContainer(props) {

    const { fetchVideo, videoInfo: { videoData }, error, videoAnalysis, showPlayerVideo } = props;
    const [startPlay, setStartPlay] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [mute, setMute] = useState(false);
    const [payBackSpeed, setPayBackSpeed] = useState(1);
    const { from } = useParams();
    const navigate = useNavigate();
    const [frames, setFrame] = useState([
        {
            frameId: "frame1",
            src: ""
        },
        {
            frameId: "frame2",
            src: ""
        },
        {
            frameId: "frame3",
            src: ""
        },
        {
            frameId: "frame4",
            src: ""
        }
    ]);
    const [youtubeId, setYouTubeId] = useState({});


    const [errMsg, setErrorMsg] = useState({})
    const playBackSpeeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];


    const startAllVideos = () => {
        setStartPlay(true);
    };

    const pauseAllVideo = () => {
        setStartPlay(false);
    }

    const muteUnmute = (mute) => {
        setMute(mute);
    }


    // useEffect(() => {
    //     fetchVideo();
    // }, [])

    useEffect(() => {
        console.log(showPlayerVideo)
        if (from == "analysis" && !showPlayerVideo) {

            if (videoData && videoData.length != 0) {
                setYouTubeId({ ...videoData })
                pauseAllVideo();

            } else {
                
                setErrorMsg({ ...error })
            }
        } else {
            // setYouTubeId({});
            // setFrame([]);
        }
    }, [videoData]);

    useEffect(() => {

        if (from == "strockanalysislist" || showPlayerVideo) {
            let framesData = [...videoAnalysis.selectedVideos];
            framesData = framesData.map(x => {
                return { frameId: x.src, src: 0 };
            });
            framesData.length > 0 && setFrame(framesData);
        }


    }, [videoAnalysis.selectedVideos]);

    useEffect(() => {
        if (from == "analysis") {
            setFrame([
                {
                    frameId: "frame1",
                    src: ""
                },
                {
                    frameId: "frame2",
                    src: ""
                },
                {
                    frameId: "frame3",
                    src: ""
                },
                {
                    frameId: "frame4",
                    src: ""
                }
            ]);
        }
    }, [from])


    const updatePlayBackSpeed = (event) => {
        setStartPlay(true);
        setPayBackSpeed(event.target.value);
    }

    const goToHistory = () => {
        navigate("/strockanalysislist");

    }
    const getIdFromUrl = (url, id) => {
        var videoid = url.match(
            /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
        );
        if (videoid != null) {
            return {
                [id]: videoid[1]
            }
        } else {
            console.log("The youtube url is not valid.");
        }
    }
    const postVideoUrls = async (postObj) => {
        let returnedData = await post('/api/tennismgmt/videoanalysis', { ...postObj }).catch((err) => {
            console.log(err);
        })
        if (returnedData) {
            setFrame([
                {
                    frameId: "frame1",
                    src: ""
                },
                {
                    frameId: "frame2",
                    src: ""
                },
                {
                    frameId: "frame3",
                    src: ""
                },
                {
                    frameId: "frame4",
                    src: ""
                }
            ])
            returnedData = returnedData.data.data;
            returnedData = JSON.parse(JSON.stringify(returnedData))
            setYouTubeId({ ...returnedData });
        } else {
            console.log("error")
        }
    }
    const submitFrameInfo = () => {
        const arr = [];
        frames.forEach((frame) => {
            // console.log(youtubeId[yt])
            console.log(frame.src);
            console.log(!frame.src.includes(youtubeId[frame.frameId]))
            if (!frame.src.includes(youtubeId[frame.frameId])) {
                if (frame.src !== "") {
                    const frameObj = getIdFromUrl(frame.src, frame.frameId);
                    arr.push(frameObj)
                }
            }

        });
        const finalObj = arr.reduce((acc, cur) => {
            if (acc) {
                acc = { ...acc, ...cur };
            }
            return acc;
        }, {})
        finalObj.date = getDateWithTime(new Date());
        postVideoUrls(finalObj)
    }

    const setDynamicValue = (event) => {
        console.log(event.target)
        const { id, value } = event.target;
        let newFrame = frames.map((f) => {
            if (id == f.frameId) {
                f.src = value;
            }
            return f;
        })
        setFrame(newFrame)
    }
    return (
        <div className="video-player-container">
            <ul className="video-item-list">

                {frames.map((ele, i) => {
                    return (
                        <li className="video-item" key={ele.frameId + i}>
                            <div className="iframe-container">
                                {/* <YoutubeComponent isStart={startPlay} startTime={startTime} id={ele.src !== 0 ? youtubeId[ele.frameId] : ele.frameId} isMute={mute} playbackSpeed={payBackSpeed} /> */}

                                <YoutubeComponent isStart={startPlay} startTime={startTime} id={ele.src !== 0 ? youtubeId[ele.frameId] : ele.frameId} isMute={mute} playbackSpeed={payBackSpeed} />
                            </div>
                            <div className="searchbox-container">
                                {ele.src !== 0 &&
                                    <input id={ele.frameId} value={ele.src} onChange={setDynamicValue} placeholder="Please enter youtube URL"  ></input>}
                            </div>
                        </li>
                    )

                })

                }


            </ul>
            <div className="button-container">
                {!showPlayerVideo && <Button className="video-submit" variant="contained" size="small" onClick={() => submitFrameInfo()}>Submit</Button>}
                {!showPlayerVideo && <Button className="video-submit" variant="contained" size="small" onClick={() => goToHistory()}>History</Button>} 

                {!(errMsg && Object.keys(errMsg).length === 0
                    && Object.getPrototypeOf(errMsg) === Object.prototype)
                    &&
                    <div className="errorDiv">
                        <p>{errMsg.errMsg}</p>
                        {/* <p>{errMsg.msg}</p> */}
                    </div>}
                <p>{startPlay}</p>
                <div className="video-player-controls" style={{ paddingLeft: '50px' }}>
                    {!startPlay && <Button variant="outlined" onClick={startAllVideos} style={{ marginLeft: '10px' }}>Play All</Button>}
                    {startPlay && <Button variant="outlined" onClick={pauseAllVideo} style={{ marginLeft: '10px' }}>Pause All</Button>}
                    {!mute && <Button variant="outlined" onClick={() => { muteUnmute(true) }} style={{ marginLeft: '10px' }}>Mute All</Button>}
                    {mute && <Button variant="outlined" onClick={() => { muteUnmute(false) }} style={{ marginLeft: '10px' }}>Unmute All</Button>}
                    <FormControl sx={{ minWidth: 100 }} size="small">
                        {/* <InputLabel id="demo-select-small">Age</InputLabel> */}
                        <Select
                            className="select-play"
                            variant="outlined"
                            labelId="demo-select-small"
                            defaultValue={1} onChange={updatePlayBackSpeed} style={{ marginLeft: '10px' }}>
                            {
                                playBackSpeeds.map((x, i) => {
                                    return <MenuItem key={i} value={x}>{x}</MenuItem>;
                                })
                            }
                        </Select>
                    </FormControl>
                    {/* style={{ marginLeft: '10px' }} */}
                  
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchVideo: () => {
            dispatch(fetchVideo())
        }
    };
};

const mapStateToProps = (state = {}) => {
    return {
        videoInfo: state.videoInfo,
        videoAnalysis: state.videoAnalysis
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayerContainer);
