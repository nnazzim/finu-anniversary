/**
 * =======================================================================
 *  FINU ❤️ — OUR STORY, OUR FOREVER (CENTRAL PERSONALIZATION FILE)
 * =======================================================================
 * 
 * Primary Source: "Cute Cadence" & Our Real Love Journey
 * From AMUP Munduparamba School to DUHSS Panakkad,
 * College days at Farook & Govt College Malappuram,
 * and 7 years of saying yes (21 October 2019 — 21 October 2026).
 */

export interface MemoryItem {
  id: number;
  image: string;
  caption: string;
  category: 'class-10' | 'class-11' | 'class-12' | 'college' | 'weddings' | 'other';
  stageLabel: string;
  date?: string;
  description?: string;
  isRealPhoto: boolean; // false for childhood illustrations, true for real photo slots (10th standard onwards)
}

export interface TimelineChapter {
  id: number;
  chapterNumber: number;
  title: string;
  period: string;
  schoolStage: 'childhood' | 'school' | 'higher-secondary' | 'college' | 'today';
  headlineQuote: string;
  narrative: string[];
  emotionalText: string;
  imageType: 'illustration' | 'scrapbook' | 'autograph' | 'talent' | 'milestone' | 'photo-placeholder';
  photoSlot?: string;
  tag: string;
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
    primarySchool: "AMUP Munduparamba School",
    highSchool: "MMET High School",
    higherSecondarySchool: "DUHSS Panakkad",
    hisCollege: "Farook College",
    herCollege: "Government College, Malappuram",
    proposalGrade: "2nd Standard",
    acceptanceDate: "21 October 2019",
    acceptanceGrade: "8th Standard",
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
      { label: "Official Anniversary", value: "21 Oct 2019" },
      { label: "Years of Saying Yes", value: "7 Years" },
      { label: "Since Childhood Spark", value: "Since 2nd Std" },
    ],
  },

  // ---------------------------------------------------------------------
  // 4. OUR UNBELIEVABLE BEGINNING — 2ND STANDARD (FEATURED SPOTLIGHT)
  // ---------------------------------------------------------------------
  beginning: {
    tag: "AMUP Munduparamba School • Where Our Story Began",
    heading: "Can You Believe Where It All Started? 🥹",
    paragraphs: [
      "Fate seemed to weave our paths together from the very start, finding ourselves in the same classroom from 1st standard at AMUP Munduparamba School.",
      "In 2nd standard, our connection deepened when our teacher grouped us together. Hafna's remarkable talent made our team victorious in every class competition, and little Nasim couldn't help but be captivated by her charm.",
      "As admiration grew, he started bringing sweets to express his feelings. Despite that innocent young proposal, Hafna, unaware of love, remained uninterested — but undeterred, Nasim held her in his heart.",
    ],
    highlightLine: "I was just a little boy when I chose you, Finu. ❤️",
    emotionalQuote: "Before I knew what forever meant, my little heart had already found someone special. That little girl was you, Finu. And that little boy was me.",
    noteDoodle: "Lined notebook memories, team victories & pencil doodles.",
    photoPlaceholderTitle: "AMUP Munduparamba Days 🎨",
    photoPlaceholderSub: "Childhood Illustrated Memory (No Real Photos 2nd–9th Std)",
  },

  // ---------------------------------------------------------------------
  // 5. THE DAY FINU SAID YES — 21 OCTOBER 2019 (THE TURNING POINT)
  // ---------------------------------------------------------------------
  theYesDay: {
    tag: "The Milestone That Changed Our Story Forever",
    heading: "AND THEN... YOU SAID YES. ❤️",
    date: "21 OCTOBER 2019",
    gradeBadge: "8th Standard • MMET",
    descriptionLines: [
      "8th standard. October 21st, 2019.",
      "The day my Finu accepted my love.",
      "One day, navigating the challenges of 8th standard together, Hafna gathered the courage to send Nasim a thoughtful text: she asked if he was mad because she had consistently rejected his proposals. Nasim, pouring his genuine emotions into words, expressed that he wasn't mad at all, but rather saddened by the continuous rejections.",
      "To his joyful surprise, Hafna responded with newfound understanding and warmth, acknowledging his enduring feelings and finally saying YES. That moment became the highlight of your Kaakooka's life.",
    ],
    emotionalQuotes: [
      "I had waited, hoped, and held on to my feelings. Then came the day that changed our story forever.",
      "From that day, I wasn't just the boy who loved you. I became the boy whose love you accepted.",
      "Happy 7th love anniversary, Finu. Your Kaakooka still remembers.",
    ],
    milestoneCard:
      "One little question. One beautiful YES. A story that is still being written.",
    photoPlaceholderTitle: "The Day Our Story Became Ours ❤️",
  },

  // ---------------------------------------------------------------------
  // 6. REORGANIZED 12-CHAPTER CHRONOLOGICAL LOVE TIMELINE
  // ---------------------------------------------------------------------
  chapters: [
    {
      id: 1,
      chapterNumber: 1,
      title: "The Beginning at Munduparamba School",
      period: "2nd Standard",
      schoolStage: "childhood",
      tag: "AMUP Munduparamba",
      imageType: "illustration",
      headlineQuote: "Where two little desks became the start of a lifetime.",
      narrative: [
        "Nasim and Hafna's journey began at AMUP Munduparamba School. Fate seemed to weave their paths together as they found themselves in the same class from 1st standard.",
        "In 2nd standard, their connection deepened when they were grouped together by their teacher. Hafna's remarkable talent made their team victorious in every class competition, and Nasim couldn't help but be captivated by her charm.",
        "As his admiration grew, he started bringing sweets to express his feelings. Hafna, innocent and unaware of love, remained uninterested — but Nasim held onto his feelings.",
      ],
      emotionalText:
        "Before I knew what forever meant, my little heart had already found someone special. That little girl was you, Finu. And that little boy was me.",
    },
    {
      id: 2,
      chapterNumber: 2,
      title: "A Little Chocolate and a Friendship",
      period: "4th — 6th Standard",
      schoolStage: "childhood",
      tag: "Dairy Milk Turning Point",
      imageType: "scrapbook",
      headlineQuote: "One sweet gesture that opened the door to our friendship.",
      narrative: [
        "Through 3rd, 4th, and 5th standard, Nasim continued hoping for a chance at a deeper connection with Hafna.",
        "Finally, in 6th standard, Hafna suggested that they become friends — a sweet turning point marked by a memorable Dairy Milk chocolate exchange.",
      ],
      emotionalText:
        "Sometimes the smallest moments become the memories we carry for years. One friendship, one chocolate, and a story that was only beginning.",
    },
    {
      id: 3,
      chapterNumber: 3,
      title: "The Autograph Book Proposal",
      period: "7th Standard Farewell",
      schoolStage: "childhood",
      tag: "AMUP Farewell",
      imageType: "autograph",
      headlineQuote: "\"I Need You, I Miss You, I Love You.\"",
      narrative: [
        "As the final year at AMUP Munduparamba approached, they faced the reality of moving to different schools after 7th standard. In a nostalgic gesture, Hafna shared an autograph book to collect memories.",
        "Inside that book, Nasim poured his heart out once again with a heartfelt proposal: 'I Need You, I Miss You, I Love You.'",
        "Both were still very young, and Hafna gently declined. Respecting her feelings, Nasim chose patience and continued cherishing the blossoming friendship between them.",
      ],
      emotionalText:
        "I had already chosen you in my little heart. But I understood that your heart needed its own time.",
    },
    {
      id: 4,
      chapterNumber: 4,
      title: "Choosing the Same High School",
      period: "MMET Admission",
      schoolStage: "school",
      tag: "Talent Certificate Miracle",
      imageType: "talent",
      headlineQuote: "Determination to stay by her side.",
      narrative: [
        "When Hafna shared that she would be attending MMET for high school, Nasim made the bold decision to join MMET as well, determined to remain near her.",
        "Admission wasn't straightforward — both had to take a difficult entrance exam. The day results were announced, Hafna messaged that she had failed, and Nasim confessed he hadn't cleared it either.",
        "Yet a glimmer of hope appeared: Hafna secured admission with a Talent certificate. Encouraged by her success, Nasim tried his luck with his own Talent certificate. Miraculously, both gained admission into MMET, landing in the exact same 8th standard class!",
      ],
      emotionalText:
        "Life was taking us into a new chapter, and somehow, I still hoped to be by your side.",
    },
    {
      id: 5,
      chapterNumber: 5,
      title: "The Day Finu Said Yes ❤️",
      period: "21 October 2019",
      schoolStage: "school",
      tag: "Our Official Anniversary",
      imageType: "milestone",
      headlineQuote: "21 October 2019 — The highlight of Kaakooka's life.",
      narrative: [
        "In 8th standard at MMET, Hafna texted Nasim asking if he was upset because she had consistently rejected his proposals.",
        "Nasim spoke honestly: he wasn't mad at her, but rather saddened by the continuous rejections. Hafna, understanding the depth of his enduring love, responded with warmth and finally accepted his proposal!",
        "From that day forward, 21 October 2019 became their golden anniversary date.",
      ],
      emotionalText:
        "I had waited, hoped, and held on to my feelings. Then came the day that changed our story forever. From that day, I wasn't just the boy who loved you. I became the boy whose love you accepted. Happy 7th love anniversary, Finu. Your Kaakooka still remembers.",
    },
    {
      id: 6,
      chapterNumber: 6,
      title: "Growing Together at MMET",
      period: "8th — 10th Standard",
      schoolStage: "school",
      tag: "High School Days",
      imageType: "photo-placeholder",
      photoSlot: "school/class-10",
      headlineQuote: "Learning life, learning love, side by side.",
      narrative: [
        "From that day forward, they quickly became a cute couple in their school. The remaining high school years passed joyfully as they studied and grew up together at MMET.",
        "Real photographs begin from 10th standard — capturing the smiles and moments they could finally keep.",
      ],
      emotionalText:
        "We were still young, still learning about life and love. But now, we were learning it together.",
    },
    {
      id: 7,
      chapterNumber: 7,
      title: "Higher Secondary at DUHSS Panakkad",
      period: "Class 11 & 12",
      schoolStage: "higher-secondary",
      tag: "DUHSS Panakkad",
      imageType: "photo-placeholder",
      photoSlot: "school/class-11",
      headlineQuote: "Sharing lunches, topper & 2nd position.",
      narrative: [
        "Deeply committed to their journey, they applied to DUHSS Panakkad and were overjoyed to discover they were admitted to the same school and the same class!",
        "They became inseparable: sharing lunches, supporting each other's dreams, with Hafna emerging as class topper and Nasim closely following in 2nd position.",
        "Chocolates and gifts continued, including a special Valentine's Day love book during second year encapsulating their journey.",
      ],
      emotionalText:
        "Even as we worked towards our own dreams, we were still sharing a little part of the same everyday world. From school memories to higher secondary, I was grateful that our paths continued together.",
    },
    {
      id: 8,
      chapterNumber: 8,
      title: "Two Colleges, One Love",
      period: "College Years",
      schoolStage: "college",
      tag: "Farook & Govt College",
      imageType: "photo-placeholder",
      photoSlot: "college",
      headlineQuote: "Farook College & Govt College Malappuram.",
      narrative: [
        "After higher secondary, life took them into two different college worlds: Mohammed Nasim at Farook College, and Hafna Sherin at Government College, Malappuram.",
        "No longer sharing the same classroom or daily routine, they learned to love and support each other through the new rhythm of college life.",
      ],
      emotionalText:
        "Our everyday world changed. We no longer had the same school, the same class, or the same familiar routine. But going to different colleges did not erase what we had built together. We were learning to love each other from a distance.",
    },
    {
      id: 9,
      chapterNumber: 9,
      title: "The Roads, The Distance, and Those Little Glances",
      period: "Everyday Longings",
      schoolStage: "college",
      tag: "Glances From Afar",
      imageType: "photo-placeholder",
      photoSlot: "college",
      headlineQuote: "Seeing you, even briefly, made an ordinary day special.",
      narrative: [
        "Even when college kept them busy and their daily paths diverged, there were moments on the roads where they saw each other from a distance.",
        "Those long glances across the street, the silent smiles, and knowing that despite different buses and different campuses, their hearts were completely synchronized.",
      ],
      emotionalText:
        "Different colleges. Different roads. Still the same two hearts. ❤️",
    },
    {
      id: 10,
      chapterNumber: 10,
      title: "The Little Moments We Got to Keep",
      period: "Friends' Weddings",
      schoolStage: "college",
      tag: "Friends' Weddings",
      imageType: "photo-placeholder",
      photoSlot: "friends-weddings",
      headlineQuote: "Photographs together that became timeless treasures.",
      narrative: [
        "At friends' weddings, their worlds came together again in celebration.",
        "Dressed in their finest, these gatherings gave them the precious chance to stand side-by-side and take real photographs together — tangible pieces of time they could hold onto forever.",
      ],
      emotionalText:
        "After all those years of growing up, finally having photographs of us together made those moments feel even more precious.",
    },
    {
      id: 11,
      chapterNumber: 11,
      title: "Seven Years of Choosing You",
      period: "2019 — 2026",
      schoolStage: "today",
      tag: "7th Anniversary",
      imageType: "milestone",
      headlineQuote: "2,557 days since that beautiful 'Yes'.",
      narrative: [
        "Seven full years since 21 October 2019. From 8th standard kids to two young adults with college memories, road glances, and wedding snapshots.",
        "Through every phase of life, your Kaakooka's heart has never wavered for a single second.",
      ],
      emotionalText:
        "Seven years since you said yes. Seven years of choosing you every single day.",
    },
    {
      id: 12,
      chapterNumber: 12,
      title: "Our Story Is Still Being Written",
      period: "Today & Forever",
      schoolStage: "today",
      tag: "Forever & Always",
      imageType: "milestone",
      headlineQuote: "Hand in hand towards tomorrow.",
      narrative: [
        "This 7th anniversary is not the finish line — it is the golden doorway to all our tomorrows.",
        "No matter where life leads, my Finu will always have her Kaakooka by her side.",
      ],
      emotionalText:
        "From that little boy who proposed in 2nd standard to your Kaakooka today... my heart still chooses you.",
    },
  ] as TimelineChapter[],

  // ---------------------------------------------------------------------
  // 7. TWO COLLEGES, ONE LOVE (DEDICATED SECTION)
  // ---------------------------------------------------------------------
  collegesSection: {
    heading: "THEN LIFE TOOK US TO DIFFERENT COLLEGES...",
    subheading: "Two campuses. Two different routines. One unbreakable bond.",
    hisCampus: {
      name: "Farook College",
      person: "Mohammed Nasim (Kaakooka)",
      details: "New campus, new schedules, but his thoughts remained with his Finu.",
    },
    herCampus: {
      name: "Government College, Malappuram",
      person: "Hafna Sherin (Finu)",
      details: "Pursuing her degree, shining as always, holding him in her heart.",
    },
    narrativeParagraphs: [
      "After higher secondary, a new chapter of life began. We went to different colleges — I went to Farook College, and my Finu went to Government College, Malappuram.",
      "Our everyday world changed. We no longer had the same school, the same class, or the same familiar routine.",
      "But going to different colleges did not erase what we had built together.",
      "We were learning to love each other from a distance.",
    ],
  },

  // ---------------------------------------------------------------------
  // 8. THE ROADS, THE DISTANCE, AND THOSE LITTLE GLANCES ❤️
  // ---------------------------------------------------------------------
  glancesSection: {
    heading: "EVEN FROM A DISTANCE, I LOOKED FOR YOU.",
    narrative: [
      "We went to different colleges, and our everyday lives were no longer the same.",
      "But sometimes, on the roads, I would see you from a distance.",
      "Those little moments. Those long glances. Seeing you, even briefly, could make an ordinary day feel special.",
      "We didn't need a long conversation every time. Sometimes, just seeing my Finu was enough to make the moment stay in my heart.",
    ],
    closingQuote: "Different colleges. Different roads. Still the same two hearts. ❤️",
  },

  // ---------------------------------------------------------------------
  // 9. MEMORIES AT FRIENDS' WEDDINGS 📸
  // ---------------------------------------------------------------------
  weddingsSection: {
    heading: "THE LITTLE MOMENTS WE GOT TO KEEP.",
    subheading: "Where our paths converged, and real photographs captured our love.",
    narrative: [
      "Even when college kept us busy and distance changed our everyday routine, there were moments when our paths came together.",
      "At friends' weddings, we sometimes got to take pictures together — little pieces of time that became memories I could keep.",
      "After all those years of growing up, finally having photographs of us together made those moments feel even more precious.",
    ],
    placeholderLabel: "Add our wedding memory here ❤️",
    slots: [
      {
        id: 1,
        image: "/images/friends-weddings/wedding-01.jpg",
        caption: "Standing together at a friend's wedding ❤️",
        date: "Special Celebration",
      },
      {
        id: 2,
        image: "/images/friends-weddings/wedding-02.jpg",
        caption: "That joyful smile when our worlds met again",
        date: "Wedding Day Moments",
      },
      {
        id: 3,
        image: "/images/friends-weddings/wedding-03.jpg",
        caption: "A keepsake photograph we finally got to take together",
        date: "Treasured Memory",
      },
    ],
  },

  // ---------------------------------------------------------------------
  // 10. REAL PHOTO GALLERY (CATEGORIZED STARTING FROM 10TH STANDARD)
  // ---------------------------------------------------------------------
  galleryHeading: "Little Moments. Big Memories. My Favorite Person.",
  gallerySubtitle:
    "Real photographs begin from 10th standard onwards. Here are our chapters caught on camera.",
  photoNote:
    "Note: We do not have photos together from 2nd to 9th standard. Real photos start from Class 10!",
  gallery: [
    // Class 10 (MMET)
    {
      id: 1,
      image: "/images/school/class-10/photo-01.jpg",
      caption: "Class 10 at MMET — Where our real photos begin ❤️",
      category: "class-10",
      stageLabel: "Class 10 • MMET",
      date: "10th Standard",
      isRealPhoto: true,
      description: "Our first real photographs together as a school couple.",
    },
    {
      id: 2,
      image: "/images/school/class-10/photo-02.jpg",
      caption: "Sweet smiles as we completed high school together",
      category: "class-10",
      stageLabel: "Class 10 • MMET",
      date: "Farewell Days",
      isRealPhoto: true,
      description: "Wrapping up three joyful years at MMET.",
    },

    // Higher Secondary Class 11 & 12 (DUHSS Panakkad)
    {
      id: 3,
      image: "/images/school/class-11/photo-01.jpg",
      caption: "DUHSS Panakkad — Sharing the same class & dreams",
      category: "class-11",
      stageLabel: "Class 11 • Panakkad",
      date: "+1 Higher Secondary",
      isRealPhoto: true,
      description: "Classroom days, shared lunches, and supporting each other.",
    },
    {
      id: 4,
      image: "/images/school/class-12/photo-01.jpg",
      caption: "Class 12 — Topper Hafna & 2nd position Nasim 🏆",
      category: "class-12",
      stageLabel: "Class 12 • Panakkad",
      date: "+2 Higher Secondary",
      isRealPhoto: true,
      description: "Academic success and the special Valentine's storybook.",
    },
    {
      id: 5,
      image: "/images/school/class-12/photo-02.jpg",
      caption: "A bond that had grown from childhood into forever",
      category: "class-12",
      stageLabel: "Class 12 • Panakkad",
      date: "School Farewell",
      isRealPhoto: true,
      description: "Finishing higher secondary together.",
    },

    // College Days
    {
      id: 6,
      image: "/images/college/photo-01.jpg",
      caption: "Farook College & Govt College Malappuram days",
      category: "college",
      stageLabel: "College Days",
      date: "Degree Years",
      isRealPhoto: true,
      description: "Learning to love each other across two colleges.",
    },
    {
      id: 7,
      image: "/images/college/photo-02.jpg",
      caption: "Those road glimpses and stolen glances between campuses",
      category: "college",
      stageLabel: "College Days",
      date: "Road Glances",
      isRealPhoto: true,
      description: "Seeing my Finu from afar made every day brighter.",
    },

    // Friends' Weddings
    {
      id: 8,
      image: "/images/friends-weddings/wedding-01.jpg",
      caption: "Friends' wedding celebrations — side by side ❤️",
      category: "weddings",
      stageLabel: "Friends' Weddings",
      date: "Wedding Keepsake",
      isRealPhoto: true,
      description: "Moments where our paths converged in celebration.",
    },
    {
      id: 9,
      image: "/images/friends-weddings/wedding-02.jpg",
      caption: "Finally having photographs of us together to keep close",
      category: "weddings",
      stageLabel: "Friends' Weddings",
      date: "Special Occasion",
      isRealPhoto: true,
      description: "Looking our best and celebrating love.",
    },
    {
      id: 10,
      image: "/images/friends-weddings/wedding-03.jpg",
      caption: "A timeless picture of Finu & her Kaakooka",
      category: "weddings",
      stageLabel: "Friends' Weddings",
      date: "Precious Frame",
      isRealPhoto: true,
      description: "The moments we got to keep.",
    },

    // Other Memories
    {
      id: 11,
      image: "/images/other-memories/memory-01.jpg",
      caption: "Seven years of inside jokes and secret smiles",
      category: "other",
      stageLabel: "Special Milestone",
      date: "Seven Years of Us",
      isRealPhoto: true,
      description: "Every single day choosing you.",
    },
    {
      id: 12,
      image: "/images/other-memories/memory-02.jpg",
      caption: "To a lifetime of more memories with you, Finu ❤️",
      category: "other",
      stageLabel: "Today & Always",
      date: "21 October 2026",
      isRealPhoto: true,
      description: "Happy 7th Anniversary, my favorite person!",
    },
  ] as MemoryItem[],

  // ---------------------------------------------------------------------
  // 11. UPDATED LOVE LETTER FROM YOUR KAAKOOKA 💌
  // ---------------------------------------------------------------------
  letter: {
    envelopeTeaser: "Finu, there are things my heart wants to tell you...",
    envelopeButton: "Open Kaakooka's Letter 💌",
    salutation: "My dearest Finu,",
    paragraphs: [
      "Do you ever think about how our story began?",
      "Finu, our story started when we were so little. I proposed in 2nd standard, and life took us through school, friendship, waiting, and growing up.",
      "Then, on 21 October 2019, you said yes.",
      "We spent our school and higher secondary years growing together. And when college took us to different places, our story entered a new chapter.",
      "Farook College for me. Government College, Malappuram, for you.",
      "Different everyday lives, different roads, and those little moments when I saw you from a distance.",
      "And the photographs we sometimes took together at our friends' weddings became memories I could keep close.",
      "Our story was never only about being in the same place. It was about all the moments that made you my Finu and me your Kaakooka.",
      "Seven years since you said yes. Seven years since that date became a part of our story.",
      "I cannot promise that every day will be perfect. But I want to keep learning, growing, laughing, and making beautiful memories with you.",
      "I want to keep choosing you, not just on anniversaries, but in the little moments that make up an ordinary day.",
      "Thank you for being my Finu.",
      "And if life gave me the chance to begin all over again, I would still want to find you.",
      "Happy 7th Love Anniversary, Hafna Sherin.",
      "From that little boy who proposed to you, to your Kaakooka today...",
      "My heart still chooses you. ❤️",
    ],
    closing: "With all my love,\nYour Kaakooka,\nMohammed Nasim ❤️",
  },

  // ---------------------------------------------------------------------
  // 12. WHY I LOVE MY FINU ❤️ (7 CARDS)
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
        description: "From Munduparamba School classroom competitions to today.",
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
        description: "You believed in us and made me the happiest guy in the world.",
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
        description: "Through school, higher secondary, college, and every tomorrow.",
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
  // 13. A CUTE LOVE QUIZ 🎀
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
              "Spot on, my Finu! 🥹 Yes, 2nd standard at AMUP Munduparamba! Just a tiny boy who already knew who had his heart.",
          },
          {
            text: "8th standard",
            isCorrect: false,
            response:
              "Hehe, almost! 8th standard was when you finally said YES! But your Kaakooka was already proposing way back in 2nd standard! ❤️",
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
              "Yesss! 21 October 2019! 8th standard at MMET — the most beautiful date on your Kaakooka's calendar forever! 🌹✨",
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
  // 14. SECRET MESSAGE FROM YOUR KAAKOOKA
  // ---------------------------------------------------------------------
  secretMessage: {
    buttonTooltip: "A whisper from Kaakooka",
    title: "Psst, Finu... ❤️",
    message:
      "Even after all these years, I still want to be the person who makes you smile.\n\nYour Kaakooka loves you. Always remember that.",
    signoff: "Forever yours, Kaakooka",
  },

  // ---------------------------------------------------------------------
  // 15. UPDATED FINAL CINEMATIC SURPRISE 🌹
  // ---------------------------------------------------------------------
  finalSurprise: {
    storyRevealLines: [
      "Once, there was a little boy in 2nd standard...",
      "Who fell for a girl named Hafna Sherin.",
      "Through school, friendship, waiting, and growing up...",
      "On 21 October 2019, she finally said yes.",
      "They grew together through high school and higher secondary.",
      "Then two different colleges brought a new kind of distance.",
      "But even on different roads...",
      "Even through those little glances from afar...",
      "And in the photographs taken at friends' weddings...",
      "His heart kept finding its way back to her.",
    ],
    bigMilestone: [
      "MY FINU. MY FAVORITE STORY. ❤️",
      "Seven years since you said yes.",
      "And I still choose you.",
    ],
    anniversarySignoff: "Happy 7th Love Anniversary, Hafna Sherin.",
    fromLine: "With all my love, your Kaakooka — Mohammed Nasim.",
    secretPromiseButton: "One Last Secret, Finu... 💌",
    secretPromiseText:
      "My dearest Finu, my promise to you on our 7th anniversary: I promise to love you even on ordinary days, across different roads, in every crowded room, and through every new chapter. From 2nd standard at Munduparamba to Farook College and Government College, and for all our tomorrows — you are my home. Happy 7th Anniversary, my love! ❤️ [EDIT YOUR OWN SECRET PROMISE HERE]",
    replayButton: "Replay Our Story ❤️",
  },

  // ---------------------------------------------------------------------
  // 16. AUDIO CONFIGURATION
  // ---------------------------------------------------------------------
  audio: {
    audioSrc: "/audio/our-song.mp3",
    trackTitle: "Our Love Theme (Kaakooka & Finu)",
    artist: "Ambient Romantic Melody",
  },
};
