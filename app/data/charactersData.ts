import type { Character } from "../types/library";

export const CHARACTERS_DATA: Character[] = [
  {
    id: "krishna",
    nameSanskrit: "श्री कृष्णः",
    nameEnglish: "Lord Krishna",
    title: "Yogeshwara & Divine Incarnation",
    role: "Central Figure of Mahabharata, Preacher of Bhagavad Gita",
    description: "The 8th avatara of Lord Vishnu, embodiment of cosmic play (Leela), supreme diplomat, strategist, and spiritual master who delivered the Bhagavad Gita to Arjuna.",
    lineage: "Yadu Dynasty / Vasudeva & Devaki",
    keyTeachings: [
      "Nishkama Karma (Selfless action without anxiety over outcome)",
      "Unflinching devotion (Bhakti) and total surrender (Sharanagati)",
      "Recognizing the eternal soul (Atman) behind temporary physical roles"
    ],
    associatedBooks: ["mahabharata", "bhagavad-gita", "puranas"],
    avatarGradient: "from-amber-500 to-blue-700",
    quote: {
      sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत । अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ॥",
      english: "Whenever there is a decline of righteousness and a rise of unrighteousness, O Arjuna, I manifest Myself.",
      source: "Bhagavad Gita 4.7"
    }
  },
  {
    id: "rama",
    nameSanskrit: "श्री रामः",
    nameEnglish: "Lord Rama",
    title: "Maryada Purushottama (The Ideal Human)",
    role: "Hero of Ramayana, Seventh Avatar of Vishnu",
    description: "Prince of Ayodhya who personifies absolute integrity, filial obedience, unwavering devotion to truth (Satya), and righteous governance (Ramrajya).",
    lineage: "Ikshvaku Dynasty / King Dasharatha & Queen Kausalya",
    keyTeachings: [
      "Upholding righteousness even at extreme personal sacrifice",
      "Equality and respect for all beings (Shabari, Guha, Sugriva, Vibhishana)",
      "Word of honor (Pran jaye par vachan na jaye)"
    ],
    associatedBooks: ["ramayana", "puranas"],
    avatarGradient: "from-rose-600 to-orange-500",
    quote: {
      sanskrit: "जननी जन्मभूमिश्च स्वर्गादपि गरीयसी ॥",
      english: "Mother and motherland are far superior even to Heaven itself.",
      source: "Valmiki Ramayana"
    }
  },
  {
    id: "arjuna",
    nameSanskrit: "अर्जुनः",
    nameEnglish: "Arjuna",
    title: "Partha / Dhananjaya / Sabyasachi",
    role: "Pandava Archer & Recipient of Gita Knowledge",
    description: "The third Pandava brother, peerless master archer, student of Dronacharya, and close friend of Lord Krishna. His moral dilemma on Kurukshetra birthed the Gita.",
    lineage: "Kuru Dynasty / Indra & Kunti",
    keyTeachings: [
      "Single-minded concentration (Ekagrata)",
      "Confronting moral despair with spiritual inquiry",
      "Surrender to divine guidance in times of uncertainty"
    ],
    associatedBooks: ["mahabharata", "bhagavad-gita"],
    avatarGradient: "from-emerald-600 to-teal-800",
    quote: {
      sanskrit: "करिष्ये वचनं तव ॥",
      english: "I shall act according to Your word, O Krishna!",
      source: "Bhagavad Gita 18.73"
    }
  },
  {
    id: "hanuman",
    nameSanskrit: "श्री हनुमान्",
    nameEnglish: "Shri Hanuman",
    title: "Mahavira / Anjaneya / Pawanputra",
    role: "Devoted Commander in Ramayana",
    description: "Incomparable embodiment of selfless service (Seva), supreme strength, intellect, humility, and immortal devotion (Bhakti) to Lord Rama.",
    lineage: "Anjana & Kesari (Blessed by Vayu Deva)",
    keyTeachings: [
      "Strength combined with profound humility",
      "Using power solely in the service of righteousness",
      "Impassioned chanting of the divine name"
    ],
    associatedBooks: ["ramayana"],
    avatarGradient: "from-amber-600 to-red-600",
    quote: {
      sanskrit: "राम काज कीन्हे बिनु मोहि कहाँ विश्राम ॥",
      english: "Without completing Lord Rama's task, where is the rest for me?",
      source: "Ramcharitmanas / Sundara Kanda"
    }
  },
  {
    id: "yudhishthira",
    nameSanskrit: "युधिष्ठिरः",
    nameEnglish: "Yudhishthira",
    title: "Dharmaraja",
    role: "Eldest Pandava & King of Hastinapur",
    description: "Son of Yama (Dharma Deva), known throughout the three worlds for his truthfulness, patience, moral rectitude, and philosophical answers to the Yaksha.",
    lineage: "Kuru Dynasty / Dharma Deva & Kunti",
    keyTeachings: [
      "Patience (Kshama) during hardship",
      "Unflinching commitment to truth even in war",
      "Compassion towards all living creatures"
    ],
    associatedBooks: ["mahabharata"],
    avatarGradient: "from-cyan-700 to-blue-900",
    quote: {
      sanskrit: "धर्मो रक्षितः रक्षितः ॥",
      english: "Dharma protects those who protect Dharma.",
      source: "Mahabharata"
    }
  },
  {
    id: "nachiketa",
    nameSanskrit: "नचिकेता",
    nameEnglish: "Nachiketa",
    title: "Seeker of Truth",
    role: "Protagonist of Katha Upanishad",
    description: "Young Brahmin boy who dared to ask Lord Yama for the highest knowledge of Soul and Immortality, rejecting worldly temptations of wealth and long life.",
    lineage: "Son of Rishi Vajasravas",
    keyTeachings: [
      "Discrimination between Shreyas (spiritual good) and Preyas (pleasurable trap)",
      "Unshakeable thirst for self-realization",
      "Fearlessness in the face of mortality"
    ],
    associatedBooks: ["upanishads"],
    avatarGradient: "from-purple-600 to-pink-700",
    quote: {
      sanskrit: "न वित्तेन तर्पणीयो मनुष्यः ॥",
      english: "Man can never be truly satisfied by wealth alone.",
      source: "Katha Upanishad 1.1.27"
    }
  }
];
