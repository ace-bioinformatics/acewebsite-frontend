import PartnerCarousel from "../about/PartnerCarousel"

export default function PartnershipsSection() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-red-900">Partnerships</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Collaborating for Greater Impact
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Working with leading institutions and organizations worldwide to advance our mission
          </p>
        </div>
        <PartnerCarousel/>
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="relative isolate overflow-hidden bg-gradient-to-br from-blue-50 to-emerald-50 px-6 py-20 sm:rounded-3xl sm:px-10 sm:py-24 lg:py-24 xl:px-24">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
              <div className="lg:pr-8">
                <div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-blue-900">
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                    </svg>
                  </div>
                  <h3 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">
                    ACE Uganda & Google DeepMind Partnership
                  </h3>
                  <p className="mt-4 text-base leading-7 text-gray-600">
                    We are proud to partner with Google DeepMind to leverage cutting-edge AI and 
                    machine learning technologies in our research initiatives. This collaboration 
                    enables us to tackle complex health challenges using state-of-the-art computational 
                    methods and advance scientific discovery in Africa.
                  </p>
                  <dl className="mt-8 space-y-4 text-base leading-7 text-gray-600">
                    <div className="flex gap-x-3">
                      <svg className="h-6 w-6 flex-none text-red-900" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Advanced AI & Machine Learning Resources</span>
                    </div>
                    <div className="flex gap-x-3">
                      <svg className="h-6 w-6 flex-none text-red-900" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Collaborative Research Projects</span>
                    </div>
                    <div className="flex gap-x-3">
                      <svg className="h-6 w-6 flex-none text-red-900" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Capacity Building & Training</span>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-blue-800 to-purple-900 shadow-2xl">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white p-8">
                      <svg className="mx-auto h-16 w-16 mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                      </svg>
                      <p className="text-xl font-semibold">Advancing Health</p>
                      <p className="text-lg">Through Innovation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="pointer-events-none absolute left-12 top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-3xl lg:bottom-[-12rem] lg:top-auto lg:translate-y-0 lg:transform-gpu" aria-hidden="true">
              <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-red-400 to-red-300 opacity-25"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}