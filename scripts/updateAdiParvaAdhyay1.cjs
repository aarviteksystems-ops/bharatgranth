const fs = require('fs');
const path = require('path');

// Complete authentic shlokas for Mahabharata Adi Parva Adhyaya 1 (Anukramanika Parva)
const ADHYAY_1_VERSES = [
  {
    verseNumber: 1,
    speaker: "मङ्गलाचरणम्",
    sanskrit: "नारायणं नमस्कृत्य नरं चैव नरोत्तमम् ।\nदेवीं सरस्वतीं व्यासं ततो जयमुदीरयेत् ॥",
    transliteration: "Nārāyaṇaṁ namaskṛtya naraṁ caiva narottamam |\nDevīṁ sarasvatīṁ vyāsaṁ tato jayamudīrayet ||",
    hindi: "भगवान श्रीनारायण, मनुष्यों में सर्वश्रेष्ठ नर (भगवान् अर्जुन), भगवती सरस्वती और महर्षि वेदव्यास को नमस्कार करके 'जय' नामक महाभारत इतिहास का पाठ करना चाहिए।",
    english: "Before reciting the sacred history of 'Jaya' (the Mahabharata), one must bow down to Lord Narayana, Nara (the foremost of men), Mother Goddess Saraswati, and sage Vedavyasa.",
    commentary: "The supreme mangalacharan (invocation) chanted at the beginning of all Vedic itihasa-purana recitations.",
    keyWords: ["Narayana", "Nara", "Saraswati", "Vyasa", "Jaya", "Invocation"]
  },
  {
    verseNumber: 2,
    speaker: "सूत आगमन",
    sanskrit: "लोमहर्षणपुत्र उग्रश्रवाः सूतः पौराणिको नैमिषारण्ये शौनकस्य कुलपतेर्द्वादशवार्षिके सत्रे ॥",
    transliteration: "Lomaharṣaṇaputra ugraśravāḥ sūtaḥ paurāṇiko naimiṣāraṇye śaunakasya kulapaterdvādaśavārṣike satre ||",
    hindi: "पुराणवेत्ता लोमहर्षण के पुत्र उग्रश्रवा सौति नैमिषारण्य में कुलपति महर्षि शौनक के बारह वर्षों तक चलने वाले महान यज्ञ-सत्र में पधारे।",
    english: "Ugrasrava Sauti, the son of Lomaharshana and master of ancient lore, arrived at the sacred Naimisha forest during the twelve-year sacrifice of Chancellor Shaunaka.",
    commentary: "Sets the eternal stage of the Mahabharata narration in the Naimisharanya pilgrimage.",
    keyWords: ["Ugrasrava", "Lomaharshana", "Shaunaka", "Naimisharanya", "Yajna"]
  },
  {
    verseNumber: 3,
    speaker: "ऋषि-सूत समागम",
    sanskrit: "तमाश्रममनुप्राप्तं नैमिषारण्यवासिनाम् ।\nचित्राः श्रोतुं कथास्तत्र परिवव्रुस्तपस्विनः ॥",
    transliteration: "Tamāśramamanuprāptaṁ naimiṣāraṇyavāsinām |\nCitrāḥ śrotuṁ kathāstatra parivavrustapasvinaḥ ||",
    hindi: "नैमिषारण्यवासी तपस्वियों ने जब उग्रश्रवा सौति को अपने आश्रम में आया देखा, तो विचित्र और अद्भुत कथाएँ सुनने की इच्छा से वे सब उनके चारों ओर एकत्र हो गए।",
    english: "When the ascetic dwellers of Naimisharanya saw Sauti arrive in their hermitage, they gathered around him eager to hear wondrous and sublime histories.",
    commentary: "The eager assembly of Rishis surrounding Sauti to receive divine wisdom.",
    keyWords: ["Hermitage", "Naimisharanya", "Ascetics", "Wisdom", "Stories"]
  },
  {
    verseNumber: 4,
    speaker: "सूत जी",
    sanskrit: "अभिवाद्य मुनींस्तांस्तु सर्वानेव कृताञ्जलिः ।\nअपृच्छत् स तपोवृद्धिं सद्भिश्चैवाभिपूजितः ॥",
    transliteration: "Abhivādya munīṁstāṁstu sarvāneva kṛtāñjaliḥ |\nApṛcchat sa tapovṛddhiṁ sadbhiścaivābhipūjitaḥ ||",
    hindi: "उग्रश्रवा जी ने हाथ जोड़कर उन सभी मुनियों को प्रणाम किया और उनकी तपस्या की वृद्धि एवं कुशल-क्षेम पूछा। उन सत्पुरुष ऋषियों ने भी उनका यथोचित आदर-सत्कार किया।",
    english: "Folding his hands reverently, Sauti bowed to all the sages and inquired about the progress of their penance, while the noble sages welcomed him with utmost honor.",
    commentary: "Reflects the ancient Vedic culture of mutual reverence between preceptors and ascetics.",
    keyWords: ["Reverence", "Munis", "Penance", "Hospitality"]
  },
  {
    verseNumber: 5,
    speaker: "सूत जी",
    sanskrit: "अथ तेषूपविष्टेषु सर्वेष्वेव तपस्विषु ।\nनिर्दिष्टमासनं भेजे विनयाल्लोमहर्षणिः ॥",
    transliteration: "Atha teṣūpaviṣṭeṣu sarveṣveva tapasviṣu |\nNirdiṣṭamāsanaṁ bheje vinayāllomaharṣaṇiḥ ||",
    hindi: "जब वे सभी तपस्वी अपने-अपने आसनों पर विराजमान हो गए, तब लोमहर्षण-पुत्र उग्रश्रवा ने बड़ी नम्रता के साथ अपने लिए निर्दिष्ट आसन ग्रहण किया।",
    english: "When all the sages had taken their seats, the humble son of Lomaharshana respectfully sat upon the exalted seat offered to him.",
    commentary: "Sauti's humility despite being the grand storyteller of the cosmos.",
    keyWords: ["Asana", "Humility", "Seating", "Assembly"]
  },
  {
    verseNumber: 6,
    speaker: "ऋषि प्रश्न",
    sanskrit: "सुखासीनं ततस्तं तु विश्रान्तमुपलक्ष्य च ।\nअथापृच्छदृषिस्तत्र कश्चित् प्रस्तावयन् कथाः ॥",
    transliteration: "Sukhāsīnaṁ tatastaṁ tu viśrāntamupalakṣya ca |\nAthāpṛcchadṛṣistatra kaścit prastāvayan kathāḥ ||",
    hindi: "जब ऋषियों ने देखा कि सौति सुखपूर्वक बैठ गए हैं और मार्ग की थकान से विश्राम पा चुके हैं, तब उनमें से एक मुनि ने कथा का प्रसंग उठाते हुए उनसे प्रश्न किया।",
    english: "Seeing that Sauti was comfortably seated and refreshed from his journey, one of the foremost sages initiated the discourse with inquiries.",
    commentary: "The dialogue begins following traditional etiquette of rest and comfort.",
    keyWords: ["Discourse", "Inquiry", "Dialogue", "Rest"]
  },
  {
    verseNumber: 7,
    speaker: "शौनक ऋषि",
    sanskrit: "कुत आगम्यते सौते क्व चायं विहृतस्त्वया ।\nकालः कमलपत्राक्ष शंस मे पृच्छतो द्विज ॥",
    transliteration: "Kuta āgamyate saute kva cāyaṁ vihṛtastvayā |\nKālaḥ kamalapatrākṣa śaṁsa me pṛcchato dvija ||",
    hindi: "ऋषि ने पूछा: हे कमलनयन सौते! आप कहाँ से पधार रहे हैं और आपने अपना समय कहाँ व्यतीत किया? मेरे पूछने पर यह सब विस्तार से बताइए।",
    english: "The sage asked: O lotus-eyed Sauti! Whence are you coming, and where have you spent your time? Tell us who inquire of you with keen devotion.",
    commentary: "The sage affectionately invites Sauti to share the latest sacred events across Bharatavarsha.",
    keyWords: ["Shaunaka", "Inquiry", "Journey", "Pilgrimage"]
  },
  {
    verseNumber: 8,
    speaker: "सौति उवाच",
    sanskrit: "जनमेजयस्य राजर्षेः सर्पसत्रे महात्मनः ।\nसमीपे पार्थिवेन्द्रस्य सम्यक् पारिक्षितस्य च ॥",
    transliteration: "Janamejayasya rājarṣeḥ sarpasatre mahātmanaḥ |\nSamīpe pārthivendrasya samyak pārikṣitasya ca ||",
    hindi: "सौति ने कहा: महात्मा राजर्षि परीक्षितपुत्र जनमेजय के महान सर्पसत्र यज्ञ में मैं उपस्थित था, जहाँ राजाधिराज के समीप कथाएँ हुई थीं।",
    english: "Sauti replied: I was present at the great Sarpa Satra (snake-sacrifice) of the high-souled royal sage Janamejaya, the illustrious son of Parikshit.",
    commentary: "Identifies the historical root: Janamejaya's Sarpa Satra at Takshashila.",
    keyWords: ["Janamejaya", "Parikshit", "Sarpa Satra", "Snake Sacrifice"]
  },
  {
    verseNumber: 9,
    speaker: "सौति उवाच",
    sanskrit: "कृष्णद्वैपायनप्रोक्ताः सुपुण्या विविधाः कथाः ।\nकथिताश्चापि विधिवद् या वैशम्पायनेन वै ॥",
    transliteration: "Kṛṣṇadvaipāyanaproktāḥ supuṇyā vividhāḥ kathāḥ |\nKathitāścāpi vidhivad yā vaiśampāyanena vai ||",
    hindi: "वहाँ भगवान् कृष्णद्वैपायन (व्यास) द्वारा रचित परम पवित्र विविध कथाओं को उनके प्रमुख शिष्य वैशम्पायन जी ने विधिपूर्वक सुनाया था।",
    english: "There, the supremely auspicious sacred histories composed by Krishna Dvaipayana Vyasa were systematically narrated by his chief disciple Vaishampayana.",
    commentary: "Transmission lineage: Vyasa to Vaishampayana, and Vaishampayana to Sauti at Janamejaya's court.",
    keyWords: ["Krishna Dvaipayana", "Vyasa", "Vaishampayana", "Parampara"]
  },
  {
    verseNumber: 10,
    speaker: "सौति उवाच",
    sanskrit: "श्रुत्वाहं ता विचित्रार्था महाभारतसंश्रिताः ।\nबहूनि संपरिक्रम्य तीर्थान्यायतनानि च ॥",
    transliteration: "Śrutvāhaṁ tā vicitrārthā mahābhāratasaṁśritāḥ |\nBahūni saṁparikramya tīrthānyāyatanāni ca ||",
    hindi: "महाभारत के उन विचित्र एवं गूढ़ अर्थों से युक्त उपाख्यानों को सुनकर, मैंने अनेक पवित्र तीर्थों और देवस्थानों की परिक्रमा की।",
    english: "Having heard those wondrous narratives comprising the Mahabharata, I traveled around visiting countless sacred tirthas and holy shrines across the land.",
    commentary: "Sauti journeyed through all sacred tirthas absorbing the spiritual essence.",
    keyWords: ["Mahabharata", "Tirtha", "Pilgrimage", "Sacred Sites"]
  },
  {
    verseNumber: 11,
    speaker: "सौति उवाच",
    sanskrit: "समन्तपञ्चकं नाम पुण्यं द्विजवरार्चितम् ।\nगतोऽस्मि तं देशमितः पूर्वं युद्धास्पदं हि तत् ॥",
    transliteration: "Samantapañcakaṁ nāma puṇyaṁ dvijavarārcitam |\nGato'smi taṁ deśamitaḥ pūrvaṁ yuddhāspadaṁ hi tat ||",
    hindi: "वहाँ से मैं 'समन्तपञ्चक' (कुरुक्षेत्र) नामक उस परम पवित्र क्षेत्र में गया, जहाँ पूर्वकाल में कौरव-पाण्डवों का महायुद्ध हुआ था।",
    english: "Before arriving here, I visited the sacred land known as Samantapanchaka (Kurukshetra), reverenced by the best of Brahmins, where the great battle was fought.",
    commentary: "Samantapanchaka is the ancient holy field where Parashurama did penance and where Kurukshetra war took place.",
    keyWords: ["Samantapanchaka", "Kurukshetra", "Battlefield", "Holy Field"]
  },
  {
    verseNumber: 12,
    speaker: "सौति उवाच",
    sanskrit: "ततस्तं देशमवलोक्य भवतोऽभिगतान्हि माम् ।\nद्रष्टुमिच्छामि पुण्यात्माञ्श्रोतुमिच्छामि चाशिषः ॥",
    transliteration: "Tatastaṁ deśamavalokya bhavato'bhigatānhi mām |\nDraṣṭumicchāmi puṇyātmāñśrotumicchāmi cāśiṣaḥ ||",
    hindi: "उस कुरुक्षेत्र भूमि के दर्शन करके मैं आप सभी पुण्यात्मा महर्षियों के दर्शनार्थ यहाँ आया हूँ, ताकि आपके पावन आशीर्वाद प्राप्त कर सकूँ।",
    english: "Beholding that holy land, I have now come to see you all, pure-souled sages, and to receive your blessed grace.",
    commentary: "Sauti's devotion to the assembly of sages at Naimisharanya.",
    keyWords: ["Blessings", "Darshan", "Aspirations", "Grace"]
  },
  {
    verseNumber: 13,
    speaker: "सौति उवाच",
    sanskrit: "अपि चेदं नमस्कृत्य ब्रह्मर्षीन् वेदपारगान् ।\nशंसामि भरतोपाख्यानं पुण्यं पापनाशनम् ॥",
    transliteration: "Api cedaṁ namaskṛtya brahmarṣīn vedapāragān |\nŚaṁsāmi bharatopākhyānaṁ puṇyaṁ pāpanāśanam ||",
    hindi: "वेदपारंगत समस्त ब्रह्मर्षियों को नमन करते हुए मैं आप सबको यह पवित्र एवं समस्त पापों का नाश करने वाला महाभारताख्यान सुनाना चाहता हूँ।",
    english: "Saluting all the Vedic seers and masters of wisdom, I am prepared to recount the holy Mahabharata chronicle that destroys all sins.",
    commentary: "Proposes the complete recitation of Mahabharata.",
    keyWords: ["Vedas", "Sin-Destroying", "Mahabharata", "Recitation"]
  },
  {
    verseNumber: 14,
    speaker: "ऋषय ऊचुः",
    sanskrit: "द्वैपायनेन यत् प्रोक्तं पुराणं परमर्षिणा ।\nसुरैर्ब्रह्मर्षिभिश्चैव श्रुत्वा यदभिपूजितम् ॥",
    transliteration: "Dvaipāyanena yat proktaṁ purāṇaṁ paramarṣiṇā |\nSurairbrahmarṣibhiścaiva śrutvā yadabhipūjitam ||",
    hindi: "ऋषियों ने कहा: परम ऋषि कृष्णद्वैपायन व्यास ने जिस पुरातन आख्यान की रचना की है, जिसे सुनकर देवताओं और ब्रह्मर्षियों ने भी पूजित किया है—",
    english: "The Rishis said: That ancient history composed by the supreme sage Krishna Dvaipayana, which has been revered by gods and celestial sages upon hearing it—",
    commentary: "The sages affirm the divine standing of Vyasa's epic.",
    keyWords: ["Vyasa", "Purana", "Devas", "Brahmarshi"]
  },
  {
    verseNumber: 15,
    speaker: "ऋषय ऊचुः",
    sanskrit: "तस्याख्यानवरिष्ठस्य विचित्रपदपर्वणः ।\nसूक्ष्मार्थन्याययुक्तस्य वेदार्थैर्भूषितस्य च ॥",
    transliteration: "Tasyākhyānavariṣṭhasya vicitrapadaparvaṇaḥ |\nSūkṣmārthanyāyayuktasya vedārthairbhūṣitasya ca ||",
    hindi: "उस श्रेष्ठतम आख्यान को, जो विचित्र पदों और पर्वों से युक्त है, जो सूक्ष्म तर्क, न्याय और वेदार्थों से अलंकृत है—",
    english: "That most exalted chronicle, filled with sublime poetic meters and divisions, rich with subtle logic and profound Vedic philosophies—",
    commentary: "Highlights the literary, philosophical, and Vedic richness of the Mahabharata.",
    keyWords: ["Exalted", "Poetics", "Philosophy", "Logic", "Vedas"]
  },
  {
    verseNumber: 16,
    speaker: "ऋषय ऊचुः",
    sanskrit: "भारतस्येतिहासस्य पुण्यां ग्रन्थार्थसंयुताम् ।\nसंस्कारोपगतां ब्राह्मीं नानाशास्त्रोपबृंहिताम् ॥",
    transliteration: "Bhāratasyetihāsasya puṇyāṁ granthārthasaṁyutām |\nSaṁskāropagatāṁ brāhmīṁ nānāśāstropabṛṁhitām ||",
    hindi: "उस भारत इतिहास की पवित्र कथा को, जो दिव्य ब्राह्मी भाषा और समस्त शास्त्रों के रहस्यों से परिपूर्ण है—",
    english: "That sacred history of Bharata, replete with refined Sanskrit expression and illuminated by all scriptures and branches of knowledge—",
    commentary: "Mahabharata as the quintessence of all Shastras (Fifth Veda).",
    keyWords: ["Itihasa", "Bharata", "Shastras", "Knowledge"]
  },
  {
    verseNumber: 17,
    speaker: "ऋषय ऊचुः",
    sanskrit: "जनमेजयस्य यां राज्ञो वैशम्पायन उक्तवान् ।\nयथावत् स ऋषिश्रेष्ठः प्रीत्या तत्र न्यवेदयत् ॥",
    transliteration: "Janamejayasya yāṁ rājño vaiśampāyana uktavān |\nYathāvat sa ṛṣiśreṣṭhaḥ prītyā tatra nyavedayat ||",
    hindi: "जिसे उस सर्पसत्र में राजा जनमेजय को महर्षि वैशम्पायन जी ने प्रेमपूर्वक विस्तार से सुनाया था—",
    english: "Which the venerable Vaishampayana narrated with deep affection to King Janamejaya at the sacrifice—",
    commentary: "Refers to the authentic Vaishampayana-Janamejaya dialogue.",
    keyWords: ["Janamejaya", "Vaishampayana", "Recitation"]
  },
  {
    verseNumber: 18,
    speaker: "ऋषय ऊचुः",
    sanskrit: "तां वयं श्रोतुमिच्छामः पुण्यां पापहरां शुभाम् ।\nभारतस्य कथां दिव्यां व्यासस्याद्भुतकर्मणः ॥",
    transliteration: "Tāṁ vayaṁ śrotumicchāmaḥ puṇyāṁ pāpaharāṁ śubhām |\nBhāratasya kathāṁ divyāṁ vyāsasyādbhutakarmaṇaḥ ||",
    hindi: "अद्भुत कर्म करने वाले महर्षि व्यास की उस दिव्य, पापनाशिनी और कल्याणमयी महाभारत कथा को हम सब सुनना चाहते हैं।",
    english: "We all desire to hear that divine, sin-eradicating, and all-auspicious story of the Mahabharata composed by the marvelous sage Vyasa.",
    commentary: "The formal request from Shaunaka and the assembly of 88,000 sages.",
    keyWords: ["Desire to Hear", "Vyasa", "Auspicious", "Liberation"]
  },
  {
    verseNumber: 19,
    speaker: "सौति उवाच",
    sanskrit: "आद्यं पुरुषमीशानं पुरुहूतं पुरुष्टुतम् ।\nऋतं सत्यं परं ब्रह्म व्यक्ताव्यक्तं सनातनम् ॥",
    transliteration: "Ādyaṁ puruṣamīśānaṁ puruhūtaṁ puruṣṭutam |\nṚtaṁ satyaṁ paraṁ brahma vyaktāvyaktaṁ sanātanam ||",
    hindi: "सौति ने कहा: जो सबके आदि पुरुष, सर्वेश्वर, बहुस्तुत, ऋत (नियम), सत्य, परब्रह्म, व्यक्त-अव्यक्त और सनातन हैं—",
    english: "Sauti began: Bowing to the Primeval Person, the Supreme Ruler, widely invoked and praised, who is Cosmic Order (Rita), Absolute Truth (Satya), Supreme Brahman, Manifest and Unmanifest, and Eternal—",
    commentary: "The profound cosmic cosmology saluting the Supreme Lord.",
    keyWords: ["Brahman", "Paramatman", "Rita", "Satya", "Eternal"]
  },
  {
    verseNumber: 20,
    speaker: "सौति उवाच",
    sanskrit: "प्रवृत्तिकर्मसंयुक्तान् निवृत्तिकर्मसंश्रितान् ।\nलोकानां सृष्टिकर्तारं धाताममृतमव्ययम् ॥",
    transliteration: "Pravṛttikarmasaṁyuktān nivṛttikarmasaṁśritān |\nLokānāṁ sṛṣṭikartāraṁ dhātāmamṛtamavyayam ||",
    hindi: "जो प्रवृत्ति (संसार कर्म) और निवृत्ति (मोक्ष कर्म) दोनों के आधार हैं, समस्त लोकों के सृष्टिकर्ता, अमर और अविनाशी धाता हैं—",
    english: "Who is the refuge of both active duty (Pravritti) and spiritual renunciation (Nivritti), the Creator of the worlds, immortal, and imperishable Sustainer—",
    commentary: "Harmonizes the dual paths of worldly action and spiritual liberation.",
    keyWords: ["Pravritti", "Nivritti", "Creator", "Immortal"]
  },
  {
    verseNumber: 21,
    speaker: "सौति उवाच",
    sanskrit: "नमस्कृत्य जगन्नाथं व्यासं चाद्भुतकर्मणम् ।\nप्रवक्ष्यामि कथां पुण्यां सर्वलोकसुखावहाम् ॥",
    transliteration: "Namaskṛtya jagannāthaṁ vyāsaṁ cādbhutakarmaṇam |\nPravakṣyāmi kathāṁ puṇyāṁ sarvalokasukhāvahām ||",
    hindi: "उन जगन्नाथ श्रीहरि और अद्भुतकर्मा महर्षि व्यास को प्रणाम करके, मैं समस्त लोकों को सुख देने वाली इस पावन कथा का गान करता हूँ।",
    english: "Paying homage to Jagannatha (Lord of the Universe) and to the wondrous sage Vyasa, I shall narrate this holy chronicle that brings joy to all existence.",
    commentary: "Sauti sets out the grand purpose of recitation.",
    keyWords: ["Jagannatha", "Vyasa", "Welfare", "Homage"]
  },
  {
    verseNumber: 22,
    speaker: "सौति उवाच",
    sanskrit: "आचख्यौ कवयः केचित् संप्रत्याचक्षते परे ।\nआख्यास्यन्ति तथैवान्ये इतिहासमिमं भुवि ॥",
    transliteration: "Ācakhyau kavayaḥ kecit saṁpratyācakṣate pare |\nĀkhyāsyanti tathaivānye itihāsamimaṁ bhuvi ||",
    hindi: "इस इतिहास को पूर्वकाल में कवियों ने कहा है, वर्तमान में विद्वान कह रहे हैं, और भविष्य में भी अन्य मनीषी पृथ्वी पर इसका गान करेंगे।",
    english: "Some poets have related this history in past ages, others are narrating it in the present, and others yet will recount it in future times across the earth.",
    commentary: "Declares the timeless, immortal resonance of the Mahabharata across past, present, and future.",
    keyWords: ["Timeless", "History", "Poets", "Future Generations"]
  },
  {
    verseNumber: 23,
    speaker: "सौति उवाच",
    sanskrit: "इदं तु त्रिषु लोकेषु महज्ज्ञानं प्रतिष्ठितम् ।\nविस्तरैश्च समासैश्च धार्यते यद् द्विजातिभिः ॥",
    transliteration: "Idaṁ tu triṣu lokeṣu mahajjñānaṁ pratiṣṭhitam |\nVistaraiśca samāsaiśca dhāryate yad dvijātibhiḥ ||",
    hindi: "तीनों लोकों में यह महान ज्ञान प्रतिष्ठित है, जिसे विद्वान् जन विस्तार से और संक्षेप से धारण करते हैं।",
    english: "Established across the three worlds is this supreme knowledge, which is preserved and held by scholars in both detailed expansions and concise summaries.",
    commentary: "Explains how the Mahabharata is studied in both elaborate and concise forms.",
    keyWords: ["Three Worlds", "Supreme Knowledge", "Preservation"]
  },
  {
    verseNumber: 24,
    speaker: "सौति उवाच",
    sanskrit: "अलङ्कृतं शुभैः शब्दैः समयैर्दिव्यमानुषैः ।\nछन्दोवृत्तैश्च विविधैरन्वितं विदुषां प्रियम् ॥",
    transliteration: "Alaṅkṛtaṁ śubhaiḥ śabdaiḥ samayairdivyamānuṣaiḥ |\nChandovṛttaiśca vividhairanvitaṁ viduṣāṁ priyam ||",
    hindi: "शुभ शब्दों, दिव्य और मानवीय मर्यादाओं, तथा अनेक प्रकार के मनोहर छंदों से अलंकृत यह ग्रंथ विद्वानों को अत्यंत प्रिय है।",
    english: "Adorned with elegant words, divine and human codes of conduct, and rich meters, it is cherished by the wise as their dearest treasure.",
    commentary: "Praises the poetic craftsmanship and ethical dimensions of the work.",
    keyWords: ["Meters", "Aesthetics", "Scholars", "Ethics"]
  },
  {
    verseNumber: 25,
    speaker: "सौति उवाच (सृष्टि वर्णन)",
    sanskrit: "निष्प्रभेऽस्मिंस्ततो लोके सर्वतस्तमसावृते ।\nबृहदण्डमभूदेकं प्रजानां बीजमव्ययम् ॥",
    transliteration: "Niṣprabhe'smiṁstato loke sarvatastamasāvṛte |\nBṛhadaṇḍamabhūdekaṁ prajānāṁ bījamavyayam ||",
    hindi: "प्रारंभ में जब यह जगत प्रभाहीन (प्रकाशहीन) तथा चारों ओर अंधकार से घिरा था, तब समस्त प्रजाओं का अविनाशी बीज रूप एक विशाल हिरण्यगर्भ ब्रह्माण्ड उत्पन्न हुआ।",
    english: "In the beginning, when the universe was devoid of light and enveloped in total darkness, there emerged a gigantic Cosmic Egg (Hiranyagarbha), the imperishable seed of all creation.",
    commentary: "The Vedic cosmology describing the Golden Cosmic Egg (Brahmanda).",
    keyWords: ["Creation", "Cosmic Egg", "Hiranyagarbha", "Darkness to Light"]
  },
  {
    verseNumber: 26,
    speaker: "सौति उवाच",
    sanskrit: "युगस्यादौ निमित्तं यन्महद्दिव्यं प्रचक्षते ।\nयस्मिन् संजज्ञिरे देवाः प्रजापतिपुरोगमाः ॥",
    transliteration: "Yugasyādau nimittaṁ yanmahaddivyaṁ pracakṣate |\nYasmin saṁjajñire devāḥ prajāpatipurogamāḥ ||",
    hindi: "युग के प्रारंभ में जिसे महान दिव्य कारण कहा गया है, उसी हिरण्यगर्भ से प्रजापतियों सहित समस्त देवताओं का प्राकट्य हुआ।",
    english: "Called the great divine primal cause at the dawn of the cosmic epoch, within it manifested all celestial deities headed by the Prajapatis (Progenitors).",
    commentary: "The emergence of cosmic architects (Prajapatis) and divine beings.",
    keyWords: ["Prajapati", "Devas", "Cosmic Dawn", "Primal Cause"]
  },
  {
    verseNumber: 27,
    speaker: "सौति उवाच (वृक्ष रूपक - अधर्म)",
    sanskrit: "दुर्योधनो मन्युमयो महाद्रुमः स्कन्धः कर्णः शकुनिस्तस्य शाखाः ।\nदुःशासनः पुष्पफले समृद्धे मूलं राजा धृतराष्ट्रोऽमनीषी ॥",
    transliteration: "Duryodhano manyumayo mahādrumaḥ skandhaḥ karṇaḥ śakunistasya śākhāḥ |\nDuḥśāsanaḥ puṣpaphale samṛddhe mūlaṁ rājā dhṛtarāṣṭro'manīṣī ||",
    hindi: "दुर्योधन क्रोध (ईर्ष्या-अहंकार) रूपी एक विशाल वृक्ष है; कर्ण उसका तना (स्कंध) है; शकुनि उसकी शाखाएँ हैं; दुःशासन उसके फल-फूल हैं; और अविवेकी राजा धृतराष्ट्र उस अधर्म-वृक्ष की मूल (जड़) हैं।",
    english: "Duryodhana is a vast tree of wrath; Karna is its trunk; Shakuni is its branches; Duhshasana is its abundant blossoms and fruits; and the unwise King Dhritarashtra is its deep root.",
    commentary: "One of the most famous allegories of the Mahabharata capturing the structure of adharma and arrogance.",
    keyWords: ["Duryodhana", "Wrath Tree", "Karna", "Shakuni", "Dhritarashtra", "Allegory"]
  },
  {
    verseNumber: 28,
    speaker: "सौति उवाच (वृक्ष रूपक - धर्म)",
    sanskrit: "युधिष्ठिरो धर्ममयो महाद्रुमः स्कन्धोऽर्जुनो भीमसेनोऽस्य शाखाः ।\nमाद्रीसुतौ पुष्पफले समृद्धे मूलं कृष्णो ब्रह्म च ब्राह्मणाश्च ॥",
    transliteration: "Yudhiṣṭhiro dharmamayo mahādrumaḥ skandho'rjuno bhīmaseno'sya śākhāḥ |\nMādrīsutau puṣpaphale samṛddhe mūlaṁ kṛṣṇo brahma ca brāhmaṇāśca ||",
    hindi: "युधिष्ठिर धर्म रूपी एक विशाल कल्पवृक्ष हैं; अर्जुन उसका तना (स्कंध) हैं; भीमसेन उसकी शाखाएँ हैं; माद्रीपुत्र नकुल-सहदेव उसके फल-फूल हैं; और स्वयं भगवान् श्रीकृष्ण, परब्रह्म एवं वेदमंत्र इस धर्मवृक्ष की जड़ (मूल) हैं।",
    english: "Yudhishthira is a great tree of Dharma; Arjuna is its trunk; Bhimasena is its branches; the two sons of Madri (Nakula & Sahadeva) are its flowers and fruits; and Lord Krishna, Brahman, and Vedic wisdom are its eternal roots.",
    commentary: "The complementary allegory personifying righteousness grounded in divine grace.",
    keyWords: ["Yudhishthira", "Dharma Tree", "Arjuna", "Bhima", "Krishna", "Divine Root"]
  },
  {
    verseNumber: 29,
    speaker: "सौति उवाच",
    sanskrit: "काव्यस्य लेखनार्थाय गणेशं स्मरतस्तदा ।\nआजगाम सुरश्रेष्ठो विघ्नेशो गणनायकः ॥",
    transliteration: "Kāvyasya lekhanārthāya gaṇeśaṁ smaratastadā |\nĀjagāma suraśreṣṭho vighneśo gaṇanāyakaḥ ||",
    hindi: "इस महाकाव्य को लिपिबद्ध करने के लिए जब महर्षि व्यास ने श्रीगणेश का स्मरण किया, तब विघ्नहर्ता गणनायक भगवान् श्रीगणेश वहाँ प्रकट हुए।",
    english: "When Maharshi Vyasa contemplated who could write down this monumental epic, Lord Ganesha, the remover of all obstacles and leader of divine hosts, appeared before him.",
    commentary: "The sacred invocation of Lord Ganesha to scribe the Mahabharata.",
    keyWords: ["Ganesha", "Vyasa", "Scribe", "Dictation", "Obstacle Remover"]
  },
  {
    verseNumber: 30,
    speaker: "व्यास उवाच",
    sanskrit: "लेखको भारतस्यास्य भव सर्वगणेश्वर ।\nमया प्रोच्यमानस्य मनसा कल्पितस्य च ॥",
    transliteration: "Lekhako bhāratasyāsya bhava sarvagaṇeśvara |\nMayā procyamānasya manasā kalpitasya ca ||",
    hindi: "महर्षि व्यास ने प्रार्थना की: हे सर्वगणेश्वर गणेश! मेरे द्वारा मन में रचे गए और बोले जाने वाले इस महाभारत ग्रंथ के आप लेखक बनिए।",
    english: "Vyasa prayed: O Lord of all Ganas, Ganesha! Please become the scribe of this Mahabharata epic conceived in my mind as I dictate it unto you.",
    commentary: "The divine pact between Sage Vyasa and Lord Ganesha.",
    keyWords: ["Ganesha", "Vyasa", "Agreement", "Scribe"]
  },
  {
    verseNumber: 31,
    speaker: "श्रीगणेश उवाच",
    sanskrit: "यदि मे लेखनी राजन् क्षणं न विरमेत् क्वचित् ।\nतदाहं लेखको भविष्यामि शृणु मे वचनं शुभम् ॥",
    transliteration: "Yadi me lekhanī rājan kṣaṇaṁ na viramet kvacit |\nTadāhaṁ lekhako bhaviṣyāmi śṛṇu me vacanaṁ śubham ||",
    hindi: "श्रीगणेश जी ने कहा: हे महर्षे! यदि मेरी लेखनी एक क्षण के लिए भी न रुके (आप बिना रुके निरंतर बोलते रहें), तभी मैं इसका लेखक बनूँगा।",
    english: "Lord Ganesha replied: O sage! If my pen is not made to halt even for a single moment (if you dictate without pause), only then shall I write your epic.",
    commentary: "Ganesha's condition that testing the unbroken flow of dictation.",
    keyWords: ["Ganesha Condition", "Continuous Dictation", "Pen"]
  },
  {
    verseNumber: 32,
    speaker: "व्यास उवाच",
    sanskrit: "न चाप्यबुद्ध्वा मया प्रोक्तं किञ्चिद् ग्राह्यं त्वया विभो ।\nतथेत्युक्त्वा गणेशोऽपि लेखकत्वे व्यवस्थितः ॥",
    transliteration: "Na cāpyabuddhvā mayā proktaṁ kiñcid grāhyaṁ tvayā vibho |\nTathetyuktvā gaṇeśo'pi lekhakatve vyavasthitaḥ ||",
    hindi: "व्यास जी ने शर्त रखी: हे सर्वसमर्थ प्रभो! मेरे बोले गए श्लोक के गूढ़ अर्थ को जब तक आप भलीभाँति समझ न लें, तब तक उसे न लिखें। गणेश जी ने 'तथास्तु' कहकर लेखन कार्य प्रारंभ किया।",
    english: "Vyasa countered: O Lord! Do not write down any verse until you have fully comprehended its deepest metaphysical meaning. Ganesha agreed with 'Tathastu' and sat down as scribe.",
    commentary: "Vyasa composed profound knotty verses (Vyasa-kutas) giving him time to compose subsequent verses while Ganesha pondered their depth.",
    keyWords: ["Vyasa Kuta", "Comprehension", "Tathastu", "Writing"]
  },
  {
    verseNumber: 33,
    speaker: "धृतराष्ट्र विलाप (अनुक्रमणिका)",
    sanskrit: "यदाश्रौषं धनुरायातमत्स्यवेधं हतं जले ।\nपतितां द्रौपदीं रङ्गे तदा नाशंसे विजयाय सञ्जय ॥",
    transliteration: "Yadāśrauṣaṁ dhanurāyātamatsyavedhaṁ hataṁ jale |\nPatitāṁ draupadīṁ raṅge tadā nāśaṁse vijayāya sañjaya ||",
    hindi: "धृतराष्ट्र ने कहा: हे सञ्जय! जब मैंने सुना कि अर्जुन ने धनुष चढ़ाकर जल में प्रतिबिंब देखकर मत्स्यवेध कर दिया और द्रौपदी को जीत लिया, तभी से मुझे अपनी विजय की कोई आशा नहीं रही!",
    english: "Dhritarashtra lamented: O Sanjaya! When I heard that Arjuna strung the mighty bow, pierced the target looking at the water reflection, and won Draupadi in the arena, then I lost all hope of victory!",
    commentary: "Commences the famous 65+ 'Yada Asrausam' verses recounting pivotal turning points.",
    keyWords: ["Dhritarashtra", "Sanjaya", "Yada Asrausam", "Draupadi Swayamvara"]
  },
  {
    verseNumber: 34,
    speaker: "धृतराष्ट्र विलाप",
    sanskrit: "यदाश्रौषं सुभद्रां तां वासुदेवस्य सम्मताम् ।\nप्रसह्य हृतां पाण्डवेन तदा नाशंसे विजयाय सञ्जय ॥",
    transliteration: "Yadāśrauṣaṁ subhadrāṁ tāṁ vāsudevasya sammatām |\nPrasahya hṛtāṁ pāṇḍavena tadā nāśaṁse vijayāya sañjaya ||",
    hindi: "जब मैंने सुना कि भगवान श्रीकृष्ण की सहमति से अर्जुन ने द्वारका से सुभद्रा का हरण कर लिया, तब से मुझे विजय की कोई आशा नहीं रही!",
    english: "When I heard that Arjuna carried off Subhadra with the willing consent of Lord Vasudeva Krishna, then I had no hope of victory!",
    commentary: "Highlights the unshakeable divine bond between Arjuna and Krishna.",
    keyWords: ["Subhadra", "Krishna", "Arjuna", "Alliance"]
  },
  {
    verseNumber: 35,
    speaker: "धृतराष्ट्र विलाप",
    sanskrit: "यदाश्रौषं खाण्डवं दाह्यमानं पावकं तर्पयन्तम् ।\nकृष्णार्जुनौ सह स्थितौ तदा नाशंसे विजयाय सञ्जय ॥",
    transliteration: "Yadāśrauṣaṁ khāṇḍavaṁ dāhyamānaṁ pāvakaṁ tarpayantam |\nKṛṣṇārjunau saha sthitau tadā nāśaṁse vijayāya sañjaya ||",
    hindi: "जब मैंने सुना कि कृष्ण और अर्जुन ने खाण्डव वन में अग्निदेव को तृप्त किया और इन्द्र के समस्त देवसैन्य को रोक दिया, तब से मुझे विजय की कोई आशा नहीं रही!",
    english: "When I heard that Krishna and Arjuna together satisfied Agni by burning Khandava forest and repelled Indra with celestial prowess, then I had no hope of victory!",
    commentary: "The Nara-Narayana invincible combination manifesting in full power.",
    keyWords: ["Khandava Dahan", "Agni", "Indra", "Nara Narayana"]
  },
  {
    verseNumber: 36,
    speaker: "धृतराष्ट्र विलाप",
    sanskrit: "यदाश्रौषं द्यूते विचित्रे वञ्चितं धर्मराजम् ।\nसभामानीय तां द्रौपदीं तदा नाशंसे विजयाय सञ्जय ॥",
    transliteration: "Yadāśrauṣaṁ dyūte vicitre vañcitaṁ dharmarājam |\nSabhāmānīya tāṁ draupadīṁ tadā nāśaṁse vijayāya sañjaya ||",
    hindi: "जब मैंने सुना कि कपट-द्यूत में धर्मराज युधिष्ठिर को छल से हरा दिया गया और भरी सभा में द्रौपदी को अपमानित किया गया, तब से मुझे अपने कुल के विनाश का भय हो गया और विजय की कोई आशा नहीं रही!",
    english: "When I heard that righteous Yudhishthira was cheated at dice and Draupadi was dragged into the assembly hall, then I lost all hope of my family's survival and victory!",
    commentary: "Dhritarashtra acknowledging the grave unpardonable adharma in the Kuru sabha.",
    keyWords: ["Dice Game", "Draupadi Vastraharan", "Adharma", "Doom"]
  },
  {
    verseNumber: 37,
    speaker: "धृतराष्ट्र विलाप",
    sanskrit: "यदाश्रौषं वासुदेवं जगत्प्रभुं रूपं दर्शयन्तम् ।\nकौरवानां सभायाम् तदा नाशंसे विजयाय सञ्जय ॥",
    transliteration: "Yadāśrauṣaṁ vāsudevaṁ jagatprabhuṁ rūpaṁ darśayantam |\nKauravānāṁ sabhāyām tadā nāśaṁse vijayāya sañjaya ||",
    hindi: "जब मैंने सुना कि हस्तिनापुर की कौरव सभा में शांतिदूत बनकर आए जगत्प्रभु वासुदेव श्रीकृष्ण ने अपना विराट विश्वरूप प्रकट किया, तब से मुझे विजय की कोई आशा नहीं रही!",
    english: "When I heard that Lord Vasudeva Krishna revealed His awe-inspiring Cosmic Vishvarupa form right in the Hastinapur assembly, then I lost all hope of victory!",
    commentary: "Krishna's Vishvarupa reveal in Udyoga Parva peace embassy.",
    keyWords: ["Vishvarupa", "Krishna", "Hastinapur", "Peace Mission"]
  },
  {
    verseNumber: 38,
    speaker: "धृतराष्ट्र विलाप",
    sanskrit: "यदाश्रौषं भीष्मममिततेजसं हतं शरेणार्जुनस्य ।\nशरशय्यायां शयानम् तदा नाशंसे विजयाय सञ्जय ॥",
    transliteration: "Yadāśrauṣaṁ bhīṣmamamitatejasaṁ hataṁ śareṇārjunasya |\nŚaraśayyāyāṁ śayānam tadā nāśaṁse vijayāya sañjaya ||",
    hindi: "जब मैंने सुना कि अमित तेजस्वी पितामह भीष्म अर्जुन के बाणों से बिंधकर शरशय्या पर गिर पड़े, तब से मुझे विजय की कोई आशा नहीं रही!",
    english: "When I heard that Grandfather Bhishma of infinite glory was brought down by Arjuna's arrows onto the bed of arrows on Day 10, then I had no hope of victory!",
    commentary: "The catastrophic turning point when Bhishma fell on the tenth day of war.",
    keyWords: ["Bhishma", "Bed of Arrows", "Kurukshetra Day 10", "Fall"]
  },
  {
    verseNumber: 39,
    speaker: "धृतराष्ट्र विलाप",
    sanskrit: "यदाश्रौषं द्रोणं धनुर्धरश्रेष्ठं हतं धृष्टद्युम्नेन ।\nशस्त्रमुत्सृज्य तिष्ठन्तं तदा नाशंसे विजयाय सञ्जय ॥",
    transliteration: "Yadāśrauṣaṁ droṇaṁ dhanurdharaśreṣṭhaṁ hataṁ dhṛṣṭadyumnena |\nŚastramutsṛjya tiṣṭhantaṁ tadā nāśaṁse vijayāya sañjaya ||",
    hindi: "जब मैंने सुना कि शस्त्र त्यागकर योगस्थ बैठे सर्वश्रेष्ठ धनुर्धर आचार्य द्रोण को धृष्टद्युम्न ने मार गिराया, तब से मुझे विजय की कोई आशा नहीं रही!",
    english: "When I heard that supreme master Dronacharya laid down his weapons and was slain by Dhrishtadyumna while in yogic meditation, then I had no hope of victory!",
    commentary: "The fall of Drona on Day 15 shaking Kaurava defenses to the core.",
    keyWords: ["Dronacharya", "Dhrishtadyumna", "Day 15", "Yoga"]
  },
  {
    verseNumber: 40,
    speaker: "धृतराष्ट्र विलाप",
    sanskrit: "यदाश्रौषं कर्णमतिरथं हतं रणे किरीटिना ।\nरथचक्रे धरण्यां ग्रस्ते तदा नाशंसे विजयाय सञ्जय ॥",
    transliteration: "Yadāśrauṣaṁ karṇamatirathaṁ hataṁ raṇe kirīṭinā |\nRathacakre dharaṇyāṁ graste tadā nāśaṁse vijayāya sañjaya ||",
    hindi: "जब मैंने सुना कि रथ का पहिया भूमि में धँस जाने पर अतिरथी कर्ण को अर्जुन ने मार गिराया, तब से मुझे विजय की कोई आशा नहीं रही!",
    english: "When I heard that supreme warrior Karna was slain by Arjuna while struggling to lift his stuck chariot wheel from the earth, then I had no hope of victory!",
    commentary: "The climax duel of Karna Parva on Day 17 sealing the war's outcome.",
    keyWords: ["Karna", "Arjuna", "Chariot Wheel", "Day 17 Duel"]
  },
  {
    verseNumber: 41,
    speaker: "धृतराष्ट्र विलाप",
    sanskrit: "यदाश्रौषं भीमसेनेन गदाहंतं दुर्योधनं रणे ।\nभग्नोरुं पतितं भूमौ तदा नाशंसे विजयाय सञ्जय ॥",
    transliteration: "Yadāśrauṣaṁ bhīmasenena gadāhaṁtaṁ duryodhanaṁ raṇe |\nBhagnoruṁ patitaṁ bhūmau tadā nāśaṁse vijayāya sañjaya ||",
    hindi: "जब मैंने सुना कि गदा युद्ध में भीमसेन द्वारा दुर्योधन की दोनों जाँघें तोड़ दी गईं और वह रणभूमि में असहाय गिर पड़ा, तब से मुझे विजय की कोई आशा नहीं रही!",
    english: "When I heard that Duryodhana's thighs were shattered by Bhima's mace in their final duel and he lay fallen in the dust, then I lost all hope of victory!",
    commentary: "The decisive duel of Shalya Parva fulfilling Bhima's ancient vow.",
    keyWords: ["Bhima", "Duryodhana", "Mace Combat", "Fallen King"]
  },
  {
    verseNumber: 42,
    speaker: "धृतराष्ट्र विलाप",
    sanskrit: "यदाश्रौषं हतां सेनां कौरवाणां महाहवे ।\nअष्टादशाक्षौहिणीं पूर्णां तदा नाशंसे विजयाय सञ्जय ॥",
    transliteration: "Yadāśrauṣaṁ hatāṁ senāṁ kauravāṇāṁ mahāhave |\nAṣṭādaśākṣauhiṇīṁ pūrṇāṁ tadā nāśaṁse vijayāya sañjaya ||",
    hindi: "जब मैंने सुना कि उस महायुद्ध में समस्त अठारह अक्षौहिणी सेना नष्ट हो गई और मेरे सौ पुत्रों में से कोई जीवित न बचा, तब से मुझे अपने जीवन में भी कोई आशा नहीं रही!",
    english: "When I heard that all eighteen Akshauhini divisions were annihilated in that holocaust and not one of my hundred sons survived, then I lost all will to live!",
    commentary: "The total catastrophe of the Kurukshetra war leaving Dhritarashtra completely bereft.",
    keyWords: ["18 Akshauhinis", "Annihilation", "Hundred Sons", "Despair"]
  },
  {
    verseNumber: 43,
    speaker: "सञ्जय उवाच (काल महिमा)",
    sanskrit: "अशोक्यं शोचसे राजन् कालो हि बलवत्तरः ।\nकालः सृजति भूतानि कालः संहरते प्रजाः ॥",
    transliteration: "Aśokyaṁ śocase rājan kālo hi balavattaraḥ |\nKālaḥ sṛjati bhūtāni kālaḥ saṁharate prajāḥ ||",
    hindi: "सञ्जय ने सांत्वना दी: हे राजन्! आप व्यर्थ शोक न करें; काल (समय) ही सबसे अधिक बलवान है। काल ही समस्त जीवों को रचता है और काल ही समस्त प्रजाओं का संहार करता है।",
    english: "Sanjaya consoled: O King! Grieve not over what cannot be undone; Time alone is all-powerful. Time creates all beings and Time reclaims all creatures.",
    commentary: "Sanjaya's supreme philosophical instruction on Kala (Time / Destiny).",
    keyWords: ["Kala", "Time", "Destiny", "Sanjaya", "Consolation"]
  },
  {
    verseNumber: 44,
    speaker: "सञ्जय उवाच",
    sanskrit: "कालः सुप्तेषु जागर्ति कालो हि दुरतिक्रमः ।\nधर्मे मनः कुरु सदा धर्मो रक्षति रक्षितः ॥",
    transliteration: "Kālaḥ supteṣu jāgarti kālo hi duratikramaḥ |\nDharme manaḥ kuru sadā dharmo rakṣati rakṣitaḥ ||",
    hindi: "जब सब सो रहे होते हैं तब भी काल जागता रहता है; काल का अतिक्रमण करना किसी के वश में नहीं है। इसलिए सदा धर्म में मन लगाएँ; क्योंकि रक्षित किया हुआ धर्म ही मनुष्य की रक्षा करता है।",
    english: "Time stays awake even when all sleep; none can overcome Time. Therefore, fix your mind on Dharma always, for Dharma protected protects its upholder.",
    commentary: "The famous maxim: Dharmo Rakshati Rakshitah.",
    keyWords: ["Dharma", "Dharmo Rakshati Rakshitah", "Vigilance", "Protection"]
  },
  {
    verseNumber: 45,
    speaker: "महर्षि व्यासः (ग्रन्थ महिमा)",
    sanskrit: "धर्मे च अर्थे च कामे च मोक्षे च भरतर्षभ ।\nयदिहास्ति तदन्यत्र यन्नेहास्ति न तत्क्वचित् ॥",
    transliteration: "Dharme ca arthe ca kāme ca mokṣe ca bharatarṣabha |\nYadihāsti tadanyatra yannehāsti na tatkvacit ||",
    hindi: "हे भरतश्रेष्ठ! धर्म, अर्थ, काम और मोक्ष (चारों पुरुषार्थों) के विषय में जो कुछ इस महाभारत में है, वही संसार में अन्यत्र देखने को मिलता है; और जो इसमें नहीं है, वह कहीं भी विद्यमान नहीं है।",
    english: "O best of Bharatas! In matters of Duty (Dharma), Wealth (Artha), Desire (Kama), and Liberation (Moksha), whatever is found here is found elsewhere; but what is not here is nowhere in existence.",
    commentary: "The supreme summary statement of the universal encyclopedic wisdom of the Mahabharata.",
    keyWords: ["Dharma", "Artha", "Kama", "Moksha", "Universal Wisdom", "Purusharthas"]
  },
  {
    verseNumber: 46,
    speaker: "महर्षि व्यासः (भारत सावित्री)",
    sanskrit: "उर्ध्वबाहुर्विरौम्येष न च कश्चित् शृणोति मे ।\nधर्मादर्थश्च कामश्च स किमर्थं न सेव्यते ॥",
    transliteration: "Urdhvabāhurviraumyeṣa na ca kaścit śṛṇoti me |\nDharmādarthaśca kāmaśca sa kimarthaṁ na sevyate ||",
    hindi: "मैं दोनों भुजाएँ उठाकर पुकार रहा हूँ, किन्तु कोई मेरी बात नहीं सुनता—धर्म से ही अर्थ और काम सिद्ध होते हैं, फिर मनुष्य उस परम कल्याणकारी धर्म का सेवन क्यों नहीं करते?",
    english: "With uplifted arms I cry aloud, yet none heeds my counsel! From Dharma alone flow both Prosperity and Joy—why then is that righteous Dharma not embraced?",
    commentary: "Maharshi Vyasa's poignant clarion call (Bharata Savitri) to humanity.",
    keyWords: ["Bharata Savitri", "Uplifted Arms", "Vyasa Counsel", "Moral Call"]
  },
  {
    verseNumber: 47,
    speaker: "महर्षि व्यासः",
    sanskrit: "न जातु कामान्न भयान्न लोभाद् धर्मं त्यजेज्जीवितस्यापि हेतोः ।\nनित्यो धर्मः सुखदुःखे त्वनित्ये जीवो नित्यो हेतुरस्य त्वनित्यः ॥",
    transliteration: "Na jātu kāmānna bhayānna lobhād dharmaṁ tyajejjīvitasyāpi hetoḥ |\nNityo dharmaḥ sukhaduḥkhe tvanitye jīvo nityo heturasya tvanityaḥ ||",
    hindi: "कामना, भय, लोभ अथवा प्राण बचाने के लिए भी कभी धर्म का त्याग नहीं करना चाहिए। धर्म नित्य (शाश्वत) है जबकि सुख और दुःख अनित्य (क्षणभंगुर) हैं। जीवात्मा नित्य है और उसका शरीर अनित्य है।",
    english: "Never should one abandon Dharma for pleasure, fear, greed, or even to preserve one's life. Dharma is eternal, while pleasure and pain are transient. The soul is immortal, while its body is fleeting.",
    commentary: "The core foundational principle of Sanatana Dharma from the Mahabharata.",
    keyWords: ["Sanatana Dharma", "Eternal Truth", "Soul", "Immortality", "Integrity"]
  },
  {
    verseNumber: 48,
    speaker: "फलश्रुति",
    sanskrit: "अष्टादशपुराणेषु व्यासस्य वचनद्वयम् ।\nपरोपकारः पुण्याय पापाय परपीडनम् ॥",
    transliteration: "Aṣṭādaśapurāṇeṣu vyāsasya vacanadvayam |\nParopakāraḥ puṇyāya pāpāya parapīḍanam ||",
    hindi: "अठारह पुराणों और महाभारत में महर्षि व्यास के दो ही प्रमुख वचन हैं—परोपकार करना ही सबसे बड़ा पुण्य है और दूसरों को पीड़ा पहुँचाना ही सबसे बड़ा पाप है।",
    english: "Across all eighteen Puranas and the Mahabharata, sage Vyasa's wisdom is distilled into two maxims: Doing good to others leads to virtue, and causing hurt to others leads to sin.",
    commentary: "The universal moral essence of Vedic literature.",
    keyWords: ["Paropakara", "Compassion", "Sin and Virtue", "Essence of Wisdom"]
  },
  {
    verseNumber: 49,
    speaker: "फलश्रुति",
    sanskrit: "भारताध्ययनं पुण्यं यः शृणोति पठेच्च यः ।\nस सर्वपापनिर्मुक्तः परं ब्रह्माधिगच्छति ॥",
    transliteration: "Bhāratādhyayanaṁ puṇyaṁ yaḥ śṛṇoti paṭhecca yaḥ |\nSa sarvapāpanirmuktaḥ paraṁ brahmādhigacchati ||",
    hindi: "जो व्यक्ति इस पवित्र महाभारत का अध्ययन, श्रवण अथवा पाठ करता है, वह समस्त पापों से मुक्त होकर परब्रह्म परमात्मा को प्राप्त कर लेता है।",
    english: "Whoever studies, listens to, or recites this holy Mahabharata becomes freed from all taints of sin and attains union with the Supreme Divine Brahman.",
    commentary: "Concludes the glorious Anukramanika Parva with the fruit of recitation (Phalashruti).",
    keyWords: ["Phalashruti", "Liberation", "Recitation", "Supreme Peace"]
  }
];

// 1. Update public/data/mahabharata/adi-parva.json
const adiParvaJsonPath = path.join(__dirname, '..', 'public', 'data', 'mahabharata', 'adi-parva.json');
if (fs.existsSync(adiParvaJsonPath)) {
  const data = JSON.parse(fs.readFileSync(adiParvaJsonPath, 'utf8'));
  
  // Replace the initial verses with our authentic ADHYAY_1_VERSES
  ADHYAY_1_VERSES.forEach((v, index) => {
    const verseObj = {
      id: `mb-1-${v.verseNumber}`,
      chapterId: "adi-parva",
      bookId: "mahabharata",
      verseNumber: v.verseNumber,
      subParva: "Anukramanika Parva",
      subParvaHindi: "अनुक्रमणिका पर्व (प्रथमोध्यायः)",
      speaker: v.speaker,
      sanskrit: v.sanskrit,
      transliteration: v.transliteration,
      hindi: v.hindi,
      english: v.english,
      commentary: v.commentary,
      keyWords: v.keyWords
    };
    
    if (index < data.verses.length) {
      data.verses[index] = verseObj;
    } else {
      data.verses.push(verseObj);
    }
  });

  fs.writeFileSync(adiParvaJsonPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Updated ${ADHYAY_1_VERSES.length} verses in adi-parva.json successfully.`);
}

// 2. Update app/data/mahabharataParvas.ts
const parvasTsPath = path.join(__dirname, '..', 'app', 'data', 'mahabharataParvas.ts');
if (fs.existsSync(parvasTsPath)) {
  let content = fs.readFileSync(parvasTsPath, 'utf8');
  
  // Build replacement verses TS array for Adi Parva
  const formattedVerses = ADHYAY_1_VERSES.map(v => {
    return `      {
        "id": "mb-1-${v.verseNumber}",
        "chapterId": "adi-parva",
        "bookId": "mahabharata",
        "verseNumber": ${v.verseNumber},
        "speaker": ${JSON.stringify(v.speaker)},
        "sanskrit": ${JSON.stringify(v.sanskrit)},
        "transliteration": ${JSON.stringify(v.transliteration)},
        "hindi": ${JSON.stringify(v.hindi)},
        "english": ${JSON.stringify(v.english)},
        "commentary": ${JSON.stringify(v.commentary)},
        "keyWords": ${JSON.stringify(v.keyWords, null, 10).replace(/\n/g, '\n        ')}
      }`;
  }).join(',\n');

  const adiIndex = content.indexOf('"id": "adi-parva"');
  const sabhaIndex = content.indexOf('"id": "sabha-parva"');
  if (adiIndex !== -1 && sabhaIndex !== -1) {
    const versesStart = content.indexOf('"verses": [', adiIndex);
    const versesEnd = content.lastIndexOf(']', sabhaIndex);
    if (versesStart !== -1 && versesEnd !== -1) {
      const before = content.substring(0, versesStart + '"verses": ['.length);
      const after = content.substring(versesEnd);
      content = before + '\n' + formattedVerses + '\n    ' + after;
      fs.writeFileSync(parvasTsPath, content, 'utf8');
      console.log(`Updated mahabharataParvas.ts Adi Parva verses successfully.`);
    } else {
      console.error('Could not find verses boundaries in mahabharataParvas.ts');
    }
  } else {
    console.error('Could not find chapter boundaries in mahabharataParvas.ts');
  }
}
