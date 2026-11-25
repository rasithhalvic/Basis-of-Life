-- Adds the exhibition stall quiz questions for Genetics (15) and General biology / cell
-- biology (15): English + Sinhala, marked REVIEWED to match the earlier stall-quiz migrations
-- so they can be used in sessions straight away. Idempotent: fixed ids + ON CONFLICT DO NOTHING.
--
-- Source notes:
--   * Genetics Q3 ("gametes of Ttrr"): the source sheet listed "Tr" twice (options A and D).
--     Option D was replaced with "Tt, rr" so every option is distinct; the key (Tr, tr) is unchanged.
--   * Genetics Q10: the Sinhala text calls the trait "rare" (not "recessive") and omits that the
--     mother's father had the trait; the English text is fuller. The answer (0.25) is the same.
--   * Genetics explanations are English only (the UI falls back to English); the general-biology
--     questions have no explanations in the source.
--   * Answer keys were re-derived and agree with the source sheets.

-- Genetics 1
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallgen01', 'GENETICS'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Genetics', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallgen01', 'en', 'Scientific principles of genetics were first put forward by,', 'Gregor Mendel is known as the father of modern genetics.'), ('stallgen01', 'si', 'ප්‍රවේණි විද්‍යාත්මක මූලධර්ම ප්‍රථමයෙන්ම ඉදිරිපත් කරන ලද්දේ,', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen01o0', 'stallgen01', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen01o0', 'en', 'Oparin'), ('stallgen01o0', 'si', 'ඔපාරින්') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen01o1', 'stallgen01', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen01o1', 'en', 'Charles Darwin'), ('stallgen01o1', 'si', 'චාල්ස් ඩාවින්') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen01o2', 'stallgen01', 2, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen01o2', 'en', 'Gregor Mendel'), ('stallgen01o2', 'si', 'ග්‍රෙගර් මෙන්ඩල්') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen01o3', 'stallgen01', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen01o3', 'en', 'Haldane'), ('stallgen01o3', 'si', 'හැල්ඩේන්') ON CONFLICT DO NOTHING;

-- Genetics 2
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallgen02', 'GENETICS'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Genetics', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallgen02', 'en', 'What is meant by "heterozygous"?', 'Refers to having two different alleles (e.g. Tt or Rr) at the same gene locus on a pair of homologous chromosomes.'), ('stallgen02', 'si', 'විෂමයුග්මක යනුවෙන් අදහස් වන්නේ,', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen02o0', 'stallgen02', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen02o0', 'en', 'Gametes are formed by the combination of genotypes of two different species'), ('stallgen02o0', 'si', 'වෙනස් විශේෂ දෙකක ජන්මාණු සංයුක්ත වීමෙන් යුක්තාණු සෑදී ඇති බව') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen02o1', 'stallgen02', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen02o1', 'en', 'The pair of alleles located on a trait locus giving rise to homologous somatic chromosomes differs from each other'), ('stallgen02o1', 'si', 'සමප්‍රභව වර්ණදේහ යුවලක දෙනලද ලක්ෂණයක පිහිටි ඇලීල යුවල එකිනෙකින් වෙනස් වන බවය.') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen02o2', 'stallgen02', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen02o2', 'en', 'Chromosomes do not exist as homologous pairs'), ('stallgen02o2', 'si', 'වර්ණදේහ සමප්‍රභව යුගල් වශයෙන් නොමැති බව') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen02o3', 'stallgen02', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen02o3', 'en', 'Genetic phenotypes are different'), ('stallgen02o3', 'si', 'ප්‍රවේණි දර්ශය රූපාණුදර්ශයෙන් වෙනස් වන බව') ON CONFLICT DO NOTHING;

-- Genetics 3
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallgen03', 'GENETICS'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Genetics', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallgen03', 'en', 'Which of the following represents the gametes produced by an organism with the genotype Ttrr?', 'Tt produces T and t alleles and rr produces only r; combining them forms Tr and tr.'), ('stallgen03', 'si', 'Ttrr ප්‍රවේණිදර්ශය සහිත සත්ත්වයෙකු විසින් නිපදවන ජන්මාණු වන්නේ,', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen03o0', 'stallgen03', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen03o0', 'en', 'Tr'), ('stallgen03o0', 'si', 'Tr') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen03o1', 'stallgen03', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen03o1', 'en', 'Tr, tr'), ('stallgen03o1', 'si', 'Tr, tr') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen03o2', 'stallgen03', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen03o2', 'en', 'TTrr, ttrr'), ('stallgen03o2', 'si', 'TTrr, ttrr') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen03o3', 'stallgen03', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen03o3', 'en', 'Tt, rr'), ('stallgen03o3', 'si', 'Tt, rr') ON CONFLICT DO NOTHING;

-- Genetics 4
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallgen04', 'GENETICS'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Genetics', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallgen04', 'en', 'When AaBb × aabb are crossed, what is the ratio of possible phenotypes in the progeny?', 'This is a standard dihybrid test cross. AaBb produces 4 equally likely gametes while aabb produces only ab, resulting in 4 distinct phenotypes.'), ('stallgen04', 'si', 'AaBb x aabb දෙමුහුමකදී ප්‍රජනිතයේ ලැබිය හැකි රූපානුදර්ශ අනුපාතය,', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen04o0', 'stallgen04', 0, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen04o0', 'en', '1:1:1:1'), ('stallgen04o0', 'si', '1:1:1:1') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen04o1', 'stallgen04', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen04o1', 'en', '3:1'), ('stallgen04o1', 'si', '3:1') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen04o2', 'stallgen04', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen04o2', 'en', '1:2:1'), ('stallgen04o2', 'si', '1:2:1') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen04o3', 'stallgen04', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen04o3', 'en', '9:3:3:1'), ('stallgen04o3', 'si', '9:3:3:1') ON CONFLICT DO NOTHING;

-- Genetics 5
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallgen05', 'GENETICS'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Genetics', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallgen05', 'en', 'In a certain plant, red flowers (W) are dominant over white flowers (w). Green seed coat (Y) is dominant over yellow seed coat (y). When a plant bearing red flowers and green seeds is crossed with a pure breeding homozygous recessive plant, 52% of the resulting progeny plants bore red flowers and green seeds, and 48% bore red flowers and yellow seeds. What is the genotype of the parent plant subjected to the cross?', 'All the progeny have red flowers, meaning the parent must be homozygous dominant for flower colour (WW). Progeny split roughly 1:1 between green seeds (Yy) and yellow seeds (yy), meaning the parent is heterozygous for seed colour (Yy).'), ('stallgen05', 'si', 'මෑ ශාකයේ රතු මල් “W” සුදුමල් “w” වලට ප්‍රමුඛ වේ. කොළ පැහැති බීජ “Y” කහ පැහැති බීජ “y” වලට ප්‍රමුඛ වේ. රතු මල් හා කොළ පැහැති බීජ දරන ශාකයක් නිලීන සමයුග්මකයෙකු සමඟ පිළිමුහුම් කළ විට ලැබුනු ජනිත ශාක අතරින් 52% ක් රතු මල් හා කොළ පැහැති බීජ දැරීය. 48% රතුමල් හා කහ පැහැති බීජ දැරීය. පිළිමුහුමට භාජනය වූ ජනක ශාකයේ ප්‍රවේණිදර්ශය කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen05o0', 'stallgen05', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen05o0', 'en', 'WwYy'), ('stallgen05o0', 'si', 'WwYy') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen05o1', 'stallgen05', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen05o1', 'en', 'wwYY'), ('stallgen05o1', 'si', 'wwYY') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen05o2', 'stallgen05', 2, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen05o2', 'en', 'WWYy'), ('stallgen05o2', 'si', 'WWYy') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen05o3', 'stallgen05', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen05o3', 'en', 'WwYY'), ('stallgen05o3', 'si', 'WwYY') ON CONFLICT DO NOTHING;

-- Genetics 6
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallgen06', 'GENETICS'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Genetics', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallgen06', 'en', 'How many total chromosome pairs are present in a somatic cell of a human?', '22 pairs of autosomes + 1 pair of sex chromosomes.'), ('stallgen06', 'si', 'මිනිසාගේ දෛහික සෛලයක අඩංගු මුළු වර්ණදේහ සංඛ්‍යාව,', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen06o0', 'stallgen06', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen06o0', 'en', '46 pairs'), ('stallgen06o0', 'si', 'යුගල 46') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen06o1', 'stallgen06', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen06o1', 'en', '26 pairs'), ('stallgen06o1', 'si', 'යුගල 26') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen06o2', 'stallgen06', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen06o2', 'en', '29 pairs'), ('stallgen06o2', 'si', 'යුගල 29') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen06o3', 'stallgen06', 3, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen06o3', 'en', '23 pairs'), ('stallgen06o3', 'si', 'යුගල 23') ON CONFLICT DO NOTHING;

-- Genetics 7
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallgen07', 'GENETICS'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Genetics', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallgen07', 'en', 'What is defined as a sex chromosome?', NULL), ('stallgen07', 'si', 'ලිංග වර්ණදේහයක් ලෙස හැඳින්වෙන්නේ,', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen07o0', 'stallgen07', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen07o0', 'en', 'Those that initiate the production of sex hormones'), ('stallgen07o0', 'si', 'ලිංග හෝර්මෝන ඇති කිරීමට මුල්වන ඒවාය') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen07o1', 'stallgen07', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen07o1', 'en', 'Those found in dioecious plant species'), ('stallgen07o1', 'si', 'ද්විගෘහී ශාක විශේෂ වල ඇතිවන ඒවාය') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen07o2', 'stallgen07', 2, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen07o2', 'en', 'Those that help determine the sex of an organism'), ('stallgen07o2', 'si', 'ජීවියෙකුගේ ලිංග නිර්ණයට ඉවහල් වන ඒවාය') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen07o3', 'stallgen07', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen07o3', 'en', 'Those shaped like the letter X'), ('stallgen07o3', 'si', 'X අකුරක හැඩය පෙන්වන ඒවාය') ON CONFLICT DO NOTHING;

-- Genetics 8
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallgen08', 'GENETICS'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Genetics', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallgen08', 'en', 'The genetic disorder associated with haemoglobin that is currently receiving heightened attention in Sri Lanka is?', NULL), ('stallgen08', 'si', 'දැනට ශ්‍රී ලංකාවේ වැඩි අවධානයක් යොමු වී ඇති හිමොග්ලොබින් හා සම්බන්ධ ප්‍රවේණිකව උරුමවන රෝගය වනුයේ,', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen08o0', 'stallgen08', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen08o0', 'en', 'Haemophilia'), ('stallgen08o0', 'si', 'හිමොෆීලියාව') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen08o1', 'stallgen08', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen08o1', 'en', 'Thalassaemia'), ('stallgen08o1', 'si', 'තලසීමියාව') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen08o2', 'stallgen08', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen08o2', 'en', 'Sickle cell anaemia'), ('stallgen08o2', 'si', 'දැකැති සෛල රක්තහීනතාවය') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen08o3', 'stallgen08', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen08o3', 'en', 'Polycythaemia'), ('stallgen08o3', 'si', 'පොලිසයිතීමියාව') ON CONFLICT DO NOTHING;

-- Genetics 9
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallgen09', 'GENETICS'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Genetics', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallgen09', 'en', 'A healthy daughter born to a father with haemophilia and a healthy mother married a healthy man. Which of the following ratios is most appropriate regarding the appearance of the disease among her children?', 'Father: XhY. Daughter: XHXh (a carrier). Healthy man: XHY. Possible children: XHY, XhY, XHXH, XHXh. So 1/4 of all her children (an affected son) will have haemophilia.'), ('stallgen09', 'si', 'හිමෝෆීලියා රෝගය ඇති පියෙකුගෙන් හා නිරෝගී මවකගෙන් ඇතිවූ නිරෝගී දුවක් නිරෝගී මිනිසෙකු සමඟ විවාහ විය. ඇයගේ දරුවන් තුල රෝගය මතුවීම පිළිබඳ පහත දැක්වෙන අනුපාතිකයන්ගෙන් වඩා යෝග්‍ය වන්නේ,', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen09o0', 'stallgen09', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen09o0', 'en', '1/3'), ('stallgen09o0', 'si', '1/3') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen09o1', 'stallgen09', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen09o1', 'en', '1/2'), ('stallgen09o1', 'si', '1/2') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen09o2', 'stallgen09', 2, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen09o2', 'en', '1/4'), ('stallgen09o2', 'si', '1/4') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen09o3', 'stallgen09', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen09o3', 'en', '1/8'), ('stallgen09o3', 'si', '1/8') ON CONFLICT DO NOTHING;

-- Genetics 10
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallgen10', 'GENETICS'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Genetics', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallgen10', 'en', 'Red-green colour blindness is a recessive sex-linked trait in humans. A healthy woman whose father had the trait bore a colour-blind son with a healthy husband. What is the probability that their next child will also be colour-blind?', 'The healthy mother is a carrier (XCXc) and the healthy father is XCY. For any single child the chance of being a boy is 1/2, and the chance of that boy inheriting the recessive Xc allele from his mother is 1/2. Multiplying gives 1/4 (0.25). A daughter cannot be colour-blind here because her father provides XC.'), ('stallgen10', 'si', 'රතු කොළ වර්ණ අන්ධතාවය මිනිසුන් අතර දුලබ ලිංග ප්‍රතිබද්ධ ලක්ෂණයකි. නිරෝගී සැමියෙකු සිටින නිරෝගී ස්ත්‍රියක් වර්ණ අන්ධ පුතෙකු ලැබුවාය. ඔවුන්ගේ ඊළඟ දරුවාද වර්ණ අන්ධ වීමට ඇති සම්භාවිතාවය කොපමණද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen10o0', 'stallgen10', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen10o0', 'en', '1'), ('stallgen10o0', 'si', '1') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen10o1', 'stallgen10', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen10o1', 'en', '0.75'), ('stallgen10o1', 'si', '0.75') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen10o2', 'stallgen10', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen10o2', 'en', '0.5'), ('stallgen10o2', 'si', '0.5') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen10o3', 'stallgen10', 3, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen10o3', 'en', '0.25'), ('stallgen10o3', 'si', '0.25') ON CONFLICT DO NOTHING;

-- Genetics 11
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallgen11', 'GENETICS'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Genetics', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallgen11', 'en', 'Which of the following is required to maintain Hardy-Weinberg equilibrium in a population?', 'Five conditions must be met for Hardy-Weinberg equilibrium: random mating, no mutations, no gene flow (migration), a very large population size and no natural selection.'), ('stallgen11', 'si', 'ගහනයක හාඩ්වයින්බර්ග් සමතුලිතතාව පවත්වා ගැනීම සඳහා අවශ්‍ය වනුයේ පහත සඳහන් ඒවායින් කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen11o0', 'stallgen11', 0, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen11o0', 'en', 'Random mating among organisms'), ('stallgen11o0', 'si', 'ජීවීන් අතර අහඹු ලෙස සංවාසයේ යෙදීම') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen11o1', 'stallgen11', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen11o1', 'en', 'Occurrence of mutations'), ('stallgen11o1', 'si', 'විකෘති ඇති වීම') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen11o2', 'stallgen11', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen11o2', 'en', 'Occurrence of migration'), ('stallgen11o2', 'si', 'පර්යටනය සිදුවීම') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen11o3', 'stallgen11', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen11o3', 'en', 'Presence of selective advantages for the progression of alleles'), ('stallgen11o3', 'si', 'ඇලීල වල උන්නතිය සඳහා වරණීය වාසි තිබීම') ON CONFLICT DO NOTHING;

-- Genetics 12
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallgen12', 'GENETICS'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Genetics', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallgen12', 'en', 'Required for the evolution of every population is,', NULL), ('stallgen12', 'si', 'සැම ගහනයක පරිණාමය සඳහා තිබීම අවශ්‍ය වන්නේ,', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen12o0', 'stallgen12', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen12o0', 'en', 'A dominant trait'), ('stallgen12o0', 'si', 'ප්‍රමුඛ ලක්ෂණය') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen12o1', 'stallgen12', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen12o1', 'en', 'A recessive trait'), ('stallgen12o1', 'si', 'නිලීන ලක්ෂණය') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen12o2', 'stallgen12', 2, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen12o2', 'en', 'Genetic variation'), ('stallgen12o2', 'si', 'ප්‍රවේණි ප්‍රභේදනය') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen12o3', 'stallgen12', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen12o3', 'en', 'Random mating'), ('stallgen12o3', 'si', 'සසම්භාවී සංවාසය') ON CONFLICT DO NOTHING;

-- Genetics 13
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallgen13', 'GENETICS'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Genetics', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallgen13', 'en', 'The genotype that determines the AB blood group in humans is,', NULL), ('stallgen13', 'si', 'මිනිසාගේ AB රුධිර කාණ්ඩය නිර්ණය කරන ප්‍රවේණි දර්ශය,', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen13o0', 'stallgen13', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen13o0', 'en', 'ii'), ('stallgen13o0', 'si', 'ii') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen13o1', 'stallgen13', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen13o1', 'en', 'IAIB'), ('stallgen13o1', 'si', 'IAIB') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen13o2', 'stallgen13', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen13o2', 'en', 'IBi'), ('stallgen13o2', 'si', 'IBi') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen13o3', 'stallgen13', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen13o3', 'en', 'IAi'), ('stallgen13o3', 'si', 'IAi') ON CONFLICT DO NOTHING;

-- Genetics 14
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallgen14', 'GENETICS'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Genetics', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallgen14', 'en', 'Which of the following cannot be the blood groups of the parents of a child with blood group O?', NULL), ('stallgen14', 'si', 'O රුධිර කාණ්ඩය සහිත දරුවකුගේ දෙමාපියන්ගේ රුධිර කාණ්ඩය විය නොහැක්කේ පහත සඳහන් ඒවා අතුරෙන් කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen14o0', 'stallgen14', 0, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen14o0', 'en', 'O and AB'), ('stallgen14o0', 'si', 'O සහ AB') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen14o1', 'stallgen14', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen14o1', 'en', 'O and A'), ('stallgen14o1', 'si', 'O සහ A') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen14o2', 'stallgen14', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen14o2', 'en', 'O and B'), ('stallgen14o2', 'si', 'O සහ B') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen14o3', 'stallgen14', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen14o3', 'en', 'A and B'), ('stallgen14o3', 'si', 'A සහ B') ON CONFLICT DO NOTHING;

-- Genetics 15
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallgen15', 'GENETICS'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Genetics', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallgen15', 'en', 'The pink colour in flowers of the four o''clock plant (Mirabilis jalapa) is caused by incomplete dominance. Red flowers occur in homozygous dominant plants, while white flowers occur in homozygous recessive plants. Which of the following crosses will yield the highest proportion of pink coloured flowers?', 'Crossing a homozygous dominant red plant (RR) with a homozygous recessive white plant (rr) yields 100% heterozygous pink progeny (Rr). Pink x pink gives 50% pink and pink x white also gives 50% pink.'), ('stallgen15', 'si', 'හෙන්දිරික්කා ශාකයේ මල්වල රෝස පැහැය ඇතිවන්නේ අසම්පූර්ණ ප්‍රමුඛතාවය නිසාය. ද්විත්ව ප්‍රමුඛ ශාකවල රතු මල් හටගන්නා අතර ද්විත්ව නිලීන ශාක වල සුදුමල් හට ගනී. රෝස පැහැති මල් වැඩිම අනුපාතයක් ලැබෙනු ඇත්තේ පහත සඳහන් කවර මුහුමෙන්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen15o0', 'stallgen15', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen15o0', 'en', 'Red x Red'), ('stallgen15o0', 'si', 'රතු x රතු') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen15o1', 'stallgen15', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen15o1', 'en', 'Red x White'), ('stallgen15o1', 'si', 'රතු x සුදු') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen15o2', 'stallgen15', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen15o2', 'en', 'Pink x Pink'), ('stallgen15o2', 'si', 'රෝස x රෝස') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallgen15o3', 'stallgen15', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallgen15o3', 'en', 'Pink x White'), ('stallgen15o3', 'si', 'රෝස x සුදු') ON CONFLICT DO NOTHING;

-- General biology 1
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallbio01', 'GENERAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - General biology', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallbio01', 'en', 'Which molecule carries genetic information in human cells?', NULL), ('stallbio01', 'si', 'මිනිස් සෛල තුළ ජානමය තොරතුරු ගබඩා කර රැගෙන යන අණුව කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio01o0', 'stallbio01', 0, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio01o0', 'en', 'DNA'), ('stallbio01o0', 'si', 'DNA') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio01o1', 'stallbio01', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio01o1', 'en', 'ATP'), ('stallbio01o1', 'si', 'ATP') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio01o2', 'stallbio01', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio01o2', 'en', 'Glucose'), ('stallbio01o2', 'si', 'ග්ලූකෝස් (Glucose)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio01o3', 'stallbio01', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio01o3', 'en', 'Starch'), ('stallbio01o3', 'si', 'පිෂ්ටය (Starch)') ON CONFLICT DO NOTHING;

-- General biology 2
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallbio02', 'GENERAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - General biology', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallbio02', 'en', 'Which cell organelle is known as the "powerhouse of the cell" because it produces energy (ATP)?', NULL), ('stallbio02', 'si', 'ශක්තිය (ATP) නිපදවන බැවින් "සෛලයේ ජව මධ්‍යස්ථානය" (Powerhouse of the cell) ලෙස හඳුන්වන සෛල ඉන්ද්‍රියිකාව කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio02o0', 'stallbio02', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio02o0', 'en', 'Ribosome'), ('stallbio02o0', 'si', 'රයිබොසෝම (Ribosome)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio02o1', 'stallbio02', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio02o1', 'en', 'Mitochondria'), ('stallbio02o1', 'si', 'මයිටොකොන්ඩ්‍රියා (Mitochondria)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio02o2', 'stallbio02', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio02o2', 'en', 'Nucleus'), ('stallbio02o2', 'si', 'න්‍යෂ්ටිය (Nucleus)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio02o3', 'stallbio02', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio02o3', 'en', 'Vacuole'), ('stallbio02o3', 'si', 'රික්තකය (Vacuole)') ON CONFLICT DO NOTHING;

-- General biology 3
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallbio03', 'GENERAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - General biology', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallbio03', 'en', 'Enzymes, antibodies, and hemoglobin are all made of which biomolecule?', NULL), ('stallbio03', 'si', 'එන්සයිම, ප්‍රතිදේහ (antibodies) සහ හිමොග්ලොබින් සෑදී ඇත්තේ කුමන ජෛව අණු වර්ගයෙන්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio03o0', 'stallbio03', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio03o0', 'en', 'Fats'), ('stallbio03o0', 'si', 'මේද (Fats)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio03o1', 'stallbio03', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio03o1', 'en', 'Carbohydrates'), ('stallbio03o1', 'si', 'කාබෝහයිඩ්‍රේට (Carbohydrates)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio03o2', 'stallbio03', 2, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio03o2', 'en', 'Proteins'), ('stallbio03o2', 'si', 'ප්‍රෝටීන (Proteins)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio03o3', 'stallbio03', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio03o3', 'en', 'Vitamins'), ('stallbio03o3', 'si', 'විටමින් (Vitamins)') ON CONFLICT DO NOTHING;

-- General biology 4
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallbio04', 'GENERAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - General biology', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallbio04', 'en', 'Which part of a cell controls what enters and leaves the cell?', NULL), ('stallbio04', 'si', 'සෛලයට ඇතුළු වන සහ පිටවන ද්‍රව්‍ය පාලනය කරන සෛල කොටස කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio04o0', 'stallbio04', 0, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio04o0', 'en', 'Cell membrane'), ('stallbio04o0', 'si', 'සෛල පටලය (Cell membrane)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio04o1', 'stallbio04', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio04o1', 'en', 'Cytoplasm'), ('stallbio04o1', 'si', 'සෛල ප්ලාස්මය (Cytoplasm)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio04o2', 'stallbio04', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio04o2', 'en', 'Nucleus'), ('stallbio04o2', 'si', 'න්‍යෂ්ටිය (Nucleus)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio04o3', 'stallbio04', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio04o3', 'en', 'Mitochondria'), ('stallbio04o3', 'si', 'මයිටොකොන්ඩ්‍රියා (Mitochondria)') ON CONFLICT DO NOTHING;

-- General biology 5
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallbio05', 'GENERAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - General biology', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallbio05', 'en', 'What happens to most enzymes when body temperature gets dangerously high during a fever?', NULL), ('stallbio05', 'si', 'උණ රෝගයකදී ශරීර උෂ්ණත්වය අධික ලෙස ඉහළ ගිය විට බොහෝ එන්සයිමවලට කුමක් සිදුවේද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio05o0', 'stallbio05', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio05o0', 'en', 'They multiply faster'), ('stallbio05o0', 'si', 'ඒවා වේගයෙන් ගුණනය වේ') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio05o1', 'stallbio05', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio05o1', 'en', 'They lose their shape and stop working'), ('stallbio05o1', 'si', 'ඒවායේ හැඩය වෙනස් වී ක්‍රියාකාරිත්වය නතර වේ (දුස්ස්වභාවිකරණය වේ)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio05o2', 'stallbio05', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio05o2', 'en', 'They turn into glucose'), ('stallbio05o2', 'si', 'ඒවා ග්ලූකෝස් බවට පත් වේ') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio05o3', 'stallbio05', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio05o3', 'en', 'They become bones'), ('stallbio05o3', 'si', 'ඒවා අස්ථි බවට පත් වේ') ON CONFLICT DO NOTHING;

-- General biology 6
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallbio06', 'GENERAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - General biology', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallbio06', 'en', 'Why is water essential in human blood plasma?', NULL), ('stallbio06', 'si', 'මිනිස් රුධිර ප්ලාස්මය තුළ ජලය අත්‍යවශ්‍ය වන්නේ ඇයි?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio06o0', 'stallbio06', 0, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio06o0', 'en', 'It dissolves and transports nutrients and wastes'), ('stallbio06o0', 'si', 'එය පෝෂක සහ අපද්‍රව්‍ය දියකර පරිවහනය කරන බැවිනි') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio06o1', 'stallbio06', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio06o1', 'en', 'It carries oxygen instead of red blood cells'), ('stallbio06o1', 'si', 'එය රතු රුධිරාණු වෙනුවට ඔක්සිජන් පරිවහනය කරන බැවිනි') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio06o2', 'stallbio06', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio06o2', 'en', 'It blocks nerve signals'), ('stallbio06o2', 'si', 'එය ස්නායු ආවේග අවහිර කරන බැවිනි') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio06o3', 'stallbio06', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio06o3', 'en', 'It stores genetic codes'), ('stallbio06o3', 'si', 'එය ජානමය කේත ගබඩා කරන බැවිනි') ON CONFLICT DO NOTHING;

-- General biology 7
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallbio07', 'GENERAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - General biology', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallbio07', 'en', 'What is the body''s ability to maintain a stable internal environment called?', NULL), ('stallbio07', 'si', 'ශරීරයේ අභ්‍යන්තර පරිසරය ස්ථාවරව පවත්වා ගැනීමේ හැකියාව හඳුන්වන්නේ කුමන නමකින්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio07o0', 'stallbio07', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio07o0', 'en', 'Osmosis'), ('stallbio07o0', 'si', 'ආස්‍රැතිය (Osmosis)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio07o1', 'stallbio07', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio07o1', 'en', 'Digestion'), ('stallbio07o1', 'si', 'ජීර්ණය (Digestion)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio07o2', 'stallbio07', 2, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio07o2', 'en', 'Homeostasis'), ('stallbio07o2', 'si', 'සමස්ථිතිය (Homeostasis)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio07o3', 'stallbio07', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio07o3', 'en', 'Respiration'), ('stallbio07o3', 'si', 'ශ්වසනය (Respiration)') ON CONFLICT DO NOTHING;

-- General biology 8
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallbio08', 'GENERAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - General biology', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallbio08', 'en', 'Which hormone lowers high blood sugar levels by helping glucose enter body cells?', NULL), ('stallbio08', 'si', 'ග්ලූකෝස් ශරීර සෛල තුළට ඇතුළු වීමට උපකාර කරමින් ඉහළ ගිය රුධිර සීනි මට්ටම අඩු කරන හෝමෝනය කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio08o0', 'stallbio08', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio08o0', 'en', 'Adrenaline'), ('stallbio08o0', 'si', 'ඇඩ්‍රිනලින් (Adrenaline)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio08o1', 'stallbio08', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio08o1', 'en', 'Insulin'), ('stallbio08o1', 'si', 'ඉන්සියුලින් (Insulin)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio08o2', 'stallbio08', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio08o2', 'en', 'Melatonin'), ('stallbio08o2', 'si', 'මෙලටොනින් (Melatonin)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio08o3', 'stallbio08', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio08o3', 'en', 'Testosterone'), ('stallbio08o3', 'si', 'ටෙස්ටොස්ටෙරෝන් (Testosterone)') ON CONFLICT DO NOTHING;

-- General biology 9
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallbio09', 'GENERAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - General biology', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallbio09', 'en', 'Uncontrolled cell division in the body can lead to which disease?', NULL), ('stallbio09', 'si', 'ශරීරයේ පාලනයකින් තොරව සිදුවන සෛල බෙදීම කුමන රෝගයට හේතු විය හැකිද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio09o0', 'stallbio09', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio09o0', 'en', 'Influenza'), ('stallbio09o0', 'si', 'ඉන්ෆ්ලුවෙන්සා (Influenza)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio09o1', 'stallbio09', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio09o1', 'en', 'Cancer'), ('stallbio09o1', 'si', 'පිළිකා (Cancer)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio09o2', 'stallbio09', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio09o2', 'en', 'Measles'), ('stallbio09o2', 'si', 'සරම්ප (Measles)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio09o3', 'stallbio09', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio09o3', 'en', 'Scurvy'), ('stallbio09o3', 'si', 'ශීතාද රෝගය / ස්කර්වි (Scurvy)') ON CONFLICT DO NOTHING;

-- General biology 10
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallbio10', 'GENERAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - General biology', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallbio10', 'en', 'Which gas is needed by our cells for aerobic respiration to release energy?', NULL), ('stallbio10', 'si', 'ශක්තිය නිදහස් කිරීම සඳහා ස්වායු ශ්වසනයේදී අපගේ සෛලවලට අවශ්‍ය වන වායුව කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio10o0', 'stallbio10', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio10o0', 'en', 'Nitrogen'), ('stallbio10o0', 'si', 'නයිට්‍රජන්') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio10o1', 'stallbio10', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio10o1', 'en', 'Carbon dioxide'), ('stallbio10o1', 'si', 'කාබන් ඩයොක්සයිඩ්') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio10o2', 'stallbio10', 2, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio10o2', 'en', 'Oxygen'), ('stallbio10o2', 'si', 'ඔක්සිජන්') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio10o3', 'stallbio10', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio10o3', 'en', 'Hydrogen'), ('stallbio10o3', 'si', 'හයිඩ්‍රජන්') ON CONFLICT DO NOTHING;

-- General biology 11
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallbio11', 'GENERAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - General biology', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallbio11', 'en', 'Which molecule carries a copy of instructions from DNA to make proteins?', NULL), ('stallbio11', 'si', 'ප්‍රෝටීන සෑදීම සඳහා DNA වල ඇති උපදෙස් පිටපතක් රැගෙන යන අණුව කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio11o0', 'stallbio11', 0, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio11o0', 'en', 'mRNA'), ('stallbio11o0', 'si', 'mRNA') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio11o1', 'stallbio11', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio11o1', 'en', 'Lipid'), ('stallbio11o1', 'si', 'ලිපිඩ (Lipid)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio11o2', 'stallbio11', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio11o2', 'en', 'Glycogen'), ('stallbio11o2', 'si', 'ග්ලයිකොජන් (Glycogen)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio11o3', 'stallbio11', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio11o3', 'en', 'Cellulose'), ('stallbio11o3', 'si', 'සෙලියුලෝස් (Cellulose)') ON CONFLICT DO NOTHING;

-- General biology 12
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallbio12', 'GENERAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - General biology', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallbio12', 'en', 'Cell membranes are mainly made of a double layer of which molecules?', NULL), ('stallbio12', 'si', 'සෛල පටල ප්‍රධාන වශයෙන් සෑදී ඇත්තේ කුමන අණුවල ද්විත්ව ස්ථරයකින්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio12o0', 'stallbio12', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio12o0', 'en', 'Sugars'), ('stallbio12o0', 'si', 'සීනි (Sugars)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio12o1', 'stallbio12', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio12o1', 'en', 'Phospholipids'), ('stallbio12o1', 'si', 'පොස්පොලිපිඩ (Phospholipids)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio12o2', 'stallbio12', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio12o2', 'en', 'DNA strands'), ('stallbio12o2', 'si', 'DNA දාම') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio12o3', 'stallbio12', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio12o3', 'en', 'Mineral salts'), ('stallbio12o3', 'si', 'ඛනිජ ලවණ') ON CONFLICT DO NOTHING;

-- General biology 13
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallbio13', 'GENERAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - General biology', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallbio13', 'en', 'Why do hospitals give patients saline (salt solution) instead of pure water in an IV drip?', NULL), ('stallbio13', 'si', 'රෝහල්වලදී රෝගීන්ට අන්තඃශිරා ද්‍රාවණ (IV drip) ලෙස පිරිසිදු ජලය වෙනුවට සේලයින් (ලවණ ද්‍රාවණ) ලබා දෙන්නේ ඇයි?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio13o0', 'stallbio13', 0, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio13o0', 'en', 'Pure water would cause red blood cells to swell and burst'), ('stallbio13o0', 'si', 'පිරිසිදු ජලය නිසා රතු රුධිරාණු ඉදිමී පුපුරා යා හැකි බැවිනි') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio13o1', 'stallbio13', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio13o1', 'en', 'Pure water freezes inside blood vessels'), ('stallbio13o1', 'si', 'පිරිසිදු ජලය රුධිර නාල තුළ මිදෙන බැවිනි') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio13o2', 'stallbio13', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio13o2', 'en', 'Pure water turns into acid immediately'), ('stallbio13o2', 'si', 'පිරිසිදු ජලය වහාම අම්ලයක් බවට පත්වන බැවිනි') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio13o3', 'stallbio13', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio13o3', 'en', 'Pure water blocks oxygen from entering the lungs'), ('stallbio13o3', 'si', 'පිරිසිදු ජලය පෙනහළුවලට ඔක්සිජන් ඇතුළු වීම වළක්වන බැවිනි') ON CONFLICT DO NOTHING;

-- General biology 14
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallbio14', 'GENERAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - General biology', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallbio14', 'en', 'Which two body systems work together to control and coordinate body functions?', NULL), ('stallbio14', 'si', 'ශරීරයේ ක්‍රියාකාරකම් පාලනය කිරීමට සහ සමායෝජනය කිරීමට එක්ව ක්‍රියා කරන පද්ධති දෙක කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio14o0', 'stallbio14', 0, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio14o0', 'en', 'Nervous system and endocrine system'), ('stallbio14o0', 'si', 'ස්නායු පද්ධතිය සහ අන්තරාසර්ග පද්ධතිය') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio14o1', 'stallbio14', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio14o1', 'en', 'Skeletal system and skin'), ('stallbio14o1', 'si', 'අස්ථි පද්ධතිය සහ සම') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio14o2', 'stallbio14', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio14o2', 'en', 'Digestive system and urinary system'), ('stallbio14o2', 'si', 'ආහාර ජීර්ණ පද්ධතිය සහ බහිස්‍රාවී පද්ධතිය') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio14o3', 'stallbio14', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio14o3', 'en', 'Respiratory system and hair'), ('stallbio14o3', 'si', 'ශ්වසන පද්ධතිය සහ හිසකෙස්') ON CONFLICT DO NOTHING;

-- General biology 15
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallbio15', 'GENERAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - General biology', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallbio15', 'en', 'Why can''t viruses reproduce on their own without infecting a host cell?', NULL), ('stallbio15', 'si', 'ධාරක සෛලයකට ආසාදනය නොවී වෛරසවලට තනිවම ප්‍රජනනය කළ නොහැක්කේ ඇයි?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio15o0', 'stallbio15', 0, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio15o0', 'en', 'They have no cell structure or machinery of their own'), ('stallbio15o0', 'si', 'ඒවාට තමන්ගේම සෛලීය ව්‍යුහයක් හෝ යාන්ත්‍රණයක් නොමැති බැවිනි') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio15o1', 'stallbio15', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio15o1', 'en', 'They are too large to divide'), ('stallbio15o1', 'si', 'බෙදීමට තරම් ඒවා විශාල වැඩි බැවිනි') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio15o2', 'stallbio15', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio15o2', 'en', 'They only live in rocks'), ('stallbio15o2', 'si', 'ඒවා ජීවත් වන්නේ පාෂාණ තුළ පමණක් බැවිනි') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallbio15o3', 'stallbio15', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallbio15o3', 'en', 'They need sunlight like plants'), ('stallbio15o3', 'si', 'ශාක මෙන් ඒවාට සූර්යාලෝකය අවශ්‍ය වන බැවිනි') ON CONFLICT DO NOTHING;
