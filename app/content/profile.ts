export type KnowledgeEntry = {
  id: string;
  title: string;
  keywords: string[];
  text: string;
};

export const profile = {
  name: "Fares Alhezaimi",
  initials: "FA",
  role: "Computer scientist building Earth intelligence tools",
  headline: "I turn Earth-observation data into tools people can actually use.",
  introduction:
    "I work where scientific computing, thermal remote sensing, and product engineering meet—building systems for wildfire detection, sensor matchups, ecological modeling, and geospatial decision support.",
  affiliation: "Chapman University · NASA Jet Propulsion Laboratory",
  location: "Orange County, California",
  email: "Falhezaimi@chapman.edu",
  linkedin: "https://www.linkedin.com/in/faresalhezaimi",
  github: "https://github.com/falhezaimi",
  status: "Researching thermal remote sensing and wildfire applications",
  updated: "August 2026",
} as const;

export const metrics = [
  {
    value: "756K+",
    label: "ECOSTRESS scene records screened",
    detail: "Global VIIRS matchup rebuild",
  },
  {
    value: "84,976",
    label: "Accepted sensor matchups",
    detail: "Geometry ≥ 0.99 · |Δt| ≤ 15 min",
  },
  {
    value: "97 / 97",
    label: "Mission months processed",
    detail: "End-to-end metadata coverage",
  },
  {
    value: "70 m",
    label: "ECOSTRESS thermal scale",
    detail: "Fire and city-scale observations",
  },
] as const;

export const featuredWork = [
  {
    id: "fire-detection",
    type: "Research · Preliminary",
    number: "01",
    title: "Radiance-based active-fire detection",
    description:
      "A high-resolution ECOSTRESS workflow that works from thermal radiance, converts to brightness temperature, and combines spectral contrast with contextual tests to identify fire-consistent pixels.",
    impact:
      "Designed to explore where ECOSTRESS can add spatial detail alongside existing operational fire products—not replace them.",
    tags: ["ECOSTRESS", "Thermal infrared", "Python", "Scientific validation"],
    featured: true,
  },
  {
    id: "matchup-dataset",
    type: "Dataset",
    number: "02",
    title: "ECOSTRESS–VIIRS matchup rebuild",
    description:
      "A mission-scale geometry and timing pipeline that evaluates ECOSTRESS scenes against VIIRS observations, including multi-granule unions and representative overlap records.",
    impact:
      "Produced 84,976 accepted matchups from 756,278 ECOSTRESS scene records across all 97 mission months processed in the rebuild.",
    tags: ["VIIRS", "Geospatial joins", "Data engineering", "QA/QC"],
    featured: false,
  },
  {
    id: "thermal-brief",
    type: "Scientific product",
    number: "03",
    title: "Thermal Brief Builder",
    description:
      "A desktop workflow for finding, processing, visualizing, and packaging ECOSTRESS and VIIRS observations into clear, reproducible thermal briefs.",
    impact:
      "Moves a research workflow toward a usable product with map search, provenance, editable outputs, and presentation-ready exports.",
    tags: ["Product design", "PyQt", "Remote sensing", "Reproducibility"],
    featured: false,
  },
] as const;

export const otherWork = [
  {
    title: "AUREUM",
    label: "Ecological ML",
    description:
      "Multimodel species-richness research using NEON and ECOSTRESS data, spatial validation, and explainability methods.",
    stack: "Python · PyTorch · XGBoost · LightGBM · SHAP",
  },
  {
    title: "BioMNI Wrapper",
    label: "Agentic science",
    description:
      "Reproducible agent workflows for protein-structure and allostery analysis, including parsing, benchmarking, and RMSD evaluation.",
    stack: "Python · AI agents · Structural biology",
  },
  {
    title: "EDRIVE",
    label: "Sustainable mobility",
    description:
      "An iOS concept for estimating driving emissions, improving route choices, and making lower-carbon behavior more engaging.",
    stack: "Swift · CoreLocation · Supabase",
    href: "https://github.com/falhezaimi/EDRIVE",
  },
] as const;

export const experience = [
  {
    dates: "2026—Present",
    role: "Earth Science Research Intern",
    organization: "NASA Jet Propulsion Laboratory",
    description:
      "Developing scientific software and research workflows for thermal remote sensing, active-fire detection, cross-sensor analysis, and wildland-fire applications.",
    details: [
      "Built and evaluated a radiance-based ECOSTRESS active-fire workflow across multiple fire cases.",
      "Rebuilt mission-scale ECOSTRESS–VIIRS matchup logic with explicit spatial and temporal acceptance criteria.",
      "Created researcher-facing tools that connect data discovery, QA/QC, visualization, and reproducible delivery.",
    ],
  },
  {
    dates: "2024—Present",
    role: "Student Researcher",
    organization: "Remote Sensing & Ecology Lab · Chapman University",
    description:
      "Working with Dr. Joshua Fisher and Dr. Gabriela Shirkey on machine learning, Earth observation, and ecological modeling.",
    details: [
      "Developed multimodel ecological ML pipelines using NEON and ECOSTRESS observations.",
      "Designed site- and plot-aware validation and applied SHAP-based model interpretation.",
      "Produced scientific figures and research products for NASA-supported presentations.",
    ],
  },
  {
    dates: "2024—Present",
    role: "Research & Product Contributor",
    organization: "Chapman University",
    description:
      "Building across computational biology and sustainable technology, from agent workflows to an eco-driving product concept.",
    details: [
      "Contributed reproducible analysis modules and benchmarks to the BioMNI wrapper project.",
      "Led a six-person student team developing the EDRIVE iOS concept and its technical architecture.",
    ],
  },
] as const;

export const education = [
  {
    degree: "B.S. Computer Science",
    school: "Chapman University · Fowler School of Engineering",
    dates: "Expected 2027",
  },
  {
    degree: "Integrated M.S. Computational & Data Sciences",
    school: "Chapman University · Schmid College of Science and Technology",
    dates: "Graduate coursework underway · Expected 2028",
  },
] as const;

export const presentations = [
  {
    year: "2025",
    venue: "ECOSTRESS Science and Applications Team Meeting",
    note: "Preliminary active-fire research presentation and scientific-tool demonstration",
  },
  {
    year: "2026",
    venue: "Chapman University Student Scholar Symposium",
    note: "Student research presentation",
  },
] as const;

export const skills = [
  {
    category: "Scientific computing",
    items: ["Python", "NumPy", "pandas", "xarray", "GeoPandas", "Rasterio"],
  },
  {
    category: "Machine learning",
    items: ["PyTorch", "XGBoost", "LightGBM", "SHAP", "Validation design"],
  },
  {
    category: "Earth observation",
    items: ["ECOSTRESS", "VIIRS", "GEDI", "Landsat", "Sentinel", "QA/QC"],
  },
  {
    category: "Product engineering",
    items: ["TypeScript", "React", "Next.js", "PyQt", "Git", "Docker", "PostgreSQL"],
  },
] as const;

export const knowledgeBase: KnowledgeEntry[] = [
  {
    id: "identity",
    title: "Profile",
    keywords: ["fares", "about", "background", "current", "goal", "contact"],
    text: `${profile.name} is a computer science and computational data science student at Chapman University. He builds scientific software at the intersection of Earth observation, wildfire research, ecological machine learning, and product engineering. He is based in Orange County, California and can be contacted at ${profile.email}.`,
  },
  {
    id: "jpl",
    title: "NASA JPL experience",
    keywords: ["jpl", "nasa", "internship", "earth science", "extension", "fire"],
    text:
      "Fares joined NASA Jet Propulsion Laboratory as an Earth Science Research Intern in 2026. His work includes ECOSTRESS active-fire research, ECOSTRESS–VIIRS cross-sensor matching, scientific software, QA/QC, visualization, and tools for wildland-fire applications. The active-fire work is preliminary research.",
  },
  {
    id: "fire-detection",
    title: "ECOSTRESS active-fire research",
    keywords: ["fire", "wildfire", "active fire", "radiance", "brightness temperature", "thermal", "ecostress"],
    text:
      "Fares is developing a radiance-based ECOSTRESS active-fire workflow. It uses thermal radiance, Planck brightness-temperature conversion, spectral contrast, and contextual tests to identify fire-consistent pixels. The research explores how ECOSTRESS spatial detail can complement existing operational products; it does not claim to replace them.",
  },
  {
    id: "matchups",
    title: "ECOSTRESS–VIIRS matchup dataset",
    keywords: ["viirs", "matchup", "dataset", "756", "84976", "geometry", "granule", "time"],
    text:
      "The matchup rebuild screened 756,278 ECOSTRESS scene records and produced 84,976 accepted matchups using geometry coverage of at least 0.99 and an absolute time difference of at most 15 minutes. All 97 processed mission months were completed, and multi-granule unions were handled explicitly.",
  },
  {
    id: "thermal-brief",
    title: "Thermal Brief Builder",
    keywords: ["tool", "gui", "brief", "map", "product", "download", "visualization"],
    text:
      "Fares built a desktop workflow for finding, processing, visualizing, and packaging ECOSTRESS and VIIRS data. The product direction includes map-based search, scientific provenance, editable outputs, stable color ramps, and presentation-ready thermal briefs.",
  },
  {
    id: "aureum",
    title: "AUREUM ecological machine learning",
    keywords: ["aureum", "ecology", "biodiversity", "species", "neon", "machine learning", "shap"],
    text:
      "At Chapman's Remote Sensing & Ecology Lab, Fares developed multimodel species-richness workflows using NEON and ECOSTRESS data. He worked on spatial validation, model interpretation with SHAP, and scientific visualizations for NASA-supported research presentations.",
  },
  {
    id: "biomni",
    title: "BioMNI Wrapper",
    keywords: ["biomni", "protein", "biology", "allostery", "rmsd", "agent"],
    text:
      "Fares contributed to reproducible agent workflows for protein structure and allostery analysis. His work included computational setup, output parsing, RMSD evaluation, multi-model comparisons, and benchmark integration.",
  },
  {
    id: "edrive",
    title: "EDRIVE",
    keywords: ["edrive", "ios", "swift", "driving", "carbon", "startup", "team"],
    text:
      "EDRIVE is a sustainable-mobility iOS concept for estimating driving emissions, improving route choices, and encouraging lower-carbon behavior. Fares led a six-person student team and worked on the Swift, CoreLocation, and Supabase architecture.",
  },
  {
    id: "education",
    title: "Education",
    keywords: ["education", "chapman", "degree", "masters", "cads", "graduation", "student"],
    text:
      "Fares is completing a B.S. in Computer Science at Chapman University, expected in 2027, and is enrolled in Chapman's integrated M.S. in Computational & Data Sciences, expected in 2028.",
  },
  {
    id: "skills",
    title: "Technical skills",
    keywords: ["skills", "python", "typescript", "remote sensing", "machine learning", "software", "data"],
    text:
      "Fares works primarily in Python for scientific computing and geospatial workflows. His toolkit includes NumPy, pandas, xarray, GeoPandas, Rasterio, PyTorch, XGBoost, LightGBM, SHAP, TypeScript, React, Next.js, PyQt, Git, Docker, and PostgreSQL. He works with ECOSTRESS, VIIRS, GEDI, Landsat, and Sentinel data.",
  },
  {
    id: "presentations",
    title: "Presentations",
    keywords: ["talk", "presentation", "conference", "satm", "symposium", "chapman", "demo"],
    text:
      "In 2025, Fares presented preliminary ECOSTRESS active-fire research and demonstrated scientific software at the ECOSTRESS Science and Applications Team Meeting. In 2026, he also presented at the Chapman University Student Scholar Symposium.",
  },
];
