// IT23367326_generate_excel.js
// Purpose: Generate Excel test cases file (ONE-TIME / MANUAL RUN)

const XLSX = require('xlsx');
const path = require('path');

// 🔹 Leave expected / actual empty for Functional tests – fill later
const testCases = [
  
  {
    "TC ID": "Pos_Fun_0001",
    "Test case name": "Convert a short interrogative phrase",
    "Input length type": "S",
    "Input": "oyaagee adhahasa mokakdha?",
    "Expected output": "ඔයාගේ අදහස මොකක්ද?",
    "Actual output": "ඔයාගේ අදහස මොකක්ද?",
    "Status": "Pass",
    "Accuracy justification / Description": "correctly converts simple interrogative for opinion. Preserves spelling, grammar, and punctuation in Sinhala",
    "What is covered by the test": "Greeting / request / response; Interrogative (question); S (≤30 characters); Accuracy validation"
  },
  {
    "TC ID": "Pos_Fun_0002",
    "Test case name": "Convert a short daily phrase",
    "Input length type": "S",
    "Input": "mama passe call ekak dhennam.",
    "Expected output": "මම පස්සෙ call එකක් දෙන්නම්.",
    "Actual output": "මම පස්සෙ call එකක් දෙන්නම්.",
    "Status": "Pass",
    "Accuracy justification / Description": "The sentence is short and clean so no formatting or robustness issues are observed. The intended meaning 'I will call later' is correctly preserved.",
    "What is covered by the test": "Mixed Singlish + English; Future tense; S (≤30 characters); Accuracy validation"
  },
  {
    "TC ID": "Pos_Fun_0003",
    "Test case name": "Convert a short daily phrase with waiting meaning",
    "Input length type": "S",
    "Input": "mama enakan poddak inna.",
    "Expected output": "මම එනකන් පොඩ්ඩක් ඉන්න.",
    "Actual output": "මම එනකන් පොඩ්ඩක් ඉන්න.",
    "Status": "Pass",
    "Accuracy justification / Description": "Output matches the expected result exactly. Short and clean input, no formatting or robustness issues observed.",
    "What is covered by the test": "Daily language usage; Future tense; S (≤30 characters); Accuracy validation"
  },
  {
    "TC ID": "Pos_Fun_0004",
    "Test case name": "Convert a short negative statement about a task",
    "Input length type": "S",
    "Input": "ee vaedee hari giye naee",
    "Expected output": "ඒ වැඩේ හරි ගියෙ නෑ.",
    "Actual output": "ඒ වැඩේ හරි ගියෙ නෑ",
    "Status": "Pass",
    "Accuracy justification / Description": "Sinhala output appears in real-time conversion. Output updates correctly as the user types.",
    "What is covered by the test": "Daily language usage; Negation (negative form); S (≤30 characters); Accuracy validation"
  },
  {
    "TC ID": "Pos_Fun_0005",
    "Test case name": "Convert short positive casual/slang sentence",
    "Input length type": "S",
    "Input": "man gedhara yanavaa",
    "Expected output": "වැඩේ සුපිරියටම කරල තියෙනවා!",
    "Actual output": "වැඩේ සුපිරියටම කරල තියෙනවා!",
    "Status": "Pass",
    "Accuracy justification / Description": "Informal/slang expression 'supiriyatama' is properly converted. The system correctly converts while preserving meaning.",
    "What is covered by the test": "Slang / informal language; Present sentence; S (≤30 characters); Accuracy validation"
  },
  {
    "TC ID": "Pos_Fun_0006",
    "Test case name": "Convert short request with currency and number",
    "Input length type": "S",
    "Input": "mee Rs. 500 maaru karalaa dhennakoo.",
    "Expected output": "මේ Rs. 500 මාරු කරලා දෙන්නකෝ.",
    "Actual output": "මේ Rs. 500 මාරු කරලා දෙන්නකෝ.",
    "Status": "Pass",
    "Accuracy justification / Description": "The currency value and number format (Rs. 500) are accurately handled. Imperative/request tone is maintained correctly.",
    "What is covered by the test": "Punctuation / numbers; Imperative (command); S (≤30 characters); Accuracy validation"
  },
  {
    "TC ID": "Pos_Fun_0007",
    "Test case name": "Convert short mixed language request sentence",
    "Input length type": "S",
    "Input": "WiFi password eka dhennako.",
    "Expected output": "WiFi password එක දෙන්නකො.",
    "Actual output": "WiFi password එක දෙන්නකො.",
    "Status": "Pass",
    "Accuracy justification / Description": "The system accurately converts the mixed Singlish sentence into Sinhala while maintaining the original request intent.",
    "What is covered by the test": "Mixed Singlish + English; Imperative (command); S (≤30 characters); Accuracy validation"
  },
  {
    "TC ID": "Pos_Fun_0008",
    "Test case name": "Convert short confirmation response sentence",
    "Input length type": "S",
    "Input": "hari hari, apita theeruNaa.",
    "Expected output": "හරි හරි, අපිට තේරුණා.",
    "Actual output": "හරි හරි, අපිට තේරුණා.",
    "Status": "Pass",
    "Accuracy justification / Description": "Repetition used for emphasis ('hari hari') is accurately reflected. Past tense structure is maintained correctly.",
    "What is covered by the test": "Word combination / phrase pattern; Past sentence; S (≤30 characters); Accuracy validation"
  },
  {
    "TC ID": "Pos_Fun_0009",
    "Test case name": "Convert medium length mixed language polite request",
    "Input length type": "M",
    "Input": "karuNaakaralaa mata document tika attach karala email ekak evanna puLuvandha?",
    "Expected output": "කරුණාකරලා මට document ටික attach කරල email එකක් එවන්න පුළුවන්ද?",
    "Actual output": "කරුණාකරලා මට document ටික attach කරල email එකක් එවන්න පුළුවන්ද?",
    "Status": "Pass",
    "Accuracy justification / Description": "English technical/brand terms are retained and readable. System preserves polite tone and interrogative form.",
    "What is covered by the test": "Mixed Singlish + English; Interrogative (question); M (31–299 characters); Accuracy validation"
  },
  {
    "TC ID": "Pos_Fun_0010",
    "Test case name": "Convert medium length daily usage sentence",
    "Input length type": "M",
    "Input": "Mama adha office ivara vela bus eeke yanna hithan inne, poddak parakku veyi yanakota. havasta maara traffic ne.",
    "Expected output": "මම අද office ඉවර වෙල bus ඒකෙ යන්න හිතන් ඉන්නේ, පොඩ්ඩක් පරක්කු වෙයි යනකොට. හවස්ට මාර traffic නේ.",
    "Actual output": "මම අද office ඉවර වෙල bus ඒකෙ යන්න හිතන් ඉන්නේ, පොඩ්ඩක් පරක්කු වෙයි යනකොට. හවස්ට මාර traffic නේ.",
    "Status": "Pass",
    "Accuracy justification / Description": "Meaning of the sentence (travel context) is preserved. Proper nouns and English words remain readable.",
    "What is covered by the test": "Mixed Singlish + English; Complex sentence; M (31–299 characters); Accuracy validation"
  },
  {
    "TC ID": "Pos_Fun_0011",
    "Test case name": "Convert medium length mixed language compound sentence (request + explanation)",
    "Input length type": "M",
    "Input": "Please mata meeka poddak hariyata kiyala dhenna, mama dhaen dhethun paarak try karaa hari giye naee , mata eeka therum ganna amaruyi.",
    "Expected output": "Please මට මේක පොඩ්ඩක් හරියට කියල දෙන්න, මම දැන් දෙතුන් පාරක් try කරා හරි ගියෙ නෑ , මට ඒක තෙරුම් ගන්න අමරුයි.",
    "Actual output": "Please මට මේක පොඩ්ඩක් හරියට කියල දෙන්න, මම දැන් දෙතුන් පාරක් try කරා හරි ගියෙ නෑ , මට ඒක තෙරුම් ගන්න අමරුයි.",
    "Status": "Pass",
    "Accuracy justification / Description": "Request meaning is clearly preserved. Compound sentence structure is maintained. English word 'please' is retained appropriately.",
    "What is covered by the test": "Mixed Singlish + English; Compound sentence; M (31–299 characters); Accuracy validation"
  },
  {
    "TC ID": "Pos_Fun_0012",
    "Test case name": "Convert medium length mixed language compound sentence",
    "Input length type": "M",
    "Input": "dhaen kathaa karanna vidhiyak nae machan mama Zoom meeting ekaka innee , meka ivara vela call ekk dhennam.",
    "Expected output": "දැන් කතා කරන්න විදියක් නැ මචන් මම Zoom meeting එකක ඉන්නේ , මෙක ඉවර වෙල call එක්ක් දෙන්නම්.",
    "Actual output": "දැන් කතා කරන්න විදියක් නැ මචන් මම Zoom meeting එකක ඉන්නේ , මෙක ඉවර වෙල call එක්ක් දෙන්නම්.",
    "Status": "",
    "Accuracy justification / Description": "System handles mixed language input properly. Technical/English words are kept intact. Compound sentence is clear and readable.",
    "What is covered by the test": "Mixed Singlish + English; Compound sentence; M (31–299 characters); Accuracy validation"
  },
  {
    "TC ID": "Pos_Fun_0013",
    "Test case name": "Convert medium length numeric/punctuation sentence",
    "Input length type": "M",
    "Input": "mee packet ekee 500g yak thiyenavaa kiyalaa leabal ekee liyalaa thiyenavaa. gaana Rs. 2500 yayi.ee gaanata padu nae haebaeyi .",
    "Expected output": "මේ packet එකේ 500g යක් තියෙනවා කියලා ලේබල් එකේ ලියලා තියෙනවා. ගාන Rs. 2500 යයි.ඒ ගානට පඩු නැ හැබැයි .",
    "Actual output": "මේ packet එකේ 500g යක් තියෙනවා කියලා ලේබල් එකේ ලියලා තියෙනවා. ගාන Rs. 2500 යයි.ඒ ගානට පඩු නැ හැබැයි .",
    "Status": "Pass",
    "Accuracy justification / Description": "Units (500g) and currency (Rs. 2500) are retained and correctly formatted. The system correctly converts Singlish content into Sinhala.",
    "What is covered by the test": "Punctuation / numbers; Complex sentence; M (31–299 characters); Accuracy validation"
  },
  {
    "TC ID": "Pos_Fun_0014",
    "Test case name": "Convert medium length conversational compound sentence",
    "Input length type": "M",
    "Input": "oyaa kavadhdha enna hithan innee? heta enavaanadha? mata hariyatama balalaa kiyanna, mama oyaava ekkan yanna ennam.",
    "Expected output": "ඔයා කවද්ද එන්න හිතන් ඉන්නේ? හෙට එනවානද? මට හරියටම බලලා කියන්න, මම ඔයාව එක්කන් යන්න එන්නම්.",
    "Actual output": "ඔයා කවද්ද එන්න හිතන් ඉන්නේ? හෙට එනවානද? මට හරියටම බලලා කියන්න, මම ඔයාව එක්කන් යන්න එන්නම්.",
    "Status": "Pass",
    "Accuracy justification / Description": "Multiple questions in the input are accurately preserved in the output. Punctuation and sentence flow are correct.",
    "What is covered by the test": "Greeting / request / response; Interrogative (question); M (31–299 characters); Accuracy validation"
  },
  {
    "TC ID": "Pos_Fun_0015",
    "Test case name": "Convert medium length numeric/date sentence",
    "Input length type": "M",
    "Input": "api exam eka 2026-05-21 thiyenavaa kiyalaa sarta kiyalaa thiyenne . eeka nisaa edata lectures thiyana ekak naee .",
    "Expected output": "අපි exam එක 2026-05-21 තියෙනවා කියලා සර්ට කියලා තියෙන්නෙ . ඒක නිසා එදාට lectures තියන එකක් නෑ .",
    "Actual output": "අපි exam එක 2026-05-21 තියෙනවා කියලා සර්ට කියලා තියෙන්නෙ . ඒක නිසා එදාට lectures තියන එකක් නෑ .",
    "Status": "Pass",
    "Accuracy justification / Description": "Date format and numeric values (2026-05-21) are retained. Complex sentence structure with reason clause is preserved.",
    "What is covered by the test": "Punctuation / numbers; Complex sentence; M (31–299 characters); Accuracy validation"
  },
  {
    "TC ID": "Pos_Fun_0016",
    "Test case name": "Convert medium length conversation with question",
    "Input length type": "M",
    "Input": "heta mama colombo yanna hithan inne . tikak udheema yanna ooni vaeda godak thiyenavaa karaganna. kasun dhaval velaa enavaa kivvaa , havasata movie ekak balanna yanna inne api. oyath enavadha yanna?",
    "Expected output": "හෙට මම colombo යන්න හිතන් ඉන්නේ . ටිකක් උදේම යන්න ඕනි වැඩ ගොඩක් තියෙනවා කරගන්න. කසුන් දවල් වෙලා එනවා කිව්වා , හවසට movie එකක් බලන්න යන්න ඉන්නේ අපි. ඔයත් එනවද යන්න?",
    "Actual output": "හෙට මම colombo යන්න හිතන් ඉන්නේ . ටිකක් උදේම යන්න ඕනි වැඩ ගොඩක් තියෙනවා කරගන්න. කසුන් දවල් වෙලා එනවා කිව්වා , හවසට movie එකක් බලන්න යන්න ඉන්නේ අපි. ඔයත් එනවද යන්න?",
    "Status": "Pass",
    "Accuracy justification / Description": "Names and place words are retained accurately. Interrogative question is maintained with proper punctuation.",
    "What is covered by the test": "Names / places / common English words; Interrogative (question); M (31–299 characters); Accuracy validation"
  },
  {
    "TC ID": "Pos_Fun_0017",
    "Test case name": "Convert long multiline daily schedule preserves formatting",
    "Input length type": "L",
    // "Input": "heta udhee 8.30 AM api pitath vemu. <br>10.30 AM venakota apita gaallata yanna puluvan veyi. <br>iitapasse api galu kotuvata gihin poddak aevidhalaa poto tikak aragamu. <br>iita passe udheeta kaala ehema muhudhata bahimu. <br>havas venakan apita vinoodha venna puLuvan.<br>havasta cafe ekakata gihin coffee bomu. <br>ehen 6.00 PM pitath unan hodhatama aethi. <br>oninam apita raee kaeema aragenama enna puluvan. <br>kattiya kaemathi vidhiyata katha karalaa balalaa karamu<br>godak raeevenna kalin apita gedhara enna puLuvan.",
    // "Expected output": "හෙට උදේ 8.30 AM අපි පිටත් වෙමු. <br>10.30 AM වෙනකොට අපිට ගාල්ලට යන්න පුලුවන් වෙයි. <br>ඊටපස්සෙ අපි ගලු කොටුවට ගිහින් පොඩ්ඩක් ඇවිදලා පොටො ටිකක් අරගමු. <br>ඊට පස්සෙ උදේට කාල එහෙම මුහුදට බහිමු. <br>හවස් වෙනකන් අපිට විනෝද වෙන්න පුළුවන්.<br>හවස්ට cafe එකකට ගිහින් coffee බොමු. <br>එහෙන් 6.00 PM පිටත් උනන් හොදටම ඇති. <br>ඔනිනම් අපිට රෑ කෑම අරගෙනම එන්න පුලුවන්. <br>කට්ටිය කැමති විදියට කත කරලා බලලා කරමු<br>ගොඩක් රෑවෙන්න කලින් අපිට ගෙදර එන්න පුළුවන්.",
    // "Actual output": "හෙට උදේ 8.30 AM අපි පිටත් වෙමු. <br>10.30 AM වෙනකොට අපිට ගාල්ලට යන්න පුලුවන් වෙයි. <br>ඊටපස්සෙ අපි ගලු කොටුවට ගිහින් පොඩ්ඩක් ඇවිදලා පොටො ටිකක් අරගමු. <br>ඊට පස්සෙ උදේට කාල එහෙම මුහුදට බහිමු. <br>හවස් වෙනකන් අපිට විනෝද වෙන්න පුළුවන්<br>හවස්ට cafe එකකට ගිහින් coffee බොමු. <br>එහෙන් 6.00 PM පිටත් උනන් හොදටම ඇති. <br>ඔනිනම් අපිට රෑ කෑම අරගෙනම එන්න පුලුවන්. <br>කට්ටිය කැමති විදියට කත කරලා බලලා කරමු<br>ගොඩක් රෑවෙන්න කලින් අපිට ගෙදර එන්න පුළුවන්.",
    //
   "Input": `heta udhee 8.30 AM api pitath vemu.
            10.30 AM venakota apita gaallata yanna puluvan veyi.
            iitapasse api galu kotuvata gihin poddak aevidhalaa potoo tikak aragamu.
            iita passe udheeta kaala ehema muhudhata bahimu.
            havas venakan apita vinoodha venna puLuvan.
            havasta cafe ekakata gihin coffee bomu.
            ehen 6.00 PM pitath unan hodhatama aethi.
            oninam apita raee kaeema aragenama enna puluvan.
            kattiya kaemathi vidhiyata kathaa karalaa balalaa karamu.
            godak raeevenna kalin apita gedhara enna puluvan.`,
      "Expected output": `හෙට උදේ 8.30 AM අපි පිටත් වෙමු.
                          10.30 AM වෙනකොට අපිට ගාල්ලට යන්න පුලුවන් වෙයි.
                          ඊටපස්සෙ අපි ගලු කොටුවට ගිහින් පොඩ්ඩක් ඇවිදලා පොටෝ ටිකක් අරගමු.
                          ඊට පස්සෙ උදේට කාල එහෙම මුහුදට බහිමු.
                          හවස් වෙනකන් අපිට විනෝද වෙන්න පුළුවන්.
                          හවස්ට cafe එකකට ගිහින් coffee බොමු.
                          එහෙන් 6.00 PM පිටත් උනන් හොදටම ඇති.
                          ඔනිනම් අපිට රෑ කෑම අරගෙනම එන්න පුලුවන්.
                          කට්ටිය කැමති විදියට කතා කරලා බලලා කරමු.
                          ගොඩක් රෑවෙන්න කලින් අපිට ගෙදර එන්න පුලුවන්.`,
    "Actual output": `හෙට උදේ 8.30 AM අපි පිටත් වෙමු.
                      10.30 AM වෙනකොට අපිට ගාල්ලට යන්න පුලුවන් වෙයි.
                      ඊටපස්සෙ අපි ගලු කොටුවට ගිහින් පොඩ්ඩක් ඇවිදලා පොටෝ ටිකක් අරගමු.
                      ඊට පස්සෙ උදේට කාල එහෙම මුහුදට බහිමු.
                      හවස් වෙනකන් අපිට විනෝද වෙන්න පුළුවන්.
                      හවස්ට cafe එකකට ගිහින් coffee බොමු.
                      එහෙන් 6.00 PM පිටත් උනන් හොදටම ඇති.
                      ඔනිනම් අපිට රෑ කෑම අරගෙනම එන්න පුලුවන්.
                      කට්ටිය කැමති විදියට කතා කරලා බලලා කරමු.
                      ගොඩක් රෑවෙන්න කලින් අපිට ගෙදර එන්න පුලුවන්.`,
    "Status": "Pass",
    "Accuracy justification / Description": "The system correctly preserves multi-line spacing and paragraph formatting. Present tense meaning is maintained throughout.",
    "What is covered by the test": "Formatting (spaces / line breaks / paragraph); Present tense; L (≥300 characters); Formatting preservation"
  },
  {
    "TC ID": "Pos_Fun_0018",
    "Test case name": "Convert long multi-sentence personal plan with informal language",
    "Input length type": "L",
    "Input": "mata heta nan enna vennaee machan .mee dhavas tikeema mama raee venakan vaeda adhath ehemayi thava vaeda godak thiyenavaa ivara karanna. gedhara idhan vaeda karana eka haemadhaama vaedata yanavaata vadaa amaaruyi .patta mahansi oluvatath nidhahasak naee . heta vitharane nivaaduvak thiyenne gedharata velaa rest karanna oonee . anivaaryen passe dhavasaka set vemu.",
    "Expected output": "මට හෙට නන් එන්න වෙන්නෑ මචන් .මේ දවස් ටිකේම මම රෑ වෙනකන් වැඩ අදත් එහෙමයි තව වැඩ ගොඩක් තියෙනවා ඉවර කරන්න. ගෙදර ඉදන් වැඩ කරන එක හැමදාම වැඩට යනවාට වඩා අමාරුයි .පට්ට මහන්සි ඔලුවටත් නිදහසක් නෑ . හෙට විතරනෙ නිවාඩුවක් තියෙන්නෙ ගෙදරට වෙලා rest කරන්න ඕනේ . අනිවාර්යෙන් පස්සෙ දවසක සෙට් වෙමු.",
    "Actual output": "මට හෙට නන් එන්න වෙන්නෑ මචන් .මේ දවස් ටිකේම මම රෑ වෙනකන් වැඩ අදත් එහෙමයි තව වැඩ ගොඩක් තියෙනවා ඉවර කරන්න. ගෙදර ඉදන් වැඩ කරන එක හැමදාම වැඩට යනවාට වඩා අමාරුයි .පට්ට මහන්සි ඔලුවටත් නිදහසක් නෑ . හෙට විතරනෙ නිවාඩුවක් තියෙන්නෙ ගෙදරට වෙලා rest කරන්න ඕනේ . අනිවාර්යෙන් පස්සෙ දවසක සෙට් වෙමු.",
    "Status": "Pass",
    "Accuracy justification / Description": "Pronoun usage is correctly preserved. Present/future tense meaning remains clear. English word 'rest' remains readable.",
    "What is covered by the test": "Daily language usage; Pronoun variation; L (≥300 characters); Robustness validation"
  },
  {
    "TC ID": "Pos_Fun_0019",
    "Test case name": "Convert long technical explanation with English terms embedded",
    "Input length type": "L",
    "Input": "OTP kiyannee 'One-Time Password'(eka varak pamaNak Bhaavithaa karana ) kiyana ekatayi. murapadhayak. obee giNumata log vedhdhii hoo vaedhagath ganudhenuvak karana vita eya laebena, thaavakaalika keethayak. meya kisivekuth samaga huvamaru nokiriima vaedhagath athara, keti kaalayakin avalQQgu vee.ema nisaa avaDhaanayen Bhaavithaa karanna.",
    "Expected output": "OTP කියන්නේ 'One-Time Password'(එක වරක් පමණක් භාවිතා කරන ) කියන එකටයි. මුරපදයක්. ඔබේ ගිණුමට log වෙද්දී හෝ වැදගත් ගනුදෙනුවක් කරන විට එය ලැබෙන, තාවකාලික කේතයක්. මෙය කිසිවෙකුත් සමග හුවමරු නොකිරීම වැදගත් අතර, කෙටි කාලයකින් අවලංගු වේ.එම නිසා අවධානයෙන් භාවිතා කරන්න.",
    "Actual output": "OTP කියන්නේ 'One-Time Password'(එක වරක් පමණක් භාවිතා කරන ) කියන එකටයි. මුරපදයක්. ඔබේ ගිණුමට log වෙද්දී හෝ වැදගත් ගනුදෙනුවක් කරන විට එය ලැබෙන, තාවකාලික කේතයක්. මෙය කිසිවෙකුත් සමග හුවමරු නොකිරීම වැදගත් අතර, කෙටි කාලයකින් අවලංගු වේ.එම නිසා අවධානයෙන් භාවිතා කරන්න.",
    "Status": "Pass",
    "Accuracy justification / Description": "Instructions and warnings regarding safe OTP use are clearly conveyed. English technical terms remain readable and correctly embedded.",
    "What is covered by the test": "Mixed Singlish + English; Simple sentence; L (≥300 characters); Robustness validation"
  },
  {
    "TC ID": "Pos_Fun_0020",
    "Test case name": "Convert long informal update with slang and mixed English",
    "Input length type": "L",
    "Input": "adoo machQQ adha nan supiri dhavasa! kalinma vaeda ivara unaa goda dhavasakata passe . Weather ekath hodhatama thiyenavaa . anivaaren havasata kattiyath ekka coffee ekak bonna eliyata yamu . magee kaar ekee yanna puLuvan . yana gaman mama oyaalaava geval valin dhaagena yannam",
    "Expected output": "අඩෝ මචං අද නන් සුපිරි දවස! කලින්ම වැඩ ඉවර උනා ගොඩ දවසකට පස්සෙ . Weather එකත් හොදටම තියෙනවා . අනිවාරෙන් හවසට කට්ටියත් එක්ක coffee එකක් බොන්න එලියට යමු . මගේ කාර් එකේ යන්න පුළුවන් . යන ගමන් මම ඔයාලාව ගෙවල් වලින් දාගෙන යන්නම්",
    "Actual output": "අඩෝ මචං අද නන් සුපිරි දවස! කලින්ම වැඩ ඉවර උනා ගොඩ දවසකට පස්සෙ . Weather එකත් හොදටම තියෙනවා . අනිවාරෙන් හවසට කට්ටියත් එක්ක coffee එකක් බොන්න එලියට යමු . මගේ කාර් එකේ යන්න පුළුවන් . යන ගමන් මම ඔයාලාව ගෙවල් වලින් දාගෙන යන්නම්",
    "Status": "Pass",
    "Accuracy justification / Description": "Mixed English terms are retained correctly. Robustness validation - tests handling of casual slang and irregular spacing.",
    "What is covered by the test": "Slang / informal language; Pronoun variation; L (≥300 characters); Robustness validation"
  },
  {
    "TC ID": "Pos_Fun_0021",
    "Test case name": "Convert long project planning paragraph with instructions",
    "Input length type": "L",
    "Input": "apita iilaga maase mula project eka submit karanna thiyenavaa . adha idhan plan karala vaeda karamu ethakota apita deadline ekata kalin vaedee ivara karaganna puLuvan veyi. mathakane kalin paara project eka karanakota una vaedee. api okkomalaa vaeda vala hira una nisaane eeka hariyata ivara karaganna baeri unee . mee paara hariyatama karamu.",
    "Expected output": "අපිට ඊලග මාසෙ මුල project එක submit කරන්න තියෙනවා . අද ඉදන් plan කරල වැඩ කරමු එතකොට අපිට deadline එකට කලින් වැඩේ ඉවර කරගන්න පුළුවන් වෙයි. මතකනෙ කලින් පාර project එක කරනකොට උන වැඩේ. අපි ඔක්කොමලා වැඩ වල හිර උන නිසානෙ ඒක හරියට ඉවර කරගන්න බැරි උනේ . මේ පාර හරියටම කරමු.",
    "Actual output": "අපිට ඊලග මාසෙ මුල project එක submit කරන්න තියෙනවා . අද ඉදන් plan කරල වැඩ කරමු එතකොට අපිට deadline එකට කලින් වැඩේ ඉවර කරගන්න පුළුවන් වෙයි. මතකනෙ කලින් පාර project එක කරනකොට උන වැඩේ. අපි ඔක්කොමලා වැඩ වල හිර උන නිසානෙ ඒක හරියට ඉවර කරගන්න බැරි උනේ . මේ පාර හරියටම කරමු.",
    "Status": "Pass",
    "Accuracy justification / Description": "Compound sentences are maintained. System correctly converts multi-sentence project planning input into Sinhala.",
    "What is covered by the test": "Daily language usage; Compound sentence; L (≥300 characters); Robustness validation"
  },
  {
    "TC ID": "Pos_Fun_0022",
    "Test case name": "Convert Singlish imperative project instruction",
    "Input length type": "L",
    "Input": "heta dhina 6.00 PM Zoom meeting paevaethviimata niyamithava aetha.udhaeesana vanavita Zoom link eka WhatsApp harahaa labaa dhenu aetha. Project sambanDha siyaluma prashna meeting ekeedhii saakachChaa kara visadhaagatha haeki baevin, suudhaanam vii sahaBhaagii viya yuthuya.ebaevin anivarayen sahaBhaagii vanna. kaNdaayamee sahayoogiithaavaya saha sambanDhiikaraNaya pavathvaa gaeniimata mathaka thabaa ganna.",
    "Expected output": "හෙට දින 6.00 PM Zoom meeting පැවැත්වීමට නියමිතව ඇත.උදෑසන වනවිට Zoom link එක WhatsApp හරහා ලබා දෙනු ඇත. Project සම්බන්ධ සියලුම ප්‍රශ්න meeting එකේදී සාකච්ඡා කර විසදාගත හැකි බැවින්, සූදානම් වී සහභාගී විය යුතුය.එබැවින් අනිවරයෙන් සහභාගී වන්න. කණ්ඩායමේ සහයෝගීතාවය සහ සම්බන්ධීකරණය පවත්වා ගැනීමට මතක තබා ගන්න.",
    "Actual output": "හෙට දින 6.00 PM Zoom meeting පැවැත්වීමට නියමිතව ඇත.උදෑසන වනවිට Zoom link එක WhatsApp හරහා ලබා දෙනු ඇත. Project සම්බන්ධ සියලුම ප්‍රශ්න meeting එකේදී සාකච්ඡා කර විසදාගත හැකි බැවින්, සූදානම් වී සහභාගී විය යුතුය.එබැවින් අනිවරයෙන් සහභාගී වන්න. කණ්ඩායමේ සහයෝගීතාවය සහ සම්බන්ධීකරණය පවත්වා ගැනීමට මතක තබා ගන්න.",
    "Status": "Pass",
    "Accuracy justification / Description": "Command/instruction tone is preserved. English words like Zoom, WhatsApp, Project remain readable and embedded correctly.",
    "What is covered by the test": "English technical/brand terms embedded in Singlish; Imperative (command); L (≥300 characters); Robustness validation"
  },
  {
    "TC ID": "Pos_Fun_0023",
    "Test case name": "Convert polite guidance request with explanation",
    "Input length type": "L",
    "Input": "karuNaakarala oyaata heta udheeta poddak kalin enna puLuvan dha ? kampaeni ekee aluth system eka mama kalin yuus karalaa naeene . mata loku vaeda thogayak thiyenavaa ivara karaganna . thaniyama karanna gihin mokak hari mistake ekak unoth ayee ithiQQ job ekata enna venne naee . dhannavane boss ge haeti . oyaata puLuvan dha udheeta aevilla mata poddak system gaena kiyala dhenna.",
    "Expected output": "කරුණාකරල ඔයාට හෙට උදේට පොඩ්ඩක් කලින් එන්න පුළුවන් ද ? කම්පැනි එකේ අලුත් system එක මම කලින් යූස් කරලා නෑනෙ . මට ලොකු වැඩ තොගයක් තියෙනවා ඉවර කරගන්න . තනියම කරන්න ගිහින් මොකක් හරි mistake එකක් උනොත් අයේ ඉතිං job එකට එන්න වෙන්නෙ නෑ . දන්නවනෙ boss ගෙ හැටි . ඔයාට පුළුවන් ද උදේට ඇවිල්ල මට පොඩ්ඩක් system ගැන කියල දෙන්න.",
    "Actual output": "කරුණාකරල ඔයාට හෙට උදේට පොඩ්ඩක් කලින් එන්න පුළුවන් ද ? කම්පැනි එකේ අලුත් system එක මම කලින් යූස් කරලා නෑනෙ . මට ලොකු වැඩ තොගයක් තියෙනවා ඉවර කරගන්න . තනියම කරන්න ගිහින් මොකක් හරි mistake එකක් උනොත් අයේ ඉතිං job එකට එන්න වෙන්නෙ නෑ . දන්නවනෙ boss ගෙ හැටි . ඔයාට පුළුවන් ද උදේට ඇවිල්ල මට පොඩ්ඩක් system ගැන කියල දෙන්න.",
    "Status": "Pass",
    "Accuracy justification / Description": "English technical terms are preserved and readable. Future tense meaning is maintained. System correctly converts polite request and explanations.",
    "What is covered by the test": "Greeting / request / response; Future tense; L (≥300 characters); Robustness validation"
  },
  {
    "TC ID": "Pos_Fun_0024",
    "Test case name": "Convert long customer service complaint narrative",
    "Input length type": "L",
    "Input": "mama online shop ekakin order ekak dhaemmaa . Delivery dhavas dhekakin venavaa kivvata mata thaama paarsal eka laebunee naee dhaen dhavas 7 katath vaedii . Tracking nambar eka check karalaa baeluvata mukuth pennanne naee. Courier company ekata call karath mata hari uththarayak hambunnaee . mama vaeradhi aeddras ekak dhaemmee naee kiyala vishvaasayi . Shop eken nam kiyanava thava dhavasak dhekak balanna kiyala . eetha mama nan hithannaee paarsal eka mata laebeyi kiyala .",
    "Expected output": "මම online shop එකකින් order එකක් දැම්මා . Delivery දවස් දෙකකින් වෙනවා කිව්වට මට තාම පාර්සල් එක ලැබුනේ නෑ දැන් දවස් 7 කටත් වැඩී . Tracking නම්බර් එක check කරලා බැලුවට මුකුත් පෙන්නන්නෙ නෑ. Courier company එකට call කරත් මට හරි උත්තරයක් හම්බුන්නෑ . මම වැරදි ඇඩ්ඩ්‍රස් එකක් දැම්මේ නෑ කියල විශ්වාසයි . Shop එකෙන් නම් කියනව තව දවසක් දෙකක් බලන්න කියල . ඒත මම නන් හිතන්නෑ පාර්සල් එක මට ලැබෙයි කියල .",
    "Actual output": "මම online shop එකකින් order එකක් දැම්මා . Delivery දවස් දෙකකින් වෙනවා කිව්වට මට තාම පාර්සල් එක ලැබුනේ නෑ දැන් දවස් 7 කටත් වැඩී . Tracking නම්බර් එක check කරලා බැලුවට මුකුත් පෙන්නන්නෙ නෑ. Courier company එකට call කරත් මට හරි උත්තරයක් හම්බුන්නෑ . මම වැරදි ඇඩ්ඩ්‍රස් එකක් දැම්මේ නෑ කියල විශ්වාසයි . Shop එකෙන් නම් කියනව තව දවසක් දෙකක් බලන්න කියල . ඒත මම නන් හිතන්නෑ පාර්සල් එක මට ලැබෙයි කියල .",
    "Status": "Pass",
    "Accuracy justification / Description": "Sequence of events, time references and complaints are preserved accurately. Complex sentence structure maintained.",
    "What is covered by the test": "Daily language usage; Complex sentence; L (≥300 characters); Robustness validation"
  },
  {
    "TC ID": "Neg_Fun_0001",
    "Test case name": "Random meaningless input handling",
    "Input length type": "S",
    "Input": "bgdtabd bdyreysg aaybjdlk",
    "Expected output": "bgdtabd bdyreysg aaybjdlk",
    "Actual output": "බ්ග්ඩ්ටබ්ඩ් බ්ඩ්ය්‍රෙය්ස්ග් ආය්බ්ජ්ඩ්ල්ක්",
    "Status": "Fail",
    "Accuracy justification / Description": "The input consists of random characters with no linguistic meaning. Generated output is nonsensical Sinhala, reducing readability and accuracy.",
    "What is covered by the test": "Typographical error handling; S (≤30 characters); Robustness validation"
  },
  {
    "TC ID": "Neg_Fun_0002",
    "Test case name": "Numeric-only input handling",
    "Input length type": "S",
    "Input": "12345678",
    "Expected output": "12345678",
    "Actual output": "12345678",
    "Status": "Fail",
    "Accuracy justification / Description": "Input contains only numeric characters. No error or guidance is provided to inform users that numbers alone cannot be processed for translation.",
    "What is covered by the test": "Punctuation / numbers; S (≤30 characters); Robustness validation"
  },
  {
    "TC ID": "Neg_Fun_0003",
    "Test case name": "Empty input with spaces only",
    "Input length type": "S",
    "Input": "                       ",
    "Expected output": "                       ",
    "Actual output": "                       ",
    "Status": "Fail",
    "Accuracy justification / Description": "Input contains only whitespace characters. No error message shown to inform user of invalid input.",
    "What is covered by the test": "Empty/cleared input handling; S (≤30 characters); Robustness validation"
  },
  {
    "TC ID": "Neg_Fun_0004",
    "Test case name": "Symbols-only input handling",
    "Input length type": "S",
    "Input": "###@@@$$$%%%&&&",
    "Expected output": "###@@@$$$%%%&&&",
    "Actual output": "###@@@$$$%%%&&&",
    "Status": "Fail",
    "Accuracy justification / Description": "Input contains only special characters and symbols. No Singlish or phonetic structure present.",
    "What is covered by the test": "Typographical error handling; S (≤30 characters); Robustness validation"
  },
  {
    "TC ID": "Neg_Fun_0005",
    "Test case name": "Missing vowels in words",
    "Input length type": "M",
    "Input": "pdhDhthy pvsm dhooShyk hdhngn th. prshlk nm sh mrpdhy nvrdhv thlth krnn. gtlv dhgtm pvth nm, pg shy kNdyym mthnn.",
    "Expected output": "pdhDhthy pvsm dhooShyk hdhngn th. prshlk nm sh mrpdhy nvrdhv thlth krnn. gtlv dhgtm pvth nm, pg shy kNdyym mthnn.",
    "Actual output": "ප්ද්ධ්ත්ය් ප්ව්ස්ම් දෝෂ්ය්ක් හ්ද්න්ග්න් ත්. ප්‍රශ්ල්ක් න්ම් ශ් ම්‍රප්ද්ය් න්ව්‍රද්ව් ත්ල්ත් ක්‍රන්න්. ග්ට්ල්ව් ද්ග්ට්ම් ප්ව්ත් න්ම්, pg shy ක්ණ්ඩ්ය්ය්ම් ම්ත්න්න්.",
    "Status": "Fail",
    "Accuracy justification / Description": "Input words have missing vowels, making them incomplete and ambiguous. System fails to convert chat style informal language correctly.",
    "What is covered by the test": "Slang / informal language; Compund sentence; M (31–299 characters); Robustness validation"
  },
  {
    "TC ID": "Neg_Fun_0006",
    "Test case name": "Messy input with symbols and gibberish",
    "Input length type": "M",
    "Input": "aDhYAyanaya !!!! kiriima ****yanu ##@jiivitha %%% kaalaya@@ puraama??? gamanaki. dhinakata @@@pitu d*** hahayak *##kiyavanna.!!!!! saeema### dheyakma &&& vimasilimath vanna.!!!! dhaenuma @#@! obee !@#@ shakthiyayi.",
    "Expected output": "අධ්‍යයනය !!!! කිරීම ****යනු ##@ජීවිත %%% කාලය@@ පුරාම??? ගමනකි. දිනකට @@@පිටු ඩ්*** හහයක් *##කියවන්න.!!!!! සෑම### දෙයක්ම &&& විමසිලිමත් වන්න.!!!! දැනුම @#@! ඔබේ !@#@ ශක්තියයි.",
    "Actual output": "අධ්‍යයනය !!!! කිරීම ****යනු ##@ජීවිත %%% කාලය@@ පුරාම??? ගමනකි. දිනකට @@@පිටු ඩ්*** හහයක් *##කියවන්න.!!!!! සෑම### දෙයක්ම &&& විමසිලිමත් වන්න.!!!! දැනුම @#@! ඔබේ !@#@ ශක්තියයි.",
    "Status": "Fail",
    "Accuracy justification / Description": "Input contains valid Singlish mixed with excessive special symbols. Shows system's inability to ignore symbols while converting valid words.",
    "What is covered by the test": "Typographical error handling; M (31–299 characters); Robustness validation"
  },
  {
    "TC ID": "Neg_Fun_0007",
    "Test case name": "Mixed slang and abbreviations handling",
    "Input length type": "M",
    "Input": "hey bro thx 4 ur help tdy , really helped a lot. c u l8r @ the meeting gonna b gr8 machan.catch u soon @ campus",
    "Expected output": "hey bro thx 4 ur help tdy , really helped a lot. c u l8r @ the meeting gonna b gr8 machan.catch u soon @ campus",
    "Actual output": "hey bro තx 4 උර් help ට්ඩ්ය් , really helped a lot. c උ l8ර් @ තෙ meeting ගොන්න b gr8 මචන්.catch උ soon @ campus",
    "Status": "Fail",
    "Accuracy justification / Description": "System incorrectly converts parts of informal English/abbreviations into Sinhala. Text remains mostly unconverted.",
    "What is covered by the test": "Slang / informal language; Compound sentence; M (31–299 characters); Robustness validation"
  },
  {
    "TC ID": "Neg_Fun_0008",
    "Test case name": "Long paragraph with excessive spacing",
    "Input length type": "L",
    "Input": "nithara           nithara            mageth                ekka                  raNdu                venna                laeesthi                     venna                     epaa.                    dhavasa                     thissema mahansi                 vela                  gedhara                     enne                      poddak                  hitha                       nidhahasen                    inna.                       prashnayak                 thiyenavanan                        hemiita                         kathaa                        karalaa           visadha gamu.",
    "Expected output": "නිතර            නිතර            මගෙත්                එක්ක                  රණ්ඩු                වෙන්න                ලෑස්ති                     වෙන්න                     එපා.                    දවස                     තිස්සෙම මහන්සි                 වෙල                  ගෙදර                     එන්න                      පොඩ්ඩක්                  හිත                       නිදහසෙන්                    ඉන්න.                       ප්‍රශ්නයක්                 තියෙනවන්න්                        හෙමීට                         කතා                        කරලා           විසද ගමු.",
    "Actual output": "නිතර            නිතර            මගෙත්                එක්ක                  රණ්ඩු                වෙන්න                ලෑස්ති                     වෙන්න                     එපා.                    දවස                     තිස්සෙම මහන්සි                 වෙල                  ගෙදර                     එන්න                      පොඩ්ඩක්                  හිත                       නිදහසෙන්                    ඉන්න.                       ප්‍රශ්නයක්                 තියෙනවන්න්                        හෙමීට                         කතා                        කරලා           විසද ගමු.",
    "Status": "Fail",
    "Accuracy justification / Description": "Formatting inconsistencies affect readability. Demonstrates handling of whitespace at scale.",
    "What is covered by the test": "Formatting (spaces / line breaks / paragraph); Simple sentence; L (≥300 characters); Robustness validation"
  },
  {
    "TC ID": "Neg_Fun_0009",
    "Test case name": "Unsegmented gibberish input",
    "Input length type": "L",
    "Input": "mamagedharayanaavaoyaaenavadhamaathekayannabathakannaooneeapipaasakyanaavahetayamuapikathaakaramumamabathakannakalinofficeyanavaakaeemagekanavaoyaaenavadhamaathekayannabathakannaooneeapipaasakyanaavahetayamumamabathakannakalinofficeyanavaakaeemagekanavaoyaaenavadhamaathekayannabathakannaooneeapipaasakyanaavahetayamumamabathakannakalinofficeyanavaakaeemagekanava.",
    "Expected output": "rateesauKYAseevaapadhDhathiyavaedidhiyuNukiriimaSaDHAhaavishaalavYaapRUthiyakdhiyathkiriimataniyamithavaaetha.mehidhiigraamiiyaroolalvalatanaviinaupakaraNasaepayiima,vidhuliroolalmeheyumkramasavikiriima,sahamahajanayaatadhurasThasauKYAseevaalabaadhiimatahaekivanaparidhithaakShaNayayodhaagaenii,maaethuLathvee.memavaedasatahanayatatheevaidhYAkaarmikaupakaraNaaanayananayakiriimatathavashYAaramudhalvenkaraaetha.",
    "Actual output": "(nothing displayed)",
    "Status": "Fail",
    "Accuracy justification / Description": "The input is unsegmented, nonsensical gibberish. Blank output is ambiguous, does not indicate successful conversion or failure.",
    "What is covered by the test": "Typographical error handling; Complex sentence; L (≥300 characters); Robustness validation"
  },
  {
    "TC ID": "Neg_Fun_0010",
    "Test case name": "Fully English paragraph handling",
    "Input length type": "L",
    "Input": "Technology has fundamentally reshaped how we communicate, work, and live. With the rise of smartphones and the internet, information flows faster than ever, connecting people across the globe. However, this digital shift also brings challenges like privacy concerns and digital fatigue. To build a balanced future, we must design tech that empowers without overwhelming prioritizing human well-being alongside innovation. Responsible progress is key.",
    "Expected output": "Technology has fundamentally reshaped how we communicate, work, and live. With the rise of smartphones and the internet, information flows faster than ever, connecting people across the globe. However, this digital shift also brings challenges like privacy concerns and digital fatigue. To build a balanced future, we must design tech that empowers without overwhelming prioritizing human well-being alongside innovation. Responsible progress is key.",
    "Actual output": "Technology හස් fundamentally reshaped how we communicate, work, and live. With තෙ rise ඔෆ් smartphones and තෙ internet, information flows faster than ever, connecting people across තෙ globe. However, තිස් digital shift also brings challenges like privacy concerns and digital fatigue. To build a balanced future, we must design tech that empowers without overwhelming prioritizing human well-being alongside innovation. Responsible progress ඉස් key.",
    "Status": "Fail",
    "Accuracy justification / Description": "System incorrectly transliterates English words that resemble Singlish phonetics. System doesn't inform user about wrong format.",
    "What is covered by the test": "Mixed Singlish + English scenario (fully English in this case); Complex sentence; L (≥300 characters); Robustness validation"
  },
  {
    "TC ID": "Pos_UI_0001",
    "Test case name": "Swap language button functionality",
    "Input length type": "S",
    "Input": "ohoma inna, oyaata maath ekka yanna puluvan",
    "Expected output": "When the swap button is clicked, the Singlish and Sinhala text boxes switch roles and labels correctly.",
    "Actual output": "The Singlish and Sinhala text boxes switch positions and labels after clicking the swap button.",
    "Status": "Pass",
    "Accuracy justification / Description": "UI labels update correctly and remains responsive after action. Swap button is visible and clickable.",
    "What is covered by the test": "Usability flow (real-time conversion); Simple sentence; S (≤30 characters); Real-time output update behavior"
  },
  {
    "TC ID": "Neg_UI_0001",
    "Test case name": "UI responsiveness on browser resize",
    "Input length type": "S",
    "Input": "(No text input – UI interaction)",
    "Expected output": "All UI elements should remain visible and accessible after resize; no overlapping, hiding, or misalignment",
    "Actual output": "Some buttons and text areas overlap or partially disappear on small widths",
    "Status": "Fail",
    "Accuracy justification / Description": "UI is not fully responsive. Elements misalign or hide when resizing browser. This breaks usability and accessibility.",
    "What is covered by the test": "Usability flow (real-time conversion); Real-time output update behavior; Robustness validation"
  }

];

// Create workbook & worksheet
const wb = XLSX.utils.book_new();
const ws = XLSX.utils.json_to_sheet(testCases);

// Add sheet
XLSX.utils.book_append_sheet(wb, ws, 'TestCases');

// Write Excel file
const outputPath = path.resolve('IT23367326_TestCases.xlsx');
XLSX.writeFile(wb, outputPath);

console.log(' Excel file generated:', outputPath);
