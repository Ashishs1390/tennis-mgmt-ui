import React, { useState, useEffect, useRef } from "react";
import YouTube from "react-youtube";
import "./player.css";

export const YoutubeComponent = (props) => {
    let player = null;
    const playerCtr = useRef(null);    
    useEffect(() => {
        if(playerCtr.current) {
            const player = playerCtr.current.internalPlayer;
            props.isStart ? player.playVideo() : player.pauseVideo();
        }
    }, [props.isStart])

    useEffect(() => {
        if(playerCtr.current) {
            const player = playerCtr.current.internalPlayer;
            player.seekTo(props.startTime);
        }
    }, [props.startTime])

    useEffect(() => {
        if(playerCtr.current) {
            const player = playerCtr.current.internalPlayer;
            props.isMute ? player.mute() :  player.unMute();
        }
    }, [props.isMute])

    useEffect(() => {
        if(playerCtr.current) {
            const player = playerCtr.current.internalPlayer;
            player.setPlaybackRate(+props.playbackSpeed)
        }
    }, [props.playbackSpeed])
    

    const onReady = (event) => {
        event.target.pauseVideo();

      }

    const opts = {
        height: '300',
        width: '100%',
        loading:"null",
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            // start: 15
        }
      };
    return (
        <div className="video-player" style={{width: '100%'}}>
            {props.id !== undefined && <YouTube className="custom-vid" videoId={props.id} opts={opts} onReady={onReady} ref={playerCtr} />}
        </div>
    )
};

export default YoutubeComponent;