"use client";

import React, { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import OverviewTab from '@/components/admin/OverviewTab';
import StudentsTab from '@/components/admin/StudentsTab';
import PartnersTab from '@/components/admin/PartnersTab';
import CoursesTab from '@/components/admin/CoursesTab';
import SubscriptionsTab from '@/components/admin/SubscriptionsTab';
import BlogTab from '@/components/admin/BlogTab';
import SettingsTab from '@/components/admin/SettingsTab';
import NotificationsTab from '@/components/admin/NotificationsTab';
import { showSuccess } from "@/utils/toast";

const INITIAL_COURSES = [
  { id: 1, title: "Quantum Mechanics Mastery", instructor: "Dr. Sarah Chen", category: "Physics", price: "2499", students: 12500, status: "Active" },
  { id: 2, title: "Calculus: From Zero to Hero", instructor: "Prof. Rajesh Kumar", category: "Mathematics", price: "1999", students: 8200, status: "Active" },
  { id: 7, title: "CCC: Computer Concepts Mastery", instructor: "Prof. Alok Mishra", category: "Computer", price: "1700", students: 20100, status: "Active" },
  { id: 3, title: "Organic Chemistry Simplified", instructor: "Dr. Amit Shah", category: "Chemistry", price: "0", students: 5100, status: "Draft" },
];

const INITIAL_STUDENTS = [
  { 
    id: 1, 
    name: "Aryan Sharma", 
    email: "aryan@example.com", 
    plan: "Yearly", 
    status: "Active", 
    joinDate: "2023-10-01", 
    expiryDate: "2024-10-01", 
    amount: "4499",
    enrolledCourses: ["Quantum Mechanics Mastery", "Calculus: From Zero to Hero"],
    exams: [
      { subject: "Physics", score: "3/3", date: "2024-01-10" },
      { subject: "Mathematics", score: "2/2", date: "2024-01-12" }
    ]
  },
  { 
    id: 2, 
    name: "Priya Patel", 
    email: "priya@example.com", 
    plan: "Monthly", 
    status: "Active", 
    joinDate: "2024-01-15", 
    expiryDate: "2024-02-15", 
    amount: "499",
    enrolledCourses: ["CCC: Computer Concepts Mastery"],
    exams: [
      { subject: "CCC", score: "2/3", date: "2024-01-20" }
    ]
  },
  { 
    id: 3, 
    name: "Rahul Verma", 
    email: "rahul@example.com", 
    plan: "Quarterly", 
    status: "Expired", 
    joinDate: "2023-06-10", 
    expiryDate: "2023-09-10", 
    amount: "1299",
    enrolledCourses: ["Organic Chemistry Simplified"],
    exams: []
  },
  { 
    id: 4, 
    name: "Anjali Gupta", 
    email: "anjali@example.com", 
    plan: "Trial", 
    status: "Active", 
    joinDate: "2024-01-20", 
    expiryDate: "2024-01-27", 
    amount: "0",
    enrolledCourses: ["Calculus: From Zero to Hero"],
    exams: []
  },
  { 
    id: 5, 
    name: "Siddharth Singh", 
    email: "sid@example.com", 
    plan: "Half-Yearly", 
    status: "Active", 
    joinDate: "2023-11-05", 
    expiryDate: "2024-05-05", 
    amount: "2499",
    enrolledCourses: ["Quantum Mechanics Mastery"],
    exams: [
      { subject: "Physics", score: "1/3", date: "2023-12-15" }
    ]
  },
];

const INITIAL_PARTNERS = [
  { id: 1, name: "Prashant Sharma", email: "prashant@example.com", totalReferrals: 48, totalEarnings: 12450, status: "Active", joinDate: "2023-10-12" },
  { id: 2, name: "Vikram Singh", email: "vikram@example.com", totalReferrals: 12, totalEarnings: 3200, status: "Pending KYC", joinDate: "2024-01-05" },
  { id: 3, name: "Sneha Reddy", email: "sneha@example.com", totalReferrals: 85, totalEarnings: 24100, status: "Active", joinDate: "2023-08-20" },
  { id: 4, name: "Amit Patel", email: "amit@example.com", totalReferrals: 5, totalEarnings: 1200, status: "Suspended", joinDate: "2023-12-15" },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [partners, setPartners] = useState(INITIAL_PARTNERS);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [subscriptions, setSubscriptions] = useState({
    monthly: "499",
    quarterly: "1299",
    halfYearly: "2499",
    yearly: "4499"
  });

  const handleSaveSubscriptions = () => {
    showSuccess("Subscription plans updated successfully!");
  };

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter(c => c.id !== id));
    showSuccess("Course removed successfully!");
  };

  const handleAddCourse = (e: React.FormEvent<HTMLFormElement>, isFree: boolean) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCourse = {
      id: Date.now(),
      title: formData.get('title') as string,
      instructor: formData.get('instructor') as string,
      category: formData.get('category') as string,
      price: isFree ? "0" : (formData.get('price') as string),
      students: 0,
      status: "Active"
    };
    setCourses([newCourse, ...courses]);
    showSuccess("New course added successfully!");
  };

  const handleRegisterStudent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const plan = formData.get('plan') as string;
    const amount = plan === 'Monthly' ? subscriptions.monthly : 
                   plan === 'Quarterly' ? subscriptions.quarterly :
                   plan === 'Half-Yearly' ? subscriptions.halfYearly :
                   plan === 'Yearly' ? subscriptions.yearly : "0";

    const newStudent = {
      id: Date.now(),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      plan: plan,
      status: "Active",
      joinDate: new Date().toISOString().split('T')[0],
      expiryDate: "2025-01-01",
      amount: amount,
      enrolledCourses: [],
      exams: []
    };
    setStudents([newStudent, ...students]);
    showSuccess(`${newStudent.name} has been registered and enrolled!`);
  };

  const handleEditCourse = (e: React.FormEvent<HTMLFormElement>, isFree: boolean, editingCourse: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedCourses = courses.map(c => {
      if (c.id === editingCourse.id) {
        return {
          ...c,
          title: formData.get('title') as string,
          instructor: formData.get('instructor') as string,
          category: formData.get('category') as string,
          price: isFree ? "0" : (formData.get('price') as string),
        };
      }
      return c;
    });
    setCourses(updatedCourses);
    showSuccess("Course updated successfully!");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFF] flex">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 overflow-y-auto">
        <AdminHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div className="p-10 max-w-7xl mx-auto">
          {activeTab === "Overview" && <OverviewTab students={students} />}
          {activeTab === "Students" && (
            <StudentsTab 
              students={students} 
              searchQuery={searchQuery} 
              onRegisterStudent={handleRegisterStudent} 
            />
          )}
          {activeTab === "Partners" && (
            <PartnersTab 
              partners={partners} 
              searchQuery={searchQuery} 
            />
          )}
          {activeTab === "Courses" && (
            <CoursesTab 
              courses={courses} 
              searchQuery={searchQuery} 
              onAddCourse={handleAddCourse} 
              onEditCourse={handleEditCourse} 
              onDeleteCourse={handleDeleteCourse} 
            />
          )}
          {activeTab === "Blog" && <BlogTab />}
          {activeTab === "Subscriptions" && (
            <SubscriptionsTab 
              subscriptions={subscriptions} 
              setSubscriptions={setSubscriptions} 
              onSave={handleSaveSubscriptions} 
            />
          )}
          {activeTab === "Notifications" && <NotificationsTab />}
          {activeTab === "Settings" && <SettingsTab />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;