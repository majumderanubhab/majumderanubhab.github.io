/*
 * ============================================================
 *  SITE CONTENT: edit this file to update the website.
 * ============================================================
 *  Everything after "window.SITE =" must be valid JSON:
 *    - use double quotes "..."
 *    - no trailing commas after the last item in a list
 *  Check it with:  python3 scripts/build_bib.py
 *  (that script also regenerates references.bib)
 *
 *  Publication "type": "journal" | "conference" | "thesis"
 *  Every publication needs a unique "id" (e.g. "jmd2025-codesymm").
 *  Optional publication fields: "url", "doi", "award", "details"
 *  If no url/doi is given, the title links to a Google Scholar search.
 *
 *  Research projects link papers by listing their ids in "publications".
 *  "figures": first one is shown large; add "credit" for figures
 *  taken from a published paper (author, year, venue, licence).
 *  "highlights" may contain simple HTML such as <strong>.
 *  "color" is the project's colour, used across the whole site.
 *  "short" is the compact name used on cards, the heatmap and tags.
 *  "since" (YYYY or YYYY-MM) orders the thrusts by start in the heatmap.
 * ============================================================
 */
window.SITE = {
  "profile": {
    "name": "Anubhab Majumder",
    "honorific": "PhD",
    "position": "Industrial Postdoctoral Researcher",
    "affiliations": [
      "Grundfos Holding A/S",
      "Aarhus University, Dept. of Mechanical and Production Engineering"
    ],
    "tagline": "I develop methods and AI-supported tools that help engineering designers and product developers represent, generate and evaluate concepts, working towards design intelligence that combines human creativity with artificial intelligence.",
    "facts": [
      { "label": "Now", "text": "Industrial Postdoc, Grundfos and Aarhus University" },
      { "label": "Also", "text": "Visiting postdoctoral researcher, DTU" },
      { "label": "Works on", "text": "Conceptual design, function modelling, AI in design" },
      { "label": "Before", "text": "TU Darmstadt; PhD, Indian Institute of Science" }
    ],
    "heroPhoto": "images/anubhab_large.jpg",
    "location": "Bjerringbro, Denmark",
    "emails": [
      "anubhabm@mpe.au.dk",
      "majumderanubhab@gmail.com"
    ],
    "address": [
      "Grundfos Holding A/S",
      "Grundfos Øst 2, Poul Due Jensens Vej 17",
      "8850 Bjerringbro, Denmark"
    ],
    "photo": "images/profile.jpg",
    "links": {
      "scholar": "https://scholar.google.com/citations?user=QJHp9z8AAAAJ&hl=en",
      "orcid": "https://orcid.org/0000-0002-8447-0629",
      "linkedin": "https://www.linkedin.com/in/anubhab-majumder-88949066/",
      "researchgate": "https://www.researchgate.net/profile/Anubhab-Majumder",
      "pure": "https://pure.au.dk/portal/en/persons/anubhabm@mpe.au.dk/"
    },
    "bio": [
      "I am an industrial postdoctoral researcher at Grundfos in Bjerringbro, Denmark, jointly affiliated with Aarhus University and a visiting postdoctoral researcher at DTU. I work on the MUSTANG 5.0 project, which supports a human-centric and sustainable Industry 5.0 transition in manufacturing. Before this, I was a postdoctoral researcher at TU Darmstadt, Germany, and a Research Associate in the Department of Design and Manufacturing at the Indian Institute of Science (IISc), Bangalore.",
      "I received my PhD in Product Design and Engineering from the IDeaS Lab at IISc, where my thesis won the institute gold medal (MAA Communications Medal) for the best PhD thesis in the department. I also hold an M.Tech. in Mechanical Engineering (Machine Design, Gold Medalist) from IIT (ISM) Dhanbad and a B.Tech. in Mechanical Engineering from the Government College of Engineering & Textile Technology, Berhampore.",
      "I am a member of the Design Society and the Academy of Design Sciences Foundation India (DeScIn), and I serve on programme committees, scientific advisory boards and organising committees of flagship international conferences organised or endorsed by these societies. I also review for leading journals and conferences in engineering design."
    ],
    "interests": [
      "Conceptual design",
      "Design theory & methodology",
      "Function modelling",
      "Multi-state mechanical devices",
      "Design by analogy",
      "AI in design",
      "Requirements engineering",
      "Model-based systems engineering",
      "Creativity",
      "Design for Industry 5.0",
      "Systems thinking",
      "Business model innovation",
      "Kinematics & robotics"
    ]
  },
  "news": [
    {
      "date": "2026",
      "text": "Papers on a human-centric PFMEA ontology for social sustainability in manufacturing accepted at <strong>GCSM'26</strong> (Colombo, Sri Lanka) and <strong>ICoRD'27</strong> (IISc Bengaluru)."
    },
    {
      "date": "2026",
      "text": "Received the <strong>MAA Communications Medal</strong>, IISc's gold medal for the best PhD thesis in the Department of Design and Manufacturing (2024–25)."
    },
    {
      "date": "2026",
      "text": "Joined the International Programme Committee of <strong>ICoRD'27</strong> and the Scientific Advisory Board of <strong>DESIGN 2026</strong>."
    },
    {
      "date": "Jun 2026",
      "text": "Attended <em>PAD 2026</em>, the 7th International Summer School on Product Architecture Design, at DTU, Copenhagen."
    },
    {
      "date": "Mar 2026",
      "text": "Invited talk, \"Supporting Knowledge Capture to Enable Design for Multiple Lifecycles\", at the Teknologisk Videndeling seminar on re-manufacturing, Grundfos, Bjerringbro."
    },
    {
      "date": "2026",
      "text": "Paper on generative AI in design education published at <em>E&amp;PDE 2026</em>, University of Bristol."
    },
    {
      "date": "2026",
      "text": "Three papers published in the <em>Proceedings of the Design Society</em>, on AI-supported requirements engineering, resilience in cyber-physical systems, and LLM-based DSM extraction."
    },
    {
      "date": "2026",
      "text": "Paper on assessing the variety of a concept space with Rao's quadratic index published in <em>AI EDAM</em>."
    },
    {
      "date": "Dec 2025",
      "text": "Joined <strong>Grundfos</strong> and <strong>Aarhus University</strong> as an Industrial Postdoc, and <strong>DTU</strong> as a visiting postdoctoral researcher."
    },
    {
      "date": "Aug 2025",
      "text": "Started as a postdoctoral researcher at <strong>TU Darmstadt</strong> with a Future Talent Short-term Scholarship."
    },
    {
      "date": "Jun 2025",
      "text": "Invited talks on \"AI-supported design synthesis\" at TU Clausthal and on \"Capturing Causal Relationships in Complex Systems\" at the DFG Priority Programme SPP 2305, TU Darmstadt."
    },
    {
      "date": "May 2025",
      "text": "Visiting postdoc at TU Darmstadt, hosted by Prof. Eckhard Kirchner, through Ingenium's Future Talent Guest Stay programme."
    },
    {
      "date": "Feb 2025",
      "text": "Invited webinar on my PhD work in the <em>Sharing to Gain</em> series, Systems Realization Laboratory, University of Oklahoma."
    },
    {
      "date": "Jan 2025",
      "text": "<strong>Distinguished Paper Award</strong> at ICoRD'25, IIT Hyderabad, where I also co-ran a workshop on causal reasoning with SAPPhIRE and GenAI."
    },
    {
      "date": "2025",
      "text": "CODE SYMM paper published in the <em>Journal of Mechanical Design</em>."
    },
    {
      "date": "Nov 2024",
      "text": "Defended my PhD at the Indian Institute of Science (thesis submitted in July 2024)."
    }
  ],
  "research": [
    {
      "id": "industry5",
      "color": "#BE185D",
      "title": "Human-centric Design and Manufacturing for Industry 5.0",
      "short": "Human-centric Design for Industry 5.0",
      "since": "2025-12",
      "period": "2025 – present",
      "context": "MUSTANG 5.0, Grundfos, Aarhus University and DTU, with B. Veluri, R. Mansour and D. Ramanujan",
      "summary": "Industry 5.0 asks manufacturing to be human-centric, sustainable and resilient, not only efficient. In the MUSTANG 5.0 project, jointly funded by Grundfos and Innovation Fund Denmark, I support the Industry 5.0 transition of the inserted-stator platform manufacturing process at Grundfos through human-centric manufacturing digitalisation and sustainability.",
      "highlights": [
        "A human-centric PFMEA ontology that brings social-sustainability considerations into process failure mode and effects analysis in manufacturing",
        "Knowledge capture to enable design for multiple lifecycles and re-manufacturing"
      ],
      "figures": [],
      "publications": [
        "icord2027-pfmea",
        "gcsm2026-pfmea"
      ]
    },
    {
      "id": "msmd",
      "color": "#0E7490",
      "title": "Conceptual Design of Multi-state Mechanical Devices",
      "short": "Multi-state Mechanical Devices",
      "since": "2018-08",
      "period": "2018 – 2025",
      "context": "PhD research, IDeaS Lab, Indian Institute of Science",
      "summary": "A multi-state mechanical device (MSMD) performs different functions in different operating states by changing its topology and the interactions among its elements. Most computational support for conceptual design deals with single-state problems. My doctoral work set out to support designers through every step of representing, synthesising and analysing MSMD concepts.",
      "highlights": [
        "Empirical studies of how designers synthesise MSMD concepts, which informed a descriptive model of the synthesis process",
        "A scheme for representing MSMD design tasks and a causal representation for capturing topological changes between states",
        "SAPPhIRE-based function modelling that explains state transitions and the functions achieved within each state",
        "<strong>CODE SYMM</strong>, a web-based tool implementing a prescriptive synthesis model. It retrieves kinematic building blocks and modification rules, and was evaluated in design experiments with external designers"
      ],
      "figures": [
        {
          "src": "images/Research/papers/codesymm_ui.jpg",
          "caption": "The CODE SYMM tool: (a) searching initial solutions, (b) suggested modifications.",
          "credit": "Majumder & Chakrabarti (2023), Proc. Design Society, CC BY-NC-ND 4.0"
        },
        {
          "src": "images/Research/function_model.jpg",
          "caption": "SAPPhIRE-based function model of a multi-state system."
        },
        {
          "src": "images/Research/design_task.jpg",
          "caption": "MSMD design task used in the empirical studies."
        }
      ],
      "publications": [
        "jmd2025-codesymm",
        "phd2024-thesis",
        "iftomm2024-causal",
        "red2023-empirical",
        "iced2023-tool",
        "icord2023-function",
        "dsj2022-tool"
      ]
    },
    {
      "id": "llm",
      "color": "#6E56CF",
      "title": "Large Language Models for Engineering Design Knowledge",
      "short": "LLMs for Design Knowledge",
      "since": "2022",
      "period": "2022 – present",
      "context": "With K. Bhattacharya and A. Chakrabarti (IISc)",
      "summary": "Causal models such as SAPPhIRE support design-by-analogy, and design structure matrices (DSMs) help analyse system complexity. Building either from technical documents takes experts a lot of time. This work investigates how to extract such structured design knowledge from natural-language documents reliably, first through a systematic manual method and then by using large language models with retrieval-augmented generation (RAG).",
      "highlights": [
        "A method and rule set for extracting SAPPhIRE constructs from natural-language descriptions of technical systems, refined iteratively through user trials with specialists and novices",
        "RAG-based hallucination suppression, showing that the choice of reference knowledge strongly affects the quality of generated technical content",
        "A RAG tool that generates SAPPhIRE models of artificial systems, evaluated for factual accuracy and reliability",
        "An automated DSM-extraction framework with an explicit reasoning step, benchmarked across GPT-4o-mini, GPT-3.5 and GPT-4o on six metrics and cost",
        "<strong>IDEA-INSPIRE (web version)</strong>, a design-by-analogy tool that uses RAG and LLMs to turn unstructured content, such as a Wikipedia article, into structured SAPPhIRE-based analogues"
      ],
      "figures": [
        {
          "src": "images/Research/papers/dsm_workflow.jpg",
          "caption": "Workflow of the LLM-RAG application for automated DSM extraction.",
          "credit": "Majumder et al. (2026), Proc. Design Society, CC BY-NC-ND 4.0"
        },
        {
          "src": "images/Research/RAG.jpg",
          "caption": "RAG tool for creating SAPPhIRE models of artificial systems."
        }
      ],
      "publications": [
        "pds2026-dsm",
        "icord2025-rag",
        "icord2025-reference",
        "aiedam2024-sapphire-nl"
      ]
    },
    {
      "id": "mbse",
      "color": "#2563EB",
      "title": "Model-based Systems Engineering and AI-supported Requirements Engineering",
      "short": "AI-supported Requirements Engineering",
      "since": "2025-05",
      "period": "2025 – present",
      "context": "TU Darmstadt, with F. Rahn and E. Kirchner",
      "summary": "High-quality requirements are essential for successful product development. This work connects model-based systems engineering (MBSE) with AI so that requirements can be structured, verified and validated against evidence early in development.",
      "highlights": [
        "A model-based requirements engineering framework that links design characteristics and measured properties through an OPM-based system model (characteristics–properties modelling)",
        "An AI-supported tool for systematic verification and validation of requirements, demonstrated end to end on a hydraulic-press case study"
      ],
      "figures": [
        {
          "src": "images/Research/papers/cpm_framework.jpg",
          "caption": "Proposed CPM framework and AI-supported requirements engineering tool.",
          "credit": "Rahn, Majumder & Kirchner (2026), Proc. Design Society, CC BY-NC-ND 4.0"
        }
      ],
      "publications": [
        "pds2026-re"
      ]
    },
    {
      "id": "resilience",
      "color": "#B91C1C",
      "title": "Resilience of Autonomous Cyber-Physical Systems",
      "short": "Resilient Cyber-Physical Systems",
      "since": "2025-08",
      "period": "2025 – present",
      "context": "TU Darmstadt, with P. Kortenbusch, H. Firoud and E. Kirchner",
      "summary": "Autonomous cyber-physical systems (CPS) must stay resilient when disruptions occur, yet resilience is defined inconsistently in the literature. This work clarifies what resilience means for autonomous CPS and studies how design measures such as redundant sensing support it.",
      "highlights": [
        "A standard-based definition of resilience comprising 11 properties, used to analyse the literature on autonomous CPS. Measures acting during a disruption dominate, while anticipating and learning measures are scarce",
        "A causal-mapping approach to redundant sensing and actuation for robustness, resilience and safety, developed in a co-supervised Bachelor's thesis"
      ],
      "figures": [
        {
          "src": "images/Research/papers/resilience_properties.jpg",
          "caption": "Resilience properties classified by their time of impact.",
          "credit": "Kortenbusch et al. (2026), Proc. Design Society, CC BY-NC-ND 4.0"
        }
      ],
      "publications": [
        "pds2026-resilience"
      ]
    },
    {
      "id": "theory",
      "color": "#B45309",
      "title": "Design Theory: Reasoning, Causality and Creativity",
      "short": "Design Theory",
      "since": "2020",
      "period": "2020 – 2026",
      "context": "With A. N. Bhatt, U. Pal and A. Chakrabarti",
      "summary": "Theoretical models of designing help explain how designers reason and how creative their output is. This work uses the SAPPhIRE model of causality to explain reasoning in design synthesis. It also proposes a better way to measure the variety of a concept space, one of the main indicators of divergent thinking.",
      "highlights": [
        "An analysis of explanatory abduction, innovative abduction, deduction and induction during design synthesis using SAPPhIRE and the Extended Integrated Model of Designing, based on designers' verbal protocols and outcomes",
        "A critical review of existing variety metrics and a new distance-based metric built on an unbiased estimate of Rao's quadratic index, which works with any representation of a concept's abstraction levels",
        "<strong>VariAnT</strong>, a software tool that implements the variety-assessment framework"
      ],
      "figures": [
        {
          "src": "images/Research/papers/variant_ui.jpg",
          "caption": "VariAnT user interface for assessing the variety of a concept space.",
          "credit": "Majumder, Pal & Chakrabarti (2026), AI EDAM, CC BY 4.0"
        },
        {
          "src": "images/Research/papers/sapphire_model.jpg",
          "caption": "The SAPPhIRE model of causality, with an example of heat transfer.",
          "credit": "Bhattacharya et al. (2024), AI EDAM, CC BY 4.0"
        },
        {
          "src": "images/Research/reasoning.png",
          "caption": "Modes of reasoning captured during design synthesis."
        }
      ],
      "publications": [
        "aiedam2026-variety",
        "aiedam2021-reasoning"
      ]
    },
    {
      "id": "pisces",
      "color": "#15803D",
      "title": "Design-led Innovation for Sustainability: the PISCES Living Lab",
      "short": "Design-led Innovation for Sustainability",
      "since": "2024-02",
      "period": "2024 – 2025",
      "context": "PISCES Partnership (Work Package 6), with Brunel University London, ITS, ITB and Udayana University",
      "summary": "The PISCES Living Lab tackles plastic pollution in Indonesia. To help it move from a project-based initiative to a self-sustaining service enterprise, I adapted the engineering design process into a workshop template that guides interdisciplinary stakeholders through business-model innovation.",
      "highlights": [
        "A modified engineering design process used as a template for business-model workshops for service-oriented living labs",
        "Three stakeholder workshops in Banyuwangi, Indonesia, which produced a Business Model Canvas for the PISCES Living Lab"
      ],
      "figures": [
        {
          "src": "images/Workshops/pisces2.jpeg",
          "caption": "PISCES entrepreneurship workshop, PISCES Living Lab, Banyuwangi."
        },
        {
          "src": "images/Workshops/pisces3.jpeg",
          "caption": "3rd PISCES entrepreneurship workshop, Banyuwangi."
        },
        {
          "src": "images/Workshops/pisces1.jpg",
          "caption": "1st PISCES entrepreneurship workshop, Banyuwangi."
        }
      ],
      "publications": [
        "pds2025-pisces"
      ]
    },
    {
      "id": "hcd",
      "color": "#C2410C",
      "title": "Learning, Perception and Generative AI in Design",
      "short": "Learning, Perception & GenAI",
      "since": "2025",
      "period": "2025 – present",
      "context": "Collaboration with Y. Kahlon, S. Law and colleagues",
      "summary": "A set of PRISMA-style systematic reviews that map emerging, fragmented fields at the intersection of design, education and human perception. Each review identifies benefits, limitations and under-explored areas to guide future research.",
      "highlights": [
        "Gaze sharing in education: how sharing eye-tracking information between learners and instructors supports pedagogy",
        "Generative AI in design education: a review of the E&PDE 2024 proceedings (N = 118), classified by scenario, discipline, tool and task",
        "Visual impression of urban space: a review of 46 empirical studies linking visual features of urban environments to users' experiences"
      ],
      "figures": [],
      "publications": [
        "cexr2026-gaze",
        "urbsci2026-visual",
        "epde2026-genai"
      ]
    },
    {
      "id": "robotics",
      "color": "#64748B",
      "title": "Bio-inspired Modular Robots",
      "short": "Bio-inspired Modular Robots",
      "since": "2017",
      "period": "2017 – 2020",
      "context": "M.Tech. research, IIT (ISM) Dhanbad, with P. Chattopadhyay and S. K. Ghoshal",
      "summary": "Limbless and inchworm-like animals move through confined and vertical spaces where wheels fail. This work took inspiration from them to design modular robots for crawling and climbing, with inspection of pipelines and large structures as target applications.",
      "highlights": [
        "An inchworm-inspired climbing robot, modelled as a four-link planar mechanism with switchable electromagnets for adhesion to ferromagnetic surfaces. Dynamic modelling (ADAMS–Simulink co-simulation, Lagrangian and bond-graph models) sized the actuators, and a prototype was built and tested",
        "Modular limbless robots with 2D and 3D body undulation for crawling and climbing, using piecewise sine joint functions",
        "Artificial neural networks that predict the net displacement of a hyper-redundant robot from its joint orientation function parameters",
        "A review and classification of locomotion methods for in-pipe and out-pipe climbing robots"
      ],
      "figures": [
        {
          "src": "images/Research/papers/inchworm_cad.jpg",
          "caption": "CAD assembly of the inchworm climbing robot.",
          "credit": "Chattopadhyay et al. (2018), IOP Conf. Ser.: Mater. Sci. Eng., CC BY 4.0"
        },
        {
          "src": "images/Research/serpentine_robot.png",
          "caption": "Hyper-redundant modular robot."
        },
        {
          "src": "images/Research/climbing_robot.png",
          "caption": "Bio-inspired climbing robot prototype."
        }
      ],
      "publications": [
        "ijra2020-sine",
        "asem2020-limbless",
        "ncame2020-climbing",
        "air2019-ann",
        "jestr2018-review",
        "iop2018-climbing",
        "aip2018-adams"
      ]
    }
  ],
  "publications": [
    {
      "id": "icord2027-pfmea",
      "type": "conference",
      "year": 2027,
      "authors": "A Majumder, I Kaushal, B Veluri, R Mansour, D Ramanujan",
      "title": "A Human-Centric PFMEA Ontology Supporting Social Sustainability in Manufacturing",
      "venue": "International Conference on Research into Design (ICoRD'27)",
      "details": "accepted"
    },
    {
      "id": "gcsm2026-pfmea",
      "type": "conference",
      "year": 2026,
      "authors": "A Majumder, B Veluri, R Mansour, D Ramanujan",
      "title": "A Human-Centric PFMEA Ontology Supporting Social Sustainability in Manufacturing",
      "venue": "Global Conference on Sustainable Manufacturing (GCSM'26)",
      "details": "accepted"
    },
    {
      "id": "aiedam2026-variety",
      "type": "journal",
      "year": 2026,
      "authors": "A Majumder, U Pal, A Chakrabarti",
      "title": "Assessing the variety of a concept space using an unbiased estimate of Rao's quadratic index",
      "venue": "Artificial Intelligence for Engineering Design, Analysis and Manufacturing (AI EDAM)",
      "details": "40, e7",
      "doi": "10.1017/s0890060426100262"
    },
    {
      "id": "cexr2026-gaze",
      "type": "journal",
      "year": 2026,
      "authors": "Y Kahlon, S Law, M Kishimoto, A Majumder, M Gath-Morad, T Osaragi, et al.",
      "title": "Gaze sharing: A survey of its applications in education and future directions",
      "venue": "Computers & Education: X Reality",
      "details": "8, 100150",
      "doi": "10.1016/j.cexr.2026.100150"
    },
    {
      "id": "urbsci2026-visual",
      "type": "journal",
      "year": 2026,
      "authors": "Y Kahlon, RF Heaton, A Majumder, T Oki, T Osaragi, S Law",
      "title": "Visual Impression of Urban Space: A Systematic Review of Empirical Findings, Challenges, and Opportunities",
      "venue": "Urban Science",
      "details": "10(10), 567",
      "doi": "10.3390/urbansci10100567"
    },
    {
      "id": "pds2026-re",
      "type": "conference",
      "year": 2026,
      "authors": "F Rahn, A Majumder, E Kirchner",
      "title": "Enabling AI-supported requirements engineering through model-based systems engineering and characteristics-properties modeling",
      "venue": "Proceedings of the Design Society",
      "details": "6, 2851–2860",
      "doi": "10.1017/pds.2026.10643"
    },
    {
      "id": "pds2026-resilience",
      "type": "conference",
      "year": 2026,
      "authors": "P Kortenbusch, A Majumder, H Firoud, E Kirchner",
      "title": "A study on resilience through redundant sensing in autonomous cyber-physical systems",
      "venue": "Proceedings of the Design Society",
      "details": "6, 2791–2800",
      "doi": "10.1017/pds.2026.10637"
    },
    {
      "id": "pds2026-dsm",
      "type": "conference",
      "year": 2026,
      "authors": "A Majumder, S Parasuram, K Bhattacharya, A Chakrabarti",
      "title": "Evaluating large language models for automated design structure matrix extraction from unstructured documents: an empirical study",
      "venue": "Proceedings of the Design Society",
      "details": "6, 2433–2442",
      "doi": "10.1017/pds.2026.10601"
    },
    {
      "id": "epde2026-genai",
      "type": "conference",
      "year": 2026,
      "authors": "Y Kahlon, A Majumder, S Law",
      "title": "Applying Generative AI in Design Education: An Overview of Current Work and Future Research Directions",
      "venue": "International Conference on Engineering and Product Design Education (E&PDE), DS 146",
      "details": "",
      "doi": "10.35199/epde.2026.49"
    },
    {
      "id": "jmd2025-codesymm",
      "type": "journal",
      "year": 2025,
      "authors": "A Majumder, A Chakrabarti",
      "title": "Development and Evaluation of CODE SYMM: A Tool to Facilitate Conceptual Design Synthesis of Multistate Mechanical Devices",
      "venue": "Journal of Mechanical Design",
      "details": "147(2), 021403",
      "doi": "10.1115/1.4066442"
    },
    {
      "id": "icord2025-rag",
      "type": "conference",
      "year": 2025,
      "authors": "A Majumder, K Bhattacharya, A Chakrabarti",
      "title": "Development and evaluation of a retrieval-augmented generation tool for creating SAPPhIRE models of artificial systems",
      "venue": "International Conference on Research into Design (ICoRD'25)",
      "details": "489–504",
      "doi": "10.1007/978-981-96-5511-3_38"
    },
    {
      "id": "icord2025-reference",
      "type": "conference",
      "year": 2025,
      "authors": "K Bhattacharya, A Majumder, A Chakrabarti",
      "title": "A study on effect of reference knowledge choice in generating technical content relevant to SAPPhIRE model using large language model",
      "venue": "International Conference on Research into Design (ICoRD'25)",
      "details": "505–519",
      "doi": "10.1007/978-981-96-5511-3_39",
      "award": "Distinguished Paper Award"
    },
    {
      "id": "pds2025-pisces",
      "type": "conference",
      "year": 2025,
      "authors": "A Majumder, TR Fahrisa, S Gerassimidou, G Yudoko, S Jobling, et al.",
      "title": "Adapting the engineering design process to develop a business model for service-oriented living labs: a case study of PISCES",
      "venue": "Proceedings of the Design Society (ICED25)",
      "details": "5, 329–338",
      "doi": "10.1017/pds.2025.10047"
    },
    {
      "id": "aiedam2024-sapphire-nl",
      "type": "journal",
      "year": 2024,
      "authors": "K Bhattacharya, A Majumder, AN Bhatt, S Keshwani, S Venkataraman, et al.",
      "title": "Developing a method for creating structured representations of working of systems from natural language descriptions using the SAPPhIRE model of causality",
      "venue": "Artificial Intelligence for Engineering Design, Analysis and Manufacturing (AI EDAM)",
      "details": "38, e24",
      "doi": "10.1017/s0890060424000118"
    },
    {
      "id": "iftomm2024-causal",
      "type": "conference",
      "year": 2024,
      "authors": "A Majumder, A Chakrabarti",
      "title": "A Causal Representation Scheme for Capturing Topological Changes in Multi-state Mechanical Devices",
      "venue": "Recent Advances in Industrial Machines and Mechanisms: Select Proceedings",
      "details": "",
      "doi": "10.1007/978-981-99-4270-1_1"
    },
    {
      "id": "phd2024-thesis",
      "type": "thesis",
      "year": 2024,
      "authors": "A Majumder",
      "title": "Supporting Concept Representation, Synthesis, and Analysis of Multi-state Mechanical Devices",
      "venue": "PhD thesis, Indian Institute of Science, Bangalore",
      "details": "",
      "url": "https://etd.iisc.ac.in/handle/2005/6694",
      "award": "MAA Communications Medal"
    },
    {
      "id": "red2023-empirical",
      "type": "journal",
      "year": 2023,
      "authors": "A Majumder, SR Todeti, A Chakrabarti",
      "title": "Empirical studies on conceptual design synthesis of multiple-state mechanical devices",
      "venue": "Research in Engineering Design",
      "details": "34(4), 477–495",
      "doi": "10.1007/s00163-023-00420-8"
    },
    {
      "id": "iced2023-tool",
      "type": "conference",
      "year": 2023,
      "authors": "A Majumder, A Chakrabarti",
      "title": "Development of a design support tool for synthesising multi-state mechanical device concepts",
      "venue": "Proceedings of the Design Society (ICED23)",
      "details": "3, 1455–1464",
      "doi": "10.1017/pds.2023.146",
      "award": "Reviewers' Favourite Award"
    },
    {
      "id": "icord2023-function",
      "type": "conference",
      "year": 2023,
      "authors": "A Majumder, AN Bhatt, A Chakrabarti",
      "title": "Using SAPPhIRE for functional modelling of multi-state systems",
      "venue": "International Conference on Research into Design (ICoRD'23)",
      "details": "761–773",
      "doi": "10.1007/978-981-99-0428-0_62",
      "award": "Distinguished Paper Award"
    },
    {
      "id": "dsj2022-tool",
      "type": "journal",
      "year": 2022,
      "authors": "A Majumder, A Chakrabarti",
      "title": "A tool for supporting conceptual design of multiple state mechanical devices",
      "venue": "Defence Science Journal",
      "details": "72(2), 217–226",
      "doi": "10.14429/dsj.72.17240"
    },
    {
      "id": "aiedam2021-reasoning",
      "type": "journal",
      "year": 2021,
      "authors": "AN Bhatt, A Majumder, A Chakrabarti",
      "title": "Analyzing the modes of reasoning in design using the SAPPhIRE model of causality and the Extended Integrated Model of Designing",
      "venue": "Artificial Intelligence for Engineering Design, Analysis and Manufacturing (AI EDAM)",
      "details": "35(4), 384–403",
      "doi": "10.1017/s0890060421000214"
    },
    {
      "id": "ijra2020-sine",
      "type": "journal",
      "year": 2020,
      "authors": "P Chattopadhyay, SK Ghoshal, A Majumder",
      "title": "Implementation of Piecewise Sine Functions on Limbless Robot Locomotion",
      "venue": "International Journal of Robotics and Automation",
      "details": "35(4)",
      "doi": "10.2316/j.2020.206-0159"
    },
    {
      "id": "asem2020-limbless",
      "type": "journal",
      "year": 2020,
      "authors": "M Patel, A Patra, P Chattopadhyay, A Majumder, SK Ghoshal",
      "title": "Evolution of a Modular Limbless Crawling and Climbing Robot",
      "venue": "Advanced Science, Engineering and Medicine",
      "details": "12(11), 1371–1377",
      "doi": "10.1166/asem.2020.2590"
    },
    {
      "id": "ncame2020-climbing",
      "type": "conference",
      "year": 2020,
      "authors": "A Patra, M Patel, P Chattopadhyay, A Majumder, SK Ghoshal",
      "title": "A bio-inspired climbing robot: dynamic modelling and prototype development",
      "venue": "Recent Advances in Mechanical Engineering: Select Proceedings of NCAME 2019",
      "details": "191–209",
      "doi": "10.1007/978-981-15-1071-7_17"
    },
    {
      "id": "air2019-ann",
      "type": "conference",
      "year": 2019,
      "authors": "A Majumder, A Patra, M Patel, P Chattopadhyay, SK Ghoshal",
      "title": "Locomotion Study of a Hyper-redundant Modular Robot Using Artificial Neural Networks",
      "venue": "Proceedings of the 4th International Conference on Advances in Robotics (AIR 2019)",
      "details": "",
      "doi": "10.1145/3352593.3352619"
    },
    {
      "id": "jestr2018-review",
      "type": "journal",
      "year": 2018,
      "authors": "P Chattopadhyay, S Ghoshal, A Majumder, H Dikshit",
      "title": "Locomotion Methods of Pipe Climbing Robots: A Review",
      "venue": "Journal of Engineering Science and Technology Review",
      "details": "11(4), 154–165",
      "doi": "10.25103/jestr.114.20"
    },
    {
      "id": "iop2018-climbing",
      "type": "conference",
      "year": 2018,
      "authors": "P Chattopadhyay, A Majumder, H Dikshit, SK Ghoshal, A Maity",
      "title": "A bio-inspired climbing robot: design, simulation, and experiments",
      "venue": "IOP Conference Series: Materials Science and Engineering",
      "details": "377(1), 012105",
      "doi": "10.1088/1757-899x/377/1/012105",
      "award": "Best Paper Award"
    },
    {
      "id": "aip2018-adams",
      "type": "conference",
      "year": 2018,
      "authors": "P Chattopadhyay, H Dikshit, A Majumder, S Ghoshal, A Maity",
      "title": "Dynamic analysis of a bio-inspired climbing robot using ADAMS-Simulink co-simulation",
      "venue": "AIP Conference Proceedings",
      "details": "1952(1), 020015",
      "doi": "10.1063/1.5031977"
    }
  ],
  "experience": [
    {
      "role": "Industrial Postdoctoral Researcher",
      "org": "Grundfos Holding A/S (Motors & Drives Innovation, Group AME) & Aarhus University",
      "place": "Bjerringbro / Aarhus, Denmark",
      "period": "Dec 2025 – present",
      "text": "Working on the MUSTANG 5.0 project, which supports the Industry 5.0 transition of Grundfos's inserted-stator platform manufacturing process through human-centric manufacturing digitalisation and sustainability. Mentors: Dr. Badrinath Veluri (Grundfos), Dr. Rami Mansour (AU) and Prof. Devarajan Ramanujan (DTU). Jointly funded by Grundfos and Innovation Fund Denmark."
    },
    {
      "role": "Visiting Postdoctoral Researcher",
      "org": "DTU – Technical University of Denmark",
      "place": "Lyngby, Denmark",
      "period": "Dec 2025 – present",
      "text": "Visiting postdoc alongside the Grundfos industrial postdoc, mentored by Prof. Devarajan Ramanujan."
    },
    {
      "role": "Postdoctoral Researcher",
      "org": "Technische Universität Darmstadt",
      "place": "Darmstadt, Germany",
      "period": "Aug 2025 – Nov 2025",
      "text": "Future Talent Short-term Scholarship, mentored by Prof. Eckhard Kirchner. Worked on design for resilience, AI and MBSE in requirements engineering, and resilience in autonomous cyber-physical systems. Co-supervised a Bachelor's thesis and began co-authoring the Springer book \"Tools and Methods of Product Development: from Idea to Successful Product\" with Prof. Kirchner."
    },
    {
      "role": "Research Associate II, Industry 4.0",
      "org": "Dept. of Design and Manufacturing, Indian Institute of Science",
      "place": "Bengaluru, India",
      "period": "Mar 2025 – Jul 2025",
      "text": "IISc Smart Factory startup mentoring initiative (funded by the Ministry of Heavy Industries and Tata Steel). Carried out a systematic review of Industry 4.0 challenges in Indian MSMEs, curated industry problem statements, built the Smart Factory website and supported hackathon planning."
    },
    {
      "role": "Visiting Postdoctoral Researcher",
      "org": "Technische Universität Darmstadt (pmd)",
      "place": "Darmstadt, Germany",
      "period": "May 2025 – Jun 2025",
      "text": "Hosted by Prof. Eckhard Kirchner at the Institute for Product Development and Machine Elements, supported by Ingenium's Future Talent Guest Stay programme. Researched the use of AI in requirements engineering to structure, verify and falsify product requirements."
    },
    {
      "role": "Co-instructor, Design Thinking and Methodology",
      "org": "Centre of Excellence in Design (D-CoE), Indian Institute of Science",
      "place": "Bengaluru, India",
      "period": "2025",
      "text": "With Prof. Amaresh Chakrabarti. Prepared course material on generative AI in the design thinking process and lectured D-CoE trainers on GenAI, prompt engineering for designers, and GenAI tools that support design thinking."
    },
    {
      "role": "Research Associate II",
      "org": "PISCES Partnership (Work Package 6)",
      "place": "Bengaluru, India",
      "period": "Feb 2024 – Feb 2025",
      "text": "Contributed to the design and development of the PISCES Living Lab, which combines engineering design and business model innovation to tackle plastic pollution in Indonesia. Coordinated three stakeholder workshops in Banyuwangi with Brunel University London, ITS, ITB and Udayana University."
    },
    {
      "role": "Instructor, Plant Simulation",
      "org": "PG Advanced Certification Programme in Digital Manufacturing and Smart Factories, Indian Institute of Science",
      "place": "Bengaluru, India",
      "period": "2022",
      "text": "Prepared and delivered lectures on discrete-event simulation and introduced industry professionals to Tecnomatix Plant Simulation."
    },
    {
      "role": "Doctoral Researcher",
      "org": "IDeaS Lab, Indian Institute of Science",
      "place": "Bengaluru, India",
      "period": "Aug 2018 – Jul 2024",
      "text": "Developed methods and a web-based tool (CODE SYMM) to support the representation, synthesis and analysis of multi-state mechanical device concepts."
    },
    {
      "role": "Teaching Assistant",
      "org": "Dept. of Mechanical Engineering, IIT (ISM) Dhanbad",
      "place": "Dhanbad, India",
      "period": "2017 – 2018",
      "text": "With Prof. Sanjoy K. Ghoshal: assignments, grading and course administration."
    }
  ],
  "education": [
    {
      "degree": "PhD, Product Design and Engineering",
      "org": "Indian Institute of Science (IISc), Bangalore",
      "period": "2018 – 2024",
      "text": "Thesis: Supporting Concept Representation, Synthesis, and Analysis of Multi-state Mechanical Devices. Defended 13 Nov 2024. Gold medal for the best PhD thesis (MAA Communications Medal)."
    },
    {
      "degree": "M.Tech., Mechanical Engineering (Machine Design)",
      "org": "Indian Institute of Technology (ISM), Dhanbad",
      "period": "2016 – 2018",
      "text": "Thesis: A Bio-inspired Climbing Robot: Dynamic Modelling and Prototype Development. Gold Medalist."
    },
    {
      "degree": "B.Tech., Mechanical Engineering",
      "org": "Government College of Engineering & Textile Technology, Berhampore",
      "period": "2012 – 2016",
      "text": ""
    }
  ],
  "awards": [
    {
      "year": "2026",
      "title": "MAA Communications Medal (best PhD thesis)",
      "by": "Indian Institute of Science, Bengaluru, India"
    },
    {
      "year": "2025",
      "title": "Future Talent Short-term Scholarship & Guest Stay",
      "by": "Ingenium, Technical University of Darmstadt, Germany"
    },
    {
      "year": "2025",
      "title": "Distinguished Paper Award",
      "by": "ICoRD'25, Indian Institute of Technology Hyderabad, India",
      "image": "images/Awards/ICoRD25.jpeg"
    },
    {
      "year": "2023",
      "title": "Reviewers' Favourite Award",
      "by": "ICED23, University of Bordeaux, France",
      "image": "images/Awards/iced23.jpeg"
    },
    {
      "year": "2023",
      "title": "Distinguished Paper Award",
      "by": "ICoRD'23, Indian Institute of Science, India",
      "image": "images/Awards/ICoRD23.JPG"
    },
    {
      "year": "2018",
      "title": "IIT (ISM) Gold Medal",
      "by": "Indian Institute of Technology (ISM), Dhanbad, India"
    },
    {
      "year": "2017",
      "title": "Best Paper Award",
      "by": "ICMMRE 2017, Sikkim, India",
      "image": "images/Awards/icmmre.JPG"
    },
    {
      "year": "2018–2023",
      "title": "PhD Fellowship (JRF & SRF)",
      "by": "Ministry of Education, Government of India"
    },
    {
      "year": "2016–2018",
      "title": "GATE Scholarship",
      "by": "Ministry of Education, Government of India"
    },
    {
      "year": "2012–2016",
      "title": "National Scholarship",
      "by": "Department of Higher Education, Ministry of Education, Government of India"
    }
  ],
  "workshops": [
    {
      "title": "Practicing Causal Reasoning in Product Design using the SAPPhIRE Model and GenAI",
      "where": "ICoRD'25 (Workshop WS-110), IIT Hyderabad",
      "date": "Jan 2025",
      "with": "Kausik Bhattacharya",
      "image": "images/Workshops/icord25.jpeg"
    },
    {
      "title": "PISCES Entrepreneurship Workshop Series (3 workshops)",
      "where": "Banyuwangi, Indonesia",
      "date": "Apr, Aug & Dec 2024",
      "with": "Prof. Amaresh Chakrabarti, Prof. Vishal Singh",
      "image": "images/Workshops/pisces2.jpeg"
    },
    {
      "title": "How to Build the SAPPhIRE Model of Causality Representing the Working of Engineering Systems",
      "where": "ICoRD'23, IISc Bengaluru",
      "date": "Jan 2023",
      "with": "Kausik Bhattacharya, Dr. Apoorv Naresh Bhatt",
      "image": "images/Workshops/Icord23_2.jpg"
    },
    {
      "title": "IISc D-Box: Design Thinking Workshops for Undergraduate and School Students",
      "where": "Dept. of Design and Manufacturing, IISc Bengaluru",
      "date": "May 2019 – Feb 2023",
      "with": "Dr. Apoorv Naresh Bhatt, Prof. Amaresh Chakrabarti",
      "image": "images/Workshops/DT_airforce.jpeg"
    }
  ],
  "lastUpdated": "November 2026"
};
