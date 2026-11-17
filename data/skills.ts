export type SkillGroup = { title: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  { title: "Languages", items: ["Python", "C", "JavaScript", "HTML", "CSS"] },
  {
    title: "AI/ML",
    items: ["Artificial Intelligence", "Machine Learning", "Computer Vision", "OpenCV", "Scikit-learn"],
  },
  {
    title: "Data Analytics",
    items: ["Power BI", "Microsoft Excel", "Pandas", "NumPy", "Plotly"],
  },
  {
    title: "Web Development",
    items: ["HTML", "CSS", "JavaScript", "Supabase", "Vercel"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Streamlit", "Jupyter Notebook", "Joblib", "OpenPyXL"],
  },
];
