// import { Button } from '@/components/ui/button';
// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react';
// import { HiDotsVertical } from 'react-icons/hi'; // Import Kebab Icon
// import { toast } from 'react-toastify'; // For displaying success or error messages
// import { db } from '@/utils/db'; // Import Drizzle ORM instance
// import { MockInterview, UserAnswer } from '@/utils/schema'; // Your schema for the mock interview
// import { eq } from 'drizzle-orm'; // Import eq for equality comparison

// function InterviewItemCard({ interview, onDelete }) {
//   const [showDropdown, setShowDropdown] = useState(false); // State to show/hide the delete dropdown
//   const router = useRouter();

//   const onStart = () => {
//     console.log('Starting interview with mockId:', interview?.mockId);
//     router.push('/dashboard/interview/' + interview?.mockId);
//   };

//   const onFeedbackPress = () => {
//     console.log('Navigating to feedback for mockId:', interview?.mockId);
//     router.push('/dashboard/interview/' + interview.mockId + '/feedback');
//   };

//   const handleDelete = async () => {
//     console.log('Attempting to delete interview with mockId:', interview.mockId);
//     try {
//       // Perform the deletion in the database using Drizzle ORM
//       await db
//         .delete(MockInterview) // Target the MockInterview table
//         .where(eq(MockInterview.mockId, interview.mockId)); // Use eq() for equality comparison

//       await db
//         .delete(UserAnswer) // Target the MockInterview table
//         .where(eq(UserAnswer.mockIdRef, interview.mockId)); // Use eq() for equality comparison

//       console.log('Interview deleted successfully from the database');
//       toast.success('Interview deleted successfully!');
//       setShowDropdown(false); // Close the dropdown after deletion

//       // Call the parent function to remove the item from the interview list
//       onDelete(interview.mockId); // Pass the mockId to parent component to update the UI
//     } catch (error) {
//       console.error('Error deleting interview:', error.message);
//       toast.error('Error deleting interview: ' + error.message);
//     }
//   };

//   return (
//     <div className="border shadow-sm rounded-lg p-3 relative">
//       {/* Kebab Icon */}
//       <div
//         className="absolute top-2 right-2 cursor-pointer opacity-75"
//         onClick={() => setShowDropdown((prev) => !prev)} // Toggle the dropdown
//       >
//         <HiDotsVertical size={20} />
//       </div>

//       {/* Dropdown Menu for delete */}
//       {showDropdown && (
//         <div className="absolute top-2 right-8 bg-white shadow-md rounded-lg p-1 w-20">
//           <button
//             onClick={handleDelete}
//             className="w-full text-red-500 hover:bg-gray-100 text-xs "
//           >
//             Delete
//           </button>
//         </div>
//       )}

//       <h2 className="font-bold text-primary">{interview?.jobPosition}</h2>
//       <h2 className="text-sm text-gray-600">{interview?.jobExperience} Years of Experience</h2>
//       <h2 className="text-xs text-gray-400">Created At: {interview.createdAt}</h2>
//       <div className="flex justify-between mt-2 gap-5">
//         <Button size="sm" variant="outline" className="w-full" onClick={onFeedbackPress}>
//           Feedback
//         </Button>
//         <Button size="sm" className="w-full hover:bg-slate-400" onClick={onStart}>
//           Start
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default InterviewItemCard;
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi'; // Import Kebab Icon
import { toast } from 'sonner';
import { db } from '@/utils/db'; // Import Drizzle ORM instance
import { MockInterview, UserAnswer } from '@/utils/schema'; // Your schema for the mock interview
import { eq } from 'drizzle-orm'; // Import eq for equality comparison

function InterviewItemCard({ interview, onDelete }) {
  const [showDropdown, setShowDropdown] = useState(false); // State to show/hide the delete dropdown
  const router = useRouter();

  const onStart = () => {
    console.log('Starting interview with mockId:', interview?.mockId);
    router.push('/dashboard/interview/' + interview?.mockId);
  };

  const onFeedbackPress = () => {
    console.log('Navigating to feedback for mockId:', interview?.mockId);
    router.push('/dashboard/interview/' + interview.mockId + '/feedback');
  };

  const handleDelete = async () => {
    console.log('Attempting to delete interview with mockId:', interview.mockId);
    try {
      // Perform the deletion in the database using Drizzle ORM
      await db
        .delete(MockInterview) // Target the MockInterview table
        .where(eq(MockInterview.mockId, interview.mockId)); // Use eq() for equality comparison

      await db
        .delete(UserAnswer) // Target the MockInterview table
        .where(eq(UserAnswer.mockIdRef, interview.mockId)); // Use eq() for equality comparison

      console.log('Interview deleted successfully from the database');
      toast('Interview deleted successfully!');
      setShowDropdown(false); // Close the dropdown after deletion

      // Call the parent function to remove the item from the interview list
      onDelete(interview.mockId); // Pass the mockId to parent component to update the UI
    } catch (error) {
      console.error('Error deleting interview:', error.message);
      toast('Error deleting interview: ' + error.message);
    }
  };

  return (
    <div className="border shadow-sm rounded-lg p-3 relative">
      {/* Kebab Icon */}
      <div
        className="absolute top-2 right-2 cursor-pointer opacity-75"
        onClick={() => setShowDropdown((prev) => !prev)} // Toggle the dropdown
      >
        <HiDotsVertical size={20} />
      </div>

      {/* Dropdown Menu for delete */}
      {showDropdown && (
        <div className="absolute top-2 right-8 bg-white shadow-md rounded-lg p-1 w-20">
          <button
            onClick={handleDelete}
            className="w-full text-red-500 hover:bg-gray-100 text-xs "
          >
            Delete
          </button>
        </div>
      )}

      <h2 className="font-bold text-primary">{interview?.jobPosition}</h2>
      <h2 className="text-sm text-gray-600">{interview?.jobExperience} Years of Experience</h2>
      <h2 className="text-xs text-gray-400">Created At: {interview.createdAt}</h2>
      <div className="flex justify-between mt-2 gap-5">
        <Button size="sm" variant="outline" className="w-full" onClick={onFeedbackPress}>
          Feedback
        </Button>
        <Button size="sm" className="w-full hover:bg-slate-400" onClick={onStart}>
          Start
        </Button>
      </div>
    </div>
  );
}

export default InterviewItemCard;
