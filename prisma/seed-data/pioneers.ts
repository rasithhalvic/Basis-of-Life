// Pioneers extracted from the 12 exhibition posters (poster-only; no web research).
// Sinhala text is copied from the posters; English is a translation of the Sinhala
// (except the English subtitles/terms printed on the posters). See the review notes.

export interface PioneerText {
  name: string;
  lifeDates: string;
  field: string;
  introduction: string;
  biography: string;
  contributions: string[];
  timeline: { year: string; event: string }[];
  facts: string[];
  portraitAlt: string;
}
export interface PioneerSeed {
  slug: string;
  sortOrder: number;
  portraitUrl: string | null;
  portraitAttribution: string | null;
  portraitLicense: string | null;
  sources: { title: string; url: string | null }[];
  en: PioneerText;
  si: PioneerText | null;
}

export const PIONEERS: PioneerSeed[] = [
  {
    slug: "al-zahrawi",
    sortOrder: 1,
    portraitUrl: null,
    portraitAttribution: null,
    portraitLicense: null,
    sources: [],
    en: {
      name: "Al-Zahrawi",
      lifeDates: "c. 936 – 1013",
      field: "Father of Surgery",
      introduction: "Al-Zahrawi was an outstanding physician who lived in the region of Córdoba in present-day Spain. By introducing new instruments and methods for surgery, he made a great contribution to the advancement of surgical medicine.",
      biography:
        "He described a range of instruments that can be used in different surgeries and presented them with illustrations. These included instruments used for cutting, grasping and other surgical procedures.\n\nHe described methods for treating wounds, controlling bleeding and carrying out various surgical operations.\n\nHe wrote a famous series of medical books called Al-Tasrif (Al Tasrif). It contained the medical knowledge of the time about diseases, treatment methods, medicines and surgery.",
      contributions: [
        "Contributed to the advancement of the instruments and methods used in surgery.",
        "Presented surgical knowledge in an orderly way, with illustrations.",
        "Provided an important foundation for the education of later surgeons and for the growth of surgical medicine.",
      ],
      timeline: [],
      facts: [
        "In his medical book, Al-Zahrawi described more than 200 surgical instruments.",
        "The surgical section of his Al Tasrif was translated into Latin and, for centuries, influenced surgical education in Europe.",
      ],
      portraitAlt: "Sepia illustration of Al-Zahrawi, a bearded man wearing a wrapped turban, shown in profile.",
    },
    si: {
      name: "අල්-සහ්රාවි",
      lifeDates: "ක්‍රි.ව. 936 - 1013 පමණ",
      field: "ශල්‍ය වෛද්‍ය විද්‍යාවේ පියා",
      introduction: "අල්-සහ්රාවි යනු වර්තමාන ස්පාඤ්ඤයේ කෝර්ඩෝබා ප්‍රදේශය ආශ්‍රිතව ජීවත් වූ විශිෂ්ට වෛද්‍යවරයෙකි. ශල්‍යකර්ම සඳහා නව උපකරණ සහ ක්‍රමවේද හඳුන්වා දෙමින් ශල්‍ය වෛද්‍ය විද්‍යාවේ දියුණුවට ඔහු විශාල දායකත්වයක් ලබා දුන්නේය.",
      biography:
        "විවිධ ශල්‍යකර්ම සඳහා භාවිත කළ හැකි උපකරණ රැසක් විස්තර කර රූප සටහන් සහිතව ඉදිරිපත් කළේය. ඒ අතර කැපීම, අල්ලා ගැනීම සහ වෙනත් ශල්‍ය ක්‍රියාකාරකම් සඳහා භාවිත කරන උපකරණ ඇතුළත් විය.\n\nතුවාලවලට ප්‍රතිකාර කිරීම, රුධිර වහනය පාලනය කිරීම සහ විවිධ ශල්‍යකර්ම සිදු කිරීම සඳහා ක්‍රමවේද විස්තර කළේය.\n\nඅල්-තස්රීෆ් (Al Tasrif) නම් ප්‍රසිද්ධ වෛද්‍ය ග්‍රන්ථ මාලාව රචනා කළේය. එහි රෝග, ප්‍රතිකාර ක්‍රම, ඖෂධ සහ ශල්‍යකර්ම පිළිබඳ එවකට පැවති දැනුම ඇතුළත් විය.",
      contributions: [
        "ශල්‍යකර්ම සඳහා භාවිත කරන උපකරණ සහ ක්‍රමවේද දියුණු කිරීමට දායක විය.",
        "ශල්‍ය වෛද්‍ය දැනුම රූප සටහන් සහිතව ක්‍රමානුකූලව ඉදිරිපත් කළේය.",
        "පසුකාලීන ශල්‍ය වෛද්‍යවරුන්ගේ අධ්‍යාපනයට සහ ශල්‍ය වෛද්‍ය විද්‍යාවේ වර්ධනයට වැදගත් පදනමක් සැපයීය.",
      ],
      timeline: [],
      facts: [
        "අල්-සහ්රාවි සිය වෛද්‍ය ග්‍රන්ථයේ ශල්‍ය උපකරණ 200කට අධික සංඛ්‍යාවක් විස්තර කර ඇත.",
        "ඔහුගේ AL Tasrif ග්‍රන්ථයේ ශල්‍යකර්ම පිළිබඳ කොටස ලතින් භාෂාවට පරිවර්තනය කරන ලද අතර, එය සියවස් ගණනාවක් පුරා යුරෝපයේ ශල්‍ය වෛද්‍ය අධ්‍යාපනයට බලපෑවේය.",
      ],
      portraitAlt: "අල්-සහ්රාවිගේ සේපියා වර්ණ චිත්‍රයකි; හිස වටා රෙදි ඔතා ඇති, රැවුල් සහිත පුද්ගලයෙකු පැති මුහුණතකින් දැක්වේ.",
    },
  },
  {
    slug: "alexander-fleming",
    sortOrder: 2,
    portraitUrl: null,
    portraitAttribution: null,
    portraitLicense: null,
    sources: [],
    en: {
      name: "Alexander Fleming",
      lifeDates: "1881 – 1955",
      field: "Discoverer of Penicillin",
      introduction: "Alexander Fleming was a Scottish physician and microbiologist. By discovering the antibiotic substance penicillin in 1928, he earned an important place in the history of world medicine. This discovery paved the way for a new era in the treatment of bacterial infections.",
      biography:
        "In 1928, Fleming noticed a mould that had grown by accident on a dish used for culturing bacteria. He observed that bacteria did not grow around the mould. He later named the antibacterial substance produced by that mould penicillin.\n\nThe discovery of penicillin greatly improved the ability to treat pneumonia, wound infections and other bacterial infections. Later, with the contributions of other scientists, penicillin was developed into a medicine that could be produced on a large scale.\n\nFleming's discovery encouraged scientists to look for new antibiotic medicines, making a great contribution to reducing deaths caused by bacterial infections.",
      contributions: [
        "Discovered penicillin in 1928.",
        "Paved the way for a new era in the treatment of bacterial infections.",
        "Encouraged scientific research to discover new antibiotic medicines.",
        "Laid a foundation for the advancement of antibiotic treatments that have helped save millions of lives around the world.",
      ],
      timeline: [
        { year: "1928", event: "Discovers penicillin." },
        { year: "1945", event: "Awarded the Nobel Prize for Medicine, shared with Howard Florey and Ernst Boris Chain." },
      ],
      facts: [
        "Fleming noticed that mould had grown on a dish of bacteria in his laboratory. Instead of ignoring it, he investigated why bacteria were not growing around the mould, and so was able to discover penicillin.",
        "In 1945 Fleming was awarded the Nobel Prize for Medicine.",
        "He shared the prize with Howard Florey and Ernst Boris Chain, who contributed to developing penicillin as a medicine.",
      ],
      portraitAlt: "Sepia portrait of Alexander Fleming, an older man with white hair, wearing a bow tie and a white laboratory coat.",
    },
    si: {
      name: "ඇලෙක්සැන්ඩර් ෆ්ලෙමින්",
      lifeDates: "ක්‍රි.ව. 1881 - 1955",
      field: "පෙනිසිලින් සොයාගත් විද්‍යාඥයා",
      introduction: "ඇලෙක්සැන්ඩර් ෆ්ලෙමින් යනු ස්කොට්ලන්ත ජාතික වෛද්‍යවරයෙකු සහ ක්ෂුද්‍ර ජීව විද්‍යාඥයෙකි. 1928 වර්ෂයේදී පෙනිසිලින් (Penicillin) නම් ප්‍රතිජීවක ද්‍රව්‍ය සොයාගැනීමෙන් ඔහු ලෝක වෛද්‍ය ඉතිහාසයේ වැදගත් ස්ථානයක් හිමිකර ගත්තේය. මෙම සොයාගැනීම බැක්ටීරියා ආසාදනවලට ප්‍රතිකාර කිරීමේ නව යුගයකට මග පෑදීය.",
      biography:
        "1928 වර්ෂයේදී ෆ්ලෙමින් බැක්ටීරියා වගා කළ පරීක්ෂණ තැටියක අහම්බෙන් වර්ධනය වූ පුස් වර්ගයක් නිරීක්ෂණය කළේය. එම පුස් වර්ගය අවට බැක්ටීරියා වර්ධනය නොවන බව ඔහු හඳුනාගත්තේය. පසුව එම පුස් මගින් නිපදවන බැක්ටීරියා නාශක ද්‍රව්‍ය පෙනිසිලින් ලෙස නම් කළේය.\n\nපෙනිසිලින් සොයාගැනීම නිසා නියුමෝනියාව, තුවාල ආසාදන සහ වෙනත් බැක්ටීරියා ආසාදනවලට ප්‍රතිකාර කිරීමේ හැකියාව විශාල ලෙස දියුණු විය. පසුව වෙනත් විද්‍යාඥයන්ගේ දායකත්වයෙන් පෙනිසිලින් ඖෂධයක් ලෙස වැඩිදියුණු කර මහා පරිමාණයෙන් නිෂ්පාදනය කිරීමට හැකි විය.\n\nෆ්ලෙමින්ගේ සොයාගැනීම නව ප්‍රතිජීවක ඖෂධ සඳහා විද්‍යාඥයන් උනන්දු කළේය. එමගින් බැක්ටීරියා ආසාදන හේතුවෙන් සිදුවන මරණ අඩු කිරීමට විශාල දායකත්වයක් ලැබුණි.",
      contributions: [
        "1928 වර්ෂයේදී පෙනිසිලින් සොයාගත්තේය.",
        "බැක්ටීරියා ආසාදනවලට ප්‍රතිකාර කිරීමේ නව යුගයකට මග පෑදුවේය.",
        "නව ප්‍රතිජීවක ඖෂධ සොයාගැනීම සඳහා විද්‍යාත්මක පර්යේෂණ දිරිමත් කළේය.",
        "ලොව පුරා මිලියන ගණනකගේ ජීවිත ආරක්ෂා කිරීමට දායක වූ ප්‍රතිජීවක ප්‍රතිකාරවල දියුණුවට පදනමක් සැපයීය.",
      ],
      timeline: [
        { year: "1928", event: "පෙනිසිලින් සොයාගත්තේය." },
        { year: "1945", event: "වෛද්‍ය විද්‍යාව සඳහා නොබෙල් ත්‍යාගය හිමි විය; එය හොවාර්ඩ් ෆ්ලොරි සහ අර්නස්ට් බොරිස් චේන් සමග බෙදා ගත්තේය." },
      ],
      facts: [
        "ෆ්ලෙමින් සිය පරීක්ෂණාගාරයේ බැක්ටීරියා වගා කළ තැටියක පුස් වර්ධනය වී ඇති බව නිරීක්ෂණය කළේය. එය නොසලකා හැරීම වෙනුවට, පුස් අවට බැක්ටීරියා වර්ධනය නොවන්නේ ඇයිදැයි පරීක්ෂා කිරීමෙන් පෙනිසිලින් සොයාගැනීමට ඔහුට හැකි විය.",
        "1945 වර්ෂයේදී ෆ්ලෙමින්ට වෛද්‍ය විද්‍යාව සඳහා නොබෙල් ත්‍යාගය හිමි විය.",
        "මෙම ත්‍යාගය පෙනිසිලින් ඖෂධයක් ලෙස දියුණු කිරීමට දායක වූ හොවාර්ඩ් ෆ්ලොරි (Howard Florey) සහ අර්නස්ට් බොරිස් චේන් (Ernst Boris Chain) සමග බෙදා ගත්තේය.",
      ],
      portraitAlt: "ඇලෙක්සැන්ඩර් ෆ්ලෙමින්ගේ සේපියා වර්ණ ඡායාරූපයකි; සුදු හිසකෙස් සහිත, බෝ ටයි එකක් සහ සුදු රසායනාගාර කබායක් ඇඳ සිටින වයෝවෘද්ධ පුද්ගලයෙකි.",
    },
  },
  {
    slug: "andreas-vesalius",
    sortOrder: 3,
    portraitUrl: null,
    portraitAttribution: null,
    portraitLicense: null,
    sources: [],
    en: {
      name: "Andreas Vesalius",
      lifeDates: "1514 – 1564",
      field: "Father of Modern Anatomy",
      introduction: "Andreas Vesalius was a famous physician and anatomist who lived in the 16th century. He made a great contribution to developing accurate knowledge of the organs of the human body and their positions. He showed the importance of observing directly by dissecting human bodies.",
      biography:
        "By dissecting human bodies, he carried out detailed studies of the position and structure of bones, muscles, blood vessels and internal organs.\n\nHe recognised that some statements in the old medical books did not match the real structure of the human body. In particular, he showed through direct observation that some of Galen's anatomical ideas were wrong.\n\nIn 1543 he published the book De Humani Corporis Fabric (on the structure of the human body). It contained detailed and highly accurate illustrations of the organs of the human body.",
      contributions: [
        "Contributed to gaining more accurate knowledge of the structure of the human body.",
        "Showed that dissection and direct observation are important in teaching anatomy.",
        "Provided an important foundation for the growth of modern anatomy and surgical education.",
      ],
      timeline: [{ year: "1543", event: "Publishes De Humani Corporis Fabric." }],
      facts: [
        "Vesalius published his famous anatomy book at the age of 28.",
        "In his time, many physicians trusted what was written in the old books. But by studying the human body directly, Vesalius showed the importance of testing those ideas.",
      ],
      portraitAlt: "Sepia portrait of Andreas Vesalius, a man with curly hair and a full beard, wearing a ruffled collar and a patterned coat.",
    },
    si: {
      name: "ඇන්ඩ්‍රියාස් වෙසාලියස්",
      lifeDates: "ක්‍රි.ව. 1514 - 1564",
      field: "නූතන ව්‍යුහ විද්‍යාවේ පියා",
      introduction: "ඇන්ඩ්‍රියාස් වෙසාලියස් යනු 16 වන සියවසේ ජීවත් වූ ප්‍රසිද්ධ වෛද්‍යවරයෙකු සහ ව්‍යුහ විද්‍යාඥයෙකි. මිනිස් සිරුරේ අවයව සහ ඒවායේ පිහිටීම පිළිබඳ නිවැරදි දැනුම වර්ධනය කිරීමට ඔහු විශාල දායකත්වයක් ලබා දුන්නේය. මිනිස් සිරුරු විච්ඡේදනය කරමින් සෘජුව නිරීක්ෂණය කිරීමේ වැදගත්කම ඔහු පෙන්වා දුන්නේය.",
      biography:
        "මිනිස් සිරුරු විච්ඡේදනය කරමින් අස්ථි, මාංශපේශි, රුධිර නාල සහ අභ්‍යන්තර අවයවවල පිහිටීම හා ව්‍යුහය පිළිබඳ සවිස්තරාත්මක අධ්‍යයනයන් සිදු කළේය.\n\nපැරණි වෛද්‍ය ග්‍රන්ථවල සඳහන් වූ ඇතැම් කරුණු මිනිස් සිරුරේ සැබෑ ව්‍යුහයට නොගැලපෙන බව හඳුනාගත්තේය. විශේෂයෙන් ගැලන්ගේ ඇතැම් ව්‍යුහ විද්‍යාත්මක අදහස් වැරදි බව සෘජු නිරීක්ෂණ මගින් පෙන්වා දුන්නේය.\n\n1543 වර්ෂයේදී De Humani Corporis Fabric (මිනිස් සිරුරේ ව්‍යුහය පිළිබඳව) නම් ග්‍රන්ථය ප්‍රකාශයට පත් කළේය. එහි මිනිස් සිරුරේ අවයව පිළිබඳ සවිස්තරාත්මක සහ ඉතා නිවැරදි රූප සටහන් ඇතුළත් විය.",
      contributions: [
        "මිනිස් සිරුරේ ව්‍යුහය පිළිබඳ වඩාත් නිවැරදි දැනුමක් ලබාගැනීමට දායක විය.",
        "ව්‍යුහ විද්‍යාව ඉගැන්වීමේදී සිරුරු විච්ඡේදනය සහ සෘජු නිරීක්ෂණය වැදගත් බව පෙන්වා දුන්නේය.",
        "නූතන ව්‍යුහ විද්‍යාව සහ ශල්‍ය වෛද්‍ය අධ්‍යාපනය වර්ධනය වීමට වැදගත් පදනමක් සැපයීය.",
      ],
      timeline: [{ year: "1543", event: "De Humani Corporis Fabric ග්‍රන්ථය ප්‍රකාශයට පත් කළේය." }],
      facts: [
        "වෙසාලියස් සිය ප්‍රසිද්ධ ව්‍යුහ විද්‍යා ග්‍රන්ථය ප්‍රකාශයට පත් කළේ වයස අවුරුදු 28දීය.",
        "ඔහු ජීවත් වූ කාලයේදී බොහෝ වෛද්‍යවරුන් පැරණි ග්‍රන්ථවල සඳහන් කරුණු විශ්වාස කළහ. නමුත් වෙසාලියස් මිනිස් සිරුර සෘජුව අධ්‍යයනය කරමින් එම අදහස් පරීක්ෂා කිරීමේ වැදගත්කම පෙන්වා දුන්නේය.",
      ],
      portraitAlt: "ඇන්ඩ්‍රියාස් වෙසාලියස්ගේ සේපියා වර්ණ චිත්‍රයකි; රැළි සහිත කරපටියක් සහ සැරසිලි සහිත කබායක් ඇඳි, ඝන රැවුලක් සහිත, කොරදිගු කෙස් ඇති පුද්ගලයෙකි.",
    },
  },
  {
    slug: "edward-jenner",
    sortOrder: 4,
    portraitUrl: null,
    portraitAttribution: null,
    portraitLicense: null,
    sources: [],
    en: {
      name: "Edward Jenner",
      lifeDates: "1749 – 1823",
      field: "Father of Immunology",
      introduction: "Edward Jenner was a famous physician who lived in England. By introducing the first successful vaccination method to protect people from smallpox, a deadly infectious disease, he earned an important place in the history of world medicine. His discovery provided an important foundation for modern vaccination methods.",
      biography:
        "In 1796, Jenner carried out an experiment to show that exposure to cowpox could give people protection against smallpox. That experiment led to the development of the first successful smallpox vaccination method.\n\nHe provided an important foundation for the idea that, by stimulating the body's defence system with a germ similar to the disease-causing one, or with a weakened disease agent, protection against that disease can be gained in the future.\n\nJenner's vaccination method helped reduce deaths from smallpox and bring the disease under control. It was also important for the later growth of vaccination programmes around the world.",
      contributions: [
        "Introduced the first successful vaccination method against smallpox.",
        "Provided an important foundation for modern vaccination and immunology.",
        "Contributed to the growth of vaccination programmes that helped prevent infectious diseases and save the lives of millions of people around the world.",
      ],
      timeline: [{ year: "1796", event: "Carries out his experiment with cowpox, using an eight-year-old boy, James Phipps." }],
      facts: [
        "The link between cowpox and smallpox pointed Jenner towards his discovery.",
        "The observation that milkmaids who had caught cowpox were less likely to catch smallpox guided Jenner's research.",
        "In 1796 he carried out his famous experiment using an eight-year-old boy named James Phipps. An experiment like that would not be acceptable today under medical research ethics.",
      ],
      portraitAlt: "Sepia portrait of Edward Jenner, a man with wavy hair wearing a high white cravat and a dark coat.",
    },
    si: {
      name: "එඩ්වඩ් ජෙනර්",
      lifeDates: "ක්‍රි.ව. 1749 - 1823",
      field: "ප්‍රතිශක්තිකරණ විද්‍යාවේ පියා",
      introduction: "එඩ්වඩ් ජෙනර් යනු එංගලන්තයේ ජීවත් වූ ප්‍රසිද්ධ වෛද්‍යවරයෙකි. වසූරිය (Smallpox) නම් මාරාන්තික බෝවන රෝගයෙන් මිනිසුන් ආරක්ෂා කිරීම සඳහා පළමු සාර්ථක එන්නත් ක්‍රමය හඳුන්වා දීමෙන් ඔහු ලෝක වෛද්‍ය ඉතිහාසයේ වැදගත් ස්ථානයක් හිමිකර ගත්තේය. ඔහුගේ සොයාගැනීම නූතන එන්නත්කරණ ක්‍රමවල දියුණුවට වැදගත් පදනමක් සැපයීය.",
      biography:
        "1796 වර්ෂයේදී ජෙනර්, ගව වසූරිය (Cowpox) රෝගයට නිරාවරණය වීමෙන් මිනිසුන්ට වසූරිය රෝගයෙන් ආරක්ෂාවක් ලැබිය හැකි බව පෙන්වා දීමට පර්යේෂණයක් සිදු කළේය. එම පර්යේෂණය පළමු සාර්ථක වසූරිය එන්නත් ක්‍රමය වර්ධනය වීමට හේතු විය.\n\nරෝගයක් ඇති කරන විෂබීජයකට සමාන හෝ දුර්වල කළ රෝගකාරකයක් මගින් ශරීරයේ ආරක්ෂක පද්ධතිය උත්තේජනය කර, අනාගතයේදී එම රෝගයට එරෙහිව ආරක්ෂාව ලබාගත හැකි බවට වැදගත් පදනමක් සැපයීය.\n\nජෙනර්ගේ එන්නත් ක්‍රමය වසූරිය රෝගයෙන් සිදුවන මරණ අඩු කිරීමට සහ එම රෝගය පාලනය කිරීමට උපකාරී විය. පසුව ලෝකය පුරා එන්නත්කරණ වැඩසටහන් වර්ධනය වීමටද එය වැදගත් විය.",
      contributions: [
        "වසූරිය රෝගයට එරෙහි පළමු සාර්ථක එන්නත් ක්‍රමය හඳුන්වා දුන්නේය.",
        "නූතන එන්නත්කරණය සහ ප්‍රතිශක්තිකරණ විද්‍යාවේ දියුණුවට වැදගත් පදනමක් සැපයීය.",
        "බෝවන රෝග වැළැක්වීම සහ ලොව පුරා මිලියන ගණනකගේ ජීවිත ආරක්ෂා කිරීමට මග පෑදූ එන්නත්කරණ වැඩසටහන්වල වර්ධනයට දායක විය.",
      ],
      timeline: [{ year: "1796", event: "ජේම්ස් ෆිප්ස් (James Phipps) නම් අට හැවිරිදි දරුවෙකු යොදාගෙන ගව වසූරිය පිළිබඳ පර්යේෂණය සිදු කළේය." }],
      facts: [
        "ගව වසූරිය සහ වසූරිය අතර ඇති සම්බන්ධය ජෙනර්ගේ සොයාගැනීමට මග පෙන්විය.",
        "ගව වසූරිය වැළඳුණු කිරි දොවන කාන්තාවන්ට වසූරිය රෝගය වැළඳීමේ අවදානම අඩු බවට පැවති නිරීක්ෂණ ජෙනර්ගේ පර්යේෂණයට මග පෙන්විය.",
        "1796 වර්ෂයේදී ඔහු ජේම්ස් ෆිප්ස් (James Phipps) නම් අට හැවිරිදි දරුවෙකු යොදාගෙන සිය ප්‍රසිද්ධ පර්යේෂණය සිදු කළේය. එවැනි පර්යේෂණයක් අද පවතින වෛද්‍ය පර්යේෂණ ආචාරධර්ම අනුව පිළිගත නොහැකිය.",
      ],
      portraitAlt: "එඩ්වඩ් ජෙනර්ගේ සේපියා වර්ණ චිත්‍රයකි; රැළි සහිත කෙස් ඇති, උස් සුදු කරපටියක් සහ තද පැහැති කබායක් ඇඳි පුද්ගලයෙකි.",
    },
  },
  {
    slug: "ignaz-semmelweis",
    sortOrder: 5,
    portraitUrl: null,
    portraitAttribution: null,
    portraitLicense: null,
    sources: [],
    en: {
      name: "Ignaz Semmelweis",
      lifeDates: "1818 – 1865",
      field: "Pioneer of Hand Hygiene",
      introduction: "Ignaz Semmelweis was a Hungarian physician. He was a pioneer who showed that the spread of infection between patients can be reduced if doctors clean their hands. His discoveries were important in reducing the severe infections and deaths that mothers suffered after childbirth.",
      biography:
        "In 1847, Semmelweis introduced the rule that doctors working in maternity wards must clean their hands with a solution containing chlorine before examining patients. As a result, severe infections and deaths among mothers fell significantly.\n\nIn those days many mothers died from infections after childbirth. By introducing a method of hand cleaning, Semmelweis showed that the number of these deaths could be greatly reduced.\n\nHe realised that doctors' hands could carry disease-causing material to patients. This later became an important foundation for the development of hand hygiene and infection-control methods in hospitals.",
      contributions: [
        "Showed that hospital infections can be reduced by cleaning the hands.",
        "Contributed to reducing infections and deaths among mothers after childbirth.",
        "Provided an important foundation for modern hospital hygiene and infection-control methods.",
      ],
      timeline: [{ year: "1847", event: "Introduces cleaning of hands with a chlorine solution before examining patients in maternity wards." }],
      facts: [
        "Cleaning hands made it possible to greatly reduce the death rate of mothers!",
        "Cases were recorded in which, because of the hand-cleaning method Semmelweis introduced in 1847, the death rate among mothers in the maternity ward where he worked fell from more than 10% to below 2%.",
        "However, during his lifetime many doctors did not accept his ideas. Later, as scientific knowledge about germs grew, the importance of hand hygiene came to be widely accepted.",
      ],
      portraitAlt: "Sepia portrait of Ignaz Semmelweis, a balding man with a moustache, wearing a dark jacket and a bow tie.",
    },
    si: {
      name: "ඉග්නාස් සෙමෙල්වයිස්",
      lifeDates: "ක්‍රි.ව. 1818 - 1865",
      field: "අත් සනීපාරක්ෂාවේ පුරෝගාමියා",
      introduction: "ඉග්නාස් සෙමෙල්වයිස් යනු හංගේරියානු ජාතික වෛද්‍යවරයෙකි. වෛද්‍යවරුන් අත් පිරිසිදු කිරීම මගින් රෝගීන් අතර ආසාදන පැතිරීම අවම කළ හැකි බව පෙන්වා දුන් පුරෝගාමියෙකි. විශේෂයෙන් දරු ප්‍රසූතියෙන් පසු මව්වරුන්ට ඇතිවන දරුණු ආසාදන සහ මරණ අඩු කිරීමට ඔහුගේ සොයාගැනීම් වැදගත් විය.",
      biography:
        "1847 වර්ෂයේදී සෙමෙල්වයිස්, දරු ප්‍රසූති වාට්ටුවල සේවය කරන වෛද්‍යවරුන් රෝගීන් පරීක්ෂා කිරීමට පෙර ක්ලෝරීන් අඩංගු ද්‍රාවණයකින් අත් පිරිසිදු කළ යුතු බව හඳුන්වා දුන්නේය. එමගින් මව්වරුන් අතර ඇතිවන දරුණු ආසාදන සහ මරණ සැලකිය යුතු ලෙස අඩු විය.\n\nඑකල දරු ප්‍රසූතියෙන් පසු ඇතිවන ආසාදන හේතුවෙන් බොහෝ මව්වරු මිය ගියහ. සෙමෙල්වයිස් විසින් අත් පිරිසිදු කිරීමේ ක්‍රමයක් හඳුන්වා දීමෙන් එම මරණ සංඛ්‍යාව විශාල ලෙස අඩු කළ හැකි බව පෙන්වා දුන්නේය.\n\nවෛද්‍යවරුන්ගේ අත් මගින් රෝග ඇති කරන ද්‍රව්‍ය රෝගීන් වෙත ගෙන යා හැකි බව ඔහු අවබෝධ කර ගත්තේය. මෙය පසුකාලීනව රෝහල්වල අත් සනීපාරක්ෂාව සහ ආසාදන පාලන ක්‍රම වර්ධනය වීමට වැදගත් පදනමක් විය.",
      contributions: [
        "අත් පිරිසිදු කිරීම මගින් රෝහල් ආසාදන අඩු කළ හැකි බව පෙන්වා දුන්නේය.",
        "දරු ප්‍රසූතියෙන් පසු මව්වරුන්ගේ ආසාදන සහ මරණ අඩු කිරීමට දායක විය.",
        "නූතන රෝහල් සනීපාරක්ෂාව සහ ආසාදන පාලන ක්‍රම වර්ධනය කිරීමට වැදගත් පදනමක් සැපයීය.",
      ],
      timeline: [{ year: "1847", event: "දරු ප්‍රසූති වාට්ටුවල රෝගීන් පරීක්ෂා කිරීමට පෙර ක්ලෝරීන් ද්‍රාවණයකින් අත් පිරිසිදු කිරීම හඳුන්වා දුන්නේය." }],
      facts: [
        "අත් පිරිසිදු කිරීමෙන් මව්වරුන්ගේ මරණ අනුපාතය විශාල ලෙස අඩු කිරීමට හැකි විය!",
        "1847 වර්ෂයේදී සෙමෙල්වයිස් හඳුන්වා දුන් අත් පිරිසිදු කිරීමේ ක්‍රමය නිසා ඔහු සේවය කළ ප්‍රසූති වාට්ටුවේ මව්වරුන්ගේ මරණ අනුපාතය 10%කට වැඩි මට්ටමක සිට 2%කට අඩු මට්ටමකට පහත වැටුණු අවස්ථා වාර්තා විය.",
        "එහෙත් ඔහු ජීවත් වූ කාලයේ බොහෝ වෛද්‍යවරුන් ඔහුගේ අදහස් පිළිගත්තේ නැත. පසුකාලීනව විෂබීජ පිළිබඳ විද්‍යාත්මක දැනුම වර්ධනය වීමත් සමග අත් සනීපාරක්ෂාවේ වැදගත්කම පුළුල් ලෙස පිළිගැනීමට ලක් විය.",
      ],
      portraitAlt: "ඉග්නාස් සෙමෙල්වයිස්ගේ සේපියා වර්ණ චිත්‍රයකි; හිස පැත්තෙන් තට්ටය ඇති, උඩු රැවුලක් සහිත, තද පැහැති ජාකට්ටුවක් සහ බෝ ටයි එකක් ඇඳි පුද්ගලයෙකි.",
    },
  },
  {
    slug: "florence-nightingale",
    sortOrder: 6,
    portraitUrl: null,
    portraitAttribution: null,
    portraitLicense: null,
    sources: [],
    en: {
      name: "Florence Nightingale",
      lifeDates: "1820 – 1910",
      field: "Founder of Modern Nursing",
      introduction: "Florence Nightingale was a British nurse, a social reformer and a pioneer of statistical analysis. She made a great contribution to giving patients proper care, keeping hospitals clean and making nursing a formal profession.",
      biography:
        "She paid attention to patients' physical health as well as their mental comfort. She recognised patients' needs and showed the importance of caring for them with respect and compassion.\n\nIn 1860 she started a nurse training school attached to St Thomas' Hospital in London. In this way she contributed to giving nurses formal training and raising the professional standards of nursing.\n\nDuring the Crimean War (1853–1856) she worked to improve sanitary conditions in the hospitals that treated wounded soldiers. She stressed that clean water, clean air, proper food and a clean hospital environment are important for patients' recovery.",
      contributions: [
        "Contributed to developing modern nursing as a formal profession.",
        "Showed the importance of improving hospital sanitation and patient care.",
        "Provided an important foundation for nursing education, patient safety and public health.",
      ],
      timeline: [
        { year: "1853–1856", event: "During the Crimean War, works to improve sanitary conditions in hospitals treating wounded soldiers." },
        { year: "1860", event: "Starts a nurse training school attached to St Thomas' Hospital, London." },
      ],
      facts: [
        "Florence Nightingale became famous as “The Lady with the Lamp”, the woman who carries a lamp.",
        "She received this name because, during the Crimean War, she went round at night carrying a lamp to check on the condition of the sick soldiers.",
        "Using statistics and diagrams, she explained the causes of soldiers' deaths. This information helped show the need to improve hospital sanitation.",
      ],
      portraitAlt: "Sepia portrait of Florence Nightingale, a woman with hair parted in the centre, wearing a lace cap and a dark dress with a white collar.",
    },
    si: {
      name: "ෆ්ලොරන්ස් නයිටිංගේල්",
      lifeDates: "ක්‍රි.ව. 1820 - 1910",
      field: "නූතන හෙද සේවයේ නිර්මාතෘවරිය",
      introduction: "ෆ්ලොරන්ස් නයිටිංගේල් යනු බ්‍රිතාන්‍ය ජාතික හෙදියකි, සමාජ ප්‍රතිසංස්කරණවාදිනියක සහ සංඛ්‍යාලේඛන විශ්ලේෂණයේ පුරෝගාමිනියකි. රෝගීන්ට නිසි සත්කාර ලබා දීම, රෝහල් පිරිසිදුව තබා ගැනීම සහ හෙද සේවාව විධිමත් වෘත්තියක් බවට පත් කිරීම සඳහා ඇය විශාල දායකත්වයක් ලබා දුන්නාය.",
      biography:
        "රෝගීන්ගේ ශාරීරික සෞඛ්‍යය මෙන්ම මානසික සුවපහසුව පිළිබඳවද අවධානය යොමු කළාය. රෝගීන්ගේ අවශ්‍යතා හඳුනාගෙන ඔවුන්ට ගෞරවයෙන් සහ කරුණාවෙන් සත්කාර කිරීමේ වැදගත්කම පෙන්වා දුන්නාය.\n\n1860 වර්ෂයේදී ලන්ඩනයේ ශාන්ත තෝමස් රෝහල ආශ්‍රිතව හෙද පුහුණු පාසලක් ආරම්භ කළාය. එමගින් හෙදියන්ට විධිමත් පුහුණුවක් ලබා දීම සහ හෙද සේවාවේ වෘත්තීය ප්‍රමිතීන් ඉහළ නැංවීමට දායක වූවාය.\n\nක්‍රීමියානු යුද්ධය (1853–1856) පැවති කාලයේදී තුවාල ලැබූ සෙබළුන්ට ප්‍රතිකාර කළ රෝහල්වල සනීපාරක්ෂක තත්ත්වයන් වැඩිදියුණු කිරීමට ඇය කටයුතු කළාය. පිරිසිදු ජලය, පිරිසිදු වාතය, නිසි ආහාර සහ රෝහල් පරිසරයේ පිරිසිදුකම රෝගීන්ගේ සුවය සඳහා වැදගත් බව අවධාරණය කළාය.",
      contributions: [
        "නූතන හෙද සේවාව විධිමත් වෘත්තියක් ලෙස වර්ධනය කිරීමට දායක වූවාය.",
        "රෝහල් සනීපාරක්ෂාව සහ රෝගී සත්කාර වැඩිදියුණු කිරීමේ වැදගත්කම පෙන්වා දුන්නාය.",
        "හෙද අධ්‍යාපනය, රෝගීන්ගේ ආරක්ෂාව සහ මහජන සෞඛ්‍ය දියුණු කිරීමට වැදගත් පදනමක් සැපයුවාය.",
      ],
      timeline: [
        { year: "1853–1856", event: "ක්‍රීමියානු යුද්ධය පැවති කාලයේදී තුවාල ලැබූ සෙබළුන්ට ප්‍රතිකාර කළ රෝහල්වල සනීපාරක්ෂක තත්ත්වයන් වැඩිදියුණු කිරීමට කටයුතු කළාය." },
        { year: "1860", event: "ලන්ඩනයේ ශාන්ත තෝමස් රෝහල ආශ්‍රිතව හෙද පුහුණු පාසලක් ආරම්භ කළාය." },
      ],
      facts: [
        "පහනක් රැගෙන යන කාන්තාව (The Lady with the Lamp) යන නාමයෙන් ෆ්ලොරන්ස් නයිටිංගේල් ප්‍රසිද්ධියට පත්විය.",
        "ක්‍රීමියානු යුද්ධය අතරතුර රාත්‍රී කාලයේ පහනක් රැගෙන රෝගී සෙබළුන්ගේ තත්ත්වය සොයා බැලූ නිසා ඇයට මෙම නාමය ලැබුණි.",
        "ඇය සංඛ්‍යාලේඛන සහ රූප සටහන් භාවිත කරමින් සෙබළුන්ගේ මරණවලට බලපෑ හේතු පැහැදිලි කළාය. එම තොරතුරු රෝහල් සනීපාරක්ෂාව වැඩිදියුණු කිරීමේ අවශ්‍යතාව පෙන්වා දීමට උපකාරී විය.",
      ],
      portraitAlt: "ෆ්ලොරන්ස් නයිටිංගේල්ගේ සේපියා වර්ණ චිත්‍රයකි; මැදින් බෙදූ කෙස් ඇති, ලේස් තොප්පියක් සහ සුදු කරපටියක් සහිත තද පැහැති ගවුමක් ඇඳි කාන්තාවකි.",
    },
  },
  {
    slug: "galen",
    sortOrder: 7,
    portraitUrl: null,
    portraitAttribution: null,
    portraitLicense: null,
    sources: [],
    en: {
      name: "Galen",
      lifeDates: "c. 129 – 216 CE",
      field: "A pioneer of physiology and anatomy",
      introduction: "Galen was a famous physician who lived in the era of ancient Rome. He made a great contribution to developing knowledge about the structure of the organs of the human body and how they work.",
      biography:
        "By dissecting animals, he studied the heart, the brain, the muscles and the nervous system.\n\nHe showed through research that damage to the nerves can change the body's movements and sensations.\n\nThe medical books he wrote influenced medical education for centuries.",
      contributions: [
        "Increased scientific understanding of how the human body functions.",
        "Provided a foundation for the advancement of physiology and anatomy.",
      ],
      timeline: [],
      facts: [
        "Galen's medical ideas influenced medical education in Europe and other regions for more than 1,000 years.",
        "However, some of his ideas were later shown to be wrong by subsequent research.",
      ],
      portraitAlt: "Sepia portrait of Galen, a bearded man with curly hair in a draped robe, shown in profile.",
    },
    si: {
      name: "ගැලන්",
      lifeDates: "ක්‍රි.ව. 129 - 216 පමණ",
      field: "කායික විද්‍යාවේ හා ව්‍යුහ විද්‍යාවේ පුරෝගාමියෙක්",
      introduction: "ගැලන් යනු පුරාණ රෝම යුගයේ ජීවත් වූ ප්‍රසිද්ධ වෛද්‍යවරයෙකි. මිනිස් සිරුරේ අවයවවල ව්‍යුහය සහ ඒවා ක්‍රියා කරන ආකාරය පිළිබඳ දැනුම වර්ධනය කිරීමට ඔහු විශාල දායකත්වයක් ලබා දුන්නේය.",
      biography:
        "සතුන්ගේ සිරුරු විච්ඡේදනය කරමින් හදවත, මොළය, මාංශපේශී සහ ස්නායු පද්ධතිය පිළිබඳ අධ්‍යයනය කළේය.\n\nස්නායුවලට හානි සිදුවීමෙන් ශරීරයේ චලනයන් සහ සංවේදනයන් වෙනස් විය හැකි බව පර්යේෂණ මගින් පෙන්වා දුන්නේය.\n\nඔහු රචනා කළ වෛද්‍ය ග්‍රන්ථ සියවස් ගණනාවක් පුරා වෛද්‍ය අධ්‍යාපනයට බලපෑවේය.",
      contributions: [
        "මිනිස් සිරුරේ ක්‍රියාකාරීත්වය පිළිබඳ විද්‍යාත්මක අවබෝධය වැඩි කිරීමට දායක විය.",
        "කායික විද්‍යාව හා ව්‍යුහ විද්‍යාවේ දියුණුවට පදනම සැපයීය.",
      ],
      timeline: [],
      facts: [
        "ගැලන්ගේ වෛද්‍ය අදහස් වසර 1,000කට වැඩි කාලයක් යුරෝපයේ සහ වෙනත් ප්‍රදේශවල වෛද්‍ය අධ්‍යාපනයට බලපෑවේය.",
        "කෙසේ වෙතත්, ඔහුගේ ඇතැම් අදහස් පසුකාලීන පර්යේෂණ මගින් වැරදි බව තහවුරු විය.",
      ],
      portraitAlt: "ගැලන්ගේ සේපියා වර්ණ චිත්‍රයකි; රැළි ගැසූ සළුවක් පොරවා සිටින, කොරදිගු කෙස් සහ රැවුල් සහිත පුද්ගලයෙකු පැති මුහුණතකින් දැක්වේ.",
    },
  },
  {
    slug: "hippocrates",
    sortOrder: 8,
    portraitUrl: null,
    portraitAttribution: null,
    portraitLicense: null,
    sources: [],
    en: {
      name: "Hippocrates",
      lifeDates: "460 – c. 370 BCE",
      field: "Father of Medicine",
      introduction: "Through clinical observation, ethics and humane service, Hippocrates made an important contribution to the advancement of medicine.",
      biography:
        "He showed the importance of identifying disease by carefully observing patients' symptoms and physical changes.\n\nHe stressed the importance of treating patients with respect, acting for their good, and following the ethics of the medical profession.\n\nHe tried to explain that disease can arise not only from mysterious forces but also from natural factors such as the environment, food and way of life.",
      contributions: [
        "Laid an important foundation for the ethics and responsibilities of the medical profession.",
        "Showed the importance of identifying disease by observing patients' symptoms and physical condition.",
        "Made an important contribution to developing the basic concepts of modern medicine.",
      ],
      timeline: [],
      facts: ["The Hippocratic Oath, a guide to the ethics of the medical profession, is associated with his name."],
      portraitAlt: "Sepia portrait of Hippocrates, a bald, bearded older man wearing a draped robe fastened at the shoulder.",
    },
    si: {
      name: "හිපොක්‍රටීස්",
      lifeDates: "ක්‍රි.පූ. 460 - ක්‍රි.පූ. 370 පමණ",
      field: "වෛද්‍ය විද්‍යාවේ පියා",
      introduction: "සායනික නිරීක්ෂණය, ආචාරධර්ම සහ මානුෂීය සේවය තුළින් වෛද්‍ය විද්‍යාවේ දියුණුවට හිපොක්‍රටීස් වැදගත් පදනමක් සැපයීය.",
      biography:
        "රෝගීන්ගේ රෝග ලක්ෂණ සහ ශාරීරික වෙනස්කම් සැලකිල්ලෙන් නිරීක්ෂණය කරමින් රෝග හඳුනාගැනීමේ වැදගත්කම පෙන්වා දුන්නේය.\n\nරෝගීන්ට ගෞරවයෙන් සැලකීම, ඔවුන්ගේ යහපත වෙනුවෙන් ක්‍රියා කිරීම සහ වෛද්‍ය වෘත්තියේ ආචාරධර්ම පිළිපැදීමේ වැදගත්කම අවධාරණය කළේය.\n\nරෝග ඇතිවන්නේ අද්භූත බලවේග නිසා පමණක් නොව, පරිසරය, ආහාර සහ ජීවන රටාව වැනි ස්වාභාවික සාධක නිසාද විය හැකි බව පැහැදිලි කිරීමට උත්සාහ කළේය.",
      contributions: [
        "වෛද්‍ය වෘත්තියේ ආචාරධර්ම සහ වගකීම් පිළිබඳ වැදගත් පදනමක් ඇති කළේය.",
        "රෝගීන්ගේ රෝග ලක්ෂණ සහ ශාරීරික තත්ත්වය නිරීක්ෂණය කරමින් රෝග හඳුනාගැනීමේ වැදගත්කම පෙන්වා දුන්නේය.",
        "නවීන වෛද්‍ය විද්‍යාවේ මූලික සංකල්ප වර්ධනය කිරීමට වැදගත් දායකත්වයක් ලබා දුන්නේය.",
      ],
      timeline: [],
      facts: ["වෛද්‍යවෘත්තියේ ආචාරධර්ම පිළිබඳ මාර්ගෝපදේශයක් වන හිපොක්‍රටීස් දිවුරුම (Hippocratic Oath) ඔහුගේ නම සමග සම්බන්ධ වේ."],
      portraitAlt: "හිපොක්‍රටීස්ගේ සේපියා වර්ණ චිත්‍රයකි; හිස කෙස් නැති, රැවුල් සහිත වැඩිහිටි පුද්ගලයෙක් උරහිසෙහි ගැට ගසා ඇති රැළි ගැසූ සළුවක් පොරවා සිටී.",
    },
  },
  {
    slug: "ibn-sina",
    sortOrder: 9,
    portraitUrl: null,
    portraitAttribution: null,
    portraitLicense: null,
    sources: [],
    en: {
      name: "Ibn Sina (Avicenna)",
      lifeDates: "980 – 1037",
      field: "An outstanding scholar of medicine",
      introduction: "Ibn Sina was a Persian physician, philosopher and scholar. He made important contributions to many fields, including medicine, philosophy and the natural sciences. He became famous especially for diagnosing diseases, treating them and organising medical knowledge in a systematic way.",
      biography:
        "He wrote the famous medical book The Canon of Medicine (Al-Qanun fi al-Tibb). It presented, in an orderly way, the medical knowledge of the time about diseases, symptoms, medicines and treatment methods.\n\nHe stressed the importance of diagnosing disease by taking into account a patient's symptoms, physical condition and medical history. He also compiled knowledge about treatments and medicines that can be used for various diseases.\n\nHis medical book was used for medical education in Europe and Asia for centuries. It was important in carrying medical knowledge from generation to generation.",
      contributions: [
        "Organised medical knowledge systematically and helped spread it around the world.",
        "Had a long-lasting influence on the development of medical education.",
      ],
      timeline: [],
      facts: [
        "The Canon of Medicine, written by Ibn Sina, was used for centuries in the medical education of universities in Europe.",
        "He contributed not only to medicine but also to fields such as philosophy, mathematics and astronomy.",
      ],
      portraitAlt: "Sepia portrait of Ibn Sina, a bearded man in a wrapped turban and a patterned robe, shown in profile.",
    },
    si: {
      name: "ඉබ්න් සීනා (Avicenna)",
      lifeDates: "ක්‍රි.ව. 980 - 1037",
      field: "වෛද්‍ය විද්‍යාවේ විශිෂ්ට විද්වතෙක්",
      introduction: "ඉබ්න් සීනා යනු පර්සියානු ජාතික වෛද්‍යවරයෙකු, දාර්ශනිකයෙකු සහ විද්වතෙකි. වෛද්‍ය විද්‍යාව, දර්ශනය සහ ස්වාභාවික විද්‍යාව ඇතුළු ක්ෂේත්‍ර රැසකට ඔහු වැදගත් දායකත්වයක් ලබා දුන්නේය. විශේෂයෙන් රෝග හඳුනාගැනීම, ප්‍රතිකාර කිරීම සහ වෛද්‍ය දැනුම ක්‍රමානුකූලව සකස් කිරීම සම්බන්ධයෙන් ඔහු ප්‍රසිද්ධියට පත්විය.",
      biography:
        "ඔහු විසින් The Canon of Medicine (අල්-කානුන් ෆී අල්-තිබ්) නම් ප්‍රසිද්ධ වෛද්‍ය ග්‍රන්ථය රචනා කරන ලදී. එහි රෝග, රෝග ලක්ෂණ, ඖෂධ සහ ප්‍රතිකාර ක්‍රම පිළිබඳ එවකට පැවති වෛද්‍ය දැනුම ක්‍රමානුකූලව ඉදිරිපත් කර තිබුණි.\n\nරෝගියෙකුගේ රෝග ලක්ෂණ, ශාරීරික තත්ත්වය සහ රෝග ඉතිහාසය සැලකිල්ලට ගනිමින් රෝග හඳුනාගැනීමේ වැදගත්කම ඔහු අවධාරණය කළේය. එසේම විවිධ රෝග සඳහා භාවිත කළ හැකි ප්‍රතිකාර සහ ඖෂධ පිළිබඳ දැනුම සම්පාදනය කළේය.\n\nඔහුගේ වෛද්‍ය ග්‍රන්ථය සියවස් ගණනාවක් පුරා යුරෝපයේ සහ ආසියාවේ වෛද්‍ය අධ්‍යාපනය සඳහා භාවිත විය. එය වෛද්‍ය දැනුම පරම්පරාවෙන් පරම්පරාවට ගෙන යාමට වැදගත් විය.",
      contributions: [
        "වෛද්‍ය දැනුම ක්‍රමානුකූලව සකස් කර ලොව පුරා පැතිරවීමට මග සැලසීය.",
        "වෛද්‍ය අධ්‍යාපනයේ වර්ධනයට දීර්ඝකාලීන බලපෑමක් ඇති කළේය.",
      ],
      timeline: [],
      facts: [
        "ඉබ්න් සීනා විසින් රචිත The Canon of Medicine ග්‍රන්ථය සියවස් ගණනාවක් පුරා යුරෝපයේ විශ්වවිද්‍යාලවල වෛද්‍ය අධ්‍යාපනය සඳහා භාවිත කර ඇත.",
        "ඔහු වෛද්‍ය විද්‍යාවට පමණක් නොව, දර්ශනය, ගණිතය සහ තාරකා විද්‍යාව වැනි විෂය ක්ෂේත්‍රවලටද දායකත්වය ලබා දුන්නේය.",
      ],
      portraitAlt: "ඉබ්න් සීනාගේ සේපියා වර්ණ චිත්‍රයකි; හිස වටා රෙදි ඔතා ඇති, සැරසිලි සහිත සළුවක් ඇඳි, රැවුල් සහිත පුද්ගලයෙකු පැති මුහුණතකින් දැක්වේ.",
    },
  },
  {
    slug: "marie-curie",
    sortOrder: 10,
    portraitUrl: null,
    portraitAttribution: null,
    portraitLicense: null,
    sources: [],
    en: {
      name: "Marie Curie",
      lifeDates: "1867 – 1934",
      field: "Pioneer of Radioactivity Research",
      introduction: "Marie Curie was an outstanding scientist who was born in Poland and carried out scientific research in France. She became world-famous for her research on radioactivity. She contributed to the discovery of the elements radium and polonium, and her research provided an important foundation for the advancement of the use of radiation in modern medicine.",
      biography:
        "In 1898, Marie Curie and her husband Pierre Curie announced the discovery of the radioactive elements polonium and radium. These discoveries helped to advance scientific knowledge about radioactivity.\n\nMarie Curie's research on radioactivity provided an important foundation for the development of methods that use radiation to treat cancer. The basic aim of radiation treatment is to destroy cancer cells with radiation or to control their growth.\n\nDuring the First World War she contributed to the use of vehicles fitted with portable X-ray machines to examine wounded soldiers. This made it easier for doctors to identify things inside the body such as broken bones and bullets.",
      contributions: [
        "Contributed to the discovery of the radioactive elements radium and polonium.",
        "Provided a scientific foundation for the development of radiation treatments for cancer.",
        "Contributed to the use of X-ray technology for medical treatment in war.",
        "Was a role model in opening new opportunities for women in science.",
      ],
      timeline: [
        { year: "1898", event: "With her husband Pierre Curie, announces the discovery of polonium and radium." },
        { year: "1903", event: "Shares the Nobel Prize in Physics, for research on radiation, with Pierre Curie and Henri Becquerel." },
        { year: "1911", event: "Awarded the Nobel Prize in Chemistry, including for the discovery of radium and polonium." },
      ],
      facts: [
        "Marie Curie was the first person to win two Nobel Prizes!",
        "1903 – She shared the Nobel Prize in Physics, for research on radiation, with Pierre Curie and Henri Becquerel.",
        "1911 – She was awarded the Nobel Prize in Chemistry for her contribution to chemistry, including the discovery of radium and polonium.",
        "She also remains in history as the only person to have won Nobel Prizes in two different fields of science.",
      ],
      portraitAlt: "Sepia portrait of Marie Curie, a woman with her hair pinned up, wearing a dark high-collared dress.",
    },
    si: {
      name: "මාරි කියුරි",
      lifeDates: "ක්‍රි.ව. 1867 - 1934",
      field: "විකිරණශීලිතාව පිළිබඳ පර්යේෂණවල පුරෝගාමිනිය",
      introduction: "මාරි කියුරි යනු පෝලන්තයේ උපත ලබා ප්‍රංශයේ විද්‍යාත්මක පර්යේෂණ සිදු කළ විශිෂ්ට විද්‍යාඥවරියකි. විකිරණශීලිතාව (Radioactivity) පිළිබඳ පර්යේෂණවලින් ඇය ලෝක ප්‍රසිද්ධියට පත් වූවාය. රේඩියම් (Radium) සහ පොලෝනියම් (Polonium) යන මූලද්‍රව්‍ය සොයාගැනීමට ඇය දායක වූ අතර, ඇයගේ පර්යේෂණ නූතන වෛද්‍ය විද්‍යාවේ විකිරණ භාවිතය දියුණු වීමට වැදගත් පදනමක් සැපයීය.",
      biography:
        "1898 වර්ෂයේදී මාරි කියුරි සහ ඇයගේ සැමියා වූ පියරේ කියුරි (Pierre Curie), පොලෝනියම් සහ රේඩියම් යන විකිරණශීලි මූලද්‍රව්‍ය සොයාගැනීම ප්‍රකාශයට පත් කළහ. මෙම සොයාගැනීම් විකිරණශීලිතාව පිළිබඳ විද්‍යාත්මක දැනුම වර්ධනය කිරීමට උපකාරී විය.\n\nමාරි කියුරීගේ විකිරණශීලිතාව පිළිබඳ පර්යේෂණ පිළිකා ප්‍රතිකාර සඳහා විකිරණ භාවිත කරන ක්‍රම දියුණු වීමට වැදගත් පදනමක් සැපයීය. විකිරණ භාවිතයෙන් පිළිකා සෛල විනාශ කිරීම හෝ ඒවායේ වර්ධනය පාලනය කිරීම විකිරණ ප්‍රතිකාරයේ මූලික අරමුණකි.\n\nපළමු ලෝක යුද්ධය පැවති කාලයේදී තුවාල ලැබූ සෙබළුන් පරීක්ෂා කිරීම සඳහා ගෙන යා හැකි X-ray යන්ත්‍ර සහිත වාහන භාවිතයට ගැනීමට ඇය දායක වූවාය. එමගින් වෛද්‍යවරුන්ට ශරීරය තුළ ඇති අස්ථි බිඳීම් සහ උණ්ඩ වැනි දේ හඳුනාගැනීම පහසු විය.",
      contributions: [
        "රේඩියම් සහ පොලෝනියම් යන විකිරණශීලි මූලද්‍රව්‍ය සොයාගැනීමට දායක වූවාය.",
        "පිළිකා සඳහා විකිරණ ප්‍රතිකාර ක්‍රම දියුණු වීමට විද්‍යාත්මක පදනමක් සැපයුවාය.",
        "X-ray තාක්ෂණය යුද්ධයේදී වෛද්‍ය ප්‍රතිකාර සඳහා භාවිත කිරීමට දායක වූවාය.",
        "විද්‍යා ක්ෂේත්‍රයේ කාන්තාවන්ට නව අවස්ථා විවෘත කිරීමට ආදර්ශයක් වූවාය.",
      ],
      timeline: [
        { year: "1898", event: "සැමියා වූ පියරේ කියුරි සමග පොලෝනියම් සහ රේඩියම් සොයාගැනීම ප්‍රකාශයට පත් කළාය." },
        { year: "1903", event: "විකිරණ පිළිබඳ පර්යේෂණ වෙනුවෙන් පියරේ කියුරි සහ හෙන්රි බෙකරෙල් සමග භෞතික විද්‍යාව සඳහා නොබෙල් ත්‍යාගය බෙදා ගත්තාය." },
        { year: "1911", event: "රේඩියම් සහ පොලෝනියම් සොයාගැනීම ඇතුළු රසායන විද්‍යාවට කළ දායකත්වය වෙනුවෙන් රසායන විද්‍යාව සඳහා නොබෙල් ත්‍යාගය හිමි විය." },
      ],
      facts: [
        "මාරි කියුරි නොබෙල් ත්‍යාග දෙකක් දිනාගත් පළමු පුද්ගලයා වූවාය!",
        "1903 – භෞතික විද්‍යාව සඳහා නොබෙල් ත්‍යාගය විකිරණ පිළිබඳ පර්යේෂණ වෙනුවෙන් පියරේ කියුරි සහ හෙන්රි බෙකරෙල් සමග බෙදා ගත්තාය.",
        "1911 – රසායන විද්‍යාව සඳහා නොබෙල් ත්‍යාගය රේඩියම් සහ පොලෝනියම් සොයාගැනීම ඇතුළු රසායන විද්‍යාවට කළ දායකත්වය වෙනුවෙන් හිමි විය.",
        "ඇය විවිධ විද්‍යා ක්ෂේත්‍ර දෙකක නොබෙල් ත්‍යාග දිනාගත් එකම පුද්ගලයා ලෙසද ඉතිහාසයට එක්ව සිටී.",
      ],
      portraitAlt: "මාරි කියුරිගේ සේපියා වර්ණ ඡායාරූපයකි; කෙස් උඩට බැඳ ඇති, උස් කරපටියක් සහිත තද පැහැති ගවුමක් ඇඳි කාන්තාවකි.",
    },
  },
  {
    slug: "robert-koch",
    sortOrder: 11,
    portraitUrl: null,
    portraitAttribution: null,
    portraitLicense: null,
    sources: [],
    en: {
      name: "Robert Koch",
      lifeDates: "1843 – 1910",
      field: "Pioneer of Modern Bacteriology",
      introduction: "Robert Koch was a famous physician and scientist who lived in Germany. He made a great contribution to establishing scientifically that infectious diseases are caused by microorganisms. Among his most important discoveries was the identification of the bacterium that causes tuberculosis.",
      biography:
        "In 1882, Robert Koch identified the bacterium Mycobacterium tuberculosis, which causes tuberculosis. With this he presented strong scientific evidence that tuberculosis is an infectious disease caused by a specific bacterium.\n\nHe carried out important research on the bacterium that causes anthrax. He also made an important contribution to identifying the bacterium that causes cholera.\n\nHe introduced scientific principles for confirming that a particular microorganism causes a particular disease. These principles are known as Koch's Postulates.",
      contributions: [
        "Identified the bacterium that causes tuberculosis.",
        "Developed scientific methods for identifying the microorganisms that cause infectious diseases.",
        "Provided an important foundation for the development of modern microbiology, diagnosis and methods of controlling infectious diseases.",
      ],
      timeline: [
        { year: "1882", event: "Identifies the tuberculosis bacterium and announces his discovery on 24 March." },
        { year: "1905", event: "Awarded the Nobel Prize for Medicine for the discovery of the bacterium that causes tuberculosis." },
      ],
      facts: [
        "Robert Koch won the Nobel Prize for Medicine in 1905 for discovering the bacterium that causes tuberculosis.",
        "On 24 March 1882 he announced his discovery of the bacterium that causes tuberculosis.",
        "In memory of that historic day, 24 March is observed every year as World Tuberculosis Day.",
      ],
      portraitAlt: "Sepia portrait of Robert Koch, a balding man with round glasses and a full beard, wearing a dark jacket and a bow tie.",
    },
    si: {
      name: "රොබට් කොක්",
      lifeDates: "ක්‍රි.ව. 1843 - 1910",
      field: "නූතන බැක්ටීරියා විද්‍යාවේ පුරෝගාමියා",
      introduction: "රොබට් කොක් යනු ජර්මනියේ ජීවත් වූ ප්‍රසිද්ධ වෛද්‍යවරයෙකු සහ විද්‍යාඥයෙකි. ක්ෂුද්‍ර ජීවීන් මගින් බෝවන රෝග ඇතිවන බව විද්‍යාත්මකව තහවුරු කිරීමට ඔහු විශාල දායකත්වයක් ලබා දුන්නේය. විශේෂයෙන් ක්ෂය රෝගය (Tuberculosis) ඇති කරන බැක්ටීරියාව හඳුනාගැනීම ඔහුගේ වැදගත්ම සොයාගැනීම් අතර වේ.",
      biography:
        "1882 වර්ෂයේදී රොබට් කොක්, ක්ෂය රෝගය ඇති කරන Mycobacterium tuberculosis නම් බැක්ටීරියාව හඳුනාගත්තේය. එමගින් ක්ෂය රෝගය විශේෂිත බැක්ටීරියාවක් නිසා ඇතිවන බෝවන රෝගයක් බවට ප්‍රබල විද්‍යාත්මක සාක්ෂි ඉදිරිපත් කළේය.\n\nඇන්ත්‍රැක්ස් (Anthrax) රෝගය ඇති කරන බැක්ටීරියාව පිළිබඳ වැදගත් පර්යේෂණ සිදු කළේය. එසේම කොලරාව (Cholera) ඇති කරන බැක්ටීරියාව හඳුනාගැනීම සඳහාද වැදගත් දායකත්වයක් ලබා දුන්නේය.\n\nයම් ක්ෂුද්‍ර ජීවියෙකු විශේෂිත රෝගයක් ඇති කරන බව තහවුරු කිරීම සඳහා විද්‍යාත්මක මූලධර්ම හඳුන්වා දුන්නේය. මෙම මූලධර්ම Koch's Postulates ලෙස හැඳින්වේ.",
      contributions: [
        "ක්ෂය රෝගයට හේතුවන බැක්ටීරියාව හඳුනාගත්තේය.",
        "බෝවන රෝග ඇති කරන ක්ෂුද්‍ර ජීවීන් හඳුනාගැනීම සඳහා විද්‍යාත්මක ක්‍රමවේද දියුණු කළේය.",
        "නූතන ක්ෂුද්‍ර ජීව විද්‍යාව, රෝග විනිශ්චය සහ බෝවන රෝග පාලනය කිරීමේ ක්‍රම වර්ධනය කිරීමට වැදගත් පදනමක් සැපයීය.",
      ],
      timeline: [
        { year: "1882", event: "ක්ෂය රෝගය ඇති කරන බැක්ටීරියාව හඳුනාගෙන මාර්තු 24 වන දින සිය සොයාගැනීම ප්‍රකාශ කළේය." },
        { year: "1905", event: "ක්ෂය රෝගය ඇති කරන බැක්ටීරියාව සොයාගැනීම වෙනුවෙන් වෛද්‍ය විද්‍යාව සඳහා නොබෙල් ත්‍යාගය දිනා ගත්තේය." },
      ],
      facts: [
        "ක්ෂය රෝගය ඇති කරන බැක්ටීරියාව සොයාගැනීම වෙනුවෙන් රොබට් කොක් 1905 වර්ෂයේදී වෛද්‍ය විද්‍යාව සඳහා නොබෙල් ත්‍යාගය දිනා ගත්තේය.",
        "1882 මාර්තු 24 වන දින ඔහු ක්ෂය රෝගයට හේතුවන බැක්ටීරියාව පිළිබඳ සිය සොයාගැනීම ප්‍රකාශ කළේය.",
        "එම ඓතිහාසික දිනය සිහිපත් කරමින් සැම වසරකම මාර්තු 24 වන දින ලෝක ක්ෂය රෝග දිනය (World Tuberculosis Day) ලෙස සමරනු ලැබේ.",
      ],
      portraitAlt: "රොබට් කොක්ගේ සේපියා වර්ණ චිත්‍රයකි; හිස කෙස් විරල, රවුම් කණ්ණාඩි සහ ඝන රැවුලක් ඇති, තද පැහැති ජාකට්ටුවක් සහ බෝ ටයි එකක් ඇඳි පුද්ගලයෙකි.",
    },
  },
  {
    slug: "william-harvey",
    sortOrder: 12,
    portraitUrl: null,
    portraitAttribution: null,
    portraitLicense: null,
    sources: [],
    en: {
      name: "William Harvey",
      lifeDates: "1578 – 1657",
      field: "Pioneer of Blood Circulation",
      introduction: "William Harvey was a famous physician and physiologist who lived in England. With scientific evidence he explained that the heart pumps blood around the body, and that blood circulates again and again within a closed system. His research provided an important foundation for the advancement of modern cardiology and circulatory physiology.",
      biography:
        "He showed through research that the heart is an organ that pumps blood around the body. He explained that when the heart contracts, blood is pushed along the arteries to different parts of the body.\n\nHe showed that blood leaves the heart and returns to the heart. In this way he presented evidence that blood circulates continuously within the body.\n\nHe confirmed his ideas by observing how animals' hearts work and by studying the movement of blood in the blood vessels. To identify the direction in which blood travels, he also studied the valves in the veins.",
      contributions: [
        "Scientifically explained how the heart pumps blood.",
        "Showed that blood circulates around the body and returns to the heart.",
        "Provided an important foundation for the development of modern cardiology and circulatory physiology.",
      ],
      timeline: [{ year: "1628", event: "Publishes the famous book De Motu Cordis." }],
      facts: [
        "In 1628, William Harvey published the famous book De Motu Cordis. In it he presented the results of his research on how the heart works and how blood circulates.",
        "Before his discoveries, many mistaken ideas existed about how blood moves within the body. Harvey's research helped to change those ideas.",
      ],
      portraitAlt: "Sepia portrait of William Harvey, a man with a moustache and a pointed beard, wearing a wide white ruff collar.",
    },
    si: {
      name: "විලියම් හාවි",
      lifeDates: "ක්‍රි.ව. 1578 - 1657",
      field: "රුධිර සංසරණය පැහැදිලි කළ විද්‍යාඥයා",
      introduction: "විලියම් හාවි යනු එංගලන්තයේ ජීවත් වූ ප්‍රසිද්ධ වෛද්‍යවරයෙකු සහ කායික විද්‍යාඥයෙකි. හදවත මගින් රුධිරය ශරීරය පුරා පොම්ප කරන බවත්, රුධිරය සංවෘත පද්ධතියක් තුළ නැවත නැවත සංසරණය වන බවත් විද්‍යාත්මක සාක්ෂි මගින් පැහැදිලි කළේය. ඔහුගේ පර්යේෂණ නූතන හෘද හා රුධිර සංසරණ කායික විද්‍යාවේ දියුණුවට වැදගත් පදනමක් සැපයීය.",
      biography:
        "හදවත ශරීරය පුරා රුධිරය පොම්ප කරන අවයවයක් බව පර්යේෂණ මගින් පෙන්වා දුන්නේය. හදවත සංකෝචනය වන විට රුධිරය ධමනි ඔස්සේ ශරීරයේ විවිධ කොටස් වෙත ගමන් කරන බව පැහැදිලි කළේය.\n\nරුධිරය හදවතින් පිටතට ගමන් කර නැවත හදවත වෙත පැමිණෙන බව පෙන්වා දුන්නේය. එමගින් රුධිරය ශරීරය තුළ අඛණ්ඩව සංසරණය වන බවට සාක්ෂි ඉදිරිපත් කළේය.\n\nසතුන්ගේ හෘද ක්‍රියාකාරීත්වය නිරීක්ෂණය කිරීම සහ රුධිර නාලවල රුධිර ගමනාගමනය අධ්‍යයනය කිරීම මගින් සිය අදහස් තහවුරු කළේය. රුධිරය ගමන් කරන දිශාව හඳුනාගැනීමට ශිරාවල කපාට පිළිබඳවද අධ්‍යයනය කළේය.",
      contributions: [
        "හදවත රුධිරය පොම්ප කරන ආකාරය විද්‍යාත්මකව පැහැදිලි කළේය.",
        "රුධිරය ශරීරය පුරා සංසරණය වී නැවත හදවත වෙත පැමිණෙන බව පෙන්වා දුන්නේය.",
        "නූතන හෘද රෝග විද්‍යාව සහ රුධිර සංසරණ කායික විද්‍යාව වර්ධනය කිරීමට වැදගත් පදනමක් සැපයීය.",
      ],
      timeline: [{ year: "1628", event: "De Motu Cordis නම් ප්‍රසිද්ධ ග්‍රන්ථය ප්‍රකාශයට පත් කළේය." }],
      facts: [
        "විලියම් හාවි 1628 වර්ෂයේදී De Motu Cordis නම් ප්‍රසිද්ධ ග්‍රන්ථය ප්‍රකාශයට පත් කළේය. එහි හදවතේ ක්‍රියාකාරීත්වය සහ රුධිර සංසරණය පිළිබඳ සිය පර්යේෂණ ප්‍රතිඵල ඉදිරිපත් කළේය.",
        "ඔහුගේ සොයාගැනීම්වලට පෙර, රුධිරය ශරීරය තුළ ගමන් කරන ආකාරය පිළිබඳ වැරදි අදහස් රැසක් පැවතුණි. හාවිගේ පර්යේෂණ එම අදහස් වෙනස් කිරීමට උපකාරී විය.",
      ],
      portraitAlt: "විලියම් හාවිගේ සේපියා වර්ණ චිත්‍රයකි; උඩු රැවුලක් සහ උල් රැවුලක් ඇති, පළල් සුදු රැළි කරපටියක් පැළඳි පුද්ගලයෙකි.",
    },
  },
];
