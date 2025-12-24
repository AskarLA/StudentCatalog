import React, { useState } from 'react';
import StudentCard from './StudentCard';

const StudentList = ({ students }) => {
  const [displayCount, setDisplayCount] = useState(10);
  const STUDENTS_PER_PAGE = 10;

  const visibleStudents = students.slice(0, displayCount);
  const hasMore = displayCount < students.length;

  const handleSeeMore = () => {
    setDisplayCount(prev => prev + STUDENTS_PER_PAGE);
  };

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <h1 className="mb-2">Student Catalog</h1>
        <p className="text-muted mb-3">Browse student profiles and view detailed information.</p>
        <p className="text-muted small">Showing {displayCount} of {students.length} students</p>
      </div>
      <div className="row">
        {visibleStudents.map(student => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
      {hasMore && (
        <div className="text-center mt-4 mb-4">
          <button
            className="btn btn-primary btn-lg"
            onClick={handleSeeMore}
          >
            See more
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentList;

