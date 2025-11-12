/**
 * Advanced ATS (Applicant Tracking System) Scoring
 * Analyzes resume for ATS compatibility and provides detailed scoring
 */

// Common ATS keywords by category
const KEYWORD_CATEGORIES = {
  technical: ['javascript', 'python', 'java', 'react', 'node', 'sql', 'api', 'git', 'docker', 'aws', 'cloud', 'agile', 'scrum'],
  soft: ['leadership', 'communication', 'teamwork', 'problem-solving', 'collaboration', 'analytical', 'creative'],
  action: ['developed', 'implemented', 'created', 'managed', 'led', 'improved', 'optimized', 'designed', 'built'],
  quantifiable: ['%', 'increased', 'decreased', 'reduced', 'improved', 'achieved', 'delivered']
};

/**
 * Calculate comprehensive ATS score
 */
export const calculateATSScore = (resumeData) => {
  const scores = {
    overall: 0,
    keywords: 0,
    format: 0,
    structure: 0,
    content: 0,
    contact: 0
  };

  const warnings = [];
  const suggestions = [];

  // 1. Contact Information (20 points)
  const personalInfo = resumeData.personalInfo || {};
  if (personalInfo.email) scores.contact += 5;
  if (personalInfo.phone) scores.contact += 5;
  if (personalInfo.linkedin) scores.contact += 5;
  if (personalInfo.address) scores.contact += 5;
  else warnings.push('Missing address may reduce ATS compatibility');

  // 2. Keywords Analysis (30 points)
  const allText = extractAllText(resumeData).toLowerCase();
  let keywordCount = 0;
  
  Object.values(KEYWORD_CATEGORIES).flat().forEach(keyword => {
    if (allText.includes(keyword)) keywordCount++;
  });

  scores.keywords = Math.min(30, (keywordCount / 20) * 30);
  if (scores.keywords < 15) {
    warnings.push('Low keyword density - add more relevant industry keywords');
    suggestions.push('Include specific technologies, tools, and methodologies');
  }

  // 3. Format & Structure (25 points)
  if (resumeData.personalInfo?.summary) scores.format += 5;
  if (resumeData.experience?.length > 0) scores.format += 10;
  if (resumeData.education?.length > 0) scores.format += 5;
  if (resumeData.skills?.technical?.length > 0) scores.format += 5;

  // Check for proper date formatting
  const hasProperDates = resumeData.experience?.some(exp => 
    exp.startDate && /^\d{4}-\d{2}|^\d{2}\/\d{4}/.test(exp.startDate)
  );
  if (hasProperDates) scores.structure += 5;
  else warnings.push('Use consistent date format (MM/YYYY or YYYY-MM)');

  // 4. Content Quality (15 points)
  const hasQuantifiable = allText.match(/\d+%|\d+\s*(years?|months?|people|users|projects)/gi);
  if (hasQuantifiable) scores.content += 10;
  else {
    warnings.push('Add quantifiable achievements (numbers, percentages, metrics)');
    suggestions.push('Include specific results: "Increased sales by 25%" or "Managed team of 10"');
  }

  if (personalInfo.summary && personalInfo.summary.length > 100) scores.content += 5;
  else warnings.push('Professional summary should be 100-200 words');

  // 5. Structure (10 points)
  const sections = ['experience', 'education', 'skills'];
  const hasAllSections = sections.every(section => {
    if (section === 'skills') return resumeData.skills?.technical?.length > 0;
    return resumeData[section]?.length > 0;
  });

  if (hasAllSections) scores.structure += 10;
  else warnings.push('Missing essential sections');

  // Calculate overall score
  scores.overall = Math.round(
    scores.contact + scores.keywords + scores.format + scores.content + scores.structure
  );

  // Additional checks
  if (allText.length < 300) {
    warnings.push('Resume is too short - aim for 400-800 words');
  }

  if (allText.length > 1200) {
    warnings.push('Resume is too long - keep it concise (1-2 pages)');
  }

  // Check for action verbs
  const actionVerbs = KEYWORD_CATEGORIES.action.filter(verb => allText.includes(verb));
  if (actionVerbs.length < 5) {
    suggestions.push('Use more action verbs: developed, implemented, created, managed, led');
  }

  return {
    score: scores.overall,
    breakdown: {
      contact: scores.contact,
      keywords: scores.keywords,
      format: scores.format,
      content: scores.content,
      structure: scores.structure
    },
    warnings,
    suggestions,
    keywordCount,
    actionVerbs: actionVerbs.length
  };
};

/**
 * Extract all text from resume data
 */
const extractAllText = (resumeData) => {
  let text = '';

  // Personal info
  if (resumeData.personalInfo) {
    text += `${resumeData.personalInfo.fullName || ''} `;
    text += `${resumeData.personalInfo.summary || ''} `;
  }

  // Experience
  if (resumeData.experience) {
    resumeData.experience.forEach(exp => {
      text += `${exp.jobTitle || ''} ${exp.company || ''} `;
      text += `${exp.responsibilities?.join(' ') || ''} `;
      text += `${exp.achievements || ''} `;
    });
  }

  // Education
  if (resumeData.education) {
    resumeData.education.forEach(edu => {
      text += `${edu.degree || ''} ${edu.institution || ''} `;
      text += `${edu.coursework || ''} `;
    });
  }

  // Skills
  if (resumeData.skills) {
    text += `${resumeData.skills.technical?.join(' ') || ''} `;
    text += `${resumeData.skills.soft?.join(' ') || ''} `;
  }

  // Projects
  if (resumeData.projects) {
    resumeData.projects.forEach(proj => {
      text += `${proj.name || ''} ${proj.description || ''} `;
    });
  }

  return text;
};

/**
 * Get keyword suggestions based on job description
 */
export const getKeywordSuggestions = (resumeData, jobDescription = '') => {
  const resumeText = extractAllText(resumeData).toLowerCase();
  const jdText = jobDescription.toLowerCase();
  
  const suggestions = [];
  const missingKeywords = [];

  // Extract keywords from job description
  const jdKeywords = jdText.match(/\b\w{4,}\b/g) || [];
  const uniqueJdKeywords = [...new Set(jdKeywords)];

  // Find missing keywords
  uniqueJdKeywords.forEach(keyword => {
    if (!resumeText.includes(keyword) && keyword.length > 4) {
      missingKeywords.push(keyword);
    }
  });

  // Suggest top 10 missing keywords
  const topMissing = missingKeywords
    .filter(kw => !['the', 'with', 'this', 'that', 'from', 'have', 'will', 'your', 'their'].includes(kw))
    .slice(0, 10);

  return {
    missing: topMissing,
    suggestions: topMissing.map(kw => `Consider adding "${kw}" if relevant to your experience`)
  };
};

/**
 * Validate resume format for ATS
 */
export const validateATSFormat = (resumeData) => {
  const errors = [];
  const warnings = [];

  // Check for special characters that might break ATS
  const specialChars = /[^\w\s\-.,;:()@\/]/g;
  const allText = extractAllText(resumeData);
  if (specialChars.test(allText)) {
    warnings.push('Avoid special characters like @, #, $, % in body text');
  }

  // Check for proper section headers
  if (!resumeData.personalInfo?.summary) {
    warnings.push('Add a Professional Summary section');
  }

  // Check experience formatting
  resumeData.experience?.forEach((exp, index) => {
    if (!exp.jobTitle || !exp.company) {
      errors.push(`Experience ${index + 1}: Missing job title or company`);
    }
    if (!exp.startDate) {
      warnings.push(`Experience ${index + 1}: Missing start date`);
    }
  });

  return { errors, warnings, isValid: errors.length === 0 };
};

