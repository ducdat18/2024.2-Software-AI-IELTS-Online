import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-black/80" />
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-30" />
      </div>

      <div className="container mx-auto px-4 z-10 mt-16">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Practice IELTS Online <br />
              <span className="text-blue-500">With AI support</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-lg">
              AI-powered online test preparation platform helps you improve your
              Listening, Reading, and Writing skills with detailed feedback and
              personalized suggestions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white text-base px-8 py-6">
                  Start free now
                  <svg
                    className="ml-2 h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </Link>
              <Link href="#features">
                <Button
                  variant="outline"
                  className="border-blue-500 text-black text-base px-8 py-6"
                >
                  Learn more about us
                </Button>
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/2 relative">
            <div className="bg-blue-900/10 backdrop-blur-sm border border-blue-500/20 rounded-lg p-6 shadow-xl">
              <div className="flex justify-between mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-gray-400 text-sm">
                  IELTS Writing Feedback
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-800 rounded p-4">
                  <div className="text-white text-sm">
                    <span className="text-blue-400 font-medium">
                      Task Achievement:
                    </span>{' '}
                    7.0
                  </div>
                  <div className="mt-2 text-gray-300 text-xs">
                    Your essay addresses all parts of the task with relevant
                    ideas that are fully developed. Consider adding more
                    specific examples to strengthen your arguments.
                  </div>
                </div>
                <div className="bg-gray-800 rounded p-4">
                  <div className="text-white text-sm">
                    <span className="text-blue-400 font-medium">
                      Coherence & Cohesion:
                    </span>{' '}
                    6.5
                  </div>
                  <div className="mt-2 text-gray-300 text-xs">
                    Your essay is generally well-organized with good use of
                    cohesive devices. Work on more precise paragraph transitions
                    to improve overall coherence.
                  </div>
                </div>
                <div className="bg-gray-800 rounded p-4">
                  <div className="text-white text-sm">
                    <span className="text-blue-400 font-medium">
                      Lexical Resource:
                    </span>{' '}
                    7.0
                  </div>
                  <div className="mt-2 text-gray-300 text-xs">
                    You use a good range of vocabulary with some flexibility and
                    precision. Try to incorporate more uncommon vocabulary items
                    appropriately.
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <div className="text-blue-500 text-xl font-bold">
                  Overall: 6.5
                </div>
                <Button size="sm" className="bg-blue-600">
                  Show Detail
                </Button>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-2xl"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-900/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
