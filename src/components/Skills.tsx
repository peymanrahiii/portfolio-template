import { Skill } from '@/types/portfolio';

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          Skills & Expertise
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-indigo-100 text-indigo-800 text-lg rounded-full font-medium"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 