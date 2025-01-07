"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import { use } from 'react'; // Import `use()` for resolving params
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({ params }) {
    const resolvedParams = use(params); // Resolve params asynchronously

    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
    const [activeQuestionIndex,setActiveQuestionIndex]=useState(0);

    useEffect(() => {
        if (resolvedParams?.interviewId) {
            GetInterviewDetails();
        }
    }, [resolvedParams?.interviewId]); // Trigger effect when resolvedParams is ready

    const GetInterviewDetails = async () => {
        const result = await db
            .select()
            .from(MockInterview)
            .where(eq(MockInterview.mockId, resolvedParams.interviewId));

        const jsonMockResp = JSON.parse(result[0].jsonMockResponse);
        console.log(jsonMockResp.questions);
        setMockInterviewQuestion(jsonMockResp.questions);
        setInterviewData(result[0]);
    };

    return <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            {/* Questions  */}
            <QuestionsSection 
            mockInterviewQuestion={mockInterviewQuestion} 
            activeQuestionIndex={activeQuestionIndex}
            />
            {/* Video/Audio  */}
            <RecordAnswerSection
            mockInterviewQuestion={mockInterviewQuestion} 
            activeQuestionIndex={activeQuestionIndex}
            interviewData={interviewData}
            />
        </div>
        <div className='flex justify-end gap-6'>
          { activeQuestionIndex>0 && 
          <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)} className='hover:bg-accent'>Previous Question</Button> }
          {activeQuestionIndex!=mockInterviewQuestion?.length-1 &&
          <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)} className='hover:bg-accent'>Next Question</Button>}
          {activeQuestionIndex==mockInterviewQuestion?.length-1 &&
           <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
              <Button className='hover:bg-accent'>End Interview</Button>
           </Link>
           }
        </div>
    </div>;
}

export default StartInterview;
