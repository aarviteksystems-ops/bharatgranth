const fs = require('fs');
const path = require('path');

const RAMAYANA_KANDAS_DATA = [
  {
    id: "bala-kanda",
    bookId: "ramayana",
    number: 1,
    sectionName: "1. Bala Kanda (बालकाण्ड)",
    titleSanskrit: "बालकाण्डम् - मूलरामायणम्, रामजन्मोत्सवः एवं जनकपुरी धनुर्भङ्गः",
    titleHindi: "बालकाण्ड - मर्यादा पुरुषोत्तम श्री राम का दिव्य प्राकट्य एवं सीता स्वयंवर",
    titleEnglish: "Bala Kanda - The Divine Incarnation, Early Virtues & Sita's Wedding",
    shlokaCount: 3150,
    summary: "Sage Valmiki's dialogue with Narada (Mula Ramayana), the birth of Lord Rama and his brothers in Ayodhya, the protection of Sage Vishvamitra's sacrifice, liberation of Ahalya, and the breaking of Shiva's bow in Mithila to marry Devi Sita.",
    verses: [
      {
        verseNumber: 1,
        speaker: "वाल्मीकि वन्दना",
        sanskrit: "कूजन्तं राम रामेति मधुरं मधुराक्षरम् ।\nआरुह्य कविताशाखां वन्दे वाल्मीकिकोकिलम् ॥",
        transliteration: "Kūjantaṁ rāma rāmeti madhuraṁ madhurākṣaram |\nĀruhya kavitāśākhāṁ vande vālmīkikokilam ||",
        hindi: "कविता रूपी कल्पवृक्ष की शाखा पर बैठकर मधुर अक्षरों वाले 'राम-राम' नाम का मधुर गान करने वाले महर्षि वाल्मीकि रूपी कोयल की मैं वन्दना करता हूँ।",
        english: "I salute the celestial cuckoo Valmiki, who sits atop the branch of the tree of poetry, sweetly warbling the nectarine syllables 'Rama, Rama'.",
        commentary: "The timeless introductory salutation dedicated to Adikavi Maharshi Valmiki.",
        keyWords: ["Valmiki", "Rama", "Adikavya", "Mangalam"]
      },
      {
        verseNumber: 2,
        speaker: "महर्षि वाल्मीकिः (नारद संवाद)",
        sanskrit: "तपःस्वाध्यायनिरतं तपस्वी वाग्विदां वरम् ।\nनारदं परिपप्रच्छ वाल्मीकिर्मुनिपुङ्गवम् ॥",
        transliteration: "Tapaḥsvādhyāyanirataṁ tapasvī vāgvidāṁ varam |\nNāradaṁ paripapraccha vālmīkirmunipuṅgavam ||",
        hindi: "तपस्या और स्वाध्याय में सदा लीन रहने वाले, वाग्मियों में श्रेष्ठ महर्षि नारद जी से तपस्वी मुनिश्रेष्ठ वाल्मीकि जी ने आदरपूर्वक प्रश्न किया।",
        english: "The ascetic sage Valmiki respectfully inquired of Devarshi Narada, the foremost of all eloquent speakers, who is eternally engaged in austerity and Vedic contemplation.",
        commentary: "The historic opening shloka of the Valmiki Ramayana (Sarga 1, Verse 1).",
        keyWords: ["Valmiki", "Narada", "Tapas", "Inquiry", "Sarga 1"]
      },
      {
        verseNumber: 3,
        speaker: "महर्षि वाल्मीकिः",
        sanskrit: "को न्वस्मिन् साम्प्रतं लोके गुणवान् कश्च वीर्यवान् ।\nधर्मज्ञश्च कृतज्ञश्च सत्यवाक्यो दृढव्रतः ॥",
        transliteration: "Ko nvasmin sāmprataṁ loke guṇavān kaśca vīryavān |\nDharmajñaśca kṛtajñaśca satyavākyo dṛḍhavrataḥ ||",
        hindi: "इस समय संसार में ऐसा कौन पुरुष है जो सर्वगुणसम्पन्न, पराक्रमी, धर्म का ज्ञाता, उपकारों को मानने वाला (कृतज्ञ), सत्यवादी और अपने व्रतों में दृढ़ रहने वाला हो?",
        english: "Who is there in this present world who is endowed with all virtues, mighty in valor, knower of righteousness, grateful, devoted to truth, and firm in his vows?",
        commentary: "Valmiki seeks the living ideal of perfected human nobility (Maryada Purushottama).",
        keyWords: ["Virtues", "Dharma", "Truth", "Ideal Man", "Sixteen Virtues"]
      },
      {
        verseNumber: 4,
        speaker: "महर्षि वाल्मीकिः",
        sanskrit: "चारित्रेण च को युक्तः सर्वभूतेषु को हितः ।\nविद्वान् कः कः समर्थश्च कश्चैकप्रियदर्शनः ॥",
        transliteration: "Cāritreṇa ca ko yuktaḥ sarvabhūteṣu ko hitaḥ |\nVidvān kaḥ kaḥ samarthaśca kaścaikapriyadarśanaḥ ||",
        hindi: "सदाचार से युक्त, समस्त प्राणियों का कल्याण चाहने वाला, परम विद्वान, सर्वसमर्थ और सदा मन को मोह लेने वाले प्रिय दर्शन वाला कौन है?",
        english: "Who possesses immaculate character, seeks the welfare of all living beings, is deeply learned, all-competent, and singularly pleasing to behold for all?",
        commentary: "Depicts the aesthetic, intellectual, and compassionate dimensions of the ideal being.",
        keyWords: ["Character", "Compassion", "Priyadarshana", "Wisdom"]
      },
      {
        verseNumber: 5,
        speaker: "देवर्षि नारद उवाच",
        sanskrit: "इक्ष्वाकुवंशप्रभवो रामो नाम जनैः श्रुतः ।\nनियतात्मा महावीर्यो द्युतिमान् धृतिमान् वशी ॥",
        transliteration: "Ikṣvākuvaṁśaprabhavo rāmo nāma janaiḥ śrutaḥ |\nNiyatātmā mahāvīryo dyutimān dhṛtimān vaśī ||",
        hindi: "देवर्षि नारद ने कहा: इक्ष्वाकु वंश में उत्पन्न 'राम' नाम से लोकविख्यात एक परम पुरुष हैं; वे जितात्मा, महापराक्रमी, कान्तिमान, धैर्यवान और इन्द्रियों को वश में रखने वाले हैं।",
        english: "Devarshi Narada replied: There is a person born in the Ikshvaku dynasty renowned among all people by the name of 'Rama'—self-restrained, heroic, effulgent, steadfast, and master of his senses.",
        commentary: "Narada reveals Lord Rama as the embodiment of all sixteen supreme virtues.",
        keyWords: ["Ikshvaku", "Rama", "Narada", "Self-Mastery", "Effulgence"]
      },
      {
        verseNumber: 6,
        speaker: "देवर्षि नारद उवाच",
        sanskrit: "धर्मज्ञः सत्यसन्धश्च प्रजानां च हिते रतः ।\nयशस्वी ज्ञानसम्पन्नः शुचिर्वश्यः समाधिमान् ॥",
        transliteration: "Dharmajñaḥ satyasandhaśca prajānāṁ ca hite rataḥ |\nYaśasvī jñānasampannaḥ śucirvaśyaḥ samādhimān ||",
        hindi: "वे धर्म के मर्मज्ञ, सत्यप्रतिज्ञ, प्रजा के हित में निरंतर रत, यशस्वी, तत्त्वज्ञान से सम्पन्न, पवित्र, विनम्र और समाधियुक्त चित्त वाले हैं।",
        english: "He is the master of righteousness, true to his pledge, ever devoted to the welfare of his people, renowned, endowed with wisdom, pure, noble, and established in profound contemplation.",
        commentary: "Summarizes Rama's governance and moral integrity.",
        keyWords: ["Dharma", "Truthfulness", "Public Welfare", "Wisdom"]
      },
      {
        verseNumber: 7,
        speaker: "देवर्षि नारद उवाच",
        sanskrit: "समुद्र इव गाम्भीर्ये धैर्येण हिमवानिव ।\nविष्णुना सदृशो वीर्ये सोमवत्प्रियदर्शनः ॥\nकालाग्निसदृशः क्रोधे क्षमया पृथिवीसमः ॥",
        transliteration: "Samudra iva gāmbhīrye dhairyeṇa himavāniva |\nViṣṇunā sadṛśo vīrye somavatpriyadarśanaḥ ||\nKālāgnisadṛśaḥ krodhe kṣamayā pṛthivīsamaḥ ||",
        hindi: "वे गम्भीरता में समुद्र के समान, धैर्य में हिमालय जैसे, पराक्रम में भगवान् विष्णु के सदृश, सौम्यता में चन्द्रमा के समान प्रियदर्शी, क्रोध में प्रलयंकारी अग्नि तथा क्षमा में पृथ्वी के समान सहनशील हैं।",
        english: "He is profound like the ocean, steadfast like the Himalayas, matchless in valor like Vishnu, delightful to behold like the full moon, fierce like cosmic fire in righteous fury, and patient as Mother Earth in forgiveness.",
        commentary: "The celebrated multi-dimensional portrait of Lord Rama's personality.",
        keyWords: ["Ocean", "Himalayas", "Vishnu", "Earth", "Forgiveness", "Valor"]
      },
      {
        verseNumber: 8,
        speaker: "आदिकाव्य छन्दोत्पत्ति (सर्ग २)",
        sanskrit: "मा निषाद प्रतिष्ठां त्वमगमः शाश्वतीः समाः ।\nयत्क्रौञ्चमिथुनादेकमवधीः काममोहितम् ॥",
        transliteration: "Mā niṣāda pratiṣṭhāṁ tvamagamaḥ śāśvatīḥ samāḥ |\nYatkrauñcamithunādekamavadhīḥ kāmamohitam ||",
        hindi: "महर्षि वाल्मीकि के मुख से अनायास निकला प्रथम श्लोक: हे निषाद! तुझे अनन्त काल तक कभी शान्ति व प्रतिष्ठा प्राप्त न हो, क्योंकि तूने प्रणयलीन क्रौञ्च पक्षी के जोड़े में से एक का वध कर दिया!",
        english: "The world's first poetic verse (Adishloka) uttered spontaneously by Valmiki: O hunter! May you never find peace or honor for endless years, since you slew one of the loving Krauncha birds while in amorous bliss!",
        commentary: "The divine birth of Sanskrit classical poetry (Anushtup meter) born from Sage Valmiki's grief and deep empathy (Shoka became Shloka).",
        keyWords: ["Ma Nishada", "Adishloka", "Anushtup", "Krauncha", "Empathy"]
      },
      {
        verseNumber: 9,
        speaker: "धनुर्भङ्ग एवं सीता पाणिग्रहण",
        sanskrit: "इयं सीता मम सुता सहधर्मचरी तव ।\nप्रतीच्छ चैनां भद्रं ते पाणिं गृह्णीष्व पाणिना ॥\nपतिव्रता महाभागा छायेवानुगता सदा ॥",
        transliteration: "Iyaṁ sītā mama sutā sahadharmacarī tava |\nPratīccha caināṁ bhadraṁ te pāṇiṁ gṛhṇīṣva pāṇinā ||\nPativratā mahābhāgā chāyevānugatā sadā ||",
        hindi: "महाराज जनक ने कहा: हे राम! यह मेरी पुत्री सीता आपकी सहधर्मचारिणी बनेगी। इसका हाथ अपने हाथ में ग्रहण कीजिए; आपका कल्याण हो। यह परम सौभाग्यवती पतिव्रता सदैव आपकी छाया के समान आपका अनुगमन करेगी।",
        english: "King Janaka pronounced: Here is Sita, my daughter, who shall walk with you as your companion in righteousness (Sahadharmachari). Take her hand into yours; blessed be you. Supremely fortunate and devoted, she will follow you forever like your own shadow.",
        commentary: "The holy Vedic wedding mantra pronounced at the divine union of Sita and Rama in Mithila.",
        keyWords: ["Sita", "Janaka", "Wedding", "Sahadharmachari", "Mithila"]
      }
    ]
  },
  {
    id: "ayodhya-kanda",
    bookId: "ramayana",
    number: 2,
    sectionName: "2. Ayodhya Kanda (अयोध्याकाण्ड)",
    titleSanskrit: "अयोध्याकाण्डम् - अभिषेक मन्त्रणा, वनगमनम् एवं भरत पादुका राज्यम्",
    titleHindi: "अयोध्याकाण्ड - श्री राम का वनगमन, कैकेयी वरदान एवं भरत का पादुका शासन",
    titleEnglish: "Ayodhya Kanda - The Renunciation, Exile to the Forest & Bharata's Devotion",
    shlokaCount: 4300,
    summary: "The preparations for Rama's coronation, Kaikeyi's boons demanding exile, Rama's unwavering adherence to truth, the departure to Dandakaranya with Sita and Lakshmana, King Dasharatha's grief, and Bharata ruling Ayodhya via Rama's sacred Padukas from Nandigrama.",
    verses: [
      {
        verseNumber: 1,
        speaker: "महर्षि वाल्मीकिः",
        sanskrit: "रामो विग्रहवान् धर्मः साधुः सत्यपराक्रमः ।\nराजा सर्वस्य लोकस्य देवानामिव वासवः ॥",
        transliteration: "Rāmo vigrahavān dharmaḥ sādhuḥ satyaparākramaḥ |\nRājā sarvasya lokasya devānāmiva vāsavaḥ ||",
        hindi: "भगवान् श्रीराम साक्षात् धर्म के मूर्त विग्रह (स्वरूप) हैं; वे परम साधु, सत्यपराक्रमी और समस्त लोकों के उसी प्रकार अधिपति हैं जैसे देवताओं के राजा इन्द्र।",
        english: "Lord Rama is Righteousness incarnate (Vigrahavan Dharmah); saintly, of truthful valor, and the supreme ruler of all worlds just as Indra is to the gods.",
        commentary: "One of the most famous declarations in Sanskrit literature defining Rama as the living embodiment of Dharma.",
        keyWords: ["Vigrahavan Dharma", "Rama", "Righteousness", "Truth"]
      },
      {
        verseNumber: 2,
        speaker: "श्रीराम उवाच (पितृवचन पालन)",
        sanskrit: "धर्मादर्थः प्रभवति धर्मात् प्रभवते सुखम् ।\nधर्मेण लभते सर्वं धर्मसारमिदं जगत् ॥",
        transliteration: "Dharmādarthaḥ prabhavati dharmāt prabhavate sukham |\nDharmeṇa labhate sarvaṁ dharmasāramidaṁ jagat ||",
        hindi: "धर्म से ही अर्थ (समृद्धि) उत्पन्न होता है, धर्म से ही सच्चा सुख मिलता है; धर्म के द्वारा ही मनुष्य सब कुछ प्राप्त करता है, क्योंकि यह सम्पूर्ण जगत धर्म के ही आधार पर स्थित है।",
        english: "From Dharma alone arises true wealth, from Dharma springs genuine happiness; by Dharma is everything attained, for this entire cosmos is sustained by the essence of Dharma.",
        commentary: "Sri Rama explains to Lakshmana why upholding their father's promise is the supreme duty.",
        keyWords: ["Dharma", "Happiness", "Cosmos", "Duty", "Exile"]
      },
      {
        verseNumber: 3,
        speaker: "माता सीता उवाच",
        sanskrit: "न हि ते विप्रहीणस्य जीवनं रोचते मम ।\nप्रासादे स्वर्गलोके वा न मे वासो विना त्वया ॥",
        transliteration: "Na hi te viprahīṇasya jīvanaṁ rocate mama |\nPrāsāde svargaloke vā na me vāso vinā tvayā ||",
        hindi: "माता सीता ने कहा: हे प्राणनाथ! आपसे वियुक्त होकर मुझे जीवन का कोई सुख नहीं चाहिए। आपके बिना न मुझे राजमहल की इच्छा है और न ही स्वर्गलोक का वास प्रिय है; जहाँ आप हैं वहीं मेरा स्वर्ग है।",
        english: "Mother Sita pleaded: Separated from you, my Lord, life holds no joy for me. Without you, I desire neither palaces nor the heavenly realms; where you dwell, there lies my true paradise.",
        commentary: "The matchless devotion and resolve of Devi Sita accompanying Lord Rama to the forest.",
        keyWords: ["Sita", "Devotion", "Forest Exile", "Unwavering Love"]
      },
      {
        verseNumber: 4,
        speaker: "भरत प्रतिज्ञा (नन्दिग्राम)",
        sanskrit: "पादुके चास्य राज्यस्य रक्षार्थं भरतो ददौ ।\nनन्दिग्रामे स्थितो वीरो राज्यं चकार धर्मवित् ॥",
        transliteration: "Pāduke cāsya rājyasya rakṣārthaṁ bharato dadau |\nNandigrāme sthito vīro rājyaṁ cakāra dharmavit ||",
        hindi: "धर्मज्ञ भरत जी ने राज्य की रक्षा के लिए श्रीराम की दिव्य चरण-पादुकाओं को सिंहासन पर प्रतिष्ठित किया और स्वयं एक संन्यासी की भाँति नन्दिग्राम में रहकर सेवक भाव से राज्य का संचालन किया।",
        english: "The righteous Bharata placed Rama's sacred sandals (Padukas) upon the throne to guard the kingdom, and residing as an ascetic at Nandigrama, administered the realm purely as Rama's servant.",
        commentary: "The pinnacle of selfless devotion (Bhakti) and detachment demonstrated by Prince Bharata.",
        keyWords: ["Bharata", "Paduka", "Nandigrama", "Selfless Service"]
      }
    ]
  },
  {
    id: "aranya-kanda",
    bookId: "ramayana",
    number: 3,
    sectionName: "3. Aranya Kanda (अरण्यकाण्ड)",
    titleSanskrit: "अरण्यकाण्डम् - दण्डकारण्य वासः, शूर्पणखा प्रसङ्गः, जटायु मोक्षः एवं शबरी कृपा",
    titleHindi: "अरण्यकाण्ड - दण्डकारण्य निवास, मारीच माया, सीता हरण एवं शबरी उद्धार",
    titleEnglish: "Aranya Kanda - Life in Dandakaranya, the Golden Deer & the Abduction of Sita",
    shlokaCount: 2440,
    summary: "The ascetic hermitage life in Dandakaranya, the confrontation with Shurpanakha, the deceptive golden deer Maricha, Ravana's abduction of Devi Sita, the heroic martyrdom of Jatayu, and Rama's tender blessing to Shabari.",
    verses: [
      {
        verseNumber: 1,
        speaker: "जटायु शौर्य",
        sanskrit: "जटायुर्महावीर्यः पक्षिराजो महाबलः ।\nसीताया रक्षणार्थाय रावणं समयासत ॥\nधर्मार्थं त्यक्तजीवितः स्वर्गलोकमवाप सः ॥",
        transliteration: "Jatāyurmahāvīryaḥ pakṣirājo mahābalaḥ |\nSītāyā rakṣaṇārthāya rāvaṇaṁ samayāsata ||\nDharmārthaṁ tyaktajīvitaḥ svargalokamavāpa saḥ ||",
        hindi: "महापराक्रमी पक्षिराज जटायु ने माता सीता की रक्षा के लिए अकेले ही दुराचारी रावण से भीषण युद्ध किया और धर्म की रक्षा में अपने प्राण न्योछावर करके परम धाम प्राप्त किया।",
        english: "The mighty bird king Jatayu heroically fought against Ravana to rescue Mother Sita, sacrificing his life for the sake of righteousness, and was granted supreme liberation by Lord Rama.",
        commentary: "Jatayu exemplifies ultimate self-sacrifice and devotion.",
        keyWords: ["Jatayu", "Ravana", "Martyrdom", "Liberation", "Dharma"]
      },
      {
        verseNumber: 2,
        speaker: "शबरी भक्ति",
        sanskrit: "शबरी परमप्रीता रामं दृष्ट्वा महात्मना ।\nफलानि चातिपक्वानि ददौ भक्तिसमन्विता ॥\nतस्याः प्रीत्या जगन्नाथः परिजग्राह तद् हविः ॥",
        transliteration: "Śabarī paramaprītā rāmaṁ dṛṣṭvā mahātmanā |\nPhalāni cātipakvāni dadau bhaktisamanvitā ||\nTasyāḥ prītyā jagannāthaḥ parijagrāha tad haviḥ ||",
        hindi: "परम तपस्विनी शबरी भगवान् श्रीराम के दर्शन पाकर भावविभोर हो उठीं और उन्होंने अगाध प्रेम से चुन-चुनकर मधुर फल अर्पित किए; जगन्नाथ प्रभु ने उनके प्रेमपूर्ण उपहार को सहर्ष स्वीकार किया।",
        english: "Filled with transcendent bliss upon beholding Lord Rama, the pious ascetic Shabari offered sweet wild berries with pure devotion, and the Lord of the Universe lovingly accepted her simple offering.",
        commentary: "The immortal illustration that pure love transcends all social boundaries in the eyes of God.",
        keyWords: ["Shabari", "Pure Devotion", "Berries", "Grace", "Pampa"]
      }
    ]
  },
  {
    id: "kishkindha-kanda",
    bookId: "ramayana",
    number: 4,
    sectionName: "4. Kishkindha Kanda (किष्किन्धाकाण्ड)",
    titleSanskrit: "किष्किन्धाकाण्डम् - सुग्रीव सख्यम्, वालि वधः एवं सीतान्वेषणाय वानर प्रस्थानम्",
    titleHindi: "किष्किन्धाकाण्ड - श्री राम-सुग्रीव मित्रता, वालि वध एवं सीता खोज का शुभारंभ",
    titleEnglish: "Kishkindha Kanda - The Alliance with Sugriva, the Slaying of Vali & the Search for Sita",
    shlokaCount: 2420,
    summary: "The sacred friendship forged between Lord Rama and Sugriva, the restoration of Kishkindha's kingdom, sending Vanara search parties across all four quarters, and discovering Sita's whereabouts across the southern ocean.",
    verses: [
      {
        verseNumber: 1,
        speaker: "श्रीराम उवाच (उत्साह महिमा)",
        sanskrit: "उत्साहो बलवानार्य नास्त्युत्साहात् परं बलम् ।\nसोत्साहस्य हि लोकेषु न किञ्चिदपि दुर्लभम् ॥",
        transliteration: "Utsāho balavānārya nāstyutsāhāt paraṁ balam |\nSotsāhasya hi lokeṣu na kiñcidapi durlabham ||",
        hindi: "हे आर्य! उत्साह (दृढ़ संकल्प व सकारात्मक ऊर्जा) ही सबसे बड़ा बल है; उत्साह से बढ़कर कोई शक्ति नहीं है। उत्साही पुरुष के लिए तीनों लोकों में कुछ भी दुर्लभ नहीं है।",
        english: "O Noble One! Enthusiasm and unwavering courage are the greatest strength; there is no power superior to inner drive. For a person endowed with enthusiasm, nothing in this universe is impossible to achieve.",
        commentary: "Lord Rama inspiring Lakshmana and the Vanaras with the eternal psychology of enthusiasm and resilience.",
        keyWords: ["Utsaha", "Enthusiasm", "Courage", "Resilience", "Kishkindha"]
      },
      {
        verseNumber: 2,
        speaker: "राम-सुग्रीव सख्यम्",
        sanskrit: "अग्निं साक्षिणं कृत्वा सख्यं चक्रे रघूत्तमः ।\nसुग्रीवेण सह प्रीत्या वानराणामधीश्वरेण ॥",
        transliteration: "Agniṁ sākṣiṇaṁ kṛtvā sakhyaṁ cakre raghūttamaḥ |\nSugrīveṇa saha prītyā vānarāṇāmadhīśvareṇa ||",
        hindi: "भगवान् श्रीराम ने प्रज्वलित पावक (अग्निदेव) को साक्षी मानकर वानरराज सुग्रीव के साथ प्रगाढ़ मैत्री का अटूट सम्बन्ध स्थापित किया।",
        english: "Placing the sacred fire as eternal witness, Sri Rama forged an indissoluble bond of mutual friendship and alliance with Sugriva, the lord of the Vanaras.",
        commentary: "The divine alliance on Mount Rishyamukha that mobilized the cosmic forces of good against evil.",
        keyWords: ["Sugriva", "Agni Sakshi", "Friendship", "Alliance"]
      }
    ]
  },
  {
    id: "sundara-kanda",
    bookId: "ramayana",
    number: 5,
    sectionName: "5. Sundara Kanda (सुन्दरकाण्ड)",
    titleSanskrit: "सुन्दरकाण्डम् - हनुमान् पराक्रमः, लङ्का प्रवेशः, सीता दर्शनम् एवं लङ्का दहनम्",
    titleHindi: "सुन्दरकाण्ड - श्री हनुमान का समुद्र लांघना, अशोक वाटिका में सीता खोज एवं लंका दहन",
    titleEnglish: "Sundara Kanda - Hanuman's Oceanic Leap, Finding Sita & the Burning of Lanka",
    shlokaCount: 2885,
    summary: "Shri Hanuman's monumental leap across the ocean, locating Mother Sita in Ashoka Vatika, delivering Lord Rama's ring, declaring war to Ravana, and burning the golden fortress of Lanka.",
    verses: [
      {
        verseNumber: 1,
        speaker: "हनुमान् ध्यानम्",
        sanskrit: "अतुलितबलधामं हेमशैलाभदेहम् ।\nदनुजवनकृशानुं ज्ञानिनामग्रगण्यम् ॥\nसकलगुणनिधानं वानराणामधीशम् ।\nरघुपतिप्रियभक्तं वातजातं नमामि ॥",
        transliteration: "Atulitabaladhāmaṁ hemaśailābhadeham |\nDanujavanakṛśānuṁ jñānināmagragaṇyam ||\nSakalaguṇanidhānaṁ vānarāṇāmadhīśam |\nRaghupatipriyabhaktaṁ vātajātaṁ namāmi ||",
        hindi: "अतुलनीय बल के धाम, सुवर्ण पर्वत (सुमेरु) के समान कान्तियुक्त शरीर वाले, दैत्य रूपी वन को भस्म करने वाले अग्नि स्वरूप, ज्ञानियों में अग्रगण्य, समस्त सद्गुणों के निधान, वानरों के स्वामी और श्रीराम के अनन्य प्रिय भक्त पवनपुत्र श्री हनुमान को मैं प्रणाम करता हूँ।",
        english: "I bow to Hanuman, the son of Wind, who is the abode of matchless strength, whose radiant form shines like a golden mountain, who is the fire that consumes the forest of demons, foremost among the wise, treasure of all virtues, and the beloved devotee of Lord Rama.",
        commentary: "The universal Dhyana Shloka chanted before commencing Sundara Kanda.",
        keyWords: ["Hanuman", "Sundara Kanda", "Dhyana", "Strength", "Wisdom"]
      },
      {
        verseNumber: 2,
        speaker: "श्रीहनुमान् गर्जना (लङ्का में घोषणा)",
        sanskrit: "जयत्यतिबलो रामो लक्ष्मणश्च महाबलः ।\nराजा जयति सुग्रीवो राघवेणाभिपालितः ॥\nदासोऽहं कोसलेन्द्रस्य रामस्याक्लिष्टकर्मणः ।\nहनुमान् शत्रुसैन्यानां निहन्ता मारुतात्मजः ॥",
        transliteration: "Jayatyatibalo rāmo lakṣmaṇaśca mahābalaḥ |\nRājā jayati sugrīvo rāghaveṇābhipālitaḥ ||\nDāso'haṁ kosalendrasya rāmasyākliṣṭakarmaṇaḥ |\nHanumān śatrusainyānāṁ nihantā mārutātmajaḥ ||",
        hindi: "श्री हनुमान जी ने गर्जना की: अतिबलवान श्रीराम की जय हो! महाबली लक्ष्मण की जय हो! श्रीराम द्वारा सुरक्षित वानरराज सुग्रीव की जय हो! मैं कोसलनरेश निष्पाप श्रीराम का दास पवनपुत्र हनुमान हूँ, जो शत्रु सेनाओं का विनाशक है!",
        english: "Hanuman roared in Lanka: Victory to the all-powerful Rama! Victory to the mighty Lakshmana! Victory to King Sugriva protected by Raghava! I am Hanuman, the son of the Wind and servant of Lord Rama, the destroyer of enemy legions!",
        commentary: "The thunderous declaration of devotion and fearlessness in Ravana's citadel.",
        keyWords: ["Jayatyatibalo", "Hanuman Roar", "Dasoham", "Victory Call"]
      },
      {
        verseNumber: 3,
        speaker: "सीता-हनुमान संवाद (अभिज्ञान समर्पण)",
        sanskrit: "दृष्टा सा जानकी देवी रामचन्द्रस्य वल्लभा ।\nअशोकवनिकामध्ये तपोध्यानपरायणा ॥\nमुद्रिकां रामचन्द्रस्य ददौ हर्षसमन्विता ॥",
        transliteration: "Dṛṣṭā sā jānakī devī rāmacandrasya vallabhā |\nAśokavanikāmadhye tapodhyānaparāyaṇā ||\nMudrikāṁ rāmacandrasya dadau harṣasamanvitā ||",
        hindi: "श्री हनुमान जी ने अशोक वाटिका में ध्यानमग्न माता जानकी के दर्शन किए और उन्हें श्रीराम की मुद्रिका (अँगूठी) समर्पित की, जिसे देखकर माता का सम्पूर्ण शोक दूर हो गया।",
        english: "Hanuman found Mother Janaki meditating in the heart of Ashoka Vatika and offered her Lord Rama's signet ring, filling her sorrow-laden soul with supreme joy and rekindled hope.",
        commentary: "The climax of Sundara Kanda reuniting the spiritual link between Rama and Sita.",
        keyWords: ["Ashoka Vatika", "Ring", "Signet", "Hope", "Sita"]
      }
    ]
  },
  {
    id: "yuddha-kanda",
    bookId: "ramayana",
    number: 6,
    sectionName: "6. Yuddha Kanda (युद्धकाण्ड)",
    titleSanskrit: "युद्धकाण्डम् - सेतु निर्माणम्, रावण वधः, विभीषण राज्याभिषेकः एवं अयोध्या प्रत्यागमनम्",
    titleHindi: "युद्धकाण्ड - रामसेतु निर्माण, कुम्भकर्ण-मेघनाद-रावण वध एवं श्री राम का विजय राज्याभिषेक",
    titleEnglish: "Yuddha Kanda - The Grand Bridge, the Great War with Ravana & the Coronation",
    shlokaCount: 5800,
    summary: "The construction of Ram Setu, Vibhishana taking refuge, the epic battle against Kumbhakarna, Indrajit, and Ravana, the revelation of Aditya Hridaya Stotra by Sage Agastya, and the glorious coronation in Ayodhya.",
    verses: [
      {
        verseNumber: 1,
        speaker: "महर्षि अगस्त्यः (आदित्यहृदयम्)",
        sanskrit: "आदित्यहृदयं पुण्यं सर्वशत्रुविनाशनम् ।\nजयावहं जपं नित्यमक्षयं परमं शुभम् ॥\nसर्वमङ्गलमाङ्गल्यं सर्वपापप्रणाशनम् ।\nचिन्ताशोकप्रशमनमायुर्वर्धनमुत्तमम् ॥",
        transliteration: "Ādityahṛdayaṁ puṇyaṁ sarvaśatruvināśanam |\nJayāvahaṁ japaṁ nityamakṣayaṁ paramaṁ śubham ||\nSarvamaṅgalamāṅgalyaṁ sarvapāpapraṇāśanam |\nCintāśokapraśamanamāyurvardhanamuttamam ||",
        hindi: "महर्षि अगस्त्य ने श्रीराम को उपदेश दिया: यह परम पवित्र 'आदित्यहृदय स्तोत्र' समस्त शत्रुओं का नाश करने वाला, नित्य विजय दिलाने वाला, अक्षय और परम कल्याणकारी है। यह समस्त मंगलों का मंगल, सब पापों का नाशक, चिन्ता-शोक का शमन करने वाला और उत्तम आयु को बढ़ाने वाला है।",
        english: "Sage Agastya imparted the Aditya Hridaya Stotra to Lord Rama: This sacred hymn destroys all adversaries, brings perpetual victory, is imperishable and supremely auspicious. It is the blessing of all blessings, eradicates all sins, dispels all grief and anxiety, and grants long life and vitality.",
        commentary: "The divine solar hymn taught to Sri Rama on the battlefield before slaying Ravana.",
        keyWords: ["Aditya Hridaya", "Agastya", "Sun God", "Victory", "Battlefield"]
      },
      {
        verseNumber: 2,
        speaker: "श्रीराम उवाच (मातृभूमि महिमा)",
        sanskrit: "अपि स्वर्णमयी लङ्का न मे लक्ष्मण रोचते ।\nजननी जन्मभूमिश्च स्वर्गादपि गरीयसी ॥",
        transliteration: "Api svarṇamayī laṅkā na me lakṣmaṇa rocate |\nJananī janmabhūmiśca svargādapi garīyasī ||",
        hindi: "श्रीराम ने लक्ष्मण से कहा: हे लक्ष्मण! यद्यपि यह लंका नगरी सोने की बनी हुई है, फिर भी इसमें मेरी तनिक भी रुचि नहीं है; क्योंकि अपनी माता और जन्मभूमि स्वर्ग से भी बढ़कर महान हैं।",
        english: "Lord Rama said to Lakshmana: Even this golden city of Lanka holds no attraction for me, O Lakshmana; for one's mother and motherland are far greater and more sacred than even heaven itself.",
        commentary: "One of the most celebrated patriotic and moral dictums in world history.",
        keyWords: ["Janani Janmabhumishcha", "Motherland", "Lanka", "Heaven", "Patriotism"]
      },
      {
        verseNumber: 3,
        speaker: "रामराज्य प्रारम्भः",
        sanskrit: "रामो रामो राम इति प्रजानामभवन् कथाः ।\nरामभूतं जगदभूद् रामे राज्यं प्रशासति ॥",
        transliteration: "Rāmo rāmo rāma iti prajānāmabhavan kathāḥ |\nRāmabhūtaṁ jagadabhūd rāme rājyaṁ praśāsati ||",
        hindi: "जब भगवान् श्रीराम धर्मपूर्वक शासन करने लगे, तब प्रजा के मुख पर केवल 'राम-राम' की ही पावन चर्चा होती थी; सम्पूर्ण जगत मानो साक्षात् राममय हो गया था।",
        english: "When Lord Rama ruled the kingdom with righteousness, the talk of the people was only of Rama, Rama, and Rama; the entire world became imbued with the divine spirit of Rama.",
        commentary: "Describes the universal joy, peace, and spiritual illumination during Rama's reign.",
        keyWords: ["Rama Rajya", "Illumination", "Peace", "Righteous Rule"]
      }
    ]
  },
  {
    id: "uttara-kanda",
    bookId: "ramayana",
    number: 7,
    sectionName: "7. Uttara Kanda (उत्तरकाण्ड)",
    titleSanskrit: "उत्तरकाण्डम् - रामराज्य महिमा, लव-कुश प्राकट्यम्, रामायण गानम् एवं वैकुण्ठ गमनम्",
    titleHindi: "उत्तरकाण्ड - आदर्श रामराज्य, लव-कुश का जन्म, वाल्मीकि आश्रम एवं शाश्वत धाम गमन",
    titleEnglish: "Uttara Kanda - The Golden Era of Rama Rajya, Lava-Kusha & the Eternal Legacy",
    shlokaCount: 3360,
    summary: "The ideal state of Rama Rajya, Sage Valmiki educating twin princes Lava and Kusha, their recitation of Ramayana before the royal court, Sita's return to Mother Earth, and Lord Rama's ascent to his eternal spiritual abode.",
    verses: [
      {
        verseNumber: 1,
        speaker: "रामराज्य लक्षणम्",
        sanskrit: "न पर्यदेवन् विधवा न च व्यालभयं तथा ।\nन व्याधिजं भयं चासीद् रामे राज्यं प्रशासति ॥\nनिरामयो जनो सर्वो दुर्भिक्षभयवर्जितः ॥",
        transliteration: "Na paryadevan vidhavā na ca vyālabhayaṁ tathā |\nNa vyādhijaṁ bhayaṁ cāsīd rāme rājyaṁ praśāsati ||\nNirāmayo jano sarvo durbhikṣabhayavarjitaḥ ||",
        hindi: "श्रीराम के राज्य में न कोई स्त्री विधवा होकर विलाप करती थी, न विषैले सर्प-जंतुओं का भय था, न कोई रोग-व्याधि का प्रकोप था; समस्त प्रजा निरोगी, संतुष्ट और दुर्भिक्ष (अकाल) के भय से सर्वथा मुक्त थी।",
        english: "Under Sri Rama's righteous reign, no widow lamented untimely loss, there was no fear from wild beasts or serpents, no diseases afflicted the people; all beings enjoyed health, abundance, and freedom from famine.",
        commentary: "The timeless blueprint of Rama Rajya where holistic peace and welfare prevailed.",
        keyWords: ["Rama Rajya", "Abundance", "Health", "Peace", "Ideal State"]
      },
      {
        verseNumber: 2,
        speaker: "रामायण फलश्रुति",
        sanskrit: "चरितं रघुनाथस्य शतकोटिप्रविस्तरम् ।\nएकैकमक्षरं पुंसां महापातकनाशनम् ॥\nशृण्वन् रामायणं नित्यं सर्वपापैः प्रमुच्यते ॥",
        transliteration: "Caritaṁ raghunāthasya śatakoṭipravistaram |\nEkaikamakṣaraṁ puṁsāṁ mahāpātakanāśanam ||\nŚṛṇvan rāmāyaṇaṁ nityaṁ sarvapāpaiḥ pramucyate ||",
        hindi: "भगवान् श्रीराम का चरित्र सौ करोड़ श्लोकों में विस्तृत है; इसका एक-एक अक्षर मनुष्यों के महान से महान पापों का नाश करने वाला है। जो नित्य रामायण का श्रवण करता है, वह समस्त बन्धनों से मुक्त होकर परम पद को पाता है।",
        english: "The divine saga of Lord Rama extends across a hundred crore verses; each and every syllable has the power to eradicate the gravest sins. Whoever listens daily to the Ramayana becomes liberated from all afflictions.",
        commentary: "The glorious concluding Phalasruti of the Adikavya Valmiki Ramayana.",
        keyWords: ["Phalasruti", "Liberation", "Syllables", "Sacred Merits"]
      }
    ]
  }
];

// 1. Create app/data/ramayanaKandas.ts
const ramayanaTsPath = path.join(__dirname, '..', 'app', 'data', 'ramayanaKandas.ts');
const tsContent = `import type { Chapter } from "../types/library";

export const VALMIKI_RAMAYANA_KANDAS: Chapter[] = ${JSON.stringify(RAMAYANA_KANDAS_DATA.map(kanda => ({
  id: kanda.id,
  bookId: kanda.bookId,
  number: kanda.number,
  sectionName: kanda.sectionName,
  titleSanskrit: kanda.titleSanskrit,
  titleHindi: kanda.titleHindi,
  titleEnglish: kanda.titleEnglish,
  shlokaCount: kanda.shlokaCount,
  summary: kanda.summary,
  verses: kanda.verses.map(v => ({
    id: `ram-${kanda.id}-${v.verseNumber}`,
    chapterId: kanda.id,
    bookId: "ramayana",
    verseNumber: v.verseNumber,
    speaker: v.speaker,
    sanskrit: v.sanskrit,
    transliteration: v.transliteration,
    hindi: v.hindi,
    english: v.english,
    commentary: v.commentary,
    keyWords: v.keyWords
  }))
})), null, 2)};
`;

fs.writeFileSync(ramayanaTsPath, tsContent, 'utf8');
console.log('Created app/data/ramayanaKandas.ts with all 7 Kandas.');

// 2. Update app/data/booksData.ts to import and use VALMIKI_RAMAYANA_KANDAS
const booksDataPath = path.join(__dirname, '..', 'app', 'data', 'booksData.ts');
let booksDataContent = fs.readFileSync(booksDataPath, 'utf8');

if (!booksDataContent.includes('VALMIKI_RAMAYANA_KANDAS')) {
  booksDataContent = booksDataContent.replace(
    'import { MAHABHARATA_PARVAS } from "./mahabharataParvas";',
    'import { MAHABHARATA_PARVAS } from "./mahabharataParvas";\nimport { VALMIKI_RAMAYANA_KANDAS } from "./ramayanaKandas";'
  );
}

// Replace ramayana chapters array in booksData.ts
const ramayanaStart = booksDataContent.indexOf('id: "ramayana",');
const gitaStart = booksDataContent.indexOf('id: "bhagavad-gita",');

if (ramayanaStart !== -1 && gitaStart !== -1) {
  const chaptersIdx = booksDataContent.indexOf('chapters: [', ramayanaStart);
  const closingIdx = booksDataContent.lastIndexOf(']', gitaStart);

  if (chaptersIdx !== -1 && closingIdx !== -1 && chaptersIdx < closingIdx) {
    const before = booksDataContent.substring(0, chaptersIdx);
    const after = booksDataContent.substring(closingIdx + 1);
    booksDataContent = before + 'chapters: VALMIKI_RAMAYANA_KANDAS' + after;
    fs.writeFileSync(booksDataPath, booksDataContent, 'utf8');
    console.log('Updated app/data/booksData.ts to use VALMIKI_RAMAYANA_KANDAS.');
  }
}

// 3. Update public/data/ramayana/ JSON files
RAMAYANA_KANDAS_DATA.forEach(kanda => {
  const jsonPath = path.join(__dirname, '..', 'public', 'data', 'ramayana', `${kanda.id}.json`);
  if (fs.existsSync(jsonPath)) {
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

    // Replace / update initial verses with our high-quality authentic shlokas
    kanda.verses.forEach((v, index) => {
      const verseObj = {
        id: `ram-${kanda.id}-${v.verseNumber}`,
        chapterId: kanda.id,
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

    data.titleSanskrit = kanda.titleSanskrit;
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Updated public/data/ramayana/${kanda.id}.json successfully.`);
  }
});
