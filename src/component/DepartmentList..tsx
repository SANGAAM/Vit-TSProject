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

    if (currentIndex === -1) {
      newSelectedDepartments.push(departmentId);
      // If a department is selected, select all its sub-departments
      const department = departmentsData.find((dep) => dep.id === departmentId);
      if (department) {
        department.subDepartments.forEach((subDepartment) => {
          if (!newSelectedDepartments.includes(subDepartment.id)) {
            newSelectedDepartments.push(subDepartment.id);
          }
        });
      }
    } else {
      newSelectedDepartments.splice(currentIndex, 1);
      // If a department is deselected, deselect all its sub-departments
      const department = departmentsData.find((dep) => dep.id === departmentId);
      if (department) {
        department.subDepartments.forEach((subDepartment) => {
          const subDepIndex = newSelectedDepartments.indexOf(subDepartment.id);
          if (subDepIndex !== -1) {
            newSelectedDepartments.splice(subDepIndex, 1);
          }
        });
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
      subheader={<ListSubheader component="div">Departments</ListSubheader>}
    >
      {departmentsData.map((department) => (
        <React.Fragment key={department.id}>
          <ListItem
            button
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
