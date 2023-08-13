interface StatsObject {
  label: string;
  value: string;
}

type DashboardStatsProps = {
  stats: StatsObject[];
}

const DashboardStats: React.FunctionComponent<DashboardStatsProps> = ({ stats }) => {
  return (
    <div className="rounded-lg bg-orange-50">
      <div className={`bg-orange-100 mx-3 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-${stats.length}`}>
        {stats.map((stat, i) => (
          <div key={i} className="bg-orange-50 pl-6 py-4">
            <p className="text-sm font-medium leading-6 text-zinc-500">{stat.label}</p>
            <span className="text-xl font-semibold tracking-tight text-zinc-900">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashboardStats;