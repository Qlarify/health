#!/usr/bin/env python3
"""
Generate 22 specialty SEO pages from the cardiology template.

Strategy:
- Use specialty-pages/cardiology-cardiac-surgery.html as the HTML shell.
- For each specialty config below, do targeted block replacements for
  the specialty-specific parts (hero H1/subhead/bullets, two-path card,
  trust-strip stat 3, patient-reality cards, problem/solution bullets,
  how-it-works descriptions, use cases, sample-work scaffolded with
  [PLACEHOLDER], differentiation table, FAQ x 9-10, related specialties,
  final CTA, and all schemas (Service, BreadcrumbList, FAQPage).
- Global string replacements for the specialty name / slug / UTM.
- Leave visual structure + CSS + JS untouched so the design carries
  through unchanged.
"""
import os
import re
from pathlib import Path

ROOT = Path(__file__).parent
TEMPLATE_FILE = ROOT / 'specialty-pages' / 'cardiology-cardiac-surgery.html'
OUT_DIR = ROOT / 'specialty-pages'

# Shared content blocks ======================================================

# Method steps (Audit/Map/Produce/Deploy) — labels are universal,
# "what we produce" language adapts via the procedure list below.

# Sample-work scaffold — 5 cards with placeholder video IDs.
# Real video IDs to be filled in per specialty when the library exists.
SAMPLE_WORK_CARDS_TEMPLATE = '''        <div class="vid-card" role="link" tabindex="0" data-youtube-id="[PLACEHOLDER_VIDEO_ID_1]" aria-label="Play: [PLACEHOLDER: Stage 01 video title]">
          <div class="vid-shell">
            <span class="vid-badge">01 · Symptom awareness</span>
            <img class="poster" src="https://i.ytimg.com/vi/[PLACEHOLDER_VIDEO_ID_1]/hqdefault.jpg" alt="[PLACEHOLDER: Stage 01 alt]" loading="lazy" />
            <div class="poster-veil"></div>
            <div class="play-ring" aria-hidden="true"></div>
          </div>
          <div class="vid-meta">
            <div class="vid-stage">Stage 01 · Symptom awareness</div>
            <div class="vid-title">[PLACEHOLDER: Stage 01 video title]</div>
            <div class="vid-note">[PLACEHOLDER: Dr. Name · Sub-specialty · Hospital]</div>
          </div>
        </div>

        <div class="vid-card" role="link" tabindex="0" data-youtube-id="[PLACEHOLDER_VIDEO_ID_2]" aria-label="Play: [PLACEHOLDER: Stage 02 video title]">
          <div class="vid-shell">
            <span class="vid-badge rust">02 · Trust building</span>
            <img class="poster" src="https://i.ytimg.com/vi/[PLACEHOLDER_VIDEO_ID_2]/hqdefault.jpg" alt="[PLACEHOLDER: Stage 02 alt]" loading="lazy" />
            <div class="poster-veil"></div>
            <div class="play-ring" aria-hidden="true"></div>
          </div>
          <div class="vid-meta">
            <div class="vid-stage">Stage 02 · Trust building</div>
            <div class="vid-title">[PLACEHOLDER: Stage 02 video title]</div>
            <div class="vid-note">[PLACEHOLDER: HOD name · Hospital · A senior-specialist introduction]</div>
          </div>
        </div>

        <div class="vid-card" role="link" tabindex="0" data-youtube-id="[PLACEHOLDER_VIDEO_ID_3]" aria-label="Play: [PLACEHOLDER: Stage 03 video title]">
          <div class="vid-shell">
            <span class="vid-badge">03 · Decision</span>
            <img class="poster" src="https://i.ytimg.com/vi/[PLACEHOLDER_VIDEO_ID_3]/hqdefault.jpg" alt="[PLACEHOLDER: Stage 03 alt]" loading="lazy" />
            <div class="poster-veil"></div>
            <div class="play-ring" aria-hidden="true"></div>
          </div>
          <div class="vid-meta">
            <div class="vid-stage">Stage 03 · Decision</div>
            <div class="vid-title">[PLACEHOLDER: Stage 03 video title]</div>
            <div class="vid-note">[PLACEHOLDER: Dr. Name · Hospital · A procedure comparison video]</div>
          </div>
        </div>

        <div class="vid-card" role="link" tabindex="0" data-youtube-id="[PLACEHOLDER_VIDEO_ID_4]" aria-label="Play: [PLACEHOLDER: Stage 04 video title]">
          <div class="vid-shell">
            <span class="vid-badge">04 · Post-treatment care</span>
            <img class="poster" src="https://i.ytimg.com/vi/[PLACEHOLDER_VIDEO_ID_4]/hqdefault.jpg" alt="[PLACEHOLDER: Stage 04 alt]" loading="lazy" />
            <div class="poster-veil"></div>
            <div class="play-ring" aria-hidden="true"></div>
          </div>
          <div class="vid-meta">
            <div class="vid-stage">Stage 04 · Post-treatment care</div>
            <div class="vid-title">[PLACEHOLDER: Stage 04 video title]</div>
            <div class="vid-note">[PLACEHOLDER: Patient story · Hospital · A consented recovery testimonial]</div>
          </div>
        </div>'''

# Universal FAQ base (with {specialty} placeholder) — we give each specialty
# 8 common Qs with substitutions + 2 specialty-specific Qs from its config.
COMMON_FAQS_TEMPLATE = [
    {
        "q": "How do you handle clinical accuracy for {specialty} content?",
        "a": "Every video passes a clinical accuracy review with your senior {specialty} specialist before release. Our editorial team includes medical writers and producers who have worked exclusively with hospital specialties for over a decade, so we arrive with a strong first draft, not a blank page. Scripts are versioned, consented, and signed off by your HOD before the shoot."
    },
    {
        "q": "How long does it take to produce a {specialty} video library?",
        "a": "The first batch of 15 to 20 videos is typically produced in 45 to 60 days from kickoff. Audit and mapping take 2 to 4 weeks. Shoots are scheduled around your specialists' clinic and OT calendars, and post-production is 7 to 10 working days per video. A full library of 40 to 60 videos delivered in 180 days is a realistic baseline for a mid-sized hospital group."
    },
    {
        "q": "Do you work with solo {specialty} practices or only hospital groups?",
        "a": "Both. Our larger engagements are typically with multi-centre hospital groups, and we also support independent {specialty} centres and specialty clinics. A typical minimum engagement is a 10-video starter library focused on your top three procedures and two or three senior specialists."
    },
    {
        "q": "How do you handle senior-specialist time for {specialty}?",
        "a": "We plan shoots around the specialist's schedule, not the other way around. A typical HOD commits 4 to 6 hours across three to four shoot days for a full library, split into morning clinic gaps, OT down-time, and pre-arranged studio sessions. Scripts are delivered in advance, and we shoot multiple videos back-to-back to respect clinical bandwidth."
    },
    {
        "q": "What does a {specialty} video library cost?",
        "a": "A starter library of 15 videos typically begins at \u20b98 to 12 lakh depending on specialty mix, language requirements, and patient story inclusion. A full enterprise library of 40 to 60 videos is scoped bespoke based on procedures covered, number of centres, and languages required. A free audit and scoping always precedes a proposal."
    },
    {
        "q": "What languages do you deliver {specialty} videos in?",
        "a": "English and eight Indian languages: Hindi, Kannada, Tamil, Telugu, Malayalam, Marathi, Gujarati, and Bengali. We deliver subtitled versions for other languages on request."
    },
    {
        "q": "Can you produce patient testimonial videos for {specialty} ethically?",
        "a": "Yes. Every patient video is consented in writing before the shoot, edited with the patient's review and approval before publish, and retained with revocable permissions. We avoid the manipulative tone common in hospital testimonials and instead film honest recovery arcs that build real trust with future patients. Aligned with Medical Council of India guidelines and the Consumer Protection Act 2019."
    },
    {
        "q": "Do you handle {specialty} video distribution after production?",
        "a": "Production is the start. Distribution across your website, YouTube channel, Practo profile, Google Business listings, referring-doctor WhatsApp, and paid media is included in a full engagement. We also hand over an editorial governance document so your in-house team can maintain pace after launch."
    },
]


# Specialty configs ==========================================================
# Each specialty provides just the specialty-specific content. The generator
# handles name substitutions, URL/UTM swaps, and assembly.

SPECIALTIES = [
    {
        'slug': 'vascular-endovascular',
        'name_full': 'Vascular & Endovascular',
        'name_lc': 'vascular and endovascular',
        'adjective': 'vascular',
        'hero_h1_em': 'Hospitals in India',
        'hero_h1_rest': 'Vascular & Endovascular Video Marketing & Patient Education Agency for',
        'hero_subhead': "A specialist video production partner for vascular and endovascular programmes. Procedure-level content for peripheral arterial disease, varicose veins, deep-vein thrombosis, aortic aneurysm repair, carotid artery disease, dialysis access, and venous stenting. Covers both open vascular surgery and minimally invasive endovascular paths across every major vascular procedure.",
        'bullets': [
            "Covers both <b>open vascular surgery</b> and <b>endovascular</b> paths under one library.",
            "Four stages: Symptom awareness (leg pain, claudication, swelling), Trust building, Decision, Post-procedure care.",
            "Senior specialist visibility for <b>vascular surgeons, interventional radiologists, and phlebologists</b>.",
            "Consented patient recovery stories for amputation prevention, wound healing, and return-to-mobility arcs.",
            "Multi-language delivery in English and eight Indian languages.",
        ],
        'path_a_label': 'Endovascular',
        'path_a_flow': 'Intent → OPD → Day-care',
        'path_a_note': 'Angioplasty + stenting, embolisation, EVAR (endovascular aortic repair), sclerotherapy. Day-care or short IPD.',
        'path_b_label': 'Open Vascular Surgery',
        'path_b_flow': 'Intent → OPD → IPD',
        'path_b_note': 'Bypass surgery, endarterectomy, aneurysm repair, AV fistula creation for dialysis access. Full IPD pathway.',
        'trust_stat3': 'Vascular sub-specialties covered',
        'reality_h2': "Vascular patients often wait years before seeking help, until the pain or the wound forces a decision.",
        'reality_intro': "Leg pain that wakes at night, a calf cramp while walking, a varicose vein that won't heal, a sudden cold foot. Vascular patients often tolerate symptoms for months or years before calling a hospital. By the time they do, they have already spent dozens of hours on Google and YouTube comparing bypass versus angioplasty, open surgery versus endovascular, dialysis-access options. Centres that show up in that research with a senior vascular surgeon on screen are better placed to earn both the consult and the procedure.",
        'reality_cards': [
            ("\ud83d\udd53", "Late presentation is common across vascular.", "Patients minimise leg pain, claudication, swelling, or slow-healing wounds for months. A calm vascular surgeon on screen explaining when symptoms need urgent review helps reduce avoidable amputations and failed dialysis access."),
            ("\ud83d\udd04", "Endovascular versus open surgery is the key decision moment.", "When an aneurysm, significant block, or dialysis failure points toward intervention, patients and families research extensively before choosing between minimally invasive endovascular and open vascular surgery. Decision-aid content helps the right patient choose the right path."),
            ("\ud83d\udc68\u200d\u2695\ufe0f", "Vascular specialists are often low-visibility online.", "The interventional radiologist doing EVAR, the vascular surgeon doing bypass, the phlebologist treating venous disease. Many remain low-visibility online even at leading centres."),
            ("\ud83c\udfe5", "Cath labs, hybrid OTs, and vascular theatres benefit from context.", "Vascular hybrid OTs and endovascular suites represent significant capex. Patient-facing explainers help patients understand what those investments mean for their care and appropriate procedure choice."),
        ],
        'problem_h2': "A 'best vascular care' banner doesn't book an aneurysm repair. A surgeon explaining when it's the right call can help.",
        'problem_common': [
            "Similar 'best vascular care' pages across many hospitals.",
            "A single vascular landing page covering varicose veins, dialysis access, and aortic aneurysms together.",
            "Vascular surgeon bios listing degrees, limited visible procedure context.",
            "Little decision-aid content comparing endovascular vs open surgery or which graft is right.",
            "Few consented patient recovery stories for amputation prevention or return-to-mobility arcs.",
        ],
        'problem_cost': [
            "Vascular consults drifting toward centres with more visible surgeon content.",
            "Hybrid-OT and cath-lab capacity running below its potential utilisation.",
            "Endovascular case volume moving toward teams with published case context.",
            "Dialysis access (AV fistula) creation volume running below potential.",
            "GPs, diabetologists, and nephrologists referring toward centres they can see working online.",
        ],
        'problem_works': [
            "Procedure-specific library across varicose veins, DVT, PAD, aneurysm repair, carotid disease, dialysis access.",
            "Surgeon-led technique explainers with visible case counts and honest OT footage.",
            "Decision-aid videos comparing endovascular vs open surgery and which graft to choose.",
            "Consented patient recovery arcs for amputation prevention and return-to-walking journeys.",
            "Measured in consults, hybrid-OT utilisation, EVAR volume, and dialysis access sign-offs.",
        ],
        'cta_text': "Request a Free Audit of Your Vascular Funnel",
        'use_cases': [
            ("Stage 01 · Symptom awareness", "Is this leg pain a sign of poor circulation?", "A calm vascular surgeon explaining claudication, DVT warning signs, and when to see a specialist helps patients and families take the right next step."),
            ("Stage 02 · Trust building", "Which vascular surgeon or interventionalist has experience with my condition?", "Senior-specialist introductions for vascular surgery, interventional radiology, and venous disease help patients form a considered view ahead of a consult."),
            ("Stage 03 · Decision", "Is endovascular enough, or do I need open surgery?", "A vascular-surgeon-plus-interventionalist comparison of endovascular and open options, with honest indications and trade-offs, supports the critical procedure-choice moment."),
            ("Stage 04 · Post-treatment care", "What does recovery actually look like after a bypass or an EVAR?", "Consented patient recovery videos and return-to-mobility programmes help post-op patients and offer credible context for future patients weighing similar decisions."),
        ],
        'diff_rows': [
            ("A single 'best vascular care' page covering every procedure", "Procedure-specific library across bypass, EVAR, varicose veins, DVT, carotid, dialysis access"),
            ("Vascular surgeon bios listing degrees, with limited procedure context", "Surgeon-led explainers with visible case context, an approach that tends to build stronger trust"),
            ("Little decision-aid content comparing endovascular and open surgery", "Honest procedure-comparison videos that help the right patient understand the right option"),
            ("Few post-op or recovery videos in the library", "Consented patient recovery arcs from bypass, EVAR, amputation prevention, and dialysis access"),
            ("Performance reported as impressions and form-fills", "Performance tracked against consults, hybrid-OT utilisation, EVAR volume, and dialysis access sign-offs"),
        ],
        'faqs_specialty': [
            {
                "q": "What does a vascular and endovascular video library include?",
                "a": "A complete vascular library covers every stage of the patient journey: symptom education (claudication, DVT warning signs, varicose veins), procedure explainers (endovascular repair, bypass surgery, EVAR, carotid endarterectomy, AV fistula creation, sclerotherapy), senior-specialist introductions, real patient recovery stories, and post-procedure care content. A typical library for a multi-centre vascular programme is 40 to 60 videos produced over 180 days, then ongoing library extensions quarterly.",
            },
            {
                "q": "How do you measure ROI on vascular video marketing?",
                "a": "We measure outcomes that matter: vascular consult volume per week, endovascular and open-surgery OT schedule fill-rate, hybrid-OT utilisation, dialysis access (AV fistula) creation volume, and inbound referrals from diabetologists, nephrologists, and GPs. A quarterly review ties each published video to its measurable contribution."
            },
        ],
        'related_specialties': [
            ('/cardiology-cardiac-surgery/', 'Cardiology & Cardiac Surgery'),
            ('/nephrology-dialysis/', 'Nephrology & Dialysis'),
            ('/interventional-radiology/', 'Interventional Radiology'),
            ('/minimally-invasive-surgery/', 'Minimally Invasive & Robotic Surgery'),
            ('/orthopaedics-joint-care/', 'Orthopaedics & Joint Care'),
            ('/video-infrastructure', 'Video Infrastructure Hub'),
        ],
        'service_description': "A video library for vascular and endovascular programmes covering two parallel paths: the endovascular day-care path (angioplasty + stenting, EVAR, sclerotherapy, AV fistula creation) and the open vascular surgery IPD path (bypass, endarterectomy, aneurysm repair). Content is organised across four journey stages: Symptom awareness, Trust building, Decision, and Post-treatment care.",
        'service_audience': "Hospital CMOs, Vascular Surgery Heads, Interventional Radiology Heads, Chief Marketing Officers at multi-specialty hospitals",
        'final_cta_h2': 'your vascular programme',
    },
    # More specialties follow; each uses the same keys. Minimal starter configs
    # for the remaining 21 — enough to get a differentiated page per specialty.
    {
        'slug': 'haematology-bmt',
        'name_full': 'Haematology & BMT',
        'name_lc': 'haematology and bone marrow transplant',
        'adjective': 'haematology',
        'hero_h1_em': 'Hospitals in India',
        'hero_h1_rest': 'Haematology & BMT Video Marketing & Patient Education Agency for',
        'hero_subhead': "A specialist video production partner for haematology and bone marrow transplant programmes. Covers leukaemias, lymphomas, myeloma, aplastic anaemia, sickle cell disease, autologous and allogeneic BMT, and cellular therapies.",
        'bullets': [
            "Covers malignant and benign haematology plus BMT (autologous + allogeneic).",
            "Four stages mapped to the patient journey from diagnosis to post-transplant survivorship.",
            "Senior specialist visibility for haemato-oncologists and BMT unit leads.",
            "Consented survivor stories for leukaemia, lymphoma, and allogeneic transplant journeys.",
            "Multi-language delivery in English and eight Indian languages.",
        ],
        'path_a_label': 'Haematology',
        'path_a_flow': 'Intent → OPD → Treatment',
        'path_a_note': 'Chemotherapy, targeted therapy, immunotherapy for leukaemias, lymphomas, myeloma. Day-care and IPD.',
        'path_b_label': 'Bone Marrow Transplant',
        'path_b_flow': 'Intent → OPD → Transplant Unit',
        'path_b_note': 'Autologous BMT, matched related/unrelated allogeneic BMT, haplo-identical transplant, CAR-T cellular therapies.',
        'trust_stat3': 'Haematology sub-specialties covered',
        'reality_h2': "Haematology patients face a long, complex treatment path with many decision moments.",
        'reality_intro': "A routine blood test reveals a high white count. A persistent fever, night sweats, or bruising turns into a diagnosis. Haematology patients and their families face months or years of treatment, often with a transplant decision at the centre. They research at every step. Centres that show up with calm, specialist-led video answers at each moment earn the consult and, when indicated, the transplant.",
        'reality_cards': [
            ("\ud83d\udd2c", "Diagnosis starts with a routine test more often than a symptom.", "Abnormal CBC, persistent fatigue, bruising, or a first-time high WBC. Patients research their report before calling any specialist."),
            ("\ud83d\udc6a", "BMT is a whole-family decision, often across cities.", "Transplant decisions involve donors, caregivers, financial planning, and months of logistics. Families research in parallel, often in different languages."),
            ("\ud83d\udd04", "Second-opinion seekers are common in haemato-oncology.", "For complex leukaemias and refractory cases, patients travel to specialist centres. Visible tumour-board process wins those referrals."),
            ("\ud83c\udfe5", "BMT units and CAR-T capabilities benefit from context.", "Class-10,000 BMT rooms, CAR-T manufacturing capability, HLA-typing labs. Patient-facing explainers contextualise the investment."),
        ],
        'problem_h2': "A 'world-class haematology unit' banner doesn't explain the transplant decision. A senior haematologist can.",
        'problem_common': [
            "Generic 'cancer care' pages covering haematology alongside solid tumours without distinction.",
            "Limited visible BMT-specific content or unit walkthroughs.",
            "Haemato-oncologist bios without treatment protocol context.",
            "Little decision-aid content comparing BMT timing, autologous vs allogeneic, or CAR-T eligibility.",
            "Few consented survivor stories for long-term post-transplant patients.",
        ],
        'problem_cost': [
            "Transplant referrals drifting toward centres with more visible BMT content online.",
            "BMT unit capacity running below its potential utilisation.",
            "Second-opinion seekers defaulting to centres with visible tumour-board process.",
            "Autologous and allogeneic BMT case volume running below potential.",
            "Referring oncologists and physicians sending cases elsewhere.",
        ],
        'problem_works': [
            "Procedure-specific library across chemo protocols, BMT variants, CAR-T, and cellular therapies.",
            "Haematologist-led explainers with tumour-board context and honest protocol detail.",
            "Decision-aid videos comparing autologous vs allogeneic BMT, transplant timing, and CAR-T options.",
            "Consented survivor arcs for leukaemia, lymphoma, and allogeneic transplant journeys.",
            "Measured in consults, transplant volume, BMT unit occupancy, and cellular therapy sign-offs.",
        ],
        'cta_text': "Request a Free Audit of Your Haematology Funnel",
        'use_cases': [
            ("Stage 01 · Symptom awareness", "What does this abnormal blood report mean?", "A calm haematologist explaining CBC abnormalities, warning signs, and when to see a specialist helps patients navigate the pre-diagnosis anxiety."),
            ("Stage 02 · Trust building", "Which centre has real BMT or CAR-T experience?", "Senior-specialist introductions and BMT unit tours with case context help patients and referring physicians choose where to transfer."),
            ("Stage 03 · Decision", "Autologous or allogeneic? When is CAR-T the right option?", "A haematologist-led comparison of transplant variants and cellular therapies, with honest indications, supports the critical treatment-choice moment."),
            ("Stage 04 · Post-treatment care", "What does life look like 1 year, 5 years after a transplant?", "Consented long-term survivor stories offer credible context for future patients weighing transplant decisions."),
        ],
        'diff_rows': [
            ("Haematology bundled into generic 'cancer care' pages", "Haematology-specific library distinct from solid-tumour oncology"),
            ("Haemato-oncologist bios without protocol depth", "Specialist-led explainers with visible tumour-board and protocol context"),
            ("Little BMT-specific decision content", "Dedicated transplant decision videos covering autologous vs allogeneic, CAR-T eligibility"),
            ("Few long-term post-transplant survivor stories", "Consented 1-year, 5-year, 10-year transplant survivor arcs"),
            ("Performance reported as impressions", "Measured in consults, transplant volume, BMT unit occupancy"),
        ],
        'faqs_specialty': [
            {
                "q": "What does a haematology and BMT video library include?",
                "a": "A complete haematology library covers leukaemias (AML, ALL, CML, CLL), lymphomas (Hodgkin, non-Hodgkin), multiple myeloma, aplastic anaemia, sickle cell and thalassaemia, autologous and allogeneic BMT, haplo-identical transplant, and CAR-T cellular therapies. Senior-specialist explainers, transplant unit tours, and consented long-term survivor stories. 40 to 60 videos over 180 days.",
            },
            {
                "q": "How do you measure ROI on haematology video marketing?",
                "a": "Haematology ROI is measured in consult volume per sub-specialty, transplant case volume (autologous, allogeneic, haplo-identical), BMT unit occupancy rate, CAR-T eligibility assessments, tumour-board case volume, and inbound second-opinion referrals. A quarterly review ties each published video to its measurable contribution.",
            },
        ],
        'related_specialties': [
            ('/oncology-cancer-care/', 'Oncology & Cancer Care'),
            ('/paediatric-oncology/', 'Paediatric Oncology'),
            ('/organ-transplant/', 'Organ Transplant Programme'),
            ('/critical-care/', 'Emergency & Critical Care'),
            ('/video-infrastructure', 'Video Infrastructure Hub'),
        ],
        'service_description': "A video library for haematology and BMT programmes covering malignant haematology (leukaemias, lymphomas, myeloma), benign haematology (aplastic anaemia, sickle cell, thalassaemia), bone marrow transplant (autologous, allogeneic, haplo-identical), and CAR-T cellular therapies. Content organised across four journey stages: Symptom awareness, Trust building, Decision, and Post-treatment care including long-term survivorship.",
        'service_audience': "Hospital CMOs, Haematology Programme Heads, BMT Unit Leads, Chief Marketing Officers at multi-specialty hospitals and cancer centres",
        'final_cta_h2': 'your haematology and BMT programme',
    },
    {
        'slug': 'neurology',
        'name_full': 'Neurology',
        'name_lc': 'neurology',
        'adjective': 'neurology',
        'hero_h1_em': 'Hospitals in India',
        'hero_h1_rest': 'Neurology Video Marketing & Patient Education Agency for',
        'hero_subhead': "A specialist video production partner for neurology programmes. Covers stroke care, epilepsy, Parkinson's disease, multiple sclerosis, headache medicine, movement disorders, neuro-muscular disease, and cognitive disorders.",
        'bullets': [
            "Covers acute neurology (stroke, status epilepticus) and chronic neurology (epilepsy, MS, Parkinson's).",
            "Four stages mapped for both acute and chronic patient paths.",
            "Senior specialist visibility for stroke neurologists, epileptologists, and movement disorder specialists.",
            "Consented patient recovery stories for stroke rehab, epilepsy control, and Parkinson's management.",
            "Multi-language delivery in English and eight Indian languages.",
        ],
        'path_a_label': 'Acute Neurology',
        'path_a_flow': 'Intent → ER → Admission',
        'path_a_note': 'Stroke (thrombolysis + thrombectomy), status epilepticus, acute neurological emergencies. ER-to-IPD pathway.',
        'path_b_label': 'Chronic Neurology',
        'path_b_flow': 'Intent → OPD → Long-term care',
        'path_b_note': 'Epilepsy, multiple sclerosis, Parkinson\'s disease, headache disorders, neuro-muscular disease. Long-term OPD + day-care pathway.',
        'trust_stat3': 'Neurology sub-specialties covered',
        'reality_h2': "Neurological symptoms are often dismissed until they can't be, and patients research extensively before reaching the right specialist.",
        'reality_intro': "A persistent headache, a first-time seizure, a tremor that won't go away, sudden weakness on one side. Neurological symptoms are often dismissed or sent to the wrong specialist. Patients and families research for weeks before finding the right neurologist. Centres with visible stroke teams, epilepsy monitoring units, and movement-disorder specialists earn both the acute admission and the chronic-care consult.",
        'reality_cards': [
            ("\u23f1\ufe0f", "Stroke is a time-to-treatment game.", "Thrombolysis and thrombectomy work only within a narrow window. Awareness videos that teach families to recognise FAST warning signs save real lives."),
            ("\ud83d\udd04", "Epilepsy is under-diagnosed and under-treated in India.", "First-time seizures often get misdiagnosed or ignored. Videos explaining when to see an epileptologist vs a general neurologist help the right patient find the right path."),
            ("\ud83d\udc68\u200d\u2695\ufe0f", "Movement disorder specialists are rare but high-impact.", "Parkinson's, dystonia, tremor — these need a movement-disorder-trained neurologist. Most patients don't know this specialty exists."),
            ("\ud83e\udde0", "Cognitive symptoms are a whole-family concern.", "Memory loss, behavioural change, dementia — families research together, often across cities. Decision-aid content helps them choose a specialist."),
        ],
        'problem_h2': "A 'best neurology care' banner doesn't treat a stroke. A neurologist explaining the FAST window can.",
        'problem_common': [
            "Similar 'best neurology' pages across many hospitals.",
            "A single neurology landing page covering stroke, epilepsy, and Parkinson's together.",
            "Neurologist bios without sub-specialty distinction (stroke vs epilepsy vs movement disorders).",
            "Little decision-aid content for chronic neurological conditions.",
            "Few consented patient recovery stories for stroke rehab or epilepsy control.",
        ],
        'problem_cost': [
            "Stroke consults drifting toward centres with more visible stroke team content.",
            "Epilepsy monitoring unit capacity running below its potential utilisation.",
            "DBS and advanced Parkinson's case volume moving toward teams with published case context.",
            "Neuro-rehab programme sign-ups running below potential.",
            "Referring physicians sending neurology cases elsewhere.",
        ],
        'problem_works': [
            "Sub-specialty-specific library across stroke, epilepsy, MS, Parkinson's, headache.",
            "Specialist-led explainers for stroke teams, epileptologists, and movement disorder neurologists.",
            "Decision-aid videos for medication options, DBS, thrombectomy indications.",
            "Consented patient recovery stories for stroke rehab and epilepsy control.",
            "Measured in stroke admission volume, epilepsy monitoring unit occupancy, DBS volume.",
        ],
        'cta_text': "Request a Free Audit of Your Neurology Funnel",
        'use_cases': [
            ("Stage 01 · Symptom awareness", "Is this headache something I should worry about?", "A calm neurologist explaining red-flag headache features, when to act, and when to wait helps patients triage correctly."),
            ("Stage 02 · Trust building", "Which neurologist has experience with my specific condition?", "Senior-specialist introductions for stroke, epilepsy, movement disorders, MS help patients and families choose the right sub-specialist."),
            ("Stage 03 · Decision", "Medication, surgery, or DBS — what's right for me?", "A specialist-led comparison of medication optimisation, epilepsy surgery, DBS for Parkinson's, and other options supports the critical treatment-choice moment."),
            ("Stage 04 · Post-treatment care", "What does life look like after a stroke or starting epilepsy medication?", "Consented patient stories and rehabilitation programme overviews offer credible context."),
        ],
        'diff_rows': [
            ("A single 'best neurology' page covering every condition", "Sub-specialty-specific library for stroke, epilepsy, MS, Parkinson's, headache"),
            ("Neurologist bios listing degrees without sub-specialty context", "Specialist-led explainers with visible sub-specialty experience"),
            ("Little decision-aid content for treatment options", "Honest comparison videos for medications, DBS, thrombectomy, epilepsy surgery"),
            ("Few post-stroke or rehab videos", "Consented patient recovery arcs for stroke, epilepsy, and Parkinson's"),
            ("Performance reported as impressions", "Measured in stroke admission volume, epilepsy monitoring occupancy, DBS case volume"),
        ],
        'faqs_specialty': [
            {
                "q": "What does a neurology video library include?",
                "a": "A complete neurology library covers stroke (acute + prevention), epilepsy (first seizure, medication, surgery), multiple sclerosis, Parkinson's disease (medication + DBS), headache medicine, neuro-muscular disease (myasthenia, ALS), and cognitive disorders. Senior sub-specialty introductions, decision-aid content, and consented patient recovery stories. 40 to 60 videos over 180 days.",
            },
            {
                "q": "How do you measure ROI on neurology video marketing?",
                "a": "Neurology ROI is measured in sub-specialty consult volume (stroke vs epilepsy vs movement disorders), stroke admission volume within the thrombolysis window, epilepsy monitoring unit occupancy, DBS case volume, and inbound referrals from GPs and physicians. Acute neurology ROI benefits from faster patient presentation; chronic neurology from better sub-specialty routing.",
            },
        ],
        'related_specialties': [
            ('/neurosurgery/', 'Neurosurgery'),
            ('/cardiology-cardiac-surgery/', 'Cardiology & Cardiac Surgery'),
            ('/emergency-critical-care/', 'Emergency & Critical Care'),
            ('/orthopaedics-joint-care/', 'Orthopaedics & Joint Care'),
            ('/video-infrastructure', 'Video Infrastructure Hub'),
        ],
        'service_description': "A video library for neurology programmes covering acute neurology (stroke with thrombolysis and thrombectomy, status epilepticus, acute presentations) and chronic neurology (epilepsy, multiple sclerosis, Parkinson's disease, headache medicine, neuro-muscular disease, cognitive disorders). Content organised across four journey stages: Symptom awareness, Trust building, Decision, and Post-treatment care.",
        'service_audience': "Hospital CMOs, Neurology Programme Heads, Stroke Unit Leads, Epilepsy Centre Heads, Chief Marketing Officers at multi-specialty hospitals",
        'final_cta_h2': 'your neurology programme',
    },
    {
        'slug': 'neurosurgery',
        'name_full': 'Neurosurgery',
        'name_lc': 'neurosurgery',
        'adjective': 'neurosurgery',
        'hero_h1_em': 'Hospitals in India',
        'hero_h1_rest': 'Neurosurgery Video Marketing & Patient Education Agency for',
        'hero_subhead': "A specialist video production partner for neurosurgery programmes. Covers brain tumours, spine surgery, skull base surgery, functional neurosurgery (DBS, epilepsy surgery), paediatric neurosurgery, and trauma.",
        'bullets': [
            "Covers cranial, spine, functional, paediatric, and trauma neurosurgery.",
            "Four stages mapped from symptom awareness to post-operative recovery.",
            "Senior specialist visibility for neurosurgeons across cranial, spine, and functional specialisations.",
            "Consented patient recovery stories for brain tumour, spine, and DBS patients.",
            "Multi-language delivery in English and eight Indian languages.",
        ],
        'path_a_label': 'Elective Neurosurgery',
        'path_a_flow': 'Intent → OPD → IPD',
        'path_a_note': 'Brain tumours, elective spine surgery, DBS, epilepsy surgery, skull base. Full planned surgical pathway.',
        'path_b_label': 'Emergency Neurosurgery',
        'path_b_flow': 'Intent → ER → OT',
        'path_b_note': 'Head injury, subdural haematoma, acute hydrocephalus, aneurysm rupture. Time-critical ER-to-OT pathway.',
        'trust_stat3': 'Neurosurgical sub-specialties covered',
        'reality_h2': "Brain and spine surgery decisions involve the whole family and months of research before any consent form is signed.",
        'reality_intro': "A brain tumour diagnosis, a disc prolapse, a parent's first subdural, a child's hydrocephalus. Neurosurgery decisions are rarely made alone. Families research across cities, compare techniques (microsurgery vs endoscopic, robotic spine vs open), and seek second opinions. Centres showing senior neurosurgeons explaining procedures honestly earn both the consult and the case.",
        'reality_cards': [
            ("\ud83d\udcda", "Second opinions are the norm in neurosurgery.", "For brain tumours and complex spine, patients commonly consult 2-4 centres before deciding. Visible surgeon explainers + operative footage win those comparisons."),
            ("\ud83d\udd04", "Technique choice matters more than hospital brand.", "Microsurgery vs endoscopic, open vs minimally invasive spine, robotic vs conventional — technique-specific videos close the decision."),
            ("\ud83e\udde0", "Functional neurosurgery is under-referred in India.", "DBS for Parkinson's, epilepsy surgery, pain procedures. Most eligible patients never get referred. Awareness content changes this."),
            ("\ud83c\udfe5", "Advanced neurosurgical OTs represent significant capex.", "Intraoperative MRI, robotic spine systems, Gamma Knife, neuro-navigation. Patient-facing explainers contextualise the investment."),
        ],
        'problem_h2': "A 'best brain surgery' banner doesn't book a craniotomy. A neurosurgeon walking through the technique can.",
        'problem_common': [
            "Generic 'best neurosurgery' pages covering brain and spine together.",
            "Neurosurgeon bios listing degrees, limited technique context.",
            "Little decision-aid content for technique choice (microsurgical vs endoscopic, robotic vs conventional).",
            "Few operative-room context videos or recovery arcs.",
            "Under-visible functional neurosurgery (DBS, epilepsy surgery).",
        ],
        'problem_cost': [
            "Neurosurgery consults drifting toward centres with visible surgeon content.",
            "Advanced-OT and neuro-navigation capacity running below utilisation.",
            "Complex case volume moving toward teams with published case context.",
            "DBS and epilepsy surgery volume running below potential.",
            "Referring neurologists sending cases elsewhere.",
        ],
        'problem_works': [
            "Sub-specialty-specific library across cranial, spine, functional, paediatric neurosurgery.",
            "Surgeon-led technique explainers with visible case counts and honest OR footage.",
            "Decision-aid videos comparing microsurgical vs endoscopic, robotic vs conventional options.",
            "Consented patient recovery arcs for tumour, spine, and DBS journeys.",
            "Measured in consults, complex-case volume, DBS case volume, robotic-spine utilisation.",
        ],
        'cta_text': "Request a Free Audit of Your Neurosurgery Funnel",
        'use_cases': [
            ("Stage 01 · Symptom awareness", "Is this headache, numbness, or weakness serious?", "A calm neurosurgeon explaining red-flag neurological features, when to seek surgical review, and when conservative management is right helps patients triage correctly."),
            ("Stage 02 · Trust building", "Which neurosurgeon has experience with my specific condition?", "Senior-specialist introductions for cranial, spine, functional, and paediatric neurosurgery help families choose the right sub-specialist."),
            ("Stage 03 · Decision", "Microsurgical or endoscopic? Robotic spine or conventional?", "A surgeon-led technique comparison with honest indications and trade-offs supports the critical procedure-choice moment."),
            ("Stage 04 · Post-treatment care", "What does recovery after brain or spine surgery actually look like?", "Consented patient recovery arcs and rehabilitation programme overviews help patients and offer credible context for future decisions."),
        ],
        'diff_rows': [
            ("A single 'best neurosurgery' page covering brain and spine together", "Sub-specialty library for cranial, spine, functional, paediatric, trauma"),
            ("Neurosurgeon bios without technique context", "Surgeon-led explainers with visible case counts and honest OR footage"),
            ("Little technique-choice content", "Honest comparison videos for microsurgery vs endoscopic, robotic vs conventional"),
            ("Few post-op recovery videos", "Consented patient recovery arcs from tumour, spine, and DBS journeys"),
            ("Performance reported as impressions", "Measured in consults, complex-case volume, DBS volume, robotic-spine utilisation"),
        ],
        'faqs_specialty': [
            {
                "q": "What does a neurosurgery video library include?",
                "a": "A complete neurosurgery library covers cranial (tumours, aneurysms, skull base), spine (cervical, lumbar, deformity, minimally invasive, robotic), functional (DBS, epilepsy surgery, pain), paediatric neurosurgery, and trauma. Surgeon-led technique explainers, operative room context, and consented patient recovery stories. 40 to 60 videos over 180 days.",
            },
            {
                "q": "How do you measure ROI on neurosurgery video marketing?",
                "a": "Neurosurgery ROI is measured in consult volume per sub-specialty, complex case volume (brain tumours, complex spine), DBS case volume, robotic-spine utilisation, second-opinion conversion, and referral flow from neurologists. A quarterly review ties each published video to its contribution.",
            },
        ],
        'related_specialties': [
            ('/neurology/', 'Neurology'),
            ('/orthopaedics-joint-care/', 'Orthopaedics & Joint Care'),
            ('/oncology-cancer-care/', 'Oncology & Cancer Care'),
            ('/emergency-critical-care/', 'Emergency & Critical Care'),
            ('/video-infrastructure', 'Video Infrastructure Hub'),
        ],
        'service_description': "A video library for neurosurgery programmes covering cranial neurosurgery (brain tumours, aneurysms, skull base surgery), spine surgery (cervical, lumbar, deformity correction, minimally invasive and robotic approaches), functional neurosurgery (DBS for Parkinson's, epilepsy surgery, pain procedures), paediatric neurosurgery, and trauma. Content organised across four journey stages.",
        'service_audience': "Hospital CMOs, Neurosurgery Programme Heads, Spine Unit Leads, Chief Marketing Officers at multi-specialty hospitals",
        'final_cta_h2': 'your neurosurgery programme',
    },
    {
        'slug': 'orthopaedics-joint-care',
        'name_full': 'Orthopaedics & Joint Care',
        'name_lc': 'orthopaedics and joint care',
        'adjective': 'orthopaedics',
        'hero_h1_em': 'Hospitals in India',
        'hero_h1_rest': 'Orthopaedics & Joint Care Video Marketing & Patient Education Agency for',
        'hero_subhead': "A specialist video production partner for orthopaedics programmes. Covers joint replacement (knee, hip, shoulder), arthroscopy, spine surgery, sports medicine, paediatric orthopaedics, and trauma.",
        'bullets': [
            "Covers joint replacement, arthroscopy, spine, sports medicine, paediatric ortho, trauma.",
            "Four stages mapped for both acute trauma and chronic joint disease paths.",
            "Senior specialist visibility for joint replacement surgeons, arthroscopy specialists, and spine surgeons.",
            "Consented patient recovery stories for knee, hip, shoulder, and spine patients.",
            "Multi-language delivery in English and eight Indian languages.",
        ],
        'path_a_label': 'Chronic Joint Disease',
        'path_a_flow': 'Intent → OPD → Surgery',
        'path_a_note': 'Osteoarthritis, rheumatoid arthritis, joint replacement (knee, hip, shoulder), arthroscopy for meniscus and ligament injuries.',
        'path_b_label': 'Trauma & Sports Injury',
        'path_b_flow': 'Intent → ER → Treatment',
        'path_b_note': 'Fractures, ligament tears, sports injuries, paediatric trauma. Time-critical ER-to-OT or ER-to-conservative pathway.',
        'trust_stat3': 'Orthopaedic sub-specialties covered',
        'reality_h2': "Orthopaedic patients live with pain for three to five years before deciding on surgery.",
        'reality_intro': "Morning knee stiffness, a shoulder that won't lift, a back that won't straighten. Most orthopaedic patients live with pain for years before taking action. They try physiotherapy, pain medications, home remedies, alternate medicine. By the time they research surgery, they have already spent hundreds of hours on YouTube comparing conventional vs robotic knee replacement, disc surgery vs conservative care, arthroscopy vs open. Centres with visible senior surgeons win those decisions.",
        'reality_cards': [
            ("\ud83d\udd53", "Years of delay is the norm in orthopaedics.", "Patients tolerate chronic pain for 3-5 years before considering surgery. Videos that validate 'it's okay to ask now' reduce avoidable disability."),
            ("\ud83e\uddbf", "Technique choice dominates the surgery decision.", "Robotic vs conventional knee, minimally invasive vs open spine, conservative vs surgical meniscus. Technique-specific videos close the decision."),
            ("\ud83d\udc68\u200d\u2695\ufe0f", "Senior surgeon visibility predicts referral flow.", "The arthroplasty surgeon doing 500+ knees a year, the arthroscopy specialist, the spine surgeon. Most remain under-visible online."),
            ("\ud83c\udfe5", "Robotic systems and advanced implants represent significant capex.", "Robotic knee systems, custom 3D-printed implants, advanced arthroscopy towers. Patient-facing explainers contextualise the investment."),
        ],
        'problem_h2': "A 'best knee replacement' banner doesn't book a TKR. A surgeon walking through robotic vs conventional can.",
        'problem_common': [
            "Similar 'best orthopaedic care' pages across many hospitals.",
            "A single ortho landing page covering knee, hip, shoulder, and spine together.",
            "Surgeon bios listing degrees, limited technique context.",
            "Little decision-aid content comparing robotic vs conventional, MIS vs open.",
            "Few consented patient recovery stories for return-to-work or return-to-sport arcs.",
        ],
        'problem_cost': [
            "Joint replacement consults drifting toward centres with visible surgeon content.",
            "Robotic-knee system utilisation running below potential.",
            "Arthroscopy and sports medicine case volume moving to teams with published case context.",
            "Physiotherapy and rehab programme sign-ups running below potential.",
            "Referring physicians sending orthopaedic cases elsewhere.",
        ],
        'problem_works': [
            "Sub-specialty library across arthroplasty, arthroscopy, spine, sports medicine, trauma, paediatric ortho.",
            "Surgeon-led technique explainers with visible case counts and honest OT footage.",
            "Decision-aid videos comparing robotic vs conventional, minimally invasive vs open.",
            "Consented patient recovery arcs from TKR, ACL, spine, and rotator cuff journeys.",
            "Measured in arthroplasty OT fill-rate, arthroscopy volume, robotic-system utilisation.",
        ],
        'cta_text': "Request a Free Audit of Your Orthopaedics Funnel",
        'use_cases': [
            ("Stage 01 · Symptom awareness", "Is this joint pain arthritis or just wear-and-tear?", "A calm orthopaedic surgeon explaining arthritis grades, when conservative care is enough, and when surgery is right helps patients triage correctly."),
            ("Stage 02 · Trust building", "Which surgeon has real experience with my specific procedure?", "Senior-specialist introductions for arthroplasty, arthroscopy, spine surgery, sports medicine help patients choose the right sub-specialist."),
            ("Stage 03 · Decision", "Robotic or conventional knee? MIS or open spine?", "A surgeon-led technique comparison with honest indications and trade-offs supports the critical procedure-choice moment."),
            ("Stage 04 · Post-treatment care", "What does recovery after joint replacement or ACL reconstruction actually look like?", "Consented patient recovery arcs and physiotherapy programme overviews help patients and future decisions."),
        ],
        'diff_rows': [
            ("A single 'best orthopaedics' page covering every procedure", "Sub-specialty library for arthroplasty, arthroscopy, spine, sports medicine, trauma"),
            ("Surgeon bios without technique context", "Surgeon-led explainers with visible case counts"),
            ("Little technique-choice content", "Honest comparison videos for robotic vs conventional, MIS vs open"),
            ("Few rehab or return-to-sport videos", "Consented patient recovery arcs from TKR, ACL, spine, rotator cuff journeys"),
            ("Performance reported as impressions", "Measured in arthroplasty OT fill, arthroscopy volume, robotic-system utilisation"),
        ],
        'faqs_specialty': [
            {
                "q": "What does an orthopaedics video library include?",
                "a": "A complete orthopaedics library covers arthroplasty (knee, hip, shoulder, elbow), arthroscopy (meniscus, ACL, rotator cuff, hip), spine surgery (cervical, lumbar, deformity, minimally invasive, robotic), sports medicine, paediatric orthopaedics, and trauma. Surgeon-led technique explainers, operative context, physio programmes, and consented patient recovery stories. 40 to 60 videos over 180 days.",
            },
            {
                "q": "How do you measure ROI on orthopaedics video marketing?",
                "a": "Orthopaedics ROI is measured in consults per sub-specialty, arthroplasty OT fill-rate, arthroscopy case volume, robotic-knee utilisation, spine surgery volume, physiotherapy sign-ups, and return-to-work/return-to-sport outcomes. A quarterly review ties each published video to its contribution.",
            },
        ],
        'related_specialties': [
            ('/sports-medicine/', 'Sports Medicine'),
            ('/pain-management/', 'Pain Management'),
            ('/rheumatology/', 'Rheumatology'),
            ('/neurosurgery/', 'Neurosurgery'),
            ('/video-infrastructure', 'Video Infrastructure Hub'),
        ],
        'service_description': "A video library for orthopaedics programmes covering arthroplasty (knee, hip, shoulder, elbow joint replacement), arthroscopy (sports medicine, meniscus, ACL, rotator cuff), spine surgery (cervical, lumbar, minimally invasive, robotic), paediatric orthopaedics, and trauma. Content organised across four journey stages.",
        'service_audience': "Hospital CMOs, Orthopaedic Programme Heads, Joint Replacement Unit Leads, Chief Marketing Officers at multi-specialty hospitals",
        'final_cta_h2': 'your orthopaedic programme',
    },
    # ===== remaining 17 specialties follow the same schema with shorter configs =====
]

# For compactness, define the remaining 17 specialties with a streamlined structure.
# These use slightly shorter copy but keep the same structural fidelity.
COMPACT_SPECIALTIES = [
    ('gastroenterology-hepatology', 'Gastroenterology & Hepatology', 'gastroenterology and hepatology', 'gastroenterology',
     "A specialist video production partner for gastroenterology and hepatology programmes. Covers liver disease (hepatitis, cirrhosis, liver transplant), gastrointestinal cancers, endoscopy, IBD (Crohn's, ulcerative colitis), and pancreatic disease.",
     ('Medical Gastroenterology', 'Intent → OPD → Treatment', 'IBD, liver disease, hepatitis, pancreatitis, acid reflux. Medical management and endoscopic procedures.'),
     ('Surgical Gastroenterology', 'Intent → OPD → IPD', 'GI cancer surgery, liver transplant, bariatric surgery, pancreatic surgery. Full surgical pathway.'),
     'your gastroenterology programme'),
    ('nephrology-dialysis', 'Nephrology & Dialysis', 'nephrology and dialysis', 'nephrology',
     "A specialist video production partner for nephrology and dialysis programmes. Covers chronic kidney disease, dialysis (haemodialysis, peritoneal), AV fistula creation, kidney transplant evaluation, glomerular diseases, and hypertension management.",
     ('Dialysis', 'Intent → OPD → Dialysis Unit', 'Haemodialysis, peritoneal dialysis, home dialysis programmes. Day-care + long-term pathway.'),
     ('Kidney Transplant', 'Intent → OPD → Transplant Unit', 'Pre-transplant evaluation, living/deceased donor transplant, post-transplant management. Full transplant pathway.'),
     'your nephrology programme'),
    ('urology-kidney-transplant', 'Urology & Kidney Transplant', 'urology and kidney transplant', 'urology',
     "A specialist video production partner for urology and kidney transplant programmes. Covers urological cancers (prostate, kidney, bladder), kidney stones, BPH, male infertility, paediatric urology, and kidney transplant surgery.",
     ('General Urology', 'Intent → OPD → Procedure', 'Kidney stones, BPH, UTI, male infertility, paediatric urology. Day-care and IPD procedures.'),
     ('Uro-oncology & Transplant', 'Intent → OPD → Surgery', 'Prostate, kidney, bladder cancer surgery. Kidney transplant (living and deceased donor). Robotic urology.'),
     'your urology programme'),
    ('pulmonology-respiratory', 'Pulmonology & Respiratory', 'pulmonology and respiratory medicine', 'pulmonology',
     "A specialist video production partner for pulmonology programmes. Covers asthma, COPD, interstitial lung disease, tuberculosis, lung cancer, sleep medicine, and respiratory failure management.",
     ('Chronic Respiratory', 'Intent → OPD → Long-term care', 'Asthma, COPD, ILD, TB, sleep apnoea. Long-term OPD and pulmonary rehabilitation.'),
     ('Acute Respiratory', 'Intent → ER → ICU', 'Respiratory failure, pneumonia, lung cancer, pulmonary embolism. Critical-care pathway.'),
     'your pulmonology programme'),
    ('endocrinology-diabetes', 'Endocrinology & Diabetes', 'endocrinology and diabetes', 'endocrinology',
     "A specialist video production partner for endocrinology programmes. Covers diabetes management, thyroid disease, obesity, PCOS, reproductive endocrinology, paediatric endocrinology, and pituitary/adrenal disorders.",
     ('Diabetes Care', 'Intent → OPD → Long-term management', 'Type 1 and Type 2 diabetes, insulin therapy, diabetic complications, CGM. Long-term OPD pathway.'),
     ('Other Endocrine Disorders', 'Intent → OPD → Treatment', 'Thyroid disease, PCOS, obesity, pituitary/adrenal disorders, paediatric endocrine. OPD and specialist-team pathways.'),
     'your endocrinology programme'),
    ('women-child-care', 'Women & Child Care', 'women and child care', 'women-and-child',
     "A specialist video production partner for women's health and child care programmes. Covers obstetrics (normal and high-risk pregnancy), gynaecology, fetal medicine, neonatology, paediatrics, and paediatric subspecialties.",
     ('Obstetrics & Gynaecology', 'Intent → OPD → Delivery/Procedure', 'Antenatal care, normal and caesarean delivery, high-risk pregnancy, gynaecological surgery, fertility.'),
     ('Paediatrics & Neonatology', 'Intent → OPD/NICU → Care', 'Neonatal intensive care, paediatric subspecialties, developmental paediatrics, paediatric surgery.'),
     'your women and child care programme'),
    ('ivf-reproductive-medicine', 'IVF & Reproductive Medicine', 'IVF and reproductive medicine', 'fertility',
     "A specialist video production partner for fertility programmes. Covers IVF, ICSI, donor cycles, preservation (egg and sperm freezing), male infertility, recurrent pregnancy loss, and PCOS management.",
     ('Female Fertility', 'Intent → OPD → IVF Cycle', 'IVF, ICSI, donor cycles, egg freezing, recurrent pregnancy loss, PCOS. Full cycle pathway.'),
     ('Male & Couple Fertility', 'Intent → OPD → Intervention', 'Male infertility evaluation, surgical sperm retrieval, varicocele, genetic counselling, couples counselling.'),
     'your fertility programme'),
    ('minimally-invasive-robotic-surgery', 'Minimally Invasive & Robotic Surgery', 'minimally invasive and robotic surgery', 'minimally-invasive-surgery',
     "A specialist video production partner for minimally invasive and robotic surgery programmes. Covers robotic general surgery, robotic urology, robotic gynaecology, laparoscopic bariatric, thoracoscopic, and robotic orthopaedic procedures.",
     ('Robotic Surgery', 'Intent → OPD → OT', 'da Vinci robotic urology, gynaecology, general surgery, robotic-assisted joint replacement.'),
     ('Laparoscopic & Thoracoscopic', 'Intent → OPD → OT', 'Laparoscopic general surgery, bariatric surgery, thoracoscopic procedures, endoscopic surgery.'),
     'your minimally invasive surgery programme'),
    ('bariatric-metabolic-surgery', 'Bariatric & Metabolic Surgery', 'bariatric and metabolic surgery', 'bariatric',
     "A specialist video production partner for bariatric and metabolic surgery programmes. Covers sleeve gastrectomy, gastric bypass, revision bariatric procedures, metabolic surgery for Type 2 diabetes, and pre/post-operative nutrition programmes.",
     ('Primary Bariatric', 'Intent → OPD → Surgery', 'Sleeve gastrectomy, gastric bypass, mini gastric bypass. Full surgical + 2-year follow-up pathway.'),
     ('Revision & Metabolic', 'Intent → OPD → Surgery', 'Revision bariatric surgery, metabolic surgery for Type 2 diabetes control, bariatric emergencies.'),
     'your bariatric programme'),
    ('organ-transplant', 'Organ Transplant Programme', 'organ transplant', 'transplant',
     "A specialist video production partner for organ transplant programmes. Covers kidney transplant, liver transplant, heart transplant, lung transplant, bone marrow transplant, and pancreas transplant — both living-donor and deceased-donor pathways.",
     ('Living Donor Transplant', 'Intent → Evaluation → Surgery', 'Living-donor kidney, liver, and rare living-donor heart/lung pathways. Donor + recipient journeys.'),
     ('Deceased Donor Transplant', 'Intent → Waiting list → Surgery', 'Deceased-donor kidney, liver, heart, lung, pancreas. Registration, waiting, and transplant pathway.'),
     'your transplant programme'),
    ('eye-care-ophthalmology', 'Eye Care & Ophthalmology', 'eye care and ophthalmology', 'ophthalmology',
     "A specialist video production partner for ophthalmology programmes. Covers cataract surgery, refractive (LASIK, SMILE, ICL), glaucoma, retina (diabetic retinopathy, macular degeneration), paediatric ophthalmology, and oculoplasty.",
     ('Refractive & Cataract', 'Intent → OPD → Day-care', 'Cataract surgery (phaco + IOL), LASIK, SMILE, ICL, refractive lens exchange.'),
     ('Medical & Specialty Ophthalmology', 'Intent → OPD → Treatment', 'Glaucoma, retina, uveitis, paediatric ophthalmology, oculoplasty, cornea.'),
     'your ophthalmology programme'),
    ('ent', 'ENT (Otolaryngology)', 'ENT', 'ENT',
     "A specialist video production partner for ENT programmes. Covers hearing (cochlear implants, middle ear surgery), head and neck surgery, rhinology and sinus surgery, laryngology, paediatric ENT, and sleep surgery.",
     ('Surgical ENT', 'Intent → OPD → OT', 'Cochlear implant, FESS (sinus), thyroidectomy, head-and-neck cancer surgery, microlaryngoscopy.'),
     ('Medical ENT & Audiology', 'Intent → OPD → Care', 'Hearing aid fitting, vertigo management, allergy/rhinology medical, laryngology voice clinic.'),
     'your ENT programme'),
    ('dermatology-aesthetic', 'Dermatology & Aesthetic', 'dermatology and aesthetic medicine', 'dermatology',
     "A specialist video production partner for dermatology and aesthetic medicine programmes. Covers medical dermatology (eczema, psoriasis, acne, skin infections), dermato-surgery, cosmetic dermatology (lasers, fillers, skin rejuvenation), hair restoration, and paediatric dermatology.",
     ('Medical Dermatology', 'Intent → OPD → Treatment', 'Eczema, psoriasis, acne, vitiligo, skin infections, allergies. Long-term OPD pathway.'),
     ('Aesthetic Dermatology', 'Intent → OPD → Procedure', 'Lasers, chemical peels, botox, fillers, hair restoration, scar revision, pigmentation treatment.'),
     'your dermatology programme'),
    ('dental-oral-surgery', 'Dental & Oral Surgery', 'dental and oral surgery', 'dental',
     "A specialist video production partner for dental and oral surgery programmes. Covers general dentistry, orthodontics, endodontics, periodontics, implantology, oral and maxillofacial surgery, and paediatric dentistry.",
     ('General & Specialty Dentistry', 'Intent → OPD → Treatment', 'Fillings, root canal, orthodontics, periodontal care, aesthetic dentistry, paediatric dentistry.'),
     ('Oral Surgery & Implantology', 'Intent → OPD → Surgery', 'Dental implants, wisdom teeth extraction, jaw surgery, oral cancer treatment, TMJ disorders.'),
     'your dental programme'),
    ('emergency-critical-care', 'Emergency & Critical Care', 'emergency and critical care', 'critical-care',
     "A specialist video production partner for emergency and critical care programmes. Covers ER, ICU, trauma care, cardiac emergencies, stroke response, sepsis management, paediatric critical care, and neuro-critical care.",
     ('Emergency Department', 'Intent → ER → Disposition', 'Triage, resuscitation, trauma stabilisation, cardiac and stroke emergencies. Time-critical pathway.'),
     ('Critical Care Units', 'ER → ICU → Recovery', 'Medical ICU, surgical ICU, neuro-ICU, paediatric ICU, CCU. Long-term critical-care pathway.'),
     'your emergency and critical care programme'),
    ('preventive-health', 'Preventive Health & Executive Checks', 'preventive health and executive check-ups', 'preventive-health',
     "A specialist video production partner for preventive health programmes. Covers executive health check-ups, cancer screening, cardiac risk assessment, women's health screening, corporate wellness, and travel medicine.",
     ('Comprehensive Health Check', 'Intent → Screening → Follow-up', 'Executive physicals, cancer screening packages, cardiac risk, women\'s health. Half-day to full-day pathways.'),
     ('Targeted Prevention', 'Intent → OPD → Programme', 'Diabetes prevention, cardiovascular risk reduction, smoking cessation, weight management, travel vaccines.'),
     'your preventive health programme'),
    ('pain-palliative-care', 'Pain Management & Palliative Care', 'pain management and palliative care', 'pain-and-palliative',
     "A specialist video production partner for pain management and palliative care programmes. Covers chronic pain interventions (interventional pain procedures, spinal cord stimulation), cancer pain, musculoskeletal pain, and end-of-life care.",
     ('Pain Management', 'Intent → OPD → Intervention', 'Interventional pain procedures, nerve blocks, spinal cord stimulation, chronic pain rehabilitation.'),
     ('Palliative Care', 'Intent → OPD → Care', 'Cancer pain, end-of-life care, home palliation, symptom management, family support.'),
     'your pain and palliative programme'),
]


def build_compact_specialty(slug, name_full, name_lc, adjective, subhead,
                            path_a, path_b, cta_specialty):
    """Assemble a config dict for a specialty using the compact tuple input."""
    short_name = name_full.split(' &')[0].split(' (')[0].lower()
    return {
        'slug': slug,
        'name_full': name_full,
        'name_lc': name_lc,
        'adjective': adjective,
        'hero_h1_em': 'Hospitals in India',
        'hero_h1_rest': f'{name_full} Video Marketing & Patient Education Agency for',
        'hero_subhead': subhead,
        'bullets': [
            f"Covers the major sub-specialties within {name_lc}, under one editorial standard.",
            "Four patient-journey stages: Symptom awareness, Trust building, Decision, Post-treatment care.",
            f"Senior specialist visibility for the leading {adjective} consultants, surgeons, and programme heads.",
            f"Consented patient recovery stories aligned with Medical Council of India guidelines.",
            "Multi-language delivery in English and eight Indian languages.",
        ],
        'path_a_label': path_a[0],
        'path_a_flow': path_a[1],
        'path_a_note': path_a[2],
        'path_b_label': path_b[0],
        'path_b_flow': path_b[1],
        'path_b_note': path_b[2],
        'trust_stat3': f'{name_full.split(" &")[0]} sub-specialties covered',
        'reality_h2': f"{name_full} patients research online extensively before choosing a centre and a specialist.",
        'reality_intro': f"Symptoms persist. Families worry. Patients and their networks spend weeks or months researching {name_lc} options before booking a consult. They compare procedures, specialists, and centres. Hospitals that show up in that research with a senior specialist on screen are better placed to earn the consult and the case.",
        'reality_cards': [
            ("\ud83d\udcf1", "Online research happens before any call to your hospital.", f"Patients and their families spend hours researching {name_lc} symptoms, procedures, and specialists before ever calling. Video-rich content wins the first consideration."),
            ("\ud83d\udd04", f"Technique and specialist choice drives the decision.", f"In {name_lc}, the specific technique (minimally invasive, robotic, laser, medical vs surgical) and the right sub-specialist matter more than hospital brand."),
            ("\ud83d\udc68\u200d\u2695\ufe0f", "Senior specialists are often under-visible online.", f"Experienced {adjective} consultants and surgeons are the real reason patients choose a centre. Most remain low-visibility online."),
            ("\ud83c\udfe5", "Advanced facilities benefit from patient-facing context.", "Specialised equipment, dedicated units, and advanced OTs represent significant capex. Patient-facing explainers contextualise the investment for better-informed decisions."),
        ],
        'problem_h2': f"A 'best {name_lc} care' banner doesn't book a procedure. A specialist walking through the options can.",
        'problem_common': [
            f"Similar 'best {name_lc} care' pages across many hospitals.",
            f"A single {adjective} landing page covering every procedure together.",
            f"{name_full.split(' &')[0]} specialist bios listing degrees, limited procedure context.",
            f"Little decision-aid content for specific {adjective} procedures and treatment options.",
            "Few consented patient recovery stories in the public library.",
        ],
        'problem_cost': [
            f"{name_full.split(' &')[0]} consults drifting toward centres with more visible specialist content online.",
            "Dedicated-facility and advanced-equipment capacity running below potential utilisation.",
            "Complex cases moving toward teams with published case context.",
            f"Programme and sub-specialty case volume running below potential.",
            "Referring physicians sending cases to centres they can see working online.",
        ],
        'problem_works': [
            f"Procedure-specific library across every major {adjective} treatment area.",
            "Specialist-led technique explainers with visible case context and honest clinical footage.",
            f"Decision-aid videos comparing the key {adjective} treatment options for patients.",
            "Consented patient recovery arcs with honest outcome journeys.",
            f"Measured in consults, case volume per sub-specialty, facility utilisation, and referral flow.",
        ],
        'cta_text': f"Request a Free Audit of Your {name_full.split(' &')[0]} Funnel",
        'use_cases': [
            ("Stage 01 · Symptom awareness", f"Is this {adjective} symptom something to worry about?", f"A calm {adjective} specialist explaining warning signs, when to book an appointment, and when to monitor helps patients triage correctly."),
            ("Stage 02 · Trust building", f"Which {adjective} specialist has real experience with my condition?", "Senior-specialist introductions with visible case context help patients form a considered view ahead of a consult."),
            ("Stage 03 · Decision", f"Which treatment option is right for me?", "A specialist-led comparison of treatment options, with honest indications and trade-offs, supports the critical treatment-choice moment."),
            ("Stage 04 · Post-treatment care", f"What does recovery actually look like?", "Consented patient recovery arcs and follow-up programme overviews help patients and offer credible context for future decisions."),
        ],
        'diff_rows': [
            (f"A single 'best {name_lc} care' page covering every procedure", f"Procedure-specific library across every major {adjective} treatment area"),
            (f"{name_full.split(' &')[0]} specialist bios without procedure context", "Specialist-led explainers with visible case context that tend to build stronger trust"),
            ("Little decision-aid content comparing treatment options", "Honest procedure-comparison videos that help the right patient understand the right option"),
            ("Few post-procedure or recovery videos in the library", "Consented patient recovery arcs from real outcome journeys"),
            ("Performance reported as impressions and form-fills", "Performance tracked against consults, case volume, facility utilisation, and referral flow"),
        ],
        'faqs_specialty': [
            {
                "q": f"What does a {name_lc} video library include?",
                "a": f"A complete {name_lc} library covers every stage of the patient journey: symptom education, procedure explainers, senior-specialist introductions, real patient recovery stories, and post-treatment care content. A typical library for a multi-centre {adjective} programme is 40 to 60 videos produced over 180 days, then ongoing library extensions quarterly.",
            },
            {
                "q": f"How do you measure ROI on {name_lc} video marketing?",
                "a": f"We measure outcomes that matter: {name_full.split(' &')[0]} consult volume per week, sub-specialty case volume, dedicated-facility utilisation, sub-specialty case volume, and inbound referrals from physicians. A quarterly review ties each published video to its measurable contribution.",
            },
        ],
        'related_specialties': [
            ('/video-infrastructure', 'Video Infrastructure Hub'),
        ],
        'service_description': f"A video library for {name_lc} programmes covering every major sub-specialty and procedure area. Content organised across four journey stages: Symptom awareness, Trust building, Decision, and Post-treatment care.",
        'service_audience': f"Hospital CMOs, {name_full.split(' &')[0]} Programme Heads, Chief Marketing Officers at multi-specialty hospitals",
        'final_cta_h2': cta_specialty,
    }


# Add compact specialties to main list
for row in COMPACT_SPECIALTIES:
    SPECIALTIES.append(build_compact_specialty(*row))


# ============================================================================
# Template generator
# ============================================================================

template = TEMPLATE_FILE.read_text(encoding='utf-8')

def render_bullets(bullets):
    out = []
    for b in bullets:
        out.append(f'        <div class="bullet crimson"><span class="tick">✓</span><span>{b}</span></div>')
    return '\n'.join(out)


def render_reality_cards(cards):
    out = []
    for emoji, h4, p in cards:
        out.append(f'''      <div class="reality-card">
        <div class="ri">{emoji}</div>
        <div>
          <h4>{h4}</h4>
          <p>{p}</p>
        </div>
      </div>''')
    return '\n'.join(out)


def render_problem_bullets(bullets):
    return '\n'.join(f'          <li>• {b}</li>' for b in bullets)


def render_problem_works(bullets):
    return '\n'.join(f'          <li>◆ <b style="color:#fff;">{b}</b></li>' for b in bullets)


def render_use_cases(cases):
    out = []
    for moment, q, body in cases:
        out.append(f'''      <div class="case">
        <div class="moment">{moment}</div>
        <div class="q">"{q}"</div>
        <p class="text-[13.5px] text-ink/75 leading-relaxed">{body}</p>
        <div class="out"><b>Supports:</b> Informed patient decision.</div>
      </div>''')
    return '\n'.join(out)


def render_diff_rows(rows):
    out = []
    for them, us in rows:
        out.append(f'''      <div class="vs-row">
        <div class="vs-cell them"><span class="x">✕</span> {them}</div>
        <div class="vs-cell us"><span class="v">✓</span> {us}</div>
      </div>''')
    return '\n'.join(out)


def render_faq_html(faqs):
    out = []
    for item in faqs:
        q = item['q'].replace("'", "&rsquo;")
        a = item['a']
        out.append(f'''      <details class="faq-item">
        <summary class="faq-q">{q}</summary>
        <div class="faq-a">{a}</div>
      </details>''')
    return '\n'.join(out)


def render_faq_schema(faqs):
    import json
    entries = []
    for item in faqs:
        entries.append({
            "@type": "Question",
            "name": item['q'],
            "acceptedAnswer": {"@type": "Answer", "text": item['a']}
        })
    return json.dumps(entries, indent=2)


def render_related(rels):
    return '\n'.join(f'      <a class="related-card" href="{href}">{name}</a>' for href, name in rels)


def generate(cfg):
    c = cfg
    specialty_lc = c['name_lc']
    specialty_adj = c['adjective']
    full_name = c['name_full']

    # Combine common + specialty FAQs
    common_with_subst = [
        {'q': f['q'].format(specialty=specialty_adj), 'a': f['a'].format(specialty=specialty_adj)}
        for f in COMMON_FAQS_TEMPLATE
    ]
    all_faqs = c['faqs_specialty'] + common_with_subst  # specialty first, then common

    # FAQ HTML block (visible)
    faq_html = render_faq_html(all_faqs)
    # FAQ schema block
    faq_schema_entries = render_faq_schema(all_faqs)

    # Assemble output by taking the cardiology template and doing replacements.
    html = template

    # Global string replacements (order matters — longest/most-specific first)
    replacements = [
        # 1. Slug / URL / UTM FIRST (compound identifiers must be swapped before individual words)
        ('utm_campaign=cardiology-seo', f'utm_campaign={c["slug"]}'),
        ('cardiology-cardiac-surgery', c['slug']),
        ('cardiology-seo', c['slug']),
        # 2. Multi-word phrases
        ('Cardiology & Cardiac Surgery', full_name),
        ('cardiology & cardiac surgery', specialty_lc),
        ('Cardiology and Cardiac Surgery', full_name.replace(' & ', ' and ')),
        ('cardiology and cardiac surgery', specialty_lc),
        ('Cardiology & Cardiac', full_name.split(' &')[0]),
        ('Cardiac Surgery', c['path_b_label'] if 'Surgery' in c['path_b_label'] else full_name.split(' &')[0]),
        ('cardiac surgery', c['path_b_label'].lower() if 'Surgery' in c['path_b_label'] else specialty_adj),
        # 3. Professional + facility terms → neutral wording (so non-cardio pages don't read 'cardiologist' or 'cath lab')
        ('cardiologists', 'specialists'),
        ('cardiologist', 'specialist'),
        ('cath lab', 'dedicated facility'),
        # 4. Single-word subs
        ('Cardiology', full_name.split(' &')[0]),
        ('cardiology', specialty_adj),
        ('Cardiac', full_name.split(' &')[0]),
        ('cardiac', specialty_adj),
    ]
    # Apply all; longer-match first
    for old, new in replacements:
        html = html.replace(old, new)

    # Now do block-level replacements for specialty-specific sections.
    # We'll use the rendered HTML blocks to substitute INTO the generic content
    # that resulted from the generic string substitutions above.

    # --- Hero H1 + subhead ---
    # The template H1: "Cardiology & Cardiac Surgery Video Marketing & Patient Education Agency for <em>Hospitals in India</em>"
    # After substitution: "{full_name} Video Marketing & Patient Education Agency for <em>Hospitals in India</em>"
    # (Already correct due to global sub above.)
    # But we want to use the specific hero_subhead from config, so swap the paragraph.
    cardiology_hero_p = 'A specialist video production partner for cardiology programmes.'
    # That exact sentence doesn't match; the template's subhead is longer. Instead replace the entire subhead paragraph by finding the <p class="mt-5 ..."> inside the hero.
    # We'll do a targeted regex substitution on the hero subhead.
    hero_subhead_pat = re.compile(
        r'(<p class="mt-5 text-\[17px\] md:text-\[18px\] text-ink/80 max-w-xl leading-relaxed">\s*)([^<]+)(\s*</p>)',
        re.DOTALL
    )
    html = hero_subhead_pat.sub(lambda m: m.group(1) + c['hero_subhead'] + m.group(3), html, count=1)

    # --- Hero bullets ---
    # Cardinality: 5 bullets in template.
    bullets_pat = re.compile(
        r'(<div class="mt-6 space-y-1 max-w-xl">)(.*?)(</div>\s*<div class="mt-8 flex flex-wrap gap-3 items-center">)',
        re.DOTALL
    )
    new_bullets = render_bullets(c['bullets'])
    html = bullets_pat.sub(lambda m: m.group(1) + '\n' + new_bullets + '\n      ' + m.group(3), html, count=1)

    # --- Two-path card (aside info-card) ---
    path_pat = re.compile(
        r'<div class="path-card path-a">.*?<div class="path-card path-b">.*?</div>\s*</div>',
        re.DOTALL
    )
    new_paths = f'''<div class="path-card path-a">
          <div class="path-label">{c['path_a_label']}</div>
          <div class="path-flow">{c['path_a_flow']}</div>
          <div class="path-note">{c['path_a_note']}</div>
        </div>

        <div class="path-card path-b">
          <div class="path-label">{c['path_b_label']}</div>
          <div class="path-flow">{c['path_b_flow']}</div>
          <div class="path-note">{c['path_b_note']}</div>
        </div>'''
    html = path_pat.sub(new_paths, html, count=1)

    # --- Trust strip stat 3 (specialty-specific label) ---
    trust_pat = re.compile(
        r'(<div class="font-serif text-ink text-\[30px\] font-bold leading-none">4</div><div class="text-\[12\.5px\] text-ink/65 mt-2">)[^<]+(</div>)'
    )
    html = trust_pat.sub(lambda m: m.group(1) + c['trust_stat3'] + m.group(2), html, count=1)

    # --- Reality cards ---
    reality_pat = re.compile(
        r'(<div class="mt-10 grid md:grid-cols-2 gap-4">)(.*?)(</div>\s*</div>\s*</section>\s*<!--\s*={5,}\s*SECTION 4)',
        re.DOTALL
    )
    new_reality = render_reality_cards(c['reality_cards'])
    html = reality_pat.sub(lambda m: m.group(1) + '\n' + new_reality + '\n    ' + m.group(3), html, count=1)

    # Also update the reality H2 + intro paragraph
    # The H2 is within a section.sec-crimson block — find its text and replace.
    reality_h2_pat = re.compile(
        r'(<h2 class="h-serif text-ink text-\[28px\] md:text-\[40px\] font-bold">)([^<]*intent-to-OPD[^<]*|[^<]*research online[^<]*|[^<]*before they ever call[^<]*)(</h2>)'
    )
    # Our generic template may or may not still have the cardiology-specific H2 after global subs; safe approach: look for the eyebrow "The patient's reality" which precedes the H2.
    reality_section_pat = re.compile(
        r'(<div class="eyebrow mb-3" style="color:#7e2525;">The patient&#39;s reality[^<]*</div>\s*)<h2[^>]*>[^<]*(?:<[^>]*>[^<]*)*</h2>\s*<p[^>]*>[^<]*(?:<[^>]*>[^<]*)*</p>',
        re.DOTALL
    )
    # Use a simpler approach since the HTML entity may have been changed by our global subs:
    def replace_reality_section(html_in):
        # Find the reality section's header block by its known structure.
        m = re.search(r'(<section class="sec-crimson">\s*<div class="max-w-7xl mx-auto px-6 py-14 md:py-16">\s*<div class="max-w-3xl">\s*<div class="eyebrow mb-3" style="color:#7e2525;">[^<]+</div>\s*)<h2[^>]*>.*?</p>', html_in, re.DOTALL)
        if not m:
            return html_in
        new_header = (f"{m.group(1)}<h2 class=\"h-serif text-ink text-[28px] md:text-[40px] font-bold\">{c['reality_h2']}</h2>\n"
                      f"      <p class=\"mt-4 text-[16px] text-ink/75 leading-relaxed\">{c['reality_intro']}</p>")
        return html_in[:m.start()] + new_header + html_in[m.end():]
    html = replace_reality_section(html)

    # --- Problem / Solution H2 + 3 columns ---
    problem_section_pat = re.compile(
        r'(<div class="eyebrow mb-3 text-rust">Why generic [^<]+</div>\s*)<h2[^>]*>.*?</h2>',
        re.DOTALL
    )
    html = problem_section_pat.sub(
        lambda m: m.group(1) + f'<h2 class="h-serif text-ink text-[28px] md:text-[40px] font-bold">{c["problem_h2"]}</h2>',
        html, count=1
    )

    common_list_pat = re.compile(
        r'(<div class="eyebrow text-rust mb-3">Common patterns</div>\s*<ul[^>]*>)(.*?)(</ul>)',
        re.DOTALL
    )
    html = common_list_pat.sub(lambda m: m.group(1) + '\n' + render_problem_bullets(c['problem_common']) + '\n        ' + m.group(3), html, count=1)

    cost_list_pat = re.compile(
        r'(<div class="eyebrow text-rust mb-3">What this can cost</div>\s*<ul[^>]*>)(.*?)(</ul>)',
        re.DOTALL
    )
    html = cost_list_pat.sub(lambda m: m.group(1) + '\n' + render_problem_bullets(c['problem_cost']) + '\n        ' + m.group(3), html, count=1)

    works_list_pat = re.compile(
        r'(<div class="eyebrow mb-3" style="color:#E8835F;">What actually works</div>\s*<ul[^>]*>)(.*?)(</ul>)',
        re.DOTALL
    )
    html = works_list_pat.sub(lambda m: m.group(1) + '\n' + render_problem_works(c['problem_works']) + '\n        ' + m.group(3), html, count=1)

    # --- CTA button text ---
    html = html.replace('Request a Free Audit of Your Cardiology Funnel', c['cta_text'])
    # After global substitution 'cardiology' -> specialty, the label may now read
    # 'Request a Free Audit of Your {specialty_adj} Funnel' — override explicitly:
    html = re.sub(r'Request a Free Audit of Your [^<"]+ Funnel', c['cta_text'], html)

    # --- Use cases block ---
    cases_pat = re.compile(
        r'(<div class="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4">)(.*?)(</div>\s*</div>\s*</section>\s*<!--\s*={5,}\s*SECTION 7)',
        re.DOTALL
    )
    new_cases = render_use_cases(c['use_cases'])
    html = cases_pat.sub(lambda m: m.group(1) + '\n' + new_cases + '\n    ' + m.group(3), html, count=1)

    # --- Sample work cards (placeholder) ---
    sample_pat = re.compile(
        r'(<div class="carousel-track" id="cardio-sample-track">)(.*?)(</div>\s*<button type="button" class="carousel-nav carousel-next")',
        re.DOTALL
    )
    html = sample_pat.sub(lambda m: m.group(1) + '\n' + SAMPLE_WORK_CARDS_TEMPLATE + '\n\n      ' + m.group(3), html, count=1)

    # Also update the carousel track id to be specialty-specific
    html = html.replace('id="cardio-sample-track"', f'id="{c["slug"]}-sample-track"')
    html = html.replace("getElementById('cardio-sample-track')", f"getElementById('{c['slug']}-sample-track')")
    html = html.replace('id="cardio-sample-dots"', f'id="{c["slug"]}-sample-dots"')
    html = html.replace("getElementById('cardio-sample-dots')", f"getElementById('{c['slug']}-sample-dots')")

    # Trim dots to 4 (since we have 4 placeholder sample cards, not 5)
    dots_pat = re.compile(
        r'<div class="carousel-dots" id="[^"]+-sample-dots" aria-hidden="true">.*?</div>',
        re.DOTALL
    )
    new_dots = f'''<div class="carousel-dots" id="{c['slug']}-sample-dots" aria-hidden="true">
        <button type="button" class="active" data-index="0" aria-label="Go to slide 1"></button>
        <button type="button" data-index="1" aria-label="Go to slide 2"></button>
        <button type="button" data-index="2" aria-label="Go to slide 3"></button>
        <button type="button" data-index="3" aria-label="Go to slide 4"></button>
      </div>'''
    html = dots_pat.sub(new_dots, html, count=1)

    # --- Differentiation table rows ---
    diff_pat = re.compile(
        r'(<div class="vs-row">\s*<div class="vs-cell them">.*?</div>\s*</div>\s*){5}',
        re.DOTALL
    )
    new_diff = render_diff_rows(c['diff_rows'])
    # The pattern above matches 5 vs-rows consecutively. Replace with new rows.
    html = diff_pat.sub(new_diff, html, count=1)

    # --- FAQ block (visible) ---
    faq_list_pat = re.compile(
        r'(<div class="faq-list">)(.*?)(</div>\s*</div>\s*</section>)',
        re.DOTALL
    )
    html = faq_list_pat.sub(lambda m: m.group(1) + '\n' + faq_html + '\n    ' + m.group(3), html, count=1)

    # --- Related specialties ---
    related_pat = re.compile(
        r'(<div class="related-grid">)(.*?)(</div>\s*</div>\s*</section>)',
        re.DOTALL
    )
    html = related_pat.sub(lambda m: m.group(1) + '\n' + render_related(c['related_specialties']) + '\n    ' + m.group(3), html, count=1)

    # --- Final CTA H2 ---
    html = re.sub(
        r'(<h2 class="h-serif text-\[32px\] md:text-\[44px\] font-bold" style="color:#fff;">Explore how video content could support <em>)([^<]+)(</em>\.</h2>)',
        lambda m: m.group(1) + c['final_cta_h2'] + m.group(3),
        html, count=1
    )

    # --- Service schema ---
    html = re.sub(
        r'("serviceType":\s*")[^"]+(")',
        lambda m: m.group(1) + f'{full_name} Video Marketing & Patient Education' + m.group(2),
        html, count=1
    )
    html = re.sub(
        r'("name":\s*")Video Content for [^"]+(")',
        lambda m: m.group(1) + f'Video Content for {full_name} Programmes' + m.group(2),
        html, count=1
    )
    html = re.sub(
        r'("description":\s*")A video library for [^"]+(")',
        lambda m: m.group(1) + c['service_description'] + m.group(2),
        html, count=1
    )
    html = re.sub(
        r'("audienceType":\s*")[^"]+(")',
        lambda m: m.group(1) + c['service_audience'] + m.group(2),
        html, count=1
    )

    # --- FAQPage schema ---
    faq_schema_pat = re.compile(
        r'("@type":\s*"FAQPage",\s*"mainEntity":\s*)\[(.*?)\]',
        re.DOTALL
    )
    html = faq_schema_pat.sub(lambda m: m.group(1) + faq_schema_entries, html, count=1)

    # --- BreadcrumbList schema ---
    html = re.sub(
        r'("@type":\s*"ListItem",\s*"position":\s*3,\s*"name":\s*")[^"]+(",\s*"item":\s*")[^"]+(")',
        lambda m: m.group(1) + full_name + m.group(2) + f'https://qlarify.health/{c["slug"]}' + m.group(3),
        html, count=1
    )

    # --- Title + meta description + OG ---
    html = re.sub(r'<title>[^<]+</title>',
                  f'<title>{full_name} Video Marketing & Patient Education Agency for Hospitals in India | Qlarify Health</title>',
                  html, count=1)
    # Keep existing meta description format but ensure the specialty name is correct.

    return html


# ============================================================================
# Main
# ============================================================================

generated_files = []
for cfg in SPECIALTIES:
    html = generate(cfg)
    out_path = OUT_DIR / f"{cfg['slug']}.html"
    out_path.write_text(html, encoding='utf-8', errors='replace')
    generated_files.append(cfg['slug'])
    print(f"  ✓ {cfg['slug']}.html  ({len(html)} bytes)")

print(f"\nTotal: {len(generated_files)} specialty pages written to {OUT_DIR}/")
