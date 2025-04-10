import Link from 'next/link';
import { Button } from '../ui/button';

export default function AIFeaturesSection() {
  return (
    <section className="py-20 bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2">
            <div className="p-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg">
              <div className="bg-gray-900 p-6 rounded-lg">
                <div className="grid grid-cols-1 gap-4">
                  <FeatureCard
                    title="Smart analysis"
                    description="AI analyzes your work according to each IELTS assessment criterion, helping you understand your strengths and weaknesses."
                    icon={
                      <svg
                        className="w-5 h-5 text-blue-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        ></path>
                      </svg>
                    }
                  />

                  <FeatureCard
                    title="Detailed feedback"
                    description="Get specific feedback on each mistake, suggestions for improvement, and examples for each section of your work."
                    icon={
                      <svg
                        className="w-5 h-5 text-blue-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        ></path>
                      </svg>
                    }
                  />

                  <FeatureCard
                    title="Personalized recommendations"
                    description="Get personalized workout recommendations based on your results, helping to focus on the areas that need the most improvement."
                    icon={
                      <svg
                        className="w-5 h-5 text-blue-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        ></path>
                      </svg>
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              AI Technology <span className="text-blue-500">advanced</span>
            </h2>
            <p className="text-gray-300 mb-6">
              We use advanced artificial intelligence to analyze and evaluate
              your work according to international IELTS standards. Our system
              is trained on thousands of real tests to ensure accurate and
              useful feedback.
            </p>
            <p className="text-gray-300 mb-8">
              With IELTS Online Test, you not only know your score, but also
              understand why and how to improve. Each feedback is personalized
              to you, making your test preparation journey more effective.
            </p>
            <Link href="/about-ai">
              <Button variant="outline" className="border-blue-500 text-black">
                Learn about our AI technology
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="bg-blue-900/20 border border-blue-500/20 p-4 rounded-lg">
      <div className="flex items-center mb-2">
        {icon}
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  );
}
