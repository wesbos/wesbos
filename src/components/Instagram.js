import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoLogoInstagram } from 'react-icons/io';

const url = `/.netlify/functions/instagram`;

const InstaStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
`;

function useInstagram() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setPosts(data);
      });
  }, []);
  return posts;
}

export default function Instagram() {
  const gramz = useInstagram();
  return (
    <div>
      <h3>
        <span className="highlight">
          <a
            href="https://instagram.com/wesbos"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IoLogoInstagram />
            @wesbos{' '}
          </a>
          Instant Grams
        </span>
      </h3>
      <InstaStyles>
        {gramz.map(gram => (
          <a href={gram.url} key={gram.id}>
            <img src={gram.thumbnail} alt={gram.caption} />
          </a>
        ))}
      </InstaStyles>
    </div>
  );
}
