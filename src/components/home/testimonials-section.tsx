export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'MoonWild',
      role: 'Student, Ho Chi Minh City',
      avatar: 'NT',
      content:
        "I improved my IELTS Writing score from 6.0 to 7.5 after 3 months of using this platform. The AI ​​feedback is really detailed and helpful, helping me understand mistakes that I didn't notice before. It's also help me get along with actual Ielts test",
    },
    {
      name: 'Lê Hậu',
      role: 'Engineer, Da Nang',
      avatar: 'LH',
      content:
        'What I like most about this platform is the personalization. The AI ​​suggested exercises and materials based on my weaknesses, helping me focus on what needed the most improvement. As a result, my Reading score increased significantly.',
    },
    {
      name: 'Kazuyuki114',
      role: 'IELTS Teacher, Hanoi',
      avatar: 'TM',
      content:
        'As a teacher, I have introduced this platform to many of my students. Feedback on the test is very quick and close to the actual IELTS scoring criteria. Especially the Listening section has many different types of exercises to help students gradually get used to the exam.',
    },
  ];

  return (
    <section className="py-20 bg-black relative">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-gray-900 to-transparent"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What our users say about us
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Thousands of students have improved their IELTS scores with our
            platform. Here are some of their experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface TestimonialProps {
  testimonial: {
    name: string;
    role: string;
    avatar: string;
    content: string;
  };
}

function TestimonialCard({ testimonial }: TestimonialProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-6 rounded-lg relative">
      <div className="absolute -top-4 left-6 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
        <svg
          className="w-4 h-4 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
      <div className="mb-4 pt-4">
        <div className="flex items-center mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <p className="text-gray-300 text-sm italic mb-4">
          "{testimonial.content}"
        </p>
      </div>
      <div className="flex items-center">
        <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center mr-3">
          <span className="text-white font-semibold">{testimonial.avatar}</span>
        </div>
        <div>
          <h4 className="text-white font-medium">{testimonial.name}</h4>
          <p className="text-gray-400 text-sm">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}
