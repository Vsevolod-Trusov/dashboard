import { enqueueSnackbar } from 'notistack';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { EMPTY_ARRAY, EMPTY_STRING, NOTISTACK_DURATION } from 'common';
import { trpc } from 'index';
import { setStatistics } from 'store';

import { DepartmentsWithCount } from '../../../../dashboard-server/src/types';
import Department from './Department';

const DepartmentContainer: FC = () => {
  const dispatch = useDispatch();
  const [departments, setDepartments] =
    useState<DepartmentsWithCount[]>(EMPTY_ARRAY);
  const { data: departmentsData, refetch } =
    trpc.departments.getAllDepartments.useQuery();
  const [selectedDepartmentId, setDepartmentId] =
    useState<string>(EMPTY_STRING);
  const {
    mutate: deleteDepartment,
    error,
    isSuccess,
  } = trpc.departments.deleteDepartment.useMutation({
    onSuccess: () => refetch(),
  });

  const handleDelete = async () => {
    await deleteDepartment(selectedDepartmentId);
  };

  useEffect(() => {
    const departments = departmentsData ?? EMPTY_ARRAY;
    setDepartments(departments);
    dispatch(
      setStatistics({
        departmentsCount: departments.length,
      }),
    );
  }, [departmentsData]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
        autoHideDuration: NOTISTACK_DURATION,
      });

      return;
    }

    if (isSuccess)
      enqueueSnackbar('Department deleted', {
        variant: 'success',
        autoHideDuration: NOTISTACK_DURATION,
      });
  }, [error, isSuccess]);

  return (
    <Department
      departments={departments}
      setDepartmentId={setDepartmentId}
      handleDelete={handleDelete}
    />
  );
};
export default DepartmentContainer;
