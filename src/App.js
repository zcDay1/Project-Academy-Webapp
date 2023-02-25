import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route, redirect, IndexRoute } from 'react-router-dom';

import Layout from './pages/layout';
import StartForm from './pages/startForm';
import StudentForm from './pages/studentForm';
import ParentForm from './pages/parentForm';
import CoursePrefForm from './pages/coursePrefForm';
import TimetableForm from './pages/timetableForm';
import ReviewDetailsForm from './pages/reviewDetailsForm';
import FinishMessage from './pages/finishMessage';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/enquiries" element={<Layout />}>
          <Route index element={<StartForm />} />
          <Route path="student-info" element={<StudentForm />} />
          <Route path="parent-info" element={<ParentForm />} />
          <Route path="course" element={<CoursePrefForm />} />
          <Route path="timetable" element={<TimetableForm />} />
          <Route path="final-review" element={<ReviewDetailsForm />} />
          <Route path="success" element={<FinishMessage />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
