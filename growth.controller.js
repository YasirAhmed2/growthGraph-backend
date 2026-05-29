const { OpenAI } = require('openai');

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

exports.analyzeProfile = async (req, res) => {
    const { skills, projects, learningFocus, goal } = req.body;

    console.log("🔍 Request Received:");
    console.log("   - Skills:", skills);
    console.log("   - Goal:", goal);

    // --- DEMO MODE CHECK ---
    // If no API key is present, OR if the user types "demo" in any field, use Demo Mode.
    const isDemoInput = [skills, projects, learningFocus, goal].some(f => f?.toLowerCase().includes('demo'));

    // Check for GROQ_KEY primarily, fallback to OPENAI_API_KEY if needed (though we're using Groq URL)
    const apiKey = process.env.GROQ_KEY || process.env.OPENAI_API_KEY;
    const hasApiKey = !!apiKey;

    console.log("🔑 API Key Status:");
    console.log("   - GROQ_KEY present?", !!process.env.GROQ_KEY);
    console.log("   - OPENAI_API_KEY present?", !!process.env.OPENAI_API_KEY);
    console.log("   - Active Key:", apiKey ? (apiKey.slice(0, 5) + "..." + apiKey.slice(-4)) : "NONE");
    console.log("   - Is Demo Input?", isDemoInput);

    if (!hasApiKey || isDemoInput) {
        console.log("⚠️ Entering DEMO MODE because:", !hasApiKey ? "No API Key found" : "User requested demo");

        // Simulating processing delay for realism
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Select a random archetype for variety
        const randomArchetype = DEMO_ARCHETYPES[Math.floor(Math.random() * DEMO_ARCHETYPES.length)];

        return res.json(randomArchetype);
    }

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

        const analysis = await generateAnalysis(systemPrompt, payload);

        const duration = Date.now() - startTime;
        console.log(`✅ GroqCloud Response Received in ${duration}ms`);
        console.log("📊 Model Used:", "llama-3.3-70b-versatile"); // Confirmed by code config
        console.log("📦 Response Preview:", JSON.stringify(analysis, null, 2).substring(0, 200) + "...");

        res.json(analysis);
    } catch (error) {
        console.error("❌ AI Analysis Failed:", error.message);
        console.error(error); // Log full error object for inspection
        // Fallback to demo mode on error
        const randomArchetype = DEMO_ARCHETYPES[0];
        res.json(randomArchetype);
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
    Return ONLY a JSON array of objects with 'title' and 'description' keys.
    Example: [{"title": "Task Manager", "description": "A collaborative task manager with real-time updates using WebSockets."}]
    `;

    const userPayload = `Skills: ${skills}`;

    try {
        const suggestions = await generateAnalysis(systemPrompt, userPayload);
        // Ensure it's an array
        const projects = Array.isArray(suggestions) ? suggestions : suggestions.projects || [];
        res.json(projects);
    } catch (error) {
        console.error("❌ Project Suggestion Failed:", error);
        // Fallback suggestions
        res.json([
            { title: "Personal Portfolio", description: "A showcase of your work and skills." },
            { title: "E-commerce Store", description: "A full-stack online shop with cart and checkout." },
            { title: "Weather App", description: "A weather dashboard using external APIs." }
        ]);
    }
};
