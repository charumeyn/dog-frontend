import moment from "moment";
import { useMemo } from "react";

type FundraiserStatusProps = {
  startsAt: Date;
  endsAt: Date;
}

const FundraiserStatus: React.FunctionComponent<FundraiserStatusProps> = ({ startsAt, endsAt }) => {

  const status = useMemo(() => {
    const currentDate = new Date();

    if (moment(currentDate).isBetween(startsAt, endsAt)) {
      return <span className="px-2.5 py-0.5 text-xs rounded-full bg-orange-100 text-orange-600">In Progress</span>
    }
    else if (moment(currentDate).isBefore(startsAt)) {
      return <span className="px-2.5 py-0.5 text-xs rounded-full bg-orange-100 text-orange-600">Scheduled</span>
    }
    else if (moment(currentDate).isAfter(endsAt)) {
      return <span className="px-2.5 py-0.5 text-xs rounded-full bg-gray-100 text-gray-500">Ended</span>
    }
  }, [startsAt, endsAt])

  return <>{status}</>;
}

export default FundraiserStatus;