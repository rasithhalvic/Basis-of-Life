# Organizer guide

A short guide for the people running the exhibition. You need an administrator account (ask your technical contact to create one).

## Before the exhibition

1. **Sign in** at `https://<your-site>/admin/login`.
2. **Settings** — enter the exhibition name, introduction, dates and venue in English and Sinhala. Set the *Public base URL* to the real website address (`https://…`).
3. **Pioneers** — check all 15 pages. Records marked *SAMPLE* are placeholders written for testing: replace the text with your approved content, add licensed portraits with their credit line, and list sources. Keep exactly 15 published.
4. **Question bank** — questions are general knowledge (science, geography, history, arts, sports, technology, everyday knowledge). Read each one, check the answer and that the Sinhala version means exactly the same, then press **Mark reviewed**. Only reviewed questions are used in sessions. Editing a question sends it back to "unreviewed".
5. **QR codes** — when the page shows no warnings, press **Download all** and send the ZIP to the printer. Scan every printed poster with a phone before opening day.

## Running a quiz session (up to 20 people)

1. **Quiz sessions → Create and open registration.** You get a 6-character code (e.g. `K7P2QX`). Defaults: 10 questions, 30 seconds each. You can change settings until you start.
2. Tell visitors to open the website, tap **Join General Knowledge Quiz**, choose a nickname and either tap the session or type the code. Show the code on a screen or sign. A direct link `…/quiz/join/K7P2QX` also works (you can make a QR code for it).
3. Open the session page in the dashboard: you see how many of 20 have joined and their nicknames. When the session is full, new visitors are told it is full and offered other open sessions — create another session if needed.
4. Press **Start session** when ready. Admission closes, everyone gets the same questions at the same time, and a short countdown begins. Phones show one question at a time with a timer. Answers cannot be changed. Missed questions score 0.
5. After the last question, visitors see their own results and correct answers. The ranking is *provisional*.
6. Press **Finalize results**. The session leaderboard becomes official and the top 3 (ties included) enter the grand leaderboard.

**If something goes wrong** (power cut, wrong group), press **Cancel session** and give a reason. Cancelled sessions never count.

**Disqualifying someone** — on the session page, press **Disqualify** next to the nickname and give the reason. Rankings update immediately. You can **Reinstate** if it was a mistake. Every action is recorded in the **Audit log**.

## Leaderboards and the big screen

- Open `…/leaderboards/grand/display` on the exhibition screen in full-screen mode. It refreshes itself.
- Rankings: more points first; equal points are separated by total answer time measured by the server. Phone network delays can slightly affect time, and different sessions get different (comparable) questions — the site explains this to visitors.
- The grand leaderboard is labelled *provisional* until every session is finalized or cancelled and you tick **Declare the grand leaderboard final** in Settings.
- **Export CSV**: each finalized session page has *Export CSV*; the grand leaderboard CSV is on the Audit log page.

## Visitor questions you may get

- *"I closed my browser / changed phone."* — Use **Not you? Use a recovery code** on the quiz page with the code shown at registration. Reopening the same browser usually just works.
- *"Do I need my real name or phone number?"* — No. Only a nickname. They can choose not to show it on public leaderboards.
- *"Can I play twice?"* — Each person can join one session at a time. Without verified identity the site cannot fully stop someone registering again; use disqualification for obvious abuse.
- *"Is the quiz about the pioneers?"* — No. It is a general knowledge quiz on many subjects.
