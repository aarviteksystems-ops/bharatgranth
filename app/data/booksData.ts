import type { Book } from "../types/library";
import { GITA_CHAPTERS } from "./gitaChapters";
import { MAHABHARATA_PARVAS } from "./mahabharataParvas";
import { VALMIKI_RAMAYANA_KANDAS } from "./ramayanaKandas";

export const BOOKS_DATA: Book[] = [
  // ============================================================================
  // EPICS (इतिहास - MAHABHARATA & RAMAYANA)
  // ============================================================================
  {
    id: "mahabharata",
    titleSanskrit: "महाभारतम्",
    titleHindi: "महाभारत",
    titleEnglish: "Mahabharata",
    category: "Epics",
    author: "Maharshi Ved Vyasa (महर्षि वेदव्यास)",
    period: "c. 3000 BCE / Ancient Era",
    totalChapters: 18,
    sectionLabel: "Parvas (पर्व)",
    coverGradient: "from-amber-900 via-orange-950 to-amber-950",
    rating: 4.9,
    readCount: 142800,
    isFeatured: true,
    description: "The world's longest epic poem, detailing the Great Kurukshetra War between the Pandavas and Kauravas, encompassing cosmic philosophy, statecraft, righteousness (Dharma), and the divine teachings of Lord Krishna.",
    tags: ["Epic", "Dharma", "Kurukshetra", "Krishna", "Pandavas", "Vyasa"],
    chapters: MAHABHARATA_PARVAS
  },
  {
    id: "ramayana",
    titleSanskrit: "रामायणम्",
    titleHindi: "रामायण",
    titleEnglish: "Ramayana",
    category: "Epics",
    author: "Adikavi Maharshi Valmiki (आदिकवि महर्षि वाल्मीकि)",
    period: "c. 5000 BCE / Treta Yuga",
    totalChapters: 7,
    sectionLabel: "Kandas (काण्ड)",
    coverGradient: "from-red-900 via-rose-950 to-orange-950",
    rating: 5.0,
    readCount: 168400,
    isFeatured: true,
    description: "The divine saga of Lord Rama—the Maryada Purushottama (ideal human)—his exile, devotion of Sita and Lakshmana, victory of Hanuman, and triumph over Ravana.",
    tags: ["Rama", "Sita", "Hanuman", "Valmiki", "Sundara Kanda", "Dharma"],
    chapters: VALMIKI_RAMAYANA_KANDAS
  },

  // ============================================================================
  // GITA COLLECTION (गीता साहित्य - 12 MAJOR GITAS)
  // ============================================================================
  {
    id: "bhagavad-gita",
    titleSanskrit: "श्रीमद्भगवद्गीता",
    titleHindi: "श्रीमद्भगवद्गीता",
    titleEnglish: "Bhagavad Gita",
    category: "Gita",
    author: "Bhagavan Sri Krishna (भगवान् श्री कृष्ण)",
    period: "Bhishma Parva, Mahabharata",
    totalChapters: 18,
    sectionLabel: "Adhyayas (अध्याय)",
    coverGradient: "from-amber-800 via-yellow-950 to-orange-950",
    rating: 5.0,
    readCount: 254000,
    isFeatured: true,
    description: "The supreme 700-verse divine dialogue between Lord Krishna and Arjuna on the battlefield of Kurukshetra, synthesizing Karma Yoga, Bhakti Yoga, and Jnana Yoga.",
    tags: ["Krishna", "Arjuna", "Karma", "Bhakti", "Jnana", "Yoga", "Gita"],
    chapters: GITA_CHAPTERS
  },

  // ============================================================================
  // PRINCIPAL UPANISHADS COLLECTION (उपनिषद् साहित्य - 16 MAJOR UPANISHADS)
  // ============================================================================
  {
    id: "isha-upanishad",
    titleSanskrit: "ईशावास्योपनिषद्",
    titleHindi: "ईशावास्योपनिषद्",
    titleEnglish: "Isha Upanishad",
    category: "Upanishads",
    author: "Shukla Yajurveda Rishis (शुक्ल यजुर्वेद)",
    period: "c. 1200 BCE",
    totalChapters: 1,
    sectionLabel: "Verses (मन्त्र)",
    coverGradient: "from-purple-950 via-indigo-950 to-slate-900",
    rating: 5.0,
    readCount: 98500,
    isFeatured: true,
    description: "The premier Upanishad directly forming the 40th chapter of Shukla Yajurveda Samhita, revealing that the entire universe is pervaded by God and teaching detachment.",
    tags: ["Isha", "Yajurveda", "Brahman", "Detachment"],
    chapters: [
      {
        id: "isha-ch-1",
        bookId: "isha-upanishad",
        number: 1,
        sectionName: "Isha Upanishad (ईशावास्योपनिषद्)",
        titleSanskrit: "ईशावास्य मन्त्राः",
        titleHindi: "सर्वत्र ईश्वर दर्शन एवं निष्काम जीवन",
        titleEnglish: "Divine Immanence & Balanced Living",
        shlokaCount: 2,
        summary: "Teaches divine immanence ('All this is pervaded by God') and balanced action without covetousness.",
        verses: [
          {
            id: "ish-1-1",
            chapterId: "isha-ch-1",
            bookId: "isha-upanishad",
            verseNumber: 1,
            speaker: "ऋषिः",
            sanskrit: "ईशा वास्यमिदं सर्वं यत्किञ्च जगत्यां जगत् ।\nतेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम् ॥",
            transliteration: "Īśā vāsyamidaṁ sarvaṁ yatkiñca jagatyāṁ jagat |\nTena tyaktena bhuñjīthā mā gṛdhaḥ kasyasviddhanam ||",
            hindi: "इस संसार में जो कुछ भी स्थावर-जंगम है, वह सब ईश्वर से व्याप्त है। इसलिए त्यागभाव से इसका उपभोग करो; किसी के धन का लालच मत करो।",
            english: "All this—whatever moves or moves not in this changing universe—is enveloped by the Divine. Therefore, enjoy through detachment; do not covet anyone's wealth.",
            commentary: "Mahatma Gandhi called this the singular cornerstone shloka of Sanatana Dharma.",
            keyWords: ["Isha", "Renunciation", "Brahman"]
          }
        ]
      }
    ]
  },
  {
    id: "kena-upanishad",
    titleSanskrit: "केनोपनिषद्",
    titleHindi: "केनोपनिषद्",
    titleEnglish: "Kena Upanishad",
    category: "Upanishads",
    author: "Samaveda Talavakara Shakha (सामवेद)",
    period: "c. 1000 BCE",
    totalChapters: 4,
    sectionLabel: "Kandas (खण्ड)",
    coverGradient: "from-indigo-950 via-purple-950 to-slate-900",
    rating: 4.9,
    readCount: 48900,
    isFeatured: false,
    description: "Belonging to the Samaveda, Kena Upanishad explores the ultimate question: 'By whom (Kena) impelled does the mind fly to its target?' and reveals Brahman as the Ear of the ear and Eye of the eye.",
    tags: ["Kena", "Samaveda", "Mind", "Cosmic Power"],
    chapters: [
      {
        id: "kena-ch-1",
        bookId: "kena-upanishad",
        number: 1,
        sectionName: "Khanda 1 (प्रथमः खण्डः)",
        titleSanskrit: "केनेषितं पतति प्रेषितं मनः",
        titleHindi: "मन एवं इन्द्रियों का प्रेरक तत्व",
        titleEnglish: "The Impeller of Mind and Senses",
        shlokaCount: 1,
        summary: "Asks who directs the mind, speech, and senses to function, answering that Brahman is the transcendental power enabling all cognition.",
        verses: [
          {
            id: "ken-1-1",
            chapterId: "kena-ch-1",
            bookId: "kena-upanishad",
            verseNumber: 1,
            speaker: "शिष्य प्रश्नः",
            sanskrit: "केनेषितं पतति प्रेषितं मनः केन प्राणः प्रथमः प्रैति युक्ताः ।\nकेनेषितां वाचमिमां वदन्ति चक्षुः श्रोत्रं क उ देवो युनक्ति ॥",
            transliteration: "Keneṣitaṁ patati preṣitaṁ manaḥ kena prāṇaḥ prathamaḥ praiti yuktāḥ |\nKeneṣitāṁ vācamimāṁ vadanti cakṣuḥ śrotraṁ ka u devo yunakti ||",
            hindi: "शिष्य पूछता है: मन किसके द्वारा प्रेरित होकर अपने विषयों पर गिरता है? मुख्य प्राण किसके द्वारा नियुक्त होकर चलता है? वाणी और नेत्र-श्रोत्र को कौन सा देव संचालित करता है?",
            english: "The disciple asks: By whom impelled does the mind soar to its objects? Directed by whom does the vital breath move? By whose will do people speak, and what god directs the eye and ear?",
            commentary: "The famous opening inquiry of Kena Upanishad.",
            keyWords: ["Kena", "Mind", "Sensory Consciousness"]
          }
        ]
      }
    ]
  },
  {
    id: "katha-upanishad",
    titleSanskrit: "कठोपनिषद्",
    titleHindi: "कठोपनिषद्",
    titleEnglish: "Katha Upanishad",
    category: "Upanishads",
    author: "Krishna Yajurveda Katha Shakha (कृष्ण यजुर्वेद)",
    period: "c. 1000 BCE",
    totalChapters: 6,
    sectionLabel: "Vallis (वल्ली)",
    coverGradient: "from-purple-950 via-slate-900 to-indigo-950",
    rating: 5.0,
    readCount: 92300,
    isFeatured: true,
    description: "The gripping drama of young Nachiketa questioning Yama (Lord of Death) to uncover what lies beyond death, containing the call 'Arise! Awake!'.",
    tags: ["Nachiketa", "Yama", "Immortality", "Razor Edge"],
    chapters: [
      {
        id: "katha-valli-1",
        bookId: "katha-upanishad",
        number: 1,
        sectionName: "Prathama Valli (प्रथम वल्ली)",
        titleSanskrit: "उत्तिष्ठत जाग्रत - यम उपदेशः",
        titleHindi: "नचिकेता का तीसरा वरदान एवं आत्मज्ञान",
        titleEnglish: "The Path of Spiritual Awakening",
        shlokaCount: 1,
        summary: "Nachiketa rejects all worldly boons of wealth, longevity, and heavenly pleasures, demanding only knowledge of the immortal Atman.",
        verses: [
          {
            id: "kat-1-1",
            chapterId: "katha-valli-1",
            bookId: "katha-upanishad",
            verseNumber: 1,
            speaker: "यमराज उवाच",
            sanskrit: "उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत ।\nक्षुरस्य धारा निशिता दुरत्यया दुर्गं पथस्तत्कवयो वदन्ति ॥",
            transliteration: "Uttiṣṭhata jāgrata prāpya varānnibodhata |\nKṣurasya dhārā niśitā duratyayā durgaṁ pathastatkavayo vadanti ||",
            hindi: "उठो! जागो! और श्रेष्ठ गुरुओं के पास जाकर ज्ञान प्राप्त करो! विद्वान कहते हैं कि यह अध्यात्म मार्ग उस्तरे की तीखी धार के समान दुर्गम है।",
            english: "Arise! Awake! Approach the illumined Teachers and realize the Truth! The wise declare that this spiritual path is as sharp as a razor's edge and hard to tread.",
            commentary: "Popularized globally by Swami Vivekananda.",
            keyWords: ["Awake", "Nachiketa", "Yama"]
          }
        ]
      }
    ]
  },
  {
    id: "mandukya-upanishad",
    titleSanskrit: "माण्डूक्योपनिषद्",
    titleHindi: "माण्डूक्योपनिषद्",
    titleEnglish: "Mandukya Upanishad",
    category: "Upanishads",
    author: "Atharvaveda Rishis (अथर्ववेद)",
    period: "c. 800 BCE",
    totalChapters: 1,
    sectionLabel: "Verses (कारिका/मन्त्र)",
    coverGradient: "from-stone-950 via-purple-950 to-indigo-950",
    rating: 5.0,
    readCount: 84100,
    isFeatured: true,
    description: "The shortest yet most profound Upanishad consisting of 12 verses analyzing the syllable OM and the 4 states of consciousness: Waking (Jagrat), Dreaming (Svapna), Deep Sleep (Susupti), and Turiya.",
    tags: ["Mandukya", "OM", "Turiya", "Consciousness", "AUM"],
    chapters: [
      {
        id: "mandukya-ch-1",
        bookId: "mandukya-upanishad",
        number: 1,
        sectionName: "Mandukya (माण्डूक्य मन्त्राः)",
        titleSanskrit: "ओमित्येतदक्षरमिदं सर्वम्",
        titleHindi: "ॐकार एवं चेतना की चार अवस्थाएँ",
        titleEnglish: "The Syllable OM & The Four States of Consciousness",
        shlokaCount: 2,
        summary: "Declares 'Ayam Atma Brahma' (This Self is Brahman) and maps the letters A-U-M to waking, dream, sleep, and the silence of Turiya.",
        verses: [
          {
            id: "man-1-1",
            chapterId: "mandukya-ch-1",
            bookId: "mandukya-upanishad",
            verseNumber: 1,
            speaker: "ऋषिः",
            sanskrit: "ओमित्येतदक्षरमिदं सर्वं तस्योपव्याख्यानं भुतं भवद् भविष्यदिति सर्वमोङ्कार एव ।\nयच्चान्यत् त्रिकालातीतं तदप्योङ्कार एव ॥",
            transliteration: "Omityetadakṣaramidaṁ sarvaṁ tasyopavyākhyānaṁ bhutaṁ bhavad bhaviṣyaditi sarvamoṅkāra eva |\nYaccānyat trikālātītaṁ tadapyoṅkāra eva ||",
            hindi: "ॐ—यह अक्षर ही यह सब कुछ है। जो भूत, वर्तमान और भविष्य काल है, वह सब ॐकार ही है; और जो तीनों कालों से अतीत तत्त्व है, वह भी ॐकार ही है।",
            english: "OM—this imperishable syllable is all this. All that is past, present, and future is indeed OM; and whatever transcends the three divisions of time is also OM.",
            commentary: "The foundational verse of Mandukya Upanishad.",
            keyWords: ["OM", "AUM", "Mandukya", "Turiya"]
          },
          {
            id: "man-1-2",
            chapterId: "mandukya-ch-1",
            bookId: "mandukya-upanishad",
            verseNumber: 2,
            speaker: "ऋषिः",
            sanskrit: "सर्वं ह्येतद् ब्रह्मायमात्मा ब्रह्म सोऽयमात्मा चतुष्पात् ॥",
            transliteration: "Sarvaṁ hyetad brahmāyamātmā brahma so'yamātmā catuṣpāt ||",
            hindi: "यह सब कुछ निश्चय ही ब्रह्म ही है। यह आत्मा भी ब्रह्म ही है। इस आत्मा के चार पाद (अवस्थाएँ) हैं।",
            english: "All this is verily Brahman. This Self (Atman) is Brahman. This Self has four quarters (states of consciousness).",
            commentary: "One of the 4 Great Upanishadic Mahavakyas: 'Ayam Atma Brahma'.",
            keyWords: ["Ayam Atma Brahma", "Mahavakya", "Brahman"]
          }
        ]
      }
    ]
  },
  {
    id: "mundaka-upanishad",
    titleSanskrit: "मुण्डकोपनिषद्",
    titleHindi: "मुण्डकोपनिषद्",
    titleEnglish: "Mundaka Upanishad",
    category: "Upanishads",
    author: "Atharvaveda Rishis (अथर्ववेद)",
    period: "c. 900 BCE",
    totalChapters: 3,
    sectionLabel: "Mundakas (मुण्डक)",
    coverGradient: "from-purple-950 via-indigo-900 to-slate-950",
    rating: 4.9,
    readCount: 62300,
    isFeatured: false,
    description: "Famous for revealing India's national motto 'Satyameva Jayate' (Truth alone Triumphs) and the metaphor of two birds sitting on the self-same tree.",
    tags: ["Mundaka", "Satyameva Jayate", "Two Birds", "Para Vidya"],
    chapters: [
      {
        id: "mundaka-ch-1",
        bookId: "mundaka-upanishad",
        number: 1,
        sectionName: "Mundaka 3 (तृतीय मुण्डक)",
        titleSanskrit: "सत्यमेव जयते नानृतम्",
        titleHindi: "सत्य की विजय एवं दो पक्षियों का रूपक",
        titleEnglish: "Triumph of Truth & The Metaphor of Two Birds",
        shlokaCount: 2,
        summary: "Describes Higher Knowledge (Para Vidya) versus Lower Knowledge (Apara Vidya) and the glory of Truth.",
        verses: [
          {
            id: "mun-3-1-6",
            chapterId: "mundaka-ch-1",
            bookId: "mundaka-upanishad",
            verseNumber: "३.१.६",
            speaker: "ऋषिः",
            sanskrit: "सत्यमेव जयते नानृतं सत्येन पन्था विततो देवयानः ।\nयेनाक्रमन्त्यृषयो ह्याप्तकामा यत्र तत् सत्यस्य परमं निधानम् ॥",
            transliteration: "Satyameva jayate nānṛtaṁ satyena panthā vitato devayānaḥ |\nYenākramantyrṣayo hyāptakāmā yatra tat satyasya paramaṁ nidhānam ||",
            hindi: "सत्य की ही विजय होती है, असत्य की नहीं। सत्य के द्वारा ही देवयान (दिव्य) मार्ग प्रशस्त होता है, जिससे निष्काम ऋषिगण उस परम पद को प्राप्त करते हैं जहाँ सत्य का परम धाम है।",
            english: "Truth alone triumphs, not untruth. By Truth is paved the divine path, along which sages whose desires are fulfilled ascend to the supreme abode of Truth.",
            commentary: "Source of India's national emblem motto 'Satyameva Jayate'.",
            keyWords: ["Satyameva Jayate", "Truth", "Devayana"]
          }
        ]
      }
    ]
  },
  {
    id: "chandogya-upanishad",
    titleSanskrit: "छान्दोग्योपनिषद्",
    titleHindi: "छान्दोग्योपनिषद्",
    titleEnglish: "Chandogya Upanishad",
    category: "Upanishads",
    author: "Samaveda Chandogya Shakha (सामवेद)",
    period: "c. 1000 BCE",
    totalChapters: 8,
    sectionLabel: "Prapathakas (प्रपाठक)",
    coverGradient: "from-indigo-950 via-slate-900 to-purple-950",
    rating: 5.0,
    readCount: 71200,
    isFeatured: true,
    description: "One of the oldest and largest Upanishads belonging to Samaveda, containing the celebrated Mahavakya 'Tat Tvam Asi' (That Thou Art) imparted by Uddalaka Aruni to his son Svetaketu.",
    tags: ["Tat Tvam Asi", "Chandogya", "Samaveda", "Svetaketu"],
    chapters: [
      {
        id: "chandogya-ch-6",
        bookId: "chandogya-upanishad",
        number: 6,
        sectionName: "Prapathaka 6 (षष्ठ प्रपाठक)",
        titleSanskrit: "तत्त्वमसि उपदेशः",
        titleHindi: "उद्दालक-श्वेतकेतु संवाद: 'तत्त्वमसि'",
        titleEnglish: "The Great Instruction: 'That Thou Art'",
        shlokaCount: 1,
        summary: "Uddalaka uses analogies of clay, gold, salt in water, and banyan seed to teach Svetaketu his identity with the Supreme Reality.",
        verses: [
          {
            id: "chan-6-8-7",
            chapterId: "chandogya-ch-6",
            bookId: "chandogya-upanishad",
            verseNumber: "६.८.७",
            speaker: "उद्दालक आरुणि उवाच",
            sanskrit: "स य एषोऽणिमैतदात्म्यमिदं सर्वं तत्सत्यं स आत्मा तत्त्वमसि श्वेतकेतो इति ॥",
            transliteration: "Sa ya eṣo'ṇimaitadātmyamidaṁ sarvaṁ tatsatyaṁ sa ātmā tattvamasi śvetaketo iti ||",
            hindi: "वह जो यह सूक्ष्म तत्त्व है, यह सब जगत् उसी का रूप है। वही सत्य है, वही आत्मा है; और हे श्वेतकेतु! 'वह (ब्रह्म) तुम ही हो' (तत्त्वमसि)।",
            english: "That which is the subtle essence—in That has all this world its Reality. That is Truth. That is the Self. That Thou Art, O Svetaketu!",
            commentary: "The famous Mahavakya 'Tat Tvam Asi'.",
            keyWords: ["Tat Tvam Asi", "Svetaketu", "Mahavakya"]
          }
        ]
      }
    ]
  },
  {
    id: "brihadaranyaka-upanishad",
    titleSanskrit: "बृहदारण्यकोपनिषद्",
    titleHindi: "बृहदारण्यकोपनिषद्",
    titleEnglish: "Brihadaranyaka Upanishad",
    category: "Upanishads",
    author: "Maharshi Yajnavalkya (महर्षि याज्ञवल्क्य)",
    period: "c. 1100 BCE",
    totalChapters: 6,
    sectionLabel: "Adhyayas (अध्याय)",
    coverGradient: "from-purple-950 via-amber-950 to-slate-950",
    rating: 5.0,
    readCount: 88400,
    isFeatured: true,
    description: "The 'Great Forest Upanishad'—the vastest of all Upanishads, containing Yajnavalkya's dialogues with Maitreyi and Gargi, the Mahavakya 'Aham Brahmasmi', and the 'Asato Ma Sadgamaya' prayer.",
    tags: ["Yajnavalkya", "Maitreyi", "Aham Brahmasmi", "Asato Ma"],
    chapters: [
      {
        id: "brihad-ch-1",
        bookId: "brihadaranyaka-upanishad",
        number: 1,
        sectionName: "Chapter 1 (प्रथमोऽध्यायः)",
        titleSanskrit: "असतो मा सद्गमय - शान्ति प्रार्थना",
        titleHindi: "असतो मा सद्गमय एवं अहम् ब्रह्मास्मि",
        titleEnglish: "Lead Me from Untruth to Truth",
        shlokaCount: 2,
        summary: "Presents the immortal prayer for illumination and the Mahavakya of self-realization.",
        verses: [
          {
            id: "brih-1-3-28",
            chapterId: "brihad-ch-1",
            bookId: "brihadaranyaka-upanishad",
            verseNumber: "१.३.२८",
            speaker: "ऋषिः",
            sanskrit: "असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय ॥\nॐ शान्तिः शान्तिः शान्तिः ॥",
            transliteration: "Asato mā sadgamaya | Tamaso mā jyotirgamaya | Mṛtyormā amṛtaṁ gamaya ||\nOm śāntiḥ śāntiḥ śāntiḥ ||",
            hindi: "मुझे असत्य से सत्य की ओर ले चलो। मुझे अंधकार से प्रकाश की ओर ले चलो। मुझे मृत्यु से अमरता की ओर ले चलो। ॐ शांति!",
            english: "Lead me from Untruth to Truth! Lead me from Darkness to Light! Lead me from Death to Immortality! Om Peace, Peace, Peace!",
            commentary: "The universal Vedic prayer recited daily across the globe.",
            keyWords: ["Asato Ma", "Light", "Truth", "Immortality"]
          },
          {
            id: "brih-1-4-10",
            chapterId: "brihad-ch-1",
            bookId: "brihadaranyaka-upanishad",
            verseNumber: "१.४.१०",
            speaker: "ऋषिः",
            sanskrit: "अहं ब्रह्मास्मीति तस्मात्तत् सर्वमभवत् ॥",
            transliteration: "Ahaṁ brahmāsmīti tasmāttat sarvamabhavat ||",
            hindi: "मैं ब्रह्म हूँ (अहम् ब्रह्मास्मि)—इस रूप में आत्मा ने स्वयं को जाना; इसलिए वह सर्वस्वरूप हो गया।",
            english: "I am Brahman (Aham Brahmasmi)—thus the Self knew itself, and thereby became All.",
            commentary: "The Yajurvedic Mahavakya 'Aham Brahmasmi'.",
            keyWords: ["Aham Brahmasmi", "Mahavakya", "Yajnavalkya"]
          }
        ]
      }
    ]
  },
  {
    id: "taittiriya-upanishad",
    titleSanskrit: "तैत्तिरीयोपनिषद्",
    titleHindi: "तैत्तिरीयोपनिषद्",
    titleEnglish: "Taittiriya Upanishad",
    category: "Upanishads",
    author: "Krishna Yajurveda Taittiriya Shakha (कृष्ण यजुर्वेद)",
    period: "c. 1000 BCE",
    totalChapters: 3,
    sectionLabel: "Vallis (वल्ली)",
    coverGradient: "from-slate-900 via-indigo-950 to-purple-950",
    rating: 4.9,
    readCount: 54100,
    isFeatured: false,
    description: "Famous for detailing the Five Sheaths of Consciousness (Pancha Kosha: Annamaya, Pranamaya, Manomaya, Vijnanamaya, Anandamaya) and the Convocation Advice to Students ('Satyam Vada, Dharmam Chara').",
    tags: ["Taittiriya", "Pancha Kosha", "Satyam Vada", "Anandamaya"],
    chapters: [
      {
        id: "taittiriya-shiksha",
        bookId: "taittiriya-upanishad",
        number: 1,
        sectionName: "Shiksha Valli (शिक्षावल्ली)",
        titleSanskrit: "सत्यं वद धर्मं चर - दीक्षान्त उपदेशः",
        titleHindi: "गुरु का दीक्षान्त उपदेश: सत्य बोलो, धर्म पर चलो",
        titleEnglish: "Convocation Address: Speak Truth, Walk in Righteousness",
        shlokaCount: 1,
        summary: "The teacher gives final ethical instructions to graduating students before they enter householder life.",
        verses: [
          {
            id: "tai-1-11-1",
            chapterId: "taittiriya-shiksha",
            bookId: "taittiriya-upanishad",
            verseNumber: "१.११.१",
            speaker: "गुरु उपदेशः",
            sanskrit: "वेदमनूच्याचार्योऽन्तेवासिनमनुशास्ति ।\nसत्यं वद । धर्मं चर । स्वाध्यायान्मा प्रमदः ॥\nमातृदेवो भव । पितृदेवो भव । आचार्यदेवो भव । अतिथिदेवो भव ॥",
            transliteration: "Vedamanūcyācāryo'ntevāsinamanuśāsti |\nSatyaṁ vada | Dharmaṁ cara | Svādhyāyānmā pramadaḥ ||\nMātṛdevo bhava | Pitṛdevo bhava | Ācāryadevo bhava | Atithidevo bhava ||",
            hindi: "वेद पढ़ाकर आचार्य शिष्य को उपदेश देते हैं: सत्य बोलो। धर्म का आचरण करो। स्वाध्याय में प्रमाद मत करो। माता को देवतुल्य मानो। पिता को देवतुल्य मानो। आचार्य को देवतुल्य मानो। अतिथि को देवतुल्य मानो।",
            english: "Having taught the Vedas, the Teacher instructs the disciple: Speak the Truth. Practice Righteousness. Never neglect self-study. Revere your Mother as Divine, Father as Divine, Teacher as Divine, and Guest as Divine.",
            commentary: "The timeless Ancient Indian Convocation Address.",
            keyWords: ["Satyam Vada", "Dharmam Cara", "Convocation", "Respect"]
          }
        ]
      }
    ]
  },
  {
    id: "shvetashvatara-upanishad",
    titleSanskrit: "श्वेताश्वतरोपनिषद्",
    titleHindi: "श्वेताश्वतरोपनिषद्",
    titleEnglish: "Shvetashvatara Upanishad",
    category: "Upanishads",
    author: "Sage Shvetashvatara (महर्षि श्वेताश्वतर)",
    period: "c. 900 BCE",
    totalChapters: 6,
    sectionLabel: "Adhyayas (अध्याय)",
    coverGradient: "from-purple-950 via-slate-900 to-indigo-950",
    rating: 4.9,
    readCount: 41200,
    isFeatured: false,
    description: "Bridges Upanishadic Vedanta with Shiva Bhakti and Samkhya-Yoga, extolling Rudra-Shiva as the Supreme Lord of the cosmos.",
    tags: ["Shvetashvatara", "Rudra", "Shiva", "Bhakti-Yoga"],
    chapters: [
      {
        id: "shvet-ch-1",
        bookId: "shvetashvatara-upanishad",
        number: 1,
        sectionName: "Chapter 3 (तृतीयोऽध्यायः)",
        titleSanskrit: "एको हि रुद्रो न द्वितीयाय तस्थे",
        titleHindi: "रुद्र-शिव का अद्वितीय स्वरूप",
        titleEnglish: "Rudra: The One Supreme without a Second",
        shlokaCount: 1,
        summary: "Extols Lord Rudra as the sole creator, protector, and dissolver of all worlds.",
        verses: [
          {
            id: "shv-3-2",
            chapterId: "shvet-ch-1",
            bookId: "shvetashvatara-upanishad",
            verseNumber: "३.२",
            speaker: "ऋषिः",
            sanskrit: "एको हि रुद्रो न द्वितीयाय तस्थुर्य इमांँल्लोकानीशत ईशनीभिः ।\nप्रत्यङ् जनाँस्तिष्ठति सञ्चुकोचान्तकाले संसृज्य विश्वा भुवनानि गोपाः ॥",
            transliteration: "Eko hi rudro na dvitīyāya tasthurya imāṁllokānīśata īśanībhiḥ |\nPratyaṅ janāṁstiṣṭhati sañcukocāntakāle saṁsṛjya viśvā bhuvanāni gopāḥ ||",
            hindi: "रुद्र एक ही हैं, उनके अतिरिक्त कोई दूसरा नहीं है। वे ही अपनी शक्तियों द्वारा समस्त लोकों पर शासन करते हैं; वे ही सब जीवों के भीतर विराजमान हैं और अंतकाल में सब भुवनों को अपने में समेट लेते हैं।",
            english: "Rudra is truly One without a second. He rules all the worlds by his sovereign powers. He abides within all beings, and at the end of time dissolves the universe.",
            commentary: "The foundational verse of Shaiva Vedanta.",
            keyWords: ["Rudra", "Shiva", "One without second"]
          }
        ]
      }
    ]
  },

  // ============================================================================
  // THE 18 MAHA-PURANAS (अष्टादश महापुराणानि)
  // ============================================================================
  {
    id: "bhagavata-purana",
    titleSanskrit: "श्रीमद्भागवतपुराणम्",
    titleHindi: "श्रीमद्भागवत पुराण",
    titleEnglish: "Srimad Bhagavata Purana",
    category: "Puranas",
    author: "Maharshi Ved Vyasa / Shukadeva Goswami",
    period: "Ancient Puranic Era",
    totalChapters: 12,
    sectionLabel: "Skandhas (स्कन्ध)",
    coverGradient: "from-emerald-950 via-teal-950 to-slate-900",
    rating: 5.0,
    readCount: 185000,
    isFeatured: true,
    description: "The crown jewel of all Puranas (Purana-Raja) in 18,000 verses, detailing the 24 Avatars of Vishnu, the divine Childhood and Rasa Leela of Sri Krishna, and King Parikshit's liberation.",
    tags: ["Bhagavata", "Krishna", "Shukadeva", "Avatars", "Bhakti"],
    chapters: [
      {
        id: "bhagavata-skandha-1",
        bookId: "bhagavata-purana",
        number: 1,
        sectionName: "Skandha 1 (प्रथम स्कन्ध)",
        titleSanskrit: "प्रथम स्कन्ध - मङ्गलाचरणम्",
        titleHindi: "श्रीमद्भागवत मङ्गलाचरण एवं निगम कल्पतरु",
        titleEnglish: "The Ripe Fruit of the Vedic Tree",
        shlokaCount: 2,
        summary: "Vyasa's magnificent opening invocation declaring Sri Krishna as the Supreme Reality and inviting seekers to drink the nectar of Bhagavata.",
        verses: [
          {
            id: "bhag-1-1-1",
            chapterId: "bhagavata-skandha-1",
            bookId: "bhagavata-purana",
            verseNumber: "१.१.१",
            speaker: "महर्षि व्यासः",
            sanskrit: "जन्माद्यस्य यतोऽन्वयादितरतश्चार्थेष्वभिज्ञः स्वराट् ।\nतेने ब्रह्म हृदा य आदिकवये मुह्यन्ति यत्सूरयः ॥\nधाम्ना स्वेन सदा निरस्तकुहकं सत्यं परं धीमहि ॥",
            transliteration: "Janmādyasya yato'nvayāditarataścārtheṣvabhijñaḥ svarāṭ |\nTene brahma hṛdā ya ādikavaye muhyanti yatsūrayaḥ ||\nDhāmnā svena sadā nirastakuhakaṁ satyaṁ paraṁ dhīmahi ||",
            hindi: "जिनसे इस जगत् की सृष्टि, स्थिति और प्रलय होते हैं; जो स्वतःसिद्ध स्वराट् हैं; जिन्होंने ब्रह्मा के हृदय में वेद का प्रकाश किया—उन निष्कलंक परम सत्य स्वरूप भगवान का हम ध्यान करते हैं।",
            english: "We meditate on the Supreme Absolute Truth, from whom creation, sustenance, and dissolution proceed, who illuminated Brahma's heart with Vedic wisdom.",
            commentary: "The sublime opening shloka of Bhagavata Purana.",
            keyWords: ["Bhagavata", "Janmadyasya", "Supreme Truth"]
          },
          {
            id: "bhag-1-1-3",
            chapterId: "bhagavata-skandha-1",
            bookId: "bhagavata-purana",
            verseNumber: "१.१.३",
            speaker: "सूतो वाच",
            sanskrit: "निगमकल्पतरोर्गलितं फलं शुकमुखादमृतद्रवसंयुतम् ।\nपिबत भागवतं रसमालयं मुहुरहो रसिका भुवि भावुकाः ॥",
            transliteration: "Nigamakalpatarorgalitaṁ phalaṁ śukamukhādamṛtadravasaṁyutam |\nPibata bhāgavataṁ rasamālayaṁ muhuraho rasikā bhuvi bhāvukāḥ ||",
            hindi: "यह श्रीमद्भागवत वेदरूपी कल्पवृक्ष का पका हुआ अमृतमय फल है, जो श्री शुकदेव जी के मुख रूपी तोते के स्पर्श से और भी अधिक रसमय हो गया है। हे रसिक जन! इस भागवतरस का बारम्बार पान करो!",
            english: "This Srimad Bhagavatam is the ripe fruit of the wish-fulfilling tree of Vedic wisdom, dropped from the lips of Shukadeva Goswami. O connoisseurs of divine bliss, drink this nectar continuously!",
            commentary: "Famous verse inviting all to drink the nectar of Krishna Leela.",
            keyWords: ["Nigama Kalpataru", "Shukadeva", "Bhagavata Nectar"]
          }
        ]
      }
    ]
  },
  {
    id: "vishnu-purana",
    titleSanskrit: "विष्णुपुराणम्",
    titleHindi: "विष्णु पुराण",
    titleEnglish: "Vishnu Purana",
    category: "Puranas",
    author: "Maharshi Parasara (महर्षि पराशर)",
    period: "Ancient Puranic Era",
    totalChapters: 6,
    sectionLabel: "Amsas (अंश)",
    coverGradient: "from-emerald-950 via-teal-950 to-slate-950",
    rating: 4.9,
    readCount: 112000,
    isFeatured: true,
    description: "One of the most authentic Pancha-Lakshana Puranas narrated by Sage Parasara to Maitreya, containing the inspiring stories of Dhruva, Prahlada, Samudra Manthan, and Vishnu Avatars.",
    tags: ["Vishnu Purana", "Parasara", "Dhruva", "Prahlada"],
    chapters: [
      {
        id: "vishnu-ch-1",
        bookId: "vishnu-purana",
        number: 1,
        sectionName: "Amsa 1 (प्रथम अंश)",
        titleSanskrit: "ध्रुव चरित्रम् एवं भक्ति निष्ठा",
        titleHindi: "बालक ध्रुव की कठिन तपस्या एवं वरदान",
        titleEnglish: "The Penance of Child Dhruva",
        shlokaCount: 1,
        summary: "Child Dhruva performs unyielding forest penance and receives the darshan of Lord Vishnu.",
        verses: [
          {
            id: "vis-1-1",
            chapterId: "vishnu-ch-1",
            bookId: "vishnu-purana",
            verseNumber: 1,
            speaker: "पराशर उवाच",
            sanskrit: "ॐ नमो भगवते वासुदेवाय ॥\nनमो ब्रह्मण्यदेवाय गोब्राह्मणहिताय च ।\nजगद्धिताय कृष्णाय गोविन्दाय नमो नमः ॥",
            transliteration: "Om Namo Bhagavate Vāsudevāya ||\nNamo brahmaṇyadevāya gobrāhmaṇahitāya ca |\nJagaddhitāya kṛṣṇāya govindāya namo namaḥ ||",
            hindi: "भगवान वासुदेव को प्रणाम! जो गो, वेद और समस्त जगत् का कल्याण करने वाले हैं, उन श्री कृष्ण (गोविंद) को बारंबार नमन।",
            english: "Salutations to Lord Vasudeva! Salutations to Krishna (Govinda), the benefactor of cows, seekers of truth, and the welfare of the entire cosmos.",
            commentary: "Traditional invocation of Vishnu Purana.",
            keyWords: ["Vasudeva", "Govinda", "Protection"]
          }
        ]
      }
    ]
  },
  {
    id: "shiva-purana",
    titleSanskrit: "शिवपुराणम्",
    titleHindi: "शिव पुराण",
    titleEnglish: "Shiva Purana",
    category: "Puranas",
    author: "Maharshi Ved Vyasa (महर्षि वेदव्यास)",
    period: "Ancient Puranic Era",
    totalChapters: 7,
    sectionLabel: "Samhitas (संहिता)",
    coverGradient: "from-slate-900 via-purple-950 to-indigo-950",
    rating: 5.0,
    readCount: 145000,
    isFeatured: true,
    description: "The grand Shaiva Purana detailing the infinite cosmic pillar of light (Jyotirlinga), the divine marriage of Shiva and Parvati, Mahashivratri, and the 12 Jyotirlinga shrines.",
    tags: ["Shiva Purana", "Mahadeva", "Jyotirlinga", "Parvati"],
    chapters: [
      {
        id: "shiva-pur-ch-1",
        bookId: "shiva-purana",
        number: 1,
        sectionName: "Vidyeshvara Samhita (विद्येश्वर संहिता)",
        titleSanskrit: "कर्पूरगौरं करुणावतारम्",
        titleHindi: "महादेव शिव स्तुति एवं लिङ्गोद्भव",
        titleEnglish: "In Praise of Karpura Gauram Shiva",
        shlokaCount: 1,
        summary: "Suta Goswami narrates the divine glory of Mahadeva to the assembly of Rishis in Naimisharanya.",
        verses: [
          {
            id: "shp-1-1",
            chapterId: "shiva-pur-ch-1",
            bookId: "shiva-purana",
            verseNumber: 1,
            speaker: "सूत उवाच",
            sanskrit: "कर्पूरगौरं करुणावतारं संसारसारम् भुजगेन्द्रहारम् ।\nसदावसन्तं हृदयारविन्दे भवं भवानीसहितं नमामि ॥",
            transliteration: "Karpūragauraṁ karuṇāvatāraṁ saṁsārasāram bhujagendrahāram |\nSadāvasantaṁ hṛdayāravinde bhavaṁ bhavānīsahitaṁ namāmi ||",
            hindi: "जो कपूर के समान उज्ज्वल गौर वर्ण वाले हैं, करुणा के अवतार हैं, सर्पों का हार धारण करते हैं—उन भगवान शिव को माता पार्वती सहित अपने हृदय कमल में निवास करने के लिए प्रणाम करता हूँ।",
            english: "I bow to Lord Shiva along with Goddess Parvati, white as camphor, the incarnation of compassion, wearing the serpent king as a garland, ever abiding in my heart.",
            commentary: "Universal Mangalam chant of Shiva Purana.",
            keyWords: ["Karpura Gauram", "Shiva", "Parvati"]
          }
        ]
      }
    ]
  },
  {
    id: "markandeya-purana",
    titleSanskrit: "मार्कण्डेयपुराणम्",
    titleHindi: "मार्कण्डेय पुराण",
    titleEnglish: "Markandeya Purana",
    category: "Puranas",
    author: "Maharshi Markandeya (महर्षि मार्कण्डेय)",
    period: "Ancient Puranic Era",
    totalChapters: 137,
    sectionLabel: "Adhyayas (अध्याय)",
    coverGradient: "from-red-950 via-rose-950 to-amber-950",
    rating: 4.9,
    readCount: 94200,
    isFeatured: true,
    description: "Narrated by the immortal Sage Markandeya, this Purana contains the world-famous 'Durga Saptashati' (Devi Mahatmyam) detailing Goddess Durga's victory over Mahishasura.",
    tags: ["Markandeya", "Durga Saptashati", "Devi Mahatmyam", "Shakti"],
    chapters: [
      {
        id: "devi-mahatmyam",
        bookId: "markandeya-purana",
        number: 81,
        sectionName: "Devi Mahatmyam (देवीमाहात्म्यम्)",
        titleSanskrit: "सर्वमङ्गल माङ्गल्ये - देवी स्तुति",
        titleHindi: "देवी महात्म्य - भगवती दुर्गा स्तुति",
        titleEnglish: "In Praise of the Supreme Goddess Durga",
        shlokaCount: 1,
        summary: "The Devas praise Goddess Narayani upon her victory over evil demons.",
        verses: [
          {
            id: "mar-81-1",
            chapterId: "devi-mahatmyam",
            bookId: "markandeya-purana",
            verseNumber: 1,
            speaker: "देवा ऊचुः",
            sanskrit: "सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके ।\nशरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते ॥",
            transliteration: "Sarvamaṅgalamāṅgalye śive sarvārthasādhike |\nŚaraṇye tryambake gauri nārāyaṇi namo'stu te ||",
            hindi: "हे सर्वमङ्गलमयी! हे कल्याणदायिनी! हे समस्त मनोरथों को पूरा करने वाली! हे शरणागतवत्सला त्रिणयनी गौरी नारायणी! आपको मेरा प्रणाम है!",
            english: "O Auspicious One, the giver of all auspiciousness! O Accomplisher of all goals! O Refuge, Three-eyed Gauri Narayani, salutations unto You!",
            commentary: "The iconic daily verse of Devi Worship across India.",
            keyWords: ["Durga", "Narayani", "Devi Mahatmyam"]
          }
        ]
      }
    ]
  },
  {
    id: "garuda-purana",
    titleSanskrit: "गरुड़पुराणम्",
    titleHindi: "गरुड़ पुराण",
    titleEnglish: "Garuda Purana",
    category: "Puranas",
    author: "Lord Vishnu to Garuda (महर्षि वेदव्यास)",
    period: "Ancient Puranic Era",
    totalChapters: 2,
    sectionLabel: "Khandas (काण्ड)",
    coverGradient: "from-amber-950 via-stone-900 to-slate-950",
    rating: 4.8,
    readCount: 118000,
    isFeatured: false,
    description: "The dialogue between Lord Vishnu and His vehicle Garuda explaining the journey of the soul after death, the laws of Karma, rebirth, rites for ancestors (Shraddha), and liberation.",
    tags: ["Garuda Purana", "Karma", "Rebirth", "Afterlife", "Vishnu"],
    chapters: [
      {
        id: "garuda-ch-1",
        bookId: "garuda-purana",
        number: 1,
        sectionName: "Preta Kalpa (प्रेत कल्प)",
        titleSanskrit: "कर्मविपाकः एवं जीव गतिः",
        titleHindi: "कर्मफल सिद्धांत एवं आत्मा का पथ",
        titleEnglish: "The Law of Karma & Soul's Journey",
        shlokaCount: 1,
        summary: "Lord Vishnu explains how every action leaves a karmic footprint guiding the soul's future birth.",
        verses: [
          {
            id: "gar-1-1",
            chapterId: "garuda-ch-1",
            bookId: "garuda-purana",
            verseNumber: 1,
            speaker: "श्रीभगवानुवाच",
            sanskrit: "न कर्म नश्यते क्वचित् कल्पकोटिशतैरपि ।\nअवश्यमेव भोक्तव्यं कृतं कर्म शुभाशुभम् ॥",
            transliteration: "Na karma naśyate kvacit kalpakoṭiśatairapi |\nAvaśyameva bhoktavyaṁ kṛtaṁ karma śubhāśubham ||",
            hindi: "सौ करोड़ कल्पों में भी किया हुआ कर्म नष्ट नहीं होता; मनुष्य को अपने शुभ या अशुभ कर्मों का फल अवश्य ही भोगना पड़ता है।",
            english: "Actions performed are never destroyed, even in hundreds of millions of cosmic ages; one must inevitably experience the consequences of one's good or bad deeds.",
            commentary: "The foundational law of Karma as expounded in Garuda Purana.",
            keyWords: ["Garuda", "Karma", "Rebirth"]
          }
        ]
      }
    ]
  },
  {
    id: "skanda-purana",
    titleSanskrit: "स्कन्दपुराणम्",
    titleHindi: "स्कन्द पुराण",
    titleEnglish: "Skanda Purana",
    category: "Puranas",
    author: "Maharshi Ved Vyasa (महर्षि वेदव्यास)",
    period: "Ancient Puranic Era",
    totalChapters: 7,
    sectionLabel: "Khandas (खण्ड)",
    coverGradient: "from-purple-950 via-amber-950 to-slate-900",
    rating: 4.9,
    readCount: 76500,
    isFeatured: false,
    description: "The largest of all 18 Puranas (81,100 verses) dedicated to Skanda (Kartikeya), containing the Kashi Khanda, Utkala Khanda (Jagannath Puri), and Arunachala Mahatmya.",
    tags: ["Skanda Purana", "Kartikeya", "Kashi Khanda", "Tirthas"],
    chapters: [
      {
        id: "skanda-ch-1",
        bookId: "skanda-purana",
        number: 1,
        sectionName: "Maheshvara Khanda (माेश्वर खण्ड)",
        titleSanskrit: "काशी महिमा - मोक्ष नगरी",
        titleHindi: "काशी की दिव्य महिमा",
        titleEnglish: "The Divine Glory of Kashi",
        shlokaCount: 1,
        summary: "Extols Kashi (Varanasi) as the immortal abode of Lord Shiva where liberation is granted to all living beings.",
        verses: [
          {
            id: "ska-1-1",
            chapterId: "skanda-ch-1",
            bookId: "skanda-purana",
            verseNumber: 1,
            speaker: "स्कन्द उवाच",
            sanskrit: "काशी क्षेत्रं तदेवेदं यत्र सर्वैर्महात्मभिः ।\nलभ्यते शिवसायुज्यं न पुनर्जन्म विद्यते ॥",
            transliteration: "Kāśī kṣetraṁ tadevedaṁ yatra sarvairmahātmabhiḥ |\nLabhyate śivasāyujyaṁ na punarjanma vidyate ||",
            hindi: "काशी वह परम पवित्र क्षेत्र है जहाँ महात्माओं को शिव-सायुज्य (मोक्ष) की प्राप्ति होती है और पुनः इस संसार में जन्म नहीं होता।",
            english: "Kashi indeed is that sacred land where seekers attain oneness with Shiva and are never born again in this mortal world.",
            commentary: "Celebrated shloka from Skanda Purana's Kashi Khanda.",
            keyWords: ["Kashi", "Skanda Purana", "Moksha"]
          }
        ]
      }
    ]
  },
  {
    id: "brahma-vaivarta-purana",
    titleSanskrit: "ब्रह्मवैवर्तपुराणम्",
    titleHindi: "ब्रह्मवैवर्त पुराण",
    titleEnglish: "Brahma Vaivarta Purana",
    category: "Puranas",
    author: "Maharshi Ved Vyasa (महर्षि वेदव्यास)",
    period: "Ancient Puranic Era",
    totalChapters: 4,
    sectionLabel: "Khandas (खण्ड)",
    coverGradient: "from-pink-950 via-rose-950 to-amber-950",
    rating: 4.8,
    readCount: 52400,
    isFeatured: false,
    description: "Focuses on the divine eternal realm of Goloka Vrindavan and the transcendental pastimes of Radha and Krishna as the Supreme Source of all creation.",
    tags: ["Radha", "Krishna", "Goloka", "Brahma Vaivarta"],
    chapters: [
      {
        id: "bv-ch-1",
        bookId: "brahma-vaivarta-purana",
        number: 4,
        sectionName: "Srikrishna Janma Khanda (श्रीकृष्णजन्मखण्ड)",
        titleSanskrit: "राधा कृष्ण अद्वैत स्वरूपम्",
        titleHindi: "राधा और कृष्ण का अद्वैत प्रेम स्वरूप",
        titleEnglish: "The Oneness of Radha & Krishna",
        shlokaCount: 1,
        summary: "Describes Radha and Krishna as one soul in two divine manifestations.",
        verses: [
          {
            id: "bv-4-1",
            chapterId: "bv-ch-1",
            bookId: "brahma-vaivarta-purana",
            verseNumber: 1,
            speaker: "श्रीभगवानुवाच",
            sanskrit: "यथा त्वं तद्वदहञ्चैव नास्ति भेदो मयोस्तयोः ।\nयथा क्षीरे धावल्यञ्च यथाग्नौ दाहिका स्थिता ॥",
            transliteration: "Yathā tvaṁ tadvadahañcaiva nāsti bhedo mayostayoḥ |\nYathā kṣīre dhāvalyañca yathāgnau dāhikā sthitā ||",
            hindi: "भगवान कृष्ण राधा जी से कहते हैं: जैसी तुम हो, वैसा ही मैं हूँ; हम दोनों में कोई भेद नहीं है—जैसे दूध और उसकी सफेदी में, अथवा अग्नि और उसकी दाहिका शक्ति में भेद नहीं होता।",
            english: "Lord Krishna tells Radha: As You are, so am I; there is no difference between us—just as there is no difference between milk and its whiteness, or fire and its power to burn.",
            commentary: "Core philosophical declaration of Radha-Krishna oneness.",
            keyWords: ["Radha", "Krishna", "Goloka", "Oneness"]
          }
        ]
      }
    ]
  },
  {
    id: "brahmanda-purana",
    titleSanskrit: "ब्रह्माण्डपुराणम्",
    titleHindi: "ब्रह्माण्ड पुराण",
    titleEnglish: "Brahmanda Purana",
    category: "Puranas",
    author: "Maharshi Ved Vyasa / Sage Hayagriva",
    period: "Ancient Puranic Era",
    totalChapters: 3,
    sectionLabel: "Bhagas (भाग)",
    coverGradient: "from-purple-950 via-rose-950 to-slate-900",
    rating: 4.9,
    readCount: 68100,
    isFeatured: false,
    description: "Famous for including the holy 'Lalita Sahasranama' (1000 names of Divine Mother Lalita Tripura Sundari) and the Adhyatma Ramayana.",
    tags: ["Brahmanda", "Lalita Sahasranama", "Cosmic Egg", "Devi"],
    chapters: [
      {
        id: "lalita-sahasranama",
        bookId: "brahmanda-purana",
        number: 3,
        sectionName: "Lalita Sahasranama (ललिता सहस्रनाम)",
        titleSanskrit: "श्रीमाता श्रीमहाराज्ञी - ललिता ध्यानम्",
        titleHindi: "श्री ललिता त्रिपुरसुन्दरी ध्यान श्लोक",
        titleEnglish: "Meditation on Divine Mother Tripura Sundari",
        shlokaCount: 1,
        summary: "Lord Hayagriva instructs Agastya Rishi in the 1000 names of the Divine Mother.",
        verses: [
          {
            id: "lal-1",
            chapterId: "lalita-sahasranama",
            bookId: "brahmanda-purana",
            verseNumber: 1,
            speaker: "हयग्रीव उवाच",
            sanskrit: "श्रीमाता श्रीमहाराज्ञी श्रीमत्सिंहासनेश्वरी ।\nचिदग्नि कुण्डसम्भूता देवकार्यसमुद्यता ॥",
            transliteration: "Śrīmātā śrīmahārājñī śrīmatsiṁhāsaneśvarī |\nCidagni kuṇḍasambhūtā devakāryasamudyatā ||",
            hindi: "श्रीमाता (परम जननी), श्रीमहाराज्ञी (ब्रह्मांड की सम्राज्ञी), श्रीमत्सिंहासन पर विराजमान ईश्वरी, जो चिदग्नि कुण्ड से प्रकट हुई और देवकार्य के संपादन के लिए उद्यत हैं!",
            english: "Salutations to the Sacred Mother, the Great Empress, seated on the glorious throne, arisen from the fire-altar of pure Consciousness for the divine welfare of all!",
            commentary: "The opening verse of Lalita Sahasranama from Brahmanda Purana.",
            keyWords: ["Lalita Sahasranama", "Divine Mother", "Brahmanda Purana"]
          }
        ]
      }
    ]
  },

  // ============================================================================
  // VEDAS COLLECTION (चार वेद - RIG, YAJUR, SAMA, ATHARVA)
  // ============================================================================
  {
    id: "rigveda",
    titleSanskrit: "ऋग्वेद संहिता",
    titleHindi: "ऋग्वेद संहिता",
    titleEnglish: "Rigveda Samhita",
    category: "Vedas",
    author: "Apaurusheya / Vedic Rishis (ऋषिगण)",
    period: "c. 1500 BCE - 2000 BCE",
    totalChapters: 10,
    sectionLabel: "Mandalas (मण्डल)",
    coverGradient: "from-rose-950 via-amber-950 to-yellow-950",
    rating: 5.0,
    readCount: 94500,
    isFeatured: true,
    description: "The oldest scripture of humanity, containing 1,028 hymns (Suktas) in 10 Mandalas dedicated to Agni, Indra, Varuna, Mitra, Savitur, and the Supreme Cosmic Order (Rta).",
    tags: ["Rigveda", "Gayatri", "Agni", "Nasadiya", "Vedas"],
    chapters: [
      {
        id: "rigveda-ch-1",
        bookId: "rigveda",
        number: 1,
        sectionName: "Mandala 1 (प्रथम मण्डल)",
        titleSanskrit: "अग्निमीळे पुरोहितम् - प्रथम मन्त्रः",
        titleHindi: "ऋग्वेद का प्रथम अग्नि सूक्त मन्त्र",
        titleEnglish: "The First Hymn to Agni (Divine Fire)",
        shlokaCount: 1,
        summary: "The opening verse of the entire Rigveda invoking Agni, the divine messenger and illuminator.",
        verses: [
          {
            id: "rv-1-1-1",
            chapterId: "rigveda-ch-1",
            bookId: "rigveda",
            verseNumber: "१.१.१",
            speaker: "महर्षि विश्वामित्रः",
            sanskrit: "ॐ अग्निमीळे पुरोहितं यज्ञस्य देवमृत्विजम् ।\nहोतारं रत्नधातमम् ॥",
            transliteration: "Om agnimīḷe purohitaṁ yajñasya devamṛtvijam |\nHotāraṁ ratnadhātamam ||",
            hindi: "मैं यज्ञ के पुरोहित, दिव्य रश्मियुक्त देव, ऋत्विज्, और रत्नों को धारण कराने वाले परम तेजस्वी 'अग्नि' की स्तुति करता हूँ।",
            english: "Om! I praise Agni, the priest of the sacrifice, the divine minister, the caller of the gods, and the bestower of supreme treasures.",
            commentary: "The historic first verse of Rigveda.",
            keyWords: ["Rigveda", "Agni", "Sacrifice"]
          }
        ]
      }
    ]
  },
  {
    id: "yajurveda",
    titleSanskrit: "यजुर्वेद संहिता",
    titleHindi: "यजुर्वेद संहिता",
    titleEnglish: "Yajurveda Samhita",
    category: "Vedas",
    author: "Apaurusheya / Yajurvedic Rishis",
    period: "c. 1200 BCE",
    totalChapters: 40,
    sectionLabel: "Adhyayas (अध्याय)",
    coverGradient: "from-amber-950 via-rose-950 to-orange-950",
    rating: 4.9,
    readCount: 52100,
    isFeatured: false,
    description: "The Veda of sacrificial formulas and rituals divided into Shukla (White) and Krishna (Black) Yajurveda, containing the Rudram, Chamakam, and Isha Upanishad.",
    tags: ["Yajurveda", "Rudram", "Yajna", "Vedas"],
    chapters: [
      {
        id: "shri-rudram",
        bookId: "yajurveda",
        number: 16,
        sectionName: "Adhyaya 16 (श्रीरुद्रम्)",
        titleSanskrit: "श्रीरुद्रप्रत्न सूक्तम् - नमकम",
        titleHindi: "श्री रुद्रम् नमसम्वाद्",
        titleEnglish: "Shri Rudram: Salutations to the All-Pervading Shiva",
        shlokaCount: 1,
        summary: "Extols Rudra-Shiva as manifest in all nature, plants, trees, animals, and cosmic forces.",
        verses: [
          {
            id: "yaj-16-1",
            chapterId: "shri-rudram",
            bookId: "yajurveda",
            verseNumber: "१६.१",
            speaker: "यजुर्वेद मन्त्रः",
            sanskrit: "ॐ नमस्ते रुद्र मन्यव उतो त इषवे नमः ।\nनमस्ते अस्तु धन्वने बाहुभ्यामुत ते नमः ॥",
            transliteration: "Om namaste rudra manyava uto ta iṣave namaḥ |\nNamaste astu dhanvane bāhubhyāmuta te namaḥ ||",
            hindi: "हे रुद्र! आपके क्रोध को प्रणाम! आपके बाण को प्रणाम! आपके धनुष और आपकी दोनों भुजाओं को मेरा बारम्बार प्रणाम!",
            english: "Om! Salutations to Your wrath, O Rudra! Salutations to Your arrow, Your bow, and to Your divine arms!",
            commentary: "Opening verse of the Shri Rudram from Krishna Yajurveda Taittiriya Samhita.",
            keyWords: ["Rudram", "Shiva", "Yajurveda"]
          }
        ]
      }
    ]
  },
  {
    id: "samaveda",
    titleSanskrit: "सामवेद संहिता",
    titleHindi: "सामवेद संहिता",
    titleEnglish: "Samaveda Samhita",
    category: "Vedas",
    author: "Apaurusheya / Samavedic Chanthors",
    period: "c. 1200 BCE",
    totalChapters: 2,
    sectionLabel: "Archikas (आर्चिक)",
    coverGradient: "from-purple-950 via-indigo-950 to-amber-950",
    rating: 4.9,
    readCount: 46200,
    isFeatured: false,
    description: "The Veda of sacred musical melodies and chanting. Lord Krishna declares in Bhagavad Gita 10.22: 'Among the Vedas, I am the Samaveda' (वेदानां सामवेदोऽस्मि).",
    tags: ["Samaveda", "Chants", "Music", "Vedas"],
    chapters: [
      {
        id: "samaveda-ch-1",
        bookId: "samaveda",
        number: 1,
        sectionName: "Purvarchika (पूर्वाचिक)",
        titleSanskrit: "सामगानम् - ओग्न आयाहि वीतये",
        titleHindi: "सामवेद का मधुर साम गान",
        titleEnglish: "The Sacred Melodic Chants",
        shlokaCount: 1,
        summary: "The opening musical chant of Samaveda dedicated to Agni.",
        verses: [
          {
            id: "sv-1-1",
            chapterId: "samaveda-ch-1",
            bookId: "samaveda",
            verseNumber: "१.१",
            speaker: "सामगान मन्त्रः",
            sanskrit: "ॐ अग्न आयाहि वीतये गृणानो हव्यदातये ।\nनि होता सत्सि बर्हिषि ॥",
            transliteration: "Om agna āyāhi vītaye gṛṇāno havyadātaye |\nNi hotā satsi barhiṣi ||",
            hindi: "हे प्रकाशमय अग्निदेव! हमारी स्तुति से प्रसन्न होकर हमारे दिव्य हविष्य का स्वीकार करने के लिए पधारिए और कुशा के पवित्र आसन पर विराजमान होइए।",
            english: "Om! O Agni, come for our illumination! Praised by our songs, come to accept our offerings and sit upon the sacred grass seat.",
            commentary: "Opening musical stanza of Samaveda.",
            keyWords: ["Samaveda", "Music", "Agni"]
          }
        ]
      }
    ]
  },
  {
    id: "atharvaveda",
    titleSanskrit: "अथर्ववेद संहिता",
    titleHindi: "अथर्ववेद संहिता",
    titleEnglish: "Atharvaveda Samhita",
    category: "Vedas",
    author: "Maharshi Atharvan & Angiras",
    period: "c. 1000 BCE",
    totalChapters: 20,
    sectionLabel: "Kandas (काण्ड)",
    coverGradient: "from-teal-950 via-emerald-950 to-slate-950",
    rating: 4.9,
    readCount: 58900,
    isFeatured: false,
    description: "The Veda of practical daily wisdom, herbal medicine (Ayurveda roots), environmental protection (Prithvi Sukta), peace, statecraft, and scientific inquiry.",
    tags: ["Atharvaveda", "Prithvi Sukta", "Ayurveda", "Vedas"],
    chapters: [
      {
        id: "prithvi-sukta",
        bookId: "atharvaveda",
        number: 12,
        sectionName: "Kanda 12 (माता भूमिः पुत्रोऽहं पृथिव्याः)",
        titleSanskrit: "पृथ्वी सूक्तम् - पर्यावरण वन्दना",
        titleHindi: "पृथ्वी सूक्त - 'माता भूमिः पुत्रोऽहं पृथिव्याः'",
        titleEnglish: "Prithvi Sukta: Earth is My Mother, I am Her Child",
        shlokaCount: 1,
        summary: "The world's oldest environmental anthem extolling Mother Earth as sacred and sustaining for all life.",
        verses: [
          {
            id: "av-12-1-12",
            chapterId: "prithvi-sukta",
            bookId: "atharvaveda",
            verseNumber: "१२.१.१२",
            speaker: "महर्षि अथर्वा",
            sanskrit: "माता भूमिः पुत्रोऽहं पृथिव्याः ।\nपर्जन्यः पिता स उ नः पिपर्तु ॥",
            transliteration: "Mātā bhūmiḥ putro'haṁ pṛthivyāḥ |\nParjanyaḥ pitā sa u naḥ pipartu ||",
            hindi: "यह भूमि मेरी माता है और मैं इस पृथ्वी का पुत्र हूँ! मेघ (पर्जन्य) मेरे पिता हैं, वे हमारा संवर्धन करें।",
            english: "Earth is my Mother; I am the child of the Earth! Rain is my Father; may he nourish and sustain us all.",
            commentary: "The ancient Vedic declaration of environmental reverence.",
            keyWords: ["Mata Bhumi", "Mother Earth", "Atharvaveda"]
          }
        ]
      }
    ]
  }
];
