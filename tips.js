const tips = [
  {
    text:
      '🔥 Hot Tip:  On any GitHub repo, hit t to filter for files by name - no more clicking through nested directories. http://t.co/Ec2BgoZXZW',
    url: 'https://twitter.com/wesbos/status/598135346220703744',
    time: 1431441554000,
  },
  {
    text:
      '🔥 Completions for all possible flags and descriptions for ls by typing  ls - + tab in Oh-My-Zsh http://t.co/AkuJMo1qE2',
    url: 'https://twitter.com/wesbos/status/601073643318280192',
    time: 1432142098000,
  },
  {
    text:
      '🔥 Use the tree command to visually list directories. Add t() to .zshrc file for quick + easy defaults. http://t.co/R2nZdazEWW',
    url: 'https://twitter.com/wesbos/status/601426471240998912',
    time: 1432226219000,
  },
  {
    text:
      '🔥 CheatSheet is a free app that pops up shortcuts for any application when you hold ⌘ http://t.co/lztlLDa6OI http://t.co/rJkP7ZTjcM',
    url: 'https://twitter.com/wesbos/status/601771346113200129',
    time: 1432308443000,
  },
  {
    text:
      '🔥 Max out your keyboard, trackpad &amp; mouse. Speed up and keep carpel tunnel at bay by minimizing repetitive movements. http://t.co/QMyi7Zvz3m',
    url: 'https://twitter.com/wesbos/status/602853362321723393',
    time: 1432566416000,
  },
  {
    text:
      '🔥 Checkout the pure ZSH prompt from @sindresorhus https://t.co/tCfGtzwrwx http://t.co/KI0kSvyvAN',
    url: 'https://twitter.com/wesbos/status/603246877346267136',
    time: 1432660238000,
  },
  {
    text:
      '🔥 Primer for Sublime Text is a really nice and refreshing light theme + colour scheme. https://t.co/lu8wo7zDp4 http://t.co/rTItkgyg5O',
    url: 'https://twitter.com/wesbos/status/603632694413635585',
    time: 1432752223000,
  },
  {
    text:
      '🔥 Here are the Web Development focused Google #io15 talks that will be live streamed today and tomorrow. http://t.co/moqzAk85Gw',
    url: 'https://twitter.com/wesbos/status/603940617228394496',
    time: 1432825638000,
  },
  {
    text:
      "🔥 BrowserRemote - Debug your user's browser remotely via Chrome DevTools.\n\nhttps://t.co/BRExyDWQaS http://t.co/BDbYU21x3R",
    url: 'https://twitter.com/wesbos/status/605747005671882753',
    time: 1433256315000,
  },
  {
    text:
      '🔥Protip: Use CSS :not() instead of applying and unapplying borders on navigations. Supported wherever last-child is http://t.co/HPJ1Rw3jZH',
    url: 'https://twitter.com/wesbos/status/606144483562913792',
    time: 1433351081000,
  },
  {
    text:
      '🔥 Check out the Dracula colour scheme for Sublime Text, ZSH, Atom, Vim + more https://t.co/rRIYNUaZLC http://t.co/63Y6vw5zdU',
    url: 'https://twitter.com/wesbos/status/606525749672181760',
    time: 1433441982000,
  },
  {
    text: '🔥 NPM protip: --save-dev in can be replaced with just -D',
    url: 'https://twitter.com/wesbos/status/606567770398932992',
    time: 1433452000000,
  },
  {
    text:
      '🔥 Shortcut querySelector to familiar function names with .bind() http://t.co/VZjZ7XflqX',
    url: 'https://twitter.com/wesbos/status/608341616173182977',
    time: 1433874918000,
  },
  {
    text:
      '🔥 You can now write gulpfiles in ES6/7 by naming it gulpfile.babel.js. Nice example: https://t.co/HtxY6Ofpi6 http://t.co/3LwevcdH0J',
    url: 'https://twitter.com/wesbos/status/608987962370424832',
    time: 1434029019000,
  },
  {
    text:
      '🔥 Oceanic Next theme for Sublime Text is both gorgeous and optimized for ES6 + JSX 😍\n\nhttps://t.co/YINM8Zey03 http://t.co/pArCWgnDV3',
    url: 'https://twitter.com/wesbos/status/609058219755831296',
    time: 1434045770000,
  },
  {
    text:
      '🔥 ES6 Features - a set of simple code examples detailing how to use new JavaScript features https://t.co/DcncW1p1Dl http://t.co/O31EIxolFw',
    url: 'https://twitter.com/wesbos/status/609388024422477825',
    time: 1434124401000,
  },
  {
    text:
      '🔥 Purify CSS detects unused CSS in your app. Works with dyanmically generated classes from jQuery/angular/react//js https://t.co/jPFXNNJ9O6',
    url: 'https://twitter.com/wesbos/status/610496447117529088',
    time: 1434388670000,
  },
  {
    text:
      '🔥 Fantastic guide — React.js for Angular devs http://t.co/L7YlsDEXPT http://t.co/iE66za55po',
    url: 'https://twitter.com/wesbos/status/611194247782404096',
    time: 1434555038000,
  },
  {
    text:
      '🔥 Everything you need to know about SVG on the web https://t.co/5KdqoSt1yZ http://t.co/wXq6uD4Tvt',
    url: 'https://twitter.com/wesbos/status/613381353111851008',
    time: 1435076485000,
  },
  {
    text:
      '🔥 Project not setup for ES6? Dip your toes into ES6 by using `template strings` in debugging http://t.co/SWpB8jtxsl',
    url: 'https://twitter.com/wesbos/status/614117527115964417',
    time: 1435252002000,
  },
  {
    text:
      '🔥 JavaScript in one pic https://t.co/nXRvLPoaDY http://t.co/MSSVavARGq',
    url: 'https://twitter.com/wesbos/status/614821701730222080',
    time: 1435419891000,
  },
  {
    text:
      '🔥 Coverr is unsplash for big, beautiful, free background videos. 7 new videos every monday! http://t.co/YokYbxMOQe http://t.co/pNwHRbsdhw',
    url: 'https://twitter.com/wesbos/status/615886819452792832',
    time: 1435673835000,
  },
  {
    text:
      '🔥 Dead simple explanation of async and defer on script tags http://t.co/78B4h2zazj http://t.co/izYaci5O2r',
    url: 'https://twitter.com/wesbos/status/618205379533475840',
    time: 1436226622000,
  },
  {
    text:
      '🔥 My Smashing Mag article on the command line is up! \n\nhttp://t.co/QdJfhm8Yvv http://t.co/LJVyb6HMI6',
    url: 'https://twitter.com/wesbos/status/620618452223430656',
    time: 1436801944000,
  },
  {
    text:
      '🔥 Styl_s - A WordPress Starter Theme Using Underscores &amp; Stylus by @luclemo https://t.co/sSWTC9rW0U http://t.co/q9QUc3LNZX',
    url: 'https://twitter.com/wesbos/status/620979985214410757',
    time: 1436888140000,
  },
  {
    text:
      '🔥 CSS Quantity Query Generator http://t.co/lHw1Zxy207 http://t.co/L5LY3fv8fQ',
    url: 'https://twitter.com/wesbos/status/621341602443739136',
    time: 1436974356000,
  },
  {
    text:
      "🔥 Remap your caps lock key for window mgmt. I've been using this for a year and I love it!\n\nhttp://t.co/HvLRhBPNz5 http://t.co/l0fq2EZfj8",
    url: 'https://twitter.com/wesbos/status/622042590876008448',
    time: 1437141485000,
  },
  {
    text:
      '🔥CSS Protip: Use negative nth-child to select items 1 through n http://t.co/WjOEDaNy6S',
    url: 'https://twitter.com/wesbos/status/622054570240282624',
    time: 1437144341000,
  },
  {
    text:
      '🔥 Theia checks node apps for required packages, adds them to package.json and installs them for you.\n\nhttps://t.co/8I1xvLVWew\n\n👏 @wisamjs',
    url: 'https://twitter.com/wesbos/status/622093598197088256',
    time: 1437153646000,
  },
  {
    text:
      '🔥 Little @CodePen demo on how to select items X → Y with CSS:\n\nhttp://t.co/Uu0XApaQSQ',
    url: 'https://twitter.com/wesbos/status/623213659360096256',
    time: 1437420689000,
  },
  {
    text:
      '🔥 SlackerYou - A simple, real time chatroom built with Firebase and jQuery.\n\nhttps://t.co/QhZ5rUDVrd http://t.co/SVwd0eIbAG',
    url: 'https://twitter.com/wesbos/status/623509075054100480',
    time: 1437491122000,
  },
  {
    text:
      '🔥 Use Ctrl + M to jump between open+close brackets in Sublime Text! http://t.co/T2es4wvJoS',
    url: 'https://twitter.com/wesbos/status/624229106821902336',
    time: 1437662791000,
  },
  {
    text:
      '🔥 Slack protip: @here notifies only the people who are currently online and available',
    url: 'https://twitter.com/wesbos/status/625680774516228097',
    time: 1438008895000,
  },
  {
    text:
      '🔥 Terminal Tip: Use Option + Click to make your cursor go where you want. No more holding down arrow keys! http://t.co/yQNTIBV7gW',
    url: 'https://twitter.com/wesbos/status/626055204488658944',
    time: 1438098166000,
  },
  {
    text:
      '🔥 New bite-sized podcast on front end development → https://t.co/7SDrrFiTOv http://t.co/gYCeX1ezzD',
    url: 'https://twitter.com/wesbos/status/630747600451317760',
    time: 1439216921000,
  },
  {
    text:
      '🔥 PostCSS: The Future is Here. A nice talk from @harismahmood89 \n\nhttp://t.co/5QshzBmP1r',
    url: 'https://twitter.com/wesbos/status/631452921993887745',
    time: 1439385083000,
  },
  {
    text:
      "🔥 Flexbox makes this left/right/vertical center 'menu' layout super easy without floats. http://t.co/iD6CiAgGFb http://t.co/GvfwlyuUDH",
    url: 'https://twitter.com/wesbos/status/631890355810467840',
    time: 1439489375000,
  },
  {
    text:
      "🔥 Dead simple explanation of JavaScript's .bind() and how to use it to change what `this` refers to. 👏 @dave_lunny \n\nhttps://t.co/Bt7mGOZOOd",
    url: 'https://twitter.com/wesbos/status/632182782974816257',
    time: 1439559095000,
  },
  {
    text:
      "🔥 Use Lodash's _.has() to easily check for nested property existence http://t.co/lBmjsfNfn8",
    url: 'https://twitter.com/wesbos/status/633301405445427200',
    time: 1439825795000,
  },
  {
    text:
      '🔥 Press ? in any Google application to quickly toggle a list of keyboard shortcuts. http://t.co/5waBVPVJ3a',
    url: 'https://twitter.com/wesbos/status/634000703367680001',
    time: 1439992521000,
  },
  {
    text:
      '🔥 Delete word-by-word in Sublime Text by holding ALT when hitting backspace. http://t.co/dUYLPPiQf8',
    url: 'https://twitter.com/wesbos/status/634366483594739712',
    time: 1440079730000,
  },
  {
    text:
      '🔥 Use Ctrl + Backspace to delete word-by-word in a camelCaseString #SublimeText http://t.co/6diLlOE0Ju',
    url: 'https://twitter.com/wesbos/status/634389009540624385',
    time: 1440085100000,
  },
  {
    text:
      '🔥 Highlight CSS colors and Sass/Stylus/Less variables in Sublime Text http://t.co/eDD0jvm7XW http://t.co/n9KWNWHGRE',
    url: 'https://twitter.com/wesbos/status/634747120860438530',
    time: 1440170481000,
  },
  {
    text:
      '🔥 Use flexbox space-between to get rid of nth/first/last-child margin hacks when working with column gutters. http://t.co/K1EFYZK1jf',
    url: 'https://twitter.com/wesbos/status/635853983144243200',
    time: 1440434377000,
  },
  {
    text:
      '🔥 DevTools Tips For Sublime Text Users. A new post I worked on with @addyosmani \n\nhttps://t.co/uJJJUSnCHs http://t.co/kvsOwFyXGQ',
    url: 'https://twitter.com/wesbos/status/635887965709860864',
    time: 1440442479000,
  },
  {
    text:
      '🔥 Text Pastry allows you to insert incremental numbers for each cursor in Sublime Text http://t.co/sRVGOXlaZD',
    url: 'https://twitter.com/wesbos/status/636552982608244736',
    time: 1440601032000,
  },
  {
    text:
      '🔥 Watch me try (and succeed) at fixing my poor Google Page Speed score. \n\nhttp://t.co/ivIE3wKXsV http://t.co/DzjIYDiDd8',
    url: 'https://twitter.com/wesbos/status/636609558253711361',
    time: 1440614520000,
  },
  {
    text:
      '🔥gulp-shell is a handy utility that lets you run shell commands right from inside your gulp tasks\n\nhttps://t.co/mUtleqAaDT',
    url: 'https://twitter.com/wesbos/status/639453200412749825',
    time: 1441292498000,
  },
  {
    text:
      '🔥 ES6 destructuring lets you to create and assign multiple variables at once http://t.co/3CIJlV0wTa',
    url: 'https://twitter.com/wesbos/status/639817631512424448',
    time: 1441379385000,
  },
  {
    text:
      '🔥 With ES6, we can finally set default parameter values in JavaScript\n\nhttp://t.co/CxJ7uhQeXV http://t.co/iNnRvG5cqK',
    url: 'https://twitter.com/wesbos/status/639862224278810624',
    time: 1441390016000,
  },
  {
    text:
      '🔥 Handy command for when you have changed your .gitignore _after_ you have added / committed files http://t.co/VPafQJwNQZ',
    url: 'https://twitter.com/wesbos/status/641261433938968576',
    time: 1441723614000,
  },
  {
    text:
      '🔥 Better console gives you easy-on-the-eyes debugging in Node.js by improving default console methods. http://t.co/0v38ZmnoG2',
    url: 'https://twitter.com/wesbos/status/643501524480561153',
    time: 1442257693000,
  },
  {
    text:
      "🔥 Use twitter's api entirely client side by hijacking their own embed code. \n\nhttp://t.co/eFTeF4tRnI http://t.co/hUlUWrK4w4",
    url: 'https://twitter.com/wesbos/status/644202200495878144',
    time: 1442424747000,
  },
  {
    text:
      "🔥 Three less JavaScript Regexes you'll have to write with ES6 startsWith(), endsWith() and includes() http://t.co/XVTAFMZOho",
    url: 'https://twitter.com/wesbos/status/644897369000030209',
    time: 1442590489000,
  },
  {
    text:
      '🔥 Return multiple values from a function with ES6 destructuring http://t.co/FlQX8C4yYV',
    url: 'https://twitter.com/wesbos/status/645956967660294145',
    time: 1442843117000,
  },
  {
    text:
      '🔥 Turn any Google Spreadsheet into a JSON API with Sheetsu\n\nhttp://t.co/WqMSQt6WG9',
    url: 'https://twitter.com/wesbos/status/646000814767517697',
    time: 1442853571000,
  },
  {
    text:
      '🔥 Pick + choose which variables get created from a returned object with ES6 destructing http://t.co/w2YqbHUESX',
    url: 'https://twitter.com/wesbos/status/646319161086341120',
    time: 1442929470000,
  },
  {
    text:
      '🔥 Say goodbye to indexOf() and use ES7 .includes() to check if an item is inside an array http://t.co/D3NaiJo3ra',
    url: 'https://twitter.com/wesbos/status/646684687465758721',
    time: 1443016618000,
  },
  {
    text:
      '🔥Quickly change the case of a string in Sublime Text. Handy when you are using file names in descriptions: http://t.co/xYRAMj3jst',
    url: 'https://twitter.com/wesbos/status/647048635817984000',
    time: 1443103391000,
  },
  {
    text:
      '🔥 Pipe your Emmet shortcuts into |bem to automatically get Block, Element, Modifier markup! http://t.co/H7DNaeIGvi',
    url: 'https://twitter.com/wesbos/status/648907410929664000',
    time: 1443546557000,
  },
  {
    text:
      '🔥 Slides for my #fronteers15 talk on Modern Workflow &amp; Tooling! Video of the talk to come → http://t.co/UIzXMZtkLc',
    url: 'https://twitter.com/wesbos/status/652412833272057856',
    time: 1444382315000,
  },
  {
    text:
      '🔥 How do you get the most out of a tech conference? \n\nhttp://t.co/nDY0bmSUDy',
    url: 'https://twitter.com/wesbos/status/654349474962083840',
    time: 1444844046000,
  },
  {
    text:
      '🔥 ncu checks for npm module updates and will update your package.json for you. \n\nhttps://t.co/DM5CfXTmRB http://t.co/r4Pks4gryG',
    url: 'https://twitter.com/wesbos/status/655116993847160833',
    time: 1445027037000,
  },
  {
    text:
      '🔥 Bracketless ES6 arrow functions allow for clean, single line functions without an explicit return http://t.co/uzDC08wGSL',
    url: 'https://twitter.com/wesbos/status/656142886057062400',
    time: 1445271629000,
  },
  {
    text:
      '🔥 Understanding ES6 Arrow Functions for jQuery Developers https://t.co/bSFZctmH4a',
    url: 'https://twitter.com/wesbos/status/656178022286954496',
    time: 1445280006000,
  },
  {
    text:
      '🔥 Easily swap two JavaScript Variables with ES6 Destructuring https://t.co/rHNvsxqU6E',
    url: 'https://twitter.com/wesbos/status/657228855917150208',
    time: 1445530544000,
  },
  {
    text:
      '🔥You can style ALT text on broken or blocked images. Handy for HTML emails.\n\nhttps://t.co/cz5P4EzMyX https://t.co/Vhjw3Os9d3',
    url: 'https://twitter.com/wesbos/status/657299554530824193',
    time: 1445547400000,
  },
  {
    text:
      '🔥 Keep a tidy console — group together console data with https://t.co/o64SR1bMYz() and console.groupEnd() https://t.co/WyDDAC4Lru',
    url: 'https://twitter.com/wesbos/status/658636908302610432',
    time: 1445866250000,
  },
  {
    text:
      '🔥 Use an ES6 Spread to quickly convert a NodeList to a real Array. https://t.co/cVy6RpkBgv',
    url: 'https://twitter.com/wesbos/status/659370653850599425',
    time: 1446041189000,
  },
  {
    text:
      '🔥 Increase the number of "Recent Places" osx shows in save dialogs. \n\nhttps://t.co/Q8CruJWyOt https://t.co/8aUwJ35j6o',
    url: 'https://twitter.com/wesbos/status/659732671002578944',
    time: 1446127500000,
  },
  {
    text:
      '🔥 Announcing React For Beginners! Level up your JavaScript skills — learn React.js with me! https://t.co/bZMbvTjPtQ https://t.co/4t1F0wNqyy',
    url: 'https://twitter.com/wesbos/status/661551827301695492',
    time: 1446561221000,
  },
  {
    text:
      '🔥 Use ES6 `Template Strings` for easy, library free HTML templating in JavaScript https://t.co/NtgqIAlLOr',
    url: 'https://twitter.com/wesbos/status/664094742947323904',
    time: 1447167499000,
  },
  {
    text:
      '🔥 The proper way to use Emmet expansions and get className working in React JSX \n\nhttps://t.co/oStsCeQcxp @emmetio https://t.co/NhFNRQhcVF',
    url: 'https://twitter.com/wesbos/status/666340543740309504',
    time: 1447702940000,
  },
  {
    text:
      '🔥 You can use square brackets to reference a JavaScript method stored in a variable https://t.co/QzL7M5cyvX',
    url: 'https://twitter.com/wesbos/status/666386685844848640',
    time: 1447713941000,
  },
  {
    text:
      '🔥 My talk on Modern Workflow &amp; Tooling is up! 🎥\n\nhttps://t.co/GAwOMGJBLo https://t.co/He7waza0Dc',
    url: 'https://twitter.com/wesbos/status/666638394932510720',
    time: 1447773953000,
  },
  {
    text:
      '🔥 New tool: CSS Cursor quick reference + visualizer. https://t.co/FvjXe10JZ2 https://t.co/13UNTkOKaV',
    url: 'https://twitter.com/wesbos/status/667391012541599744',
    time: 1447953391000,
  },
  {
    text:
      '🔥 Use AlignTab in Sublime Text to quickly align content based on common separators or even a regex! https://t.co/odCQlWvwwp',
    url: 'https://twitter.com/wesbos/status/667725319546101761',
    time: 1448033096000,
  },
  {
    text: '🔥 © 2015',
    url: 'https://twitter.com/wesbos/status/667756154391388160',
    time: 1448040448000,
  },
  {
    text:
      '🔥 The new Chrome Dev Tools UI for mobile emulation is a huge step up. Currently available in Canary. https://t.co/xyduq64jHG',
    url: 'https://twitter.com/wesbos/status/668071689985458176',
    time: 1448115677000,
  },
  {
    text:
      '🔥Clearing the air: Is WordPress being rewritten in Node.js and React?\n\nhttps://t.co/AuVZ1Glr7D',
    url: 'https://twitter.com/wesbos/status/669175837808320512',
    time: 1448378927000,
  },
  {
    text:
      "🔥 ES6 improved object syntax is great when an object's property is named the same as the variable it's being set to https://t.co/wzDJnLdMKA",
    url: 'https://twitter.com/wesbos/status/670255569811341312',
    time: 1448636355000,
  },
  {
    text:
      '🔥 CSS4 is getting case insensitive matching on attribute selectors! https://t.co/7LQBi2VUcL',
    url: 'https://twitter.com/wesbos/status/672139536680398848',
    time: 1449085527000,
  },
  {
    text:
      '🔥 ES6 Easy Wins — a talk by @RChristiani \n\nhttps://t.co/p8szuQYH3d',
    url: 'https://twitter.com/wesbos/status/674607938242142208',
    time: 1449674040000,
  },
  {
    text:
      '🔥 An Intro to using npm and ES6 Modules for Front End Development\n\nhttps://t.co/x3zALgB1Mb',
    url: 'https://twitter.com/wesbos/status/676462961066553344',
    time: 1450116312000,
  },
  {
    text:
      '🔥 Open all merge conflicts or currently changed files in Sublime Text, Atom or Vim\n\nPut alias in .zshrc or .bashrc https://t.co/lkvz9VRKFO',
    url: 'https://twitter.com/wesbos/status/684375042101137408',
    time: 1452002699000,
  },
  {
    text:
      '🔥 MoveTab for Sublime Text will let you re-order your tabs with your keyboard. https://t.co/FqfWzJUodU https://t.co/j3o7RwVt7B',
    url: 'https://twitter.com/wesbos/status/687647017485479936',
    time: 1452782799000,
  },
  {
    text:
      '🔥 Include directories when creating a new file in Sublime Text to quickly scaffold nested folder structure https://t.co/Gxd8mD3nZX',
    url: 'https://twitter.com/wesbos/status/689174685842460672',
    time: 1453147024000,
  },
  {
    text:
      "🔥 You can now use autoprefixer based on your own site's Google Analytics data https://t.co/3bWx2pkQ7h https://t.co/CsOEtGxC9w",
    url: 'https://twitter.com/wesbos/status/689468957057687553',
    time: 1453217183000,
  },
  {
    text:
      '🔥 CSS Highlight on Hover Code Along 📽 https://t.co/8WYyaFRKlm https://t.co/gD52BfxwOj',
    url: 'https://twitter.com/wesbos/status/689863542355329024',
    time: 1453311260000,
  },
  {
    text:
      '🔥 Quickly hack on and share React examples with https://t.co/EiwHcr5SzH\n\nhttps://t.co/Q6jobn3wmB',
    url: 'https://twitter.com/wesbos/status/690198083486007296',
    time: 1453391021000,
  },
  {
    text:
      '🔥 Use Emmet in JavaScript to quickly value bump variables https://t.co/dceui0AGKH',
    url: 'https://twitter.com/wesbos/status/690548776524734464',
    time: 1453474632000,
  },
  {
    text:
      '🔥 View your recently used branches with `git latest`. \n\n👉 Add this to your ~/.gitconfig https://t.co/4JQDlQEl0E',
    url: 'https://twitter.com/wesbos/status/692012780598112256',
    time: 1453823678000,
  },
  {
    text:
      '🔥 CSS background-position accepts 4 values to allow you to anchor a background image and position it from there https://t.co/N7yxn6udGx',
    url: 'https://twitter.com/wesbos/status/692425353495736322',
    time: 1453922043000,
  },
  {
    text:
      '🔥 Need to log lots of arguments? Use console.table with an ES6 enhanced object literal. https://t.co/qsnjX8p2NZ',
    url: 'https://twitter.com/wesbos/status/694229929332908032',
    time: 1454352287000,
  },
  {
    text:
      "🔥 CSS variables can be updated with JavaScript. Something you can't do with Sass! \n\nDemo: https://t.co/9I0Y3uFlkv https://t.co/vmd88AKvky",
    url: 'https://twitter.com/wesbos/status/697059929136328704',
    time: 1455027012000,
  },
  {
    text:
      '🔥 CSS variables can also be used in animations and transitions! \n\nDemo:  https://t.co/SaQm9DDsQe https://t.co/AVd7hr7ZAr',
    url: 'https://twitter.com/wesbos/status/697808716905652224',
    time: 1455205537000,
  },
  {
    text:
      '🔥 Text Expander will match the case of your abbreviation. Super handy for when you use snippets to start a sentence. https://t.co/RQUu68KJF9',
    url: 'https://twitter.com/wesbos/status/699591752806629376',
    time: 1455630646000,
  },
  {
    text:
      '🔥 Chrome Dev Tools now has color palettes for Material Design, custom swatches, similar shades and document colors! https://t.co/UYUwGYFz0J',
    url: 'https://twitter.com/wesbos/status/699662688683692032',
    time: 1455647558000,
  },
  {
    text:
      '🔥 JavaScript Challenge #2\n\nReplicate this filter functionality. Stay sharp and good luck!\n\nhttps://t.co/VkAJgkJZ86 https://t.co/Oqt9xLjLoL',
    url: 'https://twitter.com/wesbos/status/699967550621380608',
    time: 1455720243000,
  },
  {
    text:
      '🔥 I documented my Animated Gif workflow for everyone who has been asking\n\nhttps://t.co/lqYxrjOWuH https://t.co/c4aKNaJHCJ',
    url: 'https://twitter.com/wesbos/status/700380565833412608',
    time: 1455818713000,
  },
  {
    text:
      '🔥 iTerm3 has some nice new features - the best one is the ability to view inline images. https://t.co/KtRgiOW4lx https://t.co/yf0M3sdKnA',
    url: 'https://twitter.com/wesbos/status/700684778811498497',
    time: 1455891244000,
  },
  {
    text:
      '🔥 Use a variable to hold and call your methods instead of using if statements #javascript https://t.co/rH2ygKeBSr',
    url: 'https://twitter.com/wesbos/status/701450025944145920',
    time: 1456073693000,
  },
  {
    text:
      '🔥 Mistype a git command? Immediately re-run the correct command with\n\ngit config --global help.autocorrect -1 https://t.co/Fuqg01ZE3Z',
    url: 'https://twitter.com/wesbos/status/701864888818208768',
    time: 1456172604000,
  },
  {
    text:
      '🔥 Most text editors will wrap highlighted selections when typing the quote or bracket you need. https://t.co/IXVoLNs2wV',
    url: 'https://twitter.com/wesbos/status/702541523523649538',
    time: 1456333926000,
  },
  {
    text:
      "🔥 What's the deal with const objects in JavaScript? https://t.co/vsju6g77nW",
    url: 'https://twitter.com/wesbos/status/704328255436939264',
    time: 1456759916000,
  },
  {
    text:
      '🔥 ⌘ + Click URLs and file paths in iTerm to open them in your editor or browser. https://t.co/hNBo4pybbD',
    url: 'https://twitter.com/wesbos/status/704678249477992448',
    time: 1456843361000,
  },
  {
    text:
      '🔥 Announcing Mastering Markdown — a free mini-series to learn Markdown and related tooling! https://t.co/rNnqm0PyTf https://t.co/iO4DvmCecG',
    url: 'https://twitter.com/wesbos/status/705768641401331712',
    time: 1457103331000,
  },
  {
    text:
      '🔥 Use console.time() and console.timeEnd() to easily time any type of operation https://t.co/I8HcEMyDPZ',
    url: 'https://twitter.com/wesbos/status/707598960223981569',
    time: 1457539713000,
  },
  {
    text: '🔥 Git Hot Tips\n\nhttps://t.co/4XmQAKQM7N',
    url: 'https://twitter.com/wesbos/status/707932134523084800',
    time: 1457619148000,
  },
  {
    text:
      '🔥 🛠 Slides for my Workflow + Tooling talk at #SmashingConf. Thanks to everyone who came out! \n\nhttps://t.co/C4Z7mWTyCk',
    url: 'https://twitter.com/wesbos/status/710158577068068866',
    time: 1458149973000,
  },
  {
    text:
      '🔥 Independent Properties for CSS Transforms are coming! You can use Post CSS in the mean time. https://t.co/Hk2Pu1Ty5D',
    url: 'https://twitter.com/wesbos/status/711942951446781953',
    time: 1458575401000,
  },
  {
    text:
      '🔥 Simple example on how to use Browsersync to expose your realtime localhost to the world \n\nhttps://t.co/tAuWbamJ8o https://t.co/RxF57j5jnJ',
    url: 'https://twitter.com/wesbos/status/712312163323420672',
    time: 1458663428000,
  },
  {
    text:
      '🔥 Use ES6 destructuring to easily assign nested data to variables. https://t.co/kOYP7nAmUD',
    url: 'https://twitter.com/wesbos/status/712753264257662976',
    time: 1458768595000,
  },
  {
    text:
      '🔥 One of my most used plugins — ChangeQuotes for Sublime Text swaps and escapes between single and double quotes https://t.co/3sNLCt64R9',
    url: 'https://twitter.com/wesbos/status/714462848810745857',
    time: 1459176191000,
  },
  {
    text:
      '🔥Terminal Tip: Use curly brackets to speed up the creation of multiple files with similar names: https://t.co/yYMkknvFoV',
    url: 'https://twitter.com/wesbos/status/714479411593142272',
    time: 1459180140000,
  },
  {
    text:
      '🔥 Use `git push origin head` if you have hard to type or long branch names https://t.co/4WupZuHtSp',
    url: 'https://twitter.com/wesbos/status/714905092445618176',
    time: 1459281630000,
  },
  {
    text:
      '🔥 CSS4 is getting media queries for elements https://t.co/YxVezTcdV8',
    url: 'https://twitter.com/wesbos/status/715891994355220480',
    time: 1459516926000,
  },
  {
    text:
      "🔥 Use JSON.stringify()'s third param to pretty print an object to your page https://t.co/N8OLllUhVa",
    url: 'https://twitter.com/wesbos/status/715939096934350850',
    time: 1459528156000,
  },
  {
    text:
      '🔥 ES6 Tip: Use Destructuring to create multiple variables from an array of data: https://t.co/wO3wWFEpVX',
    url: 'https://twitter.com/wesbos/status/717018537806708738',
    time: 1459785515000,
  },
  {
    text:
      '🔥Use `mix-blend-mode:multiply;` in your CSS to knock out white backgrounds from images\n\nPen: https://t.co/vE9cmxaG5K https://t.co/v5VQEDoVH3',
    url: 'https://twitter.com/wesbos/status/717052613934649344',
    time: 1459793640000,
  },
  {
    text:
      '🔥 ChangeQuotes now supports backticks as well https://t.co/WHBFeHDWA9',
    url: 'https://twitter.com/wesbos/status/717387374095761408',
    time: 1459873453000,
  },
  {
    text:
      '🔥 Use the npm `open` package to open the your default browser to localhost when starting up an express server https://t.co/c0Rtf8a4QZ',
    url: 'https://twitter.com/wesbos/status/717436062596001796',
    time: 1459885061000,
  },
  {
    text:
      '🔥 15 Slack tips in 5 minutes \nhttps://t.co/qspdZVcvBK https://t.co/1vBg3IWniW',
    url: 'https://twitter.com/wesbos/status/717458051163365376',
    time: 1459890303000,
  },
  {
    text:
      '🔥 With ES6, your JavaScript functions can have default parameter values https://t.co/qLN0XASRNP',
    url: 'https://twitter.com/wesbos/status/718078725208690692',
    time: 1460038284000,
  },
  {
    text:
      '🔥Use the `tree` command to pretty print your directory listing.  I use `t` with some nice defaults: https://t.co/d0fR36208Y',
    url: 'https://twitter.com/wesbos/status/718448514846625792',
    time: 1460126448000,
  },
  {
    text:
      '🔥 Here is everything we are getting in ES7: https://t.co/PRzZlG5ogq',
    url: 'https://twitter.com/wesbos/status/720325814605127680',
    time: 1460574031000,
  },
  {
    text:
      '🔥 Pop an echo in front of your commands to do a "test run" before running a command with brace expansion https://t.co/wscietCha4',
    url: 'https://twitter.com/wesbos/status/720676684232593408',
    time: 1460657685000,
  },
  {
    text:
      '🔥 Slides from my @industryconf talk: Start Using ES6 Today!\n\nhttps://t.co/sRMrihrMw5 https://t.co/XBRPyJqWky',
    url: 'https://twitter.com/wesbos/status/722788398008651776',
    time: 1461161157000,
  },
  {
    text:
      '🔥 My @onedayoutconf talk on creating products will be streaming live at 8:45AM EST #ODO16 https://t.co/3FjElMjZ5a',
    url: 'https://twitter.com/wesbos/status/726018425768783872',
    time: 1461931256000,
  },
  {
    text:
      '🔥 Use brew cask to install desktop applications via the command line https://t.co/ePwMoQXy3y',
    url: 'https://twitter.com/wesbos/status/727833672590598144',
    time: 1462364044000,
  },
  {
    text:
      '🔥 CSS calc() _is_ whitespace sensitive, so commit this to memory and your future self will thank you. https://t.co/BkfrDd4P8I',
    url: 'https://twitter.com/wesbos/status/729687284937850880',
    time: 1462805980000,
  },
  {
    text:
      '🔥 DevTools Tips For Sublime Text Users. A gif-filled article by @addyosmani\nand I \nhttps://t.co/Rrs3Wv6tch https://t.co/6NZdYkw3tK',
    url: 'https://twitter.com/wesbos/status/730016241323278336',
    time: 1462884409000,
  },
  {
    text:
      '🔥 JavaScript Challenge! Sort this list of band names, but ignore articles "a" and "the". \n\nhttps://t.co/f1HmAty7yy https://t.co/JMtKgeNQty',
    url: 'https://twitter.com/wesbos/status/730061721356906497',
    time: 1462895252000,
  },
  {
    text:
      '🔥Whipped up a quick Gulp script to write and inline emails written in Jade and Stylus https://t.co/y67dXypt5N https://t.co/eGvq9HW37J',
    url: 'https://twitter.com/wesbos/status/730828395450384384',
    time: 1463078042000,
  },
  {
    text:
      '🔥 You can use font css on broken or blocked images to style the alt text in HTML emails https://t.co/hEQYYfy3dw',
    url: 'https://twitter.com/wesbos/status/731180258787893248',
    time: 1463161933000,
  },
  {
    text:
      "🔥 Announcing Learn Redux! My latest video course on React + Redux. Grab it now, it's free! https://t.co/jG3uoKJGZU https://t.co/EUpu7dn9NN",
    url: 'https://twitter.com/wesbos/status/732217248090329088',
    time: 1463409170000,
  },
  {
    text:
      '🔥 Use .every() and .some() to check if array items meet your needs https://t.co/v8dGZE52Q8',
    url: 'https://twitter.com/wesbos/status/735109695908814848',
    time: 1464098783000,
  },
  {
    text:
      '🔥 You can run JS right inside of ES6 Template strings. Handy for ternary operators: https://t.co/lTr9AIGnWI',
    url: 'https://twitter.com/wesbos/status/735528285204054017',
    time: 1464198583000,
  },
  {
    text:
      '🔥 Use ES6 Modules, npm and Babel without tooling overhead. SystemJS runs in the browser — perfect for quick examples https://t.co/Dpfz1CCE5K',
    url: 'https://twitter.com/wesbos/status/738012845296787457',
    time: 1464790948000,
  },
  {
    text:
      '🔥 CSS4 might be getting selectors for drag + drop items \n\nhttps://t.co/TuvY4QKRmg https://t.co/oM0OHvYvrF',
    url: 'https://twitter.com/wesbos/status/739833468092350464',
    time: 1465225018000,
  },
  {
    text:
      '🔥 Reminder: Flexbox treats flex-container :before and :after as first class flex-items. They can really goof up alignment + centering',
    url: 'https://twitter.com/wesbos/status/743861247486099456',
    time: 1466185316000,
  },
  {
    text:
      '🔥 New 5 min video: How To Manually Fix Git Merge Conflicts \n\nhttps://t.co/q5d64hLEom',
    url: 'https://twitter.com/wesbos/status/748172037458436096',
    time: 1467213088000,
  },
  {
    text:
      '🔥 Public APIs: a community curated list of over 200 open + free JSON APIs. \n\nhttps://t.co/vu27UUxAee https://t.co/IZTX8pIm66',
    url: 'https://twitter.com/wesbos/status/748512912319385600',
    time: 1467294359000,
  },
  {
    text:
      '🔥 ESLint Plugins to lint JavaScript inside of HTML &lt;script&gt; tags or markdown code blocks \n\nhttps://t.co/3H96UZPBZr\nhttps://t.co/dTxC1WVNQp',
    url: 'https://twitter.com/wesbos/status/750328183921061888',
    time: 1467727154000,
  },
  {
    text:
      '🔥 You can format currency with .toLocaleString() https://t.co/Dagiw1QcNM',
    url: 'https://twitter.com/wesbos/status/750423643323297792',
    time: 1467749913000,
  },
  {
    text: '🔥 Object.freeze() vs Object.seal() https://t.co/ZaX6FXhJbZ',
    url: 'https://twitter.com/wesbos/status/751440102367326209',
    time: 1467992256000,
  },
  {
    text:
      '🔥 In CSS you can set multiple backgrounds each with their own size property https://t.co/Pjlw6Rz5qL',
    url: 'https://twitter.com/wesbos/status/753234911549587457',
    time: 1468420171000,
  },
  {
    text:
      '🔥 Announcing ES6 for Everyone!\n\nStrengthen your core JavaScript skills\nand master ES6 → https://t.co/TKXb11wZJO https://t.co/YtmsHOeCqv',
    url: 'https://twitter.com/wesbos/status/755086023420444672',
    time: 1468861511000,
  },
  {
    text:
      '🔥 Use ⌘ + Shift + V to paste and strip formatting + indentation. Works everywhere! https://t.co/MakEymw36L',
    url: 'https://twitter.com/wesbos/status/760103025541259264',
    time: 1470057657000,
  },
  {
    text:
      '🔥 Use ES6 destructuring to pull Promise.all() data into their own variables. https://t.co/Mgq9WOtLp4',
    url: 'https://twitter.com/wesbos/status/760941806515355649',
    time: 1470257638000,
  },
  {
    text:
      '🔥 You can use ES6 destructuring inside of Jade/Pug templates too! https://t.co/4pd2B7lFhN',
    url: 'https://twitter.com/wesbos/status/761201915069927425',
    time: 1470319653000,
  },
  {
    text:
      '🔥 If you have dropped IE8, you can move to using the Date.now() static method to get timestamps. https://t.co/WMeoALztYT',
    url: 'https://twitter.com/wesbos/status/762642338262814722',
    time: 1470663077000,
  },
  {
    text:
      '🔥 The ZSH Syntax Highlighting plugin gives great visual feedback in real time: https://t.co/scD5dVKsc1',
    url: 'https://twitter.com/wesbos/status/762693805707497472',
    time: 1470675348000,
  },
  {
    text:
      '🔥 Released Cobalt2 for HyperTerm!\n\nhttps://t.co/kZaSmiWYfe https://t.co/f44VgE5M1s',
    url: 'https://twitter.com/wesbos/status/763757339937693696',
    time: 1470928914000,
  },
  {
    text: '🔥 A few ES6 tricks to make and fill Arrays https://t.co/680Eq5XgB8',
    url: 'https://twitter.com/wesbos/status/763833586432643072',
    time: 1470947093000,
  },
  {
    text:
      '🔥 Sublime ChangeQuotes now supports ES6 backticks. Easily switch to template strings when adding a variable https://t.co/6rHg3vZThP',
    url: 'https://twitter.com/wesbos/status/765622612550713344',
    time: 1471373630000,
  },
  {
    text:
      '🔥 Use concurrently to run two node processes and pipe everything into a single terminal tab. https://t.co/MiewRVEAy9',
    url: 'https://twitter.com/wesbos/status/765926725071036416',
    time: 1471446136000,
  },
  {
    text:
      '🔥 Use HTML5 pushstate to remove ugly UTM params from Google Analytics links. Been using for 2 years - works great! https://t.co/ciIqlOyuLQ',
    url: 'https://twitter.com/wesbos/status/766702800868741120',
    time: 1471631167000,
  },
  {
    text:
      '🔥 React FAQ: an extensive list of resources that explain the whys, hows and WTFs of React \n\nhttps://t.co/MgH7eHvpkm',
    url: 'https://twitter.com/wesbos/status/768132501487378433',
    time: 1471972034000,
  },
  {
    text:
      '🔥 Need to know the name of a variable when logging it? You can use ES6 object shorthand to display them https://t.co/Etvn9Mv19Z',
    url: 'https://twitter.com/wesbos/status/768532398032158720',
    time: 1472067376000,
  },
  {
    text:
      '🔥 Babili is UglifyJS for ES6+ code using Babel! https://t.co/bpyBeLdELg',
    url: 'https://twitter.com/wesbos/status/769171388544479232',
    time: 1472219724000,
  },
  {
    text:
      "🔥 When docs don't make sense or you need more context, search for real world examples on GitHub code search https://t.co/vgHl8MQTiV",
    url: 'https://twitter.com/wesbos/status/769194752784859136',
    time: 1472225294000,
  },
  {
    text: '🔥 let, const and var scoping 101\n\nhttps://t.co/kiiuW9eCZe',
    url: 'https://twitter.com/wesbos/status/770697923873103873',
    time: 1472583678000,
  },
  {
    text:
      "🔥 jQuery's .one() in vanilla JS: Set once boolean in addEventListener() to unbind after the first event. https://t.co/BsWK20w5Jw",
    url: 'https://twitter.com/wesbos/status/770997793871855617',
    time: 1472655173000,
  },
  {
    text:
      '🔥 Use Goto Symbol in Sublime Text — ⌘R — and @media to quickly jump to the media query you are looking for. https://t.co/R30BtECwed',
    url: 'https://twitter.com/wesbos/status/773192292035244033',
    time: 1473178382000,
  },
  {
    text:
      '🔥 CSS4 :placeholder-shown selector can be used to show + hide labels without JS\n\nDemo 👉 https://t.co/pnUq6FTKlU https://t.co/t22jsxXEIZ',
    url: 'https://twitter.com/wesbos/status/774260903005057024',
    time: 1473433159000,
  },
  {
    text:
      '🔥 Nova is a nice new colour scheme from @trevordmiller for Sublime/Atom/Term/Vim/Life\n\nhttps://t.co/WbnMe2Vi50 https://t.co/hhDwnM4znX',
    url: 'https://twitter.com/wesbos/status/779402006423306240',
    time: 1474658893000,
  },
  {
    text:
      '🔥 Chrome dev tools is getting a really handy shadow editor! Just landed in canary. https://t.co/apqKmW754u',
    url: 'https://twitter.com/wesbos/status/780866288625352704',
    time: 1475008005000,
  },
  {
    text:
      '🔥 Announcing the re-launch of https://t.co/Q1XhIQrO9e! Totally updated and re-recorded. \n\nFree update!  https://t.co/MpH2dJcqja',
    url: 'https://twitter.com/wesbos/status/781140582492205056',
    time: 1475073402000,
  },
  {
    text:
      '🔥 Slides from my talk `Start Using ES6 Today` are now up! \n\nhttps://t.co/xVJGve9M3O\n\n(zoom out if they are too big) https://t.co/lVGdxGhBaY',
    url: 'https://twitter.com/wesbos/status/783046436346671104',
    time: 1475527793000,
  },
  {
    text:
      '🔥 A quick demo on how the new CSS rotate syntax works:\n\nhttps://t.co/2OGx0oBa9b https://t.co/1CWKfCSONO',
    url: 'https://twitter.com/wesbos/status/783346628841185281',
    time: 1475599364000,
  },
  {
    text:
      '🔥 Emmet Tip: Use lorem$ to generate $ words of lorem ipsum in your tag expansions. https://t.co/MG9Ep32XLj',
    url: 'https://twitter.com/wesbos/status/784042741617623040',
    time: 1475765331000,
  },
  {
    text:
      '🔥 Facebook, Google and friends just released Yarn, an npm replacement that still works with npm. \n\nhttps://t.co/4WdVpwHksp',
    url: 'https://twitter.com/wesbos/status/785859646397480960',
    time: 1476198514000,
  },
  {
    text:
      '🔥 An intro to JavaScript Template Strings\nhttps://t.co/Qpvc3UaZgO https://t.co/gIbJoZmRaB',
    url: 'https://twitter.com/wesbos/status/788090842086989824',
    time: 1476730473000,
  },
  {
    text:
      '🔥 Template literals in ES6 are great for quickly creating HTML without a templating library\n\nhttps://t.co/E4xhbvvHFj https://t.co/wZG4s8t9kX',
    url: 'https://twitter.com/wesbos/status/790557679680757760',
    time: 1477318613000,
  },
  {
    text:
      '🔥 CSS is getting character units — ch — which is the width of a `0`. Allows for perfect element + text scaling.\n\n👉 https://t.co/rxgwXDzqpg https://t.co/bkqRPLG9Qj',
    url: 'https://twitter.com/wesbos/status/790936125724618757',
    time: 1477408841000,
  },
  {
    text:
      '🔥 Some new DOM apis: .closest() and .matches() https://t.co/MOfQ6BZkTB',
    url: 'https://twitter.com/wesbos/status/791648375401746432',
    time: 1477578655000,
  },
  {
    text:
      '🔥 Another new DOM Api is .scrollIntoView() to smooth scroll to a place on your page https://t.co/8vu3g2PwlY',
    url: 'https://twitter.com/wesbos/status/791654882424025088',
    time: 1477580206000,
  },
  {
    text:
      '🔥 JavaScript Completions for Sublime Text has had some major upgrades including inline docs. https://t.co/FarsXXLN0a',
    url: 'https://twitter.com/wesbos/status/791721391318044672',
    time: 1477596063000,
  },
  {
    text:
      '🔥 Flexbox tip: In most cases, `margin: auto;` on flex-items does the same thing as `justify-content: center; align-items: center;` https://t.co/i8YL2TIFed',
    url: 'https://twitter.com/wesbos/status/793111753768837120',
    time: 1477927552000,
  },
  {
    text:
      '🔥 Another great use case for Flexbox is when you want a label to span "the rest" of the width beside an input without knowing widths https://t.co/VeWkFoOz4Q',
    url: 'https://twitter.com/wesbos/status/793140731158335488',
    time: 1477934460000,
  },
  {
    text:
      '🔥 CSS case insensitive attribute selectors are coming! Part of Selectors Level 4. https://t.co/EAokYntZc7',
    url: 'https://twitter.com/wesbos/status/793482638644224000',
    time: 1478015977000,
  },
  {
    text:
      '🔥 Handy: use ES6 destructuring to get and rename values on an event or window object https://t.co/sz1MABmE5i',
    url: 'https://twitter.com/wesbos/status/793502493783232512',
    time: 1478020711000,
  },
  {
    text:
      '🔥📽 Recorded a quick video explaining what is going on in this code. Snickers Guest Appearance! \n\nhttps://t.co/9cYsR7SiEK https://t.co/TcFLwQSsxC',
    url: 'https://twitter.com/wesbos/status/794278489876639745',
    time: 1478205723000,
  },
  {
    text:
      '🔥 Figure out which part of your JS is applying inline styles / classes with a "break on attribute modifications" breakpoint in dev tools https://t.co/9UfX4hNHz3',
    url: 'https://twitter.com/wesbos/status/794582144601522178',
    time: 1478278120000,
  },
  {
    text:
      '🔥 Four new JavaScript String methods you should know about: .startsWith(), .endsWith(), .includes() and .repeat()\n\nhttps://t.co/l2BV9JjGS5 https://t.co/Y1avQXgDOC',
    url: 'https://twitter.com/wesbos/status/798544648310497280',
    time: 1479222855000,
  },
  {
    text:
      '🔥 Wrap curly brackets around your console.log arguments to see the variable name when logged. This takes advantage of ES6 shorthand syntax https://t.co/roglkiP4cK',
    url: 'https://twitter.com/wesbos/status/798579690575462400',
    time: 1479231209000,
  },
  {
    text:
      '🔥 Setting Default Values with JavaScript’s Destructuring \n\n👉 https://t.co/14PMh0OgqG https://t.co/1gQZDcP6sp',
    url: 'https://twitter.com/wesbos/status/798610350497087488',
    time: 1479238519000,
  },
  {
    text:
      '🔥 A Dead Simple intro to Destructuring JavaScript Objects\n\nhttps://t.co/YuJTEAc5cM https://t.co/lJfgoNEta3',
    url: 'https://twitter.com/wesbos/status/798897519367454720',
    time: 1479306986000,
  },
  {
    text:
      '🔥 Life Hack: Gain 20% extra time in your life by never talking about:\n\nSemi Colons\nTabs vs Spaces\nWhat to call { Curly Brackets }',
    url: 'https://twitter.com/wesbos/status/798927616833163264',
    time: 1479314161000,
  },
  {
    text:
      '🔥 How to destructure and rename variables in a single shot \n\nhttps://t.co/LVLF9mRtOS https://t.co/bhwb1faB64',
    url: 'https://twitter.com/wesbos/status/799262521819627520',
    time: 1479394009000,
  },
  {
    text:
      '🔥 Sublime HyperClick lets you open ES6 + CommonJS modules right from their import statement\n\nhttps://t.co/atLQSGjpaI https://t.co/gUg84xKLxv',
    url: 'https://twitter.com/wesbos/status/801807650677727232',
    time: 1480000815000,
  },
  {
    text:
      '🔥 Text Pastry + Sublime Multiple Cursors is one of my favourite combos https://t.co/M8eEQeZ30Y',
    url: 'https://twitter.com/wesbos/status/802249972586573834',
    time: 1480106273000,
  },
  {
    text:
      "🔥 Git Tip: Use `git add -p` to review and add changes hunk-by-hunk. Handy when you want to break a single file's changes into two commits https://t.co/VH2SGl48FS",
    url: 'https://twitter.com/wesbos/status/803260420022738944',
    time: 1480347182000,
  },
  {
    text:
      '🔥 JavaScript Coding Challenge!\n\nFilter this list of homes for the ones that match the list of needs.\n\n👉 https://t.co/1xda10c4yk https://t.co/pTGOZzbpEk',
    url: 'https://twitter.com/wesbos/status/803690918788395008',
    time: 1480449821000,
  },
  {
    text:
      "🔥 Cobalt2 is now on VS Code. Not 100% yet, but well on it's way. \n\nhttps://t.co/7bWM8ljVF8 https://t.co/D04EOvBbTv",
    url: 'https://twitter.com/wesbos/status/804371689077440512',
    time: 1480612129000,
  },
  {
    text:
      '🔥 Use object-fit:cover; on &lt;img&gt; and &lt;video&gt; to get that background-size: cover; effect https://t.co/Qm5FM4BxzF',
    url: 'https://twitter.com/wesbos/status/806503442432790530',
    time: 1481120379000,
  },
  {
    text:
      '🔥 Announcing #JavaScript30 — a 30 Day Vanilla JS Coding Challenge. Totally Free! \n\n👉 https://t.co/WNFNDgua8Y https://t.co/e26RNDOp9d',
    url: 'https://twitter.com/wesbos/status/806905096265199616',
    time: 1481216141000,
  },
  {
    text:
      '🔥 2 neat things about &lt;img&gt; when src fails. You can:\n\n1. Style alt text\n2. Display :before/:after pseudo elements\n\n👉 https://t.co/DOmCD8q3dY https://t.co/IWexk78TD4',
    url: 'https://twitter.com/wesbos/status/809492128137093120',
    time: 1481832937000,
  },
  {
    text: '🔥 https://t.co/VB4dfQk2Hm',
    url: 'https://twitter.com/wesbos/status/815204241065279489',
    time: 1483194811000,
  },
  {
    text:
      "🔥 Express' res.format() is a nice way to handle both HTML form submits and JSON API requests in a single request https://t.co/AahQjR3RWy",
    url: 'https://twitter.com/wesbos/status/817047092724203524',
    time: 1483634181000,
  },
  {
    text:
      '🔥 Super handy CSS Clip Path generator → https://t.co/6nXe1txk3k https://t.co/uhKZEq4Qbc',
    url: 'https://twitter.com/wesbos/status/821016014125146117',
    time: 1484580446000,
  },
  {
    text: '🔥 Quick Flexbox Tip Video https://t.co/xDhKCfhtgw',
    url: 'https://twitter.com/wesbos/status/821395162127548419',
    time: 1484670842000,
  },
  {
    text:
      '🔥 OS X Tip: Most apps will let you ⌘ + Click the title bar to view and open parent folders https://t.co/bhQn0FxbXB',
    url: 'https://twitter.com/wesbos/status/821713266535759872',
    time: 1484746684000,
  },
  {
    text:
      "🔥 What's the deal with flexbox stretching images? Use align-self: center; on your &lt;img&gt; to fix. https://t.co/Bq21jNIeTm",
    url: 'https://twitter.com/wesbos/status/826072910464950273',
    time: 1485786104000,
  },
  {
    text:
      '🔥 Use ES6 destructuring to convert an array argument into variables when you define your function https://t.co/aObOp75Kod',
    url: 'https://twitter.com/wesbos/status/826462488430510081',
    time: 1485878986000,
  },
  {
    text:
      "🔥 Skip Youtube pre-roll ads with: $('video').currentTime = $('video').duration https://t.co/hLlK55GqY9",
    url: 'https://twitter.com/wesbos/status/827268492936114176',
    time: 1486071153000,
  },
  {
    text:
      "🔥 Use console.dir(el) to see an element's properties + prototype instead of the element itself https://t.co/NF77O9RKUm",
    url: 'https://twitter.com/wesbos/status/831557963735302144',
    time: 1487093842000,
  },
  {
    text:
      "🔥 Use flexbox's order property to re-order pieces of your nav at different breakpoints 👌 https://t.co/b826HhKvb3",
    url: 'https://twitter.com/wesbos/status/831568788747382784',
    time: 1487096423000,
  },
  {
    text:
      '🔥 Use console.table() to log an array of objects in a tidy table 👌 https://t.co/3kkL9JHDsv',
    url: 'https://twitter.com/wesbos/status/831875344080785408',
    time: 1487169512000,
  },
  {
    text:
      '🔥 Use https://t.co/o64SR1bMYz(), groupCollapsed() and groupEnd() to group together and tuck away any logging you need to do https://t.co/4m9W0bKczw',
    url: 'https://twitter.com/wesbos/status/832630118279479299',
    time: 1487349464000,
  },
  {
    text:
      '🔥 Node 7.6 has async/await! Here is a quick run down on how async/await works: https://t.co/ovd2ixRUp6',
    url: 'https://twitter.com/wesbos/status/834399928277463042',
    time: 1487771419000,
  },
  {
    text:
      "🔥 Safari will fire a submit event even if a form is invalid. Use .checkValidity() to stop submission if required inputs aren't satisfied. https://t.co/WUGxl5Dsko",
    url: 'https://twitter.com/wesbos/status/836584879852777472',
    time: 1488292353000,
  },
  {
    text:
      '🔥 14 Chrome Dev Tools Tricks \n\nhttps://t.co/I5nIVqXHSg https://t.co/fH3Hy38Omn',
    url: 'https://twitter.com/wesbos/status/837366006154678273',
    time: 1488478588000,
  },
  {
    text:
      '🔥 Pass values along your promise chain by resolving them with Promise.all() https://t.co/W4yolsidiq',
    url: 'https://twitter.com/wesbos/status/838770820231090177',
    time: 1488813521000,
  },
  {
    text:
      '🔥 Firefox 52 has a sweet new CSS Grid visualizer / inspector tool! https://t.co/B9ZnH4js9T',
    url: 'https://twitter.com/wesbos/status/839130959324803074',
    time: 1488899385000,
  },
  {
    text:
      '🔥 The NIM Chrome extension (Node Inspector Monitor) will now refresh your tab with the new dev tools after restarting an app https://t.co/HDMQmBfZDS',
    url: 'https://twitter.com/wesbos/status/839871332280057857',
    time: 1489075904000,
  },
  {
    text:
      '🔥 Use the Firefox dev tools fonts panel to figure out if your fonts are being loaded from your system or a webfont https://t.co/TBRO7p9htN',
    url: 'https://twitter.com/wesbos/status/844198126592430080',
    time: 1490107492000,
  },
  {
    text:
      '🔥 Spoof your mac address to get unlimited wifi once you run out of 30 min slots. \n\nsudo ifconfig en0 ether fa:ke:ma:c https://t.co/DBQCKkrNc3',
    url: 'https://twitter.com/wesbos/status/844552310407745536',
    time: 1490191936000,
  },
  {
    text:
      '🔥 Async + Await makes orchestrating timers a snap! https://t.co/wHYLC4ifLc',
    url: 'https://twitter.com/wesbos/status/844618918274777092',
    time: 1490207817000,
  },
  {
    text:
      '🔥 If you are ever working on a site that messes with built-ins, you can get fresh copies by creating an iframe with no src https://t.co/CSyQAweSkJ',
    url: 'https://twitter.com/wesbos/status/845324162625388544',
    time: 1490375960000,
  },
  {
    text:
      '🔥 https://t.co/FvjXe1ilnC is a handy site to quickly view CSS cursor options and copy to clipboard. https://t.co/NqqeQ4z3Cz',
    url: 'https://twitter.com/wesbos/status/846730245256462336',
    time: 1490711196000,
  },
  {
    text:
      '🔥 :nth-last-child() will give you nth-child but start counting from the end. https://t.co/8HfNi0ghFe',
    url: 'https://twitter.com/wesbos/status/856960256164990976',
    time: 1493150221000,
  },
  {
    text:
      '🔥 wipe-modules is a new CLI tool to delete old node_module folders and free up hard drive space. 👏🏻 @bntzio\n\nhttps://t.co/hN6juVySZ5',
    url: 'https://twitter.com/wesbos/status/860594816639528960',
    time: 1494016768000,
  },
  {
    text:
      '🔥 Announcing Learn Node!\n\nLearn to build web applications with Node.js, Express, MongoDB and friends. → https://t.co/9G3mIVmxCM https://t.co/0QjhhXTUUx',
    url: 'https://twitter.com/wesbos/status/861575041196195841',
    time: 1494250471000,
  },
  {
    text:
      '🔥 Sticker Packs are now available! $4 mailed anywhere in the world. \n\n141 Packs available → https://t.co/EgWnsSFuAD https://t.co/lZNCTgSFPW',
    url: 'https://twitter.com/wesbos/status/864843707106942976',
    time: 1495029782000,
  },
  {
    text:
      '🔥 Forms and inputs are available via properies on document.forms. You might not need a selector 😃 https://t.co/p4hJT2w5HO',
    url: 'https://twitter.com/wesbos/status/868142797936877569',
    time: 1495816346000,
  },
  {
    text:
      '🔥 You can disable an entire form or groups of inputs by wrapping in a &lt;fieldset&gt; and applying the disabled attr https://t.co/lscCIEtl3o',
    url: 'https://twitter.com/wesbos/status/869595229275516928',
    time: 1496162633000,
  },
  {
    text:
      '🔥 Rename and Destructure properties of a return object with ES6 destructuring https://t.co/ClUG63aBRP',
    url: 'https://twitter.com/wesbos/status/872117517216604160',
    time: 1496763993000,
  },
  {
    text:
      '🔥 Use `git checkout -` to quickly jump back to your last git branch https://t.co/P4v8UfFil5',
    url: 'https://twitter.com/wesbos/status/872521465417039872',
    time: 1496860302000,
  },
  {
    text:
      '🔥 You can destructure anything that returns an array, like when you split a string! https://t.co/rXkKkJArTE',
    url: 'https://twitter.com/wesbos/status/873239299352932352',
    time: 1497031447000,
  },
  {
    text:
      '🔥 Object Spread is coming soon to a JS runtime near you! Handy for creating shallow copies of an object without Object.assign() https://t.co/xq68aj2oC0',
    url: 'https://twitter.com/wesbos/status/874689718235037698',
    time: 1497377254000,
  },
  {
    text:
      '🔥 Super happy to announce Purchasing Power Parity for my courses.\n\nhttps://t.co/L9CLuZu3ej\nhttps://t.co/Q1XhIQrO9e\nhttps://t.co/TKXb11wZJO https://t.co/9pgggYU3u3',
    url: 'https://twitter.com/wesbos/status/875734087977357313',
    time: 1497626251000,
  },
  {
    text:
      '🔥 Flexbox Tip: A dummy element set to flex-grow: 1; will take up any remaining space after sibling elements take up their natual size https://t.co/VfzBBQOD11',
    url: 'https://twitter.com/wesbos/status/877542146752073728',
    time: 1498057326000,
  },
  {
    text:
      '🔥 Episode 1 of the @syntaxfm podcast is now up! All about React tools!  https://t.co/wOYS0tqNlc',
    url: 'https://twitter.com/wesbos/status/882766691742175233',
    time: 1499302954000,
  },
  {
    text:
      "🔥 500 packs of stickers are now up for grabs! $4 shipped anywhere in the world. Get 'em while they last!\n\nhttps://t.co/6Qgj8xu5Hy https://t.co/p3BuRvb3M7",
    url: 'https://twitter.com/wesbos/status/885926990762659840',
    time: 1500056428000,
  },
  {
    text:
      '🔥 Turn on full keyboard access to control dialog boxes with your keyboard. Tab to move, space to select\n\nhttps://t.co/ruDzg3DgRy https://t.co/MnHwq2oJKX',
    url: 'https://twitter.com/wesbos/status/892425984804311040',
    time: 1501605909000,
  },
  {
    text:
      '🔥 The difference between Array.of() and Array.from() https://t.co/mjUDYNkIjb',
    url: 'https://twitter.com/wesbos/status/894919568250089472',
    time: 1502200426000,
  },
  {
    text:
      '🔥 You can use ES6 computed property names in React to make attaching inputs to state a little easier https://t.co/HyukmOCu8M',
    url: 'https://twitter.com/wesbos/status/894976801621061632',
    time: 1502214072000,
  },
  {
    text:
      '🔥 The JavaScript Web Payments API is super simple to use and can be used with any existing payment provider https://t.co/HfEHJAbrV4',
    url: 'https://twitter.com/wesbos/status/905815017819385857',
    time: 1504798104000,
  },
  {
    text:
      '🔥 Cobalt2 for VS Code just got a major update! \n\nhttps://t.co/7bWM8ljVF8 https://t.co/YOLDmUJzRq',
    url: 'https://twitter.com/wesbos/status/907698868929875968',
    time: 1505247249000,
  },
  {
    text:
      '🔥 Use F8 in VS @code to cycle through errors and warnings and display them inline. https://t.co/I7waqcWHRd',
    url: 'https://twitter.com/wesbos/status/908690521408901121',
    time: 1505483677000,
  },
  {
    text:
      '🔥 Get VS Code Emmet working in JSX with this setting:\n\n  "emmet.includeLanguages": { "javascript": "javascriptreact", } https://t.co/z6Te5ggmCU',
    url: 'https://twitter.com/wesbos/status/910525976827875328',
    time: 1505921284000,
  },
  {
    text:
      '🔥 Import Cost package for VS Code will help you understand the impact of a package as you import it https://t.co/bZcqNtldo0',
    url: 'https://twitter.com/wesbos/status/910533597597196290',
    time: 1505923101000,
  },
  {
    text:
      '🔥 JavaScript Fundamentals Video: Reference VS Copy\n\nhttps://t.co/jVCj8VXp0P https://t.co/AMMjjF1L7X',
    url: 'https://twitter.com/wesbos/status/910601672375914501',
    time: 1505939331000,
  },
  {
    text:
      '🔥 Auto Rename Tag for VS Code does, well, exactly what it says. No keyboard shortcut, just rename one tag and the other updates! https://t.co/g1daEtAskq',
    url: 'https://twitter.com/wesbos/status/910917756299677696',
    time: 1506014691000,
  },
  {
    text:
      '🔥 https://t.co/QLDZhSYHnB() returns a Promise which means you can async + await before updating any UI. 💪🏻 @rem https://t.co/2ShoP2bkLC',
    url: 'https://twitter.com/wesbos/status/911233231776870400',
    time: 1506089907000,
  },
  {
    text:
      '🔥 VS @code has a built in diffing tool you can run from the command line with --diff https://t.co/gUEzCa3ucx',
    url: 'https://twitter.com/wesbos/status/912678041184342016',
    time: 1506434376000,
  },
  {
    text:
      '🔥 Announcing the updated https://t.co/TKXb11wZJO. Covers ES2016 and ES2017. Async Await, Babel 7 + More. Totally Free update - Enjoy! https://t.co/RyU7eM3Lcw',
    url: 'https://twitter.com/wesbos/status/912706884225945600',
    time: 1506441253000,
  },
  {
    text:
      '🔥 On a website with an obnoxious and slow slideslow animation? Make it instant by running $.fx.off = true; in your console https://t.co/5upN4W7hEM',
    url: 'https://twitter.com/wesbos/status/913398676101435392',
    time: 1506606189000,
  },
  {
    text:
      '🔥 Node 8.6.0 brings support for Object Spread! Goodbye Object.assign() https://t.co/9w0eLzeyFS',
    url: 'https://twitter.com/wesbos/status/913421431609991168',
    time: 1506611614000,
  },
  {
    text:
      '🔥 Web Dev Sticker Pack #4 now on sale! \n\n17 stickers, $5 shipped to your door.\n\nGrab them now → https://t.co/6Qgj8xu5Hy https://t.co/YoA7Hs7XDu',
    url: 'https://twitter.com/wesbos/status/913842058770644993',
    time: 1506711899000,
  },
  {
    text:
      '🔥 The new IntersectionObserver browser API will allow us to easily detect when elements on fully or partially on screen. https://t.co/Q8SLKwFHJk',
    url: 'https://twitter.com/wesbos/status/915304495902535685',
    time: 1507060572000,
  },
  {
    text:
      '🔥 Async functions can chain a .catch() to catch any errors without a try/catch https://t.co/O3ffEqvHc6',
    url: 'https://twitter.com/wesbos/status/915610241907208192',
    time: 1507133467000,
  },
  {
    text:
      '🔥 ResizeObserver is coming to browsers, which means we can have resize events on a per-element basis. (Element queries anyone?!) https://t.co/tjbiKyeOdl',
    url: 'https://twitter.com/wesbos/status/916313815175847937',
    time: 1507301212000,
  },
  {
    text:
      '🔥CSS Variables and CSS grid have the same browser support so you can use vars to define row/col/gap and update with JS https://t.co/XW7rWQP6A6',
    url: 'https://twitter.com/wesbos/status/924010332250628098',
    time: 1509136205000,
  },
  {
    text:
      '🔥 The next version of VS code will automatically add your import statements as you use functions from your project https://t.co/hk2vwcaoOy',
    url: 'https://twitter.com/wesbos/status/925056339398848512',
    time: 1509385592000,
  },
  {
    text:
      '🔥 Multiple caret trick in VS Code/Sublime/Atom. Did this neat trick in my React course that everyone asks about - enjoy! https://t.co/NSML76Kznx',
    url: 'https://twitter.com/wesbos/status/925365337125806086',
    time: 1509459263000,
  },
  {
    text:
      '🔥 In Emmet,  you can use $@15 to start numbering from any number. https://t.co/XvJIrdQEQe',
    url: 'https://twitter.com/wesbos/status/926098021842083840',
    time: 1509633949000,
  },
  {
    text:
      '🔥 CSS Grid doesn’t do masonry/pinterest layout, but if you pre-define a few consistent sizes, grid-auto-flow: dense; works really well! https://t.co/DqrC0ZOFZh',
    url: 'https://twitter.com/wesbos/status/926119942197522433',
    time: 1509639175000,
  },
  {
    text:
      '🔥 Text Pastry is a super handy plugin for inserting incremental numbers at each cursor. Available for VS Code, Sublime and Atom. https://t.co/BYqrpZe9ow',
    url: 'https://twitter.com/wesbos/status/926484635437228038',
    time: 1509726124000,
  },
  {
    text:
      '🔥 Since :before and :after are first class CSS Grid items, this “lines on either side” design can easily be accomplished in ~10 lines of CSS https://t.co/LWHNhOuUi2',
    url: 'https://twitter.com/wesbos/status/926541587060051968',
    time: 1509739703000,
  },
  {
    text:
      '🔥 Today’s VS Code update now shows git status in the file explorer sidebar! https://t.co/jvvLY6SWzh',
    url: 'https://twitter.com/wesbos/status/928648856614686720',
    time: 1510242115000,
  },
  {
    text:
      '🔥 VS @code just launched Live Share, which means you can do pair programming and code sharing right from your editor! \n\nhttps://t.co/xteYN0i9Yq',
    url: 'https://twitter.com/wesbos/status/930821225483505665',
    time: 1510760048000,
  },
  {
    text:
      '🔥 You can set and use variables inside a CSS declaration. Handy for when you need the same value more than once! https://t.co/tjLV3h7Z8I',
    url: 'https://twitter.com/wesbos/status/931254785390665730',
    time: 1510863417000,
  },
  {
    text:
      '🔥 Use CSS object-fit: contain; and  object-fit: cover; to scale 100% width and 100% height images as large as they will go without messing up aspect ratios. \n\nWorks with &lt;video&gt; in most browsers except IE+Edge https://t.co/lfbmEv7sdA',
    url: 'https://twitter.com/wesbos/status/933073819891326977',
    time: 1511297108000,
  },
  {
    text:
      '🔥 With CSS variables, you can overwrite values when authoring HTML with an inline style attribute https://t.co/XF3uJHWhwq',
    url: 'https://twitter.com/wesbos/status/938068654142447617',
    time: 1512487970000,
  },
  {
    text:
      '🔥 VS Code now has a shrinking tabs option - no more scrolling for your tabs! \n\n"workbench.editor.tabSizing": "shrink" https://t.co/pA31bbNAdu',
    url: 'https://twitter.com/wesbos/status/941685568982933505',
    time: 1513350309000,
  },
  {
    text:
      '🔥 CSS Variables are perfect for overwriting parts of a definition that can’t be broken up like text-shadows, transforms or gradients https://t.co/6vKDLNgg1T',
    url: 'https://twitter.com/wesbos/status/942782508722278400',
    time: 1513611840000,
  },
  {
    text:
      '🔥 My 15 minute talk on Async + Await is up! Watch it on your lunch → \n\nhttps://t.co/TYJAOt2FOF https://t.co/9ZZgYLkixR',
    url: 'https://twitter.com/wesbos/status/943178612433354752',
    time: 1513706279000,
  },
  {
    text:
      '🔥 Use curly brackets in the command line to cut down on typing the same thing over and over https://t.co/UUo97DOytM',
    url: 'https://twitter.com/wesbos/status/952984066093182976',
    time: 1516044081000,
  },
  {
    text:
      '🔥 @jensimmons just launched a new YouTube channel called Layout Land - first video is on CSS Grid! Make sure you subscribe! \n\nhttps://t.co/Eef8UmhTmv',
    url: 'https://twitter.com/wesbos/status/953708797754793986',
    time: 1516216871000,
  },
  {
    text:
      '🔥 Announcing my latest course on CSS Grid!\n\nFrom CSS Grid fundamentals to real world layouts in 25 videos / 4 hours.  \n\nTotally free — Enjoy! → https://t.co/IZeR4gDyCz https://t.co/MF8MpLbcgz',
    url: 'https://twitter.com/wesbos/status/954003239053258752',
    time: 1516287071000,
  },
  {
    text:
      '🔥 4 Ways to handle the double promise with fetch() and async+await https://t.co/847TQDMJAG',
    url: 'https://twitter.com/wesbos/status/955831817118146560',
    time: 1516723038000,
  },
  {
    text:
      '🔥 If you have a noisy console or network tab, you can usually filter those things out https://t.co/FGoWxt1bHC',
    url: 'https://twitter.com/wesbos/status/959086079847649280',
    time: 1517498915000,
  },
  {
    text:
      '🔥 CSS Grid and Flexbox require a direct parent child relationship to work. With React 16.2 we can use &lt;Fragment&gt;&lt;/Fragment&gt; to return top level siblings from a Component. No more returning wrapper divs! https://t.co/AjI1vBxSbs',
    url: 'https://twitter.com/wesbos/status/959094704905314304',
    time: 1517500971000,
  },
  {
    text:
      "🔥 Quit find-and-replacing in your code! VS Code's Rename Symbol is the best way to mass-rename things things like classes, variables and selectors. https://t.co/N5Tj1cZmNU",
    url: 'https://twitter.com/wesbos/status/961640939612721154',
    time: 1518108041000,
  },
  {
    text:
      '🔥 Use console.dir() to see the properties of an element when console.log() gives you a DOM element https://t.co/m6O1jcnlTr',
    url: 'https://twitter.com/wesbos/status/962067758816018432',
    time: 1518209802000,
  },
  {
    text:
      '🔥 .toLocaleString() is a great way to format currency https://t.co/cChSSdWCH9',
    url: 'https://twitter.com/wesbos/status/966697179904651264',
    time: 1519313542000,
  },
  {
    text:
      '🔥 Here is a quick video I put together detailing React’s new Context API, why it’s useful and when you might want to use it. Enjoy! \n\nhttps://t.co/DLbLUnlyyR',
    url: 'https://twitter.com/wesbos/status/973577358568501248',
    time: 1520953905000,
  },
  {
    text:
      '🔥 We have 20 Easy Win Performance Tips over on the @syntaxfm podcast this week. \n\nhttps://t.co/PoaYptCRPr',
    url: 'https://twitter.com/wesbos/status/976465411733704704',
    time: 1521642470000,
  },
  {
    text:
      "🔥 Quick Video: Heres how JavaScript's Nested Object Destructuring works\n\nhttps://t.co/Xb1nkQ9kGU",
    url: 'https://twitter.com/wesbos/status/976833257001152513',
    time: 1521730171000,
  },
  {
    text:
      '🔥 If you are trying to align oddly sized images, set a hard width + height and then use object-fit: cover; to remove any distortion\n\n  img {\n    width: 200px;\n    height: 200px;\n    object-fit: cover;\n  } https://t.co/hYXbP9xjbP',
    url: 'https://twitter.com/wesbos/status/977223833206829056',
    time: 1521823292000,
  },
  {
    text:
      '🔥 The Array .some() Method is super handy for checking if at least one item in an array meets what you are looking for https://t.co/TuqrPYpUBY',
    url: 'https://twitter.com/wesbos/status/981264253226242050',
    time: 1522786603000,
  },
  {
    text:
      '🔥 Cobalt2 for Hyper just got an update! \n\nInstructions to install: https://t.co/NaQakLXdO6\n\nMy .hyper.js file: https://t.co/7PkJtCd5JE https://t.co/7cBLeFlILs',
    url: 'https://twitter.com/wesbos/status/981601623368708096',
    time: 1522867038000,
  },
  {
    text:
      '🔥 Poor (wo)man’s object search - stringify the object and use String.includes to filter the array https://t.co/NvmMApOZ8v',
    url: 'https://twitter.com/wesbos/status/983451187994296322',
    time: 1523308009000,
  },
  {
    text:
      '🔥 The new Async clipboard API is so much simpler than the previous range select/document.execCommand() solutions. \n\nIt must be on a secure origin (https or localhost) and be tied to a real click\n\nMore info: https://t.co/9q0busZ6jr https://t.co/IlBFDciIun',
    url: 'https://twitter.com/wesbos/status/983708457852383234',
    time: 1523369347000,
  },
  {
    text:
      '🔥 You can stack CSS transforms of the same type if you are mixing units https://t.co/R1ICpBam7O',
    url: 'https://twitter.com/wesbos/status/984500364245389312',
    time: 1523558152000,
  },
  {
    text:
      '🔥 Logos not lining up? Set a hard width + height, then use object-fit: contain; to un-stretch, perfectly center, and ensure nothing is cut off https://t.co/O0Ce86GypN',
    url: 'https://twitter.com/wesbos/status/984518710730940416',
    time: 1523562526000,
  },
  {
    text:
      '🔥 iTunes opening when you hit the play button and Spotify isn’t open? \n\nRename the executable inside the package contents → https://t.co/DvO0NzfpMk',
    url: 'https://twitter.com/wesbos/status/986957651169988608',
    time: 1524144015000,
  },
  {
    text:
      '🔥 Object Spread is really handy for overriding defaults https://t.co/a5o5fLHMNP',
    url: 'https://twitter.com/wesbos/status/991323285555171328',
    time: 1525184863000,
  },
  {
    text:
      '🔥 Array.from() takes a secondary map argument. Handy for creating and populating arrays of a specific length https://t.co/qVNshLFHyf',
    url: 'https://twitter.com/wesbos/status/993883756162404354',
    time: 1525795327000,
  },
  {
    text:
      '🔥 Slater your git add and git commit into a single command:\n\nIn your terminal, run :\n\ngit config --global https://t.co/I8OoxZt0lz \'!git add -A &amp;&amp; git commit -m\'\n\nThen just `git ac "commit message"`',
    url: 'https://twitter.com/wesbos/status/996064066857824258',
    time: 1526315154000,
  },
  {
    text:
      '🔥 All CSS background properties can take multiple values - helpful for layering colours, gradients and textures https://t.co/kfiTpekvag',
    url: 'https://twitter.com/wesbos/status/996100358853287943',
    time: 1526323806000,
  },
  {
    text:
      "🔥 You can overwrite VS @code theme settings on a project-by-project basis. I'm using this to differentiate between backend and frontend codebases in my next tutorial. Command Palette → Open Workspace Settings https://t.co/AXuJj2KzrI",
    url: 'https://twitter.com/wesbos/status/998993638578376709',
    time: 1527013618000,
  },
  {
    text:
      '🔥 VS Code Better Comments gives you a few different styles of comments based on popular notations. Love love love this - thanks to @stolinski for showing me this. \n\nhttps://t.co/S371BdF2ay https://t.co/bGpaY8U34B',
    url: 'https://twitter.com/wesbos/status/1001164727987458048',
    time: 1527531246000,
  },
  {
    text:
      '🔥 Create a zip of all changed files  and their folders\n\ngit archive -o https://t.co/9KIgls1hVR HEAD $(git diff --name-only HEAD)\n\nI’m using this to generate the what-changed-in-this-video “Stepped Solutions” in my courses',
    url: 'https://twitter.com/wesbos/status/1009487882690711552',
    time: 1529515641000,
  },
  {
    text:
      '🔥 Big News: Starting next week we’re starting to publish @syntaxfm twice a week! One “Hasty Treat” (~20m) on Monday and one Regular Length (~60m) on Wednesday!',
    url: 'https://twitter.com/wesbos/status/1012427814266703873',
    time: 1530216575000,
  },
  {
    text: '🔥 https://t.co/TnvqoIT9Wa',
    url: 'https://twitter.com/wesbos/status/1014686082741354496',
    time: 1530754988000,
  },
  {
    text:
      '🔥 Style tags can be visible and editable. Kind of like codepen but not as good.\n\n&lt;style contenteditable style="display: block; white-space: pre;"&gt; https://t.co/39IKr8YbUq',
    url: 'https://twitter.com/wesbos/status/1019258311097675776',
    time: 1531845092000,
  },
  {
    text:
      '🔥 Did you know CSS has a `turn` unit? It’s often easier to turn something `rotate(0.75turn)` instead of doing the math to `rotate(270deg)`',
    url: 'https://twitter.com/wesbos/status/1031644788095942658',
    time: 1534798259000,
  },
  {
    text:
      '🔥 git add --intent-to-add will track a file without adding any of it’s contents. This is helpful if you use git add -p to review changes before adding them https://t.co/PVVUVtOH20',
    url: 'https://twitter.com/wesbos/status/1031910426643185664',
    time: 1534861592000,
  },
  {
    text:
      '🔥 CSS Grid in 45 minutes. A video of my talk at Laracon is now live! \n\nhttps://t.co/z3ShTtajvN',
    url: 'https://twitter.com/wesbos/status/1032620549325897728',
    time: 1535030898000,
  },
  {
    text:
      '🔥 Quick 6-min code along this morning on YouTube using dev tools and some JS to help me find a part for my car\n\nhttps://t.co/SzKg25SSTu',
    url: 'https://twitter.com/wesbos/status/1038061198363779072',
    time: 1536328050000,
  },
  {
    text:
      '🔥 If you are trying to debug something in the middle of chaining array methods, just map over it, console.log, and return it. \n\nSince console.log returns nothing, it will just pass the entire array through. \n\nYou can even make a handle little debug function 🐛 https://t.co/HCtLh4QYm6',
    url: 'https://twitter.com/wesbos/status/1042075437852241922',
    time: 1537285119000,
  },
  {
    text:
      '🔥 Firefox fonts tab will show you if a font used is a webfont or a system font. Handy when you aren’t sure if web fonts are working, or falling back to system. https://t.co/ZkkHBKVcTI',
    url: 'https://twitter.com/wesbos/status/1047499659613282304',
    time: 1538578355000,
  },
  {
    text:
      '🔥 Announcing Advanced React &amp; GraphQL! Come and learn to build a fullstack JavaScript online store with me → https://t.co/sgSyOm5BCP https://t.co/haPqZhLVsy',
    url: 'https://twitter.com/wesbos/status/1050379243975262209',
    time: 1539264901000,
  },
  {
    text:
      '🔥 shortcut @@ to your email address on your phone https://t.co/UCwbIMkfkh',
    url: 'https://twitter.com/wesbos/status/1055437075426787329',
    time: 1540470782000,
  },
  {
    text:
      '🔥 Making a copy of an object and need everything but a property? Use JavaScript destructuring to pull that prop out and then use a ...rest to collect the rest! https://t.co/lOozg9WmUa',
    url: 'https://twitter.com/wesbos/status/1055821581086277632',
    time: 1540562455000,
  },
  {
    text:
      '🔥 use your webcam to keep an eye on kiddos in your office https://t.co/Uf8g6LD8zN https://t.co/FEV4WpYnQh',
    url: 'https://twitter.com/wesbos/status/1060262155637977088',
    time: 1541621171000,
  },
  {
    text: '🔥 The React Hooks @syntaxfm episode is up! https://t.co/O7njHImnku',
    url: 'https://twitter.com/wesbos/status/1062722568975736832',
    time: 1542207779000,
  },
  {
    text:
      '🔥 If the Fetch API seems a little cumbersome and you don’t want to reach for Axios, you can always make a handy little function that applies your defaults (assumes JSON) and can be overwritten if needed https://t.co/y2Tyuldtf7',
    url: 'https://twitter.com/wesbos/status/1063515277911052290',
    time: 1542396776000,
  },
  {
    text:
      '🔥 If you are trying to add/remove multiple classes from an element, an array spread is the perfect use case here since classList.remove() requires multiple arguments.\n\nInstead of it passing in 1 array arg, it passes each item of the array as a separate argument https://t.co/Hb77N2evAe',
    url: 'https://twitter.com/wesbos/status/1064538500408795136',
    time: 1542640731000,
  },
  {
    text:
      '🔥 My obnoxiously early Black Friday sale is now on! 50% all courses! \n\n- https://t.co/Q1XhIQrO9e\n- https://t.co/qYA0ab8zIJ\n- https://t.co/L9CLuZu3ej\n- https://t.co/f6WtqXuzhO \n\nEnjoy!',
    url: 'https://twitter.com/wesbos/status/1064891564588187649',
    time: 1542724908000,
  },
  {
    text:
      '🔥 Nice little trick adapted from @Fotiman after the most recent @syntaxfm \n\nGet an array of all month/day names using .toLocaleDateString() https://t.co/B5lGgnuhMy',
    url: 'https://twitter.com/wesbos/status/1067534197903056901',
    time: 1543354961000,
  },
  {
    text:
      '🔥 Intersection Observer is handy for when you need to disable a UI until something has been shown on screen. In this case we can check if the last element of a terms and conditions has been totally shown before enabling the accept button. code in followup tweet 👇🏻 https://t.co/x6ABJZJaQ4',
    url: 'https://twitter.com/wesbos/status/1074754463087411200',
    time: 1545076406000,
  },
  {
    text:
      '🔥 Canvas tip I just learned from @jake_albaugh. You can paint to a really small canvas to get quick+cheap colour processing and you can visualize it with canvas { image-rendering: pixelated; } 🤯 This is a 35x35 canvas https://t.co/eaC2CqdEin',
    url: 'https://twitter.com/wesbos/status/1085225517320675334',
    time: 1547572900000,
  },
  {
    text:
      "🔥 Use `npm init --yes` to skip all the questions and create a package.json\n\n(I'll still just lean on the enter button until it's done, but enjoy the tip 😃)",
    url: 'https://twitter.com/wesbos/status/1085916409190891521',
    time: 1547737621000,
  },
  {
    text:
      '🔥 When using JavaScript default function params, you can access other params from right inside the definition! https://t.co/aSA5m6E3hy',
    url: 'https://twitter.com/wesbos/status/1090624545990590465',
    time: 1548860129000,
  },
  {
    text:
      '🔥 CSS variables can be set to other CSS variables. Also we will soon be able to tweak colours with colour functions in CSS directly. \n\nGood for Canadians who can never remember which way to spell grey https://t.co/oqn74uDF4g',
    url: 'https://twitter.com/wesbos/status/1092829160408600578',
    time: 1549385750000,
  },
  {
    text: '🔥 JavaScript functions visualized https://t.co/pxWq34PGDu',
    url: 'https://twitter.com/wesbos/status/1105907924088565762',
    time: 1552503970000,
  },
  {
    text:
      '🔥 If you are in a react component where you destructure a prop and find yourself needing to see what other props are available, use an ...Object Rest to collect the rest of the props in a single object https://t.co/0M0Cju55Ze',
    url: 'https://twitter.com/wesbos/status/1113156698556989441',
    time: 1554232213000,
  },
  {
    text:
      '🔥Just learned about Intl.ListFormat from @mathias.\n\nhttps://t.co/RjWabIXu4y https://t.co/wWVgF2VIAw',
    url: 'https://twitter.com/wesbos/status/1125850362332819456',
    time: 1557258618000,
  },
  {
    text:
      '🔥 Victor Mono: a new programming font with italics and ligatures. \n\nFree install, donation encouraged.   Pretty neat →  https://t.co/pqvfQj4whA https://t.co/NjWhTerejI',
    url: 'https://twitter.com/wesbos/status/1142152484485550081',
    time: 1561145347000,
  },
  {
    text:
      '🔥 Lane Change is an open source React Native app for reporting blocked bike lanes and sidewalks that is being used in my city. Check it out - simple enough that you can learn a thing or two about React native. Nice job @timcarrphoto \n\nhttps://t.co/pGI3CYCViB https://t.co/ulXkRzQAVV',
    url: 'https://twitter.com/wesbos/status/1143534367043706880',
    time: 1561474813000,
  },
  {
    text: '🔥 https://t.co/LV0fObPCGv',
    url: 'https://twitter.com/wesbos/status/1163254532459126787',
    time: 1566176467000,
  },
  {
    text: '🔥 https://t.co/EXnNBZvV5l https://t.co/YkQ6XmCGUb',
    url: 'https://twitter.com/wesbos/status/1167245151212847105',
    time: 1567127905000,
  },
  {
    text:
      '🔥 Where is this repo on github? Find the corresponding git{hub,lab} repo to a folder with `git remote -v` https://t.co/BnStnhErPJ',
    url: 'https://twitter.com/wesbos/status/1169638838509211653',
    time: 1567698604000,
  },
  {
    text:
      '🔥 Close multiple tabs in Firefox and Chrome by holding down Shift to select them, and then ⌘+W to close https://t.co/0EvAkPIU7Q',
    url: 'https://twitter.com/wesbos/status/1169645345086812161',
    time: 1567700155000,
  },
  {
    text:
      '🔥 If you have a pesky 301 redirect that won\'t clear, open dev tools and load the page with the "disable cache" \n\nLog this in your head for later, you\'ll need it like I just did 😃 https://t.co/qysaE4W2V9',
    url: 'https://twitter.com/wesbos/status/1179023596854874117',
    time: 1569936105000,
  },
  {
    text:
      '🔥 Use CSS Variables to do partial property overwrites. Handy for CSS properties that only accept multiple values. https://t.co/qMCHItRrio',
    url: 'https://twitter.com/wesbos/status/1179411093208358912',
    time: 1570028491000,
  },
  {
    text:
      '🔥 Object.fromEntries() is a new method for converting Arrays, maps or other iterables into objects https://t.co/5pVwsekAsw',
    url: 'https://twitter.com/wesbos/status/1181584047144878080',
    time: 1570546564000,
  },
  {
    text:
      '🔥 Use Intl.RelativeTimeFormat() to get nicely formatted relative time strings. https://t.co/1P6mVtwxhk',
    url: 'https://twitter.com/wesbos/status/1184893536707207168',
    time: 1571335608000,
  },
  {
    text:
      '🔥 Use Intl.DateTimeFormat() to create nicely formatted date and time strings https://t.co/fFY0jT54c2',
    url: 'https://twitter.com/wesbos/status/1185263826029174784',
    time: 1571423891000,
  },
  {
    text:
      '🔥 Use Intl.PluralRules() to easily find the ordinal for numbers - 1st, 2nd, 3rd, 4th... https://t.co/RSZKXKtSd0',
    url: 'https://twitter.com/wesbos/status/1186283045722230784',
    time: 1571666892000,
  },
  {
    text:
      '🔥 When working with an API, I often need to chunk up a list of users and send them in batches.\n\nArray.from() is a great way to chunk up arrays because of the secondary argument being a map function. https://t.co/nco5b6VFpp',
    url: 'https://twitter.com/wesbos/status/1186381082557591554',
    time: 1571690266000,
  },
  {
    text:
      '🔥 New in ES2019, we have a .flat() method to flatten these types of chunked arrays. https://t.co/i8A33FmArz',
    url: 'https://twitter.com/wesbos/status/1186677921894805505',
    time: 1571761038000,
  },
  {
    text:
      '🔥 Use Intl.Collator() to easily sort or group strings regardless of their case or accent https://t.co/MblsezQxGb',
    url: 'https://twitter.com/wesbos/status/1187398373990637569',
    time: 1571932807000,
  },
  {
    text:
      '🔥 Here is a neat one! Since arrays are objects, we can destructure their indexes to easily grab the first and last items. https://t.co/nfeGmFBcCr',
    url: 'https://twitter.com/wesbos/status/1187745700320337920',
    time: 1572015616000,
  },
];
export default tips;
