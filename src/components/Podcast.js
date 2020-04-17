import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const url = `https://syntax.fm/api/shows/latest`;

const PodStyles = styled.div`
  time {
    font-size: 1.2rem;
    font-weight: 600;
  }
  .logo {
    width: 100%;
  }
`;

function useLatestPodcast() {
  const [podcast, setPodcast] = useState();
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setPodcast(data);
      });
  }, []);
  return podcast;
}

export default function Instagram() {
  const podcast = useLatestPodcast();
  if (!podcast)
    return (
      <PodStyles>
        <h3>
          <span className="highlight">Syntax Podcast</span>
        </h3>
        <p>Hold on — I'm grabbin' the last one.</p>
        <a href="https://syntax.fm/">Listen Now → </a>
        <img src="/syntax.jpg" alt="Syntax Podcast" />
      </PodStyles>
    );
  return (
    <PodStyles>
      <h3>
        <span className="highlight">Syntax Podcast: #{podcast.number}</span>
      </h3>
      <img className="logo" src="/syntax.jpg" alt="Syntax Podcast" />
      <time>{podcast.displayDate}</time>
      <p>{podcast.title}</p>
      <a href={`https://syntax.fm${podcast.slug}`}>Listen Now → </a>
    </PodStyles>
  );
}
