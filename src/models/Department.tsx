
export interface SubDepartment {
    id: number;
    name: string;
  }
  
export interface Department {
    id: number;
    name: string;
    subDepartments: SubDepartment[];
  }
  