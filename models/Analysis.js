const mongoose = require('mongoose');

const AnalysisSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    skills: {
        type: String,
        required: [true, 'Skills are required']
    },
    projects: {
        type: String,
        default: ''
    },
    learningFocus: {
        type: String,
        default: ''
    },
    goal: {
        type: String,
        required: [true, 'Goal is required']
    },
    archetype: {
        type: String,
        required: true
    },
    strengthCluster: {
        type: [String],
        default: []
    },
    skillGaps: {
        type: [String],
        default: []
    },
    nextMoves: {
        type: [String],
        default: []
    },
    evolutionSummary: {
        type: String,
        default: ''
    },
    growthScore: {
        explorationExecution: { type: Number, default: 50 },
        depthBreadth: { type: Number, default: 50 },
        consistencyIndex: { type: Number, default: 50 }
    },
    roadmap: [{
        step: { type: String, required: true },
        description: { type: String, required: true },
        estimatedTime: { type: String, required: true },
        isCompleted: { type: Boolean, default: false }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Analysis', AnalysisSchema);
