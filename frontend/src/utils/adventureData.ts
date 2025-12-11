export interface Episode {
  episodeNumber: number;
  title: string;
  description: string;
  videoUrl: string;
  lesson?: string;
}

export interface Adventure {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  tagline: string;
  episodes: Episode[];
}

export const adventures: Adventure[] = [
  {
    "id": "the-unexpected-visitor",
    "title": "The Unexpected Visitor",
    "description": "Leo discovers a glowing friend from the stars who changes his world forever.",
    "thumbnail": "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    "tagline": "A secret friend from the stars changes Leo’s life forever.",
    "episodes": [
      {
        "episodeNumber": 1,
        "title": "The Arrival",
        "description": "Leo meets Beamu for the first time under a glowing light.",
        "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "lesson": "Courage grows when truth shines."
      },
      {
        "episodeNumber": 2,
        "title": "The Secret",
        "description": "Leo hides Beamu from his family, but secrets get heavier.",
        "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "lesson": "Sometimes keeping a secret means learning when to tell the truth."
      }
    ]
  },
  {
    "id": "the-whispering-woods",
    "title": "The Whispering Woods",
    "description": "A journey into a magical forest where the trees share ancient secrets.",
    "thumbnail": "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "tagline": "Listen closely, for nature has stories to tell.",
    "episodes": [
      {
        "episodeNumber": 1,
        "title": "The First Whisper",
        "description": "Leo and Beamu follow a mysterious sound into the woods.",
        "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
      {
        "episodeNumber": 2,
        "title": "The Grumpy Guardian",
        "description": "They meet a wise old oak tree who isn't happy about visitors.",
        "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
      {
        "episodeNumber": 3,
        "title": "The River's Song",
        "description": "The river teaches them a lesson about going with the flow.",
        "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"
      }
    ]
  },
  {
    "id": "the-city-of-lost-colors",
    "title": "The City of Lost Colors",
    "description": "A gray, sad city needs help bringing its vibrant spirit back.",
    "thumbnail": "https://images.unsplash.com/photo-1560969184-10fe8719e047?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "tagline": "A single act of kindness can paint the world with joy.",
    "episodes": [
      {
        "episodeNumber": 1,
        "title": "A World of Gray",
        "description": "Leo and Beamu arrive in a city where all color has vanished.",
        "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
      {
        "episodeNumber": 2,
        "title": "The Spark of Orange",
        "description": "Beamu's glow creates the first splash of color the city has seen in years.",
        "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
      {
        "episodeNumber": 3,
        "title": "The Rainbow Festival",
        "description": "The city celebrates as color, joy, and laughter return.",
        "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"
      }
    ]
  }
];
