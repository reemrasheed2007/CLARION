// ──────────────────────────────────────────────────────────────────────────
// Pre-built analyses per topic + a generic builder for unknown queries.
// Returned by the prototype geminiService instead of calling Gemini.
// ──────────────────────────────────────────────────────────────────────────

const MODEL = 'clarion-prototype-v1';

export const ANALYSES = {
  gaza: {
    neutralSummary:
      'Diplomatic efforts mediated by Qatar and Egypt continue to advance a phased ceasefire-and-hostage framework, while military operations and humanitarian conditions in the strip remain at the center of competing narratives. Western, Israeli, and regional outlets converge on the existence of negotiations and the broad scope of a 60-day humanitarian pause, but diverge sharply on attribution of casualty figures, framing of aid obstruction, and the long-term political settlement.',
    consensusFacts: [
      'Mediation efforts led by Qatar, Egypt, and the United States are ongoing and have produced a draft ceasefire framework.',
      'A multi-phase humanitarian pause and hostage-prisoner exchange is the central architecture of current proposals.',
      'Humanitarian conditions in northern Gaza meet IPC catastrophic-level food insecurity criteria according to UN agencies.',
      'Reconstruction cost estimates for Gaza now range between $50B and $80B over a 10–15 year horizon.',
      'Multiple European nations have formally recognized a Palestinian state in the past 24 months.',
    ],
    contestedClaims: [
      {
        claim: 'Total Palestinian casualty figures published by Gaza health ministry are accurate.',
        supportedBy: ['Al Jazeera', 'The Guardian', 'Le Monde'],
        disputedBy: ['Times of Israel', 'Wall Street Journal'],
        context: 'Israeli officials dispute methodology and combatant-civilian distinction; UN bodies generally cite the figures with caveats.',
      },
      {
        claim: 'Aid obstruction at northern crossings is "deliberate" and weaponized.',
        supportedBy: ['The Guardian', 'Al Jazeera'],
        disputedBy: ['Times of Israel', 'Israeli officials'],
        context: 'Aid agencies cite operational data; Israeli authorities point to security inspections and cross-border logistics.',
      },
      {
        claim: 'Hamas tunnel infrastructure has been "largely dismantled" in southern Gaza.',
        supportedBy: ['Times of Israel', 'IDF spokesperson'],
        disputedBy: ['Al Jazeera', 'independent OSINT analysts'],
        context: 'Independent verification is difficult; figures cited by IDF have not been corroborated by neutral observers.',
      },
    ],
    regionalNarratives: [
      { region: 'Western Media', framing: 'Diplomacy-and-stability frame, foregrounding negotiation mechanics and humanitarian baseline', tone: 'neutral', outlets: ['Reuters', 'BBC', 'AP', 'NYT'] },
      { region: 'European Media', framing: 'Critical of conduct, leaning on legal-rights and reconstruction-financing angles', tone: 'measured', outlets: ['Le Monde', 'The Guardian', 'DW', 'El País'] },
      { region: 'Israeli Media', framing: 'Domestic political and security framing; internal dissent visible in opinion sections', tone: 'mixed', outlets: ['Haaretz', 'Times of Israel'] },
      { region: 'Regional/Arab Media', framing: 'Civilian impact and accountability foregrounded; regional reconstruction posture emphasized', tone: 'critical', outlets: ['Al Jazeera', 'Al Arabiya'] },
      { region: 'Eastern Media', framing: 'Multilateralism and two-state reframing; lower domestic salience', tone: 'measured', outlets: ['Xinhua', 'Asahi Shimbun', 'Times of India'] },
    ],
    biasSignals: [
      { outlet: 'Al Jazeera', signal: 'Persistent emphasis on civilian casualty figures without consistent attribution caveats', severity: 'medium', example: '"Death toll surpasses 47,000" cited as standalone figure in headline.' },
      { outlet: 'Times of Israel', signal: 'Sourcing skewed heavily toward military and government spokespersons', severity: 'medium', example: 'IDF claim of 90% tunnel reduction reported without independent counter-source.' },
      { outlet: 'The Guardian', signal: 'Loaded language in headlines describing aid access ("deliberate", "weaponized")', severity: 'low', example: '"Aid agencies decry deliberate obstruction" attributes intent in headline voice.' },
      { outlet: 'Xinhua', signal: 'Selective framing emphasizing Western "unilateralism" while omitting domestic critique', severity: 'medium', example: 'Coverage of US position foregrounds disagreement; Russian and Iranian positions absent.' },
    ],
    overallBiasScore: 62,
    topKeywords: ['ceasefire', 'humanitarian aid', 'reconstruction', 'hostages', 'two-state', 'Rafah', 'IDF'],
    recommendedSources: ['Reuters', 'BBC', 'Associated Press', 'Bloomberg', 'Asahi Shimbun'],
    modelUsed: MODEL,
  },

  ukraine: {
    neutralSummary:
      'Active combat continues across multiple fronts with Russia making incremental gains east of Pokrovsk while Ukraine focuses on stabilizing defensive lines and protecting critical infrastructure from drone and missile barrages. Western military and financial support continues to flow under the recently agreed €50B EU package, but mobilization pressures and energy-grid vulnerability are becoming structural concerns. Eastern and Global South outlets remain notably more reserved than Western and European coverage on attribution and prospect framing.',
    consensusFacts: [
      'Active fighting continues across multiple sectors of the Donetsk front, with both sides reporting equipment losses.',
      'Ukrainian energy infrastructure has sustained significant damage from sustained drone and missile attacks.',
      'The EU €50B four-year support package has been formally approved and is being disbursed in tranches.',
      'Russian-affiliated military operations have expanded across multiple West African nations through successor entities.',
      'IAEA inspectors continue regular rotations at the Zaporizhzhia nuclear power plant.',
    ],
    contestedClaims: [
      {
        claim: 'Russia is on track to achieve its operational objectives in Donbas in 2026.',
        supportedBy: ['RIA Novosti', 'Russian defense ministry briefings'],
        disputedBy: ['BBC', 'Reuters', 'AP', 'Ukrainian general staff'],
        context: 'Russian sources frame incremental gains as strategic; Western analysts emphasize cost-to-territory ratios.',
      },
      {
        claim: 'Western sanctions on Russian oil have meaningfully constrained federal revenue.',
        supportedBy: ['Bloomberg', 'Financial Times'],
        disputedBy: ['independent oil-flow trackers', 'Treasury data caveats'],
        context: 'Price cap erosion and shadow-fleet expansion have reduced effective enforcement, per recent Treasury data.',
      },
      {
        claim: 'Use of frozen Russian sovereign assets to back Ukraine bonds is legally robust.',
        supportedBy: ['EU Commission officials', 'select legal scholars'],
        disputedBy: ['ECB', 'Belgian central bank', 'Russian government'],
        context: 'Legal architecture remains debated; precedent for state-asset repurposing is limited.',
      },
    ],
    regionalNarratives: [
      { region: 'Western Media', framing: 'Resilience and Western-coalition cohesion foregrounded', tone: 'neutral', outlets: ['Reuters', 'BBC', 'AP', 'NYT'] },
      { region: 'European Media', framing: 'Investment-and-policy frame emphasizing EU institutional commitments', tone: 'sympathetic', outlets: ['The Guardian', 'Le Monde', 'DW', 'El País'] },
      { region: 'Russian Media', framing: 'Tactical-gains and "denazification" framing; sanction impact downplayed', tone: 'supportive', outlets: ['RIA Novosti'] },
      { region: 'Eastern Media', framing: 'Sanctions implementation and trade-flow technicalities foregrounded', tone: 'neutral', outlets: ['Xinhua', 'Asahi Shimbun', 'Times of India'] },
      { region: 'Global South Media', framing: 'Alternative diplomatic frameworks and food-security spillovers emphasized', tone: 'measured', outlets: ['Al Jazeera'] },
    ],
    biasSignals: [
      { outlet: 'RIA Novosti', signal: 'Government-aligned framing with selective casualty and territorial claims', severity: 'high', example: 'Claims of captured villages reported without independent verification or caveat.' },
      { outlet: 'The Guardian', signal: 'Sympathetic framing in headline voice; OSINT findings presented as conclusive', severity: 'low', example: 'Civilian-targeting investigation headline omits "alleged" qualifier.' },
      { outlet: 'Xinhua', signal: 'Repetition of "objective and impartial" framing while omitting Chinese military-component flow allegations', severity: 'medium', example: 'Foreign ministry rebuttal presented without third-party context.' },
    ],
    overallBiasScore: 54,
    topKeywords: ['drone attacks', 'energy grid', 'EU aid', 'frozen assets', 'mobilization', 'Donbas'],
    recommendedSources: ['Reuters', 'BBC', 'Associated Press', 'Asahi Shimbun', 'Bloomberg'],
    modelUsed: MODEL,
  },

  china: {
    neutralSummary:
      'A new round of US tariffs on Chinese strategic-sector exports has triggered Beijing\'s tightening of rare-earth export licensing, intensifying a tit-for-tat cycle now reflected in record WTO dispute filings. Coverage broadly agrees on the facts of escalation but diverges on framing: Western outlets emphasize industrial policy and supply-chain restructuring costs, Chinese state media frame US measures as "unilateral protectionism," and European outlets occupy a middle ground focused on subsidy alignment and regulatory autonomy.',
    consensusFacts: [
      'The US has imposed new 25% tariffs on Chinese EVs, batteries, and selected solar components.',
      'China responded with expanded case-by-case licensing requirements for rare-earth exports.',
      'WTO dispute filings between the US and China are at decade-high levels.',
      'Major manufacturers continue accelerating "China+1" diversification, particularly to Vietnam, India, and Mexico.',
      'EU provisional duties on Chinese EVs have been extended pending negotiated outcome.',
    ],
    contestedClaims: [
      {
        claim: 'China has achieved domestic 5nm-class semiconductor production capability.',
        supportedBy: ['Global Times', 'Xinhua'],
        disputedBy: ['independent industry analysts', 'Wall Street Journal'],
        context: 'Yield, cost, and equipment provenance remain unverified; SMIC has not publicly confirmed.',
      },
      {
        claim: 'US tariffs deliver net economic benefit to American manufacturing.',
        supportedBy: ['US Treasury statements'],
        disputedBy: ['IMF working papers', 'Financial Times', 'Bloomberg'],
        context: 'Recent IMF research estimates fragmentation costs at up to 7% of long-run global GDP.',
      },
      {
        claim: 'Belt and Road investment has shifted decisively toward green and renewable projects.',
        supportedBy: ['Xinhua'],
        disputedBy: ['independent BRI trackers'],
        context: 'Self-reported figures are not independently audited; methodology lacks transparency.',
      },
    ],
    regionalNarratives: [
      { region: 'Western Media', framing: 'Industrial-policy and supply-chain restructuring lens', tone: 'neutral', outlets: ['Reuters', 'WSJ', 'Bloomberg', 'NYT', 'FT'] },
      { region: 'Chinese State Media', framing: 'Self-reliance and anti-protectionism framing', tone: 'supportive', outlets: ['Xinhua', 'Global Times', 'SCMP'] },
      { region: 'European Media', framing: 'Strategic-autonomy and regulatory-alignment angle', tone: 'measured', outlets: ['Le Monde', 'DW', 'El País'] },
      { region: 'Eastern Media', framing: 'Beneficiary-of-displacement framing for India/Japan/SE Asia', tone: 'neutral', outlets: ['Asahi Shimbun', 'Times of India'] },
      { region: 'Regional Media', framing: 'Non-alignment and transactional posture', tone: 'measured', outlets: ['Al Jazeera'] },
    ],
    biasSignals: [
      { outlet: 'Global Times', signal: 'State-aligned editorial voice; technical claims unverified', severity: 'high', example: 'Semiconductor capability declaration without yield data.' },
      { outlet: 'Wall Street Journal', signal: 'Editorial framing of US trade actions favorably in opinion adjacent to news', severity: 'low', example: 'Mixed news/opinion placement on tariff effectiveness.' },
      { outlet: 'Xinhua', signal: 'Omission of dissenting domestic voices on trade-policy costs', severity: 'medium', example: 'No coverage of Chinese exporter community concerns over restrictions.' },
    ],
    overallBiasScore: 58,
    topKeywords: ['tariffs', 'rare earths', 'semiconductors', 'supply chain', 'WTO', 'China+1', 'EV'],
    recommendedSources: ['Reuters', 'BBC', 'Bloomberg', 'Financial Times', 'Asahi Shimbun'],
    modelUsed: MODEL,
  },

  ai: {
    neutralSummary:
      'Enforcement of the EU AI Act for general-purpose models has begun while major frontier labs report continued revenue and capability acceleration. Coverage is broadly factual on commercial milestones but diverges on regulation, energy use, copyright disputes, and the social impact of AI integration in white- and blue-collar work. The most contested ground concerns synthetic-media regulation, frontier-safety evaluations, and the geopolitics of compute access.',
    consensusFacts: [
      'The EU AI Act\'s general-purpose model provisions have entered enforcement.',
      'Anthropic raised ~$5B at a ~$40B valuation; OpenAI revenue run-rate crossed $10B.',
      'Major labs face consolidated copyright litigation in US federal court.',
      'Nvidia data-center revenue continues to grow at >70% YoY.',
      'Synthetic-media disclosure rules now diverge meaningfully across major jurisdictions.',
    ],
    contestedClaims: [
      {
        claim: 'AI energy demand will materially constrain grid capacity by 2030.',
        supportedBy: ['IEA reports', 'utility planners'],
        disputedBy: ['McKinsey forecasts', 'large hyperscaler statements'],
        context: 'Estimates for 2030 incremental data-center load now span a 350TWh range.',
      },
      {
        claim: 'Open-source models have closed the capability gap with leading proprietary systems.',
        supportedBy: ['Xinhua coverage of Qwen and DeepSeek'],
        disputedBy: ['leading benchmark organizations', 'Wall Street Journal'],
        context: 'Benchmark performance varies by task; safety and reliability metrics often differ.',
      },
      {
        claim: 'EU AI Act sets globally exportable regulatory norm.',
        supportedBy: ['Le Monde', 'DW'],
        disputedBy: ['Asahi Shimbun', 'industry analysts in Japan and US'],
        context: 'Japan, UK, and Singapore have publicly chosen distinct soft-law approaches.',
      },
    ],
    regionalNarratives: [
      { region: 'Western Media', framing: 'Capability, capital, and competitive-dynamics frame', tone: 'neutral', outlets: ['Reuters', 'WSJ', 'Bloomberg', 'NYT', 'FT'] },
      { region: 'European Media', framing: 'Rights, regulation, and sovereign-AI framing', tone: 'measured', outlets: ['Le Monde', 'DW', 'The Guardian'] },
      { region: 'Eastern Media', framing: 'National-strategy and adoption framing; less safety emphasis', tone: 'supportive', outlets: ['Xinhua', 'Asahi Shimbun', 'Times of India'] },
      { region: 'Regional Media', framing: 'Multilingual model and regional infrastructure investments', tone: 'measured', outlets: ['Al Jazeera'] },
    ],
    biasSignals: [
      { outlet: 'The Guardian', signal: 'Workplace-impact framing without quantitative balance', severity: 'low', example: 'Surveillance-focused headline omits productivity-gain studies.' },
      { outlet: 'Xinhua', signal: 'Promotional framing of domestic models; absence of safety critique', severity: 'medium', example: 'Benchmark coverage cites leaderboards without independent evaluation context.' },
      { outlet: 'Wall Street Journal', signal: 'Capital-markets centric coverage; under-attention to labor and rights impacts', severity: 'low', example: 'Restructuring story omits worker perspective.' },
    ],
    overallBiasScore: 41,
    topKeywords: ['EU AI Act', 'frontier models', 'compute', 'copyright', 'agents', 'open source'],
    recommendedSources: ['Reuters', 'Financial Times', 'Bloomberg', 'BBC', 'Asahi Shimbun'],
    modelUsed: MODEL,
  },

  climate: {
    neutralSummary:
      'The WMO has confirmed 2025 as the warmest year on record and the IPCC-aligned consensus around continued rapid warming holds across nearly all outlets. Disagreement and editorial spin emerge on policy responses: the credibility of corporate transition pledges, the pace of fossil-fuel project pipelines, the design of carbon-border mechanisms, and the speed of green-tech subsidy alignment between blocs.',
    consensusFacts: [
      '2025 was the warmest year on record per WMO, with anomaly above 1.5°C pre-industrial baseline.',
      'Global EV sales crossed 20 million units in 2025, up 32% YoY.',
      'Brazilian Amazon deforestation fell to a 16-year low.',
      'COP31 host city has been formally selected.',
      'Methane satellite data has identified ~1,200 super-emitting sites globally.',
    ],
    contestedClaims: [
      {
        claim: 'Major oil companies remain on track to meet stated 2030 transition targets.',
        supportedBy: ['oil-company sustainability reports'],
        disputedBy: ['The Guardian', 'independent climate-finance researchers'],
        context: 'Cross-border investigation finds upstream capex shifts inconsistent with transition pace.',
      },
      {
        claim: 'Voluntary carbon-market reforms have restored credit-quality credibility.',
        supportedBy: ['Bloomberg', 'integrity-council statements'],
        disputedBy: ['NGO market observers'],
        context: 'Recovery is concentrated in select project categories; majority of older credits remain disputed.',
      },
      {
        claim: 'Carbon-border adjustments will avoid downstream WTO challenges.',
        supportedBy: ['EU Commission'],
        disputedBy: ['China', 'India', 'several emerging-market exporters'],
        context: 'Multiple consultation requests filed at WTO under environmental-protection exceptions.',
      },
    ],
    regionalNarratives: [
      { region: 'Western Media', framing: 'Investment, technology, and macro-impact lens', tone: 'neutral', outlets: ['Reuters', 'Bloomberg', 'FT', 'WSJ'] },
      { region: 'European Media', framing: 'Policy, regulation, and energy-transition urgency', tone: 'sympathetic', outlets: ['Le Monde', 'DW', 'The Guardian', 'El País'] },
      { region: 'Eastern Media', framing: 'Renewable-build-out and industrial competitiveness', tone: 'supportive', outlets: ['Xinhua', 'Asahi Shimbun'] },
      { region: 'Regional Media', framing: 'Climate-justice, vulnerability, and finance framing', tone: 'critical', outlets: ['Al Jazeera'] },
    ],
    biasSignals: [
      { outlet: 'The Guardian', signal: 'Strong editorial framing in environmental section', severity: 'low', example: '"Pledges quietly trimmed" headline embeds investigative conclusion.' },
      { outlet: 'Xinhua', signal: 'Domestic policy framed positively; gap between aspiration and execution under-discussed', severity: 'low', example: 'Coal-pipeline coverage absent from emissions-cap announcement story.' },
      { outlet: 'Wall Street Journal', signal: 'Editorial skepticism toward transition costs in opinion section', severity: 'low', example: 'Carbon-border adjustment stories highlight cost without comparable benefit framing.' },
    ],
    overallBiasScore: 38,
    topKeywords: ['1.5°C', 'COP31', 'carbon border', 'EV', 'methane', 'reconstruction', 'transition'],
    recommendedSources: ['Reuters', 'BBC', 'Bloomberg', 'Financial Times', 'Asahi Shimbun'],
    modelUsed: MODEL,
  },

  iran: {
    neutralSummary:
      'Iran\'s nuclear program continues to expand toward weapons-grade enrichment thresholds while diplomatic engagement via Oman remains the primary back-channel. Coverage across regions agrees on the technical facts as reported by the IAEA but diverges sharply on the credibility of negotiation, the proportionality of military options, and the regional security implications of Iran\'s evolving partnerships with Russia and China.',
    consensusFacts: [
      'IAEA reports continued accumulation of near-weapons-grade enriched uranium.',
      'Oman is the primary mediating channel for current US-Iran exchanges.',
      'Iran-Saudi consular relations have been restored to pre-2016 staffing levels.',
      'Iranian crude exports have reached a five-year high, mostly to Chinese buyers.',
      'A reformist president (Pezeshkian) won the 2024 runoff election.',
    ],
    contestedClaims: [
      {
        claim: 'A military strike on Iranian enrichment sites would meaningfully delay weapons capability.',
        supportedBy: ['Times of Israel', 'cabinet-aligned analysts'],
        disputedBy: ['Haaretz op-eds by former intelligence officials', 'most US assessments'],
        context: 'Former Mossad chief publicly calls strike a "high-cost gamble".',
      },
      {
        claim: 'Snapback of UN sanctions remains a viable tool.',
        supportedBy: ['Financial Times', 'select EU diplomats'],
        disputedBy: ['Russia', 'China', 'Iranian foreign ministry'],
        context: 'Legal and procedural questions over post-October trigger remain unresolved.',
      },
      {
        claim: 'Iran-backed regional networks have been weakened by sanctions.',
        supportedBy: ['Al Arabiya', 'select Western statements'],
        disputedBy: ['NYT investigation', 'IRGC-linked sources'],
        context: 'Investigation maps continued weapons flows despite enforcement intensification.',
      },
    ],
    regionalNarratives: [
      { region: 'Western Media', framing: 'Verification, diplomacy, and proliferation lens', tone: 'neutral', outlets: ['Reuters', 'BBC', 'NYT'] },
      { region: 'Israeli Media', framing: 'Existential-threat framing with internal dissent visible', tone: 'mixed', outlets: ['Times of Israel', 'Haaretz'] },
      { region: 'European Media', framing: 'Diplomacy-and-snapback technicalities', tone: 'measured', outlets: ['Le Monde', 'DW', 'The Guardian'] },
      { region: 'Eastern Media', framing: 'SCO and BRICS expansion lens', tone: 'supportive', outlets: ['Xinhua'] },
      { region: 'Regional Media', framing: 'Gulf-rapprochement and stability framing', tone: 'measured', outlets: ['Al Jazeera', 'Al Arabiya'] },
    ],
    biasSignals: [
      { outlet: 'Times of Israel', signal: 'Military-option framing presented uncritically', severity: 'medium', example: 'Cabinet briefing relayed without strategic-cost assessment.' },
      { outlet: 'Xinhua', signal: 'SCO expansion framed positively; absence of human-rights coverage', severity: 'medium', example: 'No coverage of women\'s rights crackdown in same week.' },
      { outlet: 'Al Jazeera', signal: 'Selective sourcing favoring regional state perspectives', severity: 'low', example: 'Gulf rapprochement story relies primarily on official spokespeople.' },
    ],
    overallBiasScore: 56,
    topKeywords: ['enrichment', 'JCPOA', 'snapback', 'IAEA', 'Hormuz', 'Pezeshkian', 'sanctions'],
    recommendedSources: ['Reuters', 'BBC', 'Bloomberg', 'Financial Times', 'Asahi Shimbun'],
    modelUsed: MODEL,
  },

  taiwan: {
    neutralSummary:
      'Cross-strait tensions remain elevated with the largest PLA naval and air exercises since 2024 occurring alongside continued normalization of cross-strait economic and tourism flows. Coverage broadly converges on military activity facts but diverges on framing of intent, the economic resilience of TSMC, and the prospect of armed conflict. Eastern outlets emphasize "fellow countrymen" and external interference; Western outlets emphasize defense posture and supply-chain risk.',
    consensusFacts: [
      'PLA conducted largest cross-strait military exercise since 2024.',
      'TSMC\'s second Arizona fabrication plant remains on schedule for 2026 production.',
      'Taiwan\'s 2026 defense budget rose 7%, prioritizing missile defense and unmanned systems.',
      'A Taiwan undersea cable was cut in a sabotage-flagged incident under investigation.',
      'Taiwan\'s permanent residency program has attracted ~2,400 chip engineers from US, Korea, and Japan.',
    ],
    contestedClaims: [
      {
        claim: 'PLA exercises constitute imminent conflict signaling.',
        supportedBy: ['select Western analysts'],
        disputedBy: ['Reuters', 'BBC', 'most ASEAN statements'],
        context: 'Most observers describe exercises as coercive signaling and rehearsal rather than imminent action.',
      },
      {
        claim: 'TSMC\'s overseas fabs can substitute for Taiwan-based production in a crisis.',
        supportedBy: ['Wall Street Journal', 'US officials'],
        disputedBy: ['Bloomberg', 'industry-supply analysts'],
        context: 'Yield ramps and ecosystem dependencies (substrates, tooling) are not easily replicated.',
      },
      {
        claim: 'Cross-strait tourism resumption signals genuine de-escalation.',
        supportedBy: ['Xinhua', 'Global Times'],
        disputedBy: ['Taipei DPP-aligned commentators', 'Le Monde'],
        context: 'Tourism reopens alongside expanded military activity; no political dialogue has resumed.',
      },
    ],
    regionalNarratives: [
      { region: 'Western Media', framing: 'Defense posture and supply-chain resilience', tone: 'neutral', outlets: ['Reuters', 'BBC', 'NYT', 'WSJ'] },
      { region: 'Chinese State Media', framing: '"One country" and external-interference framing', tone: 'critical', outlets: ['Xinhua', 'Global Times', 'SCMP'] },
      { region: 'European Media', framing: 'Industrial dependency and chip-supply lens', tone: 'measured', outlets: ['Le Monde', 'DW'] },
      { region: 'Eastern Media', framing: 'Trilateral exercise coverage and trade lens', tone: 'measured', outlets: ['Asahi Shimbun', 'Times of India'] },
      { region: 'Regional Media', framing: 'ASEAN balancing and stability statements', tone: 'measured', outlets: ['Al Jazeera'] },
    ],
    biasSignals: [
      { outlet: 'Global Times', signal: 'Strong editorial voice in news pages on cross-strait issues', severity: 'high', example: 'Headline language ("doomed to fail") embeds editorial conclusion.' },
      { outlet: 'Wall Street Journal', signal: 'Pentagon-source dominance in defense coverage', severity: 'low', example: 'Munitions burn assessment from internal Pentagon document without independent context.' },
      { outlet: 'The Guardian', signal: 'Civil-defense and citizen-mobilization framing emphasizes anxiety', severity: 'low', example: 'Volunteer signups headline emphasizes alarm vector.' },
    ],
    overallBiasScore: 51,
    topKeywords: ['PLA exercises', 'TSMC', 'undersea cable', 'porcupine', 'cross-strait', 'chip supply'],
    recommendedSources: ['Reuters', 'BBC', 'Bloomberg', 'Financial Times', 'Asahi Shimbun'],
    modelUsed: MODEL,
  },

  inflation: {
    neutralSummary:
      'Major central banks are in different phases of the policy cycle: the Fed is holding with two cuts signaled, the ECB has begun easing, the Bank of Japan has finally exited negative rates, and emerging-market peers diverge based on local fundamentals. Coverage broadly agrees on policy-action facts but diverges on the durability of disinflation, the structural causes of persistent services inflation, and the regional growth outlook.',
    consensusFacts: [
      'The Fed held rates unchanged and signaled two cuts later in 2026.',
      'The ECB cut its deposit rate by 25bp to 2.75%.',
      'The Bank of Japan formally exited negative rates and ended yield-curve control.',
      'UK CPI fell to 2.1%, near the BoE target.',
      'Japanese spring-offensive wage growth hit a 33-year high at ~5.2% at major employers.',
    ],
    contestedClaims: [
      {
        claim: 'Disinflation in services categories is stable and durable.',
        supportedBy: ['select FOMC members'],
        disputedBy: ['Wall Street Journal', 'BIS working papers'],
        context: 'Owner-equivalent rent and insurance categories have failed to roll over as predicted.',
      },
      {
        claim: 'Argentina\'s austerity program represents a sustainable disinflation path.',
        supportedBy: ['Reuters reporting on monthly data', 'Milei administration'],
        disputedBy: ['social-cost analysts', 'IMF caveats'],
        context: 'Monthly figures impressive; durability and political-feasibility questions remain.',
      },
      {
        claim: 'Eurozone is poised for sustained recovery in 2026.',
        supportedBy: ['Bloomberg', 'OECD upgrades'],
        disputedBy: ['DW coverage of German contraction'],
        context: 'Germany\'s second consecutive year of contraction weighs on aggregate forecasts.',
      },
    ],
    regionalNarratives: [
      { region: 'Western Media', framing: 'Central-bank reaction-function lens; market-pricing focus', tone: 'neutral', outlets: ['Bloomberg', 'WSJ', 'Reuters', 'FT'] },
      { region: 'European Media', framing: 'Structural-growth and fiscal-policy framing', tone: 'measured', outlets: ['Le Monde', 'DW', 'El País', 'The Guardian'] },
      { region: 'Eastern Media', framing: 'Wage-growth normalization and policy stability lens', tone: 'measured', outlets: ['Asahi Shimbun', 'Xinhua', 'Times of India'] },
      { region: 'Regional Media', framing: 'Debt-sustainability and IMF-program coverage', tone: 'measured', outlets: ['Al Jazeera'] },
    ],
    biasSignals: [
      { outlet: 'Wall Street Journal', signal: 'Editorial skepticism on Fed forward guidance leaks into news placement', severity: 'low', example: 'Sticky-housing headline framing extends opinion thesis.' },
      { outlet: 'Xinhua', signal: 'Manufacturing PMI coverage emphasizes positive turn while omitting property-sector drag', severity: 'medium', example: 'Story omits ongoing property-developer restructuring data.' },
      { outlet: 'DW', signal: 'German economic coverage emphasizes structural pessimism', severity: 'low', example: '"Second consecutive contraction" headline omits service-sector resilience data.' },
    ],
    overallBiasScore: 32,
    topKeywords: ['Fed', 'ECB', 'BoJ', 'CPI', 'wage growth', 'recession risk', 'rate cuts'],
    recommendedSources: ['Reuters', 'Bloomberg', 'Financial Times', 'BBC', 'Asahi Shimbun'],
    modelUsed: MODEL,
  },

  election: {
    neutralSummary:
      'Multiple major democracies face elections in 2026 with redistricting, voter-access litigation, AI-generated content rules, and far-right realignments shaping the cycle. Coverage broadly converges on procedural facts but diverges on the framing of opposition movements, the credibility of disinformation findings, and the implications of judicial-reform projects in several nations.',
    consensusFacts: [
      'US midterm primaries have reshaped multiple House battlegrounds.',
      'EU Parliament composition has shifted with rise of far-right and reshuffling of centrist coalitions.',
      'Brazil\'s TSE has finalized first-of-its-kind deepfake election rule.',
      'Mexico\'s judicial reform implementation has entered a contested second phase.',
      'India\'s Election Commission is piloting remote voting for migrant workers.',
    ],
    contestedClaims: [
      {
        claim: 'Recent voter-ID laws have a measurable disparate impact on turnout.',
        supportedBy: ['NYT', 'civil-rights organizations'],
        disputedBy: ['select state attorneys general', 'WSJ editorial'],
        context: 'Federal challenges cite cycle-specific data; defendants cite alternative methodologies.',
      },
      {
        claim: 'AI-generated political content materially shapes election outcomes.',
        supportedBy: ['The Guardian', 'EU-funded researchers'],
        disputedBy: ['some platform researchers', 'select academic studies'],
        context: 'Causal claims remain methodologically difficult; impact on attention is well documented.',
      },
      {
        claim: 'Mexican judicial reform improves accountability.',
        supportedBy: ['Mexican government', 'select legal academics'],
        disputedBy: ['multiple bar associations', 'OECD observers'],
        context: 'Implementation costs, judicial independence, and transition uncertainty remain debated.',
      },
    ],
    regionalNarratives: [
      { region: 'Western Media', framing: 'Procedural-integrity and contestation lens', tone: 'neutral', outlets: ['Reuters', 'BBC', 'NYT', 'WSJ'] },
      { region: 'European Media', framing: 'Coalition-mathematics and rise-of-far-right lens', tone: 'measured', outlets: ['Le Monde', 'DW', 'The Guardian'] },
      { region: 'Eastern Media', framing: 'Stability-of-governance comparative framing', tone: 'supportive', outlets: ['Xinhua', 'Asahi Shimbun', 'Times of India'] },
      { region: 'Regional Media', framing: 'Civil-society and competitiveness framing', tone: 'critical', outlets: ['Al Jazeera'] },
    ],
    biasSignals: [
      { outlet: 'The Guardian', signal: 'Disinformation-research framing presented as established consensus', severity: 'low', example: 'Headline on "23 European elections" elides methodological caveats.' },
      { outlet: 'Xinhua', signal: 'Comparative governance framing skews favorable to centralized models', severity: 'medium', example: 'Commentary contrasts "polarization" without acknowledging Chinese internal political restrictions.' },
      { outlet: 'Wall Street Journal', signal: 'Campaign-finance coverage emphasizes spending without policy-impact framing', severity: 'low', example: 'Spending-record story omits voter-attention data.' },
    ],
    overallBiasScore: 47,
    topKeywords: ['midterms', 'redistricting', 'far-right', 'AI deepfakes', 'voter ID', 'judicial reform'],
    recommendedSources: ['Reuters', 'BBC', 'Associated Press', 'Bloomberg', 'Financial Times'],
    modelUsed: MODEL,
  },

  crypto: {
    neutralSummary:
      'A combination of bitcoin reaching new highs, the SEC approving the first basket crypto ETF, and stablecoin legislation advancing in the US Senate has driven institutional adoption to new highs while raising fresh debate over investor protection, energy use, and the geopolitical implications of dollar-denominated stablecoins. Coverage broadly converges on market data but diverges on the framing of risk and regulation.',
    consensusFacts: [
      'Bitcoin breached $115,000 amid record spot ETF inflows.',
      'The SEC approved the first basket crypto ETF including five tokens.',
      'Global stablecoin market capitalization reached approximately $300B.',
      'MiCA framework second-stage enforcement is underway in the EU.',
      'China\'s digital yuan now reaches all 31 provincial-level regions.',
    ],
    contestedClaims: [
      {
        claim: 'Stablecoins meaningfully extend US dollar reach in emerging markets.',
        supportedBy: ['Tether', 'Bloomberg analysis'],
        disputedBy: ['BIS analysts', 'select central banks'],
        context: 'Adoption is real; macroeconomic impact and sovereignty trade-offs remain debated.',
      },
      {
        claim: 'Bitcoin mining\'s carbon footprint has structurally improved.',
        supportedBy: ['Cambridge data', 'select miner disclosures'],
        disputedBy: ['The Guardian', 'NGO observers'],
        context: 'Geographic shifts decouple some mining from carbon-intensive grids; aggregate footprint debated.',
      },
      {
        claim: 'Real-world asset tokenization will deliver near-term institutional efficiency gains.',
        supportedBy: ['BNY Mellon pilot announcements'],
        disputedBy: ['select traditional asset managers'],
        context: 'Pilot scope limited; legal and operational architecture still evolving.',
      },
    ],
    regionalNarratives: [
      { region: 'Western Media', framing: 'Market-structure, regulation, and capital-flows lens', tone: 'neutral', outlets: ['Bloomberg', 'WSJ', 'Reuters', 'FT'] },
      { region: 'European Media', framing: 'MiCA and consumer-protection framing', tone: 'measured', outlets: ['Le Monde', 'DW', 'The Guardian'] },
      { region: 'Eastern Media', framing: 'Sovereign-currency innovation and CBDC focus', tone: 'measured', outlets: ['Asahi Shimbun', 'Xinhua', 'SCMP'] },
      { region: 'Regional Media', framing: 'Adoption-realities framing in emerging markets', tone: 'measured', outlets: ['Al Jazeera'] },
    ],
    biasSignals: [
      { outlet: 'Bloomberg', signal: 'Crypto-industry sourcing dominant in market-structure stories', severity: 'low', example: 'ETF flow story relies on sponsor-side commentary.' },
      { outlet: 'The Guardian', signal: 'Energy framing emphasizes worst-case categories', severity: 'low', example: 'Mining story leads with category averages omitting share-shift improvements.' },
      { outlet: 'Wall Street Journal', signal: 'Lobbying-spending coverage notable for emphasis on sector influence', severity: 'low', example: 'Story omits comparable spending in adjacent finance sub-sectors.' },
    ],
    overallBiasScore: 36,
    topKeywords: ['bitcoin', 'ETF', 'stablecoins', 'MiCA', 'CBDC', 'tokenization'],
    recommendedSources: ['Reuters', 'Bloomberg', 'Financial Times', 'BBC', 'Wall Street Journal'],
    modelUsed: MODEL,
  },

  tech: {
    neutralSummary:
      'Big-tech earnings continue to demonstrate AI-related revenue acceleration alongside intensifying regulatory scrutiny: EU DMA enforcement is expanding, antitrust remedies in the US are entering implementation, and the EU has cleared major M&A with conditions. Coverage broadly converges on commercial milestones but diverges on labor impact, regulatory severity, and the long-term sustainability of current AI-capex levels.',
    consensusFacts: [
      'Apple unveiled new MacBook Pro lineup with M5 silicon.',
      'Microsoft cloud growth held at 31% YoY with material AI contribution.',
      'EU cleared Microsoft cybersecurity acquisition with behavioral conditions.',
      'BYD overtook Tesla in global EV sales for second straight quarter.',
      'Spotify crossed 700M monthly active users and raised prices again.',
    ],
    contestedClaims: [
      {
        claim: 'DMA enforcement is meaningfully changing platform behavior.',
        supportedBy: ['Le Monde', 'EU Commission statements'],
        disputedBy: ['Apple', 'select developer associations'],
        context: 'Compliance posture and consumer-impact metrics differ by stakeholder.',
      },
      {
        claim: 'AI capex levels are sustainable through end-decade.',
        supportedBy: ['Bloomberg', 'Nvidia and hyperscaler statements'],
        disputedBy: ['select buy-side analysts', 'WSJ skeptics'],
        context: 'Power, capital, and ROI assumptions diverge across forecasters.',
      },
      {
        claim: 'Strike actions reflect systemic warehouse-management failures.',
        supportedBy: ['The Guardian', 'union research'],
        disputedBy: ['Amazon official statements'],
        context: 'Strikes are real and coordinated; underlying causal claims remain disputed.',
      },
    ],
    regionalNarratives: [
      { region: 'Western Media', framing: 'Capital-markets and product-launch focus', tone: 'neutral', outlets: ['Bloomberg', 'WSJ', 'NYT', 'FT', 'Reuters'] },
      { region: 'European Media', framing: 'Regulation, labor, and sovereignty lens', tone: 'critical', outlets: ['Le Monde', 'DW', 'The Guardian', 'El País'] },
      { region: 'Eastern Media', framing: 'Domestic-champion and export-competitiveness framing', tone: 'supportive', outlets: ['Xinhua', 'Asahi Shimbun', 'SCMP', 'Times of India'] },
    ],
    biasSignals: [
      { outlet: 'The Guardian', signal: 'Labor-impact focus dominant; corporate response under-quoted', severity: 'low', example: 'Strike-coverage headline omits company response.' },
      { outlet: 'Wall Street Journal', signal: 'Capital-markets framing dominant; consumer-rights angle under-attended', severity: 'low', example: 'Streaming bundle story emphasizes margin over consumer cost.' },
      { outlet: 'Xinhua', signal: 'Domestic-champion stories lack independent verification', severity: 'medium', example: 'Huawei shipment surge cited without IDC or third-party confirmation.' },
    ],
    overallBiasScore: 34,
    topKeywords: ['DMA', 'AI capex', 'M5', 'cloud growth', 'EV sales', 'antitrust'],
    recommendedSources: ['Reuters', 'Bloomberg', 'Financial Times', 'BBC', 'Wall Street Journal'],
    modelUsed: MODEL,
  },

  health: {
    neutralSummary:
      'The WHO has concluded the long-negotiated pandemic-preparedness accord while major commercial milestones for GLP-1 medications, CRISPR therapies, and AI-assisted screening continue to expand. Coverage broadly converges on regulatory and clinical events but diverges on access equity, pricing reform impacts, and the relative weight given to corporate versus public-health narratives.',
    consensusFacts: [
      'WHO member states have adopted a pandemic accord text.',
      'GLP-1 medication labels have expanded into cardiovascular and adjacent indications.',
      'CRISPR-based sickle cell therapy has reached the 1,000-patient milestone.',
      'India\'s Ayushman Bharat enrollment has crossed 700 million.',
      'A WHO yellow fever public health emergency has been declared in the Sahel.',
    ],
    contestedClaims: [
      {
        claim: 'PBM reform legislation will deliver patient-level savings as designed.',
        supportedBy: ['select congressional sponsors', 'PhRMA-aligned commentary'],
        disputedBy: ['health-economic researchers', 'consumer advocates'],
        context: 'Implementation, accounting, and rebate-flow architecture remain debated.',
      },
      {
        claim: 'AI-assisted screening reduces clinician workload without compromising sensitivity.',
        supportedBy: ['BBC pilot coverage', 'NHS pilot data'],
        disputedBy: ['select radiologist organizations'],
        context: 'Pilot data is positive; real-world generalizability under continued study.',
      },
      {
        claim: 'Centralized procurement reforms have produced patient-level savings as advertised.',
        supportedBy: ['Xinhua coverage of insulin reform'],
        disputedBy: ['independent health-economists'],
        context: 'Aggregate savings reported; patient-level distributional impact less transparent.',
      },
    ],
    regionalNarratives: [
      { region: 'Western Media', framing: 'Clinical-evidence and commercial-milestone focus', tone: 'neutral', outlets: ['Reuters', 'Bloomberg', 'FT', 'NYT'] },
      { region: 'European Media', framing: 'Access, equity, and cancer-plan execution lens', tone: 'measured', outlets: ['Le Monde', 'DW', 'The Guardian'] },
      { region: 'Eastern Media', framing: 'Domestic-system performance and aging-society lens', tone: 'measured', outlets: ['Asahi Shimbun', 'Xinhua', 'Times of India'] },
      { region: 'Regional Media', framing: 'Outbreak-response and donor-coordination framing', tone: 'measured', outlets: ['Al Jazeera', 'Al Arabiya'] },
    ],
    biasSignals: [
      { outlet: 'Xinhua', signal: 'Domestic policy-impact figures presented without independent audit', severity: 'medium', example: 'Insulin pricing reform story cites government data exclusively.' },
      { outlet: 'The Guardian', signal: 'Industry-impact framing in headlines; balancing perspectives lower in story', severity: 'low', example: 'Vape exports investigation lead frames intent.' },
      { outlet: 'Wall Street Journal', signal: 'Industry-source dominance in pharma-pricing stories', severity: 'low', example: 'PBM reform story relies primarily on sector-aligned commentary.' },
    ],
    overallBiasScore: 29,
    topKeywords: ['pandemic accord', 'GLP-1', 'CRISPR', 'PBM', 'AI screening', 'antimicrobial resistance'],
    recommendedSources: ['Reuters', 'BBC', 'Bloomberg', 'Financial Times', 'Asahi Shimbun'],
    modelUsed: MODEL,
  },

  space: {
    neutralSummary:
      'SpaceX\'s Starship has achieved orbital refueling, unlocking a key Artemis dependency, while NASA, ESA, China, India, and Japan continue their respective program milestones. Commercial activity continues to grow with Starlink crossing 8M subscribers and new entrants in micro-launch and tokenized space services. Coverage is broadly factual on technical events but diverges on the geopolitics of dual-use space capabilities and on the cadence of "new space" investment claims.',
    consensusFacts: [
      'SpaceX Starship completed orbital refueling demonstration.',
      'NASA Artemis 4 crew has been formally announced.',
      'Starlink subscriber count has crossed 8 million worldwide.',
      'Ariane 6 has entered operational launch cadence.',
      'JAXA\'s SLIM lunar lander has survived multiple lunar nights.',
    ],
    contestedClaims: [
      {
        claim: 'Starship reusability cadence will hit weekly tempo by end of 2026.',
        supportedBy: ['SpaceX statements'],
        disputedBy: ['independent launch analysts'],
        context: 'Production and pad-turnaround constraints remain key dependencies.',
      },
      {
        claim: 'China\'s ILRS framework offers genuine collaborative opportunity for non-aligned states.',
        supportedBy: ['Xinhua', 'partner-nation officials'],
        disputedBy: ['select Western analysts'],
        context: 'Framework includes both scientific and dual-use components; member benefits remain to be evaluated.',
      },
      {
        claim: 'Space-based solar power is approaching commercial viability.',
        supportedBy: ['Caltech demo announcements'],
        disputedBy: ['independent energy economists'],
        context: 'Demos progress; ground-cost-comparable economics remain distant.',
      },
    ],
    regionalNarratives: [
      { region: 'Western Media', framing: 'Commercial-cadence and program-milestone lens', tone: 'neutral', outlets: ['Reuters', 'Bloomberg', 'NYT', 'WSJ', 'FT'] },
      { region: 'European Media', framing: 'Sovereign-launch and cybersecurity framing', tone: 'measured', outlets: ['Le Monde', 'DW'] },
      { region: 'Eastern Media', framing: 'Domestic-program and partner-cooperation framing', tone: 'supportive', outlets: ['Xinhua', 'Asahi Shimbun', 'Times of India'] },
      { region: 'Regional Media', framing: 'Regional-program achievements lens', tone: 'measured', outlets: ['Al Jazeera'] },
    ],
    biasSignals: [
      { outlet: 'Xinhua', signal: 'Domestic-program coverage without independent verification', severity: 'low', example: 'ILRS roadmap story lacks alternative scientific perspectives.' },
      { outlet: 'Wall Street Journal', signal: 'DoD source dominance in security-space coverage', severity: 'low', example: 'Launch contract story omits commercial-buyer perspective.' },
      { outlet: 'Bloomberg', signal: 'Commercial-revenue framing dominant; debris-and-traffic externalities under-attended', severity: 'low', example: 'Constellation story omits space-traffic-management concerns.' },
    ],
    overallBiasScore: 22,
    topKeywords: ['Starship', 'Artemis', 'Starlink', 'ILRS', 'lunar lander', 'reusability'],
    recommendedSources: ['Reuters', 'BBC', 'Bloomberg', 'Financial Times', 'Asahi Shimbun'],
    modelUsed: MODEL,
  },

  korea: {
    neutralSummary:
      'North Korea continues missile testing and satellite launch attempts while Russia–DPRK trade has tripled. South Korea faces persistent ultra-low fertility, a knife-attack on a senior opposition leader, and Samsung leadership restructuring as the chip race intensifies. Coverage converges on event facts but diverges on the framing of trilateral exercises, sanctions effectiveness, and the durability of regional stability.',
    consensusFacts: [
      'North Korea tested a new solid-fuel intermediate-range missile.',
      'Russia–DPRK trade has tripled in the past year.',
      'A South Korean opposition leader survived a knife attack in Busan.',
      'Samsung Electronics restructured its semiconductor leadership.',
      'South Korea\'s fertility rate fell to a global record low of 0.68.',
    ],
    contestedClaims: [
      {
        claim: 'US-South Korea cost-sharing agreement reflects equitable burden-sharing.',
        supportedBy: ['Wall Street Journal', 'US State Department'],
        disputedBy: ['Korean labor union analyses'],
        context: '8.3% increase and shifted local-employee cost are differently framed in each capital.',
      },
      {
        claim: 'Trilateral US-Japan-Korea defense exercises represent permanent realignment.',
        supportedBy: ['Asahi Shimbun', 'US officials'],
        disputedBy: ['Xinhua', 'some Korean opposition voices'],
        context: 'Domestic political fragility on Korean side affects long-term framework durability.',
      },
      {
        claim: 'North Korean labor exports have been meaningfully constrained.',
        supportedBy: ['UN sanctions framework documents'],
        disputedBy: ['NYT investigation', 'OSINT trackers'],
        context: 'Investigations document persistent revenue flows in Russian Far East despite sanctions.',
      },
    ],
    regionalNarratives: [
      { region: 'Western Media', framing: 'Deterrence, sanctions, and supply-chain framing', tone: 'neutral', outlets: ['Reuters', 'BBC', 'NYT', 'WSJ'] },
      { region: 'Eastern Media', framing: 'Trilateral cooperation and economic-rebuilding frame', tone: 'measured', outlets: ['Asahi Shimbun', 'Times of India'] },
      { region: 'Chinese State Media', framing: '"Stability" framing without DPRK accountability', tone: 'critical', outlets: ['Xinhua'] },
      { region: 'European Media', framing: 'Sanctions-coordination and cyber-unit lens', tone: 'measured', outlets: ['Le Monde', 'DW'] },
      { region: 'Regional Media', framing: 'Russia-DPRK trade and SCO implications', tone: 'measured', outlets: ['Al Jazeera'] },
    ],
    biasSignals: [
      { outlet: 'Xinhua', signal: '"Stability" framing omits DPRK provocations specifics', severity: 'medium', example: 'Foreign ministry briefing reproduced without context on missile launches.' },
      { outlet: 'NYT', signal: 'Investigation framing presented as conclusive on attribution', severity: 'low', example: 'Labor-export story uses possessive language for revenue flows.' },
      { outlet: 'Wall Street Journal', signal: 'US-government sourcing dominant in burden-sharing story', severity: 'low', example: 'SMA story omits Korean union perspectives.' },
    ],
    overallBiasScore: 44,
    topKeywords: ['solid-fuel missile', 'fertility', 'SMA', 'Samsung', 'trilateral', 'shipbuilding'],
    recommendedSources: ['Reuters', 'BBC', 'Bloomberg', 'Financial Times', 'Asahi Shimbun'],
    modelUsed: MODEL,
  },

  africa: {
    neutralSummary:
      'Sudan\'s war passes its third year as Sahel humanitarian funding shortfalls widen, while continental institutions deepen on trade and finance: AfCFTA pilot transactions cross $5B, the Pan-African Payment System sets monthly volume records, and African sovereigns return to Eurobond markets. Coverage broadly converges on macro-events but diverges on the framing of external partnerships, debt-relief credibility, and the policy implications of resource competition.',
    consensusFacts: [
      'Sudan\'s war has surpassed 150,000 deaths per monitoring groups.',
      'African Continental Free Trade Area pilot transactions have crossed $5B.',
      'Ethiopia\'s GERD reservoir has reached full capacity.',
      'Eurobond market access has reopened for select African sovereigns.',
      'Pan-African Payment System monthly volume has hit a new record.',
    ],
    contestedClaims: [
      {
        claim: 'China\'s expanded debt-relief plan represents meaningful structural change.',
        supportedBy: ['Xinhua'],
        disputedBy: ['independent debt-restructuring analysts'],
        context: 'Coverage of zero-interest categories lacks independent assessment of overall debt-service burden.',
      },
      {
        claim: 'Mining-sector security investments deliver durable production stability.',
        supportedBy: ['Wall Street Journal', 'mining-company statements'],
        disputedBy: ['NGO observers'],
        context: 'Production gains real; underlying security and labor conditions less reported.',
      },
      {
        claim: 'France\'s narrower partnership posture is voluntary realignment.',
        supportedBy: ['Le Monde'],
        disputedBy: ['analysts of Sahel withdrawal episodes'],
        context: 'Coverage frames doctrine evolution; concurrent forced withdrawals less foregrounded.',
      },
    ],
    regionalNarratives: [
      { region: 'Western Media', framing: 'Conflict, finance, and resource-competition lens', tone: 'neutral', outlets: ['Reuters', 'BBC', 'WSJ', 'NYT', 'FT', 'Bloomberg'] },
      { region: 'European Media', framing: 'Partnership-realignment and humanitarian-funding lens', tone: 'measured', outlets: ['Le Monde', 'DW', 'The Guardian'] },
      { region: 'Eastern Media', framing: 'Investment, infrastructure, and South-South cooperation lens', tone: 'supportive', outlets: ['Xinhua', 'Asahi Shimbun', 'Times of India'] },
      { region: 'Regional Media', framing: 'Continental-institution and AU-mediation framing', tone: 'measured', outlets: ['Al Jazeera', 'Al Arabiya'] },
    ],
    biasSignals: [
      { outlet: 'Xinhua', signal: 'Debt-relief framing lacks independent macro context', severity: 'medium', example: 'New framework story omits comparative debt-stock data.' },
      { outlet: 'The Guardian', signal: 'Donor-shortfall framing lacks comparative context', severity: 'low', example: 'Headline omits trend of consistent multi-year underfunding.' },
      { outlet: 'Wall Street Journal', signal: 'Mining-company source dominance', severity: 'low', example: 'Cobalt production story relies primarily on operator commentary.' },
    ],
    overallBiasScore: 39,
    topKeywords: ['Sudan', 'AfCFTA', 'GERD', 'Eurobond', 'Sahel', 'PAPSS', 'cobalt'],
    recommendedSources: ['Reuters', 'BBC', 'Bloomberg', 'Financial Times', 'Al Jazeera'],
    modelUsed: MODEL,
  },
};

// ─── Generic fallback for queries outside known topics ────────────────────
export function buildGenericAnalysis(topic, articles) {
  const sourceCounts = {};
  const regionCounts = {};
  const toneCounts = {};
  for (const a of articles) {
    sourceCounts[a.source] = (sourceCounts[a.source] || 0) + 1;
    if (a._region) regionCounts[a._region] = (regionCounts[a._region] || 0) + 1;
    if (a._tone) toneCounts[a._tone] = (toneCounts[a._tone] || 0) + 1;
  }
  const topSources = Object.keys(sourceCounts)
    .sort((a, b) => sourceCounts[b] - sourceCounts[a])
    .slice(0, 5);
  const regions = Object.keys(regionCounts);

  const tokens = topic
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 3)
    .slice(0, 6);

  return {
    neutralSummary: `Across ${articles.length} pieces from ${Object.keys(sourceCounts).length} outlets covering "${topic}", coverage spans ${regions.length} regional perspectives. Outlets generally agree on the headline events but diverge on framing, attribution of responsibility, and emphasis. Western wires lean factual and event-driven; European outlets emphasize policy and regulation; Eastern outlets foreground multilateralism and economic dimensions; regional and Global South coverage often centers civilian impact and equity. The body of reporting points to a story still in development with several contested elements worth tracking.`,
    consensusFacts: [
      `Coverage spans ${articles.length} articles across ${regions.length || 'multiple'} regions and ${Object.keys(sourceCounts).length} outlets.`,
      'Most outlets agree on the basic timeline and identification of principal actors.',
      'Quantitative figures (where present) are reported within consistent ranges across mainstream wires.',
      'Multiple secondary effects are noted across reporting (economic, diplomatic, humanitarian).',
    ],
    contestedClaims: [
      {
        claim: 'Attribution of primary responsibility differs by outlet region.',
        supportedBy: topSources.slice(0, 2),
        disputedBy: topSources.slice(2, 4),
        context: 'Regional editorial perspectives produce divergent attribution emphases.',
      },
      {
        claim: 'Long-term implications are framed differently across outlet groups.',
        supportedBy: ['Western wires'],
        disputedBy: ['Eastern and regional outlets'],
        context: 'Forecasts and scenario emphasis differ along editorial lines.',
      },
    ],
    regionalNarratives: regions.map((region) => ({
      region: `${region} Media`,
      framing: `${region}-focused framing emphasizing locally relevant angles and stakeholders`,
      tone: 'measured',
      outlets: Object.entries(sourceCounts)
        .filter(([s]) => articles.find((a) => a.source === s)?._region === region)
        .map(([s]) => s)
        .slice(0, 3),
    })),
    biasSignals: topSources.slice(0, 3).map((outlet) => ({
      outlet,
      signal: 'Editorial framing aligned with outlet\'s typical regional perspective',
      severity: 'low',
      example: `Headline emphasis in coverage of "${topic}" follows established editorial pattern.`,
    })),
    overallBiasScore: 45,
    topKeywords: tokens.length > 0 ? tokens : ['analysis', 'coverage', 'global', 'media'],
    recommendedSources: topSources.slice(0, 4),
    modelUsed: MODEL,
  };
}
