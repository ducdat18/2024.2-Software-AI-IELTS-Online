import { ReactNode } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import Link from 'next/link';

interface SkillCardProps {
  title: string;
  description: string;
  features: string[];
  icon: ReactNode;
  href: string;
}

function SkillCard({
  title,
  description,
  features,
  icon,
  href,
}: SkillCardProps) {
  return (
    <Card className="bg-gray-800 border-blue-900 hover:border-blue-500 transition-color">
      <CardHeader className="pb-2">
        <div className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center mb-4">
          {icon}
        </div>
        <CardTitle className="text-xl text-white font-bold">{title}</CardTitle>
        <CardDescription className="text-white italic">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-2">
        <ul className="space-y-2 text-gray-300">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        <Link
          href={href}
          className="mt-4 inline-block text-blue-500 hover:text-blue-400"
        >
          Practice Now →
        </Link>
      </CardContent>
    </Card>
  );
}

export default function SkillsSection() {
  return (
    <section
      id="feature"
      className="py-20 bg-black bg-gradient-to-b from-gray-900 to-transparent"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Practice all IELTS skills
          </h2>
          <p className="text-grey-400 max-w-2xl mx-auto">
            Our platform provides practice tests and mock tests for all three
            skills, helping you prepare comprehensively for the IELTS exam.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SkillCard
            title="Listening"
            description="Practice listening and understanding English in various situations"
            features={[
              'Listening by topic and difficulty',
              'Diverse question types',
              'Error analysis and improvement suggestions',
            ]}
            icon={
              <svg
                className="w-6 h-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            }
            href="/tests/listening"
          />
          <SkillCard
            title="Reading"
            description="Improve your ability to read and analyze English texts"
            features={[
              'Academic and General Reading',
              'Effective Reading Comprehension Strategies',
              'Specialized Vocabulary Instruction',
            ]}
            icon={
              <svg
                className="w-6 h-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                ></path>
              </svg>
            }
            href="/tests/reading"
          />

          <SkillCard
            title="Writing"
            description="Develop essay writing and graph description skills"
            features={[
              'AI Feedback by IELTS Criteria',
              'High Quality Sample Papers',
              'Advanced Vocabulary and Structure Suggestions',
            ]}
            icon={
              <svg
                className="w-6 h-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                ></path>
              </svg>
            }
            href="/tests/writing"
          />
        </div>
      </div>
    </section>
  );
}
