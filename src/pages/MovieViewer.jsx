import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVideo } from "../config/axios";
import Header from "../components/Header";
import ReactHlsPlayer from 'react-hls-player';

const MovieViewer = () => {
    const { slug } = useParams();
    const [linkEmbed, setLinkEmbed] = useState();
    const [movieInfo, setMovieInfo] = useState();

    useEffect(() => {
        getVideo(`/phim/${slug}`)
            .then(res => {
                if (!res) return;
                const result = res?.data?.episodes;
                if (result && result.length > 0 && result[0].server_data.length > 0) {
                    setLinkEmbed(result[0].server_data[0]?.link_m3u8)
                    setMovieInfo(res?.data?.movie)
                }
            })
    }, [])

    return (
        <React.Fragment>
            <Header />
            <div className="videoContainer">
                <ReactHlsPlayer
                    src={linkEmbed}
                    autoPlay={true}
                    controls={true}
                    width="100%"
                    height="auto"
                    hlsConfig={{
                        maxLoadingDelay: 4,
                        minAutoBitrate: 0,
                        lowLatencyMode: true,
                    }}
                />
                <h1>{movieInfo?.origin_name}</h1>
                <p>Description: {movieInfo?.content}</p>
            </div>
        </React.Fragment>

    )
}

export default MovieViewer;