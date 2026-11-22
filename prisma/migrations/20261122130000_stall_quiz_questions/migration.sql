-- Adds the exhibition stall quiz questions (Radiology, Nervous, Musculoskeletal, Renal).
-- English + Sinhala, 15 each, marked REVIEWED so they can be used in sessions straight away.
-- Idempotent: fixed ids + ON CONFLICT DO NOTHING.

-- Radiology 1
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallrad01', 'RADIOLOGY'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Radiology', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallrad01', 'en', 'Who discovered X-rays in 1895, marking the birth of medical radiology?', NULL), ('stallrad01', 'si', 'වෛද්‍ය විකිරණවේදයේ උපත සනිටුහන් කරමින් 1895 දී එක්ස් කිරණ (X-rays) සොයා ගන්නා ලද්දේ කා විසින්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad01o0', 'stallrad01', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad01o0', 'en', 'Marie Curie'), ('stallrad01o0', 'si', 'මේරි කියුරි (Marie Curie)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad01o1', 'stallrad01', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad01o1', 'en', 'Wilhelm Röntgen'), ('stallrad01o1', 'si', 'විල්හෙම් රොන්ට්ගන් (Wilhelm Röntgen)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad01o2', 'stallrad01', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad01o2', 'en', 'Thomas Edison'), ('stallrad01o2', 'si', 'තෝමස් එඩිසන් (Thomas Edison)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad01o3', 'stallrad01', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad01o3', 'en', 'Alexander Fleming'), ('stallrad01o3', 'si', 'ඇලෙක්සැන්ඩර් ෆ්ලෙමින්ග් (Alexander Fleming)') ON CONFLICT DO NOTHING;

-- Radiology 2
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallrad02', 'RADIOLOGY'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Radiology', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallrad02', 'en', 'What type of radiation is primarily used in standard X-ray imaging?', NULL), ('stallrad02', 'si', 'සම්මත එක්ස් කිරණ රූපකරණයක් සඳහා මූලික වශයෙන් භාවිතා කරනු ලබන්නේ කුමන ආකාරයේ විකිරණයක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad02o0', 'stallrad02', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad02o0', 'en', 'Sound waves'), ('stallrad02o0', 'si', 'ශබ්ද තරංග') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad02o1', 'stallrad02', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad02o1', 'en', 'Electromagnetic radiation'), ('stallrad02o1', 'si', 'විද්‍යුත් චුම්භක විකිරණ') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad02o2', 'stallrad02', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad02o2', 'en', 'Alpha particles'), ('stallrad02o2', 'si', 'ඇල්ෆා අංශු') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad02o3', 'stallrad02', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad02o3', 'en', 'Infrared rays'), ('stallrad02o3', 'si', 'අධෝරක්ත කිරණ') ON CONFLICT DO NOTHING;

-- Radiology 3
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallrad03', 'RADIOLOGY'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Radiology', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallrad03', 'en', 'Why do bones appear distinct and white on an X-ray image?', NULL), ('stallrad03', 'si', 'එක්ස් කිරණ පටකයක අස්ථි පැහැදිලිව සහ සුදු පැහැයෙන් දිස්වීමට හේතුව කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad03o0', 'stallrad03', 0, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad03o0', 'en', 'Bones absorb much more X-ray radiation than surrounding soft tissues'), ('stallrad03o0', 'si', 'අවට මෘදු පටකවලට වඩා අස්ථි මඟින් වැඩි එක්ස් කිරණ ප්‍රමාණයක් අවශෝෂණය කර ගැනීම') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad03o1', 'stallrad03', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad03o1', 'en', 'Bones emit their own visible light'), ('stallrad03o1', 'si', 'අස්ථි මඟින් තමන්ගේම දෘශ්‍ය ආලෝකයක් නිකුත් කිරීම') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad03o2', 'stallrad03', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad03o2', 'en', 'Bones repel X-ray beams completely'), ('stallrad03o2', 'si', 'අස්ථි මඟින් එක්ස් කිරණ කදම්භ සම්පූර්ණයෙන්ම විකර්ෂණය කිරීම') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad03o3', 'stallrad03', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad03o3', 'en', 'Bones are coated with metallic paint'), ('stallrad03o3', 'si', 'අස්ථි ලෝහමය තීන්තයකින් ආවරණය කර තිබීම') ON CONFLICT DO NOTHING;

-- Radiology 4
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallrad04', 'RADIOLOGY'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Radiology', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallrad04', 'en', 'What kind of waves does an Ultrasound scanning machine use to view inside the body?', NULL), ('stallrad04', 'si', 'ශරීරය අභ්‍යන්තරය බැලීම සඳහා අභිදිවනි (Ultrasound) ස්කෑන් යන්ත්‍රයක් භාවිතා කරන්නේ කුමන ආකාරයේ තරංගද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad04o0', 'stallrad04', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad04o0', 'en', 'X-ray waves'), ('stallrad04o0', 'si', 'එක්ස් කිරණ තරංග') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad04o1', 'stallrad04', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad04o1', 'en', 'High-frequency sound waves'), ('stallrad04o1', 'si', 'ඉහළ සංඛ්‍යාතයකින් යුත් ශබ්ද තරංග') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad04o2', 'stallrad04', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad04o2', 'en', 'Ultraviolet waves'), ('stallrad04o2', 'si', 'අල්ට්‍රාවයලට් (පාරජම්බුල) තරංග') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad04o3', 'stallrad04', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad04o3', 'en', 'Microwave radiation'), ('stallrad04o3', 'si', 'ක්ෂුද්‍ර තරංග (Microwaves)') ON CONFLICT DO NOTHING;

-- Radiology 5
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallrad05', 'RADIOLOGY'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Radiology', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallrad05', 'en', 'Which imaging technique is widely considered safest for pregnant mothers because it does not use ionizing radiation?', NULL), ('stallrad05', 'si', 'අයනීකරණ විකිරණ භාවිතා නොකරන බැවින්, ගර්භණී මව්වරුන් සඳහා වඩාත්ම ආරක්ෂිත යැයි පුළුල් ලෙස සැලකෙන රූපකරණ තාක්ෂණය කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad05o0', 'stallrad05', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad05o0', 'en', 'CT Scan'), ('stallrad05o0', 'si', 'CT ස්කෑන් පරීක්ෂාව') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad05o1', 'stallrad05', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad05o1', 'en', 'X-Ray'), ('stallrad05o1', 'si', 'එක්ස් කිරණ (X-Ray) පරීක්ෂාව') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad05o2', 'stallrad05', 2, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad05o2', 'en', 'Ultrasound'), ('stallrad05o2', 'si', 'අභිදිවනි ස්කෑන් පරීක්ෂාව (Ultrasound)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad05o3', 'stallrad05', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad05o3', 'en', 'PET Scan'), ('stallrad05o3', 'si', 'PET ස්කෑන් පරීක්ෂාව') ON CONFLICT DO NOTHING;

-- Radiology 6
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallrad06', 'RADIOLOGY'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Radiology', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallrad06', 'en', 'What combination of technologies does a Computed Tomography (CT) scan use to produce detailed cross-sectional images?', NULL), ('stallrad06', 'si', 'සවිස්තරාත්මක හරස්කඩ (cross-sectional) ප්‍රතිබිම්බ නිර්මාණය කිරීම සඳහා පරිගණක ටොමොග්‍රැෆි (CT) ස්කෑන් පරීක්ෂණයක් මඟින් භාවිතා කරන තාක්ෂණික සංයෝජනය කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad06o0', 'stallrad06', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad06o0', 'en', 'Sound waves and computers'), ('stallrad06o0', 'si', 'ශබ්ද තරංග සහ පරිගණක') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad06o1', 'stallrad06', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad06o1', 'en', 'X-rays and computer technology'), ('stallrad06o1', 'si', 'එක්ස් කිරණ සහ පරිගණක තාක්ෂණය') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad06o2', 'stallrad06', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad06o2', 'en', 'Magnets and radio waves'), ('stallrad06o2', 'si', 'චුම්භක සහ රේඩියෝ තරංග') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad06o3', 'stallrad06', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad06o3', 'en', 'Lasers and mirrors'), ('stallrad06o3', 'si', 'ලේසර් කිරණ සහ දර්පණ') ON CONFLICT DO NOTHING;

-- Radiology 7
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallrad07', 'RADIOLOGY'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Radiology', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallrad07', 'en', 'What does an MRI (Magnetic Resonance Imaging) machine primarily use to create detailed images of soft tissues?', NULL), ('stallrad07', 'si', 'මෘදු පටකවල සවිස්තරාත්මක ප්‍රතිබිම්බ නිර්මාණය කිරීම සඳහා MRI (චුම්භක අනුනාද රූපකරණ) යන්ත්‍රයක් මඟින් මූලික වශයෙන් භාවිතා කරනු ලබන්නේ කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad07o0', 'stallrad07', 0, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad07o0', 'en', 'Strong magnetic fields and radio waves'), ('stallrad07o0', 'si', 'ප්‍රබල චුම්භක ක්ෂේත්‍ර සහ රේඩියෝ තරංග') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad07o1', 'stallrad07', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad07o1', 'en', 'Radioactive isotopes'), ('stallrad07o1', 'si', 'විකිරණශීලී සමස්ථානික') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad07o2', 'stallrad07', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad07o2', 'en', 'High-intensity visible lasers'), ('stallrad07o2', 'si', 'ඉහළ තීව්‍රතාවයෙන් යුත් දෘශ්‍ය ලේසර් කිරණ') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad07o3', 'stallrad07', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad07o3', 'en', 'High-frequency sound echoes'), ('stallrad07o3', 'si', 'ඉහළ සංඛ්‍යාත ශබ්ද ප්‍රතිරාවයන්') ON CONFLICT DO NOTHING;

-- Radiology 8
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallrad08', 'RADIOLOGY'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Radiology', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallrad08', 'en', 'Before entering an MRI room, why is it strictly necessary to remove all metallic items (like jewelry or keys)?', NULL), ('stallrad08', 'si', 'MRI කුටියකට ඇතුළු වීමට පෙර, සියලුම ලෝහමය ද්‍රව්‍ය (ආභරණ හෝ යතුරු වැනි) ඉවත් කිරීම තරයේ අවශ්‍ය වන්නේ ඇයි?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad08o0', 'stallrad08', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad08o0', 'en', 'Because metal blocks the hospital Wi-Fi'), ('stallrad08o0', 'si', 'ලෝහ මඟින් රෝහලේ Wi-Fi සංඥා අවහිර කරන බැවින්') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad08o1', 'stallrad08', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad08o1', 'en', 'Because the powerful magnet can attract metal objects dangerously'), ('stallrad08o1', 'si', 'ප්‍රබල චුම්භකයට ලෝහමය වස්තූන් අනතුරුදායක ලෙස ආකර්ෂණය කරගත හැකි බැවින්') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad08o2', 'stallrad08', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad08o2', 'en', 'Because metal dissolves in magnetic fields'), ('stallrad08o2', 'si', 'චුම්භක ක්ෂේත්‍ර තුළ ලෝහ දියවී යන බැවින්') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad08o3', 'stallrad08', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad08o3', 'en', 'Because it makes the machine too loud'), ('stallrad08o3', 'si', 'යන්ත්‍රයේ ශබ්දය එයින් වැඩි වන බැවින්') ON CONFLICT DO NOTHING;

-- Radiology 9
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallrad09', 'RADIOLOGY'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Radiology', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallrad09', 'en', 'According to radiology preparation guidelines, what is usually required before an abdominal ultrasound scan?', NULL), ('stallrad09', 'si', 'විකිරණවේදී සූදානම් වීමේ මාර්ගෝපදේශවලට අනුව, උදරයේ අභිදිවනි (Abdominal ultrasound) ස්කෑන් පරීක්ෂණයකට පෙර සාමාන්‍යයෙන් අවශ්‍ය වන්නේ කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad09o0', 'stallrad09', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad09o0', 'en', 'Eating a heavy meal'), ('stallrad09o0', 'si', 'බරපතල ආහාර වේලක් ලබා ගැනීම') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad09o1', 'stallrad09', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad09o1', 'en', 'Coming fasting'), ('stallrad09o1', 'si', 'නිරාහාරව පැමිණීම') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad09o2', 'stallrad09', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad09o2', 'en', 'Drinking salt water'), ('stallrad09o2', 'si', 'ලුණු වතුර පානය කිරීම') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad09o3', 'stallrad09', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad09o3', 'en', 'Running for 30 minutes'), ('stallrad09o3', 'si', 'මිනිත්තු 30ක් දිවීම') ON CONFLICT DO NOTHING;

-- Radiology 10
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallrad10', 'RADIOLOGY'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Radiology', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallrad10', 'en', 'What condition of the body is specifically recommended for a pelvic ultrasound scan?', NULL), ('stallrad10', 'si', 'ශ්‍රෝණි ප්‍රදේශයේ (Pelvic) අභිදිවනි ස්කෑන් පරීක්ෂණයක් සඳහා කුමක් නිර්දේශ කෙරේද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad10o0', 'stallrad10', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad10o0', 'en', 'The bladder must be completely empty'), ('stallrad10o0', 'si', 'මුත්‍රාශය සම්පූර්ණයෙන්ම හිස්ව තිබිය යුතුය') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad10o1', 'stallrad10', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad10o1', 'en', 'The bladder must be full'), ('stallrad10o1', 'si', 'මුත්‍රාශය පිරී තිබිය යුතුය') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad10o2', 'stallrad10', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad10o2', 'en', 'The patient must hold their breath for 5 minutes'), ('stallrad10o2', 'si', 'රෝගියා මිනිත්තු 5ක් හුස්ම අල්ලාගෙන සිටිය යුතුය') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad10o3', 'stallrad10', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad10o3', 'en', 'The patient must wear heavy winter clothes'), ('stallrad10o3', 'si', 'රෝගියා ඝන සීතල ඇඳුම් ඇඳිය යුතුය') ON CONFLICT DO NOTHING;

-- Radiology 11
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallrad11', 'RADIOLOGY'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Radiology', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallrad11', 'en', 'What is a key characteristic of Interventional Radiology?', NULL), ('stallrad11', 'si', 'අන්තශේප විකිරණවේදයේ (Interventional Radiology) ප්‍රධාන ලක්ෂණය කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad11o0', 'stallrad11', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad11o0', 'en', 'It uses open major surgery for all treatments'), ('stallrad11o0', 'si', 'සියලුම ප්‍රතිකාර සඳහා විවෘත මහා ශල්‍යකර්ම භාවිතා කිරීම') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad11o1', 'stallrad11', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad11o1', 'en', 'It uses real-time imaging for minimally invasive procedures'), ('stallrad11o1', 'si', 'අවම ආක්‍රමණශීලී ක්‍රියාපටිපාටි (minimally invasive procedures) සඳහා තත්‍ය කාලීන (real-time) ප්‍රතිබිම්බ භාවිත කිරීම') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad11o2', 'stallrad11', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad11o2', 'en', 'It relies entirely on herbal remedies'), ('stallrad11o2', 'si', 'සම්පූර්ණයෙන්ම දේශීය වෙදකම් මත පමණක් යැපීම') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad11o3', 'stallrad11', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad11o3', 'en', 'It only takes pictures without treating anything'), ('stallrad11o3', 'si', 'කිසිදු ප්‍රතිකාරයක් නොකර පින්තූර පමණක් ලබා ගැනීම') ON CONFLICT DO NOTHING;

-- Radiology 12
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallrad12', 'RADIOLOGY'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Radiology', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallrad12', 'en', 'Which medical condition is an X-ray most commonly and quickly used to diagnose in emergency settings?', NULL), ('stallrad12', 'si', 'හදිසි අවස්ථා වලදී වෛද්‍ය තත්ත්වයන් හඳුනා ගැනීම සඳහා එක්ස් කිරණ බහුලවම සහ ඉක්මනින් භාවිතා කරනු ලබන්නේ කුමක් සඳහාද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad12o0', 'stallrad12', 0, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad12o0', 'en', 'Bone fractures'), ('stallrad12o0', 'si', 'අස්ථි බිඳීම් (Bone fractures) හඳුනා ගැනීමට') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad12o1', 'stallrad12', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad12o1', 'en', 'Blood sugar levels'), ('stallrad12o1', 'si', 'රුධිරයේ සීනි මට්ටම පරීක්ෂා කිරීමට') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad12o2', 'stallrad12', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad12o2', 'en', 'Vitamin deficiencies'), ('stallrad12o2', 'si', 'විටමින් ඌනතා සෙවීමට') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad12o3', 'stallrad12', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad12o3', 'en', 'Muscle fatigue'), ('stallrad12o3', 'si', 'මස්පිඩුවල වෙහෙසකාරීබව මැනීමට') ON CONFLICT DO NOTHING;

-- Radiology 13
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallrad13', 'RADIOLOGY'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Radiology', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallrad13', 'en', 'How does Artificial Intelligence (AI) assist modern radiology departments?', NULL), ('stallrad13', 'si', 'නවීන විකිරණවේද අංශයන්ට කෘත්‍රිම බුද්ධිය (AI) උදව් කරන්නේ කෙසේද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad13o0', 'stallrad13', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad13o0', 'en', 'By replacing all human doctors permanently'), ('stallrad13o0', 'si', 'සියලුම මානව වෛද්‍යවරුන් ස්ථිරවම විස්ථාපනය කිරීමෙන්') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad13o1', 'stallrad13', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad13o1', 'en', 'By helping with faster and more accurate image analysis'), ('stallrad13o1', 'si', 'වේගවත් සහ වඩාත් නිවැරදි රෝග විනිශ්චය / රූප විශ්ලේෂණය සඳහා උපකාර කිරීමෙන්') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad13o2', 'stallrad13', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad13o2', 'en', 'By turning off machines automatically at night'), ('stallrad13o2', 'si', 'රාත්‍රී කාලයේදී යන්ත්‍ර ස්වයංක්‍රීයව ක්‍රියා විරහිත කිරීමෙන්') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad13o3', 'stallrad13', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad13o3', 'en', 'By printing physical photos using ink'), ('stallrad13o3', 'si', 'තීන්ත භාවිතයෙන් භෞතික ඡායාරූප මුද්‍රණය කිරීමෙන්') ON CONFLICT DO NOTHING;

-- Radiology 14
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallrad14', 'RADIOLOGY'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Radiology', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallrad14', 'en', 'When taking an X-ray, why are non-imaged sensitive parts of the body (like the thyroid or gonads) covered with protective shields?', NULL), ('stallrad14', 'si', 'එක්ස් කිරණ ලබා ගැනීමේදී, ශරීරයේ ප්‍රතිබිම්බ ගත නොයුතු සංවේදී කොටස් (තයිරොයිඩ් ග්‍රන්ථිය හෝ ජනනේන්ද්‍රිය වැනි) ආරක්ෂිත ආවරණවලින් වසා දමනු ලබන්නේ ඇයි?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad14o0', 'stallrad14', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad14o0', 'en', 'To keep the patient warm'), ('stallrad14o0', 'si', 'රෝගියා උණුසුමෙන් තබා ගැනීමට') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad14o1', 'stallrad14', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad14o1', 'en', 'To minimize unnecessary radiation dose exposure'), ('stallrad14o1', 'si', 'අනවශ්‍ය විකිරණ මාත්‍රා නිරාවරණය අවම කර ගැනීමට') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad14o2', 'stallrad14', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad14o2', 'en', 'To make the X-ray picture darker'), ('stallrad14o2', 'si', 'එක්ස් කිරණ පින්තූරය තද කළු පැහැ ගැන්වීමට') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad14o3', 'stallrad14', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad14o3', 'en', 'To stop the patient from moving'), ('stallrad14o3', 'si', 'රෝගියා චලනය වීම වැළැක්වීමට') ON CONFLICT DO NOTHING;

-- Radiology 15
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallrad15', 'RADIOLOGY'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Radiology', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallrad15', 'en', 'During which decade did Magnetic Resonance Imaging (MRI) first enter clinical practice?', NULL), ('stallrad15', 'si', 'චුම්භක අනුනාද රූපකරණය (MRI) ප්‍රථම වරට සායනික භාවිතයට පැමිණියේ කුමන දශකයේදීද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad15o0', 'stallrad15', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad15o0', 'en', '1950s'), ('stallrad15o0', 'si', '1950 දශකය') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad15o1', 'stallrad15', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad15o1', 'en', '1980s'), ('stallrad15o1', 'si', '1980 දශකය') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad15o2', 'stallrad15', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad15o2', 'en', '2010s'), ('stallrad15o2', 'si', '2010 දශකය') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallrad15o3', 'stallrad15', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallrad15o3', 'en', '1920s'), ('stallrad15o3', 'si', '1920 දශකය') ON CONFLICT DO NOTHING;

-- Nervous system 1
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallnrv01', 'NERVOUS'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Nervous system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallnrv01', 'en', 'Which part of the brain is mainly responsible for maintaining balance and coordinating movements?', NULL), ('stallnrv01', 'si', 'ශරීරයේ සමබරතාව පවත්වා ගැනීමට සහ චලනයන් සම්බන්ධීකරණය කිරීමට ප්‍රධාන වශයෙන් වගකිව යුතු මොළයේ කොටස කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv01o0', 'stallnrv01', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv01o0', 'en', 'Cerebrum'), ('stallnrv01o0', 'si', 'මස්තිෂ්කය (Cerebrum)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv01o1', 'stallnrv01', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv01o1', 'en', 'Cerebellum'), ('stallnrv01o1', 'si', 'අනුමස්තිෂ්කය (Cerebellum)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv01o2', 'stallnrv01', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv01o2', 'en', 'Medulla oblongata'), ('stallnrv01o2', 'si', 'සුෂුම්නා ශීර්ෂකය (Medulla oblongata)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv01o3', 'stallnrv01', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv01o3', 'en', 'Thalamus'), ('stallnrv01o3', 'si', 'තැලමස (Thalamus)') ON CONFLICT DO NOTHING;

-- Nervous system 2
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallnrv02', 'NERVOUS'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Nervous system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallnrv02', 'en', 'What is the basic functional unit of the nervous system?', NULL), ('stallnrv02', 'si', 'ස්නායු පද්ධතියේ මූලික ව්‍යුහාත්මක හා ක්‍රියාකාරී ඒකකය කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv02o0', 'stallnrv02', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv02o0', 'en', 'Nephron'), ('stallnrv02o0', 'si', 'වෘක්ක නාලිකාව (Nephron)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv02o1', 'stallnrv02', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv02o1', 'en', 'Osteocyte'), ('stallnrv02o1', 'si', 'අස්ථි සෛලය (Osteocyte)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv02o2', 'stallnrv02', 2, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv02o2', 'en', 'Neuron'), ('stallnrv02o2', 'si', 'ස්නායු සෛලය (Neuron)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv02o3', 'stallnrv02', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv02o3', 'en', 'Alveolus'), ('stallnrv02o3', 'si', 'ගර්තය (Alveolus)') ON CONFLICT DO NOTHING;

-- Nervous system 3
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallnrv03', 'NERVOUS'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Nervous system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallnrv03', 'en', 'In chemical synaptic transmission, neurotransmitters are released from the:', NULL), ('stallnrv03', 'si', 'රසායනික උපාගමික සම්ප්‍රේෂණයේදී (Chemical synaptic transmission) ස්නායු සම්ප්‍රේෂක (Neurotransmitters) නිදහස් වන්නේ ස්නායු සෛලයේ කුමන කොටසින්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv03o0', 'stallnrv03', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv03o0', 'en', 'Cell body'), ('stallnrv03o0', 'si', 'සෛල දේහයෙන් (Cell body)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv03o1', 'stallnrv03', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv03o1', 'en', 'Dendrite'), ('stallnrv03o1', 'si', 'ඩෙන්ඩ්‍රයිටයෙන් (Dendrite)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv03o2', 'stallnrv03', 2, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv03o2', 'en', 'Axon terminal'), ('stallnrv03o2', 'si', 'අක්සන අග්‍රයෙන් (Axon terminal)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv03o3', 'stallnrv03', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv03o3', 'en', 'Nucleus'), ('stallnrv03o3', 'si', 'න්‍යෂ්ටියෙන් (Nucleus)') ON CONFLICT DO NOTHING;

-- Nervous system 4
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallnrv04', 'NERVOUS'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Nervous system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallnrv04', 'en', 'If you accidentally touch a hot object and immediately withdraw your hand, the rapid response is called a:', NULL), ('stallnrv04', 'si', 'අහම්බෙන් උණුසුම් වස්තුවක් ස්පර්ශ වූ විට ඔබේ අත ක්ෂණිකව ඉවතට ගැනීම හඳුන්වන්නේ කුමක් ලෙසද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv04o0', 'stallnrv04', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv04o0', 'en', 'Memory'), ('stallnrv04o0', 'si', 'මතකය (Memory)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv04o1', 'stallnrv04', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv04o1', 'en', 'Reflex'), ('stallnrv04o1', 'si', 'ප්‍රතීක ක්‍රියාව (Reflex)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv04o2', 'stallnrv04', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv04o2', 'en', 'Emotion'), ('stallnrv04o2', 'si', 'චිත්තවේගය (Emotion)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv04o3', 'stallnrv04', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv04o3', 'en', 'Hormonal response'), ('stallnrv04o3', 'si', 'හෝමෝන ප්‍රතිචාරය (Hormonal response)') ON CONFLICT DO NOTHING;

-- Nervous system 5
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallnrv05', 'NERVOUS'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Nervous system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallnrv05', 'en', 'Which structure carries impulses away from the neuron''s cell body?', NULL), ('stallnrv05', 'si', 'ස්නායු සෛලයක සෛල දේහයෙන් ඉවතට ස්නායු ආවේග ගෙන යන කොටස කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv05o0', 'stallnrv05', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv05o0', 'en', 'Dendrite'), ('stallnrv05o0', 'si', 'ඩෙන්ඩ්‍රයිටය (Dendrite)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv05o1', 'stallnrv05', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv05o1', 'en', 'Synapse'), ('stallnrv05o1', 'si', 'උපාගමය (Synapse)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv05o2', 'stallnrv05', 2, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv05o2', 'en', 'Axon'), ('stallnrv05o2', 'si', 'අක්සනය (Axon)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv05o3', 'stallnrv05', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv05o3', 'en', 'Myelin sheath'), ('stallnrv05o3', 'si', 'මයිලින් කොපුව (Myelin sheath)') ON CONFLICT DO NOTHING;

-- Nervous system 6
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallnrv06', 'NERVOUS'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Nervous system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallnrv06', 'en', 'The sciatic nerve is the:', NULL), ('stallnrv06', 'si', 'මිනිස් සිරුරේ සයටික ස්නායුව (Sciatic nerve) යනු කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv06o0', 'stallnrv06', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv06o0', 'en', 'Smallest nerve in the body'), ('stallnrv06o0', 'si', 'සිරුරේ කුඩාම ස්නායුවයි.') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv06o1', 'stallnrv06', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv06o1', 'en', 'Largest nerve in the body'), ('stallnrv06o1', 'si', 'සිරුරේ විශාලතම ස්නායුවයි.') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv06o2', 'stallnrv06', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv06o2', 'en', 'Nerve supplying only the arm'), ('stallnrv06o2', 'si', 'අතට ස්නායු සැපයුම ලබාදෙන ස්නායුවකි.') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv06o3', 'stallnrv06', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv06o3', 'en', 'Nerve found only in the brain'), ('stallnrv06o3', 'si', 'මොළයේ පිහිටි ස්නායුවකි.') ON CONFLICT DO NOTHING;

-- Nervous system 7
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallnrv07', 'NERVOUS'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Nervous system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallnrv07', 'en', 'Which tract mainly carries pain and temperature sensations to the brain?', NULL), ('stallnrv07', 'si', 'වේදනාව සහ උෂ්ණත්වය පිළිබඳ සංවේදන මොළය වෙත ගෙන යාමට ප්‍රධාන වශයෙන් දායක වන ස්නායු මාර්ගය කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv07o0', 'stallnrv07', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv07o0', 'en', 'Corticospinal tract'), ('stallnrv07o0', 'si', 'කෝටිකෝස්පයිනල් මාර්ගය (Corticospinal tract)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv07o1', 'stallnrv07', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv07o1', 'en', 'Spinothalamic tract'), ('stallnrv07o1', 'si', 'ස්පයිනෝතැලමික් මාර්ගය (Spinothalamic tract)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv07o2', 'stallnrv07', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv07o2', 'en', 'Optic tract'), ('stallnrv07o2', 'si', 'දෘෂ්ටි මාර්ගය (Optic tract)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv07o3', 'stallnrv07', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv07o3', 'en', 'Olfactory tract'), ('stallnrv07o3', 'si', 'ආඝ්‍රාණ මාර්ගය (Olfactory tract)') ON CONFLICT DO NOTHING;

-- Nervous system 8
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallnrv08', 'NERVOUS'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Nervous system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallnrv08', 'en', 'Which tract is primarily responsible for voluntary movement?', NULL), ('stallnrv08', 'si', 'කැමැත්ත අනුව සිදුකරන ශරීර චලනයන් (Voluntary movements) සඳහා ප්‍රධාන වශයෙන් වගකිව යුතු ස්නායු මාර්ගය කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv08o0', 'stallnrv08', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv08o0', 'en', 'Spinothalamic tract'), ('stallnrv08o0', 'si', 'ස්පයිනෝතැලමික් මාර්ගය (Spinothalamic tract)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv08o1', 'stallnrv08', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv08o1', 'en', 'Vestibular tract'), ('stallnrv08o1', 'si', 'වෙස්ටිබියුලර් මාර්ගය (Vestibular tract)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv08o2', 'stallnrv08', 2, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv08o2', 'en', 'Corticospinal tract'), ('stallnrv08o2', 'si', 'කෝටිකෝස්පයිනල් මාර්ගය (Corticospinal tract)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv08o3', 'stallnrv08', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv08o3', 'en', 'Auditory tract'), ('stallnrv08o3', 'si', 'ශ්‍රවණ මාර්ගය (Auditory tract)') ON CONFLICT DO NOTHING;

-- Nervous system 9
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallnrv09', 'NERVOUS'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Nervous system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallnrv09', 'en', 'A stroke affecting the right side of the brain commonly causes weakness on which side of the body?', NULL), ('stallnrv09', 'si', 'මොළයේ දකුණු අර්ධගෝලයට බලපාන ආඝාතයක් (Stroke) ඇති වූ විට සාමාන්‍යයෙන් ශරීරයේ කුමන පැත්තේ දුර්වලතාවක් ඇති වේද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv09o0', 'stallnrv09', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv09o0', 'en', 'Right side'), ('stallnrv09o0', 'si', 'දකුණු පස') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv09o1', 'stallnrv09', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv09o1', 'en', 'Both sides'), ('stallnrv09o1', 'si', 'දෙපසටම') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv09o2', 'stallnrv09', 2, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv09o2', 'en', 'Left side'), ('stallnrv09o2', 'si', 'වම් පස') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv09o3', 'stallnrv09', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv09o3', 'en', 'Neither side'), ('stallnrv09o3', 'si', 'කිසිදු පසක නොවේ') ON CONFLICT DO NOTHING;

-- Nervous system 10
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallnrv10', 'NERVOUS'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Nervous system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallnrv10', 'en', 'During a knee-jerk reflex test, the response occurs before the brain consciously perceives it because the signal travels through the:', NULL), ('stallnrv10', 'si', 'දණහිස් ප්‍රතීක පරීක්ෂාවේදී (Knee-jerk reflex test) මොළය මඟින් ප්‍රතිචාරය සංඥානිකව හඳුනා ගැනීමට පෙර ප්‍රතිචාරය ඇති වනුයේ ස්නායු සංඥාව ගමන් කරන කුමන ස්නායුමාර්ගය නිසාද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv10o0', 'stallnrv10', 0, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv10o0', 'en', 'Reflex arc'), ('stallnrv10o0', 'si', 'ප්‍රතීක චාපය (Reflex arc)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv10o1', 'stallnrv10', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv10o1', 'en', 'Endocrine system'), ('stallnrv10o1', 'si', 'අන්තරාසර්ග පද්ධතිය (Endocrine system)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv10o2', 'stallnrv10', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv10o2', 'en', 'Lymphatic system'), ('stallnrv10o2', 'si', 'වසා පද්ධතිය (Lymphatic system)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv10o3', 'stallnrv10', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv10o3', 'en', 'Digestive system'), ('stallnrv10o3', 'si', 'ආහාර ජීර්ණ පද්ධතිය (Digestive system)') ON CONFLICT DO NOTHING;

-- Nervous system 11
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallnrv11', 'NERVOUS'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Nervous system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallnrv11', 'en', 'Colour blindness most commonly affects the ability to distinguish between:', NULL), ('stallnrv11', 'si', 'වර්ණ දෘෂ්ටි ඌනතාවයේ (Colour vision deficiency) බහුලව දක්නට ලැබෙන ආකාරයේදී වෙන්කර හඳුනා ගැනීමට අපහසු වන්නේ කුමන වර්ණ දෙකද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv11o0', 'stallnrv11', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv11o0', 'en', 'Blue and yellow'), ('stallnrv11o0', 'si', 'නිල් සහ කහ') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv11o1', 'stallnrv11', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv11o1', 'en', 'Red and green'), ('stallnrv11o1', 'si', 'රතු සහ කොළ') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv11o2', 'stallnrv11', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv11o2', 'en', 'Black and white'), ('stallnrv11o2', 'si', 'කළු සහ සුදු') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv11o3', 'stallnrv11', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv11o3', 'en', 'Purple and orange'), ('stallnrv11o3', 'si', 'දම් සහ තැඹිලි') ON CONFLICT DO NOTHING;

-- Nervous system 12
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallnrv12', 'NERVOUS'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Nervous system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallnrv12', 'en', 'Which part of the ear is responsible for converting sound vibrations into nerve impulses?', NULL), ('stallnrv12', 'si', 'ශබ්ද තරංගවලින් ඇතිවන කම්පන ස්නායු ආවේග බවට පරිවර්තනය කරන්නේ කනේ කුමන කොටසද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv12o0', 'stallnrv12', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv12o0', 'en', 'Pinna'), ('stallnrv12o0', 'si', 'කන් පෙත්ත (Pinna)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv12o1', 'stallnrv12', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv12o1', 'en', 'Ear canal'), ('stallnrv12o1', 'si', 'බාහිර ශ්‍රවණ නාලය (Ear canal)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv12o2', 'stallnrv12', 2, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv12o2', 'en', 'Cochlea'), ('stallnrv12o2', 'si', 'කර්ණ ශංඛය (Cochlea)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv12o3', 'stallnrv12', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv12o3', 'en', 'Eardrum'), ('stallnrv12o3', 'si', 'කන් බෙරය (Eardrum)') ON CONFLICT DO NOTHING;

-- Nervous system 13
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallnrv13', 'NERVOUS'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Nervous system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallnrv13', 'en', 'Sciatica is commonly caused by irritation or compression of the:', NULL), ('stallnrv13', 'si', 'සයටිකා (Sciatica) තත්ත්වය සාමාන්‍යයෙන් ඇතිවන්නේ කුමන ස්නායුවේ උද්දීපනය හෝ තෙරපීම නිසාද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv13o0', 'stallnrv13', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv13o0', 'en', 'Facial nerve'), ('stallnrv13o0', 'si', 'මුහුණේ ස්නායුව (Facial nerve)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv13o1', 'stallnrv13', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv13o1', 'en', 'Optic nerve'), ('stallnrv13o1', 'si', 'දෘෂ්ටි ස්නායුව (Optic nerve)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv13o2', 'stallnrv13', 2, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv13o2', 'en', 'Sciatic nerve'), ('stallnrv13o2', 'si', 'සයටික ස්නායුව (Sciatic nerve)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv13o3', 'stallnrv13', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv13o3', 'en', 'Vagus nerve'), ('stallnrv13o3', 'si', 'වේගස් ස්නායුව (Vagus nerve)') ON CONFLICT DO NOTHING;

-- Nervous system 14
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallnrv14', 'NERVOUS'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Nervous system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallnrv14', 'en', 'Lumbar puncture is usually performed to obtain:', NULL), ('stallnrv14', 'si', 'කටී කශේරුකා අතරින් සිදුකරන කටී කශේරුකා සිදුරු කිරීමේ පරීක්ෂණයේදී (Lumbar puncture) සාමාන්‍යයෙන් ලබාගන්නේ කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv14o0', 'stallnrv14', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv14o0', 'en', 'Blood sample'), ('stallnrv14o0', 'si', 'රුධිර සාම්පලයක්') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv14o1', 'stallnrv14', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv14o1', 'en', 'Bone marrow'), ('stallnrv14o1', 'si', 'අස්ථි මිදුළු (Bone marrow)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv14o2', 'stallnrv14', 2, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv14o2', 'en', 'Cerebrospinal fluid (CSF)'), ('stallnrv14o2', 'si', 'මස්තිෂ්ක-සුෂුම්නා තරලය (Cerebrospinal fluid – CSF)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv14o3', 'stallnrv14', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv14o3', 'en', 'Urine sample'), ('stallnrv14o3', 'si', 'මුත්‍රා සාම්පලයක්') ON CONFLICT DO NOTHING;

-- Nervous system 15
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallnrv15', 'NERVOUS'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Nervous system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallnrv15', 'en', 'Approximately how many neurons are present in the human brain?', NULL), ('stallnrv15', 'si', 'මිනිස් මොළයේ ආසන්න වශයෙන් නියුරෝන (Neurons) කොපමණ ප්‍රමාණයක් පවතීද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv15o0', 'stallnrv15', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv15o0', 'en', '8 million'), ('stallnrv15o0', 'si', 'මිලියන 8ක්') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv15o1', 'stallnrv15', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv15o1', 'en', '86 million'), ('stallnrv15o1', 'si', 'මිලියන 86ක්') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv15o2', 'stallnrv15', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv15o2', 'en', '860 million'), ('stallnrv15o2', 'si', 'මිලියන 860ක්') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallnrv15o3', 'stallnrv15', 3, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallnrv15o3', 'en', '86 billion'), ('stallnrv15o3', 'si', 'බිලියන 86ක්') ON CONFLICT DO NOTHING;

-- Musculoskeletal system 1
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallmsk01', 'MUSCULOSKELETAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Musculoskeletal system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallmsk01', 'en', 'How many bones are in the adult human body?', NULL), ('stallmsk01', 'si', 'වැඩිහිටි මිනිස් සිරුරක අස්ථි කීයක් තිබේද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk01o0', 'stallmsk01', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk01o0', 'en', '186'), ('stallmsk01o0', 'si', '186') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk01o1', 'stallmsk01', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk01o1', 'en', '206'), ('stallmsk01o1', 'si', '206') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk01o2', 'stallmsk01', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk01o2', 'en', '226'), ('stallmsk01o2', 'si', '226') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk01o3', 'stallmsk01', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk01o3', 'en', '256'), ('stallmsk01o3', 'si', '256') ON CONFLICT DO NOTHING;

-- Musculoskeletal system 2
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallmsk02', 'MUSCULOSKELETAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Musculoskeletal system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallmsk02', 'en', 'Which is the longest bone in the human body?', NULL), ('stallmsk02', 'si', 'මිනිස් සිරුරේ දිගම අස්ථිය කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk02o0', 'stallmsk02', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk02o0', 'en', 'Humerus'), ('stallmsk02o0', 'si', 'Humerus (ප්‍රගණ්ඩාස්ථිය)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk02o1', 'stallmsk02', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk02o1', 'en', 'Tibia'), ('stallmsk02o1', 'si', 'Tibia (ජංඝාස්ථිය)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk02o2', 'stallmsk02', 2, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk02o2', 'en', 'Femur'), ('stallmsk02o2', 'si', 'Femur (ඌර්වාස්ථිය)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk02o3', 'stallmsk02', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk02o3', 'en', 'Fibula'), ('stallmsk02o3', 'si', 'Fibula (අනුජංඝාස්ථිය)') ON CONFLICT DO NOTHING;

-- Musculoskeletal system 3
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallmsk03', 'MUSCULOSKELETAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Musculoskeletal system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallmsk03', 'en', 'What type of joint is the shoulder?', NULL), ('stallmsk03', 'si', 'උරහිස් සන්ධිය අයත් වන්නේ කුමන සන්ධි වර්ගයටද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk03o0', 'stallmsk03', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk03o0', 'en', 'Hinge'), ('stallmsk03o0', 'si', 'Hinge joint (අසව් සන්ධිය)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk03o1', 'stallmsk03', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk03o1', 'en', 'Ball and socket'), ('stallmsk03o1', 'si', 'Ball and socket joint (ගෝල-කුහර සන්ධිය)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk03o2', 'stallmsk03', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk03o2', 'en', 'Pivot'), ('stallmsk03o2', 'si', 'Pivot joint (විවර්තන සන්ධිය)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk03o3', 'stallmsk03', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk03o3', 'en', 'Gliding'), ('stallmsk03o3', 'si', 'Gliding joint (ප්‍රසර්පණ සන්ධිය)') ON CONFLICT DO NOTHING;

-- Musculoskeletal system 4
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallmsk04', 'MUSCULOSKELETAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Musculoskeletal system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallmsk04', 'en', 'Which protein filament forms the thick filament in a sarcomere?', NULL), ('stallmsk04', 'si', 'සාකොමියරයක ඝන සූත්‍රිකා සාදන ප්‍රෝටීනය කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk04o0', 'stallmsk04', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk04o0', 'en', 'Actin'), ('stallmsk04o0', 'si', 'Actin') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk04o1', 'stallmsk04', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk04o1', 'en', 'Troponin'), ('stallmsk04o1', 'si', 'Troponin') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk04o2', 'stallmsk04', 2, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk04o2', 'en', 'Myosin'), ('stallmsk04o2', 'si', 'Myosin') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk04o3', 'stallmsk04', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk04o3', 'en', 'Tropomyosin'), ('stallmsk04o3', 'si', 'Tropomyosin') ON CONFLICT DO NOTHING;

-- Musculoskeletal system 5
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallmsk05', 'MUSCULOSKELETAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Musculoskeletal system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallmsk05', 'en', 'Which ion binds troponin to trigger muscle contraction?', NULL), ('stallmsk05', 'si', 'මාංශ පේශි සංකෝචනය ආරම්භ කිරීම සඳහා Troponin සමඟ බැඳෙන අයනය කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk05o0', 'stallmsk05', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk05o0', 'en', 'Na+'), ('stallmsk05o0', 'si', 'Na⁺ (සෝඩියම්)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk05o1', 'stallmsk05', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk05o1', 'en', 'Ca2+'), ('stallmsk05o1', 'si', 'Ca²⁺ (කැල්සියම්)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk05o2', 'stallmsk05', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk05o2', 'en', 'K+'), ('stallmsk05o2', 'si', 'K⁺ (පොටෑසියම්)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk05o3', 'stallmsk05', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk05o3', 'en', 'Mg2+'), ('stallmsk05o3', 'si', 'Mg²⁺ (මැග්නීසියම්)') ON CONFLICT DO NOTHING;

-- Musculoskeletal system 6
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallmsk06', 'MUSCULOSKELETAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Musculoskeletal system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallmsk06', 'en', 'What connects muscle to bone?', NULL), ('stallmsk06', 'si', 'මාංශ පේශියක් අස්ථියකට සම්බන්ධ කරන්නේ කුමක් මගින්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk06o0', 'stallmsk06', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk06o0', 'en', 'Ligament'), ('stallmsk06o0', 'si', 'Ligament (බන්ධනී)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk06o1', 'stallmsk06', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk06o1', 'en', 'Cartilage'), ('stallmsk06o1', 'si', 'Cartilage (කාටිලේජ)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk06o2', 'stallmsk06', 2, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk06o2', 'en', 'Tendon'), ('stallmsk06o2', 'si', 'Tendon (කණ්ඩරා)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk06o3', 'stallmsk06', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk06o3', 'en', 'Fascia'), ('stallmsk06o3', 'si', 'Fascia (මාංශ පේශි ආවරණ පටකය)') ON CONFLICT DO NOTHING;

-- Musculoskeletal system 7
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallmsk07', 'MUSCULOSKELETAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Musculoskeletal system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallmsk07', 'en', 'What connects bone to bone at a joint?', NULL), ('stallmsk07', 'si', 'සන්ධියකදී අස්ථියක් තවත් අස්ථියකට සම්බන්ධ කරන්නේ කුමක් මගින්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk07o0', 'stallmsk07', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk07o0', 'en', 'Tendon'), ('stallmsk07o0', 'si', 'Tendon (කණ්ඩරා)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk07o1', 'stallmsk07', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk07o1', 'en', 'Ligament'), ('stallmsk07o1', 'si', 'Ligament (බන්ධනී)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk07o2', 'stallmsk07', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk07o2', 'en', 'Aponeurosis'), ('stallmsk07o2', 'si', 'Aponeurosis') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk07o3', 'stallmsk07', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk07o3', 'en', 'Periosteum'), ('stallmsk07o3', 'si', 'Periosteum (අස්ථි ආවරණ පටලය)') ON CONFLICT DO NOTHING;

-- Musculoskeletal system 8
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallmsk08', 'MUSCULOSKELETAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Musculoskeletal system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallmsk08', 'en', 'Which muscle type is voluntary and striated?', NULL), ('stallmsk08', 'si', 'කැමැත්ත අනුව පාලනය කළ හැකි සහ විලේඛ සහිත මාංශ පේශි වර්ගය කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk08o0', 'stallmsk08', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk08o0', 'en', 'Cardiac'), ('stallmsk08o0', 'si', 'Cardiac muscle (හෘත් පේශි)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk08o1', 'stallmsk08', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk08o1', 'en', 'Smooth'), ('stallmsk08o1', 'si', 'Smooth muscle (සිනිඳු පේශි)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk08o2', 'stallmsk08', 2, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk08o2', 'en', 'Skeletal'), ('stallmsk08o2', 'si', 'Skeletal muscle (කංකාල පේශි)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk08o3', 'stallmsk08', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk08o3', 'en', 'Visceral'), ('stallmsk08o3', 'si', 'Visceral muscle (අන්තරංග පේශි)') ON CONFLICT DO NOTHING;

-- Musculoskeletal system 9
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallmsk09', 'MUSCULOSKELETAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Musculoskeletal system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallmsk09', 'en', 'Which vitamin deficiency causes rickets in children?', NULL), ('stallmsk09', 'si', 'ළමුන් තුළ Rickets (රිකට්ස්) රෝගය ඇතිවීමට හේතු වන විටමින් ඌනතාවය කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk09o0', 'stallmsk09', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk09o0', 'en', 'Vitamin A'), ('stallmsk09o0', 'si', 'Vitamin A') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk09o1', 'stallmsk09', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk09o1', 'en', 'Vitamin C'), ('stallmsk09o1', 'si', 'Vitamin C') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk09o2', 'stallmsk09', 2, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk09o2', 'en', 'Vitamin D'), ('stallmsk09o2', 'si', 'Vitamin D') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk09o3', 'stallmsk09', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk09o3', 'en', 'Vitamin K'), ('stallmsk09o3', 'si', 'Vitamin K') ON CONFLICT DO NOTHING;

-- Musculoskeletal system 10
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallmsk10', 'MUSCULOSKELETAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Musculoskeletal system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallmsk10', 'en', 'Which cells build new bone matrix?', NULL), ('stallmsk10', 'si', 'අස්ථි පූරකය (Bone matrix) නිපදවන්නේ කුමන සෛල මගින්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk10o0', 'stallmsk10', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk10o0', 'en', 'Osteoclasts'), ('stallmsk10o0', 'si', 'Osteoclasts') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk10o1', 'stallmsk10', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk10o1', 'en', 'Osteoblasts'), ('stallmsk10o1', 'si', 'Osteoblasts') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk10o2', 'stallmsk10', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk10o2', 'en', 'Chondrocytes'), ('stallmsk10o2', 'si', 'Chondrocytes') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk10o3', 'stallmsk10', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk10o3', 'en', 'Osteocytes'), ('stallmsk10o3', 'si', 'Osteocytes') ON CONFLICT DO NOTHING;

-- Musculoskeletal system 11
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallmsk11', 'MUSCULOSKELETAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Musculoskeletal system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallmsk11', 'en', 'Which is the strongest muscle in the body relative to its size, used when you clench your jaw?', NULL), ('stallmsk11', 'si', 'ප්‍රමාණයට සාපේක්ෂව මිනිස් සිරුරේ ශක්තිමත්ම මාංශ පේශිය කුමක්ද? (හක්ක තදකරන විට භාවිතා වේ.)', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk11o0', 'stallmsk11', 0, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk11o0', 'en', 'Masseter'), ('stallmsk11o0', 'si', 'Masseter') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk11o1', 'stallmsk11', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk11o1', 'en', 'Temporalis'), ('stallmsk11o1', 'si', 'Temporalis') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk11o2', 'stallmsk11', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk11o2', 'en', 'Deltoid'), ('stallmsk11o2', 'si', 'Deltoid') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk11o3', 'stallmsk11', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk11o3', 'en', 'Gluteus Maximus'), ('stallmsk11o3', 'si', 'Gluteus Maximus') ON CONFLICT DO NOTHING;

-- Musculoskeletal system 12
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallmsk12', 'MUSCULOSKELETAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Musculoskeletal system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallmsk12', 'en', 'Which acid builds up in muscles during intense exercise with low oxygen, causing fatigue?', NULL), ('stallmsk12', 'si', 'අඩු ඔක්සිජන් සැපයුමක් යටතේ අධිකව ව්‍යායාම කිරීමේදී, මාංශ පේශි තුළ එකතු වී විඩාව ඇති කිරීමට සම්බන්ධ වන අම්ලය කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk12o0', 'stallmsk12', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk12o0', 'en', 'Acetic acid'), ('stallmsk12o0', 'si', 'Acetic acid') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk12o1', 'stallmsk12', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk12o1', 'en', 'Pyruvic acid'), ('stallmsk12o1', 'si', 'Pyruvic acid') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk12o2', 'stallmsk12', 2, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk12o2', 'en', 'Lactic acid'), ('stallmsk12o2', 'si', 'Lactic acid') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk12o3', 'stallmsk12', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk12o3', 'en', 'Citric acid'), ('stallmsk12o3', 'si', 'Citric acid') ON CONFLICT DO NOTHING;

-- Musculoskeletal system 13
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallmsk13', 'MUSCULOSKELETAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Musculoskeletal system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallmsk13', 'en', 'Which is the smallest bone in the human body?', NULL), ('stallmsk13', 'si', 'මිනිස් සිරුරේ කුඩාම අස්ථිය කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk13o0', 'stallmsk13', 0, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk13o0', 'en', 'Stapes'), ('stallmsk13o0', 'si', 'Stapes (ධරණකය)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk13o1', 'stallmsk13', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk13o1', 'en', 'Incus'), ('stallmsk13o1', 'si', 'Incus (නිඝාතිය)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk13o2', 'stallmsk13', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk13o2', 'en', 'Malleus'), ('stallmsk13o2', 'si', 'Malleus (මුද්ගරිකාව)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk13o3', 'stallmsk13', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk13o3', 'en', 'Hyoid'), ('stallmsk13o3', 'si', 'Hyoid') ON CONFLICT DO NOTHING;

-- Musculoskeletal system 14
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallmsk14', 'MUSCULOSKELETAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Musculoskeletal system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallmsk14', 'en', 'What is the functional unit of a muscle fibre, found between two Z-lines?', NULL), ('stallmsk14', 'si', 'මාංශ පේශි තන්තුවක (Muscle fiber) Z-රේඛා දෙකක් අතර පිහිටා ඇති එහි ක්‍රියාකාරී ඒකකය කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk14o0', 'stallmsk14', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk14o0', 'en', 'Myofibril'), ('stallmsk14o0', 'si', 'Myofibril') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk14o1', 'stallmsk14', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk14o1', 'en', 'Sarcomere'), ('stallmsk14o1', 'si', 'Sarcomere') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk14o2', 'stallmsk14', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk14o2', 'en', 'Sarcolemma'), ('stallmsk14o2', 'si', 'Sarcolemma') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk14o3', 'stallmsk14', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk14o3', 'en', 'Sarcoplasm'), ('stallmsk14o3', 'si', 'Sarcoplasm') ON CONFLICT DO NOTHING;

-- Musculoskeletal system 15
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallmsk15', 'MUSCULOSKELETAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Musculoskeletal system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallmsk15', 'en', 'Which condition involves reduced bone density, making bones fragile, especially in older women?', NULL), ('stallmsk15', 'si', 'විශේෂයෙන්ම වයස්ගත කාන්තාවන් තුළ අස්ථි ඝනත්වය අඩුවීම නිසා අස්ථි බිඳෙනසුලු වන රෝගී තත්ත්වය කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk15o0', 'stallmsk15', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk15o0', 'en', 'Arthritis'), ('stallmsk15o0', 'si', 'Arthritis (සන්ධි පර්වදාහය)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk15o1', 'stallmsk15', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk15o1', 'en', 'Osteoporosis'), ('stallmsk15o1', 'si', 'Osteoporosis (අස්ථි වෛවර්යය)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk15o2', 'stallmsk15', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk15o2', 'en', 'Gout'), ('stallmsk15o2', 'si', 'Gout (ගවුට්)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallmsk15o3', 'stallmsk15', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallmsk15o3', 'en', 'Scoliosis'), ('stallmsk15o3', 'si', 'Scoliosis (කොඳු ඇට පෙළ වක්‍ර වීම)') ON CONFLICT DO NOTHING;

-- Renal system 1
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallren01', 'RENAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Renal system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallren01', 'en', 'What is the main function of the kidney?', 'The kidneys filter waste products such as urea from the blood and produce urine.'), ('stallren01', 'si', 'වකුගඩුවේ ප්‍රධාන කාර්යය කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren01o0', 'stallren01', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren01o0', 'en', 'Digestion of food'), ('stallren01o0', 'si', 'ආහාර ජීර්ණය කිරීම') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren01o1', 'stallren01', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren01o1', 'en', 'Filtering blood and removing waste products'), ('stallren01o1', 'si', 'රුධිර අපද්‍රව්‍ය ඉවත් කිරීම') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren01o2', 'stallren01', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren01o2', 'en', 'Producing insulin'), ('stallren01o2', 'si', 'ඉන්සියුලින් නිපදවීම') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren01o3', 'stallren01', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren01o3', 'en', 'Storing oxygen'), ('stallren01o3', 'si', 'ඔක්සිජන් ගබඩා කිරීම') ON CONFLICT DO NOTHING;

-- Renal system 2
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallren02', 'RENAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Renal system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallren02', 'en', 'What is the functional unit of the kidney?', 'The nephron is the functional unit of the kidney responsible for filtering blood and forming urine.'), ('stallren02', 'si', 'වකුගඩුවේ ක්‍රියාකාරී ඒකකය කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren02o0', 'stallren02', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren02o0', 'en', 'Renal pelvis'), ('stallren02o0', 'si', 'වෘක්ක ශ්‍රෝණිය (Renal pelvis)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren02o1', 'stallren02', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren02o1', 'en', 'Nephron'), ('stallren02o1', 'si', 'නෙෆ්‍රෝනය (Nephron)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren02o2', 'stallren02', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren02o2', 'en', 'Ureter'), ('stallren02o2', 'si', 'මුත්‍ර වාහිනිය (Ureter)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren02o3', 'stallren02', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren02o3', 'en', 'Renal medulla'), ('stallren02o3', 'si', 'වෘක්ක මජ්ජාව (Renal medulla)') ON CONFLICT DO NOTHING;

-- Renal system 3
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallren03', 'RENAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Renal system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallren03', 'en', 'Where does blood filtration begin?', 'Blood filtration begins in the glomerulus, where fluid is filtered into Bowman''s capsule.'), ('stallren03', 'si', 'රුධිර පෙරීම (Filtration) ආරම්භ වන්නේ කොතැනද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren03o0', 'stallren03', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren03o0', 'en', 'Loop of Henle'), ('stallren03o0', 'si', 'හෙන්ලේ පුඩුව (Loop of Henle)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren03o1', 'stallren03', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren03o1', 'en', 'Collecting duct'), ('stallren03o1', 'si', 'සංග්‍රාහක නාලිකාව (Collecting duct)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren03o2', 'stallren03', 2, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren03o2', 'en', 'Glomerulus'), ('stallren03o2', 'si', 'ගුච්ඡිකාව (Glomerulus)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren03o3', 'stallren03', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren03o3', 'en', 'Ureter'), ('stallren03o3', 'si', 'මුත්‍ර වාහිනිය (Ureter)') ON CONFLICT DO NOTHING;

-- Renal system 4
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallren04', 'RENAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Renal system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallren04', 'en', 'Which of the following is a common sign of kidney failure?', 'When kidneys fail to remove excess fluid and salt, fluid accumulates in the body causing swelling (edema), especially in the legs and ankles.'), ('stallren04', 'si', 'වකුගඩු අකර්මණ්‍යතාවයේ (Kidney failure) පොදු ලක්ෂණයක් කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren04o0', 'stallren04', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren04o0', 'en', 'Increased urine production always'), ('stallren04o0', 'si', 'සෑමවිටම වැඩිපුර මුත්‍රා පිටවීම') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren04o1', 'stallren04', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren04o1', 'en', 'Swelling of the legs and ankles'), ('stallren04o1', 'si', 'පාද සහ වළලුකර ඉදිමීම') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren04o2', 'stallren04', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren04o2', 'en', 'Improved energy levels'), ('stallren04o2', 'si', 'ශක්තිය වැඩි වීම') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren04o3', 'stallren04', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren04o3', 'en', 'Increased appetite'), ('stallren04o3', 'si', 'ආහාර රුචිය වැඩි වීම') ON CONFLICT DO NOTHING;

-- Renal system 5
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallren05', 'RENAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Renal system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallren05', 'en', 'A common symptom of kidney stones is:', 'Kidney stones commonly cause severe flank pain that may radiate to the groin (renal colic).'), ('stallren05', 'si', 'වකුගඩු ගල් ඇති විට මූලික රෝග ලක්ෂණයක් වන්නේ:', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren05o0', 'stallren05', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren05o0', 'en', 'Chest pain'), ('stallren05o0', 'si', 'පපුවේ වේදනාව') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren05o1', 'stallren05', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren05o1', 'en', 'Severe flank pain radiating to the groin'), ('stallren05o1', 'si', 'පිට කොන්ද දෙපස වේදනාව') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren05o2', 'stallren05', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren05o2', 'en', 'Blurred vision'), ('stallren05o2', 'si', 'ඇස් පෙනීම අඩුවීම') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren05o3', 'stallren05', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren05o3', 'en', 'Ear pain'), ('stallren05o3', 'si', 'කකුල් හිරිවැටීම') ON CONFLICT DO NOTHING;

-- Renal system 6
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallren06', 'RENAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Renal system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallren06', 'en', 'Which factor increases the risk of kidney stone formation?', 'Dehydration concentrates urine and increases the risk of stone formation.'), ('stallren06', 'si', 'වකුගඩු ගල් සෑදීමේ අවදානම වැඩි කරන සාධකයක් වන්නේ?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren06o0', 'stallren06', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren06o0', 'en', 'Drinking plenty of water'), ('stallren06o0', 'si', 'අධික ලෙස ජලය පානය කිරීම') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren06o1', 'stallren06', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren06o1', 'en', 'Regular exercise'), ('stallren06o1', 'si', 'නිතිපතා ව්‍යායාම කිරීම') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren06o2', 'stallren06', 2, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren06o2', 'en', 'Dehydration'), ('stallren06o2', 'si', 'විජලනය (Dehydration)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren06o3', 'stallren06', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren06o3', 'en', 'A balanced diet'), ('stallren06o3', 'si', 'සමබර ආහාර ගැනීම') ON CONFLICT DO NOTHING;

-- Renal system 7
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallren07', 'RENAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Renal system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallren07', 'en', 'Which hormone produced by the kidneys stimulates red blood cell production?', 'Erythropoietin stimulates the bone marrow to produce red blood cells.'), ('stallren07', 'si', 'රතු රුධිර සෛල නිපදවීම උත්තේජනය කරන, වකුගඩුවෙන් නිපදවන හෝමෝනය කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren07o0', 'stallren07', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren07o0', 'en', 'Insulin'), ('stallren07o0', 'si', 'ඉන්සියුලින් (Insulin)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren07o1', 'stallren07', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren07o1', 'en', 'Erythropoietin'), ('stallren07o1', 'si', 'එරිත්‍රොපොයිටින් (Erythropoietin)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren07o2', 'stallren07', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren07o2', 'en', 'Thyroxine'), ('stallren07o2', 'si', 'තයිරොක්සින් (Thyroxine)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren07o3', 'stallren07', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren07o3', 'en', 'Adrenaline'), ('stallren07o3', 'si', 'ඇඩ්‍රිනලින් (Adrenaline)') ON CONFLICT DO NOTHING;

-- Renal system 8
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallren08', 'RENAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Renal system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallren08', 'en', 'The kidneys help regulate which of the following?', 'The kidneys regulate blood pressure through the renin–angiotensin–aldosterone system (RAAS).'), ('stallren08', 'si', 'වකුගඩු කුමක් පාලනය කිරීමට උපකාරී වේද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren08o0', 'stallren08', 0, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren08o0', 'en', 'Blood pressure'), ('stallren08o0', 'si', 'රුධිර පීඩනය') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren08o1', 'stallren08', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren08o1', 'en', 'Bile pigment levels'), ('stallren08o1', 'si', 'පිත් වර්ණක මට්ටම') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren08o2', 'stallren08', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren08o2', 'en', 'Long term vitamin levels'), ('stallren08o2', 'si', 'දිගු කාලීන විටමින් ගබඩා කිරීම') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren08o3', 'stallren08', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren08o3', 'en', 'Skin color'), ('stallren08o3', 'si', 'සමේ වර්ණය') ON CONFLICT DO NOTHING;

-- Renal system 9
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallren09', 'RENAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Renal system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallren09', 'en', 'What is the correct pathway of urine?', 'Urine flows from the kidney through the ureter to the bladder and exits through the urethra.'), ('stallren09', 'si', 'මුත්‍රා ගමන් කරන නිවැරදි මාර්ගය කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren09o0', 'stallren09', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren09o0', 'en', 'Kidney → Bladder → Ureter → Urethra'), ('stallren09o0', 'si', 'වකුගඩුව → මුත්‍රාශය → මුත්‍ර වාහිනිය → මුත්‍ර මාර්ගය') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren09o1', 'stallren09', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren09o1', 'en', 'Kidney → Ureter → Bladder → Urethra'), ('stallren09o1', 'si', 'වකුගඩුව → මුත්‍ර වාහිනිය → මුත්‍රාශය → මුත්‍ර මාර්ගය') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren09o2', 'stallren09', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren09o2', 'en', 'Bladder → Kidney → Ureter → Urethra'), ('stallren09o2', 'si', 'මුත්‍රාශය → වකුගඩුව → මුත්‍ර වාහිනිය → මුත්‍ර මාර්ගය') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren09o3', 'stallren09', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren09o3', 'en', 'Kidney → Urethra → Bladder → Ureter'), ('stallren09o3', 'si', 'වකුගඩුව → මුත්‍ර මාර්ගය → මුත්‍රාශය → මුත්‍ර වාහිනිය') ON CONFLICT DO NOTHING;

-- Renal system 10
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallren10', 'RENAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Renal system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallren10', 'en', 'What is the most common type of kidney stone?', 'Calcium oxalate stones are the most common type of kidney stone.'), ('stallren10', 'si', 'බහුලව හමුවන වකුගඩු ගල් වර්ගය කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren10o0', 'stallren10', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren10o0', 'en', 'Uric acid stone'), ('stallren10o0', 'si', 'යූරික් අම්ල ගල් (Uric acid stone)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren10o1', 'stallren10', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren10o1', 'en', 'Calcium oxalate stone'), ('stallren10o1', 'si', 'කැල්සියම් ඔක්සලේට් ගල් (Calcium oxalate stone)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren10o2', 'stallren10', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren10o2', 'en', 'Cystine stone'), ('stallren10o2', 'si', 'සිස්ටීන් ගල් (Cystine stone)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren10o3', 'stallren10', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren10o3', 'en', 'Struvite stone'), ('stallren10o3', 'si', 'ස්ට්‍රුවයිට් ගල් (Struvite stone)') ON CONFLICT DO NOTHING;

-- Renal system 11
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallren11', 'RENAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Renal system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallren11', 'en', 'Which of the following is a function of the kidneys?', 'The kidneys regulate the body''s water and electrolyte balance.'), ('stallren11', 'si', 'පහත සඳහන් පිළිතුරුවලින් වකුගඩුවේ කාර්යයක් වන්නේ කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren11o0', 'stallren11', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren11o0', 'en', 'Producing digestive enzymes'), ('stallren11o0', 'si', 'ජීර්ණ එන්සයිම නිපදවීම') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren11o1', 'stallren11', 1, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren11o1', 'en', 'Maintaining the body''s fluid and electrolyte balance'), ('stallren11o1', 'si', 'ශරීරයේ දියර හා ඛනිජ ලවණ සමතුලිතතාව පවත්වා ගැනීම') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren11o2', 'stallren11', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren11o2', 'en', 'Producing bile'), ('stallren11o2', 'si', 'පිත නිපදවීම') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren11o3', 'stallren11', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren11o3', 'en', 'Breaking down fats'), ('stallren11o3', 'si', 'මේදය බිඳ දැමීම') ON CONFLICT DO NOTHING;

-- Renal system 12
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallren12', 'RENAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Renal system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallren12', 'en', 'Which electrolyte is mainly regulated by the kidneys?', 'The kidneys help maintain normal sodium levels, which are important for fluid balance and blood pressure.'), ('stallren12', 'si', 'වකුගඩු මගින් ප්‍රධාන වශයෙන් පාලනය කරන ඛනිජ ලවණය කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren12o0', 'stallren12', 0, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren12o0', 'en', 'Sodium (Na⁺)'), ('stallren12o0', 'si', 'සෝඩියම් (Sodium – Na⁺)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren12o1', 'stallren12', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren12o1', 'en', 'Iron (Fe)'), ('stallren12o1', 'si', 'යකඩ (Iron – Fe)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren12o2', 'stallren12', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren12o2', 'en', 'Iodine (I)'), ('stallren12o2', 'si', 'අයඩීන් (Iodine – I)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren12o3', 'stallren12', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren12o3', 'en', 'Fluoride (F)'), ('stallren12o3', 'si', 'ෆ්ලෝරයිඩ් (Fluoride – F)') ON CONFLICT DO NOTHING;

-- Renal system 13
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallren13', 'RENAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Renal system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallren13', 'en', 'Which vitamin is activated by the kidneys?', 'The kidneys activate vitamin D into calcitriol, which helps maintain calcium balance and healthy bones.'), ('stallren13', 'si', 'වකුගඩු මගින් සක්‍රීය කරන විටමින් කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren13o0', 'stallren13', 0, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren13o0', 'en', 'Vitamin A'), ('stallren13o0', 'si', 'විටමින් A') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren13o1', 'stallren13', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren13o1', 'en', 'Vitamin C'), ('stallren13o1', 'si', 'විටමින් C') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren13o2', 'stallren13', 2, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren13o2', 'en', 'Vitamin D'), ('stallren13o2', 'si', 'විටමින් D') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren13o3', 'stallren13', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren13o3', 'en', 'Vitamin K'), ('stallren13o3', 'si', 'විටමින් K') ON CONFLICT DO NOTHING;

-- Renal system 14
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallren14', 'RENAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Renal system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallren14', 'en', 'Which by-product accumulates in the blood when kidney function decreases?', 'When kidney filtration decreases, waste products such as creatinine accumulate in the blood because the kidneys cannot remove them effectively.'), ('stallren14', 'si', 'වකුගඩු ක්‍රියාකාරීත්වය අඩු වූ විට රුධිරයේ එකතු වන සංඝටකය කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren14o0', 'stallren14', 0, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren14o0', 'en', 'Creatinine'), ('stallren14o0', 'si', 'ක්‍රියටිනින් (Creatinine)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren14o1', 'stallren14', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren14o1', 'en', 'Oxygen'), ('stallren14o1', 'si', 'ඔක්සිජන් (Oxygen)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren14o2', 'stallren14', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren14o2', 'en', 'Glucose'), ('stallren14o2', 'si', 'ග්ලූකෝස් (Glucose)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren14o3', 'stallren14', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren14o3', 'en', 'Calcium'), ('stallren14o3', 'si', 'කැල්සියම් (Calcium)') ON CONFLICT DO NOTHING;

-- Renal system 15
INSERT INTO "Question" ("id","category","difficulty","reviewStatus","dataOrigin","source","reviewedAt","createdAt","updatedAt") VALUES ('stallren15', 'RENAL'::"QuestionCategory", 'MEDIUM', 'REVIEWED', 'PRODUCTION', 'Exhibition stall quiz - Renal system', now(), now(), now()) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionTranslation" ("questionId","locale","prompt","explanation") VALUES ('stallren15', 'en', 'Which substance is normally almost completely reabsorbed by healthy kidneys?', 'In healthy kidneys, almost all filtered glucose is reabsorbed in the proximal convoluted tubule. Glucose in urine may indicate an abnormality such as diabetes mellitus.'), ('stallren15', 'si', 'නිරෝගී වකුගඩුවකදී සම්පූර්ණයෙන්ම පාහේ නැවත අවශෝෂණය වන ද්‍රව්‍යය කුමක්ද?', NULL) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren15o0', 'stallren15', 0, true) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren15o0', 'en', 'Glucose'), ('stallren15o0', 'si', 'ග්ලූකෝස් (Glucose)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren15o1', 'stallren15', 1, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren15o1', 'en', 'Creatinine'), ('stallren15o1', 'si', 'ක්‍රියටිනින් (Creatinine)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren15o2', 'stallren15', 2, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren15o2', 'en', 'Urea'), ('stallren15o2', 'si', 'යූරියා (Urea)') ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOption" ("id","questionId","position","isCorrect") VALUES ('stallren15o3', 'stallren15', 3, false) ON CONFLICT DO NOTHING;
INSERT INTO "QuestionOptionTranslation" ("optionId","locale","text") VALUES ('stallren15o3', 'en', 'Uric acid'), ('stallren15o3', 'si', 'යූරික් අම්ලය (Uric acid)') ON CONFLICT DO NOTHING;
