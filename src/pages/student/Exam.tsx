import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  ChevronLeft,
  Trophy,
  Timer,
  Shuffle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { showSuccess } from "@/utils/toast";
import { CCC_QUESTION_BANK, Question } from "@/data/ccc-questions";

const Exam = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(5400); // 90 minutes for CCC
  const [isFinished, setIsFinished] = useState(false);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);

  // Randomization Logic: Shuffle and pick 100 questions
  const shuffleQuestions = (course: string) => {
    let pool: Question[] = [];
    if (course.includes("CCC")) {
      pool = [...CCC_QUESTION_BANK];
    } else {
      // Fallback for other courses if needed
      pool = [...CCC_QUESTION_BANK].slice(0, 10);
    }

    // Fisher-Yates Shuffle
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    // Pick 100 for CCC, or all if less
    return pool.slice(0, course.includes("CCC") ? 100 : 10);
  };

  useEffect(() => {
    let timer: any;
    if (isExamStarted && !isFinished && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isExamStarted) {
      handleFinish();
    }
    return () => clearInterval(timer);
  }, [isExamStarted, isFinished, timeLeft]);

  const handleStartExam = (course: string) => {
    const randomized = shuffleQuestions(course);
    setActiveQuestions(randomized);
    setSelectedCourse(course);
    setIsExamStarted(true);
    setTimeLeft(course.includes("CCC") ? 5400 : 600);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsFinished(false);
  };

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestionIndex]: answer });
  };

  const handleNext = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinish = () => {
    setIsFinished(true);
    showSuccess("Exam submitted successfully!");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const calculateScore = () => {
    let score = 0;
    activeQuestions.forEach((q, index) => {
      if (answers[index] === q.correct) score++;
    });
    return score;
  };

  if (isFinished) {
    const score = calculateScore();
    const total = activeQuestions.length;
    const percentage = (score / total) * 100;
    const status = percentage >= 50 ? "PASSED" : "FAILED";

    return (
      <div className="min-h-screen bg-[#FAFAFF] flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-none shadow-2xl rounded-[2.5rem] bg-white text-center p-10 animate-in zoom-in duration-500">
          <div className="flex justify-center mb-6">
            <div className={`p-6 rounded-full ${status === 'PASSED' ? 'bg-green-100' : 'bg-red-100'}`}>
              <Trophy className={`h-16 w-16 ${status === 'PASSED' ? 'text-green-600' : 'text-red-600'}`} />
            </div>
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">Exam Result</h1>
          <p className="text-gray-500 font-medium mb-8">
            {status === 'PASSED' ? "Congratulations! You've cleared the exam." : "Keep practicing! You can try again soon."}
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-violet-50 rounded-3xl p-6">
              <div className="text-3xl font-black text-violet-600">{score}/{total}</div>
              <div className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">Score</div>
            </div>
            <div className={`rounded-3xl p-6 ${status === 'PASSED' ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className={`text-3xl font-black ${status === 'PASSED' ? 'text-green-600' : 'text-red-600'}`}>{status}</div>
              <div className={`text-[10px] font-bold uppercase tracking-widest ${status === 'PASSED' ? 'text-green-400' : 'text-red-400'}`}>Status</div>
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={() => setIsExamStarted(false)} 
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-black h-14 rounded-2xl shadow-lg"
            >
              Back to Exams
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/student')} 
              className="w-full font-bold text-gray-500"
            >
              Go to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (isExamStarted && selectedCourse) {
    const currentQuestion = activeQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / activeQuestions.length) * 100;

    return (
      <div className="min-h-screen bg-[#FAFAFF] pb-20">
        <nav className="bg-white border-b border-violet-100 px-8 h-20 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-violet-600 rounded-xl">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-black text-gray-900">{selectedCourse} Final Exam</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Question {currentQuestionIndex + 1} of {activeQuestions.length}</div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl font-black">
              <Timer className="h-5 w-5" />
              {formatTime(timeLeft)}
            </div>
            <Button variant="outline" onClick={handleFinish} className="rounded-xl font-bold border-red-100 text-red-600 hover:bg-red-50">
              Finish Exam
            </Button>
          </div>
        </nav>

        <main className="max-w-3xl mx-auto mt-12 px-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black text-violet-600 uppercase tracking-widest">Progress</span>
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 mb-12 bg-violet-100" />
          
          <Card className="border-none shadow-xl shadow-violet-100/50 rounded-[2.5rem] bg-white p-10 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 mb-6">
              <Badge className="bg-violet-50 text-violet-600 border-none font-bold px-3 py-1">
                {currentQuestion.module}
              </Badge>
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-8 leading-tight">
              {currentQuestion.question}
            </h2>

            <RadioGroup 
              value={answers[currentQuestionIndex]} 
              onValueChange={handleAnswer}
              className="space-y-4"
            >
              {currentQuestion.options.map((option, i) => (
                <div key={i} className={`flex items-center space-x-3 p-5 rounded-2xl border-2 transition-all cursor-pointer ${answers[currentQuestionIndex] === option ? 'border-violet-600 bg-violet-50' : 'border-gray-50 hover:border-violet-100'}`}>
                  <RadioGroupItem value={option} id={`option-${i}`} className="text-violet-600" />
                  <Label htmlFor={`option-${i}`} className="flex-1 font-bold text-gray-700 cursor-pointer">{option}</Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between mt-12">
              <Button 
                variant="ghost" 
                onClick={handlePrevious} 
                disabled={currentQuestionIndex === 0}
                className="rounded-xl font-bold text-gray-500"
              >
                <ChevronLeft className="mr-2 h-5 w-5" /> Previous
              </Button>
              
              {currentQuestionIndex === activeQuestions.length - 1 ? (
                <Button 
                  onClick={handleFinish} 
                  className="bg-green-600 hover:bg-green-700 text-white font-black px-8 h-12 rounded-xl shadow-lg"
                >
                  Submit Exam <CheckCircle2 className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <Button 
                  onClick={handleNext} 
                  className="bg-violet-600 hover:bg-violet-700 text-white font-black px-8 h-12 rounded-xl shadow-lg"
                >
                  Next Question <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              )}
            </div>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFF]">
      <nav className="bg-white border-b border-violet-100 px-8 h-20 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-xl shadow-lg">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <span className="font-black text-xl tracking-tighter text-gray-900">EXAM PORTAL</span>
        </div>
        <Button variant="ghost" onClick={() => navigate('/student')} className="font-bold text-gray-500">
          Back to Dashboard
        </Button>
      </nav>

      <main className="p-10 max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Available Exams</h1>
          <p className="text-gray-500 font-medium">Select a course to start your assessment. Each session generates a unique set of questions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {["CCC (Computer Concepts)", "Physics", "Mathematics"].map((course) => (
            <Card key={course} className="group border-none shadow-xl shadow-violet-100/50 rounded-[2.5rem] bg-white overflow-hidden hover:scale-[1.02] transition-all duration-500">
              <div className="h-32 bg-gradient-to-br from-violet-100 to-violet-200 p-8 flex items-end">
                <div className="p-3 bg-white rounded-2xl shadow-sm">
                  <BookOpen className="h-6 w-6 text-violet-600" />
                </div>
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-black text-gray-900 mb-2">{course}</h3>
                <div className="flex items-center gap-4 text-sm font-bold text-gray-400 mb-8">
                  <span className="flex items-center gap-1.5"><Clock size={16} /> {course.includes("CCC") ? "90 Mins" : "10 Mins"}</span>
                  <span className="flex items-center gap-1.5"><Shuffle size={16} /> {course.includes("CCC") ? "100 Random MCQs" : "10 MCQs"}</span>
                </div>
                <Button 
                  onClick={() => handleStartExam(course)}
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white font-black h-12 rounded-xl shadow-lg shadow-violet-100"
                >
                  Start Exam
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Exam;