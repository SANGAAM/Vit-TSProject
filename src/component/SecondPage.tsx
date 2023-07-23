import React from 'react';
import DataTable from './DataTable';
import DepartmentList from './DepartmentList.';
import '../styles/SPage.css'


const SecondPage: React.FC = () => {
  return (
     <div className='container'>
     <DataTable />
     <DepartmentList />
   </div>
  );
};

export default SecondPage;
