// DeepSeek R1 API Configuration
// Using DeepSeek R1 API for enhanced AI-powered resume analysis

export const DEEPSEEK_API_KEY = "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";
export const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

/**
 * Analyze resume text using DeepSeek R1 API with detailed suggestions and snippets
 * @param {string} resumeText - The resume text to analyze
 * @returns {Promise<Object>} Analysis results with scores, advice, strengths, and improvements
 */
export const analyzeResumeWithDeepSeek = async (resumeText) => {
  try {
    // Truncate resume text if too long (API has token limits)
    const maxLength = 15000;
    const truncatedText = resumeText.length > maxLength 
      ? resumeText.substring(0, maxLength) + "\n\n[Content truncated for analysis...]"
      : resumeText;

    const prompt = `You are an expert resume reviewer, career coach, and ATS (Applicant Tracking System) specialist with 15+ years of experience. Your task is to provide a comprehensive, detailed analysis of the following resume.

RESUME TEXT:
${truncatedText}

ANALYSIS REQUIREMENTS:

1. Provide scores (0-100) for each category based on industry standards
2. Include SPECIFIC EXAMPLES and SNIPPETS from the resume in your feedback
3. Give actionable, detailed recommendations
4. Be constructive and professional

Please provide your analysis in the following JSON format (CRITICAL: Return ONLY valid JSON, no markdown, no code blocks):

{
  "total": <overall score 0-100>,
  "breakdown": {
    "Content Quality": <score 0-100>,
    "Format & Structure": <score 0-100>,
    "Keyword Optimization": <score 0-100>,
    "ATS Compatibility": <score 0-100>,
    "Achievement Impact": <score 0-100>,
    "Professional Tone": <score 0-100>
  },
  "advice": [
    {
      "title": "<specific recommendation title>",
      "description": "<detailed explanation with specific examples from the resume>",
      "snippet": "<exact quote or example from resume if applicable>",
      "suggestion": "<specific action to take>"
    }
  ],
  "strengths": [
    {
      "title": "<strength title>",
      "description": "<why this is a strength with specific examples>",
      "snippet": "<exact quote from resume demonstrating this strength>"
    }
  ],
  "improvements": [
    {
      "title": "<area to improve>",
      "description": "<detailed explanation of what needs improvement>",
      "snippet": "<exact quote from resume showing the issue>",
      "suggestion": "<specific improvement recommendation>"
    }
  ],
  "summary": "<2-3 sentence comprehensive summary of overall resume quality and key takeaways>"
}

IMPORTANT GUIDELINES:
- Extract actual snippets/quotes from the resume when providing examples
- Be specific: Instead of "add metrics", say "add metrics like 'increased sales by 25%' similar to your 'managed team of 10' achievement"
- For each advice/improvement, include the exact text from the resume that needs work
- For strengths, quote the exact text that demonstrates the strength
- Make recommendations actionable and specific
- Consider ATS scanning: check for proper formatting, keywords, and structure
- Evaluate professional tone: check for appropriate language and presentation

Return ONLY the JSON object, no additional text before or after.`;

    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "You are an expert resume reviewer. Always respond with valid JSON only."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("DeepSeek API error response:", errorText);
      throw new Error(`DeepSeek API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Extract the generated text
    const generatedText = data.choices?.[0]?.message?.content || "";
    
    if (!generatedText) {
      throw new Error("No response from DeepSeek API");
    }

    // Try to extract JSON from the response
    let jsonText = generatedText.trim();
    
    // Remove markdown code blocks if present
    jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?/g, "");
    
    // Remove any leading/trailing whitespace or text
    jsonText = jsonText.trim();
    
    // Try to find JSON object in the text
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonText = jsonMatch[0];
    }

    // Parse the JSON
    let analysis;
    try {
      analysis = JSON.parse(jsonText);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      console.error("Raw response:", generatedText);
      throw new Error("Failed to parse DeepSeek API response as JSON");
    }

    // Normalize the structure - handle both old format (strings) and new format (objects)
    const normalizeAdvice = (item) => {
      if (typeof item === 'string') {
        return {
          title: item.split(':')[0] || item.substring(0, 50),
          description: item,
          snippet: "",
          suggestion: item
        };
      }
      return {
        title: item.title || item.description?.substring(0, 50) || "Recommendation",
        description: item.description || item.suggestion || item,
        snippet: item.snippet || "",
        suggestion: item.suggestion || item.description || item
      };
    };

    const normalizeStrength = (item) => {
      if (typeof item === 'string') {
        return {
          title: item.split(':')[0] || item.substring(0, 50),
          description: item,
          snippet: ""
        };
      }
      return {
        title: item.title || item.description?.substring(0, 50) || "Strength",
        description: item.description || item,
        snippet: item.snippet || ""
      };
    };

    const normalizeImprovement = (item) => {
      if (typeof item === 'string') {
        return {
          title: item.split(':')[0] || item.substring(0, 50),
          description: item,
          snippet: "",
          suggestion: item
        };
      }
      return {
        title: item.title || item.description?.substring(0, 50) || "Improvement",
        description: item.description || item.suggestion || item,
        snippet: item.snippet || "",
        suggestion: item.suggestion || item.description || item
      };
    };

    // Validate and ensure all required fields exist
    const advice = Array.isArray(analysis.advice) 
      ? analysis.advice.map(normalizeAdvice)
      : [{
          title: "General Review",
          description: "Review and refine your resume content for better impact",
          snippet: "",
          suggestion: "Review and refine your resume content for better impact"
        }];

    const strengths = Array.isArray(analysis.strengths)
      ? analysis.strengths.map(normalizeStrength)
      : [{
          title: "Professional Presentation",
          description: "Your resume demonstrates professional presentation",
          snippet: ""
        }];

    const improvements = Array.isArray(analysis.improvements)
      ? analysis.improvements.map(normalizeImprovement)
      : [{
          title: "Continue Refining",
          description: "Continue refining for maximum impact",
          snippet: "",
          suggestion: "Continue refining for maximum impact"
        }];

    return {
      total: Math.min(100, Math.max(0, analysis.total || 70)),
      breakdown: {
        "Content Quality": Math.min(100, Math.max(0, analysis.breakdown?.["Content Quality"] || 70)),
        "Format & Structure": Math.min(100, Math.max(0, analysis.breakdown?.["Format & Structure"] || 70)),
        "Keyword Optimization": Math.min(100, Math.max(0, analysis.breakdown?.["Keyword Optimization"] || 70)),
        "ATS Compatibility": Math.min(100, Math.max(0, analysis.breakdown?.["ATS Compatibility"] || 70)),
        "Achievement Impact": Math.min(100, Math.max(0, analysis.breakdown?.["Achievement Impact"] || 70)),
        "Professional Tone": Math.min(100, Math.max(0, analysis.breakdown?.["Professional Tone"] || 70))
      },
      advice: advice,
      strengths: strengths,
      improvements: improvements,
      summary: analysis.summary || "Good foundation with room for improvement.",
      isRealAnalysis: true,
      aiModel: "DeepSeek R1"
    };
  } catch (error) {
    console.error("Error calling DeepSeek API:", error);
    throw error;
  }
};

