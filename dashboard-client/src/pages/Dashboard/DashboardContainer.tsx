import { enqueueSnackbar } from 'notistack';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { EMPTY_ARRAY, EMPTY_STRING, NOTISTACK_DURATION } from 'common';
import { trpc } from 'index';
import { setStatistics } from 'store';

import { DepartmentsWithCount } from '../../../../dashboard-server/src/types';
import Dashboard from './Dashboard';

const DashboardContainer: FC = () => {
  const dispatch = useDispatch();
  const [departments, setDepartments] =
    useState<DepartmentsWithCount[]>(EMPTY_ARRAY);
  const [selectedDepartmentId, setDepartmentId] =
    useState<string>(EMPTY_STRING);
  const { data: dashBoardData, refetch: updateDashboard } =
    trpc.departments.getDepartments.useQuery();
  const { data: allDepartments, refetch } =
    trpc.departments.getAllDepartments.useQuery();
  const {
    mutate: deleteDepartment,
    error,
    isSuccess,
  } = trpc.departments.deleteDepartment.useMutation({
    onSuccess: () => {
      updateDashboard();
      refetch();
    },
  });

  const handleDelete = async () => {
    await deleteDepartment(selectedDepartmentId);
  };

  useEffect(() => {
    if (dashBoardData) {
      setDepartments(dashBoardData as DepartmentsWithCount[]);
    }
  }, [dashBoardData]);

  useEffect(() => {
    if (allDepartments) {
      dispatch(
        setStatistics({
          departmentsCount: (allDepartments as DepartmentsWithCount[])?.length,
        }),
      );
    }
  }, [allDepartments]);

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
    <Dashboard
      departments={departments ?? EMPTY_ARRAY}
      handleDelete={handleDelete}
      setDepartmentId={setDepartmentId}
    />
  );
};
export default DashboardContainer;
