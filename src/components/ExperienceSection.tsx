interface ExperienceSectionProps {
  role: string;
  org: string;
  description: string;
}

export default function ExperienceSection({ role, org, description }: ExperienceSectionProps) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-purple-400 mt-1">{"//"}</span>
      <div>
        <p className="text-gray-300">
          <b className="text-purple-300">{role}</b> - {org}
        </p>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
}