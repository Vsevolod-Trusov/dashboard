import { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';

import { CREATE_STAFF_INITIALS, EMPTY_ARRAY } from 'common';
import { client } from 'index';
import { staffValidationSchema } from 'validation';

import CreateStaff from './CreateStaff';
import { CompanyType } from '../../../../dashboard-server/src/types';

const CreateStaffContainer: FC = () => {
  const [departmentsNames, setDepartmentsNames] =
    useState<string[]>(EMPTY_ARRAY);

  const [companyNames, setCompanyNames] = useState<CompanyType[]>(EMPTY_ARRAY);

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
      const response = await client.users.sigUp.mutate({
        name: username,
        lastname,
        role: isManager ? 'manager' : 'user',
        email,
        password,
        isHeader: isManager,
        companyName,
        departmentName,
      });

      if (!response) {
        alert('wrong sign up request');
      } else {
        alert('Successfully');
      }
    },
  });

  const handleSelectedCompany = async (e: any) => {
    console.log(e);
    formik.handleChange(e);
    const departmentsNames = await client.departments.getDepartmentsNames.query(
      e.target.value,
    );

    setDepartmentsNames(departmentsNames);
  };

  useEffect(() => {
    (async function () {
      const companyNames = await client.companies.getCompanyNames.query();

      setCompanyNames(companyNames);
    })();
  }, []);

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
