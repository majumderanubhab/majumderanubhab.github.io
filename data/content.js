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
    "tagline": "I develop methods and AI-supported tools that help engineering designers and product developers represent, generate and evaluate concepts in the early stages of design.",
    "facts": [
      { "label": "Now", "text": "Industrial Postdoc, Grundfos and Aarhus University" },
      { "label": "Also", "text": "Visiting postdoctoral researcher, DTU" },
      { "label": "Works on", "text": "Conceptual design, function modelling, AI in design" },
      { "label": "Before", "text": "TU Darmstadt; PhD, Indian Institute of Science" }
    ],
    "heroPhoto": "images/anubhab_large.jpg",
    "location": "Aarhus, Denmark",
    "emails": [
      "anubhabm@mpe.au.dk",
      "majumderanubhab@gmail.com"
    ],
    "address": [
      "Department of Mechanical and Production Engineering",
      "Manufacturing and Mechatronics",
      "Aarhus University",
      "Katrinebjergvej 89F, 8200 Aarhus N, Denmark"
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
      "I am an industrial postdoctoral researcher jointly affiliated with Grundfos and Aarhus University, Denmark, and a visiting postdoctoral researcher at DTU. Before this, I was a postdoctoral researcher at TU Darmstadt, Germany, and a Research Associate in the Department of Design and Manufacturing at the Indian Institute of Science (IISc), Bangalore.",
      "I received my PhD in Product Design and Engineering from the IDeaS Lab at IISc, an M.Tech. in Mechanical Engineering (Machine Design, Gold Medalist) from IIT (ISM) Dhanbad, and a B.Tech. in Mechanical Engineering from the Government College of Engineering & Textile Technology, Berhampore."
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
      "Kinematics & robotics"
    ]
  },
  "news": [
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
      "date": "May 2025",
      "text": "Visiting postdoc at TU Darmstadt, hosted by Prof. Eckhard Kirchner, through Ingenium's Future Talent Guest Stay programme."
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
      "date": "Jul 2024",
      "text": "Completed my PhD at the Indian Institute of Science."
    }
  ],
  "research": [
    {
      "id": "msmd",
      "color": "#0E7490",
      "title": "Conceptual Design of Multi-state Mechanical Devices",
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
      "period": "2022 – present",
      "context": "With K. Bhattacharya and A. Chakrabarti (IISc)",
      "summary": "Causal models such as SAPPhIRE support design-by-analogy, and design structure matrices (DSMs) help analyse system complexity. Building either from technical documents takes experts a lot of time. This work investigates how to extract such structured design knowledge from natural-language documents reliably, first through a systematic manual method and then by using large language models with retrieval-augmented generation (RAG).",
      "highlights": [
        "A method and rule set for extracting SAPPhIRE constructs from natural-language descriptions of technical systems, refined iteratively through user trials with specialists and novices",
        "RAG-based hallucination suppression, showing that the choice of reference knowledge strongly affects the quality of generated technical content",
        "A RAG tool that generates SAPPhIRE models of artificial systems, evaluated for factual accuracy and reliability",
        "An automated DSM-extraction framework with an explicit reasoning step, benchmarked across GPT-4o-mini, GPT-3.5 and GPT-4o on six metrics and cost"
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
      "title": "Model-based Systems Engineering & Resilient Cyber-Physical Systems",
      "period": "2025 – present",
      "context": "TU Darmstadt, with E. Kirchner",
      "summary": "High-quality requirements are essential for successful product development, and autonomous systems must stay resilient when disruptions occur. This work connects model-based systems engineering (MBSE) with AI so that requirements can be verified and validated against evidence early in development. It also clarifies what resilience means for autonomous cyber-physical systems (CPS).",
      "highlights": [
        "A model-based requirements engineering framework that links design characteristics and measured properties through an OPM-based system model (characteristics–properties modelling)",
        "An AI-supported tool for systematic verification and validation of requirements, demonstrated end to end on a hydraulic-press case study",
        "A standard-based definition of resilience comprising 11 properties, used to analyse the literature on autonomous CPS. Measures acting during a disruption dominate, while anticipating and learning measures are scarce"
      ],
      "figures": [
        {
          "src": "images/Research/papers/cpm_framework.jpg",
          "caption": "Proposed CPM framework and AI-supported requirements engineering tool.",
          "credit": "Rahn, Majumder & Kirchner (2026), Proc. Design Society, CC BY-NC-ND 4.0"
        },
        {
          "src": "images/Research/papers/resilience_properties.jpg",
          "caption": "Resilience properties classified by their time of impact.",
          "credit": "Kortenbusch et al. (2026), Proc. Design Society, CC BY-NC-ND 4.0"
        }
      ],
      "publications": [
        "pds2026-re",
        "pds2026-resilience"
      ]
    },
    {
      "id": "theory",
      "color": "#B45309",
      "title": "Design Theory: Reasoning, Causality and Creativity",
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
      "doi": "10.1007/978-981-96-5511-3_39"
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
      "details": ""
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
      "doi": "10.1017/pds.2023.146"
    },
    {
      "id": "icord2023-function",
      "type": "conference",
      "year": 2023,
      "authors": "A Majumder, AN Bhatt, A Chakrabarti",
      "title": "Using SAPPhIRE for functional modelling of multi-state systems",
      "venue": "International Conference on Research into Design (ICoRD'23)",
      "details": "761–773",
      "doi": "10.1007/978-981-99-0428-0_62"
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
      "doi": "10.1088/1757-899x/377/1/012105"
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
      "org": "Grundfos Holding A/S & Aarhus University",
      "place": "Bjerringbro / Aarhus, Denmark",
      "period": "Dec 2025 – present",
      "text": ""
    },
    {
      "role": "Visiting Postdoctoral Researcher",
      "org": "DTU – Technical University of Denmark",
      "place": "Lyngby, Denmark",
      "period": "Dec 2025 – present",
      "text": ""
    },
    {
      "role": "Postdoctoral Researcher",
      "org": "Technische Universität Darmstadt",
      "place": "Darmstadt, Germany",
      "period": "Aug 2025 – Nov 2025",
      "text": "Future Talent Short-term Scholarship. Worked on AI and MBSE in requirements engineering, and on resilience in autonomous cyber-physical systems. Co-supervised a Bachelor's thesis."
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
      "text": "Hosted by Prof. Eckhard Kirchner at the Institute for Product Development and Machine Elements, supported by Ingenium's Future Talent Guest Stay programme."
    },
    {
      "role": "Research Associate II",
      "org": "PISCES Partnership (Work Package 6)",
      "place": "Bengaluru, India",
      "period": "Feb 2024 – Feb 2025",
      "text": "Contributed to the design and development of the PISCES Living Lab, which combines engineering design and business model innovation to tackle plastic pollution in Indonesia. Coordinated three stakeholder workshops in Banyuwangi with Brunel University London, ITS, ITB and Udayana University."
    },
    {
      "role": "Doctoral Researcher",
      "org": "IDeaS Lab, Indian Institute of Science",
      "place": "Bengaluru, India",
      "period": "Aug 2018 – Jul 2024",
      "text": "Developed methods and a web-based tool (CODE SYMM) to support the representation, synthesis and analysis of multi-state mechanical device concepts."
    }
  ],
  "education": [
    {
      "degree": "PhD, Product Design and Engineering",
      "org": "Indian Institute of Science (IISc), Bangalore",
      "period": "2018 – 2024",
      "text": "Thesis: Supporting Concept Representation, Synthesis, and Analysis of Multi-state Mechanical Devices"
    },
    {
      "degree": "M.Tech., Mechanical Engineering (Machine Design)",
      "org": "Indian Institute of Technology (ISM), Dhanbad",
      "period": "2016 – 2018",
      "text": "Gold Medalist"
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
