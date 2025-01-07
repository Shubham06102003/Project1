"use client";

import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import { db } from '@/utils/db';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { use } from 'react';

function Feedback({ params }) {
    const resolvedParams = use(params);
    const interviewId = resolvedParams.interviewId;

    const [feedbackList, setFeedbackList] = useState([]);
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        GetFeedback();
    }, []);

    useEffect(() => {
        if (category) {
        console.log("Updated category:", category );
        }
    }, [category]);


    const onSubmit = async (e) => {
        setLoading(true);
        const InputPrompt1 = `Job Role: ${jobPosition}, Job Description: ${jobDesc} Give me a category such as programming, health, creativity, etc based on the above parameter. Provide the answer in only one word as a field in JSON Format {Category: generated result}`;
        const result1 = await chatSession.sendMessage(InputPrompt1);
        // Process category
        const CategoryResp = result1.response
            .text()
            .replace("```json", "")
            .replace("```", "");
        console.log(JSON.parse(CategoryResp));

      const categoryName = JSON.parse(CategoryResp);
      setCategory(categoryName.Category); // Store the category value
      console.log("Category to set:", categoryName.Category);

      const topic = jobPosition +" "+ jobDesc;
          const resp1 = await db
          .insert(CourseList)
          .values({
            courseId:uuidv4(),
            name:topic,
            category:category
          })

    }

    let overallRating = 0;
    let len = Number(feedbackList.length);
    feedbackList?.forEach((item) => {
        let total = Number(item.rating);
        overallRating += total / len;
    });
    let roundedRating = overallRating.toFixed(2);

    const GetFeedback = async () => {
        const result = await db
            .select()
            .from(UserAnswer)
            .where(eq(UserAnswer.mockIdRef, interviewId))
            .orderBy(UserAnswer.id);
        console.log(result);
        setFeedbackList(result);
    };

    const lastFeedback = feedbackList[feedbackList.length - 1]; // Get the last feedback entry

    return (
        <div className="p-10">
            {feedbackList?.length === 0 ? (
                <h2 className="font-bold text-xl text-gray-500">
                    No Interview Feedback Record Found
                </h2>
            ) : (
                <>
                    <h2 className="text-3xl font-bold text-green-500">
                        Congratulations!
                    </h2>
                    <h2 className="font-bold text-2xl">
                        Here is your interview feedback
                    </h2>
                    <h2 className="text-sm text-gray-500">
                        Find below your soft skill and technical feedback
                    </h2>

                    {/* Soft Skill Feedback Section */}
                    {lastFeedback && (
                        <div className="mt-10">
                            <h3 className="text-2xl font-bold text-purple-500">Soft Skill Feedback</h3>
                            <div className="flex flex-col gap-4 mt-5 p-5 border rounded-lg bg-gray-50">
                                <h2 className="text-red-500">
                                    <strong>Video Rating:</strong> {lastFeedback.videoRating}
                                </h2>
                                <h2 className="text-purple-900">
                                    <strong>Feedback:</strong> {lastFeedback.videoFeedback}
                                </h2>
                                <h2 className="text-gray-900">
                                    <strong>Summary:</strong> {lastFeedback.videoSummary}
                                </h2>
                            </div>
                        </div>
                    )}

                    <h2 className="text-primary text-lg mt-10 my-3">
                        Your Technical interview rating: <strong>{roundedRating}/10</strong>
                    </h2>

                    {/* Technical Feedback Section */}
                    <h3 className="text-2xl font-bold text-blue-500 mt-5">Technical Feedback</h3>
                    {feedbackList.map((item, index) => (
                        <Collapsible key={index} className="mt-7">
                            <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full">
                                {item.question} <ChevronsUpDown className="h-5 w-5" />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-red-500 p-2 rounded border">
                                        <strong>Rating:</strong>
                                        {item.rating}
                                    </h2>
                                    <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                                        <strong>Your Answer: </strong>
                                        {item.userAns}
                                    </h2>
                                    <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                                        <strong>Correct Answer: </strong>
                                        {item.correctAns}
                                    </h2>
                                    <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary">
                                        <strong>Feedback: </strong>
                                        {item.feedback}
                                    </h2>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                </>
            )}
            <div className='flex mt-5 justify-between'>
            <Button onClick={() => router.replace('/dashboard')} className='hover:bg-accent'>Go Home</Button>
            <Button onClick={() => router.replace('/create-course')} className='hover:bg-accent'>Generate Course</Button>
            </div>

        </div>
    );
}

export default Feedback;