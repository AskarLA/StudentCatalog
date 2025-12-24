import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { students } from '../data/students';

const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = students.find(s => s.id === parseInt(id));
  
  // Generate anime-style avatar URL using DiceBear API
  const avatarUrl = student ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.fullName}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf` : '';

  if (!student) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          Student not found!
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Back to List
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <button
                className="btn btn-secondary mb-3"
                onClick={() => navigate('/')}
              >
                ← Back to List
              </button>
              <div className="text-center mb-4">
                <div className="detail-icon-wrapper">
                  <img
                    src={avatarUrl}
                    alt={student.fullName}
                    className="detail-avatar rounded-circle"
                  />
                </div>
              </div>
              <div className="card-text">
                <h2 className="card-title text-center mb-4">{student.fullName}</h2>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <strong>Student ID:</strong> {student.id}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Group:</strong> {student.group}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Year of Study:</strong> {student.year}
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Age:</strong> {student.age} years old
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>GPA:</strong> {student.gpa}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;

