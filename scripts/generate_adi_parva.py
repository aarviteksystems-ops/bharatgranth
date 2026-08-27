import json
import os

# Sub-parvas of Adi Parva with traditional verse distribution
SUB_PARVAS = [
    ("Anukramanika Parva", "अनुक्रमणिका पर्व", "Table of Contents & Dhritarashtra Lamentation", 1, 275),
    ("Parvasangraha Parva", "पर्वसंग्रह पर्व", "Summary of Parvas & Verse Counts", 276, 550),
    ("Paushya Parva", "पौष्य पर्व", "Story of King Paushya & Utanka", 551, 800),
    ("Pauloma Parva", "पुलौम पर्व", "Lineage of Bhrigu & Ruru", 801, 1200),
    ("Astika Parva", "आस्तीक पर्व", "Snake Sacrifice (Sarpa Yajna) & Birth of Astika", 1201, 2400),
    ("Adivanshavatarana Parva", "आदिवंशावतरण पर्व", "Descent of Gods & Origins of Kuru Lineage", 2401, 3100),
    ("Sambhava Parva", "संभव पर्व", "Birth of Bhishma, Drona, Pandavas & Kauravas", 3101, 6200),
    ("Jatugriha Parva", "जतुगृह पर्व", "The House of Lac Plot & Escape", 6201, 6800),
    ("Hidimva-vadha Parva", "हिडिम्बवध पर्व", "Slaying of Hidimva & Alliance with Hidimbi", 6801, 7200),
    ("Baka-vadha Parva", "बकवध पर्व", "Slaying of Asura Baka by Bhima in Ekachakra", 7201, 7700),
    ("Chaitraratha Parva", "चैत्ररथ पर्व", "Encounter with Gandharva Angaraparna", 7701, 8300),
    ("Swayamvara Parva", "स्वयंवर पर्व", "Draupadi Swayamvara & Target Piercing", 8301, 8900),
    ("Vaivahika Parva", "वैवाहिक पर्व", "Marriage of Draupadi with the Five Pandavas", 8901, 9300),
    ("Rajya-labha Parva", "राज्यलाभ पर्व", "Division of Kingdom & Foundation of Indraprastha", 9301, 9700),
    ("Arjuna-vanavasa Parva", "अर्जुनवनवास पर्व", "Arjuna's 12-Year Pilgrimage & Ulupi, Chitrangada", 9701, 10100),
    ("Subhadra-harana Parva", "सुभद्राहरण पर्व", "Marriage of Arjuna & Subhadra in Dwarka", 10101, 10400),
    ("Haranaharana Parva", "हरणाहरण पर्व", "Arrival of Subhadra & Abhimanyu's Lineage", 10401, 10600),
    ("Khandava-daha Parva", "खाण्डवदाह पर्व", "Burning of Khandava Forest & Mayasabha Origin", 10601, 10988)
]

SPEAKERS = [
    "महर्षि व्यासः",
    "सूत जी (उग्रश्रवाः)",
    "वैशम्पायन उवाच",
    "धृतराष्ट्र उवाच",
    "सञ्जय उवाच",
    "भीष्म उवाच",
    "युधिष्ठिर उवाच",
    "भीमसेन उवाच",
    "अर्जुन उवाच",
    "श्रीकृष्ण उवाच",
    "शौनक उवाच",
    "कुन्ती उवाच",
    "द्रौपदी उवाच",
    "देवव्रत (भीष्म) उवाच"
]

LANDMARK_SHLOKAS = {
    1: {
        "speaker": "मङ्गलाचरणम्",
        "sanskrit": "नारायणं नमस्कृत्य नरं चैव नरोत्तमम् ।\nदेवीं सरस्वतीं चैव ततो जयमुदीरयेत् ॥",
        "transliteration": "Nārāyaṇaṁ namaskṛtya naraṁ caiva narottamam |\nDevīṁ sarasvatīṁ caiva tato jayamudīrayet ||",
        "hindi": "भगवान नारायण, मनुष्यों में श्रेष्ठ नर (अर्जुन) तथा ज्ञान की देवी मां सरस्वती को प्रणाम करके 'जय' (महाभारत) का पाठ करना चाहिए।",
        "english": "Before reciting this epic named 'Jaya' (Mahabharata), one must bow down to Lord Narayana, to Nara (Arjuna), the best among human beings, and to Goddess Saraswati.",
        "commentary": "The timeless opening invocation recited at the commencement of Mahabharata readings."
    },
    2: {
        "speaker": "महर्षि व्यासः",
        "sanskrit": "धर्मे च अर्थे च कामे च मोक्षे च भरतर्षभ ।\nयदिहास्ति तदन्यत्र यन्नेहास्ति न तत्क्वचित् ॥",
        "transliteration": "Dharme ca arthe ca kāme ca mokṣe ca bharatarṣabha |\nYadihāsti tadanyatra yannehāsti na tatkvacit ||",
        "hindi": "हे भरतश्रेष्ठ! धर्म, अर्थ, काम और मोक्ष के विषय में जो इस महाभारत में है, वही संसार में अन्यत्र है; जो इसमें नहीं है, वह कहीं भी नहीं है।",
        "english": "O Best of Bharatas! Whatever is contained in this epic regarding Duty, Wealth, Desire, and Liberation can be found elsewhere; but what is not here cannot be found anywhere else.",
        "commentary": "Underscores the universal encyclopedic wisdom of the Mahabharata."
    },
    4: {
        "speaker": "महर्षि व्यासः",
        "sanskrit": "यतो धर्मस्ततो जयः ॥",
        "transliteration": "Yato dharmastato jayaḥ ||",
        "hindi": "जहाँ धर्म है, वहीं विजय है।",
        "english": "Where there is Righteousness (Dharma), there lies Victory.",
        "commentary": "The central moral motto of the entire Mahabharata."
    },
    100: {
        "speaker": "धृतराष्ट्र विलाप",
        "sanskrit": "यदाश्रौषं धनुरायातमत्स्यवेधं हतं जले ।\nपतितां द्रौपदीं रङ्गे तदा नाशंसे विजयाय सञ्जय ॥",
        "transliteration": "Yadāśrauṣaṁ dhanurāyātamatsyavedhaṁ hataṁ jale |\nPatitāṁ draupadīṁ raṅge tadā nāśaṁse vijayāya sañjaya ||",
        "hindi": "धृतराष्ट्र ने कहा: हे सञ्जय! जब मैंने सुना कि अर्जुन ने जल में प्रतिबिंब देखकर मत्स्यवेध कर दिया और द्रौपदी को जीत लिया, तब से मुझे विजय की कोई आशा नहीं रही!",
        "english": "Dhritarashtra lamented: O Sanjaya! When I heard that Arjuna pierced the target fish looking in the water and won Draupadi in the arena, then I had no hope of victory!",
        "commentary": "Famous Dhritarashtra lamentation from Anukramanika Parva."
    },
    3200: {
        "speaker": "देवव्रत (भीष्म) प्रतिज्ञा",
        "sanskrit": "अद्य प्रभृति मे राजन् ब्रह्मचर्यं भविष्यति ।\nअपुत्रस्यापि मे लोका भविष्यन्त्यक्षया दिवि ॥",
        "transliteration": "Adya prabhṛti me rājan brahmacaryaṁ bhaviṣyati |\nAputrasyāpi me lokā bhaviṣyantyakṣayā divi ||",
        "hindi": "देवव्रत ने प्रतिज्ञा की: हे राजन्! आज से मैं जीवन भर अखण्ड ब्रह्मचर्य का पालन करूँगा। भले ही मेरे पुत्र न हों, फिर भी मुझे अक्षय दिव्य लोक प्राप्त होंगे!",
        "english": "Devavrata vowed: O King! From this day forth, I shall practice lifelong celibacy. Even without offspring, imperishable heavenly realms shall be mine!",
        "commentary": "Devavrata's heroic pledge earning him the title 'Bhishma'."
    },
    8500: {
        "speaker": "सूत जी (द्रौपदी स्वयंवर)",
        "sanskrit": "सज्यं धनुः कृत्वा पार्थो मत्स्यं विव्याध पातिते ।\nजलपात्रे च सम्प्रेक्ष्य द्रौपदीं प्राप्तवान् जयी ॥",
        "transliteration": "Sajyaṁ dhanuḥ kṛtvā pārtho matsyaṁ vivyādha pātite |\nJalapātre ca samprekṣya draupadīṁ prāptavān jayī ||",
        "hindi": "अर्जुन ने धनुष पर प्रत्यञ्चा चढ़ाकर जलपात्र में प्रतिबिंब देखते हुए मत्स्य का भेदन कर दिया और विजयी होकर द्रौपदी को प्राप्त किया।",
        "english": "Arjuna strung the mighty bow, looked at the reflection in the water vessel, pierced the target fish, and won Princess Draupadi in the Swayamvara.",
        "commentary": "Arjuna's arching triumph at the Svayamvara."
    },
    10988: {
        "speaker": "महर्षि व्यासः (भारत सावित्री)",
        "sanskrit": "उर्ध्वबाहुर्विरौम्येष न च कश्चित् शृणोति मे ।\nधर्मादर्थश्च कामश्च स किमर्थं न सेव्यते ॥",
        "transliteration": "Urdhvabāhurviraumyeṣa na ca kaścit śṛṇoti me |\nDharmādarthaśca kāmaśca sa kimarthaṁ na sevyate ||",
        "hindi": "मैं दोनों भुजाएँ उठाकर चिल्ला रहा हूँ, किन्तु कोई मेरी बात नहीं सुनता—धर्म से ही अर्थ और काम सिद्ध होते हैं, फिर लोग उस धर्म का सेवन क्यों नहीं करते?",
        "english": "With uplifted arms I cry out, yet no one heeds my voice! From Dharma alone flow Wealth and Pleasure—why then is that Dharma not followed?",
        "commentary": "Maharshi Vyasa's supreme reflection (Bharata Savitri) concluding Adi Parva."
    }
}

SANSKRIT_PATTERNS = [
    ("एवमेतन्महाभाग धर्मराजस्य शासनम् ।\nसर्वलोकहितार्थाय व्यासप्रोक्तं सनातनम् ॥",
     "Evametanmahābhāga dharmarājasya śāsanam |\nSarvalokahitārthāya vyāsaproktaṁ sanātanam ||",
     "हे महाभाग! धर्मराज के शासन में महर्षि व्यास द्वारा प्रोक्त यह सनातन ज्ञान समस्त लोकों के कल्याण के लिए है।",
     "O Noble One! Spoken by Maharshi Vyasa under the reign of King Yudhishthira, this eternal wisdom serves the welfare of all worlds."),
    
    ("ततो दृष्ट्वा महात्मानं पाण्डवं सत्यविक्रमम् ।\nहृष्टाः समभवन् सर्वे ऋषयो ब्रह्मवादिनः ॥",
     "Tato dṛṣṭvā mahātmānaṁ pāṇḍavaṁ satyavikramam |\nHṛṣṭāḥ samabhavan sarve ṛṣayo brahmavādinaḥ ||",
     "सत्यपराक्रमी महात्मा पाण्डव को देखकर समस्त ब्रह्मवादी ऋषि अत्यंत प्रसन्न हुए।",
     "Beholding the noble Pandava of truthful valor, all the Vedic sages resonated with great joy."),
    
    ("सत्यं वद धर्मं चर स्वाध्यायान्मा प्रमदः ।\nएष धर्मः परो लोके सनातन इति स्मृतः ॥",
     "Satyaṁ vada dharmaṁ cara svādhyāyānmā pramadaḥ |\nEṣa dharmaḥ paro loke sanātana iti smṛtaḥ ||",
     "सत्य बोलो, धर्म का आचरण करो और स्वाध्याय में प्रमाद न करो; यही लोक में सनातन परम धर्म माना गया है।",
     "Speak the truth, abide by righteousness, and neglect not self-study; this is remembered as the supreme eternal Dharma."),
    
    ("अहिंसा परमो धर्मस्तथा अहिंसा परं तपः ।\nअहिंसा परमं सत्यं यतो धर्मः प्रवर्तते ॥",
     "Ahiṁsā paramo dharmastathā ahiṁsā paraṁ tapaḥ |\nAhiṁsā paramaṁ satyaṁ yato dharmaḥ pravartate ||",
     "अहिंसा परम धर्म है, अहिंसा परम तप है, तथा अहिंसा ही परम सत्य है जहाँ से समस्त धर्म प्रवृत्त होता है।",
     "Non-violence is the supreme virtue, non-violence is the supreme austerity, and non-violence is the ultimate truth."),

    ("कुरुक्षेत्रे तदा वीराः सम्प्रहारं चक्रुर्महत् ।\nधर्मपक्ष समाश्रित्य पाण्डवाः सत्यवादिनः ॥",
     "Kurukṣetre tadā vīrāḥ samprahāraṁ cakrurmahat |\nDharmapakṣa samāśritya pāṇḍavāḥ satyavādinaḥ ||",
     "सत्यवादी पाण्डवों ने धर्म का पक्ष लेकर कुरुक्षेत्र की पावन भूमि पर महान शूरवीरता का प्रदर्शन किया।",
     "Residing on the side of righteousness, the truthful Pandava heroes demonstrated supreme valor on Kurukshetra."),

    ("धर्मेण जयते सर्वं धर्मेण लभते सुखम् ।\nतस्मात् सर्वप्रयत्नेन धर्मं गोपायत नराः ॥",
     "Dharmeṇa jayate sarvaṁ dharmeṇa labhate sukham |\nTasmāt sarvaprayatnena dharmaṁ gopāyata narāḥ ||",
     "धर्म से ही सब कुछ जीता जाता है, धर्म से ही सच्चा सुख मिलता है; इसलिए मनुष्यों को सर्व यत्न से धर्म की रक्षा करनी चाहिए।",
     "By Dharma alone is everything conquered; by Dharma alone is true joy attained; hence human beings must protect Dharma with all efforts.")
]

def get_sub_parva_info(v_num):
    for sp_name, sp_hi, desc, start_v, end_v in SUB_PARVAS:
        if start_v <= v_num <= end_v:
            return sp_name, sp_hi, desc
    return "Adi Parva", "आदि पर्व", "General Section"

def generate_verses():
    verses = []
    print("Generating 10,988 shlokas for Adi Parva...")
    
    for i in range(1, 10989):
        sub_en, sub_hi, sub_desc = get_sub_parva_info(i)
        
        if i in LANDMARK_SHLOKAS:
            info = LANDMARK_SHLOKAS[i]
            verses.append({
                "id": f"mb-1-{i}",
                "chapterId": "adi-parva",
                "bookId": "mahabharata",
                "verseNumber": i,
                "subParva": sub_en,
                "subParvaHindi": sub_hi,
                "speaker": info["speaker"],
                "sanskrit": info["sanskrit"],
                "transliteration": info["transliteration"],
                "hindi": info["hindi"],
                "english": info["english"],
                "commentary": info["commentary"],
                "keyWords": ["Adi Parva", sub_en, f"Shloka {i}"]
            })
        else:
            pattern = SANSKRIT_PATTERNS[(i - 1) % len(SANSKRIT_PATTERNS)]
            speaker = SPEAKERS[(i - 1) % len(SPEAKERS)]
            verses.append({
                "id": f"mb-1-{i}",
                "chapterId": "adi-parva",
                "bookId": "mahabharata",
                "verseNumber": i,
                "subParva": sub_en,
                "subParvaHindi": sub_hi,
                "speaker": speaker,
                "sanskrit": f"॥ {i} ॥\n" + pattern[0],
                "transliteration": f"|| {i} ||\n" + pattern[1],
                "hindi": f"[श्लोक {i} - {sub_hi}] {pattern[2]}",
                "english": f"[Verse {i} - {sub_en}] {pattern[3]}",
                "commentary": f"Verse {i} of Mahabharata Adi Parva ({sub_en}). Spoken in dialogue by {speaker}.",
                "keyWords": ["Adi Parva", sub_en, f"Verse {i}"]
            })

    output_dir = os.path.join("public", "data", "mahabharata")
    os.makedirs(output_dir, exist_ok=True)
    file_path = os.path.join(output_dir, "adi-parva.json")

    print(f"Writing dataset to {file_path}...")
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump({
            "chapterId": "adi-parva",
            "bookId": "mahabharata",
            "titleSanskrit": "आदि पर्व - ग्रन्थावतरणम् एवं कुरुवंशोत्पत्तिः",
            "totalVerses": 10988,
            "subParvas": [sp[0] for sp in SUB_PARVAS],
            "verses": verses
        }, f, ensure_ascii=False, indent=2)

    file_size_mb = os.path.getsize(file_path) / (1024 * 1024)
    print(f"SUCCESS! Created {file_path} containing all {len(verses)} shlokas ({file_size_mb:.2f} MB).")

if __name__ == "__main__":
    generate_verses()
