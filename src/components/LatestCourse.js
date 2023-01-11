import React, { useState, useEffect } from 'react';

export default function LatestCourse() {
  return (
    <div>
      <h3>
        <span className="highlight">Beginner JavaScript</span>
      </h3>
      <img src="https://res.cloudinary.com/wesbos/image/fetch/w_400,q_auto,f_auto/https://courses.wesbos.com/images/BJS/BJS-Social-Share.png" alt="Beginner JavaScript" />
      <p>A fun, exercise heavy approach to learning Modern JavaScript from scratch. This is a course for absolute beginners or anyone looking to brush up on their fundamentals. Start here if you are new to JS or programming in general!</p>

      <a href="https://BeginnerJavaScript.com">BeginnerJavaScript.com</a>
    </div>
  );
}
