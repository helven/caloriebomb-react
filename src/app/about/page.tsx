// 1. React and React ecosystem imports

// 2. Asset imports

// 3. Project services and utilities

// 4. Components and UI elements
import PageHeading from '@/components/common/PageHeading';

function About() {
  return (
    <>
      <section className="page-breadcrumb">
        <div className="mb-6 flex justify-between"></div>
      </section>

      <div className="mx-auto mb-8 grid max-w-4xl grid-cols-1 px-4">
        <PageHeading
          title="About Us"
          description=""
          className="text-center"
          banner="/assets/images/about/main-banner.jpg"
        />

        <section className="container mx-auto px-4">
          <p className="mt-4">
            CalorieBomb is a simple nutrition search tool built to make food data fast, clear, and fun. No clutter, no
            confusing charts - just straightforward facts you can use.
          </p>
          <p className="mt-4">
            The goal is to help anyone quickly check calories, macros, and basic nutrition info without digging through
            complicated databases. Every search loads instantly, every result is easy to read, and the design stays
            light and friendly.
          </p>
          <p className="mt-4">
            This project is independently built and continuously improved with new features, better data accuracy, and a
            smoother experience. Whether you're tracking your meals, planning recipes, or just curious about what’s on
            your plate, CalorieBomb gives you the essentials in one quick hit.
          </p>
          <p className="mt-12 text-center text-2xl font-bold">Plant your bomb! 💣</p>
        </section>
      </div>
    </>
  );
}

export default About;
