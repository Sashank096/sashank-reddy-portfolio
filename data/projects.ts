export type Category = "Web" | "ML/AI" | "Tools" | "Other";

export type Project = {
  id: string;
  title: string;
  category: Category;
  description: string;
  tags: string[];
  image: string;
  github: string;
  live?: string;
};

export const projects: Project[] = [
  {
    id: "unanimous",
    title: "UNANIMOUS — Resume, ATS & Portfolio Builder",
    category: "Web",
    description:
      "A Flask and Supabase career platform for ATS analysis, tailored resume building, and shareable portfolio generation.",
    tags: ["Python", "Flask", "Supabase", "Google Gemini"],
    image: "/images/projects/unanimous.jpg",
    github: "https://github.com/Sashank096/unanimous",
    live: "https://unanimous-topaz.vercel.app",
  },
  {
    id: "smart-exam-invigilation",
    title: "Smart Exam Invigilation System",
    category: "Tools",
    description:
      "A Windows desktop examination-management and invigilator-scheduling application with automated conflict detection.",
    tags: ["C++17", "SFML", "CSV", "MSVC"],
    image: "/images/projects/invigilation.jpg",
    github: "https://github.com/Sashank096/Smart-Exam-Invigilation-System",
  },
  {
    id: "medtrack-dv",
    title: "Infosys Springboard — MedTrack_DV",
    category: "Other",
    description:
      "Hospital analytics project combining Python data pipelines with a four-page Power BI dashboard and DAX measures.",
    tags: ["Python", "Power BI", "DAX", "Jupyter"],
    image: "/images/projects/medtrack.jpg",
    github: "https://github.com/Sashank096/Infosys-Springboard-MedTrack-DV",
  },
  {
    id: "student-feedback",
    title: "Campus Feedback Analyzer",
    category: "ML/AI",
    description:
      "A multilingual student-feedback analytics platform using transformer sentiment analysis, a FastAPI backend, and a React interface.",
    tags: ["Python", "FastAPI", "React", "Transformers", "Supabase"],
    image: "/images/projects/feedback.jpg",
    github: "https://github.com/Sashank096/student-feedback",
    live: "https://student-feedback-app-sable-two.vercel.app",
  },
  {
    id: "social-media-analysis",
    title: "Social Media Data Analysis",
    category: "Web",
    description:
      "A Streamlit dashboard for social-post sentiment, engagement metrics, and trending-keyword analysis.",
    tags: ["Python", "Streamlit", "TextBlob", "Matplotlib"],
    image: "/images/projects/social.png",
    github: "https://github.com/Sashank096/social-media-data-analysis",
    live: "https://social-media-analysis-tharun.streamlit.app",
  },
];
