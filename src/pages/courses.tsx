import H from '../components/mdxComponents/Headings';
import styles from '../styles/CourseStyles.module.css';
import { MetaTags } from '../components/MetaTags';
import type { PageProps } from "waku/router";

export default function CoursesPage(props: PageProps<'/courses'>) {
  return (
    <>
      <MetaTags {...props} />
      <p>
        <strong>
          <a href="https://courses.wesbos.com">Sign in to course dashboard here!</a>
        </strong>
      </p>
      <p>Ready to learn and up your game as a web developer? Here is a listing of all the courses I've put out. Some of them are paid and some of them are free.</p>
      <p>I'm delivering a few new courses every year, so sign up for any of these courses and you'll hear when I announce new ones!</p>
      <div className={styles.CourseListStyles}>
        <div className="course">
          <img src="https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/GAT/GAT-social-share.webp" alt="Master Gatsby" />
          <H as="h3">Master Gatsby</H>
          <span className={styles.PriceTag}>Premium</span>
          <a href="https://MasterGatsby.com" target="_blank" rel="noreferrer">
            MasterGatsby.com
          </a>
          <p>Building modern websites is tough. Preloading, routing, compression, critical CSS, caching, scaling and bundlers all make for blazing fast websites, but extra development and tooling get in the way.</p>
          <p>Gatsby is a React.js framework that does it all for you. This course will teach you how to build your websites and let Gatsby take care of all the Hard Stuff™.</p>
        </div>
        <div className="course">
          <img src="https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/BJS/BJS-Social-Share.png" alt="Beginner JavaScript" />
          <H as="h3">Beginner JavaScript</H>
          <span className={styles.PriceTag}>Premium</span>
          <a href="https://BeginnerJavaScript.com" target="_blank" rel="noreferrer">
            BeginnerJavaScript.com
          </a>
          <p>A fun, exercise heavy approach to learning Modern JavaScript from scratch. This is a course for absolute beginners or anyone looking to brush up on their fundamentals. Start here if you are new to JS or programming in general!</p>
        </div>
        <div className="course">
          <img src="https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/ARG/arg-facebook-share.webp" alt="Advanced React" />
          <H as="h3">Fullstack Advanced React and GraphQL</H>
          <span className={styles.PriceTag}>Premium</span>
          <a href="https://AdvancedReact.com" target="_blank" rel="noreferrer">
            AdvancedReact.com
          </a>
          <p>This is a course that will teach you everything you need to build a full stack application with React.js and GraphQL.</p>
          <p>Together we build an online store called Sick Fits.</p>
          <p>It's GraphQL API with Node.js on the backend and React and Apollo on the front end.</p>
          <p>We cover everything from authentication and sending email to uploading photos and caching data. The entire front-end is built in modern React.js and GraphQL.</p>
          <p>I'm also happy to announce that the course has almost six hours of testing videos included in the master package. Testing is something I've had requests for a long time and I'm really excited to deliver on some good quality testing material. </p>
        </div>
        <div className="course">
          <img src="https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/es6-facebook-share.webp" alt="ES6 for Everyone" />
          <H as="h3">ES6 for Everyone</H>
          <span className={styles.PriceTag}>Premium</span>
          <a href="https://ES6.io" target="_blank" rel="noreferrer">
            ES6.io
          </a>
          <p>ES6 is a major update to JavaScript that includes dozens of new features. With a focus on simplicity and readability, this premium video course is the best way to learn about all that ES6 has to offer while sharpening your core JavaScript skills. </p>
        </div>
        <div className="course">
          <img src="https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/JS3-social-share.webp" alt="JavaScript30" />
          <H as="h3">JavaScript30</H>
          <span className={styles.PriceTag}>Free</span>
          <a href="https://JavaScript30.com" target="_blank" rel="noreferrer">
            JavaScript30.com
          </a>
          <p>A free 30 day vanilla js coding challenge. Learn to build 30 things in 30 days with 30 tutorials. No Frameworks, No Compilers, No Libraries, No Boilerplate. Good luck! </p>
        </div>
        <div className="course">
          <img src="https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/facebook-share.webp" alt="React for Beginners" />
          <H as="h3">React For Beginners</H>
          <span className={styles.PriceTag}>Premium</span>
          <a href="https://ReactForBeginners.com" target="_blank" rel="noreferrer">
            ReactForBeginners.com
          </a>
          <p>Upgrade your JavaScript skills to learn React.js in just a couple of afternoons. A premium step-by-step training course to get you building real world React.js + Firebase apps and website components. </p>
        </div>
        <div className="course">
          <img src="https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/GRID-social-share.webp" alt="CSS Grid" />
          <H as="h3">CSS Grid</H>
          <span className={styles.PriceTag}>Free</span>
          <a href="https://CSSGrid.io" target="_blank" rel="noreferrer">
            CSSGrid.io
          </a>
          <p>A free 25 video course on all there is to learn about CSS Grid! We start with CSS Grid fundamentals and end with some real-world examples.</p>
        </div>
        <div className="course">
          <img src="https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/NODE/node-facebook-share.webp" alt="Learn Node" />
          <H as="h3">Learn Node</H>
          <span className={styles.PriceTag}>Premium</span>
          <a href="https://LearnNode.com" target="_blank" rel="noreferrer">
            LearnNode.com
          </a>
          <p>A premium training course to learn to build apps with Node.js, Express, MongoDB, and friends. </p>
        </div>
        <div className="course">
          <img src="https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/facebook-share2.webp" alt="Sublime Text Power User" />
          <H as="h3">Sublime Text Power User</H>
          <span className={styles.PriceTag}>Premium</span>
          <a href="https://SublimeTextBook.com" target="_blank" rel="noreferrer">
            SublimeTextBook.com
          </a>
          <p>Ever wonder how so many great developers seem to get so much done? You probably aren't getting enough out of your text editor. Investing in your text editor skill set will not only improve the quality of the code you write and cut down on silly errors, but increase the speed and productivity at which you write it.</p>
          <p>With this book, you will easily save 30 minutes each day. That's an extra three weeks each year!</p>
        </div>
        <div className="course">
          <img src="https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/WTF/share.webp" alt="What The Flexbox?!" />
          <H as="h3">What The Flexbox?!</H>
          <span className={styles.PriceTag}>Free</span>
          <a href="http://Flexbox.io" target="_blank" rel="noreferrer">
            Flexbox.io
          </a>
          <p>Flexbox sure is tricky to learn. Get a grasp on flexbox while learning both the fundamentals and real world applications. </p>
        </div>
        <div className="course">
          <img src="https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/CLPU/share.webp" alt="Command Line Power User" />
          <H as="h3">Command Line Power User</H>
          <span className={styles.PriceTag}>Free</span>
          <a href="http://CommandLinePowerUser.com" target="_blank" rel="noreferrer">
            CommandLinePowerUser.com
          </a>
          <p>As web developers, we use the command line a lot. A video series for web developers on learning a modern command line workflow with ZSH, Z and related tools.</p>
        </div>
        <div className="course">
          <img src="https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/RDX/share.webp" alt="Learn Redux" />
          <H as="h3">Learn Redux</H>
          <span className={styles.PriceTag}>Free</span>
          <a href="https://LearnRedux.com" target="_blank" rel="noreferrer">
            LearnRedux.com
          </a>
          <p>
            A 20 video / 2.5 hour course to learn how to use Redux, React Router and React together. This course is intended as a next step to my <a href="https://ReactForBeginners.com">React for Beginners</a> course.
          </p>
        </div>
        <div className="course">
          <img src="https://res.cloudinary.com/wesbos/image/fetch/w_700,q_auto,f_auto/https://courses.wesbos.com/images/MMD/share.webp" alt="Mastering Markdown" />
          <H as="h3">Mastering Markdown</H>
          <span className={styles.PriceTag}>Free</span>
          <a href="http://MasteringMarkdown.com" target="_blank" rel="noreferrer">
            MasteringMarkdown.com
          </a>
          <p>A quick 34 minute mini course for anyone who is looking to learn markdown for the first time, or fill in any gaps along the way. Markdown is a very simple language and can be easily mastered in under an hour.</p>
        </div>
      </div>
    </>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
    title: 'Courses - Wes Bos',
  } as const;
};
