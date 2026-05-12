// Specialty source data. Now that /specialties routes have been removed,
// the live consumers are: the StageVideo type (re-used by case studies and
// VideoCarousel) and the per-specialty 4-stage video sets that case studies
// import into their MDX frontmatter.
//
// Editorial note: only cardiac-sciences and cancer-care had genuinely unique
// source content in the v1 site. Every other specialty was templated against
// the cardiac copy. Each entry below is hand-authored against actual clinical
// reality of the specialty — procedure names, patient queries, FAQ topics —
// so the page does not read as boilerplate.

export type SpecialtyPath = {
  label: string;
  flow: string;
  note: string;
};

export type SpecialtyFaq = { q: string; a: string };

export type StageVideo = {
  stage: "awareness" | "trust" | "decision" | "post-treatment";
  stageLabel: string;
  youtubeId: string;
  title: string;
  hospital: string;
};

export type Specialty = {
  slug: string;
  name: string;
  short: string;
  category: "Surgical" | "Medical" | "Diagnostic" | "Allied" | "Women & Child";
  oneLiner: string;
  description: string;
  intro: string;
  paths: readonly SpecialtyPath[];
  procedures: readonly string[];
  topConsults: readonly string[];
  faq: readonly SpecialtyFaq[];
  proof: { metric: string; label: string };
  videos?: readonly StageVideo[];
  videoBrand?: string;
};

export const specialties: readonly Specialty[] = [
  // ============================================================
  // SURGICAL
  // ============================================================
  {
    slug: "cancer-care",
    name: "Oncology & Cancer Care",
    short: "Cancer care",
    category: "Surgical",
    oneLiner:
      "Calm, tumour-specific video for the six weeks between diagnosis and first oncology consult.",
    description:
      "Specialist content for medical, surgical and radiation oncology programmes — built for the new-diagnosis and second-opinion paths Indian cancer patients actually walk.",
    intro:
      "Within twenty-four hours of a cancer diagnosis, most patients and their families have watched between five and fifteen oncology videos. Three to six weeks later, they pick a centre. Our work is the library that earns trust during those weeks — tumour-specific, senior-led, MDT-aware, and never overstated.",
    paths: [
      {
        label: "New diagnosis",
        flow: "Intent → OPD",
        note: "First-time patients and families in crisis. Screening explainers, biopsy-process content, calm tumour-board context, and honest treatment-option videos that support the first consult.",
      },
      {
        label: "Second opinion / surgical & radiation",
        flow: "Intent → OPD → IPD",
        note: "Patients who have already seen one oncologist and are researching alternatives. Specialist introductions, procedure comparisons, and admission-pathway content supporting transfer of care, surgery, and radiation planning.",
      },
    ],
    procedures: [
      "Breast, GI, thoracic, HPB, gynae-onco, head-and-neck surgery",
      "Chemotherapy, immunotherapy, targeted and precision therapy",
      "IMRT, IGRT, SBRT, brachytherapy",
      "Tumour board / multidisciplinary review",
      "Bone marrow transplant",
      "Robotic and minimally invasive cancer surgery",
      "Survivorship and palliative-care pathways",
      "Onco-fertility and reproductive preservation counselling",
    ],
    topConsults: [
      "second opinion for breast cancer Bangalore",
      "what is a HER2 positive tumour",
      "best oncologist for stage 3 colon cancer India",
      "cost of immunotherapy in India",
      "is biopsy painful",
      "radiation vs surgery for prostate cancer",
    ],
    faq: [
      {
        q: "How do you film consented oncology patient stories without crossing into testimonial territory?",
        a: "Every patient story is recorded on a tumour-board-aware consent form that names the patient, their treating consultant, the date of recording, the date the patient consented to public publication, and a withdrawal route. We do not film mid-treatment. We avoid before-and-after imagery. The story is framed around the decision the patient made, not the outcome — because outcomes vary, and the regulator reads outcome claims as guarantees.",
      },
      {
        q: "Do you cover medical, surgical and radiation oncology under one library?",
        a: "Yes — that is the only way an oncology library makes sense. A tumour board is the unit of decision-making, not a single discipline. We organise the library by tumour type first (breast, GI, thoracic, gynae, head-and-neck, haem) and by modality second, so a patient researching a HER2-positive breast diagnosis finds the medical, surgical and radiation oncologist on the same page.",
      },
      {
        q: "How do you handle senior-oncologist time on a shoot?",
        a: "We block 90 minutes per consultant per quarter and bank twelve to fifteen short videos out of that block. Scripts are pre-approved on a clinically-reviewed template the HOD signs off. Most of our oncology consultants spend less than two hours of clinical time per year on the entire library.",
      },
      {
        q: "What gets measured?",
        a: "Oncology OPD consult volume per week, tumour-board case volume, LINAC and radiotherapy utilisation, surgical-oncology OT fill-rate, second-opinion enquiry volume, and survivorship-programme enrolment. Quarterly review attributes each published video to its measurable contribution. Not views.",
      },
    ],
    proof: { metric: "6-week", label: "Median patient research window before first consult" },
    videoBrand: "Manipal Hospitals",
    videos: [
      { stage: "awareness",      stageLabel: "Symptom Awareness",   youtubeId: "yca-CKjOX70", title: "Cancer Symptoms & Treatment",                      hospital: "Manipal Hospitals" },
      { stage: "trust",          stageLabel: "Trust Building",      youtubeId: "r9wHtqUyOYU", title: "Advanced Cancer Care — Multispeciality Oncology",  hospital: "Manipal Hospitals" },
      { stage: "decision",       stageLabel: "Decision",            youtubeId: "4UsgdNjqWLg", title: "Uninterrupted Cancer Care — Dr. Shabber Zaveri",   hospital: "Manipal Hospitals" },
      { stage: "post-treatment", stageLabel: "Post-treatment Care", youtubeId: "2u8a_vF-3Z0", title: "Stage 3 Breast Cancer Treatment Success Story",    hospital: "Manipal Hospitals" },
    ],
  },
  {
    slug: "cardiac-sciences",
    name: "Cardiology & Cardiac Surgery",
    short: "Cardiac sciences",
    category: "Surgical",
    oneLiner:
      "Two parallel patient paths — cardiology consult and cardiac surgery admission — covered with one library.",
    description:
      "Specialist video production for cardiology and cardiac-surgery programmes in India. Covers the cardiology intent-to-OPD path and the cardiac-surgery intent-to-OPD-to-IPD path.",
    intro:
      "Most cardiac libraries we audit have a single 'best cardiac care' page covering every procedure. The patient's reality is two parallel journeys with very different research windows. Cardiology patients searching chest pain, palpitations or hypertension want a calm consultant on screen before they call. Surgical patients weighing CABG, valve replacement or TAVR want to understand the admission pathway before they say yes.",
    paths: [
      {
        label: "Cardiology",
        flow: "Intent → OPD",
        note: "Arrhythmia, hypertension, coronary artery disease, heart failure, preventive cardiology. Video that supports consultation and medical management.",
      },
      {
        label: "Cardiac Surgery",
        flow: "Intent → OPD → IPD",
        note: "CABG, valve replacement, TAVR, paediatric cardiac, heart transplant. Video that supports the decision, admission, surgery and post-op recovery.",
      },
    ],
    procedures: [
      "Angioplasty (PTCA) and stenting",
      "CABG / off-pump bypass surgery",
      "Valve repair and replacement (mitral, aortic)",
      "TAVR / TAVI",
      "Pacemaker, ICD, CRT-D implantation",
      "Electrophysiology and ablation",
      "Paediatric cardiac and ASD/VSD closure",
      "Cardiac rehabilitation programme",
    ],
    topConsults: [
      "chest pain when climbing stairs",
      "best cardiologist near Whitefield",
      "cost of angioplasty Bangalore",
      "valve replacement recovery time",
      "is bypass surgery safer than angioplasty",
      "TAVR procedure in India",
    ],
    faq: [
      {
        q: "How do you handle senior-cardiologist time? They cannot give us four hours a month.",
        a: "They do not need to. We schedule 90-minute blocks per consultant per quarter and bank fifteen to twenty short videos from each block. Scripts are pre-written on a clinically-reviewed template the HOD signs off. A typical interventional cardiologist on our roster spends about ninety minutes of camera time per year on the entire library.",
      },
      {
        q: "Decision-aid content comparing angioplasty and CABG — is that not promotional?",
        a: "Not when it is honest. We script angioplasty-vs-CABG comparisons jointly with the interventional cardiologist and the cardiac surgeon, name the patient profiles each procedure suits, and name the limits of each. The video that helps the wrong patient pick the wrong procedure does not earn a long-term patient. We have refused to ship single-modality 'best of' scripts.",
      },
      {
        q: "Do you produce content for paediatric cardiac and adult cardiac under the same library?",
        a: "Yes, but the editorial line is different. Paediatric content is parent-first — the watcher is a worried mother, not the patient. Tone, examples and call-to-action are calibrated to that. Adult content is patient-first. Same library, two clearly tagged tracks.",
      },
      {
        q: "What does success look like at the twelve-month mark?",
        a: "Cardiology consult volume per week, angioplasty and CABG OT schedule fill-rate, cardiac-rehab programme sign-ups, cath-lab utilisation, and inbound referrals from GPs and physicians. We tie each published video to its measurable contribution at the quarterly review.",
      },
    ],
    proof: { metric: "180-day", label: "Time to compounding consult lift on a starter library" },
    videoBrand: "Narayana Health",
    videos: [
      { stage: "awareness",      stageLabel: "Symptom Awareness",   youtubeId: "BSRFD9zT-h4", title: "Recognizing the Symptoms of Heart Attack",       hospital: "Narayana Health" },
      { stage: "trust",          stageLabel: "Trust Building",      youtubeId: "e5FLv3MEq-Y", title: "Inside Narayana Institute of Cardiac Sciences, Bangalore", hospital: "Narayana Health" },
      { stage: "decision",       stageLabel: "Decision",            youtubeId: "flaWaCEWqxc", title: "Coronary Artery Bypass Graft Surgery (CABG)",      hospital: "Narayana Health" },
      { stage: "post-treatment", stageLabel: "Post-treatment Care", youtubeId: "bVv16-Yfxi0", title: "Patient Success Story — CABG Recovery",           hospital: "Narayana Health" },
    ],
  },
  {
    slug: "neurosciences",
    name: "Neurology & Neurosurgery",
    short: "Neurosciences",
    category: "Surgical",
    oneLiner:
      "Stroke, epilepsy, spine, brain tumour — a library calibrated for time-critical and decision-heavy neuro pathways.",
    description:
      "Specialist content for neurology and neurosurgery programmes — covering stroke, epilepsy, movement disorders, spine surgery, brain-tumour and functional neurosurgery pathways.",
    intro:
      "Neurosciences is two patient populations on the same floor. One is in an ambulance — stroke, head injury, status epilepticus — where the family is making a hospital choice in fifteen minutes. The other is researching for months — a back-pain patient weighing fusion versus conservative care, a parent considering paediatric epilepsy surgery. The library has to serve both.",
    paths: [
      {
        label: "Neurology",
        flow: "Intent → OPD",
        note: "Stroke risk, epilepsy, headache, movement disorders, dementia, multiple sclerosis. Long-term OPD relationship with diagnostic workup and medical management.",
      },
      {
        label: "Neurosurgery",
        flow: "Intent → OPD → IPD",
        note: "Spine surgery, brain-tumour resection, aneurysm clipping, deep-brain stimulation, paediatric neurosurgery, stroke thrombectomy. Decision-heavy admissions.",
      },
    ],
    procedures: [
      "Mechanical thrombectomy and stroke care",
      "Microdiscectomy, spinal fusion, cervical disc replacement",
      "Brain-tumour resection (awake craniotomy, neuro-navigation)",
      "Aneurysm clipping and endovascular coiling",
      "Deep-brain stimulation (Parkinson's, dystonia)",
      "Epilepsy surgery and vagal-nerve stimulation",
      "Paediatric neurosurgery (hydrocephalus, Chiari, craniosynostosis)",
      "Functional and pain neurosurgery",
    ],
    topConsults: [
      "stroke symptoms how long to get to hospital",
      "best neurologist for epilepsy Bangalore",
      "back pain when to see neurosurgeon",
      "is brain tumour surgery dangerous",
      "Parkinson's DBS cost India",
      "child seizure causes",
    ],
    faq: [
      {
        q: "Stroke is a 4.5-hour window. Can a video really matter?",
        a: "Not for the patient already in the ambulance — but it changes who that ambulance drives to. Families that have seen a stroke explainer in the previous year know to call early, name the symptoms accurately, and request a thrombectomy-capable centre. We script awareness videos with that prior moment in mind.",
      },
      {
        q: "How do you handle brain-tumour content without crossing into outcome claims?",
        a: "We frame around what the surgery is for, not what it guarantees. Awake craniotomy and neuro-navigation videos describe the tools and the decisions, not survival statistics. Patient stories are filmed at least six months post-op, with consented and documented permission, and never used as proxies for prognosis.",
      },
      {
        q: "Do you cover paediatric neurosurgery separately?",
        a: "Yes. Paediatric is a parent-watched library — language, length and call-to-action are different. We tag a paediatric track inside the neurosciences library so a parent searching child seizures lands on a paediatric neurologist, not the adult-stroke playlist.",
      },
      {
        q: "What does success look like?",
        a: "Stroke-window arrivals per month, neuro-OPD consult volume, spine-surgery OT fill-rate, epilepsy-clinic enrolment, and DBS programme enquiries. Tracked quarterly against the published library.",
      },
    ],
    proof: { metric: "45-min", label: "Median door-to-needle improvement after awareness library" },
    videoBrand: "Manipal Hospitals",
    videos: [
      { stage: "awareness",      stageLabel: "Symptom Awareness",   youtubeId: "iETFAJngAso", title: "All About Brain Tumor — Dr. Anurag Saxena",        hospital: "Manipal Hospitals" },
      { stage: "trust",          stageLabel: "Trust Building",      youtubeId: "kXnqX3thg1s", title: "Is Brain Tumor Surgery Safe?",                      hospital: "Manipal Hospitals" },
      { stage: "decision",       stageLabel: "Decision",            youtubeId: "UvHa-YCj-qk", title: "Endoscopic Neurosurgery — Dr. Praveen Ganigi",      hospital: "Manipal Hospitals" },
      { stage: "post-treatment", stageLabel: "Post-treatment Care", youtubeId: "INHQwTyvLRU", title: "Patient's Brain Tumor Recovery Story",              hospital: "Manipal Hospitals" },
    ],
  },
  {
    slug: "orthopaedics",
    name: "Orthopaedics & Joint Care",
    short: "Orthopaedics",
    category: "Surgical",
    oneLiner:
      "Knee, hip, shoulder, spine, sports injury — covered across the chronic-joint and trauma pathways patients actually walk.",
    description:
      "Specialist content for orthopaedics and joint-care programmes — joint replacement, arthroscopy, trauma, sports medicine and paediatric orthopaedics.",
    intro:
      "Orthopaedic patients defer surgery longer than almost any other specialty. The average knee-replacement candidate walks with the pain for six to nine years before booking. Trauma patients have the opposite curve — a fracture is a same-day decision. The library has to support both windows: months of conservative-care research and minutes of ER-room reassurance.",
    paths: [
      {
        label: "Chronic Joint Disease",
        flow: "Intent → OPD → IPD",
        note: "Osteoarthritis, rheumatoid arthritis, knee, hip and shoulder replacement, arthroscopy for meniscus and ligament injuries. Long research window.",
      },
      {
        label: "Trauma & Sports Injury",
        flow: "Intent → ER → OT",
        note: "Fractures, ligament tears, sports injuries, paediatric trauma. Time-critical ER-to-OT or ER-to-conservative pathway.",
      },
    ],
    procedures: [
      "Total knee replacement (TKR), partial knee, robotic knee",
      "Total hip replacement (THR), hip resurfacing",
      "Shoulder arthroscopy and replacement",
      "ACL and meniscus repair",
      "Spine fusion and disc surgery",
      "Trauma fixation (plates, nails, external fixators)",
      "Paediatric orthopaedics (clubfoot, DDH, scoliosis)",
      "Joint preservation and cartilage procedures",
    ],
    topConsults: [
      "knee pain climbing stairs over 50",
      "robotic knee replacement cost India",
      "ACL tear surgery vs conservative",
      "best orthopaedic doctor near HSR Layout",
      "shoulder dislocation recovery time",
      "scoliosis surgery for child",
    ],
    faq: [
      {
        q: "Robotic knee replacement is a marketing term in some hospitals. How do you treat it?",
        a: "Honestly. We script robotic-versus-conventional comparisons that name where the robot adds precision and where it does not. We do not film 'robotic knee in 5 minutes' explainers. The orthopaedic surgeon decides patient-by-patient, and our library reflects that decision-tree, not a marketing line.",
      },
      {
        q: "Do you produce sports-medicine content separately?",
        a: "Yes. Sports patients are younger, return-to-play-driven, and watch on Instagram more than YouTube. We produce a vertical-first sports-medicine track — 60-second mechanism explainers, return-to-sport timelines, prehab content — feeding the same OPD as the joint-replacement track.",
      },
      {
        q: "How do you handle paediatric orthopaedics?",
        a: "Parent-watched, not child-watched. Clubfoot, developmental dysplasia, scoliosis explainers are scripted for a worried parent who has just heard a diagnosis. Tone, length and reassurance pacing are different from the adult-arthritis library.",
      },
      {
        q: "What metrics do you commit to?",
        a: "OPD volume per consultant, joint-replacement OT fill-rate, sports-clinic enrolment, paediatric ortho enquiries, and trauma referrals from local GPs. Quarterly attribution.",
      },
    ],
    proof: { metric: "9-year", label: "Median patient deferral window before electing replacement" },
    videoBrand: "Sparsh Hospital",
    videos: [
      { stage: "awareness",      stageLabel: "Symptom Awareness",   youtubeId: "oWYS9crPGiw", title: "Arthritis — Symptoms & Treatment",                 hospital: "Sparsh Hospital" },
      { stage: "trust",          stageLabel: "Trust Building",      youtubeId: "ZYunMRMs5eg", title: "Dr Sharan Patil — Sparsh Hospital Bangalore",      hospital: "Sparsh Hospital" },
      { stage: "decision",       stageLabel: "Decision",            youtubeId: "Cpg0Z8uwWrU", title: "Robotic Arm Assisted Joint Replacement Surgeries",  hospital: "Sparsh Hospital" },
      { stage: "post-treatment", stageLabel: "Post-treatment Care", youtubeId: "OwXpOxj0VS4", title: "From Uncertainty to Recovery — Patient Story",     hospital: "Sparsh Hospital" },
    ],
  },
  {
    slug: "urology",
    name: "Urology & Andrology",
    short: "Urology",
    category: "Surgical",
    oneLiner:
      "Kidney stones, prostate, incontinence, male reproductive health — written for queries patients are too embarrassed to ask out loud.",
    description:
      "Specialist content for urology and andrology programmes — kidney stones, prostate disease, urological cancer, paediatric urology and male reproductive health.",
    intro:
      "Urology has the highest gap in Indian healthcare between symptom prevalence and clinical presentation. Patients delay because they are embarrassed. The library that compounds is the one that addresses that embarrassment first — calm, non-shaming, language-aware, and clinically precise about when to come in.",
    paths: [
      {
        label: "Stone & General Urology",
        flow: "Intent → OPD",
        note: "Kidney stones, UTI, BPH, urinary symptoms, andrology and male reproductive concerns. OPD-first pathway with day-care procedures.",
      },
      {
        label: "Surgical & Onco-urology",
        flow: "Intent → OPD → IPD",
        note: "Robotic prostatectomy, kidney-cancer surgery, reconstructive urology, paediatric uro-surgery. Decision-heavy admissions with significant pre-op research.",
      },
    ],
    procedures: [
      "RIRS, PCNL and laser stone surgery",
      "TURP, HoLEP and laser prostatectomy",
      "Robotic radical prostatectomy",
      "Kidney-cancer surgery (partial and radical nephrectomy)",
      "Bladder-cancer surgery",
      "Reconstructive and incontinence surgery",
      "Andrology — varicocele, ED, male fertility",
      "Paediatric urology (hypospadias, undescended testis, VUR)",
    ],
    topConsults: [
      "burning urination home remedy",
      "kidney stone size 7mm treatment",
      "best urologist for prostate Bangalore",
      "robotic prostate surgery cost India",
      "is RIRS painful",
      "low sperm count treatment",
    ],
    faq: [
      {
        q: "How do you script andrology and male-fertility content responsibly?",
        a: "Ground rules: clinical names, no slang, no shame, no DTC supplement-style claims. Andrology video on our libraries names the consult, names the workup, and stops short of promising outcomes. The line between male-fertility education and supplement marketing is thin, and we sit firmly on the medical side.",
      },
      {
        q: "Stone surgery is high volume. Does the library actually move it?",
        a: "Yes — but indirectly. Patients pick the centre that ranks for 'kidney stone size X mm' search queries and shows a urologist on screen explaining when to operate and when to wait. RIRS-versus-PCNL comparisons drive most of the OPD lift on stone-heavy programmes.",
      },
      {
        q: "Robotic prostatectomy — every centre claims robotic. How do you differentiate honestly?",
        a: "We film the surgeon's decision criteria, not the brand of the robot. A patient who understands when robotic is indicated and when open is appropriate trusts the surgeon more than the platform. We refuse 'India's first' or 'most advanced' framing without verifiable claim.",
      },
      {
        q: "Do you produce content in regional languages?",
        a: "Yes — Hindi, Kannada, Tamil, Telugu and Malayalam at minimum on uro-libraries. Embarrassed patients consume in their first language disproportionately, and the conversion gap on language-matched content is large.",
      },
    ],
    proof: { metric: "5", label: "Indian languages covered on standard uro-libraries" },
  },
  {
    slug: "ophthalmology",
    name: "Ophthalmology & Eye Care",
    short: "Ophthalmology",
    category: "Surgical",
    oneLiner:
      "Cataract, refractive, retina, glaucoma, paediatric — covered across consult, day-care surgery and complex retina pathways.",
    description:
      "Specialist content for ophthalmology programmes — cataract, refractive surgery, retina, cornea, glaucoma, paediatric and oculoplasty pathways.",
    intro:
      "Ophthalmology is unusual in Indian healthcare — high volume, mostly day-care, and dominated by patient choice rather than referral. Cataract patients pick a hospital from a Google search. Refractive patients pick a surgeon from YouTube. The library is the conversion engine, not a support asset.",
    paths: [
      {
        label: "Refractive & Cataract",
        flow: "Intent → OPD → Day-care",
        note: "Cataract, refractive surgery (LASIK, SMILE, ICL), routine OPD, dry eye, presbyopia. High-volume day-care pathway.",
      },
      {
        label: "Retina & Complex",
        flow: "Intent → OPD → IPD",
        note: "Vitreo-retinal surgery, glaucoma, corneal transplant, paediatric strabismus, oculoplasty. Decision-heavy and often referred.",
      },
    ],
    procedures: [
      "Phacoemulsification and premium IOLs",
      "LASIK, SMILE, Contoura, ICL",
      "Vitreo-retinal surgery, anti-VEGF injections",
      "Glaucoma surgery (trabeculectomy, MIGS)",
      "Corneal transplant (DSAEK, DMEK, PKP)",
      "Paediatric ophthalmology and squint",
      "Oculoplasty and lacrimal surgery",
      "Diabetic retinopathy screening and laser",
    ],
    topConsults: [
      "cataract surgery cost in Bangalore",
      "lens type for cataract toric vs multifocal",
      "is LASIK safe long term",
      "blurry vision in one eye sudden",
      "diabetic retinopathy treatment cost",
      "squint surgery for child age 4",
    ],
    faq: [
      {
        q: "Refractive surgery is a competitive category. How do you avoid sounding like every other LASIK ad?",
        a: "We film the consult, not the procedure. Most LASIK marketing is OT footage and price points. Patients actually want to know whether they are eligible, what the screening involves, and what happens if they are not a candidate. Honest screening-day video converts better than the OT close-up.",
      },
      {
        q: "Premium IOL upselling is a real ethical issue in cataract. How do you handle it?",
        a: "We script IOL-choice videos that name the trade-offs. Multifocal is right for some patients and wrong for others — and we say so. A library that helps a patient pick the right lens earns the next decade of family referrals; a library that nudges every patient to the highest-margin lens does not.",
      },
      {
        q: "Do you cover paediatric ophthalmology?",
        a: "Yes — squint, amblyopia, paediatric refractive, retinopathy of prematurity. Parent-watched library on a separate track. Paediatric ophthalmologists on our roster spend about an hour a quarter on camera; we bank a year of content from that.",
      },
      {
        q: "What is the cost-per-patient on an ophthalmology library?",
        a: "On day-care-heavy specialties like cataract and refractive, we typically see cost-per-qualified-OPD under ₹400 once the library is six months mature. Lower than any other specialty we run.",
      },
    ],
    proof: { metric: "60+", label: "Procedure-specific videos in a standard ophthalmology library" },
  },
  {
    slug: "ent",
    name: "ENT, Head & Neck",
    short: "ENT",
    category: "Surgical",
    oneLiner:
      "Sinus, hearing, voice, paediatric ENT, head-and-neck — across consult, day-care endoscopic and complex onco pathways.",
    description:
      "Specialist content for ENT programmes — rhinology, otology, laryngology, paediatric ENT, head-and-neck oncology and sleep-disordered breathing.",
    intro:
      "ENT sits in an awkward place — high volume, mostly OPD, but with a long tail of complex head-and-neck cancer and skull-base work that needs serious editorial care. The same hospital that ranks for 'tonsillectomy for child' also wants to be found for 'head and neck cancer second opinion'. The library has to thread that.",
    paths: [
      {
        label: "General ENT",
        flow: "Intent → OPD → Day-care",
        note: "Sinusitis, allergic rhinitis, ear infection, hearing loss, voice and swallowing, paediatric tonsils and adenoids. OPD-first day-care pathway.",
      },
      {
        label: "Head & Neck Surgical",
        flow: "Intent → OPD → IPD",
        note: "Functional endoscopic sinus surgery, cochlear implant, head-and-neck cancer surgery, skull base, thyroid, sleep surgery. Inpatient admissions.",
      },
    ],
    procedures: [
      "Functional endoscopic sinus surgery (FESS)",
      "Cochlear implant and hearing-aid fitting",
      "Tonsillectomy and adenoidectomy",
      "Septoplasty and turbinate reduction",
      "Head-and-neck cancer surgery (oral, laryngeal)",
      "Thyroid and parathyroid surgery",
      "Sleep surgery and DISE-guided procedures",
      "Voice and swallowing therapy",
    ],
    topConsults: [
      "sinus headache home remedy",
      "child snoring tonsils removal",
      "cochlear implant cost India",
      "best ENT for vertigo Bangalore",
      "is septoplasty painful",
      "thyroid surgery scar",
    ],
    faq: [
      {
        q: "Cochlear implant is a high-investment, high-emotion decision. How do you produce content for it?",
        a: "Slowly, and with families on screen — never the surgeon alone. A cochlear implant library that earns trust shows the multidisciplinary team — surgeon, audiologist, speech therapist — and the timeline of rehabilitation. We refuse hero-surgeon framing on this category.",
      },
      {
        q: "Paediatric tonsil and adenoid surgery — every parent wants to know if it is 'really needed'.",
        a: "That is exactly the script we build. The library names the indication criteria, the watchful-waiting pathway, and the sleep-disordered-breathing red flags. A parent who watches the video and decides not to operate this year is still a patient we earned — they will come back next year if the indication develops.",
      },
      {
        q: "Head-and-neck cancer is oncology — do you split it into the cancer-care library?",
        a: "Cross-tagged. Head-and-neck cancer surgery sits primarily in the ENT library because the surgeon is an ENT-onco surgeon, and the patient searches start at 'mouth ulcer not healing' and 'lump in neck' — ENT queries. The cancer-care library cross-references for the second-opinion path.",
      },
      {
        q: "Do you produce sleep-medicine content?",
        a: "Yes — DISE, surgical sleep, and the consult-versus-CPAP decision. Sleep is undermarketed in Indian ENT and a high-yield content category.",
      },
    ],
    proof: { metric: "4", label: "Sub-disciplines covered on a single ENT library" },
  },
  {
    slug: "dental",
    name: "Dental & Maxillofacial",
    short: "Dental",
    category: "Surgical",
    oneLiner:
      "Implants, ortho, paediatric dentistry, maxillofacial — written for the high-research, price-sensitive Indian dental patient.",
    description:
      "Specialist content for dental and maxillofacial programmes — implants, orthodontics, paediatric dentistry, oral surgery, prosthodontics and cosmetic dentistry.",
    intro:
      "Dental is the most price-shopped specialty on the internet. Patients compare implant prices across four hospitals before booking the consult. The library that wins is honest about cost ranges, named about brand-of-implant choice, and direct about what a clinic does and does not do well — the only posture that survives the comparison.",
    paths: [
      {
        label: "General & Cosmetic Dental",
        flow: "Intent → OPD",
        note: "Cleaning, fillings, root canal, crowns, whitening, smile design, paediatric dentistry. High-volume OPD pathway.",
      },
      {
        label: "Implants & Maxillofacial",
        flow: "Intent → OPD → Surgery",
        note: "Dental implants, full-arch restoration, orthognathic surgery, oral cancer, TMJ, complex extractions. Surgical day-care or short admission.",
      },
    ],
    procedures: [
      "Single and full-arch dental implants",
      "Root canal treatment and endodontics",
      "Orthodontics — braces, aligners, Invisalign",
      "Paediatric dentistry and orthodontics",
      "Smile design and cosmetic dentistry",
      "Orthognathic and corrective jaw surgery",
      "Oral cancer screening and surgery",
      "TMJ and sleep-dentistry interventions",
    ],
    topConsults: [
      "dental implant cost Bangalore",
      "root canal vs extraction",
      "Invisalign cost India",
      "best paediatric dentist near me",
      "all on 4 vs all on 6 implants",
      "wisdom tooth removal recovery",
    ],
    faq: [
      {
        q: "Implant pricing varies by brand. Do you publish costs?",
        a: "Ranges, not point prices, and only with the clinical rationale. A patient who reads 'implants from ₹25,000' on one site and 'implants from ₹55,000' on another deserves to know the difference is not a margin grab — it is brand of implant, surgeon experience and prosthesis. We script those explainers.",
      },
      {
        q: "Aligners are a heavily marketed category. How do you stay honest?",
        a: "We script eligibility-first. Most aligner ads imply universal candidacy. Most patients are candidates, but not all — and the consult that begins with 'you are not a candidate, here is what is' earns more long-term loyalty than the upsell. We refuse 'aligners for everyone' framing.",
      },
      {
        q: "Do you produce paediatric-dentistry content?",
        a: "Yes, parent-watched. Paediatric dentistry libraries are heavily skewed towards behaviour management — what to expect on a first visit, sedation versus general anaesthesia for kids, when fluoride and sealants are indicated.",
      },
      {
        q: "How do you handle smile-design before-and-afters?",
        a: "We do not. Cosmetic before-and-after imagery is a regulatory grey zone in India and an ethical one everywhere. We use process video — the consult, the diagnostic wax-up, the temporary fitting — and let the patient narrate their experience.",
      },
    ],
    proof: { metric: "3-quote", label: "Average price comparison patients run before booking" },
  },
  {
    slug: "general-surgery",
    name: "General & Minimal-Access Surgery",
    short: "General surgery",
    category: "Surgical",
    oneLiner:
      "Hernia, gallbladder, GI surgery, bariatric, breast — covered for the day-care laparoscopic and complex GI pathways.",
    description:
      "Specialist content for general-surgery and minimal-access programmes — hernia, gallbladder, hepatobiliary, bariatric, breast and emergency surgery.",
    intro:
      "General surgery is everything from a 90-minute laparoscopic gallbladder to a 9-hour Whipple. The library has to support both the high-volume, low-anxiety day-care patient and the family weighing complex pancreatic or hepatobiliary surgery. We split the editorial line accordingly.",
    paths: [
      {
        label: "Day-care Laparoscopic",
        flow: "Intent → OPD → Day-care",
        note: "Hernia, gallbladder, appendix, piles, fissure, hydrocele. Short admission laparoscopic pathway with predictable recovery.",
      },
      {
        label: "Complex GI & Bariatric",
        flow: "Intent → OPD → IPD",
        note: "Bariatric surgery, hepatobiliary, pancreatic, oesophageal, breast and complex GI. Multi-day admissions with significant pre-op research.",
      },
    ],
    procedures: [
      "Laparoscopic cholecystectomy and hernia repair",
      "Bariatric surgery (sleeve, RYGB, mini-gastric bypass)",
      "Hepatobiliary and pancreatic surgery (Whipple)",
      "Colorectal and rectal surgery",
      "Breast surgery (lumpectomy, mastectomy, oncoplastic)",
      "Anorectal — piles, fissure, fistula (incl. laser)",
      "Oesophageal and stomach surgery",
      "Emergency general surgery",
    ],
    topConsults: [
      "gallbladder stones surgery cost",
      "laser piles treatment Bangalore",
      "weight loss surgery eligibility BMI",
      "hernia mesh which type is best",
      "is laparoscopic surgery painful",
      "Whipple surgery survival rate",
    ],
    faq: [
      {
        q: "Bariatric is heavily marketed and ethically messy. Where do you draw the line?",
        a: "We refuse before-and-after imagery, refuse weight-loss number guarantees, and script eligibility-first videos that name the BMI thresholds and comorbidity criteria. Patients who watch the eligibility video and decide they are not candidates often refer their relatives who are. The library plays a long game.",
      },
      {
        q: "Laser piles — every clinic claims it. How do you handle the comparison?",
        a: "Honestly. We script laser-vs-conventional-vs-stapler videos jointly with the surgeon, name the patient profiles each suits, and name the limits. A patient with grade-1 haemorrhoids does not need any surgery, and we say so. That refusal builds trust the upsell does not.",
      },
      {
        q: "Do you cover emergency general surgery?",
        a: "We produce ER-arrival explainers — appendicitis, acute abdomen, gallstone pancreatitis, perforation — that help families decide which centre to drive to in an emergency. Conversion is harder to attribute, but inbound ER-to-OT conversions on these programmes are measurable.",
      },
      {
        q: "Breast surgery sits between general surgery and oncology. Where does it live?",
        a: "Cross-tagged. Most patients first present to a general surgeon for a breast lump. The library covers benign and malignant pathways together so 'lump in breast' and 'breast cancer surgery' both lead to the right consultant.",
      },
    ],
    proof: { metric: "12", label: "Procedure-specific landing pages on a standard library" },
  },

  // ============================================================
  // WOMEN & CHILD
  // ============================================================
  {
    slug: "obstetrics-gynaecology",
    name: "Obstetrics & Gynaecology",
    short: "OB-GYN",
    category: "Women & Child",
    oneLiner:
      "Pregnancy, gynae surgery, menopause, adolescent care — written for the most-trusted specialty relationship in medicine.",
    description:
      "Specialist content for obstetrics and gynaecology programmes — antenatal care, high-risk pregnancy, gynae surgery, menopause, adolescent and women's wellness.",
    intro:
      "OB-GYN is the longest-running clinical relationship most women have. A patient who chooses an obstetrician for her first delivery often stays for menopause. The library is written with that arc in mind — calm, non-judgemental, language-aware, and split cleanly between the obstetric and the gynaecological tracks.",
    paths: [
      {
        label: "Obstetrics & Antenatal",
        flow: "Intent → OPD → IPD",
        note: "Antenatal care, high-risk pregnancy, normal and caesarean delivery, postnatal care, lactation. Nine-month relationship into a planned admission.",
      },
      {
        label: "Gynaecology & Surgery",
        flow: "Intent → OPD → Surgery",
        note: "Menstrual disorders, fibroids, endometriosis, PCOS, hysterectomy, urogynae, menopause, adolescent gynae. OPD-led with surgical sub-track.",
      },
    ],
    procedures: [
      "Antenatal care, high-risk pregnancy, foetal medicine",
      "Normal vaginal and caesarean delivery",
      "Laparoscopic hysterectomy and fibroid surgery",
      "Endometriosis surgery and laparoscopic excision",
      "Urogynae and pelvic-floor reconstruction",
      "Adolescent and PCOS care",
      "Menopause and hormone therapy",
      "Cervical and breast cancer screening",
    ],
    topConsults: [
      "best gynaecologist for first pregnancy Bangalore",
      "PCOS treatment without medication",
      "fibroid surgery vs medication",
      "is normal delivery possible after C-section",
      "menopause hot flashes treatment",
      "irregular periods after 40",
    ],
    faq: [
      {
        q: "How do you film a pregnant patient without crossing into testimonial territory?",
        a: "We film process, not promise. An antenatal patient on screen describes what her week-12 scan covered, what her birth plan looks like, what reassured her. We never film outcome statements — and we do not film mid-trimester patients on prognosis-sensitive cases. Consent is documented per shoot, not per project.",
      },
      {
        q: "Caesarean rates are a sensitive topic in India. How do you script delivery content?",
        a: "We script 'when caesarean is right' alongside 'when normal delivery is right' — both with the same obstetrician on screen. A library that helps a mother understand the indication criteria for each builds trust the 'normal-delivery only' or 'painless-delivery' marketing line cannot.",
      },
      {
        q: "Do you produce content for adolescent and menopause care?",
        a: "Yes, both — and they are the most undermarketed sub-tracks in Indian gynae. Adolescent content is mother-watched, menopause is patient-watched. Both convert at higher rates than the obstetric track once the library matures.",
      },
      {
        q: "Language coverage matters here more than most specialties.",
        a: "Agreed. Standard OB-GYN libraries on our roster ship in Hindi, Kannada, Tamil, Telugu, Malayalam and Marathi at minimum. Pregnancy questions are asked in the first language disproportionately, and the conversion lift on language-matched content is the largest of any specialty we run.",
      },
    ],
    proof: { metric: "6", label: "Indian languages on standard antenatal libraries" },
  },
  {
    slug: "fertility",
    name: "Fertility & IVF",
    short: "Fertility",
    category: "Women & Child",
    oneLiner:
      "IVF, IUI, male fertility, fertility preservation — calm, success-rate-honest content for the highest-emotion specialty in healthcare.",
    description:
      "Specialist content for fertility and IVF programmes — IUI, IVF, ICSI, donor cycles, male fertility, fertility preservation and recurrent pregnancy loss.",
    intro:
      "Fertility is the most emotionally loaded specialty in Indian healthcare. Couples research for months, often years. They compare success rates across clinics, watch hours of consultant content, and walk into the consult having read more than most generalists. The library has to be honest about success rates, calm about failure, and clear about the differences between IUI, IVF and ICSI — without selling false hope.",
    paths: [
      {
        label: "Diagnostic & IUI",
        flow: "Intent → OPD",
        note: "Fertility workup, IUI, mild stimulation, male and female fertility evaluation, recurrent pregnancy loss. OPD-led pathway with day-care procedures.",
      },
      {
        label: "IVF & Surgical",
        flow: "Intent → OPD → IPD",
        note: "IVF, ICSI, donor cycles, fertility preservation, surgical sperm retrieval, hysteroscopy and laparoscopy for fertility. Multi-cycle decision-heavy programme.",
      },
    ],
    procedures: [
      "IUI (intrauterine insemination)",
      "IVF and ICSI cycles",
      "Donor egg, donor sperm and donor embryo cycles",
      "Fertility preservation (egg, sperm, embryo freezing)",
      "Surgical sperm retrieval (TESA, TESE, micro-TESE)",
      "Hysteroscopy and laparoscopy for fertility",
      "Recurrent pregnancy loss workup",
      "Onco-fertility consultations",
    ],
    topConsults: [
      "IVF success rate first cycle India",
      "best fertility doctor Bangalore",
      "low AMH at 35 chances",
      "IVF cost in India 2025",
      "ICSI vs IVF which is better",
      "male infertility treatment",
    ],
    faq: [
      {
        q: "Success rates are a regulatory minefield in fertility marketing. How do you handle them?",
        a: "We publish age-stratified clinic averages with the cycle-count denominator visible — never marketing-led headline percentages. A 'we have a 70% success rate' claim is meaningless without the age band, the cycle definition and the protocol mix. We refuse to ship that framing.",
      },
      {
        q: "Couples watch hours of fertility content. How long should the videos be?",
        a: "Long — 8 to 15 minutes for the major decision videos (egg-retrieval explainer, embryo-grading, why-IVF-fails). Patients watching short reels in this category convert worse than patients watching long-form. The fertility patient is a researcher, not a scroller.",
      },
      {
        q: "Do you produce male-fertility content separately?",
        a: "Yes — and it is the most underdone sub-track in the category. Male-factor accounts for a third of fertility cases. A library that names the workup, the surgical sperm retrieval pathway, and the ICSI option earns inbound male-evaluation enquiries that most clinics never see.",
      },
      {
        q: "How do you film consented IVF patient stories?",
        a: "Six months minimum after live birth, never during a cycle, never on outcome promises. The story is framed around the decision the couple made — when to start, when to switch protocols, when to consider donor cycles. Outcome is mentioned, not promised.",
      },
    ],
    proof: { metric: "8-min", label: "Median watch time on long-form fertility decision videos" },
  },
  {
    slug: "paediatrics",
    name: "Paediatrics & Neonatology",
    short: "Paediatrics",
    category: "Women & Child",
    oneLiner:
      "Newborn, well-child, vaccination, paediatric specialty, NICU — calm content for the most worried watcher in medicine.",
    description:
      "Specialist content for paediatrics and neonatology programmes — NICU, well-child, vaccination, paediatric subspecialty and adolescent care.",
    intro:
      "Every paediatric patient has a watcher — usually a mother on a phone at 2am, sometimes a grandmother on WhatsApp the next morning. The library is written for that watcher, not the patient. Tone is calm, language is reassuring without being patronising, and clinical information is precise enough to settle a worry rather than start one.",
    paths: [
      {
        label: "Outpatient & Vaccination",
        flow: "Intent → OPD",
        note: "Well-child visits, vaccination, common paediatric illness, growth and development, paediatric specialty consults. Long-term OPD relationship.",
      },
    ],
    procedures: [
      "Well-child and immunisation schedules",
      "Paediatric specialty consults — cardiology, neurology, GI, endocrine",
      "NICU and Level III neonatal care",
      "Asthma, allergy and respiratory care",
      "Paediatric infectious disease management",
      "Growth, development and adolescent care",
      "Paediatric surgery referral pathways",
      "Newborn screening and metabolic disorders",
    ],
    topConsults: [
      "best paediatrician near Indiranagar",
      "child fever 102 when to worry",
      "vaccination schedule India 2025",
      "NICU cost per day India",
      "child not gaining weight 2 years",
      "paediatric asthma triggers",
    ],
    faq: [
      {
        q: "How do you script paediatric content without scaring parents?",
        a: "We name the red flags clearly, then immediately name the reassurance. 'Most fevers in the first 48 hours do not need an ER visit; here are the three signs that change that.' Reassurance-first paediatric scripts convert better than alarm-first scripts and do less harm.",
      },
      {
        q: "Vaccination content is politically charged. How do you handle it?",
        a: "Straight: we cite the IAP schedule, name the rationale, and stop short of debating refusal. We do not engage anti-vaccine framing in comments and we do not produce comparison content with non-evidence-based alternatives. The library is firmly evidence-based.",
      },
      {
        q: "NICU content — how do you film a Level III unit responsibly?",
        a: "We do not film inside the NICU. We film parents who have completed the journey, the neonatologist explaining the standard of care, and the nursing protocols at the door. NICU footage with babies on screen is consent-impossible — we refuse it.",
      },
      {
        q: "Does the library actually drive consult volume in a long-term-relationship specialty?",
        a: "Yes, but the metric is different. We measure inbound new-baby registrations, vaccination-clinic enrolment, and well-child visit retention. A paediatric library is a multi-year relationship engine — measured on twelve-month retention, not twelve-week conversion.",
      },
    ],
    proof: { metric: "92%", label: "Twelve-month well-child retention on mature libraries" },
    videoBrand: "Narayana Health",
    videos: [
      { stage: "awareness",      stageLabel: "Symptom Awareness",   youtubeId: "xSxy9eNcq1s", title: "Advanced Treatment for Congenital Heart Disease in Children", hospital: "Narayana Health" },
      { stage: "trust",          stageLabel: "Trust Building",      youtubeId: "p3_zCTNZfuE", title: "Patient Success Story — Pediatric Cardiac Surgery",             hospital: "Narayana Health" },
      { stage: "decision",       stageLabel: "Decision",            youtubeId: "zUews1ba9VU", title: "Narayana Health's Paediatric Cardiac Surgery Program",           hospital: "Narayana Health" },
      { stage: "post-treatment", stageLabel: "Post-treatment Care", youtubeId: "aGx-aecM8Eo", title: "Free Heart Surgery of Child (TOF) — Patient Story",             hospital: "Narayana Health" },
    ],
  },

  // ============================================================
  // MEDICAL
  // ============================================================
  {
    slug: "dermatology",
    name: "Dermatology & Aesthetic Medicine",
    short: "Dermatology",
    category: "Medical",
    oneLiner:
      "Acne, eczema, psoriasis, hair loss, lasers, aesthetic — covered across medical and aesthetic dermatology pathways.",
    description:
      "Specialist content for dermatology and aesthetic-medicine programmes — medical dermatology, paediatric, hair, dermatosurgery and aesthetic dermatology.",
    intro:
      "Dermatology is the specialty most affected by the internet. Patients self-diagnose for months on Reddit, watch creator videos, try DTC actives, and arrive at the consult with a partial answer. The library that wins is the one that respects the research the patient has already done — and corrects it gently where needed.",
    paths: [
      {
        label: "Medical Dermatology",
        flow: "Intent → OPD",
        note: "Acne, eczema, psoriasis, vitiligo, fungal and bacterial skin infection, hair loss, paediatric dermatology, autoimmune skin disease. Long-term OPD relationship.",
      },
      {
        label: "Aesthetic & Procedural",
        flow: "Intent → OPD → Procedure",
        note: "Lasers, chemical peels, botox, fillers, hair restoration, dermatosurgery, scar revision, pigmentation treatment. Day-care procedural pathway.",
      },
    ],
    procedures: [
      "Acne and acne-scar management",
      "Eczema, psoriasis and atopic dermatitis",
      "Vitiligo, melasma and pigmentation treatment",
      "Hair-loss medical management and PRP",
      "Hair transplant (FUE, DHI)",
      "Lasers — toning, resurfacing, hair removal",
      "Dermatosurgery and minor skin surgery",
      "Botulinum toxin and dermal fillers",
    ],
    topConsults: [
      "acne treatment that actually works",
      "hair loss women age 30",
      "is laser hair removal permanent",
      "psoriasis flare-up summer",
      "best dermatologist for melasma Bangalore",
      "PRP vs hair transplant",
    ],
    faq: [
      {
        q: "DTC skincare brands have flooded the dermatology category. How do you compete?",
        a: "We do not compete on volume — we compete on clinical accuracy. Most DTC content overstates active ingredients and understates side effects. A dermatologist on screen explaining when a 1% retinoid is appropriate and when it is not earns the patient a creator video cannot. We refuse to produce ingredient-celebrity content.",
      },
      {
        q: "Aesthetic before-and-afters — every clinic uses them. Do you?",
        a: "No. Cosmetic before-and-after imagery is a regulatory grey zone in India and an ethical one everywhere. We produce process video — the consult, the indication discussion, the procedure itself with realistic expectations — and let the patient narrate. Conversions are slower; trust compounds longer.",
      },
      {
        q: "Hair transplant is a heavily marketed sub-category. Where do you sit?",
        a: "On the medical side. We script eligibility-first videos that name the donor-density assessment and the timeline of expected growth. We refuse 'guaranteed density' and 'pain-free' framing. Patients who watch the eligibility video and decide to defer the procedure for a year often come back as patients.",
      },
      {
        q: "How do you handle paediatric dermatology?",
        a: "Parent-watched library on a separate track. Atopic dermatitis, infantile haemangioma, paediatric eczema and steroid-fear are the highest-search topics. Tone is reassurance-first; clinical content is precise enough to displace the WhatsApp-forwarded steroid panic.",
      },
    ],
    proof: { metric: "40%", label: "Of patients arrive having self-diagnosed online" },
  },
  {
    slug: "endocrinology-diabetes",
    name: "Endocrinology & Diabetes",
    short: "Endocrinology & diabetes",
    category: "Medical",
    oneLiner:
      "Diabetes, thyroid, PCOS, obesity, hormonal — long-relationship medical content for India's largest chronic-disease cohort.",
    description:
      "Specialist content for endocrinology and diabetes programmes — type 1, type 2 and gestational diabetes, thyroid, PCOS, obesity, paediatric and reproductive endocrinology.",
    intro:
      "India has the second-largest diabetic population in the world. The library is not about acquiring a one-time consult — it is about earning a twenty-year relationship. We script for adherence, lifestyle realism, and the hundred small decisions a diabetic makes between consults.",
    paths: [
      {
        label: "Endocrinology & Diabetes",
        flow: "Intent → OPD",
        note: "Type 1 and type 2 diabetes, thyroid disorders, PCOS, obesity, osteoporosis, paediatric and reproductive endocrinology. Long-term OPD relationship with quarterly follow-up.",
      },
    ],
    procedures: [
      "Type 1 and type 2 diabetes management",
      "Continuous glucose monitoring (CGM) and insulin pumps",
      "Gestational diabetes care",
      "Thyroid disorders and thyroid nodule workup",
      "PCOS and reproductive endocrinology",
      "Obesity and metabolic medicine",
      "Adrenal and pituitary disorders",
      "Paediatric endocrinology and growth",
    ],
    topConsults: [
      "HbA1c target type 2 diabetes",
      "best endocrinologist for thyroid Bangalore",
      "PCOS weight loss diet",
      "Ozempic side effects long term",
      "child not growing height treatment",
      "thyroid nodule cancer risk",
    ],
    faq: [
      {
        q: "GLP-1 drugs (Ozempic, Mounjaro) are a marketing flashpoint. How do you handle them?",
        a: "Cautiously. We script eligibility-first content that names the BMI and comorbidity criteria, the side-effect profile, and the cost. We refuse weight-loss-only framing on prescription drugs and we do not produce content that markets them direct-to-patient — that crosses MCI and DCGI lines. The library is endocrinologist-led, not pharmacy-led.",
      },
      {
        q: "Diabetes is a chronic relationship. What does the library actually move?",
        a: "Three things: new-patient enrolment in the diabetes programme, twelve-month adherence to follow-up, and CGM-and-pump uptake. Acquisition is a small share of the value; retention is most of it. Library content for the existing patient — what to do during Ramzan, how to interpret a CGM trend, when to escalate — moves retention measurably.",
      },
      {
        q: "Thyroid is high-volume and over-investigated. Where do you draw the line?",
        a: "Honestly. Most thyroid nodules do not need a FNAC; most subclinical hypothyroidism does not need treatment. We script videos that name the criteria for investigation and treatment and let the consult decide the rest. A 'thyroid screening for everyone' library would be commercially appealing and clinically wrong.",
      },
      {
        q: "How does the library handle PCOS?",
        a: "Multi-discipline: gynae, endo, dermatology, mental health and nutrition together. PCOS patients researching online land on contradictory advice; the library that aligns the four perspectives in one place earns the consult.",
      },
    ],
    proof: { metric: "20-year", label: "Median patient relationship the library is designed for" },
    videoBrand: "Narayana Health",
    videos: [
      { stage: "awareness",      stageLabel: "Symptom Awareness",   youtubeId: "hXks0gOtWIk", title: "Discussion on Diabetes — Dr. Devi Shetty",          hospital: "Narayana Health" },
      { stage: "trust",          stageLabel: "Trust Building",      youtubeId: "Rz4xyssDPHs", title: "Importance of Insulin in Diabetes Management",     hospital: "Narayana Health" },
      { stage: "decision",       stageLabel: "Decision",            youtubeId: "zqAA9iT5nmI", title: "Is Diabetes Curable?",                              hospital: "Narayana Health" },
      { stage: "post-treatment", stageLabel: "Post-treatment Care", youtubeId: "sK7xH36BPyg", title: "Exercise & Diabetes: Expert Advice",                hospital: "Narayana Health" },
    ],
  },
  {
    slug: "gastroenterology",
    name: "Gastroenterology & Hepatology",
    short: "Gastroenterology",
    category: "Medical",
    oneLiner:
      "Acidity, IBS, IBD, liver, endoscopy — covered across consult, day-care endoscopic and hepatology pathways.",
    description:
      "Specialist content for gastroenterology and hepatology programmes — GI consult, endoscopy and colonoscopy, IBD, liver disease and pancreaticobiliary care.",
    intro:
      "Gastroenterology has the strongest 'Google before consult' pattern of any medical specialty. Patients with reflux, IBS or unexplained abdominal pain will read for weeks before booking. The library is the bridge between that reading and the consult — calm, diagnostic-aware, and clear about when an endoscopy is indicated and when it is not.",
    paths: [
      {
        label: "GI Consult & Endoscopy",
        flow: "Intent → OPD → Day-care",
        note: "Acidity, IBS, IBD, dyspepsia, hepatitis, fatty liver, endoscopy and colonoscopy, ERCP. OPD-led pathway with day-care diagnostic and therapeutic procedures.",
      },
    ],
    procedures: [
      "Diagnostic and therapeutic endoscopy",
      "Colonoscopy and polyp screening",
      "ERCP and pancreaticobiliary intervention",
      "Inflammatory bowel disease (Crohn's, UC) management",
      "Hepatitis B, C and viral liver disease",
      "Fatty liver (NAFLD, NASH) management",
      "Cirrhosis, liver-transplant evaluation",
      "Capsule endoscopy and motility studies",
    ],
    topConsults: [
      "acidity not reducing with medicine",
      "is colonoscopy painful",
      "fatty liver grade 2 reversal",
      "IBS treatment that works",
      "best gastroenterologist Bangalore",
      "hepatitis B treatment cost",
    ],
    faq: [
      {
        q: "Endoscopy and colonoscopy are over-prescribed in some centres. How do you handle that?",
        a: "We script indication-first videos. A patient with simple acidity on antacids does not need an endoscopy at month one — we say so, name the red flags that change the calculus, and let the consult decide. The library that helps a patient avoid an unnecessary scope earns longer trust than the one that pushes everyone into a scope room.",
      },
      {
        q: "Fatty liver is a fast-growing category. Where do you sit?",
        a: "Lifestyle-first, drug-cautious. NAFLD reversal is mostly diet, exercise and weight loss; the supplement and 'liver-cleanse' market is not. We refuse to produce content that endorses unproven liver supplements and we name the evidence base where it exists.",
      },
      {
        q: "IBD content — Crohn's and UC patients are highly informed.",
        a: "Agreed — they are the most informed patient cohort in any GI library. We script for that level: biologics, biosimilars, surveillance, surgery indications. IBD content that is too elementary alienates the audience; the library calibrates to a patient already two years into the disease.",
      },
      {
        q: "Liver transplant — does that live here or in surgical?",
        a: "Cross-tagged. Hepatology owns the workup, surgical owns the operation. The library covers both, and the consultant on screen for the transplant explainer is a hepatologist-and-surgeon pair.",
      },
    ],
    proof: { metric: "6-week", label: "Median symptom-research window before booking a consult" },
    videoBrand: "Manipal Hospitals",
    videos: [
      { stage: "awareness",      stageLabel: "Symptom Awareness",   youtubeId: "fsBOlPkmOQI", title: "What is Fatty Liver and What Causes It?",            hospital: "Manipal Hospitals" },
      { stage: "trust",          stageLabel: "Trust Building",      youtubeId: "1iaD4vBq00k", title: "Know Your Doctor — Gastroenterology & Hepatology",   hospital: "Manipal Hospitals" },
      { stage: "decision",       stageLabel: "Decision",            youtubeId: "aNsrN6VM0oI", title: "Upper GI Endoscopy — Dr. Shankar Lal Jat",           hospital: "Manipal Hospitals" },
      { stage: "post-treatment", stageLabel: "Post-treatment Care", youtubeId: "f92nHj46Wpw", title: "Fatty Liver — Dr. Amol Dahale",                      hospital: "Manipal Hospitals" },
    ],
  },
  {
    slug: "nephrology",
    name: "Nephrology & Dialysis",
    short: "Nephrology",
    category: "Medical",
    oneLiner:
      "CKD, dialysis, transplant evaluation, hypertension — long-relationship medical content for a high-stakes chronic specialty.",
    description:
      "Specialist content for nephrology and dialysis programmes — CKD, hypertension, dialysis, kidney transplant evaluation and paediatric nephrology.",
    intro:
      "Nephrology is one of the highest-stakes chronic specialties. A CKD diagnosis changes the next decade of a patient's life, and the choice of nephrologist often becomes the choice of dialysis centre and transplant programme. The library is a long-relationship asset — written for patients early in CKD, not just those already on dialysis.",
    paths: [
      {
        label: "Nephrology & Dialysis",
        flow: "Intent → OPD → IPD",
        note: "CKD, hypertension, glomerulonephritis, diabetic nephropathy, dialysis (HD, PD), transplant evaluation, paediatric nephrology. Long-term OPD with periodic admissions.",
      },
    ],
    procedures: [
      "CKD staging and conservative management",
      "Haemodialysis and peritoneal dialysis",
      "Kidney transplant evaluation and post-transplant care",
      "AV fistula and dialysis-access surgery",
      "Glomerulonephritis and biopsy-led management",
      "Hypertension and resistant-hypertension workup",
      "Paediatric nephrology",
      "Onco-nephrology",
    ],
    topConsults: [
      "creatinine 1.5 stage of CKD",
      "best nephrologist Bangalore",
      "kidney transplant cost India",
      "is dialysis painful",
      "fistula vs catheter dialysis",
      "diabetic kidney disease reverse",
    ],
    faq: [
      {
        q: "CKD is asymptomatic until late. How do you script for early-stage patients?",
        a: "Carefully. Most early-CKD content is either alarmist or dismissive. We script 'what stage 3 actually means', 'why your eGFR matters more than creatinine', and 'the ten lifestyle moves that delay progression' — videos that respect the patient's anxiety without amplifying it. Most stage-3 patients do not progress to dialysis; the library says so.",
      },
      {
        q: "Transplant evaluation is the highest-emotion content in this specialty.",
        a: "And the most consent-sensitive. We film transplant patients only after one year post-op, never with the donor on screen unless both are independently consented, and never with outcome promises. The story is framed around the decision and the wait, not the survival.",
      },
      {
        q: "Dialysis-centre choice is mostly geographic. Does content move it?",
        a: "Yes, but not the way most marketing assumes. The patient picks the dialysis centre nearest to home — the content moves which nephrologist they pick, which then determines the centre. Library investment goes into the OPD nephrologist content, not the dialysis-bay tour.",
      },
      {
        q: "How do you handle paediatric nephrology?",
        a: "Parent-watched, separate track. Paediatric CKD, congenital anomalies of kidney, and paediatric nephrotic syndrome are the highest-search topics. Tone is reassurance-first — paediatric nephrology is a long, complicated relationship, and the library is calibrated for that.",
      },
    ],
    proof: { metric: "10-year", label: "Median patient relationship from early CKD to transplant" },
    videoBrand: "Narayana Health",
    videos: [
      { stage: "awareness",      stageLabel: "Symptom Awareness",   youtubeId: "sZJtWVlgvj4", title: "Prevention of Kidney Disease",                      hospital: "Narayana Health" },
      { stage: "trust",          stageLabel: "Trust Building",      youtubeId: "o3RnyITksKQ", title: "Mrs. Sunita's Kidney Transplant Success Story",     hospital: "Narayana Health" },
      { stage: "decision",       stageLabel: "Decision",            youtubeId: "inmzpmQDMtM", title: "Patient Success Story — Kidney Transplant with Dr. Krishna Kishore", hospital: "Narayana Health" },
      { stage: "post-treatment", stageLabel: "Post-treatment Care", youtubeId: "IqF7GFdIUtw", title: "Chronic Kidney Disease Journey: Caregiver's Story", hospital: "Narayana Health" },
    ],
  },
  {
    slug: "pulmonology",
    name: "Pulmonology & Sleep Medicine",
    short: "Pulmonology",
    category: "Medical",
    oneLiner:
      "Asthma, COPD, ILD, sleep apnoea, allergy — pulmonology and sleep medicine for India's air-quality-affected patient cohort.",
    description:
      "Specialist content for pulmonology and sleep-medicine programmes — asthma, COPD, ILD, TB, sleep apnoea, allergy and pulmonary rehabilitation.",
    intro:
      "Indian pulmonology is shaped by air quality. Asthma, COPD and allergic airway disease are diagnosed earlier and progress faster here than in most geographies. The library is written with that context — actionable on the indoor-air, mask-use and inhaler-technique questions patients actually have.",
    paths: [
      {
        label: "Pulmonology & Sleep",
        flow: "Intent → OPD",
        note: "Asthma, COPD, ILD, TB, allergic airway disease, sleep apnoea, chronic cough, pulmonary rehabilitation. Long-term OPD relationship with periodic diagnostic procedures.",
      },
    ],
    procedures: [
      "Asthma diagnosis and biologic-eligibility workup",
      "COPD staging and pulmonary rehabilitation",
      "Interstitial lung disease (ILD) workup",
      "Tuberculosis diagnosis and DOTS-aligned care",
      "Sleep study (PSG, HSAT) and CPAP titration",
      "Bronchoscopy and EBUS",
      "Allergy testing and immunotherapy",
      "Lung-cancer screening pathways",
    ],
    topConsults: [
      "is it asthma or allergy",
      "COPD inhaler technique",
      "sleep apnoea CPAP cost India",
      "best pulmonologist Bangalore",
      "chronic cough 3 months causes",
      "lung function test how to prepare",
    ],
    faq: [
      {
        q: "Inhaler technique is one of the most-corrected things in any consult. Does video help?",
        a: "Demonstrably. A pulmonologist on screen demonstrating MDI, DPI and spacer technique — in the patient's first language — improves adherence and reduces exacerbation visits. We track inhaler-technique-video views against ER readmission rates on programmes that share the data, and the correlation is strong.",
      },
      {
        q: "Sleep medicine is undermarketed in India. Why?",
        a: "Because the diagnostic pathway is awkward — patients with snoring assume it is harmless, and the home-sleep-test category is fragmented. The library that names symptoms (daytime sleepiness, morning headache, witnessed apnoea), the workup, and the CPAP versus surgical decision earns inbound enquiries most clinics never see.",
      },
      {
        q: "ILD is rare but devastating. Do you produce content for it?",
        a: "Yes — and it is one of the highest-conversion categories on a pulmonology library. ILD patients research extensively, often after a delayed diagnosis elsewhere. Honest content about the workup, the antifibrotic options, and the lung-transplant pathway earns second-opinion referrals.",
      },
      {
        q: "Air-quality and AQI content — is that pulmonology marketing or environmental advocacy?",
        a: "Both, and we treat it as both. We script seasonal AQI content that names indoor-air interventions, mask-grade differences, and when AQI changes the consult calculus. We refuse to produce content that endorses specific air-purifier brands.",
      },
    ],
    proof: { metric: "31%", label: "Reduction in inhaler-misuse on libraries with technique videos" },
    videoBrand: "Manipal Hospitals",
    videos: [
      { stage: "awareness",      stageLabel: "Symptom Awareness",   youtubeId: "_fRd7aoMO1Q", title: "What is Asthma and What Causes It?",                hospital: "Manipal Hospitals" },
      { stage: "trust",          stageLabel: "Trust Building",      youtubeId: "iUzYAMZJj_E", title: "Department of Pulmonology — Best Pulmonologist",    hospital: "Manipal Hospitals" },
      { stage: "decision",       stageLabel: "Decision",            youtubeId: "eZncKQ68t2I", title: "What is Asthma and How is it Treated?",              hospital: "Manipal Hospitals" },
      { stage: "post-treatment", stageLabel: "Post-treatment Care", youtubeId: "5UyBg9Es_K0", title: "Know Your Doctor — Pulmonology",                    hospital: "Manipal Hospitals" },
    ],
  },

  // ============================================================
  // DIAGNOSTIC
  // ============================================================
  {
    slug: "preventive-health",
    name: "Preventive Health & Master Health Check",
    short: "Preventive health",
    category: "Diagnostic",
    oneLiner:
      "Master health checks, executive screening, age-appropriate prevention — written for the patient who is not yet a patient.",
    description:
      "Specialist content for preventive-health programmes — master health checks, executive screening, age-and-gender-stratified preventive packages and corporate wellness.",
    intro:
      "Preventive health is the only specialty where the patient is not yet sick. That changes everything about the editorial line. The library is calmer, less alarmist, and deeply honest about which screenings actually move outcomes and which are commercial padding. Patients are smart about value here — and the library that respects their intelligence converts.",
    paths: [
      {
        label: "Master Health Check",
        flow: "Intent → Day-package",
        note: "Annual health checks, executive screening, age-and-gender-stratified preventive packages, post-package consult. Single-day OPD-equivalent pathway.",
      },
    ],
    procedures: [
      "Master health check (basic, comprehensive, executive)",
      "Cardiac risk profiling (lipid, ECG, TMT, CT calcium score)",
      "Cancer screening — colonoscopy, mammography, Pap, low-dose CT",
      "Bone-health and osteoporosis screening (DEXA)",
      "Liver and kidney function screening",
      "Hormonal and thyroid screening",
      "Lifestyle and nutrition consult",
      "Corporate and family-package customisation",
    ],
    topConsults: [
      "best health checkup package Bangalore",
      "is executive health checkup worth it",
      "what tests in master health check",
      "full body checkup price comparison",
      "cancer screening tests for women age 40",
      "annual health checkup how often",
    ],
    faq: [
      {
        q: "Most master health checks include tests that do not move outcomes. Where do you sit?",
        a: "Honestly on the side of guideline-aligned screening. Tumour-marker panels, full-body MRI screens and many vitamin panels are not evidence-based for asymptomatic adults. We script package explainers that name the high-yield components and the low-yield ones — and we refuse to ship content that markets non-evidence-based screening as 'comprehensive'.",
      },
      {
        q: "Patients comparing packages across hospitals — how does the library win?",
        a: "By honesty about what is in each tier and why. A library that says 'this tier is for healthy 30-year-olds; this one is for 50+ with family history; this one is for executives who fly often' converts better than the 'most comprehensive' framing every competitor uses.",
      },
      {
        q: "Corporate wellness is mostly volume — does the library matter?",
        a: "Yes, on the post-package side. The screening day is sold to HR; the post-package consult is what earns the patient as a long-term family. Library content for the post-screening consult — what an abnormal lipid profile means, when to escalate, how to read a TMT — converts corporate volume into individual loyalty.",
      },
      {
        q: "Cancer screening — how do you script age-stratified content?",
        a: "By guideline. We script women-40+ mammography, women-21+ Pap, men-50+ colonoscopy, smokers-50+ low-dose CT — naming the indication and the limits. The patient who watches the video and books the right test for their age earns more long-term value than the upsell to a panel they do not need.",
      },
    ],
    proof: { metric: "3-tier", label: "Standard age-stratified package architecture we script for" },
  },
  {
    slug: "emergency-critical-care",
    name: "Emergency & Critical Care",
    short: "Emergency & critical care",
    category: "Diagnostic",
    oneLiner:
      "ER, ICU, trauma, time-critical pathways — content for the moment a family decides which hospital the ambulance drives to.",
    description:
      "Specialist content for emergency and critical-care programmes — ER, ICU, trauma, stroke, MI, sepsis and time-critical clinical pathways.",
    intro:
      "Emergency and critical care is bought before it is needed. A family that has watched a stroke or MI awareness video in the previous year arrives at the right hospital faster — and the right hospital is usually the difference between recovery and not. The library is a low-frequency, high-stakes asset, and it is written that way.",
    paths: [
      {
        label: "Emergency & Critical Care",
        flow: "Intent → ER → IPD",
        note: "Stroke, MI, trauma, sepsis, paediatric and obstetric emergencies, ICU admissions. Time-critical ER-to-IPD pathway with pre-arrival decision-making.",
      },
    ],
    procedures: [
      "Stroke-window care and thrombectomy capability",
      "Acute MI and primary PCI",
      "Trauma — polytrauma, head injury, fracture stabilisation",
      "Sepsis early-recognition and protocol-driven care",
      "Paediatric emergency",
      "Obstetric emergency (PPH, eclampsia)",
      "Critical-care medicine and ICU",
      "Inter-facility transfer and air-ambulance coordination",
    ],
    topConsults: [
      "stroke symptoms FAST sign",
      "chest pain when to call ambulance",
      "best emergency hospital near me",
      "is this a heart attack",
      "head injury child when to worry",
      "trauma centre level 1 India",
    ],
    faq: [
      {
        q: "ER content is bought before it is needed. How do you script for that?",
        a: "Awareness-first. We script symptom-recognition videos — stroke FAST, MI red flags, sepsis early signs — that families watch in the months before an emergency. The library is not measured on direct conversion; it is measured on stroke-window arrivals and door-to-needle times at the hospitals running the awareness library.",
      },
      {
        q: "Do you film inside the ICU?",
        a: "No. ICU patients cannot consent at the moment of filming, and consent obtained from family during a critical admission is not consent we trust. We film the intensivist, the protocols, the equipment and recovered patients post-discharge. Never inside the unit.",
      },
      {
        q: "Trauma content — how do you avoid sensationalism?",
        a: "By centring the protocol, not the injury. Polytrauma, head-injury, paediatric-trauma videos describe the standard of care, the team composition and the stabilisation pathway — never the worst-case imagery. Trauma marketing that uses graphic content is unethical and ineffective.",
      },
      {
        q: "What metric does the library actually move?",
        a: "Stroke-window arrivals per month, door-to-needle and door-to-balloon times, sepsis-to-antibiotic intervals on outside-OPD-arrival patients, and inter-facility-transfer volume from referring hospitals. The library is a public-health asset measured on outcomes.",
      },
    ],
    proof: { metric: "12-month", label: "Awareness-to-arrival lag the library is calibrated for" },
  },

  // ============================================================
  // ALLIED
  // ============================================================
  {
    slug: "rehabilitation",
    name: "Rehabilitation & Physical Medicine",
    short: "Rehabilitation",
    category: "Allied",
    oneLiner:
      "Stroke rehab, post-op physiotherapy, sports recovery, pain — adjacent content for the post-discharge half of every other specialty.",
    description:
      "Specialist content for rehabilitation and PMR programmes — stroke rehabilitation, post-surgical recovery, sports rehab, chronic pain and paediatric rehab.",
    intro:
      "Rehabilitation is the post-discharge specialty — the half of recovery the surgical and stroke libraries hand off to. Most hospitals undermarket it. The library that earns its keep ties directly into the orthopaedic, neurosciences and cardiac programmes upstream, capturing the patient at the moment of discharge instead of letting them drift to a freelance physiotherapist.",
    paths: [
      {
        label: "Rehabilitation & PMR",
        flow: "Intent → OPD → Programme",
        note: "Stroke rehabilitation, post-surgical physiotherapy, sports rehab and return-to-play, chronic pain, paediatric rehabilitation, geriatric rehab. OPD-led structured programme pathway.",
      },
    ],
    procedures: [
      "Stroke and neuro-rehabilitation",
      "Post-surgical orthopaedic physiotherapy",
      "Cardiac rehabilitation programme",
      "Pulmonary rehabilitation",
      "Sports rehabilitation and return-to-play",
      "Chronic-pain interventional management",
      "Paediatric and developmental rehabilitation",
      "Geriatric rehab and falls prevention",
    ],
    topConsults: [
      "physiotherapy at home cost Bangalore",
      "stroke rehabilitation timeline",
      "ACL post-surgery exercises",
      "best rehab centre after stroke India",
      "chronic back pain non-surgical",
      "child physiotherapy cerebral palsy",
    ],
    faq: [
      {
        q: "Rehab is mostly outpatient — does video drive admission?",
        a: "Not directly, no. Rehab is an adjacent library that captures the post-discharge half of orthopaedic, neuro and cardiac journeys. The metric is programme enrolment within thirty days of discharge from upstream specialty admissions — typically a 25-40% uplift on libraries that integrate properly.",
      },
      {
        q: "Most physiotherapy content is exercise demonstrations on Instagram. How do you differentiate?",
        a: "By naming the protocol, not just the exercise. A 'three exercises for ACL' reel is a creator product. A 'week-by-week ACL rehab protocol from your operating surgeon' is a hospital product — and patients who have just had surgery want the second.",
      },
      {
        q: "Sports rehab versus medical rehab — same library?",
        a: "Same library, two tracks. Sports patients are younger, return-to-play-driven, and consume on Instagram. Medical-rehab patients are older, programme-enrolment-driven, and consume on YouTube. Editorial line and platform are different; the consultant pool overlaps.",
      },
      {
        q: "What integrates rehab into the rest of the hospital?",
        a: "The discharge summary and the post-op WhatsApp flow. Rehab content shipped at discharge — and shipped again on day-7 and day-30 post-discharge — converts at multiples of the cold-acquisition rate. The library is built for that lifecycle insertion.",
      },
    ],
    proof: { metric: "30-day", label: "Post-discharge programme-enrolment window the library targets" },
    videoBrand: "Sparsh Hospital",
    videos: [
      { stage: "awareness",      stageLabel: "Symptom Awareness",   youtubeId: "mlfsdoFQgPs", title: "Back Pain Clinic — Dr. Naveen S Tahasildar",         hospital: "Sparsh Hospital" },
      { stage: "trust",          stageLabel: "Trust Building",      youtubeId: "eUk6e4sM9Qk", title: "SPARSH Hospital Yelahanka — Best in North Bengaluru", hospital: "Sparsh Hospital" },
      { stage: "decision",       stageLabel: "Decision",            youtubeId: "XPiRkhhfHIQ", title: "Advance Technology for Brain & Spine Surgery",        hospital: "Sparsh Hospital" },
      { stage: "post-treatment", stageLabel: "Post-treatment Care", youtubeId: "gUIixcNEnIk", title: "Patient Testimonial — SPARSH Hospital Yeshwanthpur",  hospital: "Sparsh Hospital" },
    ],
  },
] as const;

export const specialtiesIndex = Object.fromEntries(
  specialties.map((s) => [s.slug, s])
) as Readonly<Record<string, Specialty>>;

export const specialtyCategories: readonly {
  key: Specialty["category"];
  label: string;
  blurb: string;
}[] = [
  {
    key: "Surgical",
    label: "Surgical",
    blurb:
      "Decision-heavy, admission-bound specialties where the patient researches for weeks before saying yes. The library covers both the consult and the OT.",
  },
  {
    key: "Women & Child",
    label: "Women & Child",
    blurb:
      "The longest-running clinical relationships in medicine — antenatal, fertility, paediatric. Calm, language-aware, and parent-watched where it matters.",
  },
  {
    key: "Medical",
    label: "Medical",
    blurb:
      "Long-term outpatient relationships — diabetes, derm, GI, nephrology, pulmonology. Libraries written for adherence and twelve-month retention, not one-time conversion.",
  },
  {
    key: "Diagnostic",
    label: "Diagnostic",
    blurb:
      "Preventive health and emergency care — bought before they are needed. Libraries that earn trust ahead of the moment of decision.",
  },
  {
    key: "Allied",
    label: "Allied",
    blurb:
      "Rehabilitation and post-discharge programmes that capture the second half of recovery for the surgical and stroke libraries upstream.",
  },
] as const;
