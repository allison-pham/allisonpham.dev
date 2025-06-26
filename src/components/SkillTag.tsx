interface SkillTagProps {
  children: React.ReactNode;
}

export default function SkillTag({ children }: SkillTagProps) {
  return (
    <div className="bg-gray-800 px-3 py-2 rounded-md text-sm">
      <span className="text-purple-400"># </span>
      {children}
    </div>
  );
}