// ==========================================================================
// 💖 PRAGYAN'S BIRTHDAY WEBSITE - CONFIGURATION & MEMORIES DATA
// ==========================================================================
// You can easily edit any text, image, memory, or love letter content here!
// All 20 memories can be customized with your own stories and photo URLs/paths.
// ==========================================================================

const WEBSITE_CONFIG = {
  // Birthday Girl's details
  name: "Pragyan",
  nickname: "Birthday Girl 💕",
  
  // Home Page Settings
  home: {
    heroImage: "home screen Image.webp",
    tagline: "Your Special Day Is Here… 🎂✨",
    subtitle: "A day meant just for you.",
    journeyText: "So, let me take you on a little journey filled with love, memories, smiles, and surprises. ❤️",
    readyPrompt: "Ready, My Gellu? 💕",
    buttonText: "I'm Ready! Let's Go 💖"
  },

  // Cake & Candle Section Settings
  cakeSection: {
    title: "Make a Wish in Your Heart 🕯️",
    instructions: "Close your eyes, think of the happiest wish, and blow out the candle!",
    blowButtonText: "Blow the Candle 🌬️✨",
    celebrationTitle: "Happy Birthday to you, Dhana 🎉🎂💖",
    celebrationMessage: "May your day be filled with infinite sunshine, endless laughter, and all the magical dreams your heart can hold.",
    nextButtonText: "Let's Recall Our Memories 📸💕"
  },

  // The 20 Special Memories (Editable)
  memories: [
    {
      id: 1,
      title: "Me & You in Sanaghagara",
      date: "You Happy, I Happy ❤️",
      image: "DSC01975 (2).webp",
      description: "I miss that day… I miss that little moment when it was just you and me, together at Sanaghagara. Everything felt so peaceful, so simple, and somehow so special. No matter how much time passes, I’ll always remember the happiness of being there with you. That day, that place, that moment — it was special because we were together."
    },
    {
      id: 2,
      title: "You Looking Gorgeous",
      date: "Last Year Birthday ❤️",
      image: "DSC02131.webp",
      description: "It was your birthday last year, and we went to Labanagiri together. I still remember you in that beautiful red dress — you were looking absolutely gorgeous. ❤️ Whenever I’m with you, I feel like a little child again, happy without worrying about anything else. "
    },
    {
      id: 3,
      title: " With You & Mama",
      date: "With My Second Family ❤️",
      image: "DSC02564.webp",
      description: "Some moments are special because of the people we share them with. Being with you and Mama always gives me such a warm feeling. I call her Mama because that’s how close she feels to me. ❤️ I love spending time with both of you, laughing, talking, and simply being together. She will be well. "
    },
    {
      id: 4,
      title: "All We Need Is Some Quality Time",
      date: "Just A Random Plan ❤️",
      image: "IMG20240614173422.webp",
      description: "There was no special plan that day. I just wanted to meet you, so I came to your room, and somehow that simple little plan became another beautiful memory. ❤️ Sometimes we don’t need fancy dates or big surprises. Just you, me, and a little time together is enough. Sitting together, talking, laughing, and simply being around each other — that’s all we really need to feel happy."
    },
    {
      id: 5,
      title: "Your Lap, My Peace",
      date: "Where Time Stood Still ❤️",
      image: "IMG20240615173446.webp",
      description: "That moment when I rested my head on your lap, it felt like the whole world had stopped. Time didn’t matter anymore. There was just your warmth, your presence, and the peace I felt being so close to you. ❤️ For those few moments, everything felt perfect. I didn’t want the moment to end. "
    },
    {
      id: 6,
      title: "You Were Looking Too Cute",
      date: "I Couldn't Forget This One ❤️",
      image: "IMG20241130094714.webp",
      description: "I don’t even remember the exact moment. 😂 I just know you were looking so cute that I had to add this picture here. Some photos don’t need a big story behind them — sometimes, you simply look too adorable to be left out. ❤️"
    },
    {
      id: 7,
      title: "The First Meet of a Bright Year",
      date: "January 1, 2025 ❤️",
      image: "IMG20250101083226.webp",
      description: "The first day of 2025, a winter morning, and there you were in that beautiful red dress. ❤️ What a beautiful way to begin a new year — meeting you, seeing you, and spending some time together. A new year, a fresh beginning, and our first little memory of 2025 together. ✨"
    },
    {
      id: 8,
      title: "Different Souls, One Love",
      date: "Colors of Us ❤️",
      image: "IMG20250315085120.webp",
      description: "Holi has always felt a little more special with you. The way you cuddle me, hold me close, and make me feel safe — honestly, it feels like the best place in the world. ❤️ Covered in all those colors, it felt like our differences disappeared for a moment.  when we are together, it feels like we become one. Different colors, different souls, but one beautiful us. 🌈❤️"
    },
    {
      id: 9,
      title: "Just You, Me & The Journey",
      date: "Ganesh Puja 2025 ❤️",
      image: "IMG20250827182555.webp",
      description: "I’ve always loved travelling, but travelling with you feels different. I don’t really care where we go or what we do — I just want to be with you. ❤️ Just the two of us, somewhere away from everything, making our own little memories along the way."
    },
    {
      id: 10,
      title: "Just Another Night ❤️",
      date: "Just Another Night ❤️",
      image: "IMG20250929175727.webp",
      description: "It was just a random night at the park, nothing planned, nothing extraordinary. But somehow, being there with you made everything feel lighter. ❤️ No stress, no worries, no thinking about anything else — just us, spending some quality time together. "
    },
    {
      id: 11,
      title: "My Lucky Charm in White",
      date: "January 1, 2026 ❤️",
      image: "IMG20260101112603.webp",
      description: "And once again, a fresh year began with you by my side. ❤️ On January 1st, at Brahmeswar Temple, I got to start another year with my lucky charm. You were dressed in white, looking so beautiful and peaceful —  divine. "
    },
    {
      id: 12,
      title: "You Trusted Me Anyway",
      date: "Our First Car Journey 🚗❤️",
      image: "IMG20260429180659.webp",
      description: "After we got our first car, we went to Puri together — That little journey became so much more than just a trip. It was one of those cute, simple moments that I know I’ll look back on when I’m old ."
    },
    {
      id: 13,
      title: "You Made Us One Family",
      date: "My Two Favorite People ❤️",
      image: "IMG20260627165035.webp",
      description: "This picture means so much to me because it’s not just you and me anymore — it’s you, me, and my Maa. ❤️ The way you love her and care for her makes me so happy. Sometimes I feel like you’re even closer to her than you are to me. You’ve brought us closer and made our family bond so much stronger. Watching the two of you together is honestly one of the most beautiful things for me."
    },
    {
      id: 14,
      title: "You Make Ordinary Feel Special",
      date: "Our Coffee-Chai Moments ☕❤️",
      image: "IMG20260727182558.webp",
      description: "Just a random day, a random place, and our usual love for coffee and chai. ☕❤️ Nothing fancy, nothing extraordinary — but somehow, it still felt special. It’s about who I’m with. Even the most average place feels beautiful when you’re sitting beside me. "
    },
    {
      id: 15,
      title: "I Couldn’t Stop Watching You",
      date: "A Quiet Moment at Kalinga Stadium ❤️",
      image: "IMG20260817073358.webp",
      description: "At Kalinga Stadium, you were peacefully doing Anulom Vilom, completely lost in your own little world. And I was just sitting there, watching you. ❤️ There was something so beautiful about that moment — the calmness on your face, the way you looked, and the peace around you. I just wanted to keep looking at you and remember that beautiful version of you."
    },
    {
      id: 16,
      title: "Anything Just to Be With You",
      date: "Another Little Plan ❤️",
      image: "IMG20260910074948.webp",
      description: "Another day, another little plan — and honestly, most of my plans have one simple reason behind them: I want to see you. ❤️ I keep thinking of places to go, things to do, or excuses to meet, just so I can have a little more of your time. It’s never really about the plan. It’s about those few hours with you, the conversations, the smiles, and the feeling of being together. If I get your time, even an ordinary day becomes special. ❤️"
    },
    {
      id: 17,
      title: "You in Black, The Morning in Silence",
      date: "A Winter Morning at Badmul 🖤",
      image: "IMG_20250131_201517.webp",
      description: "Badmul, an early winter morning, and that beautiful cold breeze… somehow, everything felt perfect that day. ❤️ You were wearing that black saree, and honestly, you looked breathtaking. The world around us was quiet, the morning was cold, but being there with you made me feel warm inside."
    },
    {
      id: 18,
      title: "You Made Me See Myself Differently",
      date: "You Always Believe in Me ❤️",
      image: "IMG_20260901_123421.webp",
      description: "Even at the gym, you’re always there encouraging me and pushing me to believe in myself. ❤️ You were the one who inspired me to take more photos, to feel good about myself, and to see something in me that I never really saw before.  "
    },
    {
      id: 19,
      title: "Starting My Day With You",
      date: "My Favorite Way to Start the Day ❤️",
      image: "IMG_20260911_095545.webp",
      description: "You were looking so cute at the gym that morning. ❤️ But honestly, the best part wasn’t the workout — it was starting my day with you. Seeing you first thing in the morning, spending those little moments together, and having you beside me made the whole day feel better. If I could choose how every day begins, I’d choose a morning with you, again and again. ❤️"
    },
    {
      id: 20,
      title: "We tried Dance, You dance , I tried",
      date: "Our Little Dance ❤️",
      image: "PXL_20240825_082549384.webp",
      description: "At Anandbana, we decided to try dancing together. You were actually dancing, and I was… well, trying my best. 😂❤️ But somewhere between the steps and your beautiful smile, I completely forgot what I was supposed to do. I just kept looking at you."
    }
  ],

  // 300+ Word Romantic Love Letter
  letter: {
    salutation: "My Dearest Lichu,",
    dateBadge: "On Your Special Birthday",
    paragraphs: [
      "My Dearest Lichu,\nMy Dhana, ❤️",

    "I want to start this letter with a sorry. This year, there were moments when my behaviour was wrong, especially considering the situations we were in. I know I didn’t always handle things the way I should have, and sometimes I may have hurt you with my words or actions. You handled me with so much patience, and I know you did that because you love me.",

    "I’m truly sorry, Lichu. ❤️ If I ever treated you wrongly, hurt you, made you feel unwanted, or made things harder for you, I’m really, really sorry.",

    "But today, more than anything, I want to tell you how much I appreciate you. I appreciate the way you love me. The way you care for me. The way you stay beside me even when I’m not at my best.",

    "I still remember when I had a fever and you came to my room to take care of me. I was talking like a little child, probably saying random things and being completely myself, and you just listened. You didn’t judge me. You stayed there and cared for me. Somehow, just having you beside me made me feel better.",

    "That is what you do. You make things feel a little easier just by being there.",

    "There have been conflicts between me and your sister too. Even through all of that, you somehow kept trying to manage both sides. You always tried to make time for me, tried to understand me, and many times even respected and followed the decisions I made. I know that cannot always be easy.",

    "I know some of the things Maa has said have hurt you. I know there have been moments when you could have kept your distance. But you didn’t.",

    "You still love her. You still care about her. You still want to talk to her. You still want to make your bond with her stronger.",

    "That means so much to me.",

    "Sometimes I feel you are even closer to my Maa than I am. 😂❤️ And honestly, seeing that makes me incredibly happy.",

    "Lichu, you are truly a gem of a person. You have your own struggles, your own feelings, your own life, yet you still find so much space in your heart for me and for the people I love.",

    "And I want you to know something: I feel very lucky to have you.",

    "Lucky that I met you. Lucky that you chose me. Lucky that you stayed. Lucky that you understand me. Lucky that I get to experience this kind of love with you.",

    "Thank you so much for coming into my life.",

    "Thank you for every little thing you do for me — even the things I sometimes forget to notice or say thank you for. Thank you for loving me when I’m difficult to love. Thank you for listening to the childish version of me. Thank you for taking care of me. Thank you for believing in me.",

    "I love you, my Lichu. More than these words can properly explain.",

    "Happy Birthday, Mo Duniaa. ❤️",

    "May you always stay happy, strong, beautiful, and the same loving person you are.",

    "And whenever you forget how special you are, come back to this letter and remember that there is someone who feels incredibly lucky simply because you came into his life."
    ],
    closing: "Forever & Always Yours,",
    signature: "With all my love ❤️"
  }
};
