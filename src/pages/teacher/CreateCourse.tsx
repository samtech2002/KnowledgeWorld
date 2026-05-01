import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Upload, 
  Plus, 
  Trash2, 
  Save, 
  Rocket,
  BookOpen,
  Video,
  FileText,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { showSuccess } from "@/utils/toast";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [isPublishing, setIsPublishing] = useState(false);
  const [curriculum, setCurriculum] = useState(['Introduction', 'Core Concepts']);

  const addLesson = () => setCurriculum([...curriculum, '']);
  const removeLesson = (index: number) => setCurriculum(curriculum.filter((_, i) => i !== index));
  const updateLesson = (index: number, value: string) => {
    const newCurriculum = [...curriculum];
    newCurriculum[index] = value;
    setCurriculum(newCurriculum);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublishing(true);
    setTimeout(() => {
      showSuccess("Course published and activated successfully!");
      navigate('/teacher');
      setIsPublishing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFF] pb-20">
      <nav className="bg-white/80 backdrop-blur-md border-b border-violet-100 px-8 h-16 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/teacher')} className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-black text-xl text-gray-900">Create New Course</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl font-bold border-violet-100 text-violet-600">Save Draft</Button>
          <Button 
            onClick={handlePublish} 
            disabled={isPublishing}
            className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:opacity-90 text-white font-black px-6 rounded-xl shadow-lg shadow-violet-100"
          >
            {isPublishing ? "Activating..." : "Publish Course"} <Rocket className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Info */}
          <Card className="border-none shadow-xl shadow-violet-100/50 rounded-[2rem] overflow-hidden bg-white/80 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-black flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-violet-600" /> Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="font-bold text-gray-700">Course Title</Label>
                <Input placeholder="e.g. Advanced Quantum Physics" className="h-12 rounded-xl border-violet-50 focus:ring-violet-500" />
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-gray-700">Course Description</Label>
                <Textarea placeholder="Describe what students will learn..." className="min-h-[150px] rounded-xl border-violet-50 focus:ring-violet-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-bold text-gray-700">Category</Label>
                  <Input placeholder="e.g. Science" className="h-12 rounded-xl border-violet-50" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-gray-700">Price (₹)</Label>
                  <Input type="number" placeholder="0 for free" className="h-12 rounded-xl border-violet-50" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Curriculum */}
          <Card className="border-none shadow-xl shadow-violet-100/50 rounded-[2rem] overflow-hidden bg-white/80 backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-black flex items-center gap-2">
                <Video className="h-5 w-5 text-violet-600" /> Course Curriculum
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {curriculum.map((lesson, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className="h-10 w-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 font-bold shrink-0">
                    {index + 1}
                  </div>
                  <Input 
                    value={lesson} 
                    onChange={(e) => updateLesson(index, e.target.value)}
                    placeholder="Lesson title..." 
                    className="h-12 rounded-xl border-violet-50" 
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeLesson(index)}
                    className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}
              <Button 
                variant="outline" 
                onClick={addLesson}
                className="w-full h-12 rounded-xl border-dashed border-violet-200 text-violet-600 hover:bg-violet-50 font-bold"
              >
                <Plus className="mr-2 h-4 w-4" /> Add New Lesson
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Media Upload */}
          <Card className="border-none shadow-xl shadow-violet-100/50 rounded-[2rem] overflow-hidden bg-white/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg font-black">Course Thumbnail</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-2xl border-2 border-dashed border-violet-100 bg-violet-50/30 flex flex-col items-center justify-center text-center p-6 group hover:border-violet-300 transition-colors cursor-pointer">
                <div className="p-3 bg-white rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="h-6 w-6 text-violet-600" />
                </div>
                <p className="text-sm font-bold text-gray-600">Click to upload image</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card className="border-none shadow-xl shadow-violet-100/50 rounded-[2rem] overflow-hidden bg-white/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg font-black">Course Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-violet-50/50 rounded-xl">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-violet-600" />
                  <span className="text-sm font-bold text-gray-700">Certificate</span>
                </div>
                <div className="h-5 w-10 bg-violet-600 rounded-full relative">
                  <div className="absolute right-1 top-1 h-3 w-3 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-violet-50/50 rounded-xl">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-violet-600" />
                  <span className="text-sm font-bold text-gray-700">Public Access</span>
                </div>
                <div className="h-5 w-10 bg-violet-600 rounded-full relative">
                  <div className="absolute right-1 top-1 h-3 w-3 bg-white rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CreateCourse;