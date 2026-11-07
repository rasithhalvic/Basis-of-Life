// SAMPLE pioneer records. The definitive list of 15 exhibition posters was not
// supplied, so these are well-known pioneers of medicine used as clearly
// labelled placeholders (dataOrigin = SAMPLE). Text is a draft for curators to
// verify, rewrite or replace. No portraits or image credits are included:
// licensed images must be supplied by the organizers.

interface T {
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
export interface SamplePioneer {
  slug: string;
  en: T;
  si: T;
  sources: { title: string; url: null }[];
}

const verify = (topic: string) => [
  { title: `Encyclopaedia Britannica — entry on ${topic} (verify edition and wording before publication)`, url: null },
  { title: "Curator to add primary or scholarly sources before publication", url: null },
];

const altEn = (name: string) => `Placeholder in place of a portrait of ${name}. A licensed portrait has not yet been supplied.`;
const altSi = (name: string) => `${name} ගේ ඡායාරූපය වෙනුවට තාවකාලික රූපයකි. බලපත්‍රලාභී ඡායාරූපයක් තවම ලැබී නැත.`;

function p(slug: string, en: Omit<T, "portraitAlt">, si: Omit<T, "portraitAlt">, topic: string): SamplePioneer {
  return {
    slug,
    en: { ...en, portraitAlt: altEn(en.name) },
    si: { ...si, portraitAlt: altSi(si.name) },
    sources: verify(topic),
  };
}

export const SAMPLE_PIONEERS: SamplePioneer[] = [
  p(
    "hippocrates",
    {
      name: "Hippocrates",
      lifeDates: "c. 460 – c. 370 BCE",
      field: "Clinical observation and medical ethics",
      introduction: "A physician of ancient Greece, often called the “Father of Medicine”, who taught that illness has natural causes.",
      biography:
        "Hippocrates was born on the Greek island of Kos. Little is known for certain about his life, but a large body of medical writings — the Hippocratic Corpus — was associated with his name and his school.\n\nThe Hippocratic tradition encouraged physicians to observe patients carefully, record symptoms and look for natural explanations of disease rather than supernatural ones.",
      contributions: [
        "Promoted the idea that diseases have natural rather than supernatural causes.",
        "Emphasised careful observation and recording of patients' symptoms.",
        "Associated with the Hippocratic Oath, an early statement of medical ethics.",
      ],
      timeline: [
        { year: "c. 460 BCE", event: "Born on the island of Kos." },
        { year: "5th–4th c. BCE", event: "Teaches medicine; the Hippocratic school develops." },
        { year: "c. 370 BCE", event: "Dies, traditionally said to be in Larissa, Thessaly." },
      ],
      facts: ["Many works in the Hippocratic Corpus were probably written by several different authors.", "Modern medical oaths are still inspired by the Hippocratic Oath."],
    },
    {
      name: "හිපොක්‍රටීස්",
      lifeDates: "ක්‍රි.පූ. 460 පමණ – ක්‍රි.පූ. 370 පමණ",
      field: "සායනික නිරීක්ෂණය සහ වෛද්‍ය ආචාරධර්ම",
      introduction: "රෝගවලට ස්වාභාවික හේතු ඇති බව ඉගැන්වූ, බොහෝ විට “වෛද්‍ය විද්‍යාවේ පියා” ලෙස හඳුන්වන පුරාණ ග්‍රීසියේ වෛද්‍යවරයෙකි.",
      biography:
        "හිපොක්‍රටීස් ග්‍රීසියේ කොස් දූපතේ උපත ලැබීය. ඔහුගේ ජීවිතය ගැන නිශ්චිතව දන්නා දේ ස්වල්පයක් වුවද, ඔහුගේ නමට සහ ඔහුගේ පාසලට සම්බන්ධ වූ වෛද්‍ය ලේඛන විශාල සංඛ්‍යාවක් — හිපොක්‍රටීස් සංග්‍රහය — පවතී.\n\nහිපොක්‍රටීස් සම්ප්‍රදාය රෝගීන් හොඳින් නිරීක්ෂණය කිරීමටත්, රෝග ලක්ෂණ සටහන් කිරීමටත්, රෝග සඳහා අද්භූත නොව ස්වාභාවික හේතු සෙවීමටත් වෛද්‍යවරුන් දිරිමත් කළේය.",
      contributions: [
        "රෝගවලට අද්භූත නොව ස්වාභාවික හේතු ඇති බවට අදහස ප්‍රවර්ධනය කළේය.",
        "රෝගීන්ගේ රෝග ලක්ෂණ හොඳින් නිරීක්ෂණය කර සටහන් කිරීම අවධාරණය කළේය.",
        "වෛද්‍ය ආචාරධර්ම පිළිබඳ මුල්ම ප්‍රකාශනයක් වන හිපොක්‍රටීස් දිවුරුම සමඟ සම්බන්ධ වේ.",
      ],
      timeline: [
        { year: "ක්‍රි.පූ. 460 පමණ", event: "කොස් දූපතේ උපත." },
        { year: "ක්‍රි.පූ. 5–4 සියවස", event: "වෛද්‍ය විද්‍යාව උගන්වයි; හිපොක්‍රටීස් පාසල වර්ධනය වේ." },
        { year: "ක්‍රි.පූ. 370 පමණ", event: "සම්ප්‍රදායට අනුව තෙසලියේ ලැරිසාහිදී මිය යයි." },
      ],
      facts: ["හිපොක්‍රටීස් සංග්‍රහයේ බොහෝ කෘති විවිධ කතුවරුන් කිහිප දෙනෙකු විසින් ලියන්නට ඇත.", "නූතන වෛද්‍ය දිවුරුම් තවමත් හිපොක්‍රටීස් දිවුරුමෙන් ආභාසය ලබයි."],
    },
    "Hippocrates",
  ),
  p(
    "sushruta",
    {
      name: "Sushruta",
      lifeDates: "Dates uncertain (ancient India)",
      field: "Surgery",
      introduction: "An ancient Indian physician traditionally named as the author of the Sushruta Samhita, a foundational text of surgery in Ayurveda.",
      biography:
        "Sushruta is traditionally regarded as a surgeon who taught in ancient India, often placed in Varanasi. Scholars disagree about when he lived, and the text that bears his name was revised over several centuries.\n\nThe Sushruta Samhita describes many surgical procedures and instruments, and gives guidance on training surgeons, including practising techniques on plants and other models.",
      contributions: [
        "The Sushruta Samhita describes a wide range of surgical procedures and instruments.",
        "Contains an early description of reconstructing the nose using a skin flap.",
        "Emphasised practical training for surgeons.",
      ],
      timeline: [
        { year: "Uncertain", event: "Traditionally said to teach surgery in ancient India." },
        { year: "Several centuries", event: "The Sushruta Samhita is compiled and revised." },
      ],
      facts: ["The text recommends practising incisions on vegetables such as gourds before operating on patients.", "Exact dates for Sushruta remain debated by historians."],
    },
    {
      name: "සුශ්‍රැත",
      lifeDates: "දින නිශ්චිත නැත (පුරාණ ඉන්දියාව)",
      field: "ශල්‍ය වෛද්‍ය විද්‍යාව",
      introduction: "ආයුර්වේදයේ ශල්‍යකර්ම පිළිබඳ මූලික ග්‍රන්ථයක් වන සුශ්‍රැත සංහිතාවේ කතුවරයා ලෙස සාම්ප්‍රදායිකව සැලකෙන පුරාණ ඉන්දියානු වෛද්‍යවරයෙකි.",
      biography:
        "සුශ්‍රැත සාම්ප්‍රදායිකව පුරාණ ඉන්දියාවේ, බොහෝ විට වාරාණසියේ, ඉගැන්වූ ශල්‍ය වෛද්‍යවරයෙකු ලෙස සැලකේ. ඔහු ජීවත් වූ කාලය ගැන විද්වතුන් අතර එකඟතාවයක් නැති අතර, ඔහුගේ නම දරන ග්‍රන්ථය සියවස් කිහිපයක් පුරා සංශෝධනය විය.\n\nසුශ්‍රැත සංහිතාව බොහෝ ශල්‍යකර්ම ක්‍රම සහ උපකරණ විස්තර කරන අතර, ශාක සහ වෙනත් ආකෘති මත ක්‍රම පුහුණු වීම ඇතුළුව ශල්‍ය වෛද්‍යවරුන් පුහුණු කිරීම පිළිබඳ මඟපෙන්වීම් ලබා දෙයි.",
      contributions: [
        "සුශ්‍රැත සංහිතාව පුළුල් පරාසයක ශල්‍යකර්ම ක්‍රම සහ උපකරණ විස්තර කරයි.",
        "සමේ කොටසක් භාවිතයෙන් නාසය ප්‍රතිනිර්මාණය කිරීම පිළිබඳ මුල්කාලීන විස්තරයක් අඩංගු වේ.",
        "ශල්‍ය වෛද්‍යවරුන් සඳහා ප්‍රායෝගික පුහුණුව අවධාරණය කළේය.",
      ],
      timeline: [
        { year: "නිශ්චිත නැත", event: "සම්ප්‍රදායට අනුව පුරාණ ඉන්දියාවේ ශල්‍ය වෛද්‍යය උගන්වයි." },
        { year: "සියවස් කිහිපයක්", event: "සුශ්‍රැත සංහිතාව සම්පාදනය කර සංශෝධනය කෙරේ." },
      ],
      facts: ["රෝගීන්ට ශල්‍යකර්ම කිරීමට පෙර ලබු වැනි එළවළු මත කැපුම් පුහුණු වන ලෙස ග්‍රන්ථය නිර්දේශ කරයි.", "සුශ්‍රැතගේ නිශ්චිත කාලය ඉතිහාසඥයින් අතර තවමත් විවාදාත්මකය."],
    },
    "Sushruta",
  ),
  p(
    "ibn-sina",
    {
      name: "Ibn Sina (Avicenna)",
      lifeDates: "c. 980 – 1037",
      field: "Medicine and philosophy",
      introduction: "A Persian physician and philosopher whose Canon of Medicine was used as a medical textbook for centuries.",
      biography:
        "Ibn Sina was born near Bukhara (in present-day Uzbekistan). He studied widely from a young age and practised as a physician while also writing on philosophy, science and mathematics.\n\nHis Canon of Medicine organised the medical knowledge of his time into a systematic encyclopaedia. Translated into Latin, it was taught in European universities for several centuries.",
      contributions: [
        "Wrote The Canon of Medicine, a systematic medical encyclopaedia.",
        "Discussed the testing of medicines and the contagious nature of some diseases.",
        "Influenced medical teaching in both the Islamic world and Europe.",
      ],
      timeline: [
        { year: "c. 980", event: "Born near Bukhara." },
        { year: "c. 1025", event: "Completes The Canon of Medicine (approximate date)." },
        { year: "1037", event: "Dies in Hamadan, Persia." },
      ],
      facts: ["He is said to have been treating patients while still a teenager.", "He wrote on many subjects besides medicine, including philosophy and astronomy."],
    },
    {
      name: "ඉබ්නු සීනා (ඇවිසෙනා)",
      lifeDates: "980 පමණ – 1037",
      field: "වෛද්‍ය විද්‍යාව සහ දර්ශනය",
      introduction: "ඔහුගේ ‘වෛද්‍ය විද්‍යාවේ ප්‍රමිතිය’ (Canon of Medicine) සියවස් ගණනාවක් වෛද්‍ය පෙළපොතක් ලෙස භාවිත වූ පර්සියානු වෛද්‍යවරයෙකු සහ දාර්ශනිකයෙකි.",
      biography:
        "ඉබ්නු සීනා බුඛාරා අසල (වර්තමාන උස්බෙකිස්තානයේ) උපත ලැබීය. කුඩා කල සිටම ඔහු පුළුල් ලෙස අධ්‍යාපනය ලැබූ අතර, දර්ශනය, විද්‍යාව සහ ගණිතය පිළිබඳව ලියමින් වෛද්‍යවරයෙකු ලෙසද කටයුතු කළේය.\n\nඔහුගේ ‘වෛද්‍ය විද්‍යාවේ ප්‍රමිතිය’ එකල වෛද්‍ය දැනුම ක්‍රමානුකූල විශ්වකෝෂයක් ලෙස සංවිධානය කළේය. ලතින් භාෂාවට පරිවර්තනය වූ එය සියවස් කිහිපයක් යුරෝපීය විශ්වවිද්‍යාලවල ඉගැන්විණි.",
      contributions: [
        "ක්‍රමානුකූල වෛද්‍ය විශ්වකෝෂයක් වන ‘වෛද්‍ය විද්‍යාවේ ප්‍රමිතිය’ ලිව්වේය.",
        "ඖෂධ පරීක්ෂා කිරීම සහ ඇතැම් රෝගවල බෝවන ස්වභාවය ගැන සාකච්ඡා කළේය.",
        "ඉස්ලාමීය ලෝකයේ සහ යුරෝපයේ වෛද්‍ය අධ්‍යාපනයට බලපෑම් කළේය.",
      ],
      timeline: [
        { year: "980 පමණ", event: "බුඛාරා අසල උපත." },
        { year: "1025 පමණ", event: "‘වෛද්‍ය විද්‍යාවේ ප්‍රමිතිය’ සම්පූර්ණ කරයි (ආසන්න දිනය)." },
        { year: "1037", event: "පර්සියාවේ හමදාන්හිදී මිය යයි." },
      ],
      facts: ["ඔහු යෞවන වියේදීම රෝගීන්ට ප්‍රතිකාර කළ බව කියැවේ.", "ඔහු වෛද්‍ය විද්‍යාවට අමතරව දර්ශනය සහ තාරකා විද්‍යාව ඇතුළු බොහෝ විෂයයන් ගැන ලිව්වේය."],
    },
    "Avicenna",
  ),
  p(
    "andreas-vesalius",
    {
      name: "Andreas Vesalius",
      lifeDates: "1514 – 1564",
      field: "Human anatomy",
      introduction: "A Flemish anatomist whose illustrated book of 1543 transformed the study of the human body.",
      biography:
        "Andreas Vesalius was born in Brussels and studied medicine in Leuven and Paris before teaching at the University of Padua.\n\nBy dissecting human bodies himself, he showed that several long-accepted descriptions based on animal anatomy were wrong. His book De humani corporis fabrica (1543), with its detailed illustrations, became a landmark of modern anatomy.",
      contributions: [
        "Published De humani corporis fabrica (On the Fabric of the Human Body) in 1543.",
        "Corrected errors in earlier anatomy that had been based on animal dissection.",
        "Championed learning anatomy through direct observation and dissection.",
      ],
      timeline: [
        { year: "1514", event: "Born in Brussels." },
        { year: "1537", event: "Begins teaching surgery and anatomy at Padua." },
        { year: "1543", event: "Publishes De humani corporis fabrica." },
        { year: "1564", event: "Dies on the Greek island of Zakynthos." },
      ],
      facts: ["The Fabrica's woodcut illustrations are admired as works of art as well as science.", "He later served as a physician to Emperor Charles V."],
    },
    {
      name: "ඇන්ඩ්‍රියාස් වෙසේලියස්",
      lifeDates: "1514 – 1564",
      field: "මිනිස් ශරීර ව්‍යුහ විද්‍යාව",
      introduction: "1543 දී ඔහු ප්‍රකාශයට පත් කළ සචිත්‍ර ග්‍රන්ථය මිනිස් සිරුර අධ්‍යයනය සම්පූර්ණයෙන්ම වෙනස් කළ ෆ්ලෙමිෂ් ශරීර ව්‍යුහ විද්‍යාඥයෙකි.",
      biography:
        "ඇන්ඩ්‍රියාස් වෙසේලියස් බ්‍රසල්ස්හි උපත ලැබූ අතර, පදුවා විශ්වවිද්‍යාලයේ ඉගැන්වීමට පෙර ලියුවන් සහ පැරිසියේ වෛද්‍ය විද්‍යාව හැදෑරීය.\n\nමිනිස් සිරුරු ඔහු විසින්ම විච්ඡේදනය කිරීමෙන්, සතුන්ගේ ශරීර ව්‍යුහය මත පදනම් වූ, දිගු කලක් පිළිගත් විස්තර කිහිපයක් වැරදි බව ඔහු පෙන්වා දුන්නේය. සවිස්තර රූප සහිත ඔහුගේ De humani corporis fabrica (1543) ග්‍රන්ථය නූතන ශරීර ව්‍යුහ විද්‍යාවේ සන්ධිස්ථානයක් විය.",
      contributions: [
        "1543 දී De humani corporis fabrica (මිනිස් සිරුරේ සැකැස්ම) ප්‍රකාශයට පත් කළේය.",
        "සත්ත්ව විච්ඡේදනය මත පදනම් වූ පෙර ශරීර ව්‍යුහ විද්‍යාවේ වැරදි නිවැරදි කළේය.",
        "සෘජු නිරීක්ෂණය සහ විච්ඡේදනය හරහා ශරීර ව්‍යුහය ඉගෙනීම ප්‍රවර්ධනය කළේය.",
      ],
      timeline: [
        { year: "1514", event: "බ්‍රසල්ස්හි උපත." },
        { year: "1537", event: "පදුවාහි ශල්‍ය වෛද්‍යය සහ ශරීර ව්‍යුහ විද්‍යාව ඉගැන්වීම අරඹයි." },
        { year: "1543", event: "De humani corporis fabrica ප්‍රකාශයට පත් කරයි." },
        { year: "1564", event: "ග්‍රීසියේ සැකින්තොස් දූපතේදී මිය යයි." },
      ],
      facts: ["Fabrica ග්‍රන්ථයේ ලී කැටයම් රූප විද්‍යාත්මක මෙන්ම කලාත්මක නිර්මාණ ලෙසද අගය කෙරේ.", "ඔහු පසුව පස්වන චාල්ස් අධිරාජයාගේ වෛද්‍යවරයා ලෙස සේවය කළේය."],
    },
    "Andreas Vesalius",
  ),
  p(
    "william-harvey",
    {
      name: "William Harvey",
      lifeDates: "1578 – 1657",
      field: "Physiology",
      introduction: "An English physician who showed that the heart pumps blood around the body in a continuous circulation.",
      biography:
        "William Harvey was born in Folkestone, England, studied at Cambridge and then at Padua, one of Europe's leading medical schools.\n\nThrough experiments and careful measurement, he demonstrated that blood circulates continuously, pumped by the heart through arteries and returning through veins. He published his findings in 1628 in a book usually known as De Motu Cordis.",
      contributions: [
        "Described the systemic circulation of the blood driven by the heart.",
        "Used experiment and quantitative reasoning to test physiological ideas.",
        "Studied the development of animals (embryology).",
      ],
      timeline: [
        { year: "1578", event: "Born in Folkestone, England." },
        { year: "1602", event: "Graduates in medicine from Padua." },
        { year: "1628", event: "Publishes De Motu Cordis on the motion of the heart and blood." },
        { year: "1657", event: "Dies in London." },
      ],
      facts: ["He served as physician to King James I and King Charles I.", "He calculated that the heart pumps far more blood than the body could produce from food, supporting the idea of circulation."],
    },
    {
      name: "විලියම් හාවි",
      lifeDates: "1578 – 1657",
      field: "කායික විද්‍යාව",
      introduction: "හදවත අඛණ්ඩ සංසරණයකින් සිරුර පුරා රුධිරය පොම්ප කරන බව පෙන්වා දුන් ඉංග්‍රීසි වෛද්‍යවරයෙකි.",
      biography:
        "විලියම් හාවි එංගලන්තයේ ෆෝක්ස්ටන්හි උපත ලැබූ අතර, කේම්බ්‍රිජ්හි සහ පසුව යුරෝපයේ ප්‍රමුඛ වෛද්‍ය පාසලක් වූ පදුවාහි අධ්‍යාපනය ලැබීය.\n\nපරීක්ෂණ සහ සැලකිලිමත් මිනුම් හරහා, හදවත විසින් ධමනි ඔස්සේ පොම්ප කර ශිරා ඔස්සේ ආපසු එන පරිදි රුධිරය අඛණ්ඩව සංසරණය වන බව ඔහු පෙන්වා දුන්නේය. ඔහු සිය සොයාගැනීම් 1628 දී සාමාන්‍යයෙන් De Motu Cordis ලෙස හැඳින්වෙන ග්‍රන්ථයෙන් ප්‍රකාශයට පත් කළේය.",
      contributions: [
        "හදවත මඟින් ක්‍රියාත්මක වන රුධිර සංසරණය විස්තර කළේය.",
        "කායික විද්‍යාත්මක අදහස් පරීක්ෂා කිරීමට පරීක්ෂණ සහ ප්‍රමාණාත්මක තර්කනය භාවිත කළේය.",
        "සතුන්ගේ වර්ධනය (කලල විද්‍යාව) අධ්‍යයනය කළේය.",
      ],
      timeline: [
        { year: "1578", event: "එංගලන්තයේ ෆෝක්ස්ටන්හි උපත." },
        { year: "1602", event: "පදුවාහි වෛද්‍ය උපාධිය ලබයි." },
        { year: "1628", event: "හදවතේ සහ රුධිරයේ චලනය පිළිබඳ De Motu Cordis ප්‍රකාශයට පත් කරයි." },
        { year: "1657", event: "ලන්ඩනයේදී මිය යයි." },
      ],
      facts: ["ඔහු පළමු ජේම්ස් රජුගේ සහ පළමු චාල්ස් රජුගේ වෛද්‍යවරයා ලෙස සේවය කළේය.", "ආහාරවලින් සිරුරට නිපදවිය හැකි ප්‍රමාණයට වඩා බොහෝ රුධිරයක් හදවත පොම්ප කරන බව ඔහු ගණනය කළ අතර, එය සංසරණය පිළිබඳ අදහසට සහාය විය."],
    },
    "William Harvey",
  ),
  p(
    "edward-jenner",
    {
      name: "Edward Jenner",
      lifeDates: "1749 – 1823",
      field: "Vaccination",
      introduction: "An English doctor who developed vaccination against smallpox using material from cowpox.",
      biography:
        "Edward Jenner was a country doctor in Berkeley, Gloucestershire. He noticed reports that people who had caught the mild disease cowpox seemed to be protected from smallpox.\n\nIn 1796 he inoculated a boy, James Phipps, with material from a cowpox sore and later showed that the boy did not develop smallpox. Jenner promoted the method, which became known as vaccination. Smallpox was declared eradicated worldwide in 1980.",
      contributions: [
        "Demonstrated in 1796 that cowpox inoculation could protect against smallpox.",
        "Published and promoted vaccination widely.",
        "Laid foundations for the field of immunisation.",
      ],
      timeline: [
        { year: "1749", event: "Born in Berkeley, Gloucestershire." },
        { year: "1796", event: "Inoculates James Phipps with cowpox material." },
        { year: "1798", event: "Publishes his findings on cowpox and smallpox." },
        { year: "1823", event: "Dies in Berkeley." },
        { year: "1980", event: "The World Health Assembly declares smallpox eradicated." },
      ],
      facts: ["The word “vaccine” comes from the Latin vacca, meaning cow.", "Smallpox is the first human disease to have been eradicated."],
    },
    {
      name: "එඩ්වඩ් ජෙනර්",
      lifeDates: "1749 – 1823",
      field: "එන්නත්කරණය",
      introduction: "ගව වසූරියෙන් ලබාගත් ද්‍රව්‍ය භාවිතයෙන් වසූරියට එරෙහි එන්නත්කරණය සංවර්ධනය කළ ඉංග්‍රීසි වෛද්‍යවරයෙකි.",
      biography:
        "එඩ්වඩ් ජෙනර් ග්ලොස්ටර්ෂයර්හි බර්ක්ලි ප්‍රදේශයේ ගම්බද වෛද්‍යවරයෙකි. ගව වසූරිය නම් මෘදු රෝගය වැළඳුණු අය වසූරියෙන් ආරක්ෂා වන බවට වූ වාර්තා ඔහු නිරීක්ෂණය කළේය.\n\n1796 දී ඔහු ජේම්ස් ෆිප්ස් නම් පිරිමි ළමයෙකුට ගව වසූරි තුවාලයකින් ලබාගත් ද්‍රව්‍ය ඇතුළු කළ අතර, පසුව එම ළමයාට වසූරිය වැළඳුණේ නැති බව පෙන්වා දුන්නේය. ජෙනර් එන්නත්කරණය ලෙස හැඳින්වූ මෙම ක්‍රමය ප්‍රවර්ධනය කළේය. 1980 දී වසූරිය ලොව පුරා තුරන් කළ බව ප්‍රකාශයට පත් කෙරිණි.",
      contributions: [
        "ගව වසූරි එන්නත් කිරීමෙන් වසූරියෙන් ආරක්ෂා විය හැකි බව 1796 දී පෙන්වා දුන්නේය.",
        "එන්නත්කරණය පිළිබඳව ප්‍රකාශයට පත් කර පුළුල් ලෙස ප්‍රවර්ධනය කළේය.",
        "ප්‍රතිශක්තීකරණ ක්ෂේත්‍රයට පදනම දැමීය.",
      ],
      timeline: [
        { year: "1749", event: "ග්ලොස්ටර්ෂයර්හි බර්ක්ලිහි උපත." },
        { year: "1796", event: "ජේම්ස් ෆිප්ස්ට ගව වසූරි ද්‍රව්‍ය එන්නත් කරයි." },
        { year: "1798", event: "ගව වසූරිය සහ වසූරිය පිළිබඳ සොයාගැනීම් ප්‍රකාශයට පත් කරයි." },
        { year: "1823", event: "බර්ක්ලිහිදී මිය යයි." },
        { year: "1980", event: "ලෝක සෞඛ්‍ය සමුළුව වසූරිය තුරන් කළ බව ප්‍රකාශ කරයි." },
      ],
      facts: ["“වැක්සින්” යන වචනය පැමිණෙන්නේ ගවයා යන අරුත ඇති vacca යන ලතින් වචනයෙනි.", "තුරන් කරන ලද පළමු මානව රෝගය වසූරියයි."],
    },
    "Edward Jenner",
  ),
  p(
    "ignaz-semmelweis",
    {
      name: "Ignaz Semmelweis",
      lifeDates: "1818 – 1865",
      field: "Infection prevention",
      introduction: "A Hungarian doctor who showed that hand disinfection by doctors could dramatically reduce deaths of mothers after childbirth.",
      biography:
        "Ignaz Semmelweis worked in the maternity clinics of Vienna General Hospital in the 1840s. He noticed that far more mothers died of puerperal (childbed) fever in the ward run by doctors and medical students than in the ward run by midwives.\n\nIn 1847 he required doctors to wash their hands in a chlorinated solution before examining patients, and deaths fell sharply. His ideas were widely rejected during his lifetime, before germ theory explained why they worked.",
      contributions: [
        "Introduced hand disinfection with chlorinated solution in 1847.",
        "Used careful comparison of death rates between clinics as evidence.",
        "Is remembered as an early pioneer of hand hygiene in healthcare.",
      ],
      timeline: [
        { year: "1818", event: "Born in Buda (now part of Budapest), Hungary." },
        { year: "1847", event: "Introduces handwashing with chlorinated solution in Vienna." },
        { year: "1861", event: "Publishes his book on the cause and prevention of childbed fever." },
        { year: "1865", event: "Dies in Vienna." },
      ],
      facts: ["Hand hygiene is still one of the most effective ways to prevent infections in hospitals.", "His work came before germ theory was widely accepted."],
    },
    {
      name: "ඉග්නාස් සෙමල්වයිස්",
      lifeDates: "1818 – 1865",
      field: "ආසාදන වැළැක්වීම",
      introduction: "වෛද්‍යවරුන් අත් විෂබීජහරණය කිරීමෙන් දරු ප්‍රසූතියෙන් පසු මව්වරුන්ගේ මරණ විශාල ලෙස අඩු කළ හැකි බව පෙන්වා දුන් හංගේරියානු වෛද්‍යවරයෙකි.",
      biography:
        "ඉග්නාස් සෙමල්වයිස් 1840 ගණන්වල වියානා මහ රෝහලේ මාතෘ සායනවල සේවය කළේය. වින්නඹු මාතාවන් පවත්වාගෙන ගිය වාට්ටුවට වඩා වෛද්‍යවරුන් සහ වෛද්‍ය සිසුන් පවත්වාගෙන ගිය වාට්ටුවේ ප්‍රසූති උණෙන් මිය ගිය මව්වරුන් ගණන බොහෝ වැඩි බව ඔහු නිරීක්ෂණය කළේය.\n\n1847 දී ඔහු රෝගීන් පරීක්ෂා කිරීමට පෙර ක්ලෝරීන් ද්‍රාවණයකින් අත් සෝදන ලෙස වෛද්‍යවරුන්ට නියම කළ අතර, මරණ තියුණු ලෙස අඩු විය. විෂබීජ න්‍යාය මඟින් ඒවා ක්‍රියා කරන්නේ ඇයිදැයි පැහැදිලි කිරීමට පෙර, ඔහුගේ ජීවිත කාලය තුළ ඔහුගේ අදහස් පුළුල් ලෙස ප්‍රතික්ෂේප විය.",
      contributions: [
        "1847 දී ක්ලෝරීන් ද්‍රාවණයෙන් අත් විෂබීජහරණය හඳුන්වා දුන්නේය.",
        "සායන අතර මරණ අනුපාත ප්‍රවේශමෙන් සංසන්දනය කිරීම සාක්ෂියක් ලෙස භාවිත කළේය.",
        "සෞඛ්‍ය සේවාවේ අත් සනීපාරක්ෂාව පිළිබඳ මුල්කාලීන පුරෝගාමියෙකු ලෙස සිහිපත් කෙරේ.",
      ],
      timeline: [
        { year: "1818", event: "හංගේරියාවේ බුඩා (දැන් බුඩාපෙස්ට්හි කොටසක්) හි උපත." },
        { year: "1847", event: "වියානාහිදී ක්ලෝරීන් ද්‍රාවණයෙන් අත් සේදීම හඳුන්වා දෙයි." },
        { year: "1861", event: "ප්‍රසූති උණෙහි හේතුව සහ වැළැක්වීම පිළිබඳ ග්‍රන්ථය ප්‍රකාශයට පත් කරයි." },
        { year: "1865", event: "වියානාහිදී මිය යයි." },
      ],
      facts: ["අත් සනීපාරක්ෂාව තවමත් රෝහල්වල ආසාදන වැළැක්වීමේ වඩාත්ම ඵලදායී ක්‍රමවලින් එකකි.", "ඔහුගේ කාර්යය විෂබීජ න්‍යාය පුළුල් ලෙස පිළිගැනීමට පෙර සිදු විය."],
    },
    "Ignaz Semmelweis",
  ),
  p(
    "florence-nightingale",
    {
      name: "Florence Nightingale",
      lifeDates: "1820 – 1910",
      field: "Nursing and health statistics",
      introduction: "A British nurse and statistician who founded modern nursing and used data to improve hospital conditions.",
      biography:
        "Florence Nightingale was born in Florence, Italy, to a wealthy British family. Against the expectations of the time, she trained as a nurse.\n\nDuring the Crimean War she led a team of nurses at the military hospital in Scutari and pressed for better sanitation. Afterwards she used statistics and clear diagrams to persuade officials to reform hospitals, and in 1860 established a nursing school at St Thomas' Hospital in London.",
      contributions: [
        "Led nursing care at the British military hospital at Scutari during the Crimean War.",
        "Used statistics and diagrams to argue for sanitary reform.",
        "Founded a nursing school in London in 1860, shaping professional nursing.",
      ],
      timeline: [
        { year: "1820", event: "Born in Florence, Italy." },
        { year: "1854", event: "Travels to Scutari with a team of nurses during the Crimean War." },
        { year: "1860", event: "Nightingale Training School for nurses opens in London." },
        { year: "1910", event: "Dies in London." },
      ],
      facts: ["She was known as “the Lady with the Lamp” for her night rounds.", "International Nurses Day is celebrated on her birthday, 12 May."],
    },
    {
      name: "ෆ්ලෝරන්ස් නයිටිංගේල්",
      lifeDates: "1820 – 1910",
      field: "හෙද සේවය සහ සෞඛ්‍ය සංඛ්‍යාලේඛන",
      introduction: "නූතන හෙද සේවය ආරම්භ කළ සහ රෝහල් තත්ත්වයන් වැඩිදියුණු කිරීමට දත්ත භාවිත කළ බ්‍රිතාන්‍ය හෙදියක සහ සංඛ්‍යාලේඛනඥවරියකි.",
      biography:
        "ෆ්ලෝරන්ස් නයිටිංගේල් ඉතාලියේ ෆ්ලෝරන්ස් නුවර ධනවත් බ්‍රිතාන්‍ය පවුලක උපත ලැබුවාය. එකල සමාජ අපේක්ෂාවලට පටහැනිව ඇය හෙදියක ලෙස පුහුණුව ලැබුවාය.\n\nක්‍රිමියානු යුද්ධය අතරතුර ඇය ස්කූටාරි හමුදා රෝහලේ හෙද කණ්ඩායමකට නායකත්වය දුන් අතර වඩා හොඳ සනීපාරක්ෂාවක් සඳහා බලපෑම් කළාය. පසුව රෝහල් ප්‍රතිසංස්කරණය කිරීමට නිලධාරීන් ඒත්තු ගැන්වීම සඳහා ඇය සංඛ්‍යාලේඛන සහ පැහැදිලි රූපසටහන් භාවිත කළ අතර, 1860 දී ලන්ඩනයේ ශාන්ත තෝමස් රෝහලේ හෙද පාසලක් පිහිටුවූවාය.",
      contributions: [
        "ක්‍රිමියානු යුද්ධය අතරතුර ස්කූටාරි බ්‍රිතාන්‍ය හමුදා රෝහලේ හෙද සත්කාරයට නායකත්වය දුන්නාය.",
        "සනීපාරක්ෂක ප්‍රතිසංස්කරණ සඳහා සංඛ්‍යාලේඛන සහ රූපසටහන් භාවිත කළාය.",
        "1860 දී ලන්ඩනයේ හෙද පාසලක් පිහිටුවා වෘත්තීය හෙද සේවය හැඩගැස්වූවාය.",
      ],
      timeline: [
        { year: "1820", event: "ඉතාලියේ ෆ්ලෝරන්ස් නුවර උපත." },
        { year: "1854", event: "ක්‍රිමියානු යුද්ධය අතරතුර හෙද කණ්ඩායමක් සමඟ ස්කූටාරි බලා යයි." },
        { year: "1860", event: "ලන්ඩනයේ නයිටිංගේල් හෙද පුහුණු පාසල විවෘත වේ." },
        { year: "1910", event: "ලන්ඩනයේදී මිය යයි." },
      ],
      facts: ["රාත්‍රී සංචාර නිසා ඇය “පහන් රැගත් කාන්තාව” ලෙස ප්‍රසිද්ධ වූවාය.", "ජාත්‍යන්තර හෙද දිනය ඇයගේ උපන් දිනය වන මැයි 12 වන දින සමරනු ලැබේ."],
    },
    "Florence Nightingale",
  ),
  p(
    "elizabeth-blackwell",
    {
      name: "Elizabeth Blackwell",
      lifeDates: "1821 – 1910",
      field: "Medical education for women",
      introduction: "The first woman to receive a medical degree in the United States, who opened the way for women in medicine.",
      biography:
        "Elizabeth Blackwell was born in Bristol, England, and moved with her family to the United States. After many medical schools rejected her, she was admitted to Geneva Medical College in New York and graduated in 1849.\n\nShe went on to open a dispensary and an infirmary for poor women and children in New York, and helped create opportunities for women to train as doctors in the United States and Britain.",
      contributions: [
        "Became the first woman to earn a medical degree in the United States (1849).",
        "Co-founded the New York Infirmary for Indigent Women and Children.",
        "Promoted medical education for women in the US and the UK.",
      ],
      timeline: [
        { year: "1821", event: "Born in Bristol, England." },
        { year: "1849", event: "Graduates from Geneva Medical College, New York." },
        { year: "1857", event: "Opens the New York Infirmary with colleagues." },
        { year: "1910", event: "Dies in Hastings, England." },
      ],
      facts: ["Her sister Emily Blackwell also became a physician.", "She was the first woman on the UK Medical Register."],
    },
    {
      name: "එලිසබෙත් බ්ලැක්වෙල්",
      lifeDates: "1821 – 1910",
      field: "කාන්තාවන් සඳහා වෛද්‍ය අධ්‍යාපනය",
      introduction: "එක්සත් ජනපදයේ වෛද්‍ය උපාධියක් ලැබූ පළමු කාන්තාව වූ අතර, වෛද්‍ය ක්ෂේත්‍රයට කාන්තාවන්ට මඟ විවර කළාය.",
      biography:
        "එලිසබෙත් බ්ලැක්වෙල් එංගලන්තයේ බ්‍රිස්ටල්හි උපත ලැබූ අතර, ඇගේ පවුල සමඟ එක්සත් ජනපදයට සංක්‍රමණය වූවාය. බොහෝ වෛද්‍ය පාසල් ඇය ප්‍රතික්ෂේප කිරීමෙන් පසු, නිව්යෝර්ක්හි ජිනීවා වෛද්‍ය විද්‍යාලයට ඇතුළත් වූ ඇය 1849 දී උපාධිය ලැබුවාය.\n\nපසුව ඇය නිව්යෝර්ක්හි දුප්පත් කාන්තාවන් සහ ළමුන් සඳහා ඖෂධාලයක් සහ රෝහලක් විවෘත කළ අතර, එක්සත් ජනපදයේ සහ බ්‍රිතාන්‍යයේ කාන්තාවන්ට වෛද්‍යවරුන් ලෙස පුහුණු වීමට අවස්ථා ඇති කිරීමට උදව් කළාය.",
      contributions: [
        "එක්සත් ජනපදයේ වෛද්‍ය උපාධියක් ලැබූ පළමු කාන්තාව බවට පත් වූවාය (1849).",
        "දුප්පත් කාන්තාවන් සහ ළමුන් සඳහා නිව්යෝර්ක් රෝහල සම-ආරම්භ කළාය.",
        "එක්සත් ජනපදයේ සහ එක්සත් රාජධානියේ කාන්තාවන් සඳහා වෛද්‍ය අධ්‍යාපනය ප්‍රවර්ධනය කළාය.",
      ],
      timeline: [
        { year: "1821", event: "එංගලන්තයේ බ්‍රිස්ටල්හි උපත." },
        { year: "1849", event: "නිව්යෝර්ක්හි ජිනීවා වෛද්‍ය විද්‍යාලයෙන් උපාධිය ලබයි." },
        { year: "1857", event: "සගයන් සමඟ නිව්යෝර්ක් රෝහල විවෘත කරයි." },
        { year: "1910", event: "එංගලන්තයේ හේස්ටිංස්හිදී මිය යයි." },
      ],
      facts: ["ඇගේ සහෝදරිය එමිලි බ්ලැක්වෙල්ද වෛද්‍යවරියක් වූවාය.", "එක්සත් රාජධානියේ වෛද්‍ය ලේඛනයට ඇතුළත් වූ පළමු කාන්තාව ඇයයි."],
    },
    "Elizabeth Blackwell",
  ),
  p(
    "louis-pasteur",
    {
      name: "Louis Pasteur",
      lifeDates: "1822 – 1895",
      field: "Microbiology",
      introduction: "A French chemist and microbiologist whose work supported germ theory and led to pasteurisation and new vaccines.",
      biography:
        "Louis Pasteur was born in Dole, France. Trained as a chemist, he turned to the study of microorganisms and showed that fermentation and spoilage are caused by living microbes.\n\nHis experiments helped establish the germ theory of disease. He developed pasteurisation, a heating process that makes food and drink safer, and produced vaccines against anthrax in animals and against rabies, first used on a human in 1885.",
      contributions: [
        "Showed that microorganisms cause fermentation and spoilage.",
        "Developed pasteurisation.",
        "Developed vaccines for anthrax and rabies.",
      ],
      timeline: [
        { year: "1822", event: "Born in Dole, France." },
        { year: "1860s", event: "Develops pasteurisation." },
        { year: "1881", event: "Demonstrates an anthrax vaccine for livestock." },
        { year: "1885", event: "Rabies vaccine is given to Joseph Meister." },
        { year: "1895", event: "Dies near Paris." },
      ],
      facts: ["The Pasteur Institute in Paris was founded in 1887 and is still a major research centre.", "Pasteurised milk is named after him."],
    },
    {
      name: "ලුවී පාස්චර්",
      lifeDates: "1822 – 1895",
      field: "ක්ෂුද්‍රජීව විද්‍යාව",
      introduction: "ඔහුගේ කාර්යය විෂබීජ න්‍යායට සහාය වූ අතර පාස්චරීකරණයට සහ නව එන්නත්වලට මඟ පෑදූ ප්‍රංශ රසායන විද්‍යාඥයෙකු සහ ක්ෂුද්‍රජීව විද්‍යාඥයෙකි.",
      biography:
        "ලුවී පාස්චර් ප්‍රංශයේ ඩෝල්හි උපත ලැබීය. රසායන විද්‍යාඥයෙකු ලෙස පුහුණු වූ ඔහු ක්ෂුද්‍ර ජීවීන් අධ්‍යයනයට යොමු වූ අතර, පැසීම සහ නරක් වීම ජීවී ක්ෂුද්‍ර ජීවීන් නිසා සිදුවන බව පෙන්වා දුන්නේය.\n\nඔහුගේ පරීක්ෂණ රෝග පිළිබඳ විෂබීජ න්‍යාය ස්ථාපිත කිරීමට උපකාරී විය. ආහාර සහ පාන වඩා ආරක්ෂිත කරන තාපන ක්‍රියාවලියක් වන පාස්චරීකරණය ඔහු සංවර්ධනය කළ අතර, සතුන්ගේ ඇන්ත්‍රැක්ස් රෝගයට සහ ජලභීතිකාවට එරෙහි එන්නත් නිපදවීය; ජලභීතිකා එන්නත ප්‍රථම වරට මිනිසෙකුට ලබාදුන්නේ 1885 දීය.",
      contributions: [
        "පැසීම සහ නරක් වීම ක්ෂුද්‍ර ජීවීන් නිසා සිදුවන බව පෙන්වා දුන්නේය.",
        "පාස්චරීකරණය සංවර්ධනය කළේය.",
        "ඇන්ත්‍රැක්ස් සහ ජලභීතිකාව සඳහා එන්නත් සංවර්ධනය කළේය.",
      ],
      timeline: [
        { year: "1822", event: "ප්‍රංශයේ ඩෝල්හි උපත." },
        { year: "1860 ගණන්", event: "පාස්චරීකරණය සංවර්ධනය කරයි." },
        { year: "1881", event: "ගව සතුන් සඳහා ඇන්ත්‍රැක්ස් එන්නතක් ප්‍රදර්ශනය කරයි." },
        { year: "1885", event: "ජෝසෆ් මයිස්ටර්ට ජලභීතිකා එන්නත ලබා දෙයි." },
        { year: "1895", event: "පැරිසිය අසලදී මිය යයි." },
      ],
      facts: ["පැරිසියේ පාස්චර් ආයතනය 1887 දී ආරම්භ කළ අතර එය තවමත් ප්‍රධාන පර්යේෂණ මධ්‍යස්ථානයකි.", "පාස්චරීකෘත කිරි නම් කර ඇත්තේ ඔහුගේ නමිනි."],
    },
    "Louis Pasteur",
  ),
  p(
    "joseph-lister",
    {
      name: "Joseph Lister",
      lifeDates: "1827 – 1912",
      field: "Antiseptic surgery",
      introduction: "A British surgeon who introduced antiseptic methods that greatly reduced infections after surgery.",
      biography:
        "Joseph Lister was born in Essex, England, and worked as a surgeon in Glasgow, Edinburgh and London. Many patients at the time died from infections after otherwise successful operations.\n\nInspired by Pasteur's work on microbes, Lister began using carbolic acid (phenol) to clean wounds, dressings and instruments. He reported his results in 1867, and infection rates in his wards fell markedly.",
      contributions: [
        "Introduced antiseptic surgery using carbolic acid.",
        "Applied germ theory to the prevention of wound infection.",
        "Changed surgical practice around the world.",
      ],
      timeline: [
        { year: "1827", event: "Born in Upton, Essex." },
        { year: "1867", event: "Publishes results on the antiseptic principle in surgery." },
        { year: "1897", event: "Becomes the first surgeon raised to the British peerage." },
        { year: "1912", event: "Dies in Walmer, Kent." },
      ],
      facts: ["The bacterial genus Listeria is named after him.", "He used a carbolic acid spray in the operating room for a time."],
    },
    {
      name: "ජෝසෆ් ලිස්ටර්",
      lifeDates: "1827 – 1912",
      field: "ප්‍රතිසෙප්ටික ශල්‍යකර්ම",
      introduction: "ශල්‍යකර්මවලින් පසු ඇතිවන ආසාදන විශාල ලෙස අඩු කළ ප්‍රතිසෙප්ටික ක්‍රම හඳුන්වා දුන් බ්‍රිතාන්‍ය ශල්‍ය වෛද්‍යවරයෙකි.",
      biography:
        "ජෝසෆ් ලිස්ටර් එංගලන්තයේ එසෙක්ස්හි උපත ලැබූ අතර ග්ලාස්ගෝ, එඩින්බරෝ සහ ලන්ඩනයේ ශල්‍ය වෛද්‍යවරයෙකු ලෙස සේවය කළේය. එකල සාර්ථක වූ ශල්‍යකර්මවලින් පසුව පවා බොහෝ රෝගීන් ආසාදන නිසා මිය ගියහ.\n\nක්ෂුද්‍ර ජීවීන් පිළිබඳ පාස්චර්ගේ කාර්යයෙන් ආභාසය ලැබූ ලිස්ටර්, තුවාල, වෙළුම් පටි සහ උපකරණ පිරිසිදු කිරීමට කාබොලික් අම්ලය (ෆීනෝල්) භාවිත කිරීමට පටන් ගත්තේය. ඔහු 1867 දී සිය ප්‍රතිඵල වාර්තා කළ අතර, ඔහුගේ වාට්ටුවල ආසාදන අනුපාත කැපී පෙනෙන ලෙස අඩු විය.",
      contributions: [
        "කාබොලික් අම්ලය භාවිතයෙන් ප්‍රතිසෙප්ටික ශල්‍යකර්ම හඳුන්වා දුන්නේය.",
        "තුවාල ආසාදන වැළැක්වීමට විෂබීජ න්‍යාය යොදා ගත්තේය.",
        "ලොව පුරා ශල්‍යකර්ම පිළිවෙත් වෙනස් කළේය.",
      ],
      timeline: [
        { year: "1827", event: "එසෙක්ස්හි අප්ටන්හි උපත." },
        { year: "1867", event: "ශල්‍යකර්මයේ ප්‍රතිසෙප්ටික මූලධර්මය පිළිබඳ ප්‍රතිඵල ප්‍රකාශයට පත් කරයි." },
        { year: "1897", event: "බ්‍රිතාන්‍ය සාමිවරයෙකු බවට පත් කළ පළමු ශල්‍ය වෛද්‍යවරයා වෙයි." },
        { year: "1912", event: "කෙන්ට්හි වෝල්මර්හිදී මිය යයි." },
      ],
      facts: ["Listeria නම් බැක්ටීරියා ගණය ඔහුගේ නමින් නම් කර ඇත.", "ඔහු කලක් ශල්‍යාගාරයේ කාබොලික් අම්ල ඉසින යන්ත්‍රයක් භාවිත කළේය."],
    },
    "Joseph Lister",
  ),
  p(
    "robert-koch",
    {
      name: "Robert Koch",
      lifeDates: "1843 – 1910",
      field: "Bacteriology",
      introduction: "A German physician who identified the bacteria that cause tuberculosis, cholera and anthrax.",
      biography:
        "Robert Koch began as a country doctor in Germany and carried out research in a home laboratory. In 1876 he showed the life cycle of the anthrax bacterium and its link to the disease.\n\nIn 1882 he announced the discovery of the bacterium that causes tuberculosis, and in 1883–84 he identified the cholera bacterium. He developed laboratory methods for growing and staining bacteria and was awarded the Nobel Prize in Physiology or Medicine in 1905.",
      contributions: [
        "Identified the causes of anthrax, tuberculosis and cholera.",
        "Developed methods for culturing and staining bacteria.",
        "Formulated principles (Koch's postulates) linking a microbe to a disease.",
      ],
      timeline: [
        { year: "1843", event: "Born in Clausthal, Germany." },
        { year: "1876", event: "Publishes work on the anthrax bacterium." },
        { year: "1882", event: "Announces discovery of the tuberculosis bacterium (24 March)." },
        { year: "1905", event: "Receives the Nobel Prize in Physiology or Medicine." },
        { year: "1910", event: "Dies in Baden-Baden." },
      ],
      facts: ["World Tuberculosis Day, 24 March, marks the day of his 1882 announcement.", "His laboratory techniques are still the basis of microbiology teaching."],
    },
    {
      name: "රොබට් කොක්",
      lifeDates: "1843 – 1910",
      field: "බැක්ටීරියා විද්‍යාව",
      introduction: "ක්ෂය රෝගය, කොලරාව සහ ඇන්ත්‍රැක්ස් ඇති කරන බැක්ටීරියා හඳුනාගත් ජර්මානු වෛද්‍යවරයෙකි.",
      biography:
        "රොබට් කොක් ජර්මනියේ ගම්බද වෛද්‍යවරයෙකු ලෙස ආරම්භ කළ අතර නිවසේ පිහිටි රසායනාගාරයක පර්යේෂණ කළේය. 1876 දී ඔහු ඇන්ත්‍රැක්ස් බැක්ටීරියාවේ ජීවන චක්‍රය සහ එය රෝගයට ඇති සම්බන්ධය පෙන්වා දුන්නේය.\n\n1882 දී ඔහු ක්ෂය රෝගය ඇති කරන බැක්ටීරියාව සොයාගත් බව නිවේදනය කළ අතර, 1883–84 දී කොලරා බැක්ටීරියාව හඳුනාගත්තේය. බැක්ටීරියා වගා කිරීමට සහ වර්ණ ගැන්වීමට රසායනාගාර ක්‍රම සංවර්ධනය කළ ඔහුට 1905 දී කායික විද්‍යාව හෝ වෛද්‍ය විද්‍යාව සඳහා නොබෙල් ත්‍යාගය පිරිනැමිණි.",
      contributions: [
        "ඇන්ත්‍රැක්ස්, ක්ෂය රෝගය සහ කොලරාවේ හේතු හඳුනාගත්තේය.",
        "බැක්ටීරියා වගා කිරීමට සහ වර්ණ ගැන්වීමට ක්‍රම සංවර්ධනය කළේය.",
        "ක්ෂුද්‍ර ජීවියෙකු රෝගයකට සම්බන්ධ කරන මූලධර්ම (කොක්ගේ උපකල්පන) සකස් කළේය.",
      ],
      timeline: [
        { year: "1843", event: "ජර්මනියේ ක්ලවුස්තාල්හි උපත." },
        { year: "1876", event: "ඇන්ත්‍රැක්ස් බැක්ටීරියාව පිළිබඳ කෘතිය ප්‍රකාශයට පත් කරයි." },
        { year: "1882", event: "ක්ෂය රෝග බැක්ටීරියාව සොයාගත් බව නිවේදනය කරයි (මාර්තු 24)." },
        { year: "1905", event: "කායික විද්‍යාව හෝ වෛද්‍ය විද්‍යාව සඳහා නොබෙල් ත්‍යාගය ලබයි." },
        { year: "1910", event: "බාඩන්-බාඩන්හිදී මිය යයි." },
      ],
      facts: ["ලෝක ක්ෂය රෝග දිනය වන මාර්තු 24, ඔහුගේ 1882 නිවේදනයේ දිනය සනිටුහන් කරයි.", "ඔහුගේ රසායනාගාර ක්‍රම තවමත් ක්ෂුද්‍රජීව විද්‍යා ඉගැන්වීමේ පදනමයි."],
    },
    "Robert Koch",
  ),
  p(
    "wilhelm-rontgen",
    {
      name: "Wilhelm Röntgen",
      lifeDates: "1845 – 1923",
      field: "X-ray imaging",
      introduction: "A German physicist who discovered X-rays in 1895, making it possible to see inside the body without surgery.",
      biography:
        "Wilhelm Conrad Röntgen was a professor of physics in Würzburg, Germany. In November 1895, while experimenting with cathode-ray tubes, he noticed a new kind of ray that could pass through materials and produce images on photographic plates.\n\nOne of his first X-ray images showed the bones of his wife's hand. X-ray imaging was taken up by doctors within months, and Röntgen received the first Nobel Prize in Physics in 1901.",
      contributions: [
        "Discovered X-rays in 1895.",
        "Made some of the first X-ray photographs of the human body.",
        "Enabled the development of radiology as a medical specialty.",
      ],
      timeline: [
        { year: "1845", event: "Born in Lennep, Germany." },
        { year: "1895", event: "Discovers X-rays (8 November)." },
        { year: "1901", event: "Receives the first Nobel Prize in Physics." },
        { year: "1923", event: "Dies in Munich." },
      ],
      facts: ["He called them “X” rays because their nature was unknown.", "He chose not to patent his discovery."],
    },
    {
      name: "විල්හෙල්ම් රොන්ට්ගන්",
      lifeDates: "1845 – 1923",
      field: "X-කිරණ ප්‍රතිබිම්බනය",
      introduction: "1895 දී X-කිරණ සොයාගත් ජර්මානු භෞතික විද්‍යාඥයෙකි; එමඟින් ශල්‍යකර්මයකින් තොරව සිරුර ඇතුළත දැකීමට හැකි විය.",
      biography:
        "විල්හෙල්ම් කොන්රාඩ් රොන්ට්ගන් ජර්මනියේ වූර්ට්ස්බර්ග්හි භෞතික විද්‍යා මහාචාර්යවරයෙකි. 1895 නොවැම්බරයේදී කැතෝඩ කිරණ නළ සමඟ පරීක්ෂණ කරමින් සිටියදී, ද්‍රව්‍ය හරහා ගමන් කර ඡායාරූප තහඩු මත රූප ඇති කළ හැකි නව කිරණ වර්ගයක් ඔහු දුටුවේය.\n\nඔහුගේ මුල්ම X-කිරණ රූපයක ඔහුගේ බිරිඳගේ අතේ ඇටකටු දැක්විණි. මාස කිහිපයක් ඇතුළත වෛද්‍යවරුන් X-කිරණ ප්‍රතිබිම්බනය භාවිතයට ගත් අතර, රොන්ට්ගන්ට 1901 දී පළමු භෞතික විද්‍යා නොබෙල් ත්‍යාගය ලැබිණි.",
      contributions: [
        "1895 දී X-කිරණ සොයාගත්තේය.",
        "මිනිස් සිරුරේ මුල්ම X-කිරණ ඡායාරූප කිහිපයක් නිර්මාණය කළේය.",
        "විකිරණවේදය වෛද්‍ය විශේෂඥ ක්ෂේත්‍රයක් ලෙස වර්ධනය වීමට මඟ පෑදීය.",
      ],
      timeline: [
        { year: "1845", event: "ජර්මනියේ ලෙනෙප්හි උපත." },
        { year: "1895", event: "X-කිරණ සොයාගනී (නොවැම්බර් 8)." },
        { year: "1901", event: "පළමු භෞතික විද්‍යා නොබෙල් ත්‍යාගය ලබයි." },
        { year: "1923", event: "මියුනිච්හිදී මිය යයි." },
      ],
      facts: ["ඒවායේ ස්වභාවය නොදන්නා බැවින් ඔහු ඒවා “X” කිරණ ලෙස නම් කළේය.", "ඔහු සිය සොයාගැනීම සඳහා පේටන්ට් බලපත්‍රයක් නොගැනීමට තීරණය කළේය."],
    },
    "Wilhelm Röntgen",
  ),
  p(
    "marie-curie",
    {
      name: "Marie Curie",
      lifeDates: "1867 – 1934",
      field: "Radioactivity",
      introduction: "A Polish-born French scientist whose research on radioactivity led to new treatments and imaging in medicine.",
      biography:
        "Marie Skłodowska Curie was born in Warsaw and moved to Paris to study physics and mathematics. With her husband Pierre Curie she researched radioactivity and discovered the elements polonium and radium.\n\nShe was the first woman to win a Nobel Prize (Physics, 1903, shared) and the first person to win Nobel Prizes in two sciences (Chemistry, 1911). During the First World War she helped equip mobile X-ray units to treat wounded soldiers.",
      contributions: [
        "Pioneered research on radioactivity and discovered polonium and radium.",
        "Promoted the use of radium in medical research and treatment.",
        "Organised mobile X-ray units during the First World War.",
      ],
      timeline: [
        { year: "1867", event: "Born in Warsaw." },
        { year: "1898", event: "Discovers polonium and radium with Pierre Curie." },
        { year: "1903", event: "Shares the Nobel Prize in Physics." },
        { year: "1911", event: "Receives the Nobel Prize in Chemistry." },
        { year: "1934", event: "Dies in France." },
      ],
      facts: ["Her notebooks are still radioactive and are stored in lead-lined boxes.", "The mobile X-ray vehicles she organised were nicknamed “petites Curies”."],
    },
    {
      name: "මාරි කියුරි",
      lifeDates: "1867 – 1934",
      field: "විකිරණශීලිතාව",
      introduction: "ඇගේ විකිරණශීලිතාව පිළිබඳ පර්යේෂණ වෛද්‍ය විද්‍යාවේ නව ප්‍රතිකාර සහ ප්‍රතිබිම්බන ක්‍රමවලට මඟ පෑදූ, පෝලන්තයේ උපන් ප්‍රංශ විද්‍යාඥවරියකි.",
      biography:
        "මාරි ස්ක්ලොඩොව්ස්කා කියුරි වෝර්සෝහි උපත ලැබූ අතර, භෞතික විද්‍යාව සහ ගණිතය හැදෑරීමට පැරිසියට ගියාය. ඇගේ සැමියා පියරේ කියුරි සමඟ ඇය විකිරණශීලිතාව පිළිබඳ පර්යේෂණ කළ අතර, පොලෝනියම් සහ රේඩියම් මූලද්‍රව්‍ය සොයාගත්තාය.\n\nනොබෙල් ත්‍යාගයක් දිනූ පළමු කාන්තාව (භෞතික විද්‍යාව, 1903, හවුලේ) සහ විද්‍යා ක්ෂේත්‍ර දෙකකින් නොබෙල් ත්‍යාග දිනූ පළමු පුද්ගලයා (රසායන විද්‍යාව, 1911) ඇයයි. පළමු ලෝක යුද්ධය අතරතුර තුවාල ලැබූ සොල්දාදුවන්ට ප්‍රතිකාර කිරීම සඳහා ජංගම X-කිරණ ඒකක සන්නද්ධ කිරීමට ඇය උදව් කළාය.",
      contributions: [
        "විකිරණශීලිතාව පිළිබඳ පුරෝගාමී පර්යේෂණ කළ අතර පොලෝනියම් සහ රේඩියම් සොයාගත්තාය.",
        "වෛද්‍ය පර්යේෂණ සහ ප්‍රතිකාර සඳහා රේඩියම් භාවිතය ප්‍රවර්ධනය කළාය.",
        "පළමු ලෝක යුද්ධය අතරතුර ජංගම X-කිරණ ඒකක සංවිධානය කළාය.",
      ],
      timeline: [
        { year: "1867", event: "වෝර්සෝහි උපත." },
        { year: "1898", event: "පියරේ කියුරි සමඟ පොලෝනියම් සහ රේඩියම් සොයාගනී." },
        { year: "1903", event: "භෞතික විද්‍යා නොබෙල් ත්‍යාගය හවුලේ ලබයි." },
        { year: "1911", event: "රසායන විද්‍යා නොබෙල් ත්‍යාගය ලබයි." },
        { year: "1934", event: "ප්‍රංශයේදී මිය යයි." },
      ],
      facts: ["ඇගේ සටහන් පොත් තවමත් විකිරණශීලී වන අතර ඊයම් ආස්තරණය කළ පෙට්ටිවල ගබඩා කර ඇත.", "ඇය සංවිධානය කළ ජංගම X-කිරණ වාහන “පුංචි කියුරිලා” (petites Curies) ලෙස හැඳින්විණි."],
    },
    "Marie Curie",
  ),
  p(
    "alexander-fleming",
    {
      name: "Alexander Fleming",
      lifeDates: "1881 – 1955",
      field: "Antibiotics",
      introduction: "A Scottish bacteriologist who discovered penicillin in 1928, opening the age of antibiotics.",
      biography:
        "Alexander Fleming was born in Ayrshire, Scotland, and worked at St Mary's Hospital in London. In 1928 he noticed that a mould, Penicillium, had killed bacteria growing on a culture plate.\n\nHe named the active substance penicillin. Its development into a usable medicine came later, through the work of Howard Florey, Ernst Chain and colleagues in the 1940s. Fleming, Florey and Chain shared the Nobel Prize in Physiology or Medicine in 1945.",
      contributions: [
        "Discovered penicillin in 1928.",
        "Earlier discovered lysozyme, an antibacterial enzyme found in body fluids.",
        "Warned early that bacteria could become resistant to antibiotics.",
      ],
      timeline: [
        { year: "1881", event: "Born in Ayrshire, Scotland." },
        { year: "1928", event: "Observes the antibacterial effect of Penicillium mould." },
        { year: "1940s", event: "Penicillin is developed into a mass-produced medicine." },
        { year: "1945", event: "Shares the Nobel Prize in Physiology or Medicine." },
        { year: "1955", event: "Dies in London." },
      ],
      facts: ["Penicillin's discovery is often described as a fortunate accident noticed by a prepared mind.", "In his Nobel lecture he warned about antibiotic resistance."],
    },
    {
      name: "ඇලෙක්සැන්ඩර් ෆ්ලෙමින්",
      lifeDates: "1881 – 1955",
      field: "ප්‍රතිජීවක",
      introduction: "1928 දී පෙනිසිලින් සොයාගෙන ප්‍රතිජීවක යුගය විවෘත කළ ස්කොට්ලන්ත බැක්ටීරියා විද්‍යාඥයෙකි.",
      biography:
        "ඇලෙක්සැන්ඩර් ෆ්ලෙමින් ස්කොට්ලන්තයේ අයර්ෂයර්හි උපත ලැබූ අතර ලන්ඩනයේ ශාන්ත මේරි රෝහලේ සේවය කළේය. 1928 දී, Penicillium නම් පුස් වර්ගයක් වගා තහඩුවක වැඩෙමින් තිබූ බැක්ටීරියා විනාශ කර ඇති බව ඔහු දුටුවේය.\n\nඔහු එම ක්‍රියාකාරී ද්‍රව්‍යය පෙනිසිලින් ලෙස නම් කළේය. එය භාවිත කළ හැකි ඖෂධයක් බවට පත් කිරීම පසුව, 1940 ගණන්වල හවර්ඩ් ෆ්ලෝරි, අර්න්ස්ට් චේන් සහ සගයන්ගේ කාර්යය හරහා සිදු විය. ෆ්ලෙමින්, ෆ්ලෝරි සහ චේන් 1945 දී කායික විද්‍යාව හෝ වෛද්‍ය විද්‍යාව සඳහා නොබෙල් ත්‍යාගය හවුලේ ලැබූහ.",
      contributions: [
        "1928 දී පෙනිසිලින් සොයාගත්තේය.",
        "ඊට පෙර, ශරීර තරලවල ඇති බැක්ටීරියා නාශක එන්සයිමයක් වන ලයිසොසයිම් සොයාගත්තේය.",
        "බැක්ටීරියා ප්‍රතිජීවකවලට ප්‍රතිරෝධී විය හැකි බව කලින්ම අනතුරු ඇඟවීය.",
      ],
      timeline: [
        { year: "1881", event: "ස්කොට්ලන්තයේ අයර්ෂයර්හි උපත." },
        { year: "1928", event: "Penicillium පුස්වල බැක්ටීරියා නාශක බලපෑම නිරීක්ෂණය කරයි." },
        { year: "1940 ගණන්", event: "පෙනිසිලින් මහා පරිමාණයෙන් නිෂ්පාදනය කෙරෙන ඖෂධයක් බවට පත් වේ." },
        { year: "1945", event: "කායික විද්‍යාව හෝ වෛද්‍ය විද්‍යාව සඳහා නොබෙල් ත්‍යාගය හවුලේ ලබයි." },
        { year: "1955", event: "ලන්ඩනයේදී මිය යයි." },
      ],
      facts: ["පෙනිසිලින් සොයාගැනීම බොහෝ විට සූදානම් මනසක් විසින් දුටු වාසනාවන්ත අහම්බයක් ලෙස විස්තර කෙරේ.", "ඔහුගේ නොබෙල් දේශනයේදී ප්‍රතිජීවක ප්‍රතිරෝධය ගැන ඔහු අනතුරු ඇඟවීය."],
    },
    "Alexander Fleming",
  ),
];
