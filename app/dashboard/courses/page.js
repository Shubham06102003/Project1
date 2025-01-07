import React from 'react'
import AddCourse from './_components/AddCourse'
import UserCourseList from './_components/UserCourseList'

const page = () => {
  return (
    <div>
      <AddCourse/>
      {/* Display list of courses */}
      <UserCourseList/>
    </div>
  )
}

export default page