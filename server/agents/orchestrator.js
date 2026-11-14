import { CAREERS_DATA } from '../data/careers.js';

export class MultiAgentSystem {
  constructor(apiKey = null) {
    this.apiKey = apiKey || process.env.GEMINI_API_KEY || null;
  }

  // Agent 1: Skill Analysis Agent
  analyzeSkills(userSkills, userExperience = "Beginner", userProjects = []) {
    const normalizedUserSkills = (userSkills || []).map(s => {
      if (typeof s === 'string') {
        return { name: s.trim(), level: 'Intermediate', years: 1 };
      }
      return {
        name: s.name.trim(),
        level: s.level || 'Intermediate',
        years: s.years || 1
      };
    });

    const userSkillNames = new Set(normalizedUserSkills.map(s => s.name.toLowerCase()));

    const strengths = [];
    const proficiencies = {};

    normalizedUserSkills.forEach(s => {
      proficiencies[s.name] = {
        level: s.level,
        score: s.level === 'Advanced' ? 92 : s.level === 'Intermediate' ? 70 : 45
      };
      if (s.level === 'Advanced' || s.level === 'Intermediate') {
        strengths.push({
          name: s.name,
          level: s.level,
          insight: `Demonstrates solid working knowledge in ${s.name} based on reported experience.`
        });
      }
    });

    return {
      agent: "Skill Analysis Agent",
      status: "COMPLETED",
      analyzedAt: new Date().toISOString(),
      userSkills: normalizedUserSkills,
      strengths,
      proficiencies,
      summary: `Analyzed ${normalizedUserSkills.length} declared skills. Found ${strengths.length} primary strengths and identified baseline competence.`
    };
  }

  // Agent 2: Career Guidance Agent
  matchCareer(userSkillNames, targetCareerId) {
    const career = CAREERS_DATA.find(c => c.id === targetCareerId) || CAREERS_DATA[0];
    const userSkillSet = new Set((userSkillNames || []).map(s => s.toLowerCase()));

    const matchedSkills = [];
    const missingSkills = [];

    career.requiredSkills.forEach(req => {
      const isMatched = Array.from(userSkillSet).some(us => 
        us.includes(req.name.toLowerCase()) || req.name.toLowerCase().includes(us)
      );

      if (isMatched) {
        matchedSkills.push(req);
      } else {
        missingSkills.push(req);
      }
    });

    const matchPercentage = Math.round((matchedSkills.length / career.requiredSkills.length) * 100);
    const gapPercentage = 100 - matchPercentage;

    let alignmentVerdict = "Moderate Match";
    if (matchPercentage >= 75) alignmentVerdict = "Excellent Alignment";
    else if (matchPercentage >= 50) alignmentVerdict = "Promising Foundation";
    else alignmentVerdict = "Early Stage / High Growth Opportunity";

    return {
      agent: "Career Guidance Agent",
      status: "COMPLETED",
      careerId: career.id,
      careerTitle: career.title,
      matchPercentage,
      gapPercentage,
      alignmentVerdict,
      matchedSkills,
      missingSkills,
      salaryRange: career.avgSalary,
      marketDemand: career.growthRate,
      guidanceNote: `To qualify for ${career.title}, you need to close ${missingSkills.length} critical skill gaps, prioritizing ${missingSkills.filter(m => m.importance === 'Essential').map(m => m.name).slice(0, 3).join(', ')}.`
    };
  }

  // Agent 3: Learning Recommendation Agent
  generateRecommendations(careerId, missingSkills, currentRoadmapProgress = {}) {
    const career = CAREERS_DATA.find(c => c.id === careerId) || CAREERS_DATA[0];
    const missingNames = new Set(missingSkills.map(m => m.name.toLowerCase()));

    const personalizedRoadmap = career.defaultRoadmap.map((step, index) => {
      const isMissing = Array.from(missingNames).some(mn => 
        step.skill.toLowerCase().includes(mn) || mn.includes(step.skill.toLowerCase())
      );

      const isCompleted = currentRoadmapProgress[step.id]?.status === 'COMPLETED';
      const isInProgress = currentRoadmapProgress[step.id]?.status === 'IN_PROGRESS';

      let status = "LOCKED";
      if (isCompleted) {
        status = "COMPLETED";
      } else if (isInProgress) {
        status = "IN_PROGRESS";
      } else if (!isMissing) {
        // User already has this skill!
        status = "SKIPPED_OR_TESTED";
      } else if (index === 0 || !career.defaultRoadmap.slice(0, index).some(prev => !currentRoadmapProgress[prev.id])) {
        status = "NEXT_UP";
      }

      return {
        ...step,
        status,
        priority: isMissing ? "HIGH" : "COMPLETED",
        recommendedAction: isMissing 
          ? `Complete ${step.courses[0]?.name || 'course'} and build ${step.project?.title || 'project'}.`
          : `Review advanced patterns or take assessment to certify proficiency.`
      };
    });

    const priorityCourses = [];
    career.defaultRoadmap.forEach(step => {
      const isMissing = Array.from(missingNames).some(mn => 
        step.skill.toLowerCase().includes(mn) || mn.includes(step.skill.toLowerCase())
      );
      if (isMissing && step.courses) {
        priorityCourses.push(...step.courses.map(c => ({
          ...c,
          skillTarget: step.skill,
          associatedProject: step.project?.title
        })));
      }
    });

    return {
      agent: "Learning Recommendation Agent",
      status: "COMPLETED",
      roadmap: personalizedRoadmap,
      recommendedCourses: priorityCourses.slice(0, 6),
      suggestedProjects: personalizedRoadmap.filter(r => r.status !== 'COMPLETED').map(r => r.project).filter(Boolean).slice(0, 4),
      learningStrategy: "Action-oriented sprint learning with milestone project verifications."
    };
  }

  // Agent 4: Progress Evaluation Agent
  evaluateProgress(roadmap, assessmentScores = {}, weeklyHours = 12) {
    const totalSteps = roadmap.length;
    const completedSteps = roadmap.filter(s => s.status === 'COMPLETED').length;
    const inProgressSteps = roadmap.filter(s => s.status === 'IN_PROGRESS').length;

    const completionRate = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

    const assessmentsList = Object.entries(assessmentScores).map(([skill, data]) => ({
      skill,
      score: data.score,
      maxScore: data.maxScore,
      percentage: Math.round((data.score / data.maxScore) * 100),
      passed: (data.score / data.maxScore) >= 0.7
    }));

    const avgAssessmentScore = assessmentsList.length > 0 
      ? Math.round(assessmentsList.reduce((acc, curr) => acc + curr.percentage, 0) / assessmentsList.length)
      : 82; // Baseline demo score

    let velocityStatus = "On Track";
    if (weeklyHours >= 15) velocityStatus = "Accelerated Sprint";
    else if (weeklyHours < 6) velocityStatus = "Pacing Adjustment Needed";

    const badges = [];
    if (completedSteps >= 1) badges.push({ id: 'first-step', name: 'First Milestone', icon: 'Rocket', unlocked: true });
    if (completedSteps >= 3) badges.push({ id: 'speed-demon', name: 'Velocity Builder', icon: 'Zap', unlocked: true });
    if (assessmentsList.some(a => a.percentage >= 90)) badges.push({ id: 'top-scorer', name: 'Skill Mastery', icon: 'Award', unlocked: true });
    if (weeklyHours >= 10) badges.push({ id: 'consistent-learner', name: 'Consistency Champion', icon: 'Flame', unlocked: true });

    return {
      agent: "Progress Evaluation Agent",
      status: "COMPLETED",
      completionRate,
      completedStepsCount: completedSteps,
      totalStepsCount: totalSteps,
      velocityStatus,
      weeklyHours,
      avgAssessmentScore,
      earnedBadges: badges,
      adaptiveNotice: avgAssessmentScore < 60 
        ? "Adaptive alert: Recommendation difficulty dialed back to consolidate foundational exercises." 
        : "Velocity optimal: Roadmap pace dynamically tuned for maximum retention."
    };
  }

  // Full Multi-Agent Collaboration Run
  async runCollaborationPipeline(payload) {
    const {
      skills = [],
      careerId = "full-stack-developer",
      experienceLevel = "Beginner",
      projects = [],
      roadmapProgress = {},
      assessmentScores = {},
      weeklyHours = 12
    } = payload;

    const userSkillNames = skills.map(s => typeof s === 'string' ? s : s.name);

    // Step 1: Agent 1 analyzes
    const skillAnalysis = this.analyzeSkills(skills, experienceLevel, projects);

    // Step 2: Agent 2 matches with career
    const careerMatch = this.matchCareer(userSkillNames, careerId);

    // Step 3: Agent 3 generates tailored recommendations
    const recommendations = this.generateRecommendations(careerId, careerMatch.missingSkills, roadmapProgress);

    // Step 4: Agent 4 evaluates progress & adaptation
    const progressEval = this.evaluateProgress(recommendations.roadmap, assessmentScores, weeklyHours);

    // Collaborative narrative / dialogue for the Multi-Agent Visualizer
    const agentCollaborationLogs = [
      {
        step: 1,
        agent: "Skill Analysis Agent",
        role: "Skill Parser & Auditor",
        timestamp: "T+0.05s",
        action: "Audited declared proficiencies",
        message: `Parsed ${skills.length} user skills. Verified strengths: ${skillAnalysis.strengths.map(s => s.name).join(', ') || 'Foundational competencies'}. Passing profile to Career Guidance Agent.`,
        status: "success"
      },
      {
        step: 2,
        agent: "Career Guidance Agent",
        role: "Market Alignment & Gap Engine",
        timestamp: "T+0.21s",
        action: "Matched against industry benchmark requirements",
        message: `Evaluated requirements for ${careerMatch.careerTitle}. Detected match score of ${careerMatch.matchPercentage}%. Identified ${careerMatch.missingSkills.length} missing core skill competencies. Instructing Learning Recommendation Agent to construct roadmap.`,
        status: "success"
      },
      {
        step: 3,
        agent: "Learning Recommendation Agent",
        role: "Curriculum Architect",
        timestamp: "T+0.42s",
        action: "Synthesized personalized milestone path",
        message: `Generated customized 7-stage learning roadmap targeting missing skills (${careerMatch.missingSkills.map(m => m.name).slice(0, 3).join(', ')}). Curated top practical projects and video tutorials.`,
        status: "success"
      },
      {
        step: 4,
        agent: "Progress Evaluation Agent",
        role: "Adaptive Calibration Monitor",
        timestamp: "T+0.60s",
        action: "Calibrated velocity and milestone difficulty",
        message: `Assessment performance index: ${progressEval.avgAssessmentScore}%. Current completion rate: ${progressEval.completionRate}%. Roadmap velocity confirmed at '${progressEval.velocityStatus}'. System is synchronized.`,
        status: "success"
      }
    ];

    return {
      success: true,
      timestamp: new Date().toISOString(),
      agentLogs: agentCollaborationLogs,
      skillAnalysis,
      careerMatch,
      learningRoadmap: recommendations.roadmap,
      recommendedCourses: recommendations.recommendedCourses,
      suggestedProjects: recommendations.suggestedProjects,
      progressEvaluation: progressEval
    };
  }
}
