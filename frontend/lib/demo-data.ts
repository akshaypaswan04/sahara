import { EmergencyAlert, DemoForm } from './types';

export const DEMO_ALERTS: EmergencyAlert[] = [
  {
    id: 'DEMO-001',
    type: 'flood',
    severity: 'critical',
    location: 'Demo District, Maharashtra',
    district: 'Demo District',
    state: 'Maharashtra',
    source: 'Demo Disaster Management Authority',
    sourceAuthority: 'Maharashtra State Disaster Management Authority (Demo)',
    issuedAt: '2026-09-07T14:30:00+05:30',
    validUntil: '2026-09-08T14:30:00+05:30',
    originalMessage:
      'Residents in low-lying areas of Demo District are advised to evacuate immediately due to expected heavy rainfall and severe flooding. Water levels in the Demo River have risen to critical levels. All residents in flood-prone zones must move to designated shelters. Do not attempt to cross flooded roads or water bodies.',
    actionPoints: [
      'Move away from low-lying and flood-prone areas immediately.',
      'Avoid flooded roads, drains, and water bodies.',
      'Keep essential documents, medicines, and emergency supplies with you.',
      'Follow all instructions from local authorities.',
      'Contact emergency helpline: 1077 (Demo).',
    ],
    coordinates: { lat: 19.076, lng: 72.8777 },
    affectedRadius: 15,
    shelters: [
      {
        name: 'Demo Community Center Shelter',
        address: 'Near Demo Town Hall, Demo District',
        coordinates: { lat: 19.09, lng: 72.86 },
        capacity: 500,
        contact: '1077 (Demo)',
      },
      {
        name: 'Demo Government School Relief Camp',
        address: 'Demo School Road, Demo District',
        coordinates: { lat: 19.07, lng: 72.9 },
        capacity: 300,
        contact: '1077 (Demo)',
      },
    ],
    translations: {
      en: {
        translatedMessage:
          'Residents in low-lying areas of Demo District are advised to evacuate immediately due to expected heavy rainfall and severe flooding.',
        simplifiedMessage:
          'Heavy rain is causing floods in Demo District. If you live in a low area, move to a safer place right away. Do not cross flooded roads.',
        actionPoints: [
          'Leave low-lying areas immediately.',
          'Do not walk or drive through floodwater.',
          'Take your documents and medicines.',
          'Go to the nearest shelter or safe building.',
          'Call 1077 for help (Demo).',
        ],
      },
      hi: {
        translatedMessage:
          'डेमो जिले के निचले इलाकों में रहने वाले लोगों को भारी बारिश और बाढ़ के कारण तुरंत सुरक्षित स्थान पर जाने की सलाह दी जाती है। डेमो नदी में जल स्तर खतरनाक स्तर तक पहुंच गया है।',
        simplifiedMessage:
          'डेमो जिले में भारी बारिश से बाढ़ आ सकती है। अगर आप नीचे इलाके में रहते हैं, तो तुरंत सुरक्षित जगह पर जाएं। बाढ़ वाली सड़क पर न जाएं।',
        actionPoints: [
          'तुरंत निचले इलाके से सुरक्षित स्थान पर जाएं।',
          'बाढ़ के पानी में न चलें और न गाड़ी चलाएं।',
          'अपने जरूरी कागज और दवाइयां साथ रखें।',
          'नजदीकी शेल्टर या सुरक्षित इमारत में जाएं।',
          'मदद के लिए 1077 पर कॉल करें (डेमो)।',
        ],
      },
      mr: {
        translatedMessage:
          'डेमो जिल्ह्यातील सखल भागात राहणाऱ्या रहिवाशांना मुसळधार पाऊस आणि पूरामुळे तातडीने सुरक्षित ठिकाणी जाण्याचा सल्ला देण्यात येतो. डेमो नदीची पाणी पातळी धोकादायक पातळीवर पोहोचली आहे.',
        simplifiedMessage:
          'डेमो जिल्ह्यात मुसळधार पाऊस झाल्याने पूर येण्याची शक्यता आहे. जर तुम्ही सखल भागात राहत असाल, तर लगेच सुरक्षित ठिकाणी जा. पुराच्या पाण्यात जाऊ नका.',
        actionPoints: [
          'लगेच सखल भागातून सुरक्षित ठिकाणी जा।',
          'पुराच्या पाण्यातून चालू किंवा गाडी चालवू नका।',
          'महत्त्वाचे कागदपत्रे आणि औषधे सोबत घ्या।',
          'जवळच्या निवारा केंद्रात जा।',
          'मदतीसाठी 1077 वर फोन करा (डेमो)।',
        ],
      },
      bn: {
        translatedMessage:
          'ডেমো জেলার নিচু এলাকার বাসিন্দাদের ভারী বৃষ্টি ও বন্যার কারণে অবিলম্বে নিরাপদ স্থানে সরে যাওয়ার পরামর্শ দেওয়া হচ্ছে।',
        simplifiedMessage:
          'ডেমো জেলায় ভারী বৃষ্টিতে বন্যা হতে পারে। যদি আপনি নিচু এলাকায় থাকেন, এখনই নিরাপদ জায়গায় যান। বন্যার পানিতে যাবেন না।',
        actionPoints: [
          'অবিলম্বে নিচু এলাকা ছেড়ে নিরাপদ স্থানে যান।',
          'বন্যার পানিতে হাঁটবেন না বা গাড়ি চালাবেন না।',
          'গুরুত্বপূর্ণ কাগজপত্র ও ওষুধ সঙ্গে রাখুন।',
          'নিকটবর্তী আশ্রয়কেন্দ্রে যান।',
          'সাহায্যের জন্য 1077 নম্বরে ফোন করুন (ডেমো)।',
        ],
      },
      ta: {
        translatedMessage:
          'டெமோ மாவட்டத்தின் தாழ்வான பகுதிகளில் வசிக்கும் மக்கள் கனமழை மற்றும் வெள்ளத்தால் உடனடியாக பாதுகாப்பான இடத்திற்கு செல்ல வேண்டும்.',
        simplifiedMessage:
          'டெமோ மாவட்டத்தில் கனமழையால் வெள்ளம் வரலாம். தாழ்வான பகுதியில் இருந்தால் உடனே பாதுகாப்பான இடம் செல்லுங்கள். வெள்ள நீரில் நுழையாதீர்கள்.',
        actionPoints: [
          'உடனடியாக தாழ்வான பகுதியை விட்டு செல்லுங்கள்.',
          'வெள்ள நீரில் நடக்கவோ வாகனம் ஓட்டவோ வேண்டாம்.',
          'முக்கியமான ஆவணங்கள் மற்றும் மருந்துகளை எடுத்துச் செல்லுங்கள்.',
          'அருகிலுள்ள தங்குமிட மையம் செல்லுங்கள்.',
          'உதவிக்கு 1077 அழையுங்கள் (டெமோ).',
        ],
      },
      te: {
        translatedMessage:
          'డెమో జిల్లాలోని తక్కువ ఎత్తులో ఉన్న ప్రాంతాల నివాసితులు భారీ వర్షాలు మరియు వరదల కారణంగా వెంటనే సురక్షిత ప్రదేశానికి వెళ్ళవలసిందిగా సూచించబడుచున్నారు.',
        simplifiedMessage:
          'డెమో జిల్లాలో భారీ వర్షాల వల్ల వరదలు రావచ్చు. మీరు తక్కువ ప్రాంతంలో ఉంటే వెంటనే సురక్షిత స్థలానికి వెళ్ళండి.',
        actionPoints: [
          'వెంటనే తక్కువ ప్రాంతాన్ని వదలి సురక్షిత స్థలానికి వెళ్ళండి.',
          'వరద నీటిలో నడవకండి లేదా వాహనం నడపకండి.',
          'ముఖ్యమైన పత్రాలు మరియు మందులు తీసుకుపోండి.',
          'సమీపంలోని ఆశ్రయ కేంద్రానికి వెళ్ళండి.',
          'సహాయానికి 1077కి కాల్ చేయండి (డెమో).',
        ],
      },
      gu: {
        translatedMessage:
          'ડેમો જિલ્લાના નીચાણવાળા વિસ્તારના રહેવાસીઓને ભારે વરસાદ અને પૂરના કારણે તાત્કાલિક સુરક્ષિત સ્થળ ખસેડવાની સલાહ આપવામાં આવે છે.',
        simplifiedMessage:
          'ડેમો જિલ્લામાં ભારે વરસાદથી પૂર આવી શકે. નીચાણ વિસ્તારમાં રહો છો તો તરત સુરક્ષિત જગ્યાએ જાઓ.',
        actionPoints: [
          'તરત નીચાણ વિસ્તાર છોડી સુરક્ષિત સ્થળ જાઓ.',
          'પૂરના પાણીમાં ચાલવું કે ગાડી ચલાવવી નહીં.',
          'જરૂરી કાગળો અને દવાઓ સાથે રાખો.',
          'નજીકના આશ્રય કેન્દ્ર જાઓ.',
          'મદદ માટે 1077 ઉપર ફોન કરો (ડેમો).',
        ],
      },
      kn: {
        translatedMessage:
          'ಡೆಮೋ ಜಿಲ್ಲೆಯ ತಗ್ಗು ಪ್ರದೇಶಗಳಲ್ಲಿ ವಾಸಿಸುವ ನಿವಾಸಿಗಳು ಭಾರಿ ಮಳೆ ಮತ್ತು ಪ್ರವಾಹದಿಂದಾಗಿ ತಕ್ಷಣವೇ ಸುರಕ್ಷಿತ ಸ್ಥಳಕ್ಕೆ ಸ್ಥಳಾಂತರಗೊಳ್ಳಬೇಕು.',
        simplifiedMessage:
          'ಡೆಮೋ ಜಿಲ್ಲೆಯಲ್ಲಿ ಭಾರಿ ಮಳೆಯಿಂದ ಪ್ರವಾಹ ಬರಬಹುದು. ತಗ್ಗು ಪ್ರದೇಶದಲ್ಲಿದ್ದರೆ ತಕ್ಷಣ ಸುರಕ್ಷಿತ ಜಾಗಕ್ಕೆ ಹೋಗಿ.',
        actionPoints: [
          'ತಕ್ಷಣ ತಗ್ಗು ಪ್ರದೇಶ ಬಿಟ್ಟು ಸುರಕ್ಷಿತ ಸ್ಥಳಕ್ಕೆ ಹೋಗಿ.',
          'ಪ್ರವಾಹದ ನೀರಿನಲ್ಲಿ ನಡೆಯಬೇಡಿ ಅಥವಾ ವಾಹನ ಓಡಿಸಬೇಡಿ.',
          'ಮುಖ್ಯ ದಾಖಲೆಗಳು ಮತ್ತು ಔಷಧಿಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ.',
          'ಹತ್ತಿರದ ಆಶ್ರಯ ಕೇಂದ್ರಕ್ಕೆ ಹೋಗಿ.',
          'ಸಹಾಯಕ್ಕಾಗಿ 1077 ಕರೆ ಮಾಡಿ (ಡೆಮೋ).',
        ],
      },
      ml: {
        translatedMessage:
          'ഡെമോ ജില്ലയിലെ താഴ്ന്ന പ്രദേശങ്ങളിൽ താമസിക്കുന്നവർ കനത്ത മഴയും വെള്ളപ്പൊക്കവും കാരണം ഉടൻ സുരക്ഷിത സ്ഥലത്തേക്ക് മാറണം.',
        simplifiedMessage:
          'ഡെമോ ജില്ലയിൽ കനത്ത മഴ കാരണം വെള്ളപ്പൊക്കം ഉണ്ടാകാം. താഴ്ന്ന പ്രദേശത്ത് ഉള്ളവർ ഉടൻ സുരക്ഷിത സ്ഥലത്തേക്ക് പോകണം.',
        actionPoints: [
          'ഉടൻ താഴ്ന്ന പ്രദേശം വിട്ട് സുരക്ഷിത സ്ഥലത്തേക്ക് പോകുക.',
          'വെള്ളപ്പൊക്ക വെള്ളത്തിൽ നടക്കരുത് അല്ലെങ്കിൽ വാഹനം ഓടിക്കരുത്.',
          'പ്രധാന രേഖകളും മരുന്നുകളും കൊണ്ടുപോകുക.',
          'അടുത്തുള്ള ആശ്രയ കേന്ദ്രത്തിലേക്ക് പോകുക.',
          'സഹായത്തിന് 1077 വിളിക്കുക (ഡെമോ).',
        ],
      },
      pa: {
        translatedMessage:
          'ਡੈਮੋ ਜ਼ਿਲੇ ਦੇ ਨੀਵੇਂ ਇਲਾਕਿਆਂ ਵਿੱਚ ਰਹਿਣ ਵਾਲੇ ਲੋਕਾਂ ਨੂੰ ਭਾਰੀ ਬਾਰਸ਼ ਅਤੇ ਹੜ੍ਹ ਕਾਰਨ ਤੁਰੰਤ ਸੁਰੱਖਿਅਤ ਜਗ੍ਹਾ ਤੇ ਜਾਣ ਦੀ ਸਲਾਹ ਦਿੱਤੀ ਜਾਂਦੀ ਹੈ।',
        simplifiedMessage:
          'ਡੈਮੋ ਜ਼ਿਲੇ ਵਿੱਚ ਭਾਰੀ ਬਾਰਸ਼ ਕਾਰਨ ਹੜ੍ਹ ਆ ਸਕਦਾ ਹੈ। ਨੀਵੇਂ ਇਲਾਕੇ ਵਿੱਚ ਹੋ ਤਾਂ ਤੁਰੰਤ ਸੁਰੱਖਿਅਤ ਜਗ੍ਹਾ ਜਾਓ।',
        actionPoints: [
          'ਤੁਰੰਤ ਨੀਵੇਂ ਇਲਾਕੇ ਤੋਂ ਸੁਰੱਖਿਅਤ ਜਗ੍ਹਾ ਚਲੇ ਜਾਓ।',
          'ਹੜ੍ਹ ਦੇ ਪਾਣੀ ਵਿੱਚ ਨਾ ਚੱਲੋ ਅਤੇ ਨਾ ਗੱਡੀ ਚਲਾਓ।',
          'ਜ਼ਰੂਰੀ ਕਾਗਜ਼ ਅਤੇ ਦਵਾਈਆਂ ਨਾਲ ਰੱਖੋ।',
          'ਨੇੜੇ ਦੇ ਸ਼ੈਲਟਰ ਵਿੱਚ ਜਾਓ।',
          'ਮਦਦ ਲਈ 1077 ਤੇ ਫੋਨ ਕਰੋ (ਡੈਮੋ)।',
        ],
      },
      or: {
        translatedMessage:
          'ଡେମୋ ଜିଲ୍ଲାର ନିମ୍ନ ଅଞ୍ଚଳ ବାସିନ୍ଦାମାନଙ୍କୁ ଭାରୀ ବର୍ଷା ଓ ବନ୍ୟା କାରଣରୁ ତୁରନ୍ତ ସୁରକ୍ଷିତ ସ୍ଥାନ ଯିବାକୁ ପରାମର୍ଶ ଦିଆଯାଉଛି।',
        simplifiedMessage:
          'ଡେମୋ ଜିଲ୍ଲାରେ ଭାରୀ ବର୍ଷାରୁ ବନ୍ୟା ଆସିପାରେ। ନିମ୍ନ ଅଞ୍ଚଳରେ ଥିଲେ ଶୀଘ୍ର ସୁରକ୍ଷିତ ସ୍ଥାନ ଯାଆନ୍ତୁ।',
        actionPoints: [
          'ତୁରନ୍ତ ନିମ୍ନ ଅଞ୍ଚଳ ଛାଡ଼ି ସୁରକ୍ଷିତ ସ୍ଥାନ ଯାଆନ୍ତୁ।',
          'ବନ୍ୟା ପାଣିରେ ଚାଲନ୍ତୁ ନାହିଁ ବା ଗାଡ଼ି ଚଲାନ୍ତୁ ନାହିଁ।',
          'ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ଦଲିଲ ଓ ଔଷଧ ସଙ୍ଗେ ରଖନ୍ତୁ।',
          'ନିକଟ ଆଶ୍ରୟ ଶିବିର ଯାଆନ୍ତୁ।',
          'ସାହାଯ୍ୟ ପାଇଁ 1077 ଫୋନ କରନ୍ତୁ (ଡେମୋ)।',
        ],
      },
      as: {
        translatedMessage:
          'ডেমো জিলাৰ নিম্নভূমি অঞ্চলৰ বাসিন্দাসকলক গধুৰ বৰষুণ আৰু বানপানীৰ কাৰণে তৎক্ষণাৎ সুৰক্ষিত স্থানলৈ যাবলৈ পৰামৰ্শ দিয়া হৈছে।',
        simplifiedMessage:
          'ডেমো জিলাত গধুৰ বৰষুণৰ ফলত বানপানী হ\'ব পাৰে। নিম্নভূমিত থাকিলে এতিয়াই সুৰক্ষিত ঠাইলৈ যাওক।',
        actionPoints: [
          'তৎক্ষণাৎ নিম্নভূমি এৰি সুৰক্ষিত স্থানলৈ যাওক।',
          'বানপানীত খোজ নিদিব বা গাড়ী নচলাব।',
          'গুৰুত্বপূৰ্ণ কাগজপত্ৰ আৰু দৰব লৈ যাওক।',
          'ওচৰৰ আশ্ৰয় শিবিৰলৈ যাওক।',
          'সহায়ৰ বাবে 1077 ত ফোন কৰক (ডেমো)।',
        ],
      },
      ur: {
        translatedMessage:
          'ڈیمو ضلع کے نشیبی علاقوں کے باشندوں کو شدید بارش اور سیلاب کی وجہ سے فوری طور پر محفوظ مقام پر منتقل ہونے کی ہدایت کی جاتی ہے۔',
        simplifiedMessage:
          'ڈیمو ضلع میں شدید بارش سے سیلاب آ سکتا ہے۔ اگر آپ نشیبی علاقے میں ہیں تو فوراً محفوظ جگہ جائیں۔',
        actionPoints: [
          'فوری طور پر نشیبی علاقہ چھوڑ کر محفوظ مقام جائیں۔',
          'سیلابی پانی میں نہ چلیں اور نہ گاڑی چلائیں۔',
          'ضروری کاغذات اور دوائیں ساتھ رکھیں۔',
          'قریبی پناہ گاہ میں جائیں۔',
          'مدد کے لیے 1077 پر فون کریں (ڈیمو)۔',
        ],
      },
    },
  },
  {
    id: 'DEMO-002',
    type: 'rainfall',
    severity: 'high',
    location: 'Demo City, Karnataka',
    district: 'Demo City District',
    state: 'Karnataka',
    source: 'India Meteorological Department (Demo)',
    sourceAuthority: 'IMD Demo Regional Centre',
    issuedAt: '2026-09-07T10:00:00+05:30',
    validUntil: '2026-09-08T06:00:00+05:30',
    originalMessage:
      'Red alert issued for Demo City and surrounding talukas. Extremely heavy rainfall (>204.4 mm) expected in the next 24 hours. Citizens are advised to stay indoors, avoid travel, and keep emergency numbers handy.',
    actionPoints: [
      'Stay indoors and avoid unnecessary travel.',
      'Keep emergency numbers handy: 112, 1077 (Demo).',
      'Keep a watch on rising water levels.',
      'Do not park vehicles near drains or underpasses.',
      'Keep phone charged for emergency alerts.',
    ],
    coordinates: { lat: 12.9716, lng: 77.5946 },
    affectedRadius: 30,
    shelters: [
      {
        name: 'Demo Relief Centre — Bengaluru North',
        address: 'Demo Road, Demo Ward',
        coordinates: { lat: 12.99, lng: 77.58 },
        capacity: 800,
        contact: '1077 (Demo)',
      },
    ],
    translations: {
      en: {
        translatedMessage:
          'Red alert for Demo City. Extremely heavy rainfall expected. Stay indoors and avoid travel.',
        simplifiedMessage:
          'Very heavy rain (Red Alert) is expected in Demo City for the next 24 hours. Please stay at home. Avoid going out unless absolutely necessary.',
        actionPoints: [
          'Stay at home. Avoid going out.',
          'Keep emergency numbers saved: 112 and 1077 (Demo).',
          'Watch for rising water near your home.',
          'Keep your phone charged.',
        ],
      },
      hi: {
        translatedMessage:
          'डेमो सिटी के लिए रेड अलर्ट जारी। अत्यधिक भारी वर्षा की संभावना। घर के अंदर रहें और यात्रा से बचें।',
        simplifiedMessage:
          'डेमो सिटी में अगले 24 घंटे बहुत तेज बारिश होने की संभावना है (रेड अलर्ट)। कृपया घर पर रहें। जब तक बहुत जरूरी न हो, बाहर न जाएं।',
        actionPoints: [
          'घर पर रहें। बाहर जाने से बचें।',
          'आपातकालीन नंबर सेव रखें: 112 और 1077 (डेमो)।',
          'अपने घर के पास पानी के स्तर पर नजर रखें।',
          'अपना फोन चार्ज रखें।',
        ],
      },
      mr: {
        translatedMessage:
          'डेमो सिटीसाठी रेड अलर्ट जारी. अत्यंत जड पाऊस अपेक्षित. घरातच राहा व प्रवास टाळा.',
        simplifiedMessage:
          'डेमो सिटीत पुढील 24 तास अतिमुसळधार पाऊस पडण्याची शक्यता आहे (रेड अलर्ट). घरी राहा. गरज नसल्यास बाहेर पडू नका.',
        actionPoints: [
          'घरी राहा. बाहेर जाणे टाळा.',
          'आणीबाणीचे नंबर जतन करा: 112 आणि 1077 (डेमो).',
          'घराजवळ पाण्याची पातळी पाहत राहा.',
          'फोन चार्ज ठेवा.',
        ],
      },
      kn: {
        translatedMessage:
          'ಡೆಮೋ ಸಿಟಿಗೆ ರೆಡ್ ಅಲರ್ಟ್ ಘೋಷಿಸಲಾಗಿದೆ. ಅತ್ಯಧಿಕ ಭಾರಿ ಮಳೆ ನಿರೀಕ್ಷೆ. ಮನೆಯಲ್ಲೇ ಇರಿ ಮತ್ತು ಪ್ರಯಾಣ ತಪ್ಪಿಸಿ.',
        simplifiedMessage:
          'ಡೆಮೋ ಸಿಟಿಯಲ್ಲಿ ಮುಂದಿನ 24 ಗಂಟೆ ತುಂಬಾ ಭಾರಿ ಮಳೆ ಬರಬಹುದು (ರೆಡ್ ಅಲರ್ಟ್). ಮನೆಯಲ್ಲೇ ಇರಿ. ಅತ್ಯಗತ್ಯ ಇಲ್ಲದಿದ್ದರೆ ಹೊರಗೆ ಹೋಗಬೇಡಿ.',
        actionPoints: [
          'ಮನೆಯಲ್ಲೇ ಇರಿ. ಹೊರಗೆ ಹೋಗುವುದು ತಪ್ಪಿಸಿ.',
          'ತುರ್ತು ನಂಬರ್ ಉಳಿಸಿ: 112 ಮತ್ತು 1077 (ಡೆಮೋ).',
          'ಮನೆ ಬಳಿ ನೀರಿನ ಮಟ್ಟ ಗಮನಿಸಿ.',
          'ಫೋನ್ ಚಾರ್ಜ್ ಮಾಡಿ.',
        ],
      },
      ta: { translatedMessage: 'டெமோ நகரத்திற்கு சிவப்பு எச்சரிக்கை. மிக கனமழை எதிர்பார்க்கப்படுகிறது.', simplifiedMessage: 'டெமோ நகரில் அடுத்த 24 மணி நேரம் மிக கனமழை பெய்யலாம். வீட்டிலேயே இருங்கள்.', actionPoints: ['வீட்டிலேயே இருங்கள்.', 'அவசர நம்பர்: 112, 1077 (டெமோ).'] },
      te: { translatedMessage: 'డెమో సిటీకి రెడ్ అలర్ట్. భారీ వర్షాలు అంచనా. ఇంట్లోనే ఉండండి.', simplifiedMessage: 'డెమో సిటీలో 24 గంటల్లో చాలా భారీ వర్షాలు (రెడ్ అలర్ట్). ఇంట్లో ఉండండి.', actionPoints: ['ఇంట్లో ఉండండి.', 'అత్యవసర నంబర్లు: 112, 1077 (డెమో).'] },
      bn: { translatedMessage: 'ডেমো শহরে রেড অ্যালার্ট। অতি ভারী বৃষ্টি আশা করা হচ্ছে।', simplifiedMessage: 'ডেমো শহরে পরের ২৪ ঘণ্টা অতি ভারী বৃষ্টি হবে। ঘরে থাকুন।', actionPoints: ['ঘরে থাকুন।', 'জরুরি নম্বর: 112, 1077 (ডেমো)।'] },
      gu: { translatedMessage: 'ડેમો સિટીમાં રેડ એલર્ટ. ભારે વરસાદ અપેક્ષિત.', simplifiedMessage: 'ડેમો સિટીમાં 24 કલાક ખૂબ ભારે વરસાદ. ઘરે રહો.', actionPoints: ['ઘરે રહો.', 'ઇમર્જન્સી નંબર: 112, 1077 (ડેમો).'] },
      ml: { translatedMessage: 'ഡെമോ സിറ്റിക്ക് റെഡ് അലർട്ട്. കനത്ത മഴ പ്രതീക്ഷിക്കുന്നു.', simplifiedMessage: 'ഡെമോ സിറ്റിയിൽ 24 മണിക്കൂർ കനത്ത മഴ. വീട്ടിൽ ഇരിക്കുക.', actionPoints: ['വീട്ടിൽ ഇരിക്കുക.', 'അടിയന്തര നമ്പർ: 112, 1077 (ഡെമോ).'] },
      pa: { translatedMessage: 'ਡੈਮੋ ਸਿਟੀ ਲਈ ਰੈੱਡ ਅਲਰਟ। ਭਾਰੀ ਬਾਰਸ਼ ਦੀ ਸੰਭਾਵਨਾ।', simplifiedMessage: 'ਡੈਮੋ ਸਿਟੀ ਵਿੱਚ 24 ਘੰਟੇ ਬਹੁਤ ਭਾਰੀ ਬਾਰਸ਼। ਘਰ ਵਿੱਚ ਰਹੋ।', actionPoints: ['ਘਰ ਵਿੱਚ ਰਹੋ।', 'ਐਮਰਜੈਂਸੀ ਨੰਬਰ: 112, 1077 (ਡੈਮੋ)।'] },
      or: { translatedMessage: 'ଡେମୋ ସହରରେ ଲାଲ ସଙ୍କେତ। ଭାରୀ ବର୍ଷା ଆଶା।', simplifiedMessage: 'ଡେମୋ ସହରରେ 24 ଘଣ୍ଟା ଭାରୀ ବର୍ଷା। ଘରେ ରୁହନ୍ତୁ।', actionPoints: ['ଘରେ ରୁହନ୍ତୁ।', 'ଆପଦ ନମ୍ବର: 112, 1077 (ଡେମୋ)।'] },
      as: { translatedMessage: 'ডেমো চহৰত ৰেড এলাৰ্ট। গধুৰ বৰষুণৰ আশংকা।', simplifiedMessage: 'ডেমো চহৰত 24 ঘণ্টা গধুৰ বৰষুণ। ঘৰতে থাকক।', actionPoints: ['ঘৰতে থাকক।', 'জৰুৰী নম্বৰ: 112, 1077 (ডেমো)।'] },
      ur: { translatedMessage: 'ڈیمو شہر میں ریڈ الرٹ۔ شدید بارش متوقع۔', simplifiedMessage: 'ڈیمو شہر میں 24 گھنٹے شدید بارش۔ گھر میں رہیں۔', actionPoints: ['گھر میں رہیں۔', 'ہنگامی نمبر: 112، 1077 (ڈیمو)۔'] },
    },
  },
  {
    id: 'DEMO-003',
    type: 'cyclone',
    severity: 'critical',
    location: 'Demo Coast, Odisha',
    district: 'Demo Coastal District',
    state: 'Odisha',
    source: 'India Meteorological Department (Demo)',
    sourceAuthority: 'IMD Demo Cyclone Warning Centre',
    issuedAt: '2026-09-06T18:00:00+05:30',
    validUntil: '2026-09-09T18:00:00+05:30',
    originalMessage:
      'Severe Cyclonic Storm DEMO is likely to make landfall near Demo Coast, Odisha between 7 and 8 September. Maximum sustained winds of 90-100 km/h gusting to 110 km/h. Heavy to very heavy rainfall expected. Coastal districts must complete evacuation.',
    actionPoints: [
      'Evacuate immediately from coastal and low-lying areas.',
      'Seek shelter in pucca buildings away from the coast.',
      'Do not venture into the sea.',
      'Fishermen must not go to sea.',
      'Follow orders of district administration.',
      'Keep emergency radio/phone accessible.',
    ],
    coordinates: { lat: 20.2961, lng: 85.8245 },
    affectedRadius: 50,
    shelters: [
      {
        name: 'Demo Cyclone Shelter — Block A',
        address: 'Demo Village, Demo Coastal District',
        coordinates: { lat: 20.31, lng: 85.84 },
        capacity: 1000,
        contact: '1070 (Demo)',
      },
    ],
    translations: {
      en: {
        translatedMessage: 'Severe Cyclonic Storm DEMO approaching Demo Coast, Odisha. Evacuation mandatory for coastal areas.',
        simplifiedMessage: 'A strong cyclone is coming to Demo Coast in Odisha. Winds up to 110 km/h. People near the coast must leave immediately and go to a cyclone shelter.',
        actionPoints: [
          'Leave coastal areas immediately.',
          'Go to a strong building or cyclone shelter.',
          'Do not go near the sea.',
          'Fishermen must stay on land.',
          'Listen to official announcements.',
        ],
      },
      hi: {
        translatedMessage: 'डेमो चक्रवात डेमो कोस्ट, ओडिशा की तरफ बढ़ रहा है। तटीय क्षेत्रों से तुरंत निकासी जरूरी।',
        simplifiedMessage: 'ओडिशा के डेमो तट पर एक मजबूत चक्रवात आ रहा है। हवाएं 110 किमी/घंटा तक। तट के पास रहने वाले लोग तुरंत जाएं।',
        actionPoints: ['तट के इलाकों से तुरंत निकलें।', 'पक्के मकान या चक्रवात आश्रय में जाएं।', 'समुद्र के पास न जाएं।', 'मछुआरे समुद्र में न जाएं।', 'सरकारी निर्देश मानें।'],
      },
      mr: {
        translatedMessage: 'डेमो चक्रीवादळ डेमो कोस्ट, ओडिशाकडे येत आहे. किनारपट्टी भागातून तातडीने स्थलांतर आवश्यक.',
        simplifiedMessage: 'ओडिशाच्या डेमो किनारपट्टीवर जोरदार चक्रीवादळ येत आहे. वाऱ्याचा वेग 110 किमी/तास. किनारी रहिवाशांनी तत्काळ जावे.',
        actionPoints: ['किनारपट्टी भागातून लगेच निघा.', 'पक्क्या इमारत किंवा चक्रीवादळ निवारा केंद्रात जा.', 'समुद्रापासून दूर रहा.', 'मच्छीमारांनी समुद्रात जाऊ नये.', 'अधिकृत सूचना पाळा.'],
      },
      or: {
        translatedMessage: 'ଡେମୋ ଘୂର୍ଣ୍ଣିଝଡ ଡେମୋ ଉପକୂଳ, ଓଡ଼ିଶା ଆଡ଼େ ଆସୁଛି। ଉପକୂଳ ଅଞ୍ଚଳ ଖାଲି କରାଇବା ଜରୁରୀ।',
        simplifiedMessage: 'ଓଡ଼ିଶାର ଡେମୋ ଉପକୂଳରେ ଶକ୍ତିଶାଳୀ ଘୂର୍ଣ୍ଣିଝଡ ଆସୁଛି। ଉପକୂଳ ଲୋକ ତୁରନ୍ତ ଯାଆନ୍ତୁ।',
        actionPoints: ['ଉପକୂଳ ଅଞ୍ଚଳ ଛାଡ଼ି ଯାଆନ୍ତୁ।', 'ଘୂର୍ଣ୍ଣିଝଡ ଆଶ୍ରୟ ସ୍ଥଳ ଯାଆନ୍ତୁ।', 'ସମୁଦ୍ର ପ୍ରତି ଯାଆନ୍ତୁ ନାହିଁ।'],
      },
      bn: { translatedMessage: 'ডেমো ঘূর্ণিঝড় ডেমো উপকূল, ওড়িশার দিকে আসছে।', simplifiedMessage: 'ওড়িশার ডেমো উপকূলে শক্তিশালী ঘূর্ণিঝড় আসছে। উপকূলবর্তী মানুষ অবিলম্বে চলে যান।', actionPoints: ['উপকূল ছেড়ে যান।', 'সাইক্লোন আশ্রয়কেন্দ্রে যান।', 'সমুদ্রে যাবেন না।'] },
      ta: { translatedMessage: 'ஒரிசாவின் டெமோ கடலோரத்தில் புயல் வருகிறது.', simplifiedMessage: 'கடலோர மக்கள் உடனே வெளியேறுங்கள்.', actionPoints: ['கடலோரத்தை விட்டு வெளியேறுங்கள்.', 'புயல் தங்குமிடம் செல்லுங்கள்.'] },
      te: { translatedMessage: 'ఒడిశా డెమో తీరాన తుఫాన్ వస్తోంది.', simplifiedMessage: 'తీర ప్రాంత ప్రజలు వెంటనే వెళ్ళండి.', actionPoints: ['తీర ప్రాంతం వదలండి.', 'తుఫాన్ ఆశ్రయ కేంద్రానికి వెళ్ళండి.'] },
      gu: { translatedMessage: 'ઓડિશાના ડેમો દરિયાકિનારે વાવઝોડું આવી રહ્યું છે.', simplifiedMessage: 'દરિયાકિનારાના લોકો તરત ચાલ્યા જાઓ.', actionPoints: ['દરિયાકિનારો છોડો.', 'વાવઝોડું આશ્રય કેન્દ્ર જાઓ.'] },
      kn: { translatedMessage: 'ಒಡಿಶಾ ಡೆಮೋ ಕರಾವಳಿಗೆ ಚಂಡಮಾರುತ ಬರುತ್ತಿದೆ.', simplifiedMessage: 'ಕರಾವಳಿ ಜನರು ತಕ್ಷಣ ಹೋಗಿ.', actionPoints: ['ಕರಾವಳಿ ತ್ಯಜಿಸಿ.', 'ಚಂಡಮಾರುತ ಆಶ್ರಯ ಕೇಂದ್ರಕ್ಕೆ ಹೋಗಿ.'] },
      ml: { translatedMessage: 'ഒഡിഷ ഡെമോ തീരത്ത് ചുഴലിക്കാറ്റ് വരുന്നു.', simplifiedMessage: 'തീര ജനങ്ങൾ ഉടൻ പോകണം.', actionPoints: ['തീരം ഉപേക്ഷിക്കുക.', 'ചുഴലിക്കാറ്റ് ആശ്രയ കേന്ദ്രത്തിൽ പോകുക.'] },
      pa: { translatedMessage: 'ਓਡੀਸ਼ਾ ਡੈਮੋ ਤੱਟ ਵੱਲ ਚੱਕਰਵਾਤ ਆ ਰਿਹਾ ਹੈ।', simplifiedMessage: 'ਤੱਟੀ ਲੋਕ ਤੁਰੰਤ ਜਾਓ।', actionPoints: ['ਤੱਟ ਛੱਡੋ।', 'ਚੱਕਰਵਾਤ ਆਸਰਾ ਕੇਂਦਰ ਜਾਓ।'] },
      as: { translatedMessage: 'ওড়িশা ডেমো উপকূলত ঘূৰ্ণীবতাহ আহিছে।', simplifiedMessage: 'উপকূলৰ মানুহ এতিয়াই গুচি যাওক।', actionPoints: ['উপকূল এৰক।', 'ঘূৰ্ণীবতাহ আশ্ৰয় কেন্দ্ৰলৈ যাওক।'] },
      ur: { translatedMessage: 'اوڈیشہ کے ڈیمو ساحل کی طرف سمندری طوفان آ رہا ہے۔', simplifiedMessage: 'ساحلی لوگ فوراً چلے جائیں۔', actionPoints: ['ساحل چھوڑیں۔', 'سمندری طوفان پناہ گاہ جائیں۔'] },
    },
  },
  {
    id: 'DEMO-004',
    type: 'heat',
    severity: 'high',
    location: 'Demo Region, Rajasthan',
    district: 'Demo Desert District',
    state: 'Rajasthan',
    source: 'India Meteorological Department (Demo)',
    sourceAuthority: 'IMD Demo Regional Meteorological Centre',
    issuedAt: '2026-09-07T08:00:00+05:30',
    validUntil: '2026-09-09T20:00:00+05:30',
    originalMessage:
      'Orange alert for heat wave conditions in Demo Region, Rajasthan. Maximum temperature likely to exceed 45°C. Vulnerable populations including elderly, children, and outdoor workers are at high risk. Heat-related illness prevention measures advised.',
    actionPoints: [
      'Stay indoors during peak heat hours (11am–4pm).',
      'Drink water frequently even if not thirsty.',
      'Avoid direct sun exposure and strenuous outdoor activity.',
      'Wear light, loose, and light-coloured clothing.',
      'Check on elderly neighbours and children.',
      'Use ORS (Oral Rehydration Salts) if feeling dizzy.',
    ],
    coordinates: { lat: 26.9124, lng: 75.7873 },
    affectedRadius: 40,
    shelters: [
      {
        name: 'Demo Cooling Centre — Demo City Hall',
        address: 'Demo Town Centre, Demo Desert District',
        coordinates: { lat: 26.92, lng: 75.79 },
        capacity: 400,
        contact: '104 (Demo Health Helpline)',
      },
    ],
    translations: {
      en: {
        translatedMessage: 'Orange heat wave alert for Demo Region, Rajasthan. Temperature may reach 45°C. Vulnerable groups at risk.',
        simplifiedMessage: 'It will be very hot in Demo Region (above 45°C). Stay inside during 11am–4pm. Drink water often. Elderly and children need extra care.',
        actionPoints: [
          'Stay indoors 11am–4pm.',
          'Drink plenty of water even without feeling thirsty.',
          'Wear light clothes.',
          'Check on elderly and children.',
          'If you feel dizzy, drink ORS and seek shade.',
        ],
      },
      hi: {
        translatedMessage: 'डेमो क्षेत्र, राजस्थान के लिए हीट वेव ऑरेंज अलर्ट। तापमान 45°C से ऊपर हो सकता है।',
        simplifiedMessage: 'डेमो क्षेत्र में बहुत ज्यादा गर्मी पड़ेगी (45°C से ऊपर)। दोपहर 11 बजे से 4 बजे तक घर पर रहें। पानी खूब पिएं। बुजुर्गों और बच्चों का खास ध्यान रखें।',
        actionPoints: ['दोपहर 11 से 4 बजे घर पर रहें।', 'खूब पानी पिएं।', 'हल्के कपड़े पहनें।', 'बुजुर्गों और बच्चों का ध्यान रखें।', 'चक्कर आए तो ORS पिएं और छांव में बैठें।'],
      },
      mr: {
        translatedMessage: 'डेमो प्रदेश, राजस्थानसाठी उष्णतेची लाट ऑरेंज अलर्ट. तापमान 45°C पेक्षा जास्त होण्याची शक्यता.',
        simplifiedMessage: 'डेमो प्रदेशात खूप उकाडा असेल (45°C च्यावर). दुपारी 11 ते 4 वाजेपर्यंत घरात राहा. भरपूर पाणी प्या. वृद्ध व मुलांची काळजी घ्या.',
        actionPoints: ['दुपारी 11 ते 4 घरात राहा.', 'भरपूर पाणी प्या.', 'हलके कपडे घाला.', 'वृद्ध व मुलांचे लक्ष ठेवा.', 'चक्कर आल्यास ORS प्या.'],
      },
      gu: { translatedMessage: 'ડેમો પ્રદેશ, રાજસ્થાનમાં ગરમીની લહેર ઓરેન્જ એલર્ટ.', simplifiedMessage: 'ખૂબ ગરમ (45°C+). 11-4 ઘરે રહો. પાણી પીઓ.', actionPoints: ['11-4 ઘરે રહો.', 'પ્રવાહી પીઓ.', 'હળવા કપડા પહેરો.'] },
      ta: { translatedMessage: 'டெமோ பகுதியில் வெப்பலை எச்சரிக்கை.', simplifiedMessage: 'மிகவும் வெப்பமாக இருக்கும் (45°C+). 11-4 வரை வீட்டில் இருங்கள்.', actionPoints: ['11-4 வீட்டில் இருங்கள்.', 'தண்ணீர் குடிக்கவும்.'] },
      te: { translatedMessage: 'డెమో ప్రాంతంలో వేడిగాలి హెచ్చరిక.', simplifiedMessage: 'చాలా వేడిగా ఉంటుంది (45°C+). 11-4 ఇంట్లో ఉండండి.', actionPoints: ['11-4 ఇంట్లో ఉండండి.', 'నీరు తాగండి.'] },
      bn: { translatedMessage: 'ডেমো অঞ্চলে তাপপ্রবাহ কমলা সতর্কতা।', simplifiedMessage: 'খুব গরম (45°C+)। সকাল 11-4 ঘরে থাকুন।', actionPoints: ['11-4 ঘরে থাকুন।', 'প্রচুর জল পান করুন।'] },
      kn: { translatedMessage: 'ಡೆಮೋ ಪ್ರದೇಶದಲ್ಲಿ ಶಾಖದ ಅಲೆ ಎಚ್ಚರಿಕೆ.', simplifiedMessage: 'ತುಂಬಾ ಬಿಸಿ (45°C+). 11-4 ಮನೆಯಲ್ಲಿ ಇರಿ.', actionPoints: ['11-4 ಮನೆಯಲ್ಲಿ ಇರಿ.', 'ನೀರು ಕುಡಿಯಿರಿ.'] },
      ml: { translatedMessage: 'ഡെമോ പ്രദേശത്ത് ചൂട് തരംഗ മുന്നറിയിപ്പ്.', simplifiedMessage: 'വളരെ ചൂട് (45°C+). 11-4 വീട്ടിൽ ഇരിക്കുക.', actionPoints: ['11-4 വീട്ടിൽ ഇരിക്കുക.', 'വെള്ളം കുടിക്കുക.'] },
      pa: { translatedMessage: 'ਡੈਮੋ ਖੇਤਰ ਵਿੱਚ ਗਰਮੀ ਦੀ ਲਹਿਰ ਚੇਤਾਵਨੀ।', simplifiedMessage: 'ਬਹੁਤ ਗਰਮ (45°C+)। 11-4 ਘਰ ਰਹੋ।', actionPoints: ['11-4 ਘਰ ਰਹੋ।', 'ਪਾਣੀ ਪੀਓ।'] },
      or: { translatedMessage: 'ଡେମୋ ଅଞ୍ଚଳରେ ତାପ ତରଂଗ ଚେତାବନୀ।', simplifiedMessage: 'ବହୁତ ଗରମ (45°C+)। 11-4 ଘରେ ରୁହନ୍ତୁ।', actionPoints: ['11-4 ଘରେ ରୁହନ୍ତୁ।', 'ପାଣି ପିଅନ୍ତୁ।'] },
      as: { translatedMessage: 'ডেমো অঞ্চলত তাপপ্ৰবাহ সতৰ্কতা।', simplifiedMessage: 'অতি গৰম (45°C+)। 11-4 ঘৰত থাকক।', actionPoints: ['11-4 ঘৰত থাকক।', 'পানী খাওক।'] },
      ur: { translatedMessage: 'ڈیمو خطے میں گرمی کی لہر کا انتباہ۔', simplifiedMessage: 'بہت گرم (45°C+)۔ 11-4 گھر رہیں۔', actionPoints: ['11-4 گھر رہیں۔', 'پانی پئیں۔'] },
    },
  },
];

export const DEMO_FORMS: DemoForm[] = [
  {
    id: 'FORM-001',
    title: 'National Scholarship Application',
    source: 'Ministry of Education (Demo)',
    sourceAuthority: 'National Scholarship Portal (Demo)',
    description: 'Application for the National Merit Scholarship for students from economically weaker sections.',
    purpose: 'To provide financial assistance to meritorious students from economically weaker sections to support their education.',
    requiredDocuments: [
      { id: 'doc-1', name: 'Income Certificate', description: 'Certificate issued by a competent authority certifying annual family income.', mandatory: true },
      { id: 'doc-2', name: 'Caste/Category Certificate', description: 'Certificate proving membership of a reserved category (SC/ST/OBC), if applicable.', mandatory: false },
      { id: 'doc-3', name: 'Previous Year Mark Sheet', description: 'Mark sheet of the last examination passed, duly attested.', mandatory: true },
      { id: 'doc-4', name: 'Bank Account Details (Passbook copy)', description: 'Copy of the first page of the bank passbook showing account number and IFSC code.', mandatory: true },
      { id: 'doc-5', name: 'Aadhaar Card', description: 'Copy of Aadhaar Card for identity verification.', mandatory: true },
    ],
    fields: [
      {
        id: 'f1', name: 'full_name', label: 'Full Name (as per Aadhaar)', type: 'text', required: true,
        placeholder: 'Enter your full name',
        explanation: {
          en: 'Enter your complete name exactly as it appears on your Aadhaar card. Do not use nicknames or short forms.',
          hi: 'अपना पूरा नाम वैसे ही लिखें जैसा आपके आधार कार्ड पर है। संक्षिप्त नाम या उपनाम न लिखें।',
          mr: 'तुमचे पूर्ण नाव अगदी तसेच लिहा जसे आधार कार्डवर आहे. टोपणनाव किंवा लहान नाव वापरू नका.',
          bn: 'আপনার আধার কার্ডে যেভাবে নাম আছে ঠিক সেভাবে পুরো নাম লিখুন।',
          ta: 'உங்கள் ஆதார் கார்டில் உள்ளபடி முழு பெயரை உள்ளிடுக.',
          te: 'మీ ఆధార్ కార్డ్‌లో ఉన్నట్టుగా పూర్తి పేరు నమోదు చేయండి.',
          gu: 'આધાર કાર્ડ પ્રમાણે પૂરું નામ લખો.',
          kn: 'ಆಧಾರ್ ಕಾರ್ಡ್‌ನಲ್ಲಿ ಇರುವಂತೆ ಪೂರ್ಣ ಹೆಸರು ನಮೂದಿಸಿ.',
          ml: 'ആധാർ കാർഡിൽ ഉള്ളതുപോലെ പൂർണ്ണ പേര് നൽകുക.',
          pa: 'ਆਧਾਰ ਕਾਰਡ ਅਨੁਸਾਰ ਪੂਰਾ ਨਾਮ ਲਿਖੋ।',
          or: 'ଆଧାର କାର୍ଡ ଅନୁସାରେ ପୂର୍ଣ ନାମ ଲିଖନ୍ତୁ।',
          as: 'আধাৰ কাৰ্ড অনুযায়ী সম্পূৰ্ণ নাম লিখক।',
          ur: 'آدھار کارڈ کے مطابق پورا نام لکھیں۔',
        },
        exampleValue: 'Priya Sharma',
      },
      {
        id: 'f2', name: 'dob', label: 'Date of Birth', type: 'date', required: true,
        explanation: {
          en: 'Enter your date of birth. This must match your Aadhaar card and school records.',
          hi: 'अपनी जन्मतिथि दर्ज करें। यह आपके आधार कार्ड और स्कूल रिकॉर्ड से मेल खानी चाहिए।',
          mr: 'तुमची जन्मतारीख भरा. ही आधार कार्ड आणि शाळेच्या रेकॉर्डशी जुळली पाहिजे.',
          bn: 'জন্ম তারিখ লিখুন। এটি আধার কার্ড ও স্কুল রেকর্ডের সাথে মিলতে হবে।',
          ta: 'பிறந்த தேதி உள்ளிடுக. ஆதார் கார்டுடன் பொருந்த வேண்டும்.',
          te: 'జన్మ తేదీ నమోదు చేయండి. ఆధార్ కార్డ్‌తో సరిపోలాలి.',
          gu: 'જન્મ તારીખ દાખલ કરો. આધાર સાથે મળવી જોઈએ.',
          kn: 'ಜನ್ಮ ದಿನಾಂಕ ನಮೂದಿಸಿ. ಆಧಾರ್‌ನೊಂದಿಗೆ ಹೊಂದಿಕೆಯಾಗಬೇಕು.',
          ml: 'ജനനത്തീയതി നൽകുക. ആധാർ കാർഡുമായി ഒത്തുചേരണം.',
          pa: 'ਜਨਮ ਮਿਤੀ ਦਰਜ ਕਰੋ। ਆਧਾਰ ਨਾਲ ਮੇਲ ਖਾਣੀ ਚਾਹੀਦੀ ਹੈ।',
          or: 'ଜନ୍ମ ତାରିଖ ଲିଖନ୍ତୁ। ଆଧାର ସହ ମେଳ ହେବା ଉଚିତ।',
          as: 'জন্ম তাৰিখ লিখক। আধাৰৰ সৈতে মিলিব লাগিব।',
          ur: 'تاریخ پیدائش درج کریں۔ آدھار کارڈ سے مماثل ہونی چاہیے۔',
        },
        exampleValue: '2008-03-15',
      },
      {
        id: 'f3', name: 'permanent_address', label: 'Permanent Residential Address', type: 'textarea', required: true,
        placeholder: 'House No., Street, Village/Town, District, State, PIN',
        explanation: {
          en: 'This is your permanent home address — the place where you officially reside. If your current address is different, still provide your permanent address here.',
          hi: 'यह आपका स्थायी घर का पता है। अगर आपका वर्तमान पता अलग है, तो भी यहाँ अपना स्थायी पता लिखें।',
          mr: 'हा तुमच्या कायमस्वरूपी घराचा पत्ता आहे. तुमचा सध्याचा पत्ता वेगळा असल्यास येथे कायमचा पत्ता भरा.',
          bn: 'এটি আপনার স্থায়ী বাড়ির ঠিকানা। বর্তমান ঠিকানা আলাদা হলেও এখানে স্থায়ী ঠিকানা দিন।',
          ta: 'இது உங்கள் நிரந்தர வீட்டு முகவரி. தற்போதைய முகவரி வேறாக இருந்தாலும் நிரந்தர முகவரி கொடுக்கவும்.',
          te: 'ఇది మీ శాశ్వత నివాస చిరునామా. ప్రస్తుత చిరునామా వేరుగా ఉన్నా ఇక్కడ శాశ్వత చిరునామా రాయండి.',
          gu: 'આ તમારું કાયમી ઘરનું સરનામું છે. વર્તમાન સરનામું અલગ હોય તો પણ અહીં કાયમી સરનામું લખો.',
          kn: 'ಇದು ನಿಮ್ಮ ಶಾಶ್ವತ ಮನೆ ವಿಳಾಸ. ಪ್ರಸ್ತುತ ವಿಳಾಸ ಬೇರೆ ಇದ್ದರೂ ಇಲ್ಲಿ ಶಾಶ್ವತ ವಿಳಾಸ ನಮೂದಿಸಿ.',
          ml: 'ഇത് നിങ്ങളുടെ സ്ഥിര വസതി വിലാസം. നിലവിലെ വിലാസം വ്യത്യസ്തമായിരുന്നാലും ഇവിടെ സ്ഥിര വിലാസം നൽകുക.',
          pa: 'ਇਹ ਤੁਹਾਡਾ ਸਥਾਈ ਘਰ ਦਾ ਪਤਾ ਹੈ। ਮੌਜੂਦਾ ਪਤਾ ਵੱਖਰਾ ਹੋਵੇ ਤਾਂ ਵੀ ਇੱਥੇ ਸਥਾਈ ਪਤਾ ਲਿਖੋ।',
          or: 'ଏହା ଆପଣଙ୍କ ସ୍ଥାୟୀ ଘର ଠିକଣା। ବର୍ତ୍ତମାନ ଠିକଣା ଭିନ୍ନ ହେଲେ ବି ଏଠି ସ୍ଥାୟୀ ଠିକଣା ଲିଖନ୍ତୁ।',
          as: 'এইটো আপোনাৰ স্থায়ী ঘৰৰ ঠিকনা। বৰ্তমান ঠিকনা বেলেগ হ\'লেও ইয়াত স্থায়ী ঠিকনা লিখক।',
          ur: 'یہ آپ کا مستقل گھر کا پتہ ہے۔ موجودہ پتہ مختلف ہو تب بھی یہاں مستقل پتہ لکھیں۔',
        },
        exampleValue: 'House No. 12, Demo Street, Demo Village, Demo District, Maharashtra - 400001',
      },
      {
        id: 'f4', name: 'annual_family_income', label: 'Annual Family Income (₹)', type: 'number', required: true,
        placeholder: 'Enter total annual income in Rupees',
        explanation: {
          en: 'Enter the total income of all earning members of your family in one year, in Indian Rupees (₹). This should match your Income Certificate.',
          hi: 'एक साल में आपके परिवार के सभी कमाने वाले सदस्यों की कुल आय भारतीय रुपयों में भरें। यह आपके आय प्रमाण पत्र से मेल खानी चाहिए।',
          mr: 'एका वर्षात तुमच्या कुटुंबातील सर्व कमावत्या सदस्यांचे एकूण उत्पन्न भारतीय रुपयांत भरा.',
          bn: 'আপনার পরিবারের সকল উপার্জনকারী সদস্যের বার্ষিক মোট আয় ভারতীয় রুপিতে লিখুন।',
          ta: 'குடும்பத்தின் அனைத்து உறுப்பினர்களின் ஆண்டு வருமானத்தை ரூபாயில் உள்ளிடுக.',
          te: 'కుటుంబ సభ్యుల మొత్తం వార్షిక ఆదాయం రూపాయలలో నమోదు చేయండి.',
          gu: 'પરિવારના બધા સભ્યોની કુલ વાર્ષિક આવક રૂપિયામાં ભરો.',
          kn: 'ಕುಟುಂಬದ ಎಲ್ಲ ಸದಸ್ಯರ ವಾರ್ಷಿಕ ಒಟ್ಟು ಆದಾಯ ರೂಪಾಯಿಯಲ್ಲಿ ನಮೂದಿಸಿ.',
          ml: 'കുടുംബത്തിലെ എല്ലാ അംഗങ്ങളുടെ വার്ഷിക മൊത്തം വരുമാനം രൂപയിൽ നൽകുക.',
          pa: 'ਪਰਿਵਾਰ ਦੇ ਸਾਰੇ ਕਮਾਈ ਕਰਨ ਵਾਲੇ ਮੈਂਬਰਾਂ ਦੀ ਸਾਲਾਨਾ ਕੁੱਲ ਆਮਦਨ ਰੁਪਏ ਵਿੱਚ ਭਰੋ।',
          or: 'ପରିବାରର ସମସ୍ତ ଉପାର୍ଜନ ସଦସ୍ୟଙ୍କ ବାର୍ଷିକ ମୋଟ ଆୟ ଟଙ୍କାରେ ଲିଖନ୍ତୁ।',
          as: 'পৰিয়ালৰ সকলো উপাৰ্জনকাৰী সদস্যৰ বাৰ্ষিক মুঠ আয় টকাত লিখক।',
          ur: 'خاندان کے تمام کمانے والے افراد کی سالانہ کل آمدنی روپے میں لکھیں۔',
        },
        exampleValue: '150000',
      },
      {
        id: 'f5', name: 'attested_certificate', label: 'Duly Attested Copy of Mark Sheet', type: 'file', required: true,
        explanation: {
          en: '"Duly attested" means you need a photocopy of your mark sheet that has been signed and stamped by an authorized person (like a gazetted officer, school principal, or notary) to confirm that it is a true copy of the original.',
          hi: '"विधिवत प्रमाणित प्रति" का मतलब है कि अपने अंक पत्र की एक फोटोकॉपी जिस पर किसी अधिकृत व्यक्ति (जैसे राजपत्रित अधिकारी, स्कूल प्रधानाचार्य, या नोटरी) के हस्ताक्षर और मुहर हो, यह प्रमाणित करते हुए कि यह मूल की सच्ची प्रति है।',
          mr: '"विधिवत प्रमाणित प्रत" म्हणजे तुमच्या गुणपत्रिकेची अशी फोटोकॉपी ज्यावर अधिकृत व्यक्तीची (जसे राजपत्रित अधिकारी, मुख्याध्यापक, किंवा नोटरी) सही आणि शिक्का असेल.',
          bn: '"যথাযথ সত্যায়িত কপি" মানে আপনার মার্কশিটের একটি ফটোকপি যেখানে একজন অনুমোদিত ব্যক্তি (যেমন গেজেটেড অফিসার, স্কুল প্রধান) স্বাক্ষর ও সিল দিয়ে প্রমাণ করেছেন যে এটি আসলের সত্য কপি।',
          ta: '"முறையாக சான்றளிக்கப்பட்ட நகல்" என்பது ஒரு அதிகாரப்பூர்வ நபர் கையொப்பமிட்டு இது அசல் நகல் என்று உறுதிப்படுத்திய மார்க்ஷீட் நகல்.',
          te: '"యథోచితంగా ధృవీకరించిన కాపీ" అంటే అధికారిక వ్యక్తి (గెజిటెడ్ ఆఫీసర్) సంతకం మరియు స్టాంప్ వేసిన మార్క్ షీట్ నకలు.',
          gu: '"વિધિવત પ્રમાણિત નકલ" એટલે ગ્રેજ્યુએટ ઓફિસર, શાળા આચાર્ય કે નોટરી દ્વારા સહી-સ્ટેમ્પ કરેલ ગુણ-પ્રત.',
          kn: '"ಸರಿಯಾಗಿ ದೃಢೀಕರಿಸಿದ ನಕಲು" ಎಂದರೆ ಅಧಿಕೃತ ವ್ಯಕ್ತಿ ಸಹಿ ಮತ್ತು ಮುದ್ರೆ ಹಾಕಿದ ಅಂಕ ಪಟ್ಟಿ ನಕಲು.',
          ml: '"ക്രമമായി സാക്ഷ്യപ്പെടുത്തിയ കോപ്പി" എന്നത് ഒരു അധികൃത വ്യക്തി ഒപ്പിട്ട് മുദ്ര ചെട്ട് ഒറിജിനലിന്റെ യഥാർഥ പകർപ്പ് ആണെന്ന് ഉറപ്പ് ചെയ്ത മാർക്ക് ഷീറ്റ് കോപ്പി.',
          pa: '"ਵਿਧੀਵਤ ਪ੍ਰਮਾਣਿਤ ਕਾਪੀ" ਮਤਲਬ ਹੈ ਕਿ ਕਿਸੇ ਅਧਿਕਾਰਤ ਵਿਅਕਤੀ ਦੇ ਦਸਤਖਤ ਅਤੇ ਮੋਹਰ ਵਾਲੀ ਮਾਰਕਸ਼ੀਟ ਦੀ ਕਾਪੀ।',
          or: '"ଯଥାଯଥ ସ୍ଵୀକୃତ ପ୍ରତି" ମାନେ ଅଧିକୃତ ବ୍ୟକ୍ତି ସ୍ଵାକ୍ଷର ଓ ସ୍ଵୀକୃତ ଶ୍ରେଣୀ ପ୍ରଶ୍ନ-ପ୍ରତ।',
          as: '"যথাযথ প্ৰমাণিত প্ৰতিলিপি" মানে হ\'ল এজন অনুমোদিত ব্যক্তিৰ স্বাক্ষৰ আৰু চিল থকা নম্বৰ পত্ৰৰ প্ৰতিলিপি।',
          ur: '"درست طریقے سے تصدیق شدہ نقل" کا مطلب ہے ایک مجاز شخص کے دستخط اور مہر کے ساتھ مارکشیٹ کی کاپی۔',
        },
      },
      {
        id: 'f6', name: 'phone', label: 'Mobile Phone Number', type: 'text', required: true,
        placeholder: '10-digit mobile number',
        explanation: {
          en: 'Enter your 10-digit mobile phone number. This will be used for all communications regarding your scholarship application.',
          hi: 'अपना 10 अंकों का मोबाइल नंबर डालें। इसका उपयोग आपकी छात्रवृत्ति आवेदन से संबंधित सभी संचार के लिए किया जाएगा।',
          mr: 'तुमचा 10 अंकी मोबाइल नंबर टाका. शिष्यवृत्ती अर्जाशी संबंधित सर्व संपर्कासाठी हा वापरला जाईल.',
          bn: 'আপনার ১০ সংখ্যার মোবাইল নম্বর দিন। বৃত্তি আবেদন সংক্রান্ত সকল যোগাযোগে এটি ব্যবহার হবে।',
          ta: '10 இலக்க மொபைல் எண் உள்ளிடுக. உதவித்தொகை விண்ணப்பத்தில் தொடர்புக்கு பயன்படும்.',
          te: '10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి.',
          gu: '10 અંકનો મોબાઇલ નંબર દાખલ કરો.',
          kn: '10 ಅಂಕಿ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ.',
          ml: '10 അക്ക മൊബൈൽ നമ്പർ നൽകുക.',
          pa: '10 ਅੰਕਾਂ ਦਾ ਮੋਬਾਈਲ ਨੰਬਰ ਦਰਜ ਕਰੋ।',
          or: '10 ଅଙ୍କ ମୋବାଇଲ ନମ୍ବର ଲିଖନ୍ତୁ।',
          as: '10 সংখ্যাৰ মোবাইল নম্বৰ লিখক।',
          ur: '10 ہندسوں کا موبائل نمبر درج کریں۔',
        },
        exampleValue: '9876543210',
      },
      {
        id: 'f7', name: 'bank_account', label: 'Bank Account Number', type: 'text', required: true,
        placeholder: 'Enter bank account number',
        explanation: {
          en: 'Enter the bank account number where you want to receive the scholarship amount. Make sure it is an active account in your name.',
          hi: 'वह बैंक खाता नंबर डालें जिसमें आप छात्रवृत्ति राशि पाना चाहते हैं। सुनिश्चित करें कि यह आपके नाम का सक्रिय खाता है।',
          mr: 'ज्या बँक खात्यात शिष्यवृत्ती रक्कम मिळवायची आहे ते खाते क्रमांक टाका.',
          bn: 'যে ব্যাংক অ্যাকাউন্টে বৃত্তির টাকা পেতে চান সেটির নম্বর দিন।',
          ta: 'உதவித்தொகை பெற விரும்பும் வங்கி கணக்கு எண் உள்ளிடுக.',
          te: 'స్కాలర్‌షిప్ మొత్తం పొందాలనుకునే బ్యాంక్ అకౌంట్ నంబర్ నమోదు చేయండి.',
          gu: 'શિષ્યવૃત્તિ રકમ મેળવવા ઇચ્છતા ખાતાનો નંબર ભરો.',
          kn: 'ವಿದ್ಯಾರ್ಥಿ ವೇತನ ಪಡೆಯಲು ಬ್ಯಾಂಕ್ ಖಾತೆ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ.',
          ml: 'സ്കോളർഷിപ്പ് തുക ലഭിക്കാൻ ആഗ്രഹിക്കുന്ന ബാങ്ക് അക്കൗണ്ട് നമ്പർ നൽകുക.',
          pa: 'ਸਕਾਲਰਸ਼ਿਪ ਰਾਸ਼ੀ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਬੈਂਕ ਖਾਤਾ ਨੰਬਰ ਦਰਜ ਕਰੋ।',
          or: 'ବୃତ୍ତି ରାଶି ପ୍ରାପ୍ତ କରିବା ପାଇଁ ବ୍ୟାଙ୍କ ଖାତା ନମ୍ବର ଲିଖନ୍ତୁ।',
          as: 'বৃত্তিৰ পৰিমাণ পাবলৈ বেংক একাউণ্ট নম্বৰ লিখক।',
          ur: 'وظیفے کی رقم وصول کرنے کے لیے بینک اکاؤنٹ نمبر درج کریں۔',
        },
        exampleValue: '1234567890123',
      },
    ],
  },
  {
    id: 'FORM-002',
    title: 'Disaster Relief Assistance Application',
    source: 'State Disaster Management Authority (Demo)',
    sourceAuthority: 'Demo SDMA Relief Cell',
    description: 'Application for financial and material assistance for those affected by natural disasters.',
    purpose: 'To provide timely relief and compensation to citizens affected by floods, cyclones, earthquakes, or other natural disasters.',
    requiredDocuments: [
      { id: 'doc-1', name: 'Proof of Loss / Damage Report', description: 'Survey report from local authority confirming damage to property.', mandatory: true },
      { id: 'doc-2', name: 'Aadhaar Card', description: 'Identity proof.', mandatory: true },
      { id: 'doc-3', name: 'Bank Passbook (Copy)', description: 'Bank account for direct benefit transfer.', mandatory: true },
      { id: 'doc-4', name: 'Photograph of Damage', description: 'Recent photograph showing damage to home/property.', mandatory: false },
    ],
    fields: [
      { id: 'r1', name: 'applicant_name', label: 'Applicant Full Name', type: 'text', required: true, explanation: { en: 'Your full name as the applicant seeking relief.', hi: 'राहत के लिए आवेदन करने वाले व्यक्ति का पूरा नाम।', mr: 'मदतीसाठी अर्ज करणाऱ्या व्यक्तीचे पूर्ण नाव.', bn: 'সাহায্যের জন্য আবেদনকারীর পূর্ণ নাম।', ta: 'நிவாரணம் கோரும் விண்ணப்பதாரர் பெயர்.', te: 'సహాయం కోసం దరఖాస్తు చేసుకునే వ్యక్తి పూర్తి పేరు.', gu: 'રાહત માટે અરજી કરતા વ્યક્તિનું પૂરું નામ.', kn: 'ಪರಿಹಾರಕ್ಕಾಗಿ ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ವ್ಯಕ್ತಿಯ ಪೂರ್ಣ ಹೆಸರು.', ml: 'ദുരിതാശ്വാസം തേടുന്ന ആൾ പൂർണ്ണ പേര്.', pa: 'ਰਾਹਤ ਲਈ ਅਰਜ਼ੀ ਦੇਣ ਵਾਲੇ ਵਿਅਕਤੀ ਦਾ ਪੂਰਾ ਨਾਮ।', or: 'ସାହାଯ୍ୟ ଆବେଦନ କର୍ତ୍ତା ଙ୍କ ପୂର୍ଣ ନାମ।', as: 'সাহায্যৰ বাবে আবেদন কৰা ব্যক্তিৰ সম্পূৰ্ণ নাম।', ur: 'امداد کے لیے درخواست دینے والے کا پورا نام۔' }, exampleValue: 'Suresh Patel' },
      { id: 'r2', name: 'disaster_type', label: 'Type of Disaster', type: 'select', required: true, options: ['Flood', 'Cyclone', 'Earthquake', 'Drought', 'Landslide', 'Other'], explanation: { en: 'Select the type of natural disaster that affected you.', hi: 'उस प्राकृतिक आपदा का प्रकार चुनें जिससे आप प्रभावित हुए हैं।', mr: 'तुम्हाला प्रभावित करणाऱ्या नैसर्गिक आपत्तीचा प्रकार निवडा.', bn: 'আপনাকে ক্ষতিগ্রস্ত করা প্রাকৃতিক দুর্যোগের ধরন বেছে নিন।', ta: 'பாதித்த இயற்கை பேரிடரின் வகையை தேர்ந்தெடுக்கவும்.', te: 'మిమ్మల్ని ప్రభావితం చేసిన విపత్తు రకం ఎంచుకోండి.', gu: 'અસર કરેલ કુદરતી આફત પ્રકાર પસંદ કરો.', kn: 'ನಿಮ್ಮನ್ನು ಬಾಧಿಸಿದ ಪ್ರಕೃತಿ ವಿಕೋಪ ವಿಧ ಆಯ್ಕೆ ಮಾಡಿ.', ml: 'ബാധിക്കപ്പെട്ട പ്രകൃതി ദുരന്ത തരം തിരഞ്ഞെടുക്കുക.', pa: 'ਪ੍ਰਭਾਵਿਤ ਕੁਦਰਤੀ ਆਫਤ ਦੀ ਕਿਸਮ ਚੁਣੋ।', or: 'ପ୍ରଭାବିତ ପ୍ରାକୃତିକ ବିପଦ ପ୍ରକାର ବାଛନ୍ତୁ।', as: 'প্ৰভাবিত প্ৰাকৃতিক দুৰ্যোগৰ ধৰণ বাছক।', ur: 'متاثرہ قدرتی آفت کی قسم منتخب کریں۔' } },
      { id: 'r3', name: 'damage_description', label: 'Description of Damage / Loss', type: 'textarea', required: true, placeholder: 'Describe the damage to your home, crops, livestock, or property', explanation: { en: 'Describe in detail the damage or loss you have suffered due to the disaster. Include information about your house, crops, livestock, or any other property affected.', hi: 'आपदा से हुए नुकसान का विस्तार से वर्णन करें। घर, फसल, पशु या किसी अन्य संपत्ति की जानकारी शामिल करें।', mr: 'आपत्तीमुळे झालेल्या नुकसानाचे तपशील लिहा.', bn: 'দুর্যোগে হওয়া ক্ষতির বিস্তারিত বিবরণ দিন।', ta: 'பேரிடரால் ஏற்பட்ட சேதத்தை விரிவாக விவரிக்கவும்.', te: 'విపత్తు వల్ల జరిగిన నష్టాన్ని వివరంగా రాయండి.', gu: 'આફતથી થયેલ નુકસાનની વિગત લખો.', kn: 'ವಿಪತ್ತಿನಿಂದ ಆದ ಹಾನಿಯ ವಿವರ ಬರೆಯಿರಿ.', ml: 'ദുരന്തത്തിൽ ഉണ്ടായ നഷ്ടം വിശദമായി എഴുതുക.', pa: 'ਆਫਤ ਤੋਂ ਹੋਏ ਨੁਕਸਾਨ ਦੀ ਵਿਸਥਾਰ ਵਿੱਚ ਜਾਣਕਾਰੀ ਦਿਓ।', or: 'ବିପଦ ଦ୍ୱାରା ହୋଇଥିବା ନଷ୍ଟ ବିବରଣ ଲିଖନ୍ତୁ।', as: 'দুৰ্যোগত হোৱা ক্ষতিৰ বিৱৰণ লিখক।', ur: 'آفت سے ہونے والے نقصان کی تفصیل لکھیں۔' } },
    ],
  },
  {
    id: 'FORM-003',
    title: 'Government Service Request Form',
    source: 'Department of Administrative Services (Demo)',
    sourceAuthority: 'Demo e-District Portal',
    description: 'Generic service request form for various government administrative services.',
    purpose: 'To request certificates, permissions, or services from government departments.',
    requiredDocuments: [
      { id: 'doc-1', name: 'Proof of Identity', description: 'Aadhaar Card / Voter ID / Passport.', mandatory: true },
      { id: 'doc-2', name: 'Proof of Residence', description: 'Utility bill, Ration Card, or any address proof not older than 3 months.', mandatory: true },
      { id: 'doc-3', name: 'Supporting Documents', description: 'Any additional documents relevant to the specific service.', mandatory: false },
    ],
    fields: [
      { id: 's1', name: 'service_type', label: 'Service Requested', type: 'select', required: true, options: ['Domicile Certificate', 'Income Certificate', 'Caste Certificate', 'Birth Certificate', 'Death Certificate', 'NOC (No Objection Certificate)', 'Other'], explanation: { en: 'Select the type of government document or service you are applying for.', hi: 'उस सरकारी दस्तावेज़ या सेवा का प्रकार चुनें जिसके लिए आवेदन कर रहे हैं।', mr: 'तुम्ही ज्या सरकारी दस्तऐवज किंवा सेवेसाठी अर्ज करत आहात ते निवडा.', bn: 'আপনি যে সরকারি নথি বা সেবার জন্য আবেদন করছেন তার ধরন নির্বাচন করুন।', ta: 'விண்ணப்பிக்கும் அரசு ஆவணம் அல்லது சேவையை தேர்ந்தெடுக்கவும்.', te: 'దరఖాస్తు చేసే ప్రభుత్వ సేవ లేదా పత్రం ఎంచుకోండి.', gu: 'અরજ કરતી સરકારી સેવા/દstálifavaz પ્રકાર પસંદ કરો.', kn: 'ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಸರ್ಕಾರಿ ಸೇವೆ/ದಾಖಲೆ ಆಯ್ಕೆ ಮಾಡಿ.', ml: 'അപേക്ഷ ഫയൽ ചെയ്യുന്ന സർക്കാർ സേവനം/രേഖ തിരഞ്ഞെടുക്കുക.', pa: 'ਜਿਸ ਸਰਕਾਰੀ ਸੇਵਾ/ਦਸਤਾਵੇਜ਼ ਲਈ ਅਰਜ਼ੀ ਦਿੱਤੀ ਹੈ ਉਹ ਚੁਣੋ।', or: 'ଆବେଦନ କରୁଥିବା ସରକାରୀ ସେବା/ଦଲିଲ ଚୟନ କରନ୍ତୁ।', as: 'আবেদন কৰা চৰকাৰী সেৱা/নথি বাছক।', ur: 'جس سرکاری سروس/دستاویز کے لیے درخواست دی ہے وہ منتخب کریں۔' } },
      { id: 's2', name: 'purpose_statement', label: 'Purpose / Reason for Application', type: 'textarea', required: true, placeholder: 'Briefly explain why you need this service/certificate', explanation: { en: 'Briefly explain why you need this certificate or service. For example: "Required for school admission", "Needed for job application", etc.', hi: 'संक्षेप में बताएं कि आपको इस प्रमाण पत्र या सेवा की आवश्यकता क्यों है। उदाहरण: "स्कूल प्रवेश के लिए आवश्यक", "नौकरी आवेदन के लिए जरूरी", आदि।', mr: 'या प्रमाणपत्र/सेवेची आवश्यकता का आहे ते थोडक्यात सांगा.', bn: 'কেন এই সনদ/সেবা প্রয়োজন সংক্ষেপে বলুন।', ta: 'ஏன் இந்த சான்றிதழ்/சேவை தேவை என சுருக்கமாக கூறுக.', te: 'ఈ సర్టిఫికేట్/సేవ ఎందుకు అవసరమో సంక్షిప్తంగా చెప్పండి.', gu: 'આ સેવા/પ્રમાણ-પત્ર ઇ-mail-ik શા કારણ? સંક્ષેપ.', kn: 'ಈ ಸೇವೆ/ಪ್ರಮಾಣ ಪತ್ರ ಯಾಕೆ ಬೇಕು ಸಂಕ್ಷಿಪ್ತವಾಗಿ ತಿಳಿಸಿ.', ml: 'ഈ സേവനം/സർട്ടിഫിക്കേറ്റ് എന്തിന് ആവശ്യമെന്ന് ചുരുക്കി പറയുക.', pa: 'ਇਸ ਸੇਵਾ/ਸਰਟੀਫਿਕੇਟ ਦੀ ਲੋੜ ਕਿਉਂ ਹੈ ਸੰਖੇਪ ਵਿੱਚ ਦੱਸੋ।', or: 'ଏହି ସେବା/ଦଲିଲ ର ଆବଶ୍ୟକତ ସଂକ୍ଷେପ ଉ ଲ୍ ଲ ।', as: 'এই সেৱা/প্ৰমাণপত্ৰৰ প্ৰয়োজনীয়তা সংক্ষেপে বুজাওক।', ur: 'اس سروس/سرٹیفکیٹ کی ضرورت کیوں ہے مختصراً بتائیں۔' } },
    ],
  },
];
