import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListSubheader,
  Checkbox,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Department, SubDepartment } from '../models/Department';

const departmentsData: Department[] = [
  // Hardcoded JSON data
  {
    id: 1,
    name: 'Department 1',
    subDepartments: [
      { id: 101, name: 'Sub Department 1.1' },
      { id: 102, name: 'Sub Department 1.2' },
    ],
  },
  {
    id: 2,
    name: 'Department 2',
    subDepartments: [
      { id: 201, name: 'Sub Department 2.1' },
      { id: 202, name: 'Sub Department 2.2' },
      { id: 203, name: 'Sub Department 2.3' },
    ],
  },
  {
    id: 3,
    name: 'Department 3',
    subDepartments: [
      { id: 301, name: 'Sub Department 3.1' },
      { id: 302, name: 'Sub Department 3.2' },
    ],
  },
];

const DepartmentList: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);
  const [selectedDepartments, setSelectedDepartments] = useState<number[]>([]);

  const handleToggle = (departmentId: number) => {
    const currentIndex = selectedDepartments.indexOf(departmentId);
    const newSelectedDepartments = [...selectedDepartments];
  
    // Check if the department is currently selected
    const isDepartmentSelected = currentIndex !== -1;
    const department = departmentsData.find((dep) => dep.id === departmentId);
  
    if (isDepartmentSelected) {
      // If the department is currently selected, deselect it
      newSelectedDepartments.splice(currentIndex, 1);
  
      // Check if all sub-departments are selected
      const areAllSubDepartmentsSelected =
        department &&
        department.subDepartments.every((subDep) => newSelectedDepartments.includes(subDep.id));
  
      if (areAllSubDepartmentsSelected && department) {
        // If all sub-departments are selected, deselect them all
        department.subDepartments.forEach((subDepartment) => {
          const subDepIndex = newSelectedDepartments.indexOf(subDepartment.id);
          if (subDepIndex !== -1) {
            newSelectedDepartments.splice(subDepIndex, 1);
          }
        });
      }
    } else {
      // If the department is not currently selected, select it
      newSelectedDepartments.push(departmentId);
  
      // Select all sub-departments and expand the department
      if (department) {
        setOpen(departmentId);
        department.subDepartments.forEach((subDepartment) => {
          if (!newSelectedDepartments.includes(subDepartment.id)) {
            newSelectedDepartments.push(subDepartment.id);
          }
        });
  
        // Check if all sub-departments are now selected, and if so, select the parent department
        const areAllSubDepartmentsSelected = department.subDepartments.every((subDep) =>
          newSelectedDepartments.includes(subDep.id)
        );
  
        if (areAllSubDepartmentsSelected) {
          newSelectedDepartments.push(departmentId);
        }
      }
    }
  
    setSelectedDepartments(newSelectedDepartments);
  };
  

  
  const handleClick = (departmentId: number) => {
    setOpen((prevOpen) => (prevOpen === departmentId ? null : departmentId));
  };

  const isAllSubDepartmentsSelected = (subDepartments: SubDepartment[]) => {
    return subDepartments.every((subDepartment) =>
      selectedDepartments.includes(subDepartment.id)
    );
  };


  return (
    <List
    
      component="nav"
      subheader={<ListSubheader component="div" style={{ fontSize: '28px', fontWeight:'bold', color: 'Purple' }}>Departments</ListSubheader>}
    >
      {departmentsData.map((department) => (
        <React.Fragment key={department.id}>
          <ListItem        
            onClick={() => handleClick(department.id)}
            dense
          >
            <Checkbox
              edge="start"
              checked={isAllSubDepartmentsSelected(department.subDepartments)}
              indeterminate={
                department.subDepartments.some((subDepartment) =>
                  selectedDepartments.includes(subDepartment.id)
                ) && !isAllSubDepartmentsSelected(department.subDepartments)
              }
              style={{color:'black'}}
              tabIndex={-1}
              disableRipple
              onChange={() => handleToggle(department.id)}
            />
            <ListItemText primary={department.name} />
            {open === department.id ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open === department.id} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {department.subDepartments.map((subDepartment) => (
                <ListItem key={subDepartment.id} button dense>
                  <Checkbox
                    edge="start"
                    checked={selectedDepartments.includes(subDepartment.id)}
                    tabIndex={-1}
                    disableRipple
                    onChange={() => handleToggle(subDepartment.id)}
                  />
                  <ListItemText primary={subDepartment.name} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};

export default DepartmentList;
