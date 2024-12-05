"use client"

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQ = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 py-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-semibold text-blue-700">{question}</h3>
        {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </div>
      {isOpen && <p className="text-gray-700 mt-2">{answer}</p>}
    </div>
  );
};

const FrequentlyAskedQuestions = () => {
  const faqs = [
    {
      question: "How do I sign up?",
      answer: "Click on the 'Sign Up Now' button and follow the instructions to create your account.",
    },
    {
      question: "Can I change my plan later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time from your account settings.",
    },
    {
      question: "How do I get feedback on my interviews?",
      answer: "After completing an interview, you will receive instant feedback on your performance.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and other secure payment methods.",
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, we offer a free trial for our premium features. Sign up to start your trial today.",
    },
    {
      question: "How many times can I take an interview?",
      answer: "You can take interviews as many times as you need. Our platform allows unlimited retakes to help you improve.",
    },
    {
      question: "Can I practice specific types of questions?",
      answer: "Yes, you can customize your mock interviews with various question types to focus on specific areas.",
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take data security seriously and use industry-standard measures to protect your information.",
    },
  ];

  return (
    <div className="w-full min-h-screen p-10">
      <h1 className="text-black text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <FAQ key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestions;