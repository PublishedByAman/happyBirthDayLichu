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
      title: "The Day We First Met",
      date: "The Beginning of Us",
      image: "DSC01975 (2).webp",
      description: "Do you remember the very first moment our eyes met? The whole world seemed to pause for a second. Little did I know that day would change my entire life for the best."
    },
    {
      id: 2,
      title: "Our Very First Date",
      date: "Butterflies & Sweet Smiles",
      image: "DSC02131.webp",
      description: "Both of us were a little nervous, trying to act cool. But the moment you laughed, all the nervousness vanished into thin air. I knew right then you were truly special."
    },
    {
      id: 3,
      title: "That Walk in the Rain",
      date: "Shared Under One Umbrella",
      image: "DSC02564.webp",
      description: "Getting drenched because the umbrella was too small for both of us! We didn't even care about getting soaked because we were too busy laughing our hearts out."
    },
    {
      id: 4,
      title: "Sunset by the Shore",
      date: "Golden Hour Magic",
      image: "IMG20240614173422.webp",
      description: "Sitting side by side on the sand, listening to the gentle waves, watching the sky turn shades of peach and violet. Your hand in mine felt like home."
    },
    {
      id: 5,
      title: "Midnight Ice Cream Craving",
      date: "Sweet Tooth Adventures",
      image: "IMG20240615173446.webp",
      description: "Sneaking out at midnight just to grab your favorite ice cream flavor. The cool breeze, empty city roads, and your happy face enjoying every single scoop."
    },
    {
      id: 6,
      title: "That Uncontrollable Laughter",
      date: "Our Silly Inside Jokes",
      image: "IMG20241130094714.webp",
      description: "A joke that made zero sense to anyone else, but had both of us laughing till our stomachs hurt and tears rolled down our cheeks. You have the sweetest laugh in the world."
    },
    {
      id: 7,
      title: "Cozy Coffee & Deep Talks",
      date: "Quiet Corner Cafe",
      image: "IMG20250101083226.webp",
      description: "Hours feeling like minutes as we talked about our dreams, our childhoods, and everything in between. With you, conversations are poetry."
    },
    {
      id: 8,
      title: "Our First Road Trip",
      date: "Windows Down, Music High",
      image: "IMG20250315085120.webp",
      description: "Singing off-key at the top of our lungs to our favorite songs. The wind in your hair, the scenic highway, and the joy of exploring the world together."
    },
    {
      id: 9,
      title: "That Stargazing Night",
      date: "Under the Velvet Sky",
      image: "IMG20250827182555.webp",
      description: "Lying down looking at the cosmos, counting shooting stars. You made a wish that night, but looking at you, I realized my wish had already come true."
    },
    {
      id: 10,
      title: "The Surprise Flowers",
      date: "Seeing You Blush",
      image: "IMG20250929175727.webp",
      description: "The look of pure shock and happiness on your face when I showed up with your favorite blooms. Seeing you blush is my favorite sight in the universe."
    },
    {
      id: 11,
      title: "Dancing in the Living Room",
      date: "No Music Needed",
      image: "IMG20260101112603.webp",
      description: "No grand stage, just fairy lights, warm ambient shadows, and a slow sway to the rhythm of our own heartbeats. Pure, unfiltered romance."
    },
    {
      id: 12,
      title: "Cooking Disasters & Triumphs",
      date: "Flour on Your Nose",
      image: "IMG20260429180659.webp",
      description: "Trying to cook that fancy recipe together, making an absolute mess of the kitchen, and ending up laughing with flour all over our shirts. It tasted amazing anyway!"
    },
    {
      id: 13,
      title: "The Comfort of Your Hug",
      date: "Safe Haven",
      image: "IMG20260627165035.webp",
      description: "Whenever the world felt heavy or exhausting, one embrace from you made everything quiet and calm. You are my peace, Pragyan."
    },
    {
      id: 14,
      title: "Exploring Bookstores Together",
      date: "Old Pages & Quiet Smiles",
      image: "IMG20260727182558.webp",
      description: "Wandering through the aisles of aged paperbacks, whispering book recommendations to each other, and sitting by the window lost in our little world."
    },
    {
      id: 15,
      title: "Watching the Sunrise",
      date: "A Brand New Horizon",
      image: "IMG20260817073358.webp",
      description: "Waking up before dawn to watch the first golden rays bathe the hills. Chilly morning air, hot tea in hand, and you cuddled close."
    },
    {
      id: 16,
      title: "When You Cheered Me Up",
      date: "My Biggest Supporter",
      image: "IMG20260910074948.webp",
      description: "On days I doubted myself, you were right beside me, believing in me with a faith so fierce that it gave me wings. Thank you for always being my strength."
    },
    {
      id: 17,
      title: "Late Night Heart-to-Hearts",
      date: "Whispers at 2 AM",
      image: "IMG_20250131_201517.webp",
      description: "When the rest of the universe is asleep, sharing our deepest thoughts, secrets, and hopes. Those quiet midnight hours hold my most treasured memories."
    },
    {
      id: 18,
      title: "Celebrations & Sparklers",
      date: "Lighting Up the Night",
      image: "IMG_20260901_123421.webp",
      description: "Holding sparklers together, watching bright sparks dance against the dark. But none of those sparks could ever rival the sparkle in your eyes."
    },
    {
      id: 19,
      title: "Dreaming of Tomorrow",
      date: "Our Endless Journey",
      image: "IMG_20260911_095545.webp",
      description: "Talking about all the places we will travel, the home we will build, and the million new memories waiting for us just around the corner."
    },
    {
      id: 20,
      title: "Today, Celebrating Wonderful You",
      date: "Your Special Birthday",
      image: "PXL_20240825_082549384.webp",
      description: "And here we are today, celebrating the most beautiful soul I have ever known. Thank you for existing, for loving me, and for filling my life with wonder."
    }
  ],

  // 300+ Word Romantic Love Letter
  letter: {
    salutation: "My Dearest Pragyan,",
    dateBadge: "On Your Special Birthday",
    paragraphs: [
      "Happy Birthday, my love. As I sit down to write this, my heart overflows with so much gratitude and warmth that words almost feel too small to hold it all. Ever since you walked into my life, you turned every ordinary moment into something extraordinary, every silent evening into a melody, and every dream into something brighter and within reach.",
      
      "You have this quiet, gentle magic about you — the kind of beauty that doesn't just turn heads, but softens hearts. Your smile can illuminate the darkest days, and your laughter is honestly my favorite song in the whole world. You love with such depth, care with such tenderness, and bring a kind of peace into my life that I never knew I was missing until you arrived.",

      "Thank you for being my best friend, my sweetest comfort, and my greatest adventure. Thank you for listening to my stories, for laughing at my silliest jokes, for holding my hand when things get tough, and for celebrating every little win with so much genuine joy. Being loved by you is the most precious gift I have ever received.",

      "On your birthday, my deepest wish for you is that life returns to you all the kindness, beauty, and love you shower onto everyone around you. May your path always be lined with blooming flowers, may your dreams take flight, and may you never forget how deeply, passionately, and unconditionally you are cherished.",

      "No matter where life takes us or how many years pass, my heart will always choose you, cherish you, and hold you close. Today, tomorrow, and for all the lifetimes to come."
    ],
    closing: "Forever & Always Yours,",
    signature: "With all my love ❤️"
  }
};
