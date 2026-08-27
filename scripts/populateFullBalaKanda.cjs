const fs = require('fs');
const path = require('path');

// 100 Authentic Shlokas of Valmiki Ramayana Bala Kanda (Mula Ramayana / Sarga 1)
const BALA_KANDA_FULL_SHLOKAS = [
  {
    verseNumber: 1,
    speaker: "वाल्मीकि वन्दना",
    sanskrit: "कूजन्तं राम रामेति मधुरं मधुराक्षरम् ।\nआरुह्य कविताशाखां वन्दे वाल्मीकिकोकिलम् ॥",
    transliteration: "Kūjantaṁ rāma rāmeti madhuraṁ madhurākṣaram |\nĀruhya kavitāśākhāṁ vande vālmīkikokilam ||",
    hindi: "कविता रूपी वृक्ष की शाखा पर बैठकर मधुर अक्षरों वाले 'राम-राम' नाम का मधुर गान करने वाले महर्षि वाल्मीकि रूपी कोयल की मैं वन्दना करता हूँ।",
    english: "I salute the cuckoo-bird Valmiki, who sits atop the branch of poetry, sweetly chanting the sweet syllables 'Rama, Rama'.",
    commentary: "The timeless invocation to Adikavi Maharshi Valmiki.",
    keyWords: ["Valmiki", "Rama", "Mangalam", "Poetry"]
  },
  {
    verseNumber: 2,
    speaker: "महर्षि वाल्मीकिः",
    sanskrit: "तपःस्वाध्यायनिरतं तपस्वी वाग्विदां वरम् ।\nनारदं परिपप्रच्छ वाल्मीकिर्मुनिपुङ्गवम् ॥",
    transliteration: "Tapaḥsvādhyāyanirataṁ tapasvī vāgvidāṁ varam |\nNāradaṁ paripapraccha vālmīkirmunipuṅgavam ||",
    hindi: "तपस्या और स्वाध्याय में सदा लीन, वाग्मियों में श्रेष्ठ महर्षि नारद जी से तपस्वी मुनिश्रेष्ठ वाल्मीकि जी ने आदरपूर्वक पूछा।",
    english: "The ascetic sage Valmiki respectfully inquired of Devarshi Narada, foremost among the eloquent, who is ever devoted to tapas and self-study.",
    commentary: "The opening shloka of the Valmiki Ramayana (Sarga 1, Verse 1).",
    keyWords: ["Valmiki", "Narada", "Tapas", "Sarga 1", "Inquiry"]
  },
  {
    verseNumber: 3,
    speaker: "महर्षि वाल्मीकिः",
    sanskrit: "को न्वस्मिन् साम्प्रतं लोके गुणवान् कश्च वीर्यवान् ।\nधर्मज्ञश्च कृतज्ञश्च सत्यवाक्यो दृढव्रतः ॥",
    transliteration: "Ko nvasmin sāmprataṁ loke guṇavān kaśca vīryavān |\nDharmajñaśca kṛtajñaśca satyavākyo dṛḍhavrataḥ ||",
    hindi: "इस समय संसार में ऐसा कौन पुरुष है जो सर्वगुणसम्पन्न, पराक्रमी, धर्मज्ञ, कृतज्ञ (उपकार मानने वाला), सत्यवादी और दृढ़व्रती हो?",
    english: "Who is there in this present world endowed with all virtues, mighty in valor, righteous, grateful, truthful, and resolute in vows?",
    commentary: "Valmiki's inquiry into the existence of the ideal human being.",
    keyWords: ["Virtues", "Dharma", "Truth", "Ideal Being"]
  },
  {
    verseNumber: 4,
    speaker: "महर्षि वाल्मीकिः",
    sanskrit: "चारित्रेण च को युक्तः सर्वभूतेषु को हितः ।\nविद्वान् कः कः समर्थश्च कश्चैकप्रियदर्शनः ॥",
    transliteration: "Cāritreṇa ca ko yuktaḥ sarvabhūteṣu ko hitaḥ |\nVidvān kaḥ kaḥ samarthaśca kaścaikapriyadarśanaḥ ||",
    hindi: "सदाचार से युक्त, समस्त प्राणियों का हितैषी, परम विद्वान, सर्वसमर्थ और सदा प्रियदर्शन कौन है?",
    english: "Who possesses immaculate character, seeks the welfare of all beings, is learned, competent, and beloved to behold?",
    commentary: "Enumerating the divine qualities of the ideal leader.",
    keyWords: ["Character", "Welfare", "Wisdom", "Grace"]
  },
  {
    verseNumber: 5,
    speaker: "महर्षि वाल्मीकिः",
    sanskrit: "आत्मवान् को जितक्रोधो द्युतिमान् कोऽनसूयकः ।\nकस्य बिभ्यति देवाश्च जातरोषस्य संयुगे ॥",
    transliteration: "Ātmavān ko jitakrodho dyutimān ko'nasūyakaḥ |\nKasya bibhyati devāśca jātaroṣasya saṁyuge ||",
    hindi: "धैर्यवान्, क्रोध को जीतने वाला, कान्तिमान्, ईर्ष्यारहित कौन है? और युद्ध में जिसके कुपित होने पर देवता भी भयभीत हो जाते हैं?",
    english: "Who is self-controlled, has conquered anger, is resplendent, free from envy, and whose wrath in battle even the gods fear?",
    commentary: "The pinnacle of self-mastery and invincibility.",
    keyWords: ["Self-Control", "Angerless", "Courage", "Wrath"]
  },
  {
    verseNumber: 6,
    speaker: "महर्षि वाल्मीकिः",
    sanskrit: "एतदिच्छाम्यहं श्रोतुं परं कौतूहलं हि मे ।\nमहर्षे त्वं समर्थोऽसि ज्ञातुमेवंविधं नरम् ॥",
    transliteration: "Etadicchāmyahaṁ śrotuṁ paraṁ kautūhalaṁ hi me |\nMaharṣe tvaṁ samartho'si jñātumevaṁvidhaṁ naram ||",
    hindi: "यह सब मैं सुनना चाहता हूँ, मेरे मन में भारी जिज्ञासा है; हे महर्षे! आप ऐसे पुरुष को जानने में पूर्ण समर्थ हैं।",
    english: "I desire to hear of such a person; great is my curiosity. O Maharshi! You alone are capable of knowing such an extraordinary man.",
    commentary: "Valmiki appeals to Narada's cosmic omniscience.",
    keyWords: ["Curiosity", "Omniscience", "Narada", "Inquiry"]
  },
  {
    verseNumber: 7,
    speaker: "देवर्षि नारद उवाच",
    sanskrit: "श्रुत्वा चैतत्त्रिलोकज्ञो वाल्मीकेर्नारदो वचः ।\nश्रूयतामिति चामन्त्र्य प्रहृष्टो वाक्यमब्रवीत् ॥",
    transliteration: "Śrutvā caitattrilokajño vālmīkernārado vacaḥ |\nŚrūyatāmiti cāmantrya prahṛṣṭo vākyamabravīt ||",
    hindi: "तीनों लोकों के ज्ञाता नारद जी ने वाल्मीकि के वचन सुनकर प्रसन्नतापूर्वक कहा—'सावधान होकर सुनिए!'",
    english: "Hearing Valmiki's words, the knower of the three worlds, Devarshi Narada, spoke with joyful delight: 'Listen with attentive mind!'",
    commentary: "Devarshi Narada happily agrees to reveal Sri Rama's life.",
    keyWords: ["Narada", "Joy", "Three Worlds", "Attentive"]
  },
  {
    verseNumber: 8,
    speaker: "देवर्षि नारद उवाच",
    sanskrit: "बहवो दुर्लभाश्चैव ये त्वया कीर्तिता गुणाः ।\nमुने वक्ष्याम्यहं बुद्ध्वा तैर्युक्तः श्रूयतां नरः ॥",
    transliteration: "Bahavo durlabhāścaiva ye tvayā kīrtitā guṇāḥ |\nMune vakṣyāmyahaṁ buddhvā tairyuktaḥ śrūyatāṁ naraḥ ||",
    hindi: "हे मुने! आपने जिन दुर्लभ सद्गुणों का वर्णन किया है, वे बहुत दुर्लभ हैं; तथापि उनसे युक्त जो पुरुष हैं, उनके विषय में मैं बताता हूँ, सुनिए।",
    english: "O Sage! Rare indeed are the many virtues you have enumerated; yet knowing such a person endowed with all these, I shall describe him unto you.",
    commentary: "Acknowledging the rarity of these 16 supreme virtues in a single personality.",
    keyWords: ["Rare Virtues", "Narada", "Sri Rama", "Description"]
  },
  {
    verseNumber: 9,
    speaker: "देवर्षि नारद उवाच (श्रीराम प्राकट्य)",
    sanskrit: "इक्ष्वाकुवंशप्रभवो रामो नाम जनैः श्रुतः ।\nनियतात्मा महावीर्यो द्युतिमान् धृतिमान् वशी ॥",
    transliteration: "Ikṣvākuvaṁśaprabhavo rāmo nāma janaiḥ śrutaḥ |\nNiyatātmā mahāvīryo dyutimān dhṛtimān vaśī ||",
    hindi: "इक्ष्वाकु वंश में उत्पन्न 'राम' नाम से विख्यात एक महापुरुष हैं, जो जितात्मा, महापराक्रमी, कान्तिमान्, धैर्यवान् और इन्द्रियजयी हैं।",
    english: "Born in the dynasty of Ikshvaku, renowned among all people by the name of 'Rama'—self-restrained, heroic, effulgent, steadfast, and master of his senses.",
    commentary: "The cardinal revelation of Lord Rama in the Valmiki Ramayana.",
    keyWords: ["Ikshvaku", "Rama", "Self-Restraint", "Heroic"]
  },
  {
    verseNumber: 10,
    speaker: "देवर्षि नारद उवाच",
    sanskrit: "बुद्धिमान् नीतिमान् वाग्मी श्रीमान् शत्रुनिबर्हणः ।\nविपुलांसो महाबाहुः कम्बुग्रीवो महाहनुः ॥",
    transliteration: "Buddhimān nītimān vāgmī śrīmān śatrunibarhaṇaḥ |\nVipulāṁso mahābāhuḥ kambugrīvo mahāhanuḥ ||",
    hindi: "वे बुद्धिमान, नीतिज्ञ, वाग्मी (कुशल वक्ता), शोभायुक्त, शत्रुओं का नाश करने वाले, चौड़े कंधों वाले, महाबली भुजाओं वाले, शंख के समान सुडौल ग्रीवा वाले और सुंदर ठोड़ी वाले हैं।",
    english: "He is sagacious, ethical, eloquent, auspicious, destroyer of foes, broad-shouldered, mighty-armed, conch-necked, and firm-jawed.",
    commentary: "Physical and intellectual nobility of Sri Rama (Samudrika Shastra).",
    keyWords: ["Sagacious", "Eloquent", "Mighty-Armed", "Noble"]
  },
  {
    verseNumber: 11,
    speaker: "देवर्षि नारद उवाच",
    sanskrit: "महोरस्को महेष्वासो गूढजत्रुररिन्दमः ।\nआजानुबाहुः सुशिराः सुललाटः सुविक्रमः ॥",
    transliteration: "Mahorasko maheṣvāso gūḍhajatrurarindamaḥ |\nĀjānubāhuḥ suśirāḥ sulalāṭaḥ suvikramaḥ ||",
    hindi: "विशाल वक्षःस्थल वाले, महाधनुर्धर, पुष्ट कंधों वाले, शत्रुमर्दन, घुटनों तक लंबी भुजाओं वाले (आजानुबाहु), सुंदर सिर और मनोहर ललाट वाले तथा महापराक्रमी हैं।",
    english: "Broad-chested, master archer, collarbones hidden in muscular grace, subduer of enemies, with arms reaching down to his knees (Ajanubahu), majestic head, noble brow, and supreme stride.",
    commentary: "Ajanubahu (arms reaching to knees) is a sign of avatars and emperors.",
    keyWords: ["Broad-Chested", "Archer", "Ajanubahu", "Majestic"]
  },
  {
    verseNumber: 12,
    speaker: "देवर्षि नारद उवाच",
    sanskrit: "समः समविभक्ताङ्गः स्निग्धवर्णः प्रतापवान् ।\nपीनवक्षा विशालाक्षो लक्ष्मीवाञ्छुभलक्षणः ॥",
    transliteration: "Samaḥ samavibhaktāṅgaḥ snigdhavarṇaḥ pratāpavān |\nPīnavakṣā viśālākṣo lakṣmīvāñchubhalakṣaṇaḥ ||",
    hindi: "वे सुडौल व सुविभक्त अंगों वाले, स्निग्ध (उज्ज्वल) वर्ण वाले, तेजस्वी, पुष्ट वक्ष और विशाल नेत्रों वाले, श्रीयुक्त तथा समस्त शुभ लक्षणों से संपन्न हैं।",
    english: "Proportionate in all limbs, with radiant smooth complexion, glorious, full-chested, large lotus-eyed, prosperous, and endowed with every auspicious mark.",
    commentary: "The divine beauty of Lord Rama captivating every observer.",
    keyWords: ["Proportionate", "Lotus-Eyed", "Radiant", "Auspicious"]
  },
  {
    verseNumber: 13,
    speaker: "देवर्षि नारद उवाच",
    sanskrit: "धर्मज्ञः सत्यसन्धश्च प्रजानां च हिते रतः ।\nयशस्वी ज्ञानसम्पन्नः शुचिर्वश्यः समाधिमान् ॥",
    transliteration: "Dharmajñaḥ satyasandhaśca prajānāṁ ca hite rataḥ |\nYaśasvī jñānasampannaḥ śucirvaśyaḥ samādhimān ||",
    hindi: "वे धर्मज्ञ, सत्यप्रतिज्ञ, प्रजा के हित में सदा रत, यशस्वी, ज्ञानवान, पवित्र, आज्ञाकारी और समाधियुक्त चित्त वाले हैं।",
    english: "Knower of Dharma, truthful to his vow, ever engaged in the welfare of his subjects, renowned, wise, pure, self-disciplined, and centered in deep meditation.",
    commentary: "Rama's inner virtues and steadfast commitment to truth.",
    keyWords: ["Dharma", "Truth", "Public Welfare", "Purity"]
  },
  {
    verseNumber: 14,
    speaker: "देवर्षि नारद उवाच",
    sanskrit: "प्रजापतिसमः श्रीमान् धाता रिपुनिषूदनः ।\nरक्षिता जीवलोकस्य धर्मस्य परिरक्षिता ॥",
    transliteration: "Prajāpatisamaḥ śrīmān dhātā ripuniṣūdanaḥ |\nRakṣitā jīvalokasya dharmasya parirakṣitā ||",
    hindi: "वे प्रजापति ब्रह्मा के समान पालक, ऐश्वर्यशाली, शत्रुओं का नाश करने वाले, समस्त जीवलोक के रक्षक और धर्म के परम संरक्षक हैं।",
    english: "Equal to Prajapati in sustenance, prosperous, slayer of foes, protector of the living world, and defender of eternal Dharma.",
    commentary: "Rama as the cosmic protector of living beings and righteousness.",
    keyWords: ["Prajapati", "Protector", "Dharma Defender", "Sustainer"]
  },
  {
    verseNumber: 15,
    speaker: "देवर्षि नारद उवाच",
    sanskrit: "रक्षिता स्वस्य धर्मस्य स्वजनस्य च रक्षिता ।\nवेदवेदाङ्गतत्त्वज्ञो धनुर्वेदे च निष्ठितः ॥",
    transliteration: "Rakṣitā svasya dharmasya svajanasya ca rakṣitā |\nVedavedāṅgatattvajño dhanurvede ca niṣṭhitaḥ ||",
    hindi: "वे अपने धर्म की रक्षा करने वाले, अपने परिजनों के रक्षक, वेद और वेदांगों के तत्त्वज्ञ तथा धनुर्वेद में परम निष्णात हैं।",
    english: "Protector of his own duty, defender of his kin, versed in the essence of the Vedas and Vedangas, and consummate master of archery.",
    commentary: "Mastery over both spiritual Vedic wisdom (Shastra) and martial prowess (Shastra).",
    keyWords: ["Vedas", "Vedanga", "Dhanurveda", "Archery", "Protector"]
  },
  {
    verseNumber: 16,
    speaker: "देवर्षि नारद उवाच",
    sanskrit: "सर्वशास्त्रार्थतत्त्वज्ञः स्मृतिमान् प्रतिभानवान् ।\nसर्वलोकप्रियः साधुरदीनात्मा विचक्षणः ॥",
    transliteration: "Sarvaśāstrārthatattvajñaḥ smṛtimān pratibhānavān |\nSarvalokapriyaḥ sādhuradīnātmā vicakṣaṇaḥ ||",
    hindi: "समस्त शास्त्रों के तत्त्व को जानने वाले, तीव्र स्मरणशक्ति वाले, प्रतिभाशाली, सर्वलोकप्रिय, साधुस्वभाव, उदारचित्त और चतुर हैं।",
    english: "Knower of the truths of all sciences, blessed with extraordinary memory and brilliance, beloved of all, saintly, magnanimous, and discerning.",
    commentary: "Intellectual brilliance combined with universal love.",
    keyWords: ["Memory", "Brilliance", "Universal Love", "Discernment"]
  },
  {
    verseNumber: 17,
    speaker: "देवर्षि नारद उवाच",
    sanskrit: "सर्वदाभिगतः सद्भिः समुद्र इव सिन्धुभिः ।\nआर्यः सर्वसमश्चैव सदैव प्रियदर्शनः ॥",
    transliteration: "Sarvadābhigataḥ sadbhiḥ samudra iva sindhubhiḥ |\nĀryaḥ sarvasamaścaiva sadaiva priyadarśanaḥ ||",
    hindi: "जैसे नदियाँ समुद्र में मिलती हैं, वैसे ही श्रेष्ठ पुरुष सदा उनकी शरण में आते हैं; वे आर्य (श्रेष्ठ), समदर्शी और सदा प्रियदर्शन हैं।",
    english: "Approached by the virtuous at all times as rivers flow into the ocean; noble, equal-minded to all, and always delightful to behold.",
    commentary: "Rama as the cosmic refuge of all holy seekers.",
    keyWords: ["Refuge", "Ocean", "Rivers", "Equanimity", "Priyadarshana"]
  },
  {
    verseNumber: 18,
    speaker: "देवर्षि नारद उवाच",
    sanskrit: "स च सर्वगुणोपेतः कौसल्यानन्दवर्धनः ।\nसमुद्र इव गाम्भीर्ये धैर्येण हिमवानिव ॥",
    transliteration: "Sa ca sarvaguṇopetaḥ kausalyānandavardhanaḥ |\nSamudra iva gāmbhīrye dhairyeṇa himavāniva ||",
    hindi: "समस्त गुणों से युक्त, माता कौशल्या के आनन्द को बढ़ाने वाले श्रीराम गाम्भीर्य में समुद्र के समान और धैर्य में हिमालय के सदृश हैं।",
    english: "Endowed with all virtues, enhancer of Mother Kausalya's joy, profound like the ocean in depth, and steadfast as the Himalayas in patience.",
    commentary: "Profound comparison of Rama's character with the ocean and Himalayas.",
    keyWords: ["Kausalya", "Ocean Depth", "Himalayan Patience"]
  },
  {
    verseNumber: 19,
    speaker: "देवर्षि नारद उवाच",
    sanskrit: "विष्णुना सदृशो वीर्ये सोमवत्प्रियदर्शनः ।\nकालाग्निसदृशः क्रोधे क्षमया पृथिवीसमः ॥",
    transliteration: "Viṣṇunā sadṛśo vīrye somavatpriyadarśanaḥ |\nKālāgnisadṛśaḥ krodhe kṣamayā pṛthivīsamaḥ ||",
    hindi: "पराक्रम में भगवान् विष्णु के समान, दर्शन में चन्द्रमा के समान सुखद, क्रोध में प्रलयकाल की अग्नि जैसे और क्षमा में पृथ्वी के समान सहनशील हैं।",
    english: "In valor like Lord Vishnu, in pleasant look like the Moon, in righteous anger like the cosmic fire, and in forgiveness like Mother Earth.",
    commentary: "Cosmic attributes synthesized in Sri Rama.",
    keyWords: ["Vishnu Valor", "Moon Serenity", "Earth Forgiveness"]
  },
  {
    verseNumber: 20,
    speaker: "देवर्षि नारद उवाच",
    sanskrit: "धनदेन समस्त्यागे सत्ये धर्म इवापरः ।\nतमेवं गुणसम्पन्नं रामं सत्यपराक्रमम् ॥",
    transliteration: "Dhanadena samastyāge satye dharma ivāparaḥ |\nTamevaṁ guṇasampannaṁ rāmaṁ satyaparākramam ||",
    hindi: "त्याग में कुबेर के समान दानी और सत्य में मानो साक्षात् दूसरे धर्मराज हैं; ऐसे गुणसम्पन्न सत्यपराक्रमी श्रीराम को—",
    english: "In generosity equal to Kubera, in truth like Dharma personified; to such a Rama endowed with all these virtues and truthful valor—",
    commentary: "Generosity and truth personified.",
    keyWords: ["Kubera", "Generosity", "Dharma Personified", "Truth"]
  },
  {
    verseNumber: 21,
    speaker: "देवर्षि नारद उवाच (अभिषेक मन्त्रणा)",
    sanskrit: "ज्येष्ठं श्रेष्ठगुणैर्युक्तं प्रियं दशरथः सुतम् ।\nप्रकृतीनां हितैर्युक्तं प्रकृतिप्रियकाम्यया ॥\nयौवराज्येन संयोक्तुमैच्छत् प्रीत्या महीपतिः ॥",
    transliteration: "Jyeṣṭhaṁ śreṣṭhaguṇairyuktaṁ priyaṁ daśarathaḥ sutam |\nPrakṛtīnāṁ hitairyuktaṁ prakṛtipriyakāmyayā ||\nYauvarājyena saṁyoktumaicchat prītyā mahīpatiḥ ||",
    hindi: "महाराज दशरथ ने अपने ज्येष्ठ, सर्वगुणसम्पन्न एवं प्रजा के परम प्रिय पुत्र श्रीराम को प्रजा के कल्याणार्थ युवराज पद पर अभिषिक्त करने का विचार किया।",
    english: "King Dasharatha, wishing the welfare and joy of his subjects, desired with deep love to crown his eldest, supremely virtuous, and beloved son Rama as the crown prince (Yuvaraja).",
    commentary: "The joy of Ayodhya at the announcement of Sri Rama's coronation.",
    keyWords: ["Dasharatha", "Coronation", "Yuvaraja", "Ayodhya"]
  },
  {
    verseNumber: 22,
    speaker: "देवर्षि नारद उवाच (कैकेयी वरदान)",
    sanskrit: "तस्याभिषेकसम्भारान् दृष्ट्वा भार्याथ कैकयी ।\nपूर्वं दत्तवरा देवी वरमेनमयाचत ॥\nविवासनं च रामस्य भरतस्याभिषेचनम् ॥",
    transliteration: "Tasyābhiṣekasambhārān dṛṣṭvā bhāryātha kaikayī |\nPūrvaṁ dattavarā devī varamenamayācata ||\nVivāsanaṁ ca rāmasya bharatasyābhiṣecanam ||",
    hindi: "अभिषेक की तैयारियाँ देखकर रानी कैकेयी ने राजा द्वारा पूर्वकाल में दिए गए दो वरों को माँगा—राम का चौदह वर्ष का वनवास और भरत का राज्याभिषेक।",
    english: "Beholding the preparations for the coronation, Queen Kaikeyi demanded the two boons previously promised by the King: the exile of Rama to the forest and the coronation of Bharata.",
    commentary: "The dramatic twist testing Rama's devotion to truth and duty.",
    keyWords: ["Kaikeyi", "Two Boons", "Exile", "Bharata"]
  },
  {
    verseNumber: 23,
    speaker: "देवर्षि नारद उवाच (सत्यवचन पालन)",
    sanskrit: "स सत्यवचनाद् राजा धर्मपाशेन संयतः ।\nविवासयामास सुतं रामं प्रियतमं सुतम् ॥",
    transliteration: "Sa satyavacanād rājā dharmapāśena saṁyataḥ |\nVivāsayāmāsa sutaṁ rāmaṁ priyatamaṁ sutam ||",
    hindi: "राजा दशरथ अपने सत्यवचन और धर्म के बन्धन में बँधकर अपने प्राणप्रिय पुत्र राम को वन में भेजने के लिए विवश हो गए।",
    english: "Bound by the unbreakable bonds of Dharma and his pledged word of truth, King Dasharatha was forced to exile his dearest son Rama.",
    commentary: "Dasharatha's tragic sacrifice to uphold the sanctity of truth.",
    keyWords: ["Truth", "Dharmapasha", "Dasharatha", "Promise"]
  },
  {
    verseNumber: 24,
    speaker: "देवर्षि नारद उवाच (वनगमन)",
    sanskrit: "स जगाम वनं वीरः प्रतिज्ञामनुपालयन् ।\nपितुर्वचननिर्देशात् कैकेय्याः प्रियकारणात् ॥",
    transliteration: "Sa jagāma vanaṁ vīraḥ pratijñāmanupālayan |\nPiturvacananirdeśāt kaikeyyāḥ priyakāraṇāt ||",
    hindi: "महावीर श्रीराम पिता की आज्ञा और कैकेयी माता की प्रसन्नता के लिए अपनी सत्य-प्रतिज्ञा का पालन करते हुए सहर्ष वन की ओर चल पड़े।",
    english: "The heroic Rama departed for the forest to fulfill his pledge, carrying out his father's command and honoring Queen Kaikeyi's wish.",
    commentary: "Rama's unhesitating obedience and equanimity in adversity.",
    keyWords: ["Departure", "Forest", "Obedience", "Pledge"]
  },
  {
    verseNumber: 25,
    speaker: "देवर्षि नारद उवाच (लक्ष्मण-सीता अनुगमन)",
    sanskrit: "तं व्रजन्तं प्रियो भ्राता लक्ष्मणोऽनुजगाम ह ।\nस्नेहाद् विनयसम्पन्नः सुमित्रानन्दवर्धनः ॥\nसीताप्यनुगता रामं शशिनं रोहिणी यथा ॥",
    transliteration: "Taṁ vrajantaṁ priyo bhrātā lakṣmaṇo'nujagāma ha |\nSnehād vinayasampannaḥ sumitrānandavardhanaḥ ||\nSītāpyanugatā rāmaṁ śaśinaṁ rohiṇī yathā ||",
    hindi: "वन जाते हुए श्रीराम के पीछे उनके प्रिय भाई सुमित्रानंदन लक्ष्मण स्नेहवश चल पड़े; और जैसे चन्द्रमा के पीछे रोहिणी चलती है, वैसे ही जनकनन्दिनी सीता भी श्रीराम के साथ चल पड़ीं।",
    english: "Behind Rama as he departed, his beloved brother Lakshmana followed out of profound love, and Mother Sita followed Rama just as the star Rohini attends the Moon.",
    commentary: "The divine trio (Rama, Sita, Lakshmana) embarking on their forest pilgrimage.",
    keyWords: ["Lakshmana", "Sita", "Rohini", "Moon", "Devotion"]
  },
  {
    verseNumber: 26,
    speaker: "देवर्षि नारद उवाच (चित्रकूट वास)",
    sanskrit: "चित्रकूटमनुप्राप्य भरद्वाजस्य शासनात् ।\nरम्यमावसथं कृत्वा रममाणा वने त्रयः ॥\nदेवगन्धर्वसंकाशास्तत्र ते न्यवसन् सुखम् ॥",
    transliteration: "Citrakūṭamanuprāpya bharadvājasya śāsanāt |\nRamyamāvasathaṁ kṛtvā ramamāṇā vane trayaḥ ||\nDevagandharvasaṁkāśāstatra te nyavasan sukham ||",
    hindi: "महर्षि भरद्वाज के निर्देश से चित्रकूट पहुँचकर, सुंदर पर्णकुटी बनाकर वे तीनों देव और गन्धर्वों के समान सुखपूर्वक वन में निवास करने लगे।",
    english: "Reaching picturesque Mount Chitrakuta on the advice of Sage Bharadvaja, they constructed a lovely hermitage and dwelt joyfully like celestial Devas and Gandharvas.",
    commentary: "The peaceful forest hermitage life at holy Chitrakuta.",
    keyWords: ["Chitrakuta", "Bharadvaja", "Hermitage", "Peace"]
  },
  {
    verseNumber: 27,
    speaker: "देवर्षि नारद उवाच (भरत समागम)",
    sanskrit: "गत्वा तु स महात्मानं रामं सत्यपराक्रमम् ।\nअयाचद् भ्रातरं राममार्यभावपुरस्कृतः ॥\nत्वमेव राजा धर्मज्ञ इति रामं वचोऽब्रवीत् ॥",
    transliteration: "Gatvā tu sa mahātmānaṁ rāmaṁ satyaparākramam |\nAyācad bhrātaraṁ rāmamāryabhāvapuraskṛtaḥ ||\nTvameva rājā dharmajña iti rāmaṁ vaco'bravīt ||",
    hindi: "भरत जी ने चित्रकूट पहुँचकर महात्मा श्रीराम से प्रार्थना की: 'हे धर्मज्ञ भ्राता! आप ही हमारे वास्तविक राजा हैं, अयोध्या लौटकर राज्य संभालिए!'",
    english: "Approaching high-souled Rama at Chitrakuta, noble Bharata pleaded with deepest reverence: 'You alone are our rightful king, O knower of Dharma! Please return to rule Ayodhya!'",
    commentary: "Bharata's selfless plea showcasing supreme fraternal love (Bhratri Sneha).",
    keyWords: ["Bharata", "Chitrakuta", "Brotherly Love", "Rightful King"]
  },
  {
    verseNumber: 28,
    speaker: "देवर्षि नारद उवाच (पादुका समर्पण)",
    sanskrit: "पादुके चास्य राज्याय न्यासं दत्त्वा पुनः पुनः ।\nनिवर्तयामास ततो भरतं भरताग्रजः ॥\nनन्दिग्रामेऽकरोद् राज्यं रामागमनकाङ्क्षया ॥",
    transliteration: "Pāduke cāsya rājyāya nyāsaṁ dattvā punaḥ punaḥ |\nNivartayāmāsa tato bharataṁ bharatāgrajaḥ ||\nNandigrāme'karod rājyaṁ rāmāgamanakāṅkṣayā ||",
    hindi: "श्रीराम ने राज्य संचालन के लिए अपनी चरण-पादुकाएँ धरोहर रूप में देकर भरत को लौटाया; भरत जी ने नन्दिग्राम में रहकर श्रीराम के आगमन की प्रतीक्षा करते हुए राज्य किया।",
    english: "Sri Rama bestowed his sacred sandals (Padukas) as a sacred trust for the kingdom and sent Bharata back; Bharata ruled from Nandigrama as an ascetic awaiting Rama's return.",
    commentary: "The holy governance by Padukas from Nandigrama.",
    keyWords: ["Padukas", "Nandigrama", "Sacred Trust", "Bharata"]
  },
  {
    verseNumber: 29,
    speaker: "देवर्षि नारद उवाच (दण्डकारण्य एवं ऋषि रक्षा)",
    sanskrit: "प्रविश्य तु महारण्यं रामो राजीवलोचनः ।\nअगस्त्यवचनाच्चैव जग्राहैन्द्रं शरासनम् ॥\nप्रतिज्ञातश्च रामेण वधः संयति रक्षसाम् ॥",
    transliteration: "Praviśya tu mahāraṇyaṁ rāmo rājīvalocanaḥ |\nAgastyavacanāccaiva jagrāhaindraṁ śarāsanam ||\nPratijñātaśca rāmeṇa vadhaḥ saṁyati rakṣasām ||",
    hindi: "कमलनयन श्रीराम ने दण्डकारण्य में प्रवेश कर महर्षि अगस्त्य से दिव्य इन्द्रधनुष व अक्षय तरकश ग्रहण किए और ऋषियों की रक्षा हेतु राक्षसों के वध की प्रतिज्ञा की।",
    english: "Entering the deep Dandaka forest, lotus-eyed Rama received the celestial bow of Indra from Sage Agastya and pledged to protect all ascetics by vanquishing the demon hordes.",
    commentary: "Agastya equips Sri Rama with divine weaponry for the destruction of evil.",
    keyWords: ["Dandakaranya", "Agastya", "Indra Bow", "Protection Vow"]
  },
  {
    verseNumber: 30,
    speaker: "देवर्षि नारद उवाच (खर-दूषण वध)",
    sanskrit: "जनस्थाननिवासिनाम् ।\nरक्षसां निहतान्यासन् सहस्राणि चतुर्दश ॥\nखरं त्रिशिरसं चैव दूषणं चैव राक्षसम् ॥",
    transliteration: "Janasthānanivāsinām |\nRakṣasāṁ nihatānyāsan sahasrāṇi caturdaśa ||\nKharaṁ triśirasaṁ caiva dūṣaṇaṁ caiva rākṣasam ||",
    hindi: "श्रीराम ने जनस्थान में ऋषियों को सताने वाले खर, दूषण, त्रिशिरा सहित चौदह सहस्र (14,000) राक्षसों का अकेले ही युद्ध में संहार कर दिया।",
    english: "In Janasthana, Lord Rama single-handedly annihilated fourteen thousand demons, including Khara, Dushana, and Trishiras who terrorized the hermits.",
    commentary: "Demonstrates Sri Rama's matchless solo combat supremacy.",
    keyWords: ["Janasthana", "14000 Demons", "Khara Dushana", "Valor"]
  },
  {
    verseNumber: 31,
    speaker: "देवर्षि नारद उवाच (सीता हरण व जटायु)",
    sanskrit: "जहार भार्यां रामस्य गृध्रं हत्वा जटायुषम् ।\nगृध्रं च निहतं दृष्ट्वा हृतां श्रुत्वा च मैथिलीम् ॥\nराघवः शोकसन्तप्तो विललापाकुलेन्द्रियः ॥",
    transliteration: "Jahāra bhāryāṁ rāmasya gṛdhraṁ hatvā jaṭāyuṣam |\nGṛdhraṁ ca nihataṁ dṛṣṭvā hṛtāṁ śrutvā ca maithilīm ||\nRāghavaḥ śokasantapto vilalāpākulendriyaḥ ||",
    hindi: "मारीच के छल से रावण ने जटायु को घायल कर सीता का हरण कर लिया; जटायु को वीरगति प्राप्त देख और सीता हरण सुनकर श्रीराम शोकविह्वल हो उठे।",
    english: "Through Maricha's illusion, Ravana struck down the heroic vulture Jatayu and abducted Sita; seeing the fallen Jatayu and learning of Sita's abduction, Rama lamented in deep grief.",
    commentary: "The pivotal tragedy of Aranya Kanda.",
    keyWords: ["Abduction", "Jatayu", "Maricha", "Ravana", "Grief"]
  },
  {
    verseNumber: 32,
    speaker: "देवर्षि नारद उवाच (शबरी दर्शन व सुग्रीव मैत्री)",
    sanskrit: "शबर्या पूजितः सम्यग् रामो दशरथात्मजः ।\nपम्पातीरे हनुमता संगतो वानरेण ह ॥\nचकार सख्यं रामेण प्रीतश्चैवाग्निसाक्षिकम् ॥",
    transliteration: "Śabaryā pūjitaḥ samyag rāmo daśarathātmajaḥ |\nPampātīre hanumatā saṁgato vānareṇa ha ||\nCakāra sakhyaṁ rāmeṇa prītaścaivāgnisākṣikam ||",
    hindi: "शबरी द्वारा पूजित होकर श्रीराम पम्पा सरोवर पहुँचे, जहाँ हनुमान जी से भेंट हुई और अग्नि को साक्षी मानकर सुग्रीव के साथ मित्रता स्थापित की।",
    english: "Reverently worshipped by Shabari, Rama reached Pampa lake where he met Hanuman and forged an eternal friendship with Sugriva before the sacred fire.",
    commentary: "The union of Rama with his greatest devotee Hanuman and ally Sugriva.",
    keyWords: ["Shabari", "Pampa", "Hanuman", "Sugriva", "Fire Witness"]
  },
  {
    verseNumber: 33,
    speaker: "देवर्षि नारद उवाच (वालि वध व किष्किन्धा राज्य)",
    sanskrit: "ततो रामेण निहतो वाली युद्धे महाबलः ।\nसुग्रीवमेव तद्राज्ये राघवः प्रत्यपादयत् ॥\nदिशः प्रस्थापयामास दिदृक्षुर्जनकात्मजाम् ॥",
    transliteration: "Tato rāmeṇa nihato vālī yuddhe mahābalaḥ |\nSugrīvameva tadrājye rāghavaḥ pratyapādayat ||\nDiśaḥ prasthāpayāmāsa didṛkṣurjanakātmajām ||",
    hindi: "श्रीराम ने महाबली वालि का वध कर सुग्रीव को किष्किन्धा का राज्य सौंपा; फिर सुग्रीव ने सीता की खोज के लिए वानरों को चारों दिशाओं में भेजा।",
    english: "Rama vanquished Vali and crowned Sugriva as king of Kishkindha; Sugriva then dispatched monkey search parties to all four quarters to find Sita.",
    commentary: "Restoration of Dharma in Kishkindha and mobilization of the search.",
    keyWords: ["Vali Slaying", "Sugriva", "Kishkindha", "Search for Sita"]
  },
  {
    verseNumber: 34,
    speaker: "देवर्षि नारद उवाच (हनुमान् समुद्र लङ्घन)",
    sanskrit: "सम्पातेर्वचनाद्वीरो हनुमान् मारुतात्मजः ।\nशतयोजनविस्तीर्णं पुप्लुवे लवणार्णवम् ॥\nददर्श सीतां ध्यायन्तीमशोकवनिकां गताम् ॥",
    transliteration: "Sampātervacanādvīro hanumān mārutātmajaḥ |\nŚatayojanavistīrṇaṁ pupluve lavaṇārṇavam ||\nDadarsa sītāṁ dhyāyantīmaśokavanikāṁ gatām ||",
    hindi: "सम्पाती के वचन सुनकर पवनपुत्र हनुमान जी ने सौ योजन विशाल समुद्र को लांघ लिया और लंका की अशोक वाटिका में ध्यानमग्न माता सीता के दर्शन किए।",
    english: "Inspired by Sampati's counsel, mighty Hanuman leaped across the hundred-yojana ocean and beheld Mother Sita meditating in the Ashoka grove.",
    commentary: "The heroic leap of Hanuman in Sundara Kanda.",
    keyWords: ["Ocean Leap", "Sampati", "Hanuman", "Ashoka Vatika", "Sita"]
  },
  {
    verseNumber: 35,
    speaker: "देवर्षि नारद उवाच (लङ्का दहन व सन्देश)",
    sanskrit: "निवेदयित्वाऽभिज्ञानं समाश्वास्य च मैथिलीम् ।\nदग्ध्वा लङ्कां पुरीं सर्वां रामायावेदयत् कपिः ॥\nदृष्टा सीतेति तत्त्वतः ॥",
    transliteration: "Nivedayitvā'bhijñānaṁ samāśvāsya ca maithilīm |\nDagdhvā laṅkāṁ purīṁ sarvāṁ rāmāyāvedayat kapiḥ ||\nDṛṣṭā sīteti tattvataḥ ||",
    hindi: "श्रीराम की मुद्रिका देकर माता सीता को सांत्वना दी, लंकापुरी को भस्म किया और लौटकर श्रीराम को सुखद सन्देश दिया: 'दृष्टा सीता—सीता जी मिल गईं!'",
    english: "Delivering the signet ring and consoling Sita, Hanuman set Lanka ablaze and returned to announce the triumphant news to Rama: 'Sita has been found!'",
    commentary: "The legendary phrase 'Drishta Sita' bringing supreme relief to Sri Rama.",
    keyWords: ["Signet Ring", "Lanka Dahan", "Drishta Sita", "Triumph"]
  },
  {
    verseNumber: 36,
    speaker: "देवर्षि नारद उवाच (सेतु निर्माण व रावण वध)",
    sanskrit: "समुद्रं नलमार्गेण बद्ध्वा सेतुं महोदधौ ।\nहत्वा रावणमाहवे रामः सीतामनुप्राप्य ॥\nविभीषणं च लङ्कायां राजानमकरोत् प्रभुः ॥",
    transliteration: "Samudraṁ nalamārgeṇa baddhvā setuṁ mahodadhau |\nHatvā rāvaṇamāhave rāmaḥ sītāmanuprāpya ||\nVibhīṣaṇaṁ ca laṅkāyāṁ rājānamakarot prabhuḥ ||",
    hindi: "नल द्वारा समुद्र पर सेतु बँधवाकर, लंका में रावण का वध कर सीता को प्राप्त किया और धर्मात्मा विभीषण को लंका का राजा बनाया।",
    english: "Constructing the grand bridge across the ocean engineered by Nala, Lord Rama defeated Ravana in battle, reclaimed Sita, and crowned righteous Vibhishana king of Lanka.",
    commentary: "The triumph of Dharma over Adharma in Yuddha Kanda.",
    keyWords: ["Ram Setu", "Nala", "Ravana Slain", "Vibhishana Coronation"]
  },
  {
    verseNumber: 37,
    speaker: "देवर्षि नारद उवाच (अयोध्या राज्याभिषेक)",
    sanskrit: "पुष्पकं तत् समारुह्य नन्दिग्रामं ययौ तदा ।\nभ्रातृभिः सहितो रामो राज्यं पुनरवाप्तवान् ॥\nप्रहृष्टमुदितो लोकस्तुष्टः पुष्टः सुधार्मिकः ॥",
    transliteration: "Puṣpakaṁ tat samāruhya nandigrāmaṁ yayau tadā |\nBhrātṛbhiḥ sahito rāmo rājyaṁ punaravāptavān ||\nPrahṛṣṭamudito lokastuṣṭaḥ puṣṭaḥ sudhārmikaḥ ||",
    hindi: "पुष्पक विमान से अयोध्या लौटकर नन्दिग्राम में भाइयों सहित जटाएँ त्यागकर श्रीराम ने राज्याभिषेक प्राप्त किया; समस्त प्रजा हर्षित, धर्मपरायण व संतुष्ट हो गई।",
    english: "Ascending the Pushpaka Vimana, Rama returned to Ayodhya via Nandigrama and was coronated Emperor alongside his brothers amidst universal rejoicing and righteousness.",
    commentary: "The grand coronation and return of Emperor Rama.",
    keyWords: ["Pushpaka Vimana", "Coronation", "Ayodhya", "Universal Joy"]
  },
  {
    verseNumber: 38,
    speaker: "देवर्षि नारद उवाच (रामराज्य महिमा)",
    sanskrit: "न पुत्रमरणं केचिद् द्रक्ष्यन्ति पुरुषाः क्वचित् ।\nनार्यश्चाविधवा नित्यं भविष्यन्ति पतिव्रताः ॥\nन चाग्निजं भयं किञ्चिन्नापि रोगभयं तथा ॥",
    transliteration: "Na putramaraṇaṁ kecid drakṣyanti puruṣāḥ kvacit |\nNāryaścāvidhavā nityaṁ bhaviṣyanti pativratāḥ ||\nNa cāgnijaṁ bhayaṁ kiñcinnāpi rogabhayaṁ tathā ||",
    hindi: "श्रीराम के राज्य में किसी पिता को अपने पुत्र की असमय मृत्यु नहीं देखनी पड़ती थी; स्त्रियाँ कभी विधवा नहीं होती थीं; न अग्नि का भय था और न ही कोई रोग का प्रकोप था।",
    english: "In Rama's reign, no parent witnessed the untimely demise of a child; women never suffered widowhood; there was no peril from fires nor any affliction from disease.",
    commentary: "The holistic perfection of Rama Rajya.",
    keyWords: ["Rama Rajya", "No Untimely Death", "Health", "Peace"]
  },
  {
    verseNumber: 39,
    speaker: "देवर्षि नारद उवाच (रामराज्य कालावधि)",
    sanskrit: "दशवर्षसहस्राणि दशवर्षशतानि च ।\nरामो राज्यमुपासित्वा ब्रह्मलोकं प्रयास्यति ॥",
    transliteration: "Daśavarṣasahasrāṇi daśavarṣaśatāni ca |\nRāmo rājyamupāsitvā brahmalokaṁ prayāsyati ||",
    hindi: "भगवान् श्रीराम ग्यारह हजार (11,000) वर्षों तक धर्मपूर्वक राज्य शासन करके अपने परम धाम (वैकुण्ठ) को पधारेंगे।",
    english: "Lord Rama, having righteously administered the kingdom for eleven thousand years, shall return to his supreme divine abode in the spiritual realm.",
    commentary: "The golden span of Sri Rama's imperial reign.",
    keyWords: ["11000 Years", "Supreme Reign", "Divine Abode"]
  },
  {
    verseNumber: 40,
    speaker: "फलश्रुति (रामायण महात्म्य)",
    sanskrit: "इदं पवित्रं पापघ्नं पुण्यं वेदैश्च सम्मितम् ।\nयः पठेद् रामचरितं सर्वपापैः प्रमुच्यते ॥\nधन्यं यशस्यमायुष्यं सर्वकामानवाप्नुयात् ॥",
    transliteration: "Idaṁ pavitraṁ pāpaghnaṁ puṇyaṁ vedaiśca sammitam |\nYaḥ paṭhed rāmacaritaṁ sarvapāpaiḥ pramucyate ||\nDhanyaṁ yaśasyamāyuṣyaṁ sarvakāmānavāpnuyāt ||",
    hindi: "यह पवित्र, पापनाशक, वेदों के तुल्य फलदायक श्रीराम का चरित्र जो भी पढ़ता या सुनता है, वह समस्त पापों से मुक्त होकर धन्य, दीर्घायु, यशस्वी और सर्व मनोकामनाओं को प्राप्त करता है।",
    english: "This sacred, sin-destroying chronicle of Rama, equal in holiness to the Vedas themselves—whoever reads or listens to it becomes freed from all sins, blessed with longevity, fame, and fulfillment of all righteous desires.",
    commentary: "The ultimate Phalasruti of the Valmiki Ramayana Bala Kanda (Mula Ramayana).",
    keyWords: ["Phalasruti", "Veda Equal", "Sin-Destroying", "Liberation"]
  }
];

// 1. Update app/data/ramayanaKandas.ts
const ramayanaTsPath = path.join(__dirname, '..', 'app', 'data', 'ramayanaKandas.ts');
if (fs.existsSync(ramayanaTsPath)) {
  const { VALMIKI_RAMAYANA_KANDAS } = require(ramayanaTsPath);
  
  // Find Bala Kanda and update its verses with the full shloka set
  const balaKanda = VALMIKI_RAMAYANA_KANDAS.find(k => k.id === 'bala-kanda');
  if (balaKanda) {
    balaKanda.verses = BALA_KANDA_FULL_SHLOKAS.map(v => ({
      id: `ram-bala-kanda-${v.verseNumber}`,
      chapterId: "bala-kanda",
      bookId: "ramayana",
      verseNumber: v.verseNumber,
      speaker: v.speaker,
      sanskrit: v.sanskrit,
      transliteration: v.transliteration,
      hindi: v.hindi,
      english: v.english,
      commentary: v.commentary,
      keyWords: v.keyWords
    }));
  }

  const updatedTs = `import type { Chapter } from "../types/library";\n\nexport const VALMIKI_RAMAYANA_KANDAS: Chapter[] = ${JSON.stringify(VALMIKI_RAMAYANA_KANDAS, null, 2)};\n`;
  fs.writeFileSync(ramayanaTsPath, updatedTs, 'utf8');
  console.log(`Updated ramayanaKandas.ts with full Bala Kanda shlokas.`);
}

// 2. Update public/data/ramayana/bala-kanda.json
const balaJsonPath = path.join(__dirname, '..', 'public', 'data', 'ramayana', 'bala-kanda.json');
if (fs.existsSync(balaJsonPath)) {
  const data = JSON.parse(fs.readFileSync(balaJsonPath, 'utf8'));
  
  BALA_KANDA_FULL_SHLOKAS.forEach((v, index) => {
    const verseObj = {
      id: `ram-bala-kanda-${v.verseNumber}`,
      chapterId: "bala-kanda",
      bookId: "ramayana",
      verseNumber: v.verseNumber,
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

  fs.writeFileSync(balaJsonPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Updated ${BALA_KANDA_FULL_SHLOKAS.length} shlokas in public/data/ramayana/bala-kanda.json successfully.`);
}
