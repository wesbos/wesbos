import React from 'react';
import styled from 'styled-components';
import H from '../components/mdxComponents/Headings';
import { PostMetaTags } from '../components/MetaTags';

const courses = [
  {
    image: {
      src:
        'https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/BJS/BJS-Social-Share.png',
      alt: 'Beginner JavaScript',
    },
    title: 'Beginner JavaScript',
    price: 'Premuim',
    link: {
      label: 'BeginnerJavaScript.com',
      url: 'https://BeginnerJavaScript.com',
    },
    description: [
      `A fun, exercise heavy approach to learning Modern JavaScript from 
      scratch. This is a course for absolute beginners or anyone looking 
      to brush up on their fundamentals. Start here if you are new to JS 
      or programming in general!`,
    ],
  },
  {
    image: {
      src:
        'https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/ARG/arg-facebook-share.png',
      alt: 'Advanced React',
    },
    title: 'Fullstack Advanced React and GraphQL',
    price: 'Premuim',
    link: {
      label: 'AdvancedReact.com',
      url: 'https://AdvancedReact.com',
    },
    description: [
      `This is a course that will teach you everything you need to build a
      full stack application with React.js and GraphQL.`,
      `Together we build an online store called Sick Fits.`,
      `It's GraphQL API with Node.js on the backend and React and Apollo on
      the front end.`,
      `We cover everything from authentication and sending email to
      uploading photos and caching data. The entire front-end is built in
      modern React.js and GraphQL.`,
      `I'm also happy to announce that the course has almost six hours of
      testing videos included in the master package. Testing is something
      I've had requests for a long time and I'm really excited to deliver
      on some good quality testing material.`,
    ],
  },
  {
    image: {
      src:
        'https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/es6-facebook-share.png',
      alt: 'ES6 for Everyone',
    },
    title: 'ES6 for Everyone',
    price: 'Premuim',
    link: {
      label: 'ES6.io',
      url: 'https://ES6.io',
    },
    description: [
      `ES6 is a major update to JavaScript that includes dozens of new
      features. With a focus on simplicity and readability, this premium
      video course is the best way to learn about all that ES6 has to
      offer while sharpening your core JavaScript skills.`,
    ],
  },
  {
    image: {
      src:
        'https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/JS3-social-share.png',
      alt: 'JavaScript30',
    },
    title: 'JavaScript30',
    price: 'Free',
    link: {
      label: 'https://JavaScript30.com',
      url: 'JavaScript30.com',
    },
    description: [
      `A free 30 day vanilla js coding challenge. Learn to build Build 30
      things in 30 days with 30 tutorials. No Frameworks, No Compilers, No
      Libraries, No Boilerplate. Good luck!`,
    ],
  },
  {
    image: {
      src:
        'https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/facebook-share.png',
      alt: 'React for Beginners',
    },
    title: 'React for Beginners',
    price: 'Premuim',
    link: {
      label: 'ReactForBeginners.com',
      url: 'https://ReactForBeginners.com',
    },
    description: [
      `Upgrade your JavaScript skills to learn React.js in just a couple of
      afternoons. A premium step-by-step training course to get you
      building real world React.js + Firebase apps and website components.`,
    ],
  },
  {
    image: {
      src:
        'https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/GRID-social-share.png',
      alt: 'CSS Grid',
    },
    title: 'CSS Grid',
    price: 'Free',
    link: {
      label: 'CSSGrid.io',
      url: 'https://CSSGrid.io',
    },
    description: [
      `A free 25 video course on all there is to learn about CSS Grid! We
      start with CSS Grid fundamentals and end with some real-world
      examples.`,
    ],
  },
  {
    image: {
      src:
        'https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/NODE/node-facebook-share.jpg',
      alt: 'Learn Node',
    },
    title: 'Learn Node',
    price: 'Premuim',
    link: {
      label: 'LearnNode.com',
      url: 'https://LearnNode.com',
    },
    description: [
      `A premium training course to learn to build apps with Node.js,
      Express, MongoDB, and friends.`,
    ],
  },
  {
    image: {
      src:
        'https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/facebook-share2.png',
      alt: 'Sublime Text Power User',
    },
    title: 'Sublime Text Power User',
    price: 'Premuim',
    link: {
      label: 'SublimeTextBook.com',
      url: 'https://SublimeTextBook.com',
    },
    description: [
      `Ever wonder how so many great developers seem to get so much done?
      You probably aren't getting enough out of your text editor.
      Investing in your text editor skill set will not only improve the
      quality of the code you write and cut down on silly errors, but
      increase the speed and productivity at which you write it.`,
      `With this book, you will easily save 30 minutes each day. That's an
      extra three weeks each year!`,
    ],
  },
  {
    image: {
      src:
        'https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/WTF/share.png',
      alt: 'What The Flexbox?!',
    },
    title: 'What The Flexbox?!',
    price: 'Free',
    link: {
      label: 'Flexbox.io',
      url: 'https://Flexbox.io',
    },
    description: [
      `Flexbox sure is tricky to learn. Get a grasp on flexbox while
      learning both the fundamentals and real world applications.`,
    ],
  },
  {
    image: {
      src:
        'https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/CLPU/share.png',
      alt: 'Command Line Power User',
    },
    title: 'Command Line Power User',
    price: 'Free',
    link: {
      label: 'CommandLinePowerUser.com',
      url: 'https://CommandLinePowerUser.com',
    },
    description: [
      `As web developers, we use the command line a lot. A video series for
      web developers on learning a modern command line workflow with ZSH,
      Z and related tools.`,
    ],
  },
  {
    image: {
      src:
        'https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/RDX/share.png',
      alt: 'Learn Redux',
    },
    title: 'Learn Redux',
    price: 'Free',
    link: {
      label: 'LearnRedux.com',
      url: 'https://LearnRedux.com',
    },
    description: [
      `A 20 video / 2.5 hour course to learn how to use Redux, React Router
      and React together. This course is intended as a next step to my 
      <a href="https://ReactForBeginners.com">React for Beginners</a> 
      course.`,
    ],
  },
  {
    image: {
      src:
        'https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/MMD/share.png',
      alt: 'Mastering Markdown',
    },
    title: 'Mastering Markdown',
    price: 'Free',
    link: {
      label: 'MasteringMarkdown.com',
      url: 'https://MasteringMarkdown.com',
    },
    description: [
      `A quick 34 minute mini course for anyone who is looking to learn
      markdown for the first time, or fill in any gaps along the way.
      Markdown is a very simple language and can be easily mastered in
      under an hour.`,
    ],
  },
];

const CourseListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr;
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
      @media (max-width: 800px) {
        margin-right: 0;
      }
    }
    @media (max-width: 450px) {
      padding: 0;
      border: 0;
      border-top: 2px solid var(--yellow);
      padding-top: 4rem;
      img {
        width: 100%;
      }
      a {
        font-size: 1.5rem;
      }
    }
  }
`;

const PriceTag = styled.span`
  text-transform: uppercase;
  display: block;
  font-size: 1.1rem;
  color: black;
  &:before {
    content: '$ ';
    color: var(--yellow);
    font-weight: bold;
  }
`;

const Course = ({ course: { image, title, price, link, description } }) => (
  <div className="course">
    <img src={image.src} alt={image.alt} />
    <H as="h3">{title}</H>
    <PriceTag>{price}</PriceTag>
    <a href={link.url} target="_blank" rel="noopener noreferrer">
      {link.label}
    </a>
    {description.map((paragraph) => (
      <p key={paragraph} dangerouslySetInnerHTML={{ __html: paragraph }} />
    ))}
  </div>
);

export default function CoursesPage({ path }) {
  return (
    <>
      <p>
        <strong>
          <a href="https://courses.wesbos.com">
            Sign in to course dashboard here!
          </a>
        </strong>
      </p>
      <p>
        Ready to learn and up your game as a web developer? Here is a listing of
        all the courses I've put out. Some of them are paid and some of them are
        free.
      </p>
      <p>
        I'm delivering a few new courses every year, so sign up for any of these
        courses and you'll hear when I announce new ones!
      </p>
      <CourseListStyles>
        {courses.map((course) => (
          <Course key={course.title} course={course} />
        ))}
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
