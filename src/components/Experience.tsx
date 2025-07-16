import { Experience as ExperienceType } from '@/types/portfolio';
import { formatDateRange, getExperienceDuration } from '@/lib/portfolio';

interface ExperienceProps {
  experiences: ExperienceType[];
}

export default function Experience({ experiences }: ExperienceProps) {
  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          Work Experience
        </h2>
        
        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative">
              {/* Timeline line */}
              {index !== experiences.length - 1 && (
                <div className="absolute left-8 top-16 w-0.5 h-full bg-indigo-200"></div>
              )}
              
              {/* Experience card */}
              <div className="flex items-start mb-8">
                {/* Timeline dot */}
                <div className="flex-shrink-0 w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mr-6 z-10">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                </div>
                
                {/* Content */}
                <div className="bg-gray-50 rounded-lg p-6 flex-grow border border-gray-200 hover:border-indigo-300 transition duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {exp.position}
                      </h3>
                      <h4 className="text-lg font-semibold text-indigo-600 mb-2">
                        {exp.company}
                      </h4>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-gray-600 font-medium">
                        {formatDateRange(exp.startDate, exp.endDate)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 