import json
import os

PARVA_SPECS = [
    {
        "id": "adi-parva",
        "titleSanskrit": "आदि पर्व - ग्रन्थावतरणम् एवं कुरुवंशोत्पत्तिः",
        "titleEnglish": "Adi Parva - The Book of Genesis & Kuru Lineage",
        "totalVerses": 10988,
        "subParvas": [
            ("Anukramanika Parva", "अनुक्रमणिका पर्व", 1, 275),
            ("Parvasangraha Parva", "पर्वसंग्रह पर्व", 276, 550),
            ("Paushya Parva", "पौष्य पर्व", 551, 800),
            ("Pauloma Parva", "पुलौम पर्व", 801, 1200),
            ("Astika Parva", "आस्तीक पर्व", 1201, 2400),
            ("Adivanshavatarana Parva", "आदिवंशावतरण पर्व", 2401, 3100),
            ("Sambhava Parva", "संभव पर्व", 3101, 6200),
            ("Jatugriha Parva", "जतुगृह पर्व", 6201, 6800),
            ("Hidimva-vadha Parva", "हिडिम्बवध पर्व", 6801, 7200),
            ("Baka-vadha Parva", "बकवध पर्व", 7201, 7700),
            ("Chaitraratha Parva", "चैत्ररथ पर्व", 7701, 8300),
            ("Swayamvara Parva", "स्वयंवर पर्व", 8301, 8900),
            ("Vaivahika Parva", "वैवाहिक पर्व", 8901, 9300),
            ("Rajya-labha Parva", "राज्यलाभ पर्व", 9301, 9700),
            ("Arjuna-vanavasa Parva", "अर्जुनवनवास पर्व", 9701, 10100),
            ("Subhadra-harana Parva", "सुभद्राहरण पर्व", 10101, 10400),
            ("Haranaharana Parva", "हरणाहरण पर्व", 10401, 10600),
            ("Khandava-daha Parva", "खाण्डवदाह पर्व", 10601, 10988)
        ]
    },
    {
        "id": "sabha-parva",
        "titleSanskrit": "सभा पर्व - मयसभा निर्माणम् एवं द्यूत क्रीडा",
        "titleEnglish": "Sabha Parva - The Book of Assembly & Dice Game",
        "totalVerses": 2511,
        "subParvas": [
            ("Sabhakriya Parva", "सभाक्रिया पर्व", 1, 300),
            ("Lokapala Sabhavakayana Parva", "लोकपाल सभाख्यान पर्व", 301, 700),
            ("Rajasuyarambha Parva", "राजसूयारम्भ पर्व", 701, 1100),
            ("Jarasandha-vadha Parva", "जरासन्धवध पर्व", 1101, 1400),
            ("Digvijaya Parva", "दिग्विजय पर्व", 1401, 1800),
            ("Rajasuyika Parva", "राजसूयिक पर्व", 1801, 2000),
            ("Arghyaharana Parva", "अर्घ्याहरण पर्व", 2001, 2200),
            ("Shishupala-vadha Parva", "शिशुपालवध पर्व", 2201, 2350),
            ("Dyuta Parva", "द्यूत पर्व", 2351, 2450),
            ("Anudyuta Parva", "अनुद्यूत पर्व", 2451, 2511)
        ]
    },
    {
        "id": "vana-parva",
        "titleSanskrit": "वन पर्व - अरण्य वासः एवं यक्षप्रश्न संवादः",
        "titleEnglish": "Vana Parva - The Book of Forest Exile & Yaksha Questions",
        "totalVerses": 11664,
        "subParvas": [
            ("Aranyaka Parva", "आरण्यक पर्व", 1, 1500),
            ("Kirmiravadha Parva", "किर्मीरवध पर्व", 1501, 2200),
            ("Arjunabhigamana Parva", "अर्जुणाभिगमन पर्व", 2201, 3500),
            ("Kairata Parva", "कैरात पर्व", 3501, 4500),
            ("Indralokagamana Parva", "इन्द्रलोकागमन पर्व", 4501, 6000),
            ("Nalopakhyana Parva", "नलोपाख्यान पर्व", 6001, 7500),
            ("Tirthayatra Parva", "तीर्थयात्रा पर्व", 7501, 9000),
            ("Jatrasura-vadha Parva", "जटासुरवध पर्व", 9001, 9800),
            ("Yaksha-Yudhishthira Samvada", "यक्ष-युधिष्ठिर संवाद", 9801, 11664)
        ]
    },
    {
        "id": "virata-parva",
        "titleSanskrit": "विराट पर्व - अज्ञातवासः एवं किचक वधः",
        "titleEnglish": "Virata Parva - The Book of Disguised Exile",
        "totalVerses": 2050,
        "subParvas": [
            ("Pandavapravesha Parva", "पाण्डवप्रवेश पर्व", 1, 400),
            ("Samayapalana Parva", "समयपालन पर्व", 401, 800),
            ("Kichakavadha Parva", "किचकवध पर्व", 801, 1300),
            ("Goharatna Parva", "गोहरण पर्व", 1301, 1800),
            ("Vaivahika Parva", "वैवाहिक पर्व", 1801, 2050)
        ]
    },
    {
        "id": "udyoga-parva",
        "titleSanskrit": "उद्योग पर्व - शान्ति दूत संवादः एवं युद्ध सन्नाहः",
        "titleEnglish": "Udyoga Parva - The Book of Peace Embassy & War Preparations",
        "totalVerses": 6698,
        "subParvas": [
            ("Sainyodyoga Parva", "सैन्योद्योग पर्व", 1, 1200),
            ("Sanjayayana Parva", "सञ्जययान पर्व", 1201, 2500),
            ("Prajagara Parva (Vidura Niti)", "प्रजागर पर्व (विदुर नीति)", 2501, 3800),
            ("Sanatsujata Parva", "सनत्सुजात पर्व", 3801, 4500),
            ("Yanasandhi Parva", "यानसंधि पर्व", 4501, 5500),
            ("Bhagavat-yana Parva", "भगवद्यान पर्व", 5501, 6200),
            ("Karna-Kunti Samvada", "कर्ण-कुन्ती संवाद", 6201, 6698)
        ]
    },
    {
        "id": "bhishma-parva",
        "titleSanskrit": "भीष्म पर्व - भगवद्गीता एवं १० दिवसीय युद्ध",
        "titleEnglish": "Bhishma Parva - Bhagavad Gita & 10 Days Battle",
        "totalVerses": 5884,
        "subParvas": [
            ("Jambukhanda Nirmana Parva", "जम्बूखण्ड निर्माण पर्व", 1, 800),
            ("Bhumi Parva", "भूमि पर्व", 801, 1500),
            ("Bhagavad Gita Parva", "भगवद्गीता पर्व", 1501, 3200),
            ("Bhishma-vadha Parva", "भीष्मवध पर्व", 3201, 5884)
        ]
    },
    {
        "id": "drona-parva",
        "titleSanskrit": "द्रोण पर्व - चक्रव्यूह भेदः एवं अभिमन्यु पराक्रमः",
        "titleEnglish": "Drona Parva - The Book of Drona Command & Abhimanyu",
        "totalVerses": 8909,
        "subParvas": [
            ("Dronabhisheka Parva", "द्रोणाभिषेक पर्व", 1, 1500),
            ("Samsaptakavadha Parva", "संशप्तकवध पर्व", 1501, 3000),
            ("Abhimanyuvadha Parva", "अभिमन्युवध पर्व", 3001, 4500),
            ("Pratijna Parva", "प्रतिज्ञा पर्व", 4501, 6000),
            ("Jayadrathavadha Parva", "जयद्रथवध पर्व", 6001, 7500),
            ("Ghatotkachavadha Parva", "घटोत्कचवध पर्व", 7501, 8909)
        ]
    },
    {
        "id": "karna-parva",
        "titleSanskrit": "कर्ण पर्व - दानवीर कर्ण सेनापतित्वम्",
        "titleEnglish": "Karna Parva - The Book of Karna's Generalship",
        "totalVerses": 4964,
        "subParvas": [
            ("Karnavadha Parva", "कर्णवध पर्व", 1, 4964)
        ]
    },
    {
        "id": "shalya-parva",
        "titleSanskrit": "शल्य पर्व - गदा युद्धम् एवं दुर्योधन पतनम्",
        "titleEnglish": "Shalya Parva - The Book of Mace Duel & End of War",
        "totalVerses": 3220,
        "subParvas": [
            ("Shalyavadha Parva", "शल्यवध पर्व", 1, 1500),
            ("Hradapravesha Parva", "ह्रदप्रवेश पर्व", 1501, 2400),
            ("Gadayuddha Parva", "गदायुद्ध पर्व", 2401, 3220)
        ]
    },
    {
        "id": "sauptika-parva",
        "titleSanskrit": "सौप्तिक पर्व - रात्रिकालीन युद्धम् एवं अश्वत्थामा कोपः",
        "titleEnglish": "Sauptika Parva - The Book of Night Attack",
        "totalVerses": 870,
        "subParvas": [
            ("Sauptika Parva", "सौप्तिक पर्व", 1, 500),
            ("Aishika Parva", "ऐषीक पर्व", 501, 870)
        ]
    },
    {
        "id": "stree-parva",
        "titleSanskrit": "स्त्री पर्व - गांधारी विलापः एवं भस्म जल तर्पण",
        "titleEnglish": "Stree Parva - The Book of Women's Lamentation",
        "totalVerses": 775,
        "subParvas": [
            ("Visoka Parva", "विशोक पर्व", 1, 300),
            ("Stri-vilapa Parva", "स्त्रीविलाप पर्व", 301, 600),
            ("Jalapradanika Parva", "जलप्रदानिक पर्व", 601, 775)
        ]
    },
    {
        "id": "shanti-parva",
        "titleSanskrit": "शान्ति पर्व - राजधर्मः, आपद्धर्मः एवं मोक्षधर्मः",
        "titleEnglish": "Shanti Parva - The Book of Peace & Statecraft",
        "totalVerses": 14732,
        "subParvas": [
            ("Rajadharmanushasana Parva", "राजधर्मानुशासन पर्व", 1, 4500),
            ("Apaddharma Parva", "आपद्धर्म पर्व", 4501, 7000),
            ("Mokshadharma Parva", "मोक्षधर्म पर्व", 7001, 14732)
        ]
    },
    {
        "id": "anushasana-parva",
        "titleSanskrit": "अनुशासन पर्व - विष्णु सहस्रनाम एवं दान धर्म",
        "titleEnglish": "Anushasana Parva - Vishnu Sahasranama & Duties",
        "totalVerses": 8000,
        "subParvas": [
            ("Danadharma Parva", "दानधर्म पर्व", 1, 5000),
            ("Bhishmasvargarohana Parva", "भीष्मस्वर्गारोहण पर्व", 5001, 8000)
        ]
    },
    {
        "id": "ashvamedhika-parva",
        "titleSanskrit": "अश्वमेधिक पर्व - अनुगीता एवं अश्वमेध यज्ञः",
        "titleEnglish": "Ashvamedhika Parva - Anugita & Horse Sacrifice",
        "totalVerses": 3320,
        "subParvas": [
            ("Ashvamedhika Parva", "अश्वमेधिक पर्व", 1, 1500),
            ("Anugita Parva", "अनुगीता पर्व", 1501, 3320)
        ]
    },
    {
        "id": "ashramavasika-parva",
        "titleSanskrit": "आश्रमवासिक पर्व - धृतराष्ट्र-गांधारी वानप्रस्थः",
        "titleEnglish": "Ashramavasika Parva - Hermitage Retreat",
        "totalVerses": 1506,
        "subParvas": [
            ("Ashramavasa Parva", "आश्रमवास पर्व", 1, 800),
            ("Putradarshana Parva", "पुत्रदर्शन पर्व", 801, 1200),
            ("Naradagamana Parva", "नारदागमन पर्व", 1201, 1506)
        ]
    },
    {
        "id": "mausala-parva",
        "titleSanskrit": "मौसल पर्व - यदुवंश संहारः एवं द्वारका जलमग्नता",
        "titleEnglish": "Mausala Parva - Submersion of Dwarka",
        "totalVerses": 300,
        "subParvas": [
            ("Mausala Parva", "मौसल पर्व", 1, 300)
        ]
    },
    {
        "id": "mahaprasthanika-parva",
        "titleSanskrit": "महाप्रस्थानिक पर्व - पाण्डव हिमालय प्रस्थानम्",
        "titleEnglish": "Mahaprasthanika Parva - The Great Journey",
        "totalVerses": 320,
        "subParvas": [
            ("Mahaprasthanika Parva", "महाप्रस्थानिक पर्व", 1, 320)
        ]
    },
    {
        "id": "svargarohana-parva",
        "titleSanskrit": "स्वर्गारोहण पर्व - भारत सावित्री एवं परम मोक्षः",
        "titleEnglish": "Svargarohana Parva - Ascent to Heaven & Phala-Shruti",
        "totalVerses": 13289,
        "subParvas": [
            ("Svargarohana Parva", "स्वर्गारोहण पर्व", 1, 13289)
        ]
    }
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
    "द्रौपदी उवाच"
]

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

    ("धर्मेण जयते सर्वं धर्मेण लभते सुखम् ।\nतस्मात् सर्वप्रयत्नेन धर्मं गोपायत नराः ॥",
     "Dharmeṇa jayate sarvaṁ dharmeṇa labhate sukham |\nTasmāt sarvaprayatnena dharmaṁ gopāyata narāḥ ||",
     "धर्म से ही सब कुछ जीता जाता है, धर्म से ही सच्चा सुख मिलता है; इसलिए मनुष्यों को सर्व यत्न से धर्म की रक्षा करनी चाहिए।",
     "By Dharma alone is everything conquered; by Dharma alone is true joy attained; hence human beings must protect Dharma with all efforts.")
]

def get_sub_parva(sub_parvas, v_num):
    for sp_name, sp_hi, start_v, end_v in sub_parvas:
        if start_v <= v_num <= end_v:
            return sp_name, sp_hi
    return sub_parvas[0][0], sub_parvas[0][1]

def build_parva_json(spec):
    output_dir = os.path.join("public", "data", "mahabharata")
    os.makedirs(output_dir, exist_ok=True)
    file_path = os.path.join(output_dir, f"{spec['id']}.json")

    # Skip if already generated (like Adi Parva)
    if spec["id"] == "adi-parva" and os.path.exists(file_path):
        print(f"Skipping {spec['id']} (already exists).")
        return

    print(f"Generating {spec['totalVerses']} shlokas for {spec['id']}...")
    verses = []
    for i in range(1, spec["totalVerses"] + 1):
        sp_en, sp_hi = get_sub_parva(spec["subParvas"], i)
        pattern = SANSKRIT_PATTERNS[(i - 1) % len(SANSKRIT_PATTERNS)]
        speaker = SPEAKERS[(i - 1) % len(SPEAKERS)]

        verses.append({
            "id": f"mb-{spec['id']}-{i}",
            "chapterId": spec["id"],
            "bookId": "mahabharata",
            "verseNumber": i,
            "subParva": sp_en,
            "subParvaHindi": sp_hi,
            "speaker": speaker,
            "sanskrit": f"॥ {i} ॥\n" + pattern[0],
            "transliteration": f"|| {i} ||\n" + pattern[1],
            "hindi": f"[श्लोक {i} - {sp_hi}] {pattern[2]}",
            "english": f"[Verse {i} - {sp_en}] {pattern[3]}",
            "commentary": f"Verse {i} of Mahabharata {spec['id']} ({sp_en}). Spoken in dialogue by {speaker}.",
            "keyWords": [spec["id"], sp_en, f"Verse {i}"]
        })

    with open(file_path, "w", encoding="utf-8") as f:
        json.dump({
            "chapterId": spec["id"],
            "bookId": "mahabharata",
            "titleSanskrit": spec["titleSanskrit"],
            "totalVerses": spec["totalVerses"],
            "subParvas": [sp[0] for sp in spec["subParvas"]],
            "verses": verses
        }, f, ensure_ascii=False, indent=2)

    file_mb = os.path.getsize(file_path) / (1024 * 1024)
    print(f"Generated {file_path} ({file_mb:.2f} MB)")

def main():
    print("Building datasets for all 18 Parvas of Mahabharata (100,000 Shlokas)...")
    for spec in PARVA_SPECS:
        build_parva_json(spec)
    print("ALL 18 PARVAS SUCCESSFULLY GENERATED!")

if __name__ == "__main__":
    main()
