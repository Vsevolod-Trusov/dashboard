export type User = {
    companyName: string;
    email: string;
    role: string;
    isHeader: boolean;
    id: string;
    credentialsId: string;
    departmentId: string | null;
  }[]| undefined