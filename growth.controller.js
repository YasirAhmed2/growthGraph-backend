const { OpenAI } = require('openai');
const Analysis = require('./models/Analysis');

const openai = new OpenAI({
    apiKey: process.env.GROQ_KEY || process.env.OPENAI_API_KEY || 'dummy-key-for-demo',
    baseURL: 'https://api.groq.com/openai/v1',
});

// Demo Data Ecosystem
const DEMO_ARCHETYPES = [
    {
        archetype: "The Systems Architect",
        strengthCluster: ["Scalability", "Infrastructure Design", "Pattern Recognition"],
        skillGaps: ["User Empathy", "Visual Design", "Rapid Prototyping"],
        nextMoves: [
            "Lead a migration project to microservices",
            "Contribute to open-source system tools",
            "Mentor junior devs on architectural patterns"
        ],
        evolutionSummary: "You see the world in components and flows. Your growth lies in connecting these rigid structures to the fluid needs of actual users.",
        growthScore: {
            explorationExecution: 30, // High execution
            depthBreadth: 85, // High depth
            consistencyIndex: 92
        },
        roadmap: [
            { step: "Master Microservices Pattern", description: "Learn and implement saga pattern and circuit breakers.", estimatedTime: "2 weeks" },
            { step: "Container Orchestration", description: "Deep dive into Kubernetes and Helm charts.", estimatedTime: "3 weeks" },
            { step: "System Design Interview Prep", description: "Practice designing large scale systems like Uber or Twitter.", estimatedTime: "4 weeks" }
        ]
    },
    {
        archetype: "The Product Pioneer",
        strengthCluster: ["User Centricity", "Rapid Prototyping", "Feature Strategy"],
        skillGaps: ["System Performance", "Security Compliance", "DevOps Pipelines"],
        nextMoves: [
            "Deep dive into database optimization",
            "Automate your deployment workflow",
            "Refactor a legacy codebase for performance"
        ],
        evolutionSummary: "You build what people want, fast. To level up, you must master the invisible foundation that makes those products scale.",
        growthScore: {
            explorationExecution: 88, // High exploration
            depthBreadth: 40, // High breadth
            consistencyIndex: 65
        },
        roadmap: [
            { step: "Database Indexing", description: "Learn how B-trees work and optimize slow queries.", estimatedTime: "1 week" },
            { step: "CI/CD Pipelines", description: "Set up GitHub Actions for automated testing and deployment.", estimatedTime: "2 weeks" },
            { step: "Security Best Practices", description: "Implement OWASP Top 10 protections in a project.", estimatedTime: "2 weeks" }
        ]
    },
    {
        archetype: "The Algorithmic Alchemist",
        strengthCluster: ["Optimization", "Complex Logic", "Data Structures"],
        skillGaps: ["Communication", "Stakeholder Management", "UI/UX"],
        nextMoves: [
            "Present a technical topic to a non-technical audience",
            "Collaborate with a designer on a frontend feature",
            "Write documentation for your complex modules"
        ],
        evolutionSummary: "You turn code into gold, optimizing every cycle. Your next challenge is to translate that brilliance into human impact.",
        growthScore: {
            explorationExecution: 50,
            depthBreadth: 95,
            consistencyIndex: 80
        },
        roadmap: [
            { step: "Technical Writing", description: "Write a blog post explaining a complex algorithm simply.", estimatedTime: "1 week" },
            { step: "UI Fundamentals", description: "Learn basic color theory and layout principles.", estimatedTime: "2 weeks" },
            { step: "Public Speaking", description: "Give a lightning talk at a local meetup or team meeting.", estimatedTime: "3 weeks" }
        ]
    }
];

const generateAnalysis = async (systemPrompt, userPayload, retries = 1) => {
    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPayload }
            ],
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" },
        });

        const content = completion.choices[0].message.content;
        return JSON.parse(content);
    } catch (error) {
        if (retries > 0) {
            console.warn(`Analysis failed, retrying... (${retries} attempts left)`);
            return generateAnalysis(systemPrompt, userPayload, retries - 1);
        }
        throw error;
    }
};

// --- DYNAMIC CUSTOMIZED LOCAL FALLBACK GENERATORS ---
const generateLocalFallback = (skills, goal, learningFocus = '', projects = '') => {
    const skillsLower = skills?.toLowerCase() || '';
    const goalLower = goal?.toLowerCase() || '';
    
    // 1. Video Editor / Media Creator
    if (goalLower.includes('video') || goalLower.includes('editor') || goalLower.includes('media') || goalLower.includes('creator') || skillsLower.includes('premier') || skillsLower.includes('resolve') || skillsLower.includes('remotion') || skillsLower.includes('editing')) {
        return {
            archetype: "The Media Architect",
            strengthCluster: ["Visual Storytelling", "NLE Workflow (Premiere/Resolve)", "Color Management"],
            skillGaps: ["Motion Graphics (Fusion/AE)", "Automated Rendering Pipelines", "3D CGI Integration"],
            nextMoves: [
                "Build an automated video rendering system using Remotion & Node.js",
                "Master DaVinci Resolve Fusion for node-based compositing",
                "Create a centralized media asset manager for collaborative editing"
            ],
            evolutionSummary: `You blend creative rhythm with technical editing. Your path as a ${goal || 'Video Editor'} lies in mastering automated workflows, motion design, and high-end visual effects.`,
            growthScore: {
                explorationExecution: 75,
                depthBreadth: 65,
                consistencyIndex: 85
            },
            roadmap: [
                { step: "Master Advanced Color Spaces & HDR", description: "Learn ACES workflow and color management for cinema and web delivery.", estimatedTime: "2 weeks" },
                { step: "Motion Graphics & Compositing (Fusion/AE)", description: "Deep dive into node-based compositing for cinematic titles and visual effects.", estimatedTime: "4 weeks" },
                { step: "Video Automation (Remotion & FFMPEG)", description: "Learn to programmatically compile, template, and render videos using Node.js.", estimatedTime: "3 weeks" }
            ]
        };
    }
    
    // 2. UI/UX / Frontend Designer
    if (goalLower.includes('design') || goalLower.includes('frontend') || goalLower.includes('ui') || goalLower.includes('ux') || skillsLower.includes('react') || skillsLower.includes('html') || skillsLower.includes('css') || skillsLower.includes('figma')) {
        return {
            archetype: "The Interface Artisan",
            strengthCluster: ["Visual Aesthetics", "Responsive Interfaces", "Design Systems"],
            skillGaps: ["Advanced State Management", "Performance Auditing", "Web Accessibility (WCAG 2.2)"],
            nextMoves: [
                "Build a multi-theme headless design system for enterprise products",
                "Optimize a heavy React app to achieve perfect 100 score in Core Web Vitals",
                "Implement complex state machines using XState for user flows"
            ],
            evolutionSummary: `You see the web as a canvas for interactive experiences. Your growth as a ${goal || 'Frontend Engineer'} lies in structuring high-performance logic underneath your beautiful visuals.`,
            growthScore: {
                explorationExecution: 80,
                depthBreadth: 70,
                consistencyIndex: 78
            },
            roadmap: [
                { step: "Design System Architecture", description: "Build and document a highly modular headless UI component library.", estimatedTime: "3 weeks" },
                { step: "Advanced State Management", description: "Master state machines, global client-side storage, and performance optimization.", estimatedTime: "3 weeks" },
                { step: "Web Accessibility (WCAG 2.2) & Audits", description: "Deep dive into ARIA compliance, screen reader support, and access patterns.", estimatedTime: "2 weeks" }
            ]
        };
    }

    // 3. Data Science / AI / Python
    if (goalLower.includes('data') || goalLower.includes('science') || goalLower.includes('ai') || goalLower.includes('ml') || goalLower.includes('machine') || skillsLower.includes('python') || skillsLower.includes('sql') || skillsLower.includes('pandas')) {
        return {
            archetype: "The Algorithmic Alchemist",
            strengthCluster: ["Data Processing", "Statistical Modeling", "Python Ecosystem"],
            skillGaps: ["Model Deployment & MLOps", "Distributed Computing (Spark)", "Real-time Event Ingestion"],
            nextMoves: [
                "Deploy a real-time machine learning model API with FastAPI & Docker",
                "Build an automated ETL pipeline syncing unstructured data into clean Warehouses",
                "Implement a distributed data processing workflow using PySpark"
            ],
            evolutionSummary: `You turn complex data signals into clean actionable forecasts. Your next milestone as a ${goal || 'Data Professional'} is scaling those pipelines into real-time distributed clusters.`,
            growthScore: {
                explorationExecution: 82,
                depthBreadth: 90,
                consistencyIndex: 80
            },
            roadmap: [
                { step: "Model Containerization & APIs", description: "Learn to containerize inference workloads and build low-latency endpoints.", estimatedTime: "3 weeks" },
                { step: "Distributed Data Frameworks", description: "Deep dive into Apache Spark and Parquet storage optimizations.", estimatedTime: "4 weeks" },
                { step: "ML Pipeline Orchestration", description: "Set up Airflow or Prefect to automate training and evaluation pipelines.", estimatedTime: "3 weeks" }
            ]
        };
    }

    // Default Fallback: Dynamically customized based on input skills & goal
    const skillList = skills ? skills.split(',').map(s => s.trim()) : ['Software Development'];
    const primeSkill = skillList[0] || 'Software Engineering';
    const secondSkill = skillList[1] || 'Modern Technologies';

    return {
        archetype: `The Strategic ${goal || 'Systems Architect'}`,
        strengthCluster: [primeSkill, secondSkill, "Problem Solving"],
        skillGaps: ["System Scaling", "Security Architecture", "Cloud Optimization"],
        nextMoves: [
            `Design a highly modular system using ${primeSkill}`,
            `Automate your development pipeline integrating ${secondSkill}`,
            `Refactor a legacy application to implement modern ${goal || 'engineering'} practices`
        ],
        evolutionSummary: `You see structural flow in engineering tasks. Your path as a ${goal || 'Developer'} lies in scaling your experience with ${primeSkill} to solve enterprise-level challenges.`,
        growthScore: {
            explorationExecution: 75,
            depthBreadth: 80,
            consistencyIndex: 85
        },
        roadmap: [
            { step: `Master ${primeSkill} Core Concepts`, description: `Develop deep expertise in building solid, scalable foundations using ${primeSkill}.`, estimatedTime: "3 weeks" },
            { step: `Advanced ${secondSkill} Architecture`, description: `Architect and deploy scalable portfolios using modern stacks matching your targets.`, estimatedTime: "4 weeks" },
            { step: `System Integration & Deployment`, description: `Practice design patterns, system optimization, and professional scaling.`, estimatedTime: "4 weeks" }
        ]
    };
};

const generateLocalProjects = (skills) => {
    const skillsLower = skills?.toLowerCase() || '';
    
    if (skillsLower.includes('video') || skillsLower.includes('editor') || skillsLower.includes('media') || skillsLower.includes('premiere') || skillsLower.includes('resolve') || skillsLower.includes('remotion') || skillsLower.includes('editing')) {
        return [
            { title: "Automated Remotion Video Editor", description: "A program that takes text or images and automatically compiles and renders short video templates using Node.js." },
            { title: "Collaborative Storyboard Manager", description: "A real-time workspace for video editors to map out video scenes, timelines, and asset links in a team." },
            { title: "Video Converter & Transcoder Pipeline", description: "An automated cloud pipeline that takes raw video uploads, compresses them, and transcodes them into multiple formats." }
        ];
    }
    
    if (skillsLower.includes('react') || skillsLower.includes('html') || skillsLower.includes('css') || skillsLower.includes('javascript') || skillsLower.includes('js') || skillsLower.includes('figma')) {
        return [
            { title: "Multi-Theme Design System UI", description: "A highly reusable component library styled with custom classes, supporting dynamic theme switching and WCAG accessibility." },
            { title: "Visual Flowchart & Diagram Builder", description: "An interactive canvas application allowing users to build and connect system nodes with drag-and-drop mechanics." },
            { title: "Real-time Collaborative Whiteboard", description: "A whiteboard app where multiple users can sketch, write, and align ideas simultaneously using WebSockets." }
        ];
    }

    if (skillsLower.includes('python') || skillsLower.includes('data') || skillsLower.includes('sql') || skillsLower.includes('pandas') || skillsLower.includes('ml')) {
        return [
            { title: "FastAPI Model Serving Container", description: "A production-grade microservices container that serves machine learning model predictions with low-latency monitoring." },
            { title: "Automated ETL Analytics Sync", description: "A scheduler pipeline that extracts data from APIs, transforms it with Python, and syncs it to relational databases with slack alerts." },
            { title: "Customer Sentiment Alert Dashboard", description: "A scraping and analysis pipeline that monitors social media feeds and raises alerts for negative company feedback." }
        ];
    }

    const skillList = skills ? skills.split(',').map(s => s.trim()) : ['Modern Tech'];
    const primeSkill = skillList[0] || 'Software';

    return [
        { title: `${primeSkill} SaaS Integration Hub`, description: `A highly scalable software architecture implementing top-tier patterns in ${primeSkill}.` },
        { title: `Automated Pipeline for ${primeSkill}`, description: `A complete developer tool focused on streamlining and optimizing deployment flows with ${primeSkill}.` },
        { title: `Real-time ${primeSkill} Analytics Portal`, description: `An interactive web dashboard rendering live operational telemetry and charts using ${primeSkill}.` }
    ];
};

exports.analyzeProfile = async (req, res) => {
    const { skills, projects, learningFocus, goal } = req.body;

    console.log("🔍 Request Received:");
    console.log("   - Skills:", skills);
    console.log("   - Goal:", goal);

    // Ensure user is authenticated
    if (!req.user) {
        return res.status(401).json({ error: "User authentication required" });
    }

    // --- DEMO MODE CHECK ---
    const isDemoInput = [skills, projects, learningFocus, goal].some(f => f?.toLowerCase().includes('demo'));
    const apiKey = process.env.GROQ_KEY || process.env.OPENAI_API_KEY;
    const hasApiKey = !!apiKey;

    console.log("🔑 API Key Status:");
    console.log("   - GROQ_KEY present?", !!process.env.GROQ_KEY);
    console.log("   - OPENAI_API_KEY present?", !!process.env.OPENAI_API_KEY);
    console.log("   - Active Key:", apiKey ? (apiKey.slice(0, 5) + "..." + apiKey.slice(-4)) : "NONE");
    console.log("   - Is Demo Input?", isDemoInput);

    let analysisResult;

    if (!hasApiKey || isDemoInput) {
        console.log("⚠️ Entering DEMO MODE because:", !hasApiKey ? "No API Key found" : "User requested demo");

        // Simulating processing delay for realism
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Use custom local fallback tailored to goal/skills
        analysisResult = generateLocalFallback(skills, goal, learningFocus, projects);
    } else {
        // --- REAL AI MODE ---
        const payload = `
User Data:
Skills: ${skills}
Projects: ${projects}
Current Focus: ${learningFocus}
Career Goal: ${goal}
        `;

        const systemPrompt = `
You are a World-Class Career Architect and Tech Industry Expert.
Your goal is to provide a highly professional, deep, and actionable growth analysis for a software engineer.

Analyze the user's input (Skills, Projects, Focus, Goal) and:
1.  **Archetype**: Identify their precise "Learning Personality Archetype" (creative title).
2.  **Strengths**: Identify 3-4 distinct strength clusters based on their stack.
3.  **Gaps**: Detect 3 critical, non-obvious skill gaps preventing them from reaching their Goal.
4.  **Moves**: Suggest 3 specific, high-leverage strategic moves (not just "learn X", but "Build X" or "Lead Y").
5.  **Summary**: Write a sophisticated, insightful "Evolution Summary" that speaks to their potential (2-3 sentences).
6.  **Scores**: Estimate their current metrics (0-100) based on the maturity of their answers.
7.  **Roadmap**: Create a **professional, step-by-step execution roadmap**.
    - breakdown the path to their Goal into 3-4 logical phases/steps.
    - **Step Title**: Professional and clear.
    - **Description**: Actionable advice on *what* to master and *why*.
    - **Time**: Realistic estimate (e.g., "3 weeks", "2 months").

**Tone**: Professional, encouraging, authoritative, and direct. Avoid generic fluff.

Return ONLY valid JSON in this format:
{
  "archetype": "string",
  "strengthCluster": ["string", "string", "string"],
  "skillGaps": ["string", "string", "string"],
  "nextMoves": ["string", "string", "string"],
  "evolutionSummary": "string",
  "growthScore": {
      "explorationExecution": 0,
      "depthBreadth": 0,
      "consistencyIndex": 0
  },
  "roadmap": [
      { "step": "string", "description": "string", "estimatedTime": "string" }
  ]
}
        `;

        try {
            console.log("🚀 Sending request to GroqCloud...");
            const startTime = Date.now();

            analysisResult = await generateAnalysis(systemPrompt, payload);

            const duration = Date.now() - startTime;
            console.log(`✅ GroqCloud Response Received in ${duration}ms`);
            console.log("📊 Model Used:", "llama-3.3-70b-versatile");
        } catch (error) {
            console.error("❌ AI Analysis Failed:", error.message);
            // Dynamic fallback on key mismatch or failure
            analysisResult = generateLocalFallback(skills, goal, learningFocus, projects);
        }
    }

    try {
        // Save analysis to database
        const newAnalysis = await Analysis.create({
            user: req.user._id,
            skills,
            projects: projects || '',
            learningFocus: learningFocus || '',
            goal,
            archetype: analysisResult.archetype,
            strengthCluster: analysisResult.strengthCluster || [],
            skillGaps: analysisResult.skillGaps || [],
            nextMoves: analysisResult.nextMoves || [],
            evolutionSummary: analysisResult.evolutionSummary || '',
            growthScore: analysisResult.growthScore || { explorationExecution: 50, depthBreadth: 50, consistencyIndex: 50 },
            roadmap: analysisResult.roadmap || []
        });

        res.status(201).json(newAnalysis);
    } catch (dbError) {
        console.error("❌ MongoDB Save Failed:", dbError);
        res.status(500).json({ error: "Failed to save career blueprint to database" });
    }
};

exports.suggestProjects = async (req, res) => {
    const { skills } = req.body;

    console.log("🔍 Project Suggestion Request:", skills);

    if (!skills || skills.trim() === "") {
        return res.status(400).json({ error: "Skills are required" });
    }

    const systemPrompt = `
    You are a Technical Mentor.
    Based on the user's skills, suggest 3-5 impressive, portfolio-worthy projects they could build.
    For each project, provide a title and a 1-sentence description.
    Focus on modern, relevant applications.
    Return ONLY a JSON object containing a 'projects' key, which is an array of projects.
    Format: { "projects": [{"title": "Project Title", "description": "1-sentence description"}] }
    `;

    const userPayload = `Skills: ${skills}`;

    try {
        const suggestions = await generateAnalysis(systemPrompt, userPayload);
        const projects = Array.isArray(suggestions) ? suggestions : (suggestions.projects || []);
        res.json(projects);
    } catch (error) {
        console.error("❌ Project Suggestion Failed:", error);
        // Serve smart dynamic fallbacks customized to their skills instead of same 3 cards
        const dynamicFallback = generateLocalProjects(skills);
        res.json(dynamicFallback);
    }
};

// @desc    Get user analysis history
// @route   GET /api/history
// @access  Private
exports.getHistory = async (req, res) => {
    try {
        const history = await Analysis.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(history);
    } catch (error) {
        console.error('Error fetching history:', error);
        res.status(500).json({ error: 'Server error fetching career blueprint history' });
    }
};

// @desc    Delete a saved analysis
// @route   DELETE /api/history/:id
// @access  Private
exports.deleteAnalysis = async (req, res) => {
    try {
        const analysis = await Analysis.findById(req.params.id);

        if (!analysis) {
            return res.status(404).json({ error: 'Career blueprint not found' });
        }

        // Verify ownership
        if (analysis.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: 'Not authorized' });
        }

        await analysis.deleteOne();
        res.json({ message: 'Career blueprint deleted successfully' });
    } catch (error) {
        console.error('Error deleting analysis:', error);
        res.status(500).json({ error: 'Server error deleting career blueprint' });
    }
};

// @desc    Update a specific step completion status inside a roadmap
// @route   PATCH /api/history/:id/step
// @access  Private
exports.updateStepStatus = async (req, res) => {
    try {
        const { stepIndex, isCompleted } = req.body;
        
        if (stepIndex === undefined || isCompleted === undefined) {
            return res.status(400).json({ error: 'Please provide stepIndex and isCompleted status' });
        }

        const analysis = await Analysis.findById(req.params.id);

        if (!analysis) {
            return res.status(404).json({ error: 'Career blueprint not found' });
        }

        // Verify ownership
        if (analysis.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: 'Not authorized' });
        }

        // Verify index boundary
        if (stepIndex < 0 || stepIndex >= analysis.roadmap.length) {
            return res.status(400).json({ error: 'Invalid stepIndex' });
        }

        // Update the subdocument field
        analysis.roadmap[stepIndex].isCompleted = isCompleted;
        await analysis.save();

        res.json(analysis);
    } catch (error) {
        console.error('Error updating step status:', error);
        res.status(500).json({ error: 'Server error updating step status' });
    }
};
