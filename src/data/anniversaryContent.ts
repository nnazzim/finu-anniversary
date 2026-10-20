/**
 * =======================================================================
 *  FINU ❤️ — OUR STORY, OUR FOREVER (CENTRAL PERSONALIZATION FILE)
 * =======================================================================
 * 
 * Hi Nasim (Kaakooka)!
 * Everything on your anniversary website can be customized right here.
 * You can edit texts, love letters, quiz questions, memories, dates,
 * and photo paths without touching any component code.
 * 
 * Simply update any field below and save this file!
 */

export interface MemoryItem {
  id: number;
  image: string;
  caption: string;
  date?: string;
  aspect?: 'square' | 'portrait' | 'landscape';
}

export interface TimelineChapter {
  id: number;
  chapterNumber: number;
  title: string;
  date?: string;
  description: string;
  image?: string;
  tag?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    response: string;
  }[];
}

export interface LoveReason {
  id: number;
  iconName: string;
  title: string;
  description?: string;
}

export const anniversaryContent = {
  // ---------------------------------------------------------------------
  // 1. CORE PERSONAL DETAILS
  // ---------------------------------------------------------------------
  couples: {
    hisName: "Mohammed Nasim",
    hisNickname: "Kaakooka",
    herName: "Hafna Sherin",
    herNickname: "Finu",
    proposalGrade: "2nd Standard",
    acceptanceGrade: "8th Standard",
    acceptanceDate: "21 October 2019",
    anniversaryDate: "21 October 2026",
    anniversaryMilestone: "7th Love Anniversary",
    yearsCount: 7,
  },

  // ---------------------------------------------------------------------
  // 2. OPENING SURPRISE SCREEN
  // ---------------------------------------------------------------------
  opening: {
    greeting: "Hey, Finu... ❤️",
    teaser: "I have a little something for my favorite girl.",
    pauseNoteLine1: "Before you open this, remember one thing...",
    pauseNoteLine2: "I made every little part of this with you in my heart.",
    buttonText: "Open Your Surprise, Finu 💌",
  },

  // ---------------------------------------------------------------------
  // 3. MAIN HERO SECTION
  // ---------------------------------------------------------------------
  hero: {
    badge: "Happy 7th Love Anniversary!",
    mainHeading: "Hafna Sherin ❤️",
    subheading: "My Finu. My favorite person. My forever story.",
    dateRange: "21 October 2019 — 21 October 2026",
    emotionalLine:
      "From a little boy who proposed in 2nd standard to your Kaakooka today... my heart still chooses you.",
    ctaButton: "Take Me Through Our Story ↓",
    stats: [
      { label: "Years of Saying Yes", value: "7 Years" },
      { label: "Since Childhood Proposal", value: "Since 2nd Std" },
      { label: "Times Heart Chose You", value: "Every Single Day" },
    ],
  },

  // ---------------------------------------------------------------------
  // 4. OUR UNBELIEVABLE BEGINNING — 2ND STANDARD
  // ---------------------------------------------------------------------
  beginning: {
    tag: "Where It All Began • Innocent & Pure",
    heading: "Can You Believe Where It All Started? 🥹",
    paragraphs: [
      "Once upon a time, there was a little boy in 2nd standard who somehow found the courage to propose to a girl who would one day become his whole world.",
      "Maybe we were too young to understand what forever meant back then. But look at us now... a little childhood story became one of the most precious chapters of my life.",
    ],
    highlightLine: "I was just a little boy when I chose you, Finu. ❤️",
    noteDoodle: "Written with a school pencil, sealed in my heart forever.",
    photoPlaceholderTitle: "Our Little Childhood Story 📸",
    photoPlaceholderSub: "A sweet memory from our school days",
  },

  // ---------------------------------------------------------------------
  // 5. THE DAY FINU SAID YES — 21 OCTOBER 2019
  // ---------------------------------------------------------------------
  theYesDay: {
    tag: "The Milestone That Changed Everything",
    heading: "AND THEN... YOU SAID YES. ❤️",
    date: "21 OCTOBER 2019",
    gradeBadge: "8th Standard",
    descriptionLines: [
      "8th standard. October 21st, 2019.",
      "The day you accepted my love.",
      "I don't know if the little boy I was could have imagined how much this date would mean to the man I am becoming. But I know this: that day became a memory I will always carry in my heart.",
    ],
    milestoneCard:
      "One little question. One beautiful YES. A story that is still being written.",
    photoPlaceholderTitle: "The Day Our Story Became Ours ❤️",
  },

  // ---------------------------------------------------------------------
  // 6. SEVEN CHAPTERS OF OUR LOVE (VERTICAL TIMELINE)
  // ---------------------------------------------------------------------
  chapters: [
    {
      id: 1,
      chapterNumber: 1,
      title: "The Little Boy Who Chose You",
      date: "2nd Standard",
      description:
        "Before I knew what life was about, my innocent little heart somehow knew it wanted you. A proposal that felt so simple back then, yet became the sweetest foundation of our destiny.",
      image: "/images/memory-01.jpg",
      tag: "Childhood Innocence",
    },
    {
      id: 2,
      chapterNumber: 2,
      title: "The Day Finu Said Yes",
      date: "21 October 2019",
      description:
        "8th standard. The world stopped, time stood still, and my heart found its home. The moment you smiled and said yes will forever be etched in golden letters.",
      image: "/images/memory-02.jpg",
      tag: "The Turning Point",
    },
    {
      id: 3,
      chapterNumber: 3,
      title: "Learning What Love Means",
      date: "Growing Years",
      description:
        "Love wasn't just sweet words; it was understanding each other, waiting for each other, and discovering how two different people can fit together so naturally. [ADD YOUR MEMORY HERE]",
      image: "/images/memory-03.jpg",
      tag: "Sweet Lessons",
    },
    {
      id: 4,
      chapterNumber: 4,
      title: "Growing Up, Growing Closer",
      date: "Through Every Season",
      description:
        "Classrooms changed, years flew by, exams, life shifts, and growing responsibilities... but every step forward brought us closer together. [ADD YOUR MEMORY HERE]",
      image: "/images/memory-04.jpg",
      tag: "Steadfast Love",
    },
    {
      id: 5,
      chapterNumber: 5,
      title: "Memories That Became Ours",
      date: "Unforgettable Days",
      description:
        "The shared smiles, the stolen glances, the quiet conversations, and the inside jokes that only you and your Kaakooka understand. [ADD YOUR MEMORY HERE]",
      image: "/images/memory-05.jpg",
      tag: "Our Secret Vault",
    },
    {
      id: 6,
      chapterNumber: 6,
      title: "Seven Years of Choosing You",
      date: "2019 — 2026",
      description:
        "Seven full years since you said yes. 2,557 days of being grateful that Hafna Sherin is in my life. Every morning I wake up glad that my heart chose you.",
      image: "/images/memory-06.jpg",
      tag: "Seven Golden Years",
    },
    {
      id: 7,
      chapterNumber: 7,
      title: "Our Story Is Still Going",
      date: "Today & Forever",
      description:
        "This isn't just an anniversary milestone — it's just the beginning of the rest of our lives. Hand in hand, dream by dream, your Kaakooka will always be by your side.",
      image: "/images/memory-07.jpg",
      tag: "Forever & Always",
    },
  ] as TimelineChapter[],

  // ---------------------------------------------------------------------
  // 7. FINU'S MEMORY GALLERY (12 EDITABLE SLOTS)
  // ---------------------------------------------------------------------
  galleryHeading: "Little Moments. Big Memories. My Favorite Person.",
  gallerySubtitle:
    "Every photograph holds a heartbeat. Here are twelve glimpses into the beautiful story of us.",
  gallery: [
    {
      id: 1,
      image: "/images/memory-01.jpg",
      caption: "Where our hearts learned to beat together ❤️",
      date: "Chapter 1",
      aspect: "portrait",
    },
    {
      id: 2,
      image: "/images/memory-02.jpg",
      caption: "21 October 2019 — The sweetest YES in history",
      date: "21 Oct 2019",
      aspect: "square",
    },
    {
      id: 3,
      image: "/images/memory-03.jpg",
      caption: "That smile of yours that always melts my worries away",
      date: "Sweet Days",
      aspect: "portrait",
    },
    {
      id: 4,
      image: "/images/memory-04.jpg",
      caption: "Just two kids holding onto a forever promise",
      date: "Memories",
      aspect: "landscape",
    },
    {
      id: 5,
      image: "/images/memory-05.jpg",
      caption: "My favorite sight in the whole world: my Finu",
      date: "Golden Hour",
      aspect: "portrait",
    },
    {
      id: 6,
      image: "/images/memory-06.jpg",
      caption: "Every little walk, every little talk, everything with you",
      date: "Cherished",
      aspect: "square",
    },
    {
      id: 7,
      image: "/images/memory-07.jpg",
      caption: "Because your laughter is my favorite melody",
      date: "Joyful Moments",
      aspect: "portrait",
    },
    {
      id: 8,
      image: "/images/memory-08.jpg",
      caption: "Seven years of inside jokes and secret smiles",
      date: "Our World",
      aspect: "landscape",
    },
    {
      id: 9,
      image: "/images/memory-09.jpg",
      caption: "The girl who holds the key to your Kaakooka's heart",
      date: "Special",
      aspect: "portrait",
    },
    {
      id: 10,
      image: "/images/memory-10.jpg",
      caption: "Quiet afternoons when just thinking of you brings peace",
      date: "Serenity",
      aspect: "square",
    },
    {
      id: 11,
      image: "/images/memory-11.jpg",
      caption: "Growing up together, one beautiful memory at a time",
      date: "Together",
      aspect: "portrait",
    },
    {
      id: 12,
      image: "/images/memory-12.jpg",
      caption: "To a lifetime of more memories with you, Finu ❤️",
      date: "Forever & Ever",
      aspect: "landscape",
    },
  ] as MemoryItem[],

  // ---------------------------------------------------------------------
  // 8. A LETTER FROM YOUR KAAKOOKA 💌
  // ---------------------------------------------------------------------
  letter: {
    envelopeTeaser: "Finu, there are things my heart wants to tell you...",
    envelopeButton: "Open Kaakooka's Letter 💌",
    salutation: "My dearest Finu,",
    paragraphs: [
      "Do you ever think about how our story began?",
      "I was in 2nd standard when I proposed to you. Just a little boy with a little heart, somehow finding the courage to tell you how I felt.",
      "And then came October 21, 2019. I was in 8th standard, and you accepted my love.",
      "Finu, if someone had told that little boy how important this story would become to him, I wonder if he would have believed it.",
      "Today, I am Mohammed Nasim. But to you, I am your Kaakooka. And no matter how much time passes, there is something so special about being that person in your life.",
      "Seven years since you said yes. Seven years since that date became a part of our story.",
      "I cannot promise that every day will be perfect. But I want to keep learning, growing, laughing, and making beautiful memories with you.",
      "I want to keep choosing you, not just on anniversaries, but in the little moments that make up an ordinary day.",
      "Thank you for being my Finu.",
      "If I could go back to that little boy in 2nd standard, I would tell him this: 'One day, the girl you are brave enough to love will become one of the most precious parts of your story. Keep that love honest. Keep your heart kind.'",
      "And if life gave me the chance to begin all over again, I would still want to find you.",
      "Happy 7th Love Anniversary, Hafna Sherin.",
      "From that little boy who proposed to you, to your Kaakooka today...",
      "My heart still chooses you. ❤️",
    ],
    closing: "With all my love,\nYour Kaakooka,\nMohammed Nasim ❤️",
  },

  // ---------------------------------------------------------------------
  // 9. WHY I LOVE MY FINU ❤️ (7 CARDS)
  // ---------------------------------------------------------------------
  whyILoveFinu: {
    heading: "Do You Know How Special You Are to Me?",
    subheading: "A few of the million reasons why my heart will always belong to you.",
    reasons: [
      {
        id: 1,
        iconName: "Heart",
        title: "Because you are my Finu. ❤️",
        description: "No one else in this universe could ever take your place in my soul.",
      },
      {
        id: 2,
        iconName: "Sparkles",
        title: "Because our story began when we were so little.",
        description: "A pure childhood spark that grew into our greatest adventure.",
      },
      {
        id: 3,
        iconName: "CalendarHeart",
        title: "Because October 21, 2019 will always mean something special to me.",
        description: "The calendar date that turned my childhood dream into reality.",
      },
      {
        id: 4,
        iconName: "Smile",
        title: "Because you are the girl who said yes to that little boy.",
        description: "You believed in us when we were still kids, and made me the happiest guy.",
      },
      {
        id: 5,
        iconName: "Crown",
        title: "Because being your Kaakooka is a part of our story that I treasure.",
        description: "That name holds all the tenderness, warmth, and care I feel for you.",
      },
      {
        id: 6,
        iconName: "Compass",
        title: "Because I still want to create new memories with you.",
        description: "Every tomorrow looks brighter just knowing you will be in it.",
      },
      {
        id: 7,
        iconName: "Infinity",
        title: "Because after all this time, you are still my favorite person.",
        description: "Yesterday, today, tomorrow, and forever — always my Finu.",
      },
    ] as LoveReason[],
  },

  // ---------------------------------------------------------------------
  // 10. A CUTE LOVE QUIZ 🎀
  // ---------------------------------------------------------------------
  quiz: {
    badge: "Just For My Finu 🎀",
    heading: "A Cute Little Love Quiz",
    subheading: "Let's see if my Finu remembers our sweetest milestones!",
    finalVerdict: "Correct answer to everything: MY FINU. ❤️",
    questions: [
      {
        id: 1,
        question: "Finu, do you remember when your Kaakooka first proposed?",
        options: [
          {
            text: "2nd standard ❤️",
            isCorrect: true,
            response:
              "Spot on, my Finu! 🥹 Yes, 2nd standard! Just a tiny boy with giant courage who already knew who had his heart.",
          },
          {
            text: "8th standard",
            isCorrect: false,
            response:
              "Hehe, almost! 8th standard was when you said YES! But your Kaakooka was already head over heels proposing way back in 2nd standard! ❤️",
          },
          {
            text: "You are testing me 😂",
            isCorrect: false,
            response:
              "Haha, no test! Just reminding you that your Kaakooka fell for you in 2nd standard, you cutie! 🥹❤️",
          },
        ],
      },
      {
        id: 2,
        question: "When did my Finu say yes?",
        options: [
          {
            text: "21 October 2019 ❤️",
            isCorrect: true,
            response:
              "Yesss! 21 October 2019! 8th standard — the most beautiful date on your Kaakooka's calendar forever! 🌹✨",
          },
          {
            text: "On a random day",
            isCorrect: false,
            response:
              "Aww, not just any random day! It was 21 October 2019 in 8th standard — the day my world lit up! ❤️",
          },
          {
            text: "My memory needs a hug 😂",
            isCorrect: false,
            response:
              "Sending you 1,000 hugs right now! 🤗 The date was 21 October 2019, the happiest day of my 8th standard life!",
          },
        ],
      },
      {
        id: 3,
        question: "Who is your Kaakooka's favorite girl?",
        options: [
          {
            text: "Hafna Sherin ❤️",
            isCorrect: true,
            response:
              "Always and forever! My one and only Hafna Sherin! 🥰",
          },
          {
            text: "My Finu 🎀",
            isCorrect: true,
            response:
              "My dearest Finu, always my sweetest nickname for you! 💖",
          },
          {
            text: "Both answers are me 😌",
            isCorrect: true,
            response:
              "100% correct! You are both, and you own 100% of your Kaakooka's heart! 👑✨",
          },
        ],
      },
    ] as QuizQuestion[],
  },

  // ---------------------------------------------------------------------
  // 11. SECRET MESSAGE FROM YOUR KAAKOOKA (FLOATING HEART)
  // ---------------------------------------------------------------------
  secretMessage: {
    buttonTooltip: "A whisper from Kaakooka",
    title: "Psst, Finu... ❤️",
    message:
      "Even after all these years, I still want to be the person who makes you smile.\n\nYour Kaakooka loves you. Always remember that.",
    signoff: "Forever yours, Kaakooka",
  },

  // ---------------------------------------------------------------------
  // 12. THE FINAL CINEMATIC SURPRISE 🌹
  // ---------------------------------------------------------------------
  finalSurprise: {
    storyRevealLines: [
      "Once, I was just a little boy...",
      "I proposed to a girl in 2nd standard.",
      "Years later, in 8th standard...",
      "On 21 October 2019, she said YES.",
      "That girl was you, Finu.",
      "That little boy was me.",
      "And today...",
      "I am still your Kaakooka.",
    ],
    bigMilestone: [
      "7 YEARS OF US. ❤️",
      "7 YEARS OF MY FINU.",
      "AND I'D STILL CHOOSE YOU.",
    ],
    anniversarySignoff: "Happy 7th Love Anniversary, Hafna Sherin.",
    fromLine: "From Mohammed Nasim, your Kaakooka — with all my heart.",
    secretPromiseButton: "One Last Secret, Finu... 💌",
    secretPromiseText:
      "My dearest Finu, my promise to you on our 7th anniversary: I promise to love you even on ordinary days, to listen when you need an ear, to celebrate your every win, and to remain the same Kaakooka who would propose to you in 2nd standard all over again. You are my home. Happy 7th Anniversary, my love! ❤️ [EDIT YOUR OWN SECRET PROMISE HERE]",
    replayButton: "Replay Our Story ❤️",
  },

  // ---------------------------------------------------------------------
  // 13. AUDIO CONFIGURATION
  // ---------------------------------------------------------------------
  audio: {
    audioSrc: "/audio/our-song.mp3",
    trackTitle: "Our Love Theme (Kaakooka & Finu)",
    artist: "Ambient Romantic Melody",
  },
};
