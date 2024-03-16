import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVideo } from "../config/axios";
import Header from "../components/Header";

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
                    setLinkEmbed(result[0].server_data[0]?.link_embed)
                    setMovieInfo(res?.data?.movie)
                }
            })
    }, [])

    return (
        <React.Fragment>
            <Header />
            <div className="videoContainer">
                <iframe
                    src={linkEmbed}
                    width="100%"
                    height="700"
                    frameborder="0"
                    allowfullscreen
                ></iframe>
                <h1>{movieInfo?.origin_name}</h1>
                <p>Description: {movieInfo?.content}</p>
            </div>
        </React.Fragment>

    )
}

export default MovieViewer;