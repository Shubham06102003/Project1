"use client"

import { Check, X } from "lucide-react";
import Link from "next/link";

const HowItWorks = () => {
  return (
    <div className="w-full min-h-screen p-10">
      <h1 className="text-black text-4xl font-bold mb-8 text-center">How It Works</h1>
      <div className="space-y-16 max-w-4xl mx-auto">
        
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-700">Step 1: Sign Up</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Create an account with us to get started. You can use your email or sign up through Google or other social media platforms.
          </p>
          <Link href="/sign-up">
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition duration-300">
              Sign Up Now
            </button>
          </Link>
        </section>
        
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-700">Step 2: Choose a Plan</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Select a plan that suits your needs. We offer both free and paid plans with varying features.
          </p>
          <Link href="/dashboard/upgrade">
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition duration-300">
              View Plans
            </button>
          </Link>
        </section>
        
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-700">Step 3: Create Mock Interviews</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Once you have chosen a plan, you can start creating mock interviews. Customize your interviews with various questions and formats.
          </p>
          <div className="flex items-center gap-2 text-green-500">
            <Check /> Easy to use interface
          </div>
          <div className="flex items-center gap-2 text-green-500">
            <Check /> Multiple question types
          </div>
        </section>
        
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-700">Step 4: Take Mock Interviews</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Take the mock interviews you have created. Practice as many times as you need to improve your skills.
          </p>
          <div className="flex items-center gap-2 text-green-500">
            <Check /> Realistic interview experience
          </div>
          <div className="flex items-center gap-2 text-green-500">
            <Check /> Instant feedback
          </div>
        </section>
        
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-700">Step 5: Review Your Performance</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            After completing your interviews, review your performance. Get detailed feedback and suggestions for improvement.
          </p>
          <div className="flex items-center gap-2 text-green-500">
            <Check /> Comprehensive feedback
          </div>
          <div className="flex items-center gap-2 text-green-500">
            <Check /> Areas of improvement
          </div>
        </section>
        
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-700">Step 6: Upgrade Your Skills</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Use the feedback to work on your weak areas. Keep practicing with more mock interviews and improve your skills.
          </p>
          <div className="flex items-center gap-2 text-green-500">
            <Check /> Continuous improvement
          </div>
          <div className="flex items-center gap-2 text-green-500">
            <Check /> Unlimited practice
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-700">Why Choose Us?</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            We are committed to helping you prepare for your interviews in the best possible way. Here are some reasons to choose our platform:
          </p>
          <div className="flex items-center gap-2 text-green-500">
            <Check /> User-friendly interface
          </div>
          <div className="flex items-center gap-2 text-green-500">
            <Check /> Comprehensive feedback
          </div>
          <div className="flex items-center gap-2 text-green-500">
            <Check /> Wide range of questions
          </div>
          <div className="flex items-center gap-2 text-green-500">
            <Check /> Affordable plans
          </div>
        </section>
      </div>
    </div>
  );
};

export default HowItWorks;