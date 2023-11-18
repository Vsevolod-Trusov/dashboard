import { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';

import { CREATE_STAFF_INITIALS, EMPTY_ARRAY, EMPTY_STRING } from 'common';
import { trpc } from 'index';
import { staffValidationSchema } from 'validation';

import CreateStaff from './CreateStaff';
import { CompanyType } from '../../../../dashboard-server/src/types';

const CreateStaffContainer: FC = () => {
  const [departmentsNames, setDepartmentsNames] =
    useState<string[]>(EMPTY_ARRAY);
  const [companyNames, setCompanyNames] = useState<CompanyType[]>(EMPTY_ARRAY);
  const [companyId, setCompanyId] = useState<string>(EMPTY_STRING);
  const { refetch } = trpc.departments.getDepartmentsNames.useQuery(companyId);
  const { data: companyData } = trpc.companies.getCompanyNames.useQuery();
  const { mutate: signIn } = trpc.users.sigUp.useMutation();

  const formik = useFormik({
    initialValues: CREATE_STAFF_INITIALS,
    validationSchema: staffValidationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const {
        username,
        lastname,
        email,
        password,
        confirm,
        isManager,
        companyName,
        departmentName,
      } = values;

      if (password !== confirm) {
        alert('Wrong Cnfirm. Try again');
      }

      alert(values);
      signIn({
        name: username,
        lastname,
        role: isManager ? 'manager' : 'user',
        email,
        password,
        isHeader: isManager,
        companyName,
        departmentName,
      });
    },
  });

  const handleSelectedCompany = async (e: any) => {
    formik.handleChange(e);
    await setCompanyId(e.target.value);
    const { data: departmentsData } = await refetch(e.target.value);
    setDepartmentsNames(departmentsData ?? EMPTY_ARRAY);
  };

  useEffect(() => {
    setCompanyNames(companyData ?? EMPTY_ARRAY);
  }, [companyData]);

  return (
    <CreateStaff
      formik={formik}
      departmentNames={departmentsNames}
      companyNames={companyNames}
      handleSelectedCompany={handleSelectedCompany}
    />
  );
};
export default CreateStaffContainer;
