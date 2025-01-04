// "use client";
// import Webcam from 'react-webcam';
// import React, { useEffect, useState, useRef } from 'react';
// import Image from 'next/image';
// import { Button } from '@/components/ui/button';
// import useSpeechToText from 'react-hook-speech-to-text';
// import { Mic, StopCircle } from 'lucide-react';
// import { toast } from 'sonner';
// import { UserAnswer } from '@/utils/schema';
// import { useUser } from '@clerk/nextjs';
// import moment from 'moment';
// import { db } from '@/utils/db';
// import { chatSession } from '@/utils/GeminiAI';
// import axios from 'axios';

// const RecordAnswerSection = ({ mockInterviewQuestion, activeQuestionIndex, interviewData }) => {
//   const [userAnswer, setUserAnswer] = useState('');
//   const { user } = useUser();
//   const [loading, setLoading] = useState(false);
//   const webcamRef = useRef(null); // Reference to the webcam
//   const [isRecording, setIsRecording] = useState(false); // Tracks whether the user is recording
//   const [intervalId, setIntervalId] = useState(null); // Stores interval ID for cleanup
//   const [isSubmitting, setIsSubmitting] = useState(false); // Prevents multiple submissions
//   const [analysisFeedback, setAnalysisFeedback] = useState({}); // Store analysis feedback
//   const [videoChunks, setVideoChunks] = useState([]); // Store video chunks

//   const {
//     error,
//     interimResult,
//     results,
//     startSpeechToText,
//     setResults,
//     stopSpeechToText,
//   } = useSpeechToText({
//     continuous: true,
//     useLegacyResults: false,
//   });

//   // Capture video chunks every 3 seconds while recording
//   const captureVideoChunk = async () => {
//     if (!webcamRef.current) return;

//     const imageSrc = webcamRef.current.getScreenshot();
//     const blob = await fetch(imageSrc).then((res) => res.blob());
//     const file = new File([blob], "video_chunk.jpg", { type: "image/jpeg" });

//     setVideoChunks((prevChunks) => [...prevChunks, file]); // Collect video chunks
//   };

//   // Send video data to the backend when recording stops
//   const sendVideoDataToBackend = async () => {
//     setLoading(true);
//     const formData = new FormData();
//     videoChunks.forEach((chunk, index) => {
//       formData.append("video", chunk, `chunk_${index}.jpg`);
//     });

//     try {
//       const response = await axios.post("http://127.0.0.1:5000/api/analyze", formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setAnalysisFeedback(response.data);
//       console.log("Analysis Feedback:", response.data); // Store the analysis feedback
//     } catch (error) {
//       console.error("Error sending video data:", error);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (results.length > 0) {
//       const combinedResults = results.reduce((acc, result) => acc + result.transcript, '');
//       setUserAnswer((prevAns) => prevAns + combinedResults);
//     }
//   }, [results]);

//   useEffect(() => {
//     if (!isRecording && userAnswer.length > 10 && !isSubmitting) {
//       UpdateUserAnswer();
//     }
//   }, [userAnswer]);

//   useEffect(() => {
//     if (isRecording) {
//       const id = setInterval(() => {
//         captureVideoChunk(); // Capture a new chunk every 3 seconds
//       }, 3000); // Capture video chunks every 3 seconds
//       setIntervalId(id);
//     } else {
//       clearInterval(intervalId); // Stop capturing when recording stops
//       sendVideoDataToBackend(); // Send video data when recording stops
//     }

//     return () => clearInterval(intervalId); // Cleanup interval on unmount or when recording stops
//   }, [isRecording]);

//   const StartStopRecording = async () => {
//     if (isRecording) {
//       stopSpeechToText();
//     } else {
//       startSpeechToText();
//     }
//     setIsRecording((prev) => !prev); // Toggle the recording state
//   };

//   const UpdateUserAnswer = async () => {
//     setIsSubmitting(true); // Prevent multiple submissions
//     setLoading(true);

//     const feedbackPrompt =
//       "Question: " +
//       mockInterviewQuestion[activeQuestionIndex]?.question +
//       ", User Answer:" +
//       userAnswer +
//       ", Depends on question and user answer for given interview question" +
//       " please give us rating between 1 to 10 for answer and feedback as area of improvement if any" +
//       " in just 3-5 lines to improve it in JSON format with rating field and feedback field";

//     console.log(feedbackPrompt); // Debugging prompt

//     try {
//       const result = await chatSession.sendMessage(feedbackPrompt);

//       // Assuming the API response is a JSON string that needs to be parsed
//       const rawResponse = await result.response.text();
//       const mockJsonResp = rawResponse.replace("```json", "").replace("```", "");
//       console.log("Cleaned JSON Response:", mockJsonResp); // Check cleaned response
//       const JsonFeedbackResp = JSON.parse(mockJsonResp);

//       const resp = await db.insert(UserAnswer).values({
//         mockIdRef: interviewData?.mockId,
//         question: mockInterviewQuestion[activeQuestionIndex]?.question,
//         correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
//         userAns: userAnswer,
//         feedback: JsonFeedbackResp?.feedback,
//         rating: JsonFeedbackResp?.rating,
//         userEmail: user?.primaryEmailAddress.emailAddress,
//         createdAt: moment().format("DD-MM-yyyy"),
//       });

//       if (resp) {
//         toast("User Answer recorded successfully");
//         setResults([]);
//         setUserAnswer("");
//       }

//     } catch (error) {
//       console.error("Error while sending or parsing feedback:", error);
//     } finally {
//       setUserAnswer("");
//       setResults([]);
//       setLoading(false);
//       setIsSubmitting(false); // Allow next submission
//     }
//   };

//   if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

//   return (
//     <div className="flex flex-col justify-center items-center">
//       <div className="flex flex-col mt-20 justify-center items-center rounded-lg p-5 bg-black">
//         <Image
//           src={"/webcam.png"}
//           alt="Webcam"
//           width={200}
//           height={200}
//           className="absolute bg-transparent"
//         />
//         <Webcam
//           ref={webcamRef}
//           onUserMedia={() => console.log("Webcam enabled")}
//           onUserMediaError={() => console.log("Webcam error")}
//           screenshotFormat="image/jpeg"
//           mirrored={true}
//           style={{
//             height: 300,
//             width: "100%",
//             zIndex: 10,
//           }}
//         />
//       </div>
//       <Button
//         disabled={loading || isSubmitting}
//         variant="outline"
//         className="my-10"
//         onClick={StartStopRecording}
//       >
//         {isRecording ? (
//           <h2 className="text-red-600 flex gap-2">
//             <StopCircle /> Recording
//           </h2>
//         ) : (
//           <h2 className="flex gap-2 items-center text-primary">
//             <Mic /> Record Answer
//           </h2>
//         )}
//       </Button>
//     </div>
//   );
// };

// export default RecordAnswerSection;

import React, { useEffect, useState, useRef } from 'react';
import Webcam from 'react-webcam';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react';
import { toast } from 'sonner';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { db } from '@/utils/db';
import { chatSession } from '@/utils/GeminiAI';
import axios from 'axios';

const RecordAnswerSection = ({ mockInterviewQuestion, activeQuestionIndex, interviewData }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const webcamRef = useRef(null); // Reference to the webcam
  const [isRecording, setIsRecording] = useState(false); // Tracks whether the user is recording
  const [intervalId, setIntervalId] = useState(null); // Stores interval ID for cleanup
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevents multiple submissions
  const [analysisFeedback, setAnalysisFeedback] = useState({}); // Store analysis feedback
  const [videoChunks, setVideoChunks] = useState([]); // Store video chunks
  const [geminiFeedback, setGeminiFeedback] = useState({ rating: null, feedback: '' }); // Store Gemini feedback

  const {
    error,
    interimResult,
    results,
    startSpeechToText,
    setResults,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // Capture video chunks every 3 seconds while recording
  const captureVideoChunk = async () => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();
    const blob = await fetch(imageSrc).then((res) => res.blob());
    const file = new File([blob], "video_chunk.jpg", { type: "image/jpeg" });

    setVideoChunks((prevChunks) => [...prevChunks, file]); // Collect video chunks
  };

  // Send video data to the backend when recording stops
  const sendVideoDataToBackend = async () => {
    setLoading(true);
    const formData = new FormData();
    videoChunks.forEach((chunk, index) => {
      formData.append("video", chunk, `chunk_${index}.jpg`);
    });

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/analyze", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setAnalysisFeedback(response.data);
      console.log("Analysis Feedback:", response.data); // Store the analysis feedback

      if (activeQuestionIndex === 5) {
        // If the active question index is 5, send the analysis feedback to Gemini API
        generateGeminiFeedback(response.data);
      }
    } catch (error) {
      console.error("Error sending video data:", error);
    }
    setLoading(false);
  };

  // Generate feedback from Gemini API based on analysis feedback
  // const generateGeminiFeedback = async (analysisData) => {
  //   const feedbackPrompt2 = `
  //     Based on the following video analysis feedback:
  //     ${JSON.stringify(analysisData)},
  //     provide an overall performance summary of your interview.
  //     Generate a rating between 1-10, and provide detailed feedback for improvement, 
  //     including areas where you performed well and areas for improvement. 
  //     Format the response in JSON with the following fields:
  //     {
  //       "rating": <1-10 rating>,
  //       "feedback": "<feedback text>",
  //       "summary": "<overall performance summary>"
  //     }
  //     The feedback should be 3-5 lines in length, focusing on clarity, communication skills, body language, and any other relevant factors.`;


  //   try {
      

  //     setGeminiFeedback({
  //       rating: jsonFeedback.rating,
  //       feedback: jsonFeedback.feedback,
  //       summary: jsonFeedback.summary
  //     });

  //     console.log("Gemini Feedback:", jsonFeedback);
  //     // const resp = await db.insert(UserAnswer).values({
  //     //   videoRating: jsonFeedback?.rating,
  //     //   videoFeedback: jsonFeedback?.feedback,
  //     //   videoSummary: jsonFeedback?.summary
  //     // });
  //     // if (resp) {
  //     //   toast("Web Cam analysis recorded successfully");

  //     // }
  //   } catch (error) {
  //     console.error("Error while generating Gemini feedback:", error);
  //   }
  // };

  // useEffect(()=> {
  //     generateGeminiFeedback(analysisFeedback);
  // },[analysisFeedback]);

  useEffect(() => {
    if (results.length > 0) {
      const combinedResults = results.reduce((acc, result) => acc + result.transcript, '');
      setUserAnswer((prevAns) => prevAns + combinedResults);
    }
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10 && !isSubmitting) {
      UpdateUserAnswer(analysisFeedback);
    }
  }, [userAnswer]);

  useEffect(() => {
    if (isRecording) {
      const id = setInterval(() => {
        captureVideoChunk(); // Capture a new chunk every 3 seconds
      }, 3000); // Capture video chunks every 3 seconds
      setIntervalId(id);
    } else {
      clearInterval(intervalId); // Stop capturing when recording stops
      sendVideoDataToBackend(); // Send video data when recording stops
    }

    return () => clearInterval(intervalId); // Cleanup interval on unmount or when recording stops
  }, [isRecording]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
    setIsRecording((prev) => !prev); // Toggle the recording state
  };

  const UpdateUserAnswer = async (analysisData) => {
    setIsSubmitting(true); // Prevent multiple submissions
    setLoading(true);

    const feedbackPrompt1 =
      "Question: " +
      mockInterviewQuestion[activeQuestionIndex]?.question +
      ", User Answer:" +
      userAnswer +
      ", Depends on question and user answer for given interview question" +
      " please give us rating between 1 to 10 for answer and feedback as area of improvement if any" +
      " in just 3-5 lines to improve it in JSON format with rating field and feedback field";

      const feedbackPrompt2 = `
      Based on the following video analysis feedback:
      ${JSON.stringify(analysisData)},
      provide an overall performance summary of your interview.
      Generate a rating between 1-10, and provide detailed feedback for improvement, 
      including areas where you performed well and areas for improvement. 
      Format the response in JSON with the following fields:
      {
        "rating": <1-10 rating>,
        "feedback": "<feedback text>",
        "summary": "<overall performance summary>"
      }
      The feedback should be 3-5 lines in length, focusing on clarity, communication skills, 
      body language, and any other relevant factors.`;


    console.log(feedbackPrompt1); // Debugging prompt

    try {
      const result1 = await chatSession.sendMessage(feedbackPrompt1);

      const result2 = await chatSession.sendMessage(feedbackPrompt2);

      // Assuming the API response is a JSON string that needs to be parsed
      const rawResponse2 = await result2.response.text();
      const mockJsonResp2 = rawResponse2.replace("```json", "").replace("```", "");
      const jsonFeedback = JSON.parse(mockJsonResp2);

      // Assuming the API response is a JSON string that needs to be parsed
      const rawResponse1 = await result1.response.text();
      const mockJsonResp1 = rawResponse1.replace("```json", "").replace("```", "");
      console.log("Cleaned JSON Response:", mockJsonResp1); // Check cleaned response
      const JsonFeedbackResp = JSON.parse(mockJsonResp1);

      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        videoRating: jsonFeedback?.rating,
        videoFeedback: jsonFeedback?.feedback,
        videoSummary: jsonFeedback?.summary,
        userEmail: user?.primaryEmailAddress.emailAddress,
        createdAt: moment().format("DD-MM-yyyy"),
      });

      if (resp) {
        toast("User Answer recorded successfully");
        setResults([]);
        setUserAnswer("");
      }

    } catch (error) {
      console.error("Error while sending or parsing feedback:", error);
    } finally {
      setUserAnswer("");
      setResults([]);
      setLoading(false);
      setIsSubmitting(false); // Allow next submission
    }
  };

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col mt-20 justify-center items-center rounded-lg p-5 bg-black">
        <Image
          src={"/webcam.png"}
          alt="Webcam"
          width={200}
          height={200}
          className="absolute bg-transparent"
        />
        <Webcam
          ref={webcamRef}
          onUserMedia={() => console.log("Webcam enabled")}
          onUserMediaError={() => console.log("Webcam error")}
          screenshotFormat="image/jpeg"
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button
        disabled={loading || isSubmitting}
        variant="outline"
        className="my-10"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2">
            <StopCircle /> Recording
          </h2>
        ) : (
          <h2 className="flex gap-2 items-center text-primary">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
};

export default RecordAnswerSection;
