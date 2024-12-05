"use client"

import { Check, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Upgrade = () => {
  const [paidMessage, setPaidMessage] = useState("");

  const handlePaidClick = () => {
    setPaidMessage("Plan has not released yet..");
  };

  return (
    <div className="w-full h-[90vh] flex flex-col items-center justify-center">
      <h1 className="text-black text-4xl font-bold text-center mb-10">Upgrade</h1>
      <div className="flex items-center justify-center w-full gap-10">
        <div className="max-w-lg rounded-xl overflow-hidden shadow-lg p-8 bg-gray-100 text-black flex flex-col items-center justify-evenly gap-y-4 transform transition-all hover:scale-105">
          <div className="font-bold text-3xl mb-2">Free</div>
          <div className="text-gray-700 text-2xl mb-4">$0/month</div>
          <ul className="mb-4">
            <li className="mb-2 text-green-500 flex gap-2">
              <Check /> Create Mock Interviews
            </li>
            <li className="mb-2 text-green-500 flex gap-2">
              <Check /> Unlimited Retake of Interviews
            </li>
            <li className="mb-2 text-red-500 flex gap-2">
              <X /> Practice Question
            </li>
            <li className="mb-2 text-red-500 flex gap-2">
              <X /> MCQ Tests
            </li>
          </ul>
          <Link href="/dashboard">
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
              Get Started
            </button>
          </Link>
        </div>
        <div className="max-w-lg rounded-xl overflow-hidden shadow-lg p-8 bg-gray-100 text-black flex flex-col items-center justify-evenly gap-y-4 transform transition-all hover:scale-105">
          <div className="font-bold text-3xl mb-2">Paid (Upcoming)</div>
          <div className="text-gray-700 text-2xl mb-4">$5/month</div>
          <ul className="mb-4">
            <li className="mb-2 text-green-500 flex gap-2">
              <Check /> Create Mock Interviews
            </li>
            <li className="mb-2 text-green-500 flex gap-2">
              <Check /> Unlimited Retake of Interviews
            </li>
            <li className="mb-2 text-green-500 flex gap-2">
              <Check /> Practice Question
            </li>
            <li className="mb-2 text-green-500 flex gap-2">
              <Check /> MCQ Tests
            </li>
          </ul>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            onClick={handlePaidClick}
          >
            Get Started
          </button>
          {paidMessage && (
            <div className="mt-4 text-red-500 font-bold">{paidMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upgrade;