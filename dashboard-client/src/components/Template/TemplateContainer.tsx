import { FC, useEffect, useState } from 'react';

import { IStatistics } from 'pages/Dashboard';
import { StatisticsContext } from 'context';
import { STATISTICS_INIT } from 'common';
import { trpc } from 'index';

import Template from './Template';

const TemplateContainer: FC = () => {
  const [statistics, setStatistics] = useState<IStatistics>(STATISTICS_INIT);

  const { data: departmentsCount } =
    trpc.departments.getDepartmentsCount.useQuery();
  const { data: staffCount } = trpc.users.getStaffCount.useQuery();
  const { data: companiesCount } = trpc.companies.getCompaniesCount.useQuery();

  useEffect(() => {
    setStatistics({
      departmentsCount: departmentsCount as number,
      staffCount: staffCount as number,
      companiesCount: companiesCount as number,
    });
  }, [departmentsCount, staffCount, companiesCount]);

  return (
    <StatisticsContext.Provider value={statistics}>
      <Template />
    </StatisticsContext.Provider>
  );
};
export default TemplateContainer;
