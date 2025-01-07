"use client"
import React, { useEffect, useState } from 'react';
import { db } from '@/configs/db';
import { Chapters, CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import CourseBasicInfo from './_components/CourseBasicInfo';
import CourseDetails from './_components/CourseDetails';
import ChapterList from './_components/ChapterList';
import { Button } from '@/components/ui/button';
import { GenerateChapterContent_AI } from '@/configs/AiModel';
import service from '@/configs/service';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { use } from 'react';

function CourseLayout({ params }) {
  params = use(params);
  const { user } = useUser();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
 

  useEffect(() => {
    const fetchCourse = async () => {
      // Ensure params is properly unwrapped
      const courseId = await params?.courseId;
      if (courseId) {
        GetCourse(courseId);
      }
    };
    fetchCourse();
  }, [params, user]);

  const GetCourse = async (courseId) => {
    const result = await db.select().from(CourseList)
      .where(and(eq(CourseList.courseId, courseId),
        eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)));

    setCourse(result[0]);
    console.log(result);
  };

  const GenerateChapterContent = async () => {
    setLoading(true);
    const chapters = course?.courseOutput?.course?.chapters;

    for (const [index, chapter] of chapters.entries()) {
      try {
        const PROMPT = `Explain the concept in detail on Topic: '${course?.name}', Chapter: '${chapter?.name}', in JSON format with the following structure: 
        {
          "title": '${course?.name} - ${chapter?.name}',
          "description": [
            {
              "heading": "Heading of the section",
              "content": "Detailed explanation of the section",
              "code": "Code Example(Code field in <precode> format) if applicable"
            }
          ]
        }`;

        let videoId = '';

        // Generate Video URL
        await service.getVideos(course?.name + ':' + chapter?.name).then(resp => {
          videoId = resp[0]?.id?.videoId;
          console.log(resp);
        });

        // Generate chapter content
        const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
        const content = JSON.parse(result?.response?.text());

        // Save Chapter Content + Video URL
        const resp = await db.insert(Chapters).values({
          chapterId: index,
          courseId: course?.courseId,
          content: content,
          videoId: videoId
        }).returning({ id: Chapters.id });

        console.log(resp);

        // Show toast notification for each chapter
        toast.success(`Chapter ${chapter?.name} Generated!`);

      } catch (e) {
        setLoading(false);
        console.log(e);
      }

      // Update Course as published after processing each chapter
      await db.update(CourseList).set({
        publish: true
      });
    }

    // After all chapters are processed, redirect to the course page
    router.push(`/course/${course?.courseId}`);
  };

  return (
    <div className='mt-10 px-7 md:px-20 lg:px-44'>
      <h2 className='font-bold text-center text-2xl'>Course Layout</h2>

      {/* Basic Info */}
      <CourseBasicInfo course={course} refreshData={() => GetCourse()} />
      {/* Course Detail */}
      <CourseDetails course={course} />
      {/* List of Lesson */}
      <ChapterList course={course} refreshData={() => GetCourse()} />

      {/* Generate Course Content Button */}
      <Button 
        onClick={GenerateChapterContent} 
        className="my-10"
        disabled={loading}
      >
        {loading ? (
          <>
            <div className="spinner-border spinner-border-sm text-white mr-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            Generating the Course Content...
          </>
        ) : (
          'Generate Course Content'
        )}
      </Button>

      {/* Toast Container to display notifications */}
      <ToastContainer />
    </div>
  );
}

export default CourseLayout;

