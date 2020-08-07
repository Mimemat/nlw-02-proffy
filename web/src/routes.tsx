import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import TeacherForm from './pages/TeacherForm';
import TeacherList from './pages/TeacherList';

const Routes: React.FC = () => (
  <Router>
    <Route exact path="/" component={Landing} />
    <Route path="/study" component={TeacherList} />
    <Route path="/give-classes" component={TeacherForm} />
  </Router>
);

export default Routes;
