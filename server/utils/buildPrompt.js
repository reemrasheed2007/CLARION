export function buildPrompt(topic, articles) {
  const articleBlock = articles.map((a, i) =>
    `[${i + 1}] SOURCE: ${a.source}
TITLE: ${a.title}
SUMMARY: ${a.description}`
  ).join('\n\n');

  return `You are a neutral AI media analyst specializing in identifying bias, propaganda, and narrative framing in global news coverage.

TOPIC: "${topic}"

ARTICLES FROM GLOBAL SOURCES:
${articleBlock}

Your task is to analyze these articles and produce a structured intelligence report. 

Respond ONLY with valid JSON matching this EXACT schema (no markdown, no code fences, just raw JSON):

{
  "neutralSummary": "A balanced 3-4 sentence factual summary of what is actually happening, stripping away editorial spin.",
  "consensusFacts": [
    "Fact agreed upon by most sources",
    "Another consensus fact"
  ],
  "contestedClaims": [
    {
      "claim": "A claim that is disputed between sources",
      "supportedBy": ["Source Name A", "Source Name B"],
      "disputedBy": ["Source Name C"],
      "context": "Brief explanation of why this is contested"
    }
  ],
  "regionalNarratives": [
    {
      "region": "Western Media",
      "framing": "How this region's outlets frame the story",
      "tone": "positive|negative|neutral|alarmist|dismissive",
      "outlets": ["Outlet1", "Outlet2"]
    }
  ],
  "biasSignals": [
    {
      "outlet": "Source Name",
      "signal": "Specific bias observed (e.g., loaded language, omission of facts, framing)",
      "severity": "low|medium|high",
      "example": "Quote or paraphrase demonstrating the bias"
    }
  ],
  "overallBiasScore": 45,
  "topKeywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "recommendedSources": ["Source with most balanced coverage"]
}

Be rigorous. If sources are largely factual, say so. If heavy propaganda is detected, flag it clearly.`;
}
