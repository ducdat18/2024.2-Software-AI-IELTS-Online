'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function CreateTestPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    skill: 'listening',
    difficulty: 'medium',
    duration: 40,
    description: '',
    instructions: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real application, this would be an API call to create the test
      console.log('Creating test with data:', formData);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate a unique ID for the new test
      const testId = `${formData.skill}-test-${Date.now()}`;

      // Navigate to the test detail page
      router.push(`/admin/content-management/tests/${testId}`);
    } catch (error) {
      console.error('Error creating test:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            Create New Test
          </h1>
          <p className="text-gray-400">
            Fill in the details below to create a new IELTS test for the
            platform. You'll be able to add sections and questions in the next
            steps.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Test Details</CardTitle>
              <CardDescription className="text-gray-400">
                Basic information about the test
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">
                  Test Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., IELTS Academic Reading Practice Test 1"
                  value={formData.title}
                  onChange={handleChange}
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="skill" className="text-white">
                    Skill
                  </Label>
                  <Select
                    value={formData.skill}
                    onValueChange={(value) =>
                      handleSelectChange('skill', value)
                    }
                  >
                    <SelectTrigger
                      id="skill"
                      className="bg-gray-700 border-gray-600 text-white"
                    >
                      <SelectValue placeholder="Select skill" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="listening">Listening</SelectItem>
                      <SelectItem value="reading">Reading</SelectItem>
                      <SelectItem value="writing">Writing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty" className="text-white">
                    Difficulty
                  </Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value) =>
                      handleSelectChange('difficulty', value)
                    }
                  >
                    <SelectTrigger
                      id="difficulty"
                      className="bg-gray-700 border-gray-600 text-white"
                    >
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                      <SelectItem value="very_hard">Very Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-white">
                    Duration (minutes)
                  </Label>
                  <Input
                    id="duration"
                    name="duration"
                    type="number"
                    value={formData.duration}
                    onChange={handleNumberChange}
                    min={1}
                    className="bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Provide a brief description of the test content"
                  value={formData.description}
                  onChange={handleChange}
                  className="bg-gray-700 border-gray-600 text-white h-20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions" className="text-white">
                  Instructions
                </Label>
                <Textarea
                  id="instructions"
                  name="instructions"
                  placeholder="Enter test instructions for students"
                  value={formData.instructions}
                  onChange={handleChange}
                  className="bg-gray-700 border-gray-600 text-white h-32"
                />
              </div>

              {formData.skill === 'listening' && (
                <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-900/40">
                  <h4 className="text-white font-medium mb-2">
                    Listening Test Requirements
                  </h4>
                  <p className="text-gray-400 text-sm">
                    For listening tests, you'll need to add audio files and
                    create sections with questions that correspond to the audio
                    content. You'll be prompted to upload audio files in the
                    next step.
                  </p>
                </div>
              )}

              {formData.skill === 'reading' && (
                <div className="p-4 bg-green-900/20 rounded-lg border border-green-900/40">
                  <h4 className="text-white font-medium mb-2">
                    Reading Test Requirements
                  </h4>
                  <p className="text-gray-400 text-sm">
                    For reading tests, you'll need to add passage text and
                    create questions based on the passages. You'll be able to
                    add passages in the next step.
                  </p>
                </div>
              )}

              {formData.skill === 'writing' && (
                <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-900/40">
                  <h4 className="text-white font-medium mb-2">
                    Writing Test Requirements
                  </h4>
                  <p className="text-gray-400 text-sm">
                    For writing tests, you'll need to create task prompts and
                    provide marking criteria. You'll be able to create tasks in
                    the next step.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href="/admin/content-management">
                <Button
                  variant="outline"
                  className="text-white border-gray-600"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  'Create Test'
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
