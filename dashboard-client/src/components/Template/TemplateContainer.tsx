import { STATISTICS_INIT } from 'common';
import { client } from 'index';
import { IStatistics } from 'pages/Dashboard';
import { FC, useEffect, useState } from 'react';
import Template from './Template';

import { StatisticsContext } from 'context';

const TemplateContainer: FC = () => {
  const [statistics, setStatistics] = useState<IStatistics>(STATISTICS_INIT);

  useEffect(() => {
    (async function () {
      let departmentsCount =
        await client.departments.getDepartmentsCount.query();
      departmentsCount = departmentsCount as number;

      let staffCount = await client.users.getStaffCount.query();
      staffCount = staffCount as number;

      let companiesCount = await client.companies.getCompaniesCount.query();
      companiesCount = companiesCount as number;

      setStatistics({
        departmentsCount,
        staffCount,
        companiesCount,
      });
    })();
  }, []);

  return (
    <StatisticsContext.Provider value={statistics}>
      <Template />
    </StatisticsContext.Provider>
  );
};
export default TemplateContainer;
