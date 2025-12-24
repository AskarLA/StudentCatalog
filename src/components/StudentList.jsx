import React, { useState } from 'react';
import StudentCard from './StudentCard';

const StudentList = ({ students }) => {
  const [displayCount, setDisplayCount] = useState(10);
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [sortOrder, setSortOrder] = useState('gpa-desc');
  const STUDENTS_PER_PAGE = 10;

  const courseLabel = year => {
    switch (year) {
      case 1:
        return '1st year (100s)';
      case 2:
        return '2nd year (200s)';
      case 3:
        return '3rd year (300s)';
      case 4:
        return '4th year (400s)';
      default:
        return 'All';
    }
  };

  const groupFilters = Array.from(new Set(students.map(s => s.group))).map(group => ({
    group,
    label: group
  }));

  const filteredStudents = students.filter(student => {
    const matchesYear = selectedYear === 'all' || student.year === selectedYear;
    const matchesGroup = selectedGroup === 'all' || student.group === selectedGroup;
    return matchesYear && matchesGroup;
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortOrder === 'gpa-asc') return a.gpa - b.gpa;
    if (sortOrder === 'name-asc') return a.fullName.localeCompare(b.fullName);
    // default gpa-desc
    return b.gpa - a.gpa;
  });

  const visibleStudents = sortedStudents.slice(0, displayCount);
  const hasMore = displayCount < filteredStudents.length;

  const handleSeeMore = () => {
    setDisplayCount(prev => prev + STUDENTS_PER_PAGE);
  };

  const handleYearFilter = yearValue => {
    setSelectedYear(yearValue);
    setSelectedGroup('all');
    setDisplayCount(STUDENTS_PER_PAGE);
  };

  const handleGroupFilter = groupValue => {
    setSelectedGroup(groupValue);
    setDisplayCount(STUDENTS_PER_PAGE);
  };

  const handleSortChange = order => {
    setSortOrder(order);
    setDisplayCount(STUDENTS_PER_PAGE);
  };

  return (
    <div className="container mt-4 catalog-dark">
      <div className="text-center mb-4">
        <h1 className="mb-2 text-light">Student Catalog</h1>
        <p className="text-secondary mb-3">Browse student profiles and view detailed information.</p>

        <div className="filter-panel p-3 mb-3">
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-2">
            {[
              { label: 'All', value: 'all' },
              { label: '1st year (100s)', value: 1 },
              { label: '2nd year (200s)', value: 2 },
              { label: '3rd year (300s)', value: 3 },
              { label: '4th year (400s)', value: 4 }
            ].map(filter => (
              <button
                key={filter.value}
                className={`btn btn-xs pill ${selectedYear === filter.value ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => handleYearFilter(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="d-flex flex-wrap justify-content-center gap-2">
            {[{ group: 'all', label: 'All divisions' }, ...groupFilters].map(filter => (
              <button
                key={filter.group}
                className={`btn btn-xs pill ${selectedGroup === filter.group ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => handleGroupFilter(filter.group)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-secondary small">
          Showing {visibleStudents.length} of {filteredStudents.length} students
          {selectedYear !== 'all' ? ` (Year ${selectedYear})` : ''}
          {selectedGroup !== 'all' ? ` · ${selectedGroup}` : ''}
        </p>
        <div className="d-flex flex-wrap justify-content-center gap-2">
          {[
            { label: 'GPA high → low', value: 'gpa-desc' },
            { label: 'GPA low → high', value: 'gpa-asc' },
            { label: 'Name A → Z', value: 'name-asc' }
          ].map(option => (
            <button
              key={option.value}
              className={`btn btn-xs pill ${sortOrder === option.value ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleSortChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      {visibleStudents.length === 0 ? (
        <div className="alert alert-secondary text-center">No students in this course.</div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default StudentList;

