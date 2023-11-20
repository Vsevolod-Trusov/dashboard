import { FC, useEffect } from 'react';

import { trpc } from 'index';

import { useDispatch } from 'react-redux';
import { setStatistics } from 'store';
import Template from './Template';

const TemplateContainer: FC = () => {
  const dispatch = useDispatch();

  const { data: departmentsCount } =
    trpc.departments.getDepartmentsCount.useQuery();
  const { data: staffCount } = trpc.users.getStaffCount.useQuery();
  const { data: companiesCount } = trpc.companies.getCompaniesCount.useQuery();

  useEffect(() => {
    dispatch(
      setStatistics({
        departmentsCount: departmentsCount as number,
        staffCount: staffCount as number,
        companiesCount: companiesCount as number,
      }),
    );
  }, [departmentsCount, staffCount, companiesCount]);

  return <Template />;
};
export default TemplateContainer;
