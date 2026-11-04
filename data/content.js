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
 *  Optional publication fields: "url", "doi", "award", "note"
 *  If no url/doi is given, the title links to a Google Scholar search.
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
    "location": "Aarhus, Denmark",
    "emails": ["anubhabm@mpe.au.dk", "majumderanubhab@gmail.com"],
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
    { "date": "2026", "text": "Three papers published in the <em>Proceedings of the Design Society</em>, on AI-supported requirements engineering, resilience in cyber-physical systems, and LLM-based DSM extraction." },
    { "date": "2026", "text": "Paper on assessing the variety of a concept space with Rao's quadratic index published in <em>AI EDAM</em>." },
    { "date": "Dec 2025", "text": "Joined <strong>Grundfos</strong> and <strong>Aarhus University</strong> as an Industrial Postdoc, and <strong>DTU</strong> as a visiting postdoctoral researcher." },
    { "date": "Aug 2025", "text": "Started as a postdoctoral researcher at <strong>TU Darmstadt</strong> with a Future Talent Short-term Scholarship." },
    { "date": "May 2025", "text": "Visiting postdoc at TU Darmstadt, hosted by Prof. Eckhard Kirchner, through Ingenium's Future Talent Guest Stay programme." },
    { "date": "Jan 2025", "text": "<strong>Distinguished Paper Award</strong> at ICoRD'25, IIT Hyderabad, where I also co-ran a workshop on causal reasoning with SAPPhIRE and GenAI." },
    { "date": "2025", "text": "CODE SYMM paper published in the <em>Journal of Mechanical Design</em>." },
    { "date": "Jul 2024", "text": "Completed my PhD at the Indian Institute of Science." }
  ],

  "researchThemes": [
    { "key": "synthesis", "label": "Design synthesis" },
    { "key": "analysis", "label": "Design analysis" },
    { "key": "computing", "label": "Design computing & AI" },
    { "key": "systems", "label": "Systems engineering" },
    { "key": "robotics", "label": "Bio-inspired robotics" }
  ],

  "research": [
    {
      "title": "AI and MBSE for Requirements Engineering",
      "years": "2025–present",
      "themes": ["systems", "computing"],
      "image": "",
      "summary": "Investigating how model-based systems engineering and characteristics–properties modelling can provide the structure needed for AI-supported requirements engineering. Related work also studies resilience through redundant sensing in autonomous cyber-physical systems. Carried out at TU Darmstadt.",
      "link": "https://scholar.google.com/scholar?q=%22Enabling+AI-supported+requirements+engineering+through+model-based+systems+engineering%22"
    },
    {
      "title": "Assessing the Variety of a Concept Space",
      "years": "2023–2026",
      "themes": ["analysis", "computing"],
      "image": "images/Research/variant.png",
      "summary": "A distance-based variety metric for engineering design concept spaces, built on Rao's quadratic diversity index, that removes the need for a tree-like representation of concepts. Distances between concepts are measured across the seven abstraction levels of the SAPPhIRE model and implemented in a software tool called VariAnT.",
      "link": "https://scholar.google.com/scholar?q=%22Assessing+the+variety+of+a+concept+space+using+an+unbiased+estimate+of+Rao%27s+quadratic+index%22"
    },
    {
      "title": "LLM Tools for Creating SAPPhIRE Models",
      "years": "2024–2025",
      "themes": ["computing"],
      "image": "images/Research/RAG.jpg",
      "summary": "A retrieval-augmented generation (RAG) tool that uses large language models to produce structured SAPPhIRE causal descriptions of artificial systems. This reduces the dependence on human experts for building design-by-analogy databases. The tool is evaluated for factual accuracy and reliability.",
      "link": "https://scholar.google.com/scholar?q=%22Development+and+evaluation+of+a+retrieval-augmented+generation+tool+for+creating+SAPPhIRE+models%22"
    },
    {
      "title": "Function Modelling of Multi-state Systems",
      "years": "2023–2024",
      "themes": ["analysis"],
      "image": "images/Research/function_model.jpg",
      "summary": "An integrated SAPPhIRE-based function modelling approach for systems that achieve different functions in different operating states by changing their topology and component interactions. It explains state transitions, the functions performed within each state, and the transformation of the operand. A hairdryer serves as the case study.",
      "link": "https://scholar.google.com/scholar?q=%22Using+SAPPhIRE+for+functional+modelling+of+multi-state+systems%22"
    },
    {
      "title": "CODE SYMM: Conceptual Design Synthesis of Multi-state Mechanical Devices",
      "years": "2021–2025",
      "themes": ["synthesis", "computing"],
      "image": "images/Research/codesymm.jpg",
      "summary": "A web-based tool and prescriptive model that guide designers through generating initial solutions, modifying semi-working solutions, and verifying the desired behaviour. Kinematic building blocks and modification rules are retrieved automatically. In design experiments, the tool significantly improved designers' fluency and time efficiency.",
      "link": "https://scholar.google.com/scholar?q=%22Development+and+Evaluation+of+code+symm%22"
    },
    {
      "title": "Modes of Reasoning in Design",
      "years": "2020–2021",
      "themes": ["analysis"],
      "image": "images/Research/reasoning.png",
      "summary": "Uses the SAPPhIRE model of causality and the Extended Integrated Model of Designing to explain how explanatory abduction, innovative abduction, deduction and induction appear during design synthesis. The analysis draws on empirical studies of designers' verbal protocols and design outcomes.",
      "link": "https://scholar.google.com/scholar?q=%22Analyzing+the+modes+of+reasoning+in+design+using+the+SAPPhIRE+model%22"
    },
    {
      "title": "Empirical Studies on Multiple-State Design Synthesis",
      "years": "2019–2021",
      "themes": ["synthesis", "analysis"],
      "image": "images/Research/design_task.jpg",
      "summary": "Empirical studies with engineering design students on how designers synthesise multiple-state mechanical devices, including the challenges they face, the strategies they use and the elemental functions involved. The results form the basis of a descriptive model of multiple-state design synthesis.",
      "link": "https://scholar.google.com/scholar?q=%22Empirical+studies+on+conceptual+design+synthesis+of+multiple-state+mechanical+devices%22"
    },
    {
      "title": "Locomotion of a Hyper-redundant Modular Robot",
      "years": "2017–2019",
      "themes": ["robotics", "computing"],
      "image": "images/Research/serpentine_robot.png",
      "summary": "A six-module limbless robot with five degrees of freedom, whose locomotion patterns (straight heading and steering) were modelled with artificial neural networks that relate joint inputs to the resulting motion.",
      "link": "https://scholar.google.com/scholar?q=%22Locomotion+Study+of+a+Hyper-redundant+Modular+Robot+Using+Artificial+Neural+Networks%22"
    },
    {
      "title": "A Bio-inspired Climbing Robot",
      "years": "2017–2018",
      "themes": ["robotics"],
      "image": "images/Research/climbing_robot.png",
      "summary": "An inchworm-inspired climbing robot with four modules and switchable electromagnets for adhesion to ferromagnetic surfaces. Joint torques for actuator sizing were estimated with Lagrangian and bond-graph dynamic models, and a prototype demonstrated vertical climbing.",
      "link": "https://scholar.google.com/scholar?q=%22A+bio-inspired+climbing+robot%22+Majumder"
    }
  ],

  "publications": [
    { "type": "journal", "year": 2026, "authors": "A Majumder, U Pal, A Chakrabarti", "title": "Assessing the variety of a concept space using an unbiased estimate of Rao's quadratic index", "venue": "Artificial Intelligence for Engineering Design, Analysis and Manufacturing (AI EDAM)", "details": "40, e7" },
    { "type": "journal", "year": 2026, "authors": "Y Kahlon, S Law, M Kishimoto, A Majumder, M Gath-Morad, T Osaragi, et al.", "title": "Gaze sharing: A survey of its applications in education and future directions", "venue": "Computers & Education: X Reality", "details": "8, 100150" },
    { "type": "journal", "year": 2026, "authors": "Y Kahlon, RF Heaton, A Majumder, T Oki, T Osaragi, S Law", "title": "Visual Impression of Urban Space: A Systematic Review of Empirical Findings, Challenges, and Opportunities", "venue": "Urban Science", "details": "10(10), 567" },
    { "type": "conference", "year": 2026, "authors": "F Rahn, A Majumder, E Kirchner", "title": "Enabling AI-supported requirements engineering through model-based systems engineering and characteristics-properties modeling", "venue": "Proceedings of the Design Society", "details": "6, 2851–2860" },
    { "type": "conference", "year": 2026, "authors": "P Kortenbusch, A Majumder, H Firoud, E Kirchner", "title": "A study on resilience through redundant sensing in autonomous cyber-physical systems", "venue": "Proceedings of the Design Society", "details": "6, 2791–2800" },
    { "type": "conference", "year": 2026, "authors": "A Majumder, S Parasuram, K Bhattacharya, A Chakrabarti", "title": "Evaluating large language models for automated design structure matrix extraction from unstructured documents: an empirical study", "venue": "Proceedings of the Design Society", "details": "6, 2433–2442" },
    { "type": "conference", "year": 2026, "authors": "Y Kahlon, A Majumder, S Law", "title": "Applying Generative AI in Design Education: An Overview of Current Work and Future Research Directions", "venue": "International Conference on Engineering and Product Design Education (E&PDE), DS 146", "details": "" },

    { "type": "journal", "year": 2025, "authors": "A Majumder, A Chakrabarti", "title": "Development and Evaluation of CODE SYMM: A Tool to Facilitate Conceptual Design Synthesis of Multistate Mechanical Devices", "venue": "Journal of Mechanical Design", "details": "147(2), 021403" },
    { "type": "conference", "year": 2025, "authors": "A Majumder, K Bhattacharya, A Chakrabarti", "title": "Development and evaluation of a retrieval-augmented generation tool for creating SAPPhIRE models of artificial systems", "venue": "International Conference on Research into Design (ICoRD'25)", "details": "489–504" },
    { "type": "conference", "year": 2025, "authors": "K Bhattacharya, A Majumder, A Chakrabarti", "title": "A study on effect of reference knowledge choice in generating technical content relevant to SAPPhIRE model using large language model", "venue": "International Conference on Research into Design (ICoRD'25)", "details": "505–519" },
    { "type": "conference", "year": 2025, "authors": "A Majumder, TR Fahrisa, S Gerassimidou, G Yudoko, S Jobling, et al.", "title": "Adapting the engineering design process to develop a business model for service-oriented living labs: a case study of PISCES", "venue": "Proceedings of the Design Society (ICED25)", "details": "5, 329–338" },

    { "type": "journal", "year": 2024, "authors": "K Bhattacharya, A Majumder, AN Bhatt, S Keshwani, S Venkataraman, et al.", "title": "Developing a method for creating structured representations of working of systems from natural language descriptions using the SAPPhIRE model of causality", "venue": "Artificial Intelligence for Engineering Design, Analysis and Manufacturing (AI EDAM)", "details": "38, e24" },
    { "type": "conference", "year": 2024, "authors": "A Majumder, A Chakrabarti", "title": "A Causal Representation Scheme for Capturing Topological Changes in Multi-state Mechanical Devices", "venue": "Recent Advances in Industrial Machines and Mechanisms: Select Proceedings", "details": "" },
    { "type": "thesis", "year": 2024, "authors": "A Majumder", "title": "Supporting Concept Representation, Synthesis, and Analysis of Multi-state Mechanical Devices", "venue": "PhD thesis, Indian Institute of Science, Bangalore", "details": "" },

    { "type": "journal", "year": 2023, "authors": "A Majumder, SR Todeti, A Chakrabarti", "title": "Empirical studies on conceptual design synthesis of multiple-state mechanical devices", "venue": "Research in Engineering Design", "details": "34(4), 477–495" },
    { "type": "conference", "year": 2023, "authors": "A Majumder, A Chakrabarti", "title": "Development of a design support tool for synthesising multi-state mechanical device concepts", "venue": "Proceedings of the Design Society (ICED23)", "details": "3, 1455–1464" },
    { "type": "conference", "year": 2023, "authors": "A Majumder, AN Bhatt, A Chakrabarti", "title": "Using SAPPhIRE for functional modelling of multi-state systems", "venue": "International Conference on Research into Design (ICoRD'23)", "details": "761–773" },

    { "type": "journal", "year": 2022, "authors": "A Majumder, A Chakrabarti", "title": "A tool for supporting conceptual design of multiple state mechanical devices", "venue": "Defence Science Journal", "details": "72(2), 217–226" },

    { "type": "journal", "year": 2021, "authors": "AN Bhatt, A Majumder, A Chakrabarti", "title": "Analyzing the modes of reasoning in design using the SAPPhIRE model of causality and the Extended Integrated Model of Designing", "venue": "Artificial Intelligence for Engineering Design, Analysis and Manufacturing (AI EDAM)", "details": "35(4), 384–403" },

    { "type": "journal", "year": 2020, "authors": "P Chattopadhyay, SK Ghoshal, A Majumder", "title": "Implementation of Piecewise Sine Functions on Limbless Robot Locomotion", "venue": "International Journal of Robotics and Automation", "details": "35(4)" },
    { "type": "journal", "year": 2020, "authors": "M Patel, A Patra, P Chattopadhyay, A Majumder, SK Ghoshal", "title": "Evolution of a Modular Limbless Crawling and Climbing Robot", "venue": "Advanced Science, Engineering and Medicine", "details": "12(11), 1371–1377" },
    { "type": "conference", "year": 2020, "authors": "A Patra, M Patel, P Chattopadhyay, A Majumder, SK Ghoshal", "title": "A bio-inspired climbing robot: dynamic modelling and prototype development", "venue": "Recent Advances in Mechanical Engineering: Select Proceedings of NCAME 2019", "details": "191–209" },

    { "type": "conference", "year": 2019, "authors": "A Majumder, A Patra, M Patel, P Chattopadhyay, SK Ghoshal", "title": "Locomotion Study of a Hyper-redundant Modular Robot Using Artificial Neural Networks", "venue": "Proceedings of the 4th International Conference on Advances in Robotics (AIR 2019)", "details": "" },

    { "type": "journal", "year": 2018, "authors": "P Chattopadhyay, S Ghoshal, A Majumder, H Dikshit", "title": "Locomotion Methods of Pipe Climbing Robots: A Review", "venue": "Journal of Engineering Science and Technology Review", "details": "11(4), 154–165", "doi": "10.25103/jestr.114.20" },
    { "type": "conference", "year": 2018, "authors": "P Chattopadhyay, A Majumder, H Dikshit, SK Ghoshal, A Maity", "title": "A bio-inspired climbing robot: design, simulation, and experiments", "venue": "IOP Conference Series: Materials Science and Engineering", "details": "377(1), 012105" },
    { "type": "conference", "year": 2018, "authors": "P Chattopadhyay, H Dikshit, A Majumder, S Ghoshal, A Maity", "title": "Dynamic analysis of a bio-inspired climbing robot using ADAMS-Simulink co-simulation", "venue": "AIP Conference Proceedings", "details": "1952(1), 020015" }
  ],

  "experience": [
    { "role": "Industrial Postdoctoral Researcher", "org": "Grundfos Holding A/S & Aarhus University", "place": "Bjerringbro / Aarhus, Denmark", "period": "Dec 2025 – present", "text": "" },
    { "role": "Visiting Postdoctoral Researcher", "org": "DTU – Technical University of Denmark", "place": "Lyngby, Denmark", "period": "Dec 2025 – present", "text": "" },
    { "role": "Postdoctoral Researcher", "org": "Technische Universität Darmstadt", "place": "Darmstadt, Germany", "period": "Aug 2025 – Nov 2025", "text": "Future Talent Short-term Scholarship. Worked on AI and MBSE in requirements engineering, and on resilience in autonomous cyber-physical systems. Co-supervised a Bachelor's thesis." },
    { "role": "Research Associate II, Industry 4.0", "org": "Dept. of Design and Manufacturing, Indian Institute of Science", "place": "Bengaluru, India", "period": "Mar 2025 – Jul 2025", "text": "IISc Smart Factory startup mentoring initiative (funded by the Ministry of Heavy Industries and Tata Steel). Carried out a systematic review of Industry 4.0 challenges in Indian MSMEs, curated industry problem statements, built the Smart Factory website and supported hackathon planning." },
    { "role": "Visiting Postdoctoral Researcher", "org": "Technische Universität Darmstadt (pmd)", "place": "Darmstadt, Germany", "period": "May 2025 – Jun 2025", "text": "Hosted by Prof. Eckhard Kirchner at the Institute for Product Development and Machine Elements, supported by Ingenium's Future Talent Guest Stay programme." },
    { "role": "Research Associate II", "org": "PISCES Partnership (Work Package 6)", "place": "Bengaluru, India", "period": "Feb 2024 – Feb 2025", "text": "Contributed to the design and development of the PISCES Living Lab, which combines engineering design and business model innovation to tackle plastic pollution in Indonesia. Coordinated three stakeholder workshops in Banyuwangi with Brunel University London, ITS, ITB and Udayana University." },
    { "role": "Doctoral Researcher", "org": "IDeaS Lab, Indian Institute of Science", "place": "Bengaluru, India", "period": "Aug 2018 – Jul 2024", "text": "Developed methods and a web-based tool (CODE SYMM) to support the representation, synthesis and analysis of multi-state mechanical device concepts." }
  ],

  "education": [
    { "degree": "PhD, Product Design and Engineering", "org": "Indian Institute of Science (IISc), Bangalore", "period": "2018 – 2024", "text": "Thesis: Supporting Concept Representation, Synthesis, and Analysis of Multi-state Mechanical Devices" },
    { "degree": "M.Tech., Mechanical Engineering (Machine Design)", "org": "Indian Institute of Technology (ISM), Dhanbad", "period": "2016 – 2018", "text": "Gold Medalist" },
    { "degree": "B.Tech., Mechanical Engineering", "org": "Government College of Engineering & Textile Technology, Berhampore", "period": "2012 – 2016", "text": "" }
  ],

  "awards": [
    { "year": "2025", "title": "Future Talent Short-term Scholarship & Guest Stay", "by": "Ingenium, Technical University of Darmstadt, Germany" },
    { "year": "2025", "title": "Distinguished Paper Award", "by": "ICoRD'25, Indian Institute of Technology Hyderabad, India", "image": "images/Awards/ICoRD25.jpeg" },
    { "year": "2023", "title": "Reviewers' Favourite Award", "by": "ICED23, University of Bordeaux, France", "image": "images/Awards/iced23.jpeg" },
    { "year": "2023", "title": "Distinguished Paper Award", "by": "ICoRD'23, Indian Institute of Science, India", "image": "images/Awards/ICoRD23.JPG" },
    { "year": "2018", "title": "IIT (ISM) Gold Medal", "by": "Indian Institute of Technology (ISM), Dhanbad, India" },
    { "year": "2017", "title": "Best Paper Award", "by": "ICMMRE 2017, Sikkim, India", "image": "images/Awards/icmmre.JPG" },
    { "year": "2016–2018", "title": "GATE Scholarship", "by": "Ministry of Education, Government of India" },
    { "year": "2012–2016", "title": "National Scholarship", "by": "Department of Higher Education, Ministry of Education, Government of India" }
  ],

  "workshops": [
    { "title": "Practicing Causal Reasoning in Product Design using the SAPPhIRE Model and GenAI", "where": "ICoRD'25 (Workshop WS-110), IIT Hyderabad", "date": "Jan 2025", "with": "Kausik Bhattacharya", "image": "images/Workshops/icord25.jpeg" },
    { "title": "PISCES Entrepreneurship Workshop Series (3 workshops)", "where": "Banyuwangi, Indonesia", "date": "Apr, Aug & Dec 2024", "with": "Prof. Amaresh Chakrabarti, Prof. Vishal Singh", "image": "images/Workshops/pisces2.jpeg" },
    { "title": "How to Build the SAPPhIRE Model of Causality Representing the Working of Engineering Systems", "where": "ICoRD'23, IISc Bengaluru", "date": "Jan 2023", "with": "Kausik Bhattacharya, Dr. Apoorv Naresh Bhatt", "image": "images/Workshops/Icord23_2.jpg" },
    { "title": "IISc D-Box: Design Thinking Workshops for Undergraduate and School Students", "where": "Dept. of Design and Manufacturing, IISc Bengaluru", "date": "May 2019 – Feb 2023", "with": "Dr. Apoorv Naresh Bhatt, Prof. Amaresh Chakrabarti", "image": "images/Workshops/DT_airforce.jpeg" }
  ],

  "lastUpdated": "November 2026"
};
