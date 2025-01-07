"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAI";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { db } from "@/utils/db";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";
import { CourseList } from "@/configs/schema";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPositon] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState("");
  const router = useRouter();
  const { user } = useUser();


  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    console.log(jobPosition, jobDesc, jobExperience);

    const InputPrompt = `Job Role: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}, Based on Job Role, Job Description, Years of Experience create an array of ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} questions and answers in JSON format. Each question should be followed by a relevant answer in the same format as below:

    {
      "questions": [
        {
          "question": "Question text here",
          "answer": "Answer text here"
        },
        ...
      ]
    }`;
    


    try {
      const result = await chatSession.sendMessage(InputPrompt);

      // Process result for questions and answers
      const MockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");
      console.log(JSON.parse(MockJsonResp));

      
      setJsonResponse(MockJsonResp);

      if (MockJsonResp) {
        const resp = await db
          .insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResponse: MockJsonResp,
            jobPosition: jobPosition,
            jobDesc: jobDesc,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("DD-MM-YYYY"),
          })
          .returning({ mockId: MockInterview.mockId });

        console.log("Inserted ID:", resp);
        if (resp) {
          setOpenDialog(false);
          router.push("/dashboard/interview/" + resp[0].mockId);
        }
      } else {
        console.log("ERROR");
      }
    } catch (error) {
      console.error("Error processing prompts:", error);
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
      <h2 className="text-lg text-center">+ Create New Interview</h2>
    </div>
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Tell us more about your job interviewing
          </DialogTitle>
          <DialogDescription asChild>
            <form onSubmit={onSubmit}>
              <div>
                Add details about your job position/role, job description, and
                years of experience
              </div>
              <div className="mt-7 my-3">
                <label>Job Role / Job Position</label>
                <Input
                  placeholder="Ex. Full Stack Developer"
                  required
                  onChange={(event) => setJobPositon(event.target.value)}
                />
              </div>
              <div className="my-3">
                <label>Job Description / Tech Stack (in short)</label>
                <Textarea
                  placeholder="Ex. C++, React, mySQL, Node.js, etc."
                  required
                  onChange={(event) => setJobDesc(event.target.value)}
                />
              </div>
              <div className="my-3">
                <label>Years of Experience</label>
                <Input
                  placeholder="Ex. 5"
                  type="number"
                  max="100"
                  required
                  onChange={(event) => setJobExperience(event.target.value)}
                />
              </div>
              <div className="flex gap-5 justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading} className="hover:bg-slate-400">
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin" />
                      'Please wait generating from AI'
                    </>
                  ) : (
                    "Start Interview"
                  )}
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  </div>

  );
}

export default AddNewInterview;
