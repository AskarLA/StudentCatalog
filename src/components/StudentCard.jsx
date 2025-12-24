import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentCard = ({ student }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/students/${student.id}`);
  };

  return (
    <div className="col-md-6 col-lg-3 mb-4">
      <div className="card student-card h-100">
        <div className="card-body text-center">
          <div className="student-icon-wrapper mb-3">
            <img
              src={`/${student.image}`}
              alt={student.fullName}
              className="student-avatar rounded-circle"
              onError={(e) => {
                // Fallback to anime avatar if image doesn't exist
                e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.fullName}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
              }}
            />
          </div>
          <h5 className="card-title mb-2">{student.fullName}</h5>
          <p className="card-text mb-2">
            Group: {student.group}
          </p>
          <span className="badge bg-success mb-3">
            GPA {student.gpa}
          </span>
          <div className="mt-auto">
            <button
              className="btn btn-primary btn-sm w-100"
              onClick={handleViewDetails}
            >
              View details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;

