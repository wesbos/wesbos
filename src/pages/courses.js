import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';
import H from '../components/mdxComponents/Headings';
import { PostMetaTags } from '../components/MetaTags';

const CourseListStyles = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-columns: 100%;
  grid-gap: 2rem;
  & > * {
    padding: 2rem;
    border: 1px solid var(--lightGray);
    h3 {
      margin: 0;
    }
    h3 + p {
      margin-top: 0;
    }
    img {
      max-width: 300px;
      float: left;
      margin-right: 2rem;
    }
  }
`;

export default function AboutPage({ data, path }) {
  return (
    <>
      <p>
        Ready to learn and up your game as a web developer? Here is a listing of
        all the courses I've put out. Some of them are paid and some of them are
        free.
      </p>
      <p>
        I'm delivering a few new course every year, so sign up for any of these
        courses and you'll hear when I announce new ones!
      </p>
      <CourseListStyles>
        <div className="course">
          <img
            src="https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/BJS/BJS-Social-Share.png"
            alt="Beginner JavaScript"
          />
          <H as="h3">Beginner JavaScript</H>
          <a href="https://BeginnerJavaScript.com">BeginnerJavaScript.com</a>
          <p>
            A fun, exercise heavy approach to learning Modern JavaScript from
            scratch. This is a course for absolute beginners or anyone looking
            to brush up on their fundamentals. Start here if you are new to JS
            or programming in general!
          </p>
        </div>
        <div className="course">
          <img
            src="https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/ARG/arg-facebook-share.png"
            alt="Advanced React"
          />
          <H as="h3">Fullstack Advanced React and GraphQL</H>
          <a href="https://AdvancedReact.com">AdvancedReact.com</a>
          <p>
            This is a course that will teach you everything you need to build a
            full stack application with React.js and GraphQL.
          </p>
          <p>Together we build an online store called Sick Fits.</p>
          <p>
            It's GraphQL API with Node.js on the backend and React and Apollo on
            the front end.
          </p>
          <p>
            We cover everything from authentication and sending email to
            uploading photos and caching data. The entire front-end is built in
            modern React.js and GraphQL.
          </p>
          <p>
            I'm also happy to announce that the course has almost six hours of
            testing videos included in the master package. Testing is something
            I've had requests for a long time and I'm really excited to deliver
            on some good quality testing material.{' '}
          </p>
        </div>
        <div className="course">
          <img
            src="https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/es6-facebook-share.png"
            alt="ES6 for Everyone"
          />
          <H as="h3">ES6 for Everyone</H>
          <a href="https://ES6.io">ES6.io</a>
          <p>
            ES6 is a major update to JavaScript that includes dozens of new
            features. With a focus on simplicity and readability, this premium
            video course is the best way to learn about all that ES6 has to
            offer while sharpening your core JavaScript skills.{' '}
          </p>
        </div>

        <div className="course">
          <img
            src="https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/facebook-share.png"
            alt="React for Beginners"
          />
          <H as="h3">React For Beginners</H>
          <p>
            Upgrade your JavaScript skills to learn React.js in just a couple of
            afternoons. A premium step-by-step training course to get you
            building real world React.js + Firebase apps and website components.{' '}
            <a href="https://ReactForBeginners.com">ReactForBeginners.com</a>
          </p>
        </div>

        <div className="course">
          <img
            src="https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/GRID-social-share.png"
            alt="CSS Grid"
          />
          <H as="h3">CSS Grid</H>
          <a href="https://CSSGrid.io">CSSGrid.io</a>
          <p>
            A free 25 video course on all there is to learn about CSS Grid! We
            start with CSS Grid fundamentals and end with some real-world
            examples.
          </p>
        </div>

        <div className="course">
          <img
            src="https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/JS3-social-share.png"
            alt="JavaScript30"
          />
          <H as="h3">JavaScript30</H>
          <a href="https://JavaScript30.com">JavaScript30.com</a>
          <p>
            A free 30 day vanilla js coding challenge. Learn to build Build 30
            things in 30 days with 30 tutorials. No Frameworks, No Compilers, No
            Libraries, No Boilerplate. Good luck!{' '}
          </p>
        </div>
        <div className="course">
          <img
            src="https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/NODE/node-facebook-share.jpg"
            alt="Learn Node"
          />
          <H as="h3">Learn Node</H>
          <a href="https://LearnNode.com">LearnNode.com</a>
          <p>
            A premium training course to learn to build apps with Node.js,
            Express, MongoDB, and friends.{' '}
          </p>
        </div>
        <div className="course">
          <img
            src="https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/facebook-share2.png"
            alt="Sublime Text Power User"
          />
          <H as="h3">Sublime Text Power User</H>
          <a href="https://SublimeTextBook.com">SublimeTextBook.com</a>
          <p>
            Ever wonder how so many great developers seem to get so much done?
            You probably aren't getting enough out of your text editor.
            Investing in your text editor skill set will not only improve the
            quality of the code you write and cut down on silly errors, but
            increase the speed and productivity at which you write it.
          </p>
          <p>
            With this book, you will easily save 30 minutes each day. That's an
            extra three weeks each year!
          </p>
        </div>

        <div className="course">
          <img
            src="https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/WTF/share.png"
            alt="What The Flexbox?!"
          />
          <H as="h3">What The Flexbox?!</H>
          <a href="http://Flexbox.io">Flexbox.io</a>
          <p>
            Flexbox sure is tricky to learn. Get a grasp on flexbox while
            learning both the fundamentals and real world applications.{' '}
          </p>
        </div>

        <div className="course">
          <img
            src="https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/CLPU/share.png"
            alt="Command Line Power User"
          />
          <H as="h3">Command Line Power User</H>
          <a href="http://CommandLinePowerUser.com">CommandLinePowerUser.com</a>
          <p>
            As web developers, we use the command line a lot. A video series for
            web developers on learning a modern command line workflow with ZSH,
            Z and related tools.
          </p>
        </div>

        <div className="course">
          <img
            src="https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/RDX/share.png"
            alt="Learn Redux"
          />
          <H as="h3">Learn Redux</H>
          <a href="https://LearnRedux.com">LearnRedux.com</a>
          <p>
            A 20 video / 2.5 hour course to learn how to use Redux, React Router
            and React together. This course is intended as a next step to my{' '}
            <a href="https://ReactForBeginners.com">React for Beginners</a>{' '}
            course.
          </p>
        </div>

        <div className="course">
          <img
            src="https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/MMD/share.png"
            alt="Mastering Markdown"
          />
          <H as="h3">Mastering </H>
          <a href="http://MasteringMarkdown.com">MasteringMarkdown.com</a>
          <p>
            A quick 34 minute mini course for anyone who is looking to learn
            markdown for the first time, or fill in any gaps along the way.
            Markdown is a very simple language and can be easily mastered in
            under an hour.
          </p>
        </div>
      </CourseListStyles>
      <PostMetaTags
        post={{
          frontmatter: {
            slug: path,
            title: 'Courses',
          },
        }}
      />
    </>
  );
}
