import React, { useState, useEffect } from "react";
import "./player.css";

export const YoutubePlayer = (props) => {
    const [playUrl, setPlay] = useState(props.url);
    useEffect(() => {
        if(props.isStart) {
            setPlay(props.url + `?start=${props.startTime}&autoplay=1`);
        } else {
            setPlay(props.url + `?start=${props.startTime}&autoplay=0`);
        }
    }, [props.isStart])
    useEffect(() => {
        setPlay(props.url + `?start=${props.startTime}&autoplay=1`);
    }, [props.startTime])
    return (
        <div className="video-player" style={{width: '10%'}}>
            <iframe width="10%" height="120" src={playUrl} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    )
};

export default YoutubePlayer;