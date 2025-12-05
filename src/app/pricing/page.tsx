// 1. React and React ecosystem imports

// 2. Asset imports

// 3. Project services and utilities

// 4. Components and UI elements
import PageHeading from '@/components/common/PageHeading';

function Pricing() {
  const plans: Array<{ name: string; price: string; description: string; features: string[]; comingSoon?: boolean }> = [
    {
      name: '🧨 Free - "Basic Dynamite"',
      price: 'Free',
      description: 'For casual users.',
      features: ['Unlimited food searches', 'Calories + macros', 'Featured foods', 'Light mode/dark mode'],
    },
    {
      name: '💣 Pro - "Remote C4"',
      price: '$5/month',
      description: 'For fitness enthusiasts.',
      features: [
        'Everything in free',
        'Save favorite foods',
        'Custom food entries',
        'Weekly calorie summary',
        'Email support',
      ],
      comingSoon: true,
    },
    {
      name: '☢️ Trainer - "Nuklear"',
      price: '$19/month',
      description: 'For fitness coach.',
      features: [
        'Everything in Pro',
        'Track your student calorie logs',
        "Feedback on your student's daily",
        '1 trainer + 5 student accounts',
        'Simple progress insights',
      ],
      comingSoon: true,
    },
  ];

  return (
    <>
      <section className="page-breadcrumb">
        <div className="mb-6 flex justify-between"></div>
      </section>

      <div className="mx-auto mb-8 grid max-w-4xl grid-cols-1 px-4">
        <PageHeading
          title="Ignite your progress"
          description="Your nutrition journey just got turbo-charged."
          className="text-center"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-card1 p-8 shadow-md transition-shadow"
            >
              {plan.comingSoon && (
                <div className="absolute -right-12 top-6 w-40 rotate-45 bg-gray-500 py-1 text-center text-sm font-bold text-white shadow-sm">
                  coming soon
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
              <p className="mt-4 flex text-gray-500">{plan.description}</p>
              <p className="mt-4 text-lg font-bold text-gray-900">{plan.price}</p>

              <ul className="mt-8 space-y-4 text-sm text-gray-600">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Pricing;
