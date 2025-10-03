export default function StatsSection({ stats }) {
  const defaultStats = {
    publications: stats?.publications || 50,
    projects: stats?.projects || 10,
    students: stats?.students || 20,
  }

  const displayStats = [
    { 
      id: 1, 
      name: 'Publications', 
      value: `${defaultStats.publications}+`,
      description: 'Peer-reviewed research publications'
    },
    { 
      id: 2, 
      name: 'Active Projects', 
      value: `${defaultStats.projects}+`,
      description: 'Ongoing research initiatives'
    },
    { 
      id: 3, 
      name: 'Students', 
      value: `${defaultStats.students}+`,
      description: 'MSc and PhD candidates'
    },
    { 
      id: 4, 
      name: 'HPC Nodes', 
      value: '56',
      description: 'High-performance computing cluster'
    },
  ]

  return (
    <section className="py-24 sm:py-32 bg-red-700">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Our Impact in Numbers
            </h2>
            <p className="mt-4 text-lg leading-8 text-red-100">
              Building capacity and advancing science across Africa
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {displayStats.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col items-center justify-center gap-y-2 bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all group"
              >
                <dt className="text-base leading-7 text-red-100">{stat.name}</dt>
                <dd className="text-5xl font-bold tracking-tight text-white group-hover:scale-110 transition-transform">
                  {stat.value}
                </dd>
                <p className="text-sm text-red-200 text-center mt-2">
                  {stat.description}
                </p>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}