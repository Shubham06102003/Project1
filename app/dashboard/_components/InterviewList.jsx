// "use client";

// import { db } from '@/utils/db';
// import { MockInterview } from '@/utils/schema';
// import { useUser } from '@clerk/nextjs';
// import React, { useEffect, useState } from 'react';
// import { eq, desc } from 'drizzle-orm';
// import InterviewItemCard from './InterviewItemCard';
// import { Loader2 } from 'lucide-react';

// function InterviewList() {
//   const { user } = useUser();
//   const [interviewList, setInterviewList] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (user) {
//       GetInterviewList();
//     }
//   }, [user]);

//   const GetInterviewList = async () => {
//     setLoading(true);
//     const result = await db
//       .select()
//       .from(MockInterview)
//       .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
//       .orderBy(desc(MockInterview.id));
//     setInterviewList(result);
//     setLoading(false);
//   };

//   return (
//     <div>
//       {loading ? (
//         <div>
//             <h2 className="font-medium text-xl mb-4">Previous Mock Interviews</h2>
//             <div className="flex justify-center items-center h-full">
//               <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
//             </div>
//         </div>
//       ) : (
//         <>
//           <h2 className="font-medium text-xl mb-4">Previous Mock Interviews</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//             {interviewList &&
//               interviewList.map((interview, index) => (
//                 <InterviewItemCard interview={interview} key={index} />
//               ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default InterviewList;
"use client";

import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { eq, desc } from 'drizzle-orm';
import InterviewItemCard from './InterviewItemCard';
import { Loader2 } from 'lucide-react';

function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      GetInterviewList();
    }
  }, [user]);

  const GetInterviewList = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(MockInterview.id));
    setInterviewList(result);
    setLoading(false);
  };

  const handleDelete = (mockId) => {
    // Remove the interview from the state list
    setInterviewList((prevList) => prevList.filter((interview) => interview.mockId !== mockId));
  };

  return (
    <div>
      {loading ? (
        <div>
          <h2 className="font-medium text-xl mb-4">Previous Mock Interviews</h2>
          <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
          </div>
        </div>
      ) : (
        <>
          <h2 className="font-medium text-xl mb-4">Previous Mock Interviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {interviewList &&
              interviewList.map((interview, index) => (
                <InterviewItemCard interview={interview} key={index} onDelete={handleDelete} />
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default InterviewList;
