// 1. React and React ecosystem imports

// 2. Asset imports

// 3. Project services and utilities

// 4. Components and UI elements
import PageHeading from '@/components/common/PageHeading';

function Contact() {
  return (
    <>
      <section className="page-breadcrumb">
        <div className="mb-6 flex justify-between"></div>
      </section>

      <div className="mx-auto mb-8 grid max-w-4xl grid-cols-1 px-4">
        <PageHeading
          title="Contact Us"
          description=""
          className="text-center"
          banner="/assets/images/contact/main-banner.jpg"
        />
        <section className="container mx-auto px-4 py-8">
          <p className="mt-4">We're always improving CalorieBomb.</p>

          <p className="mt-4">For questions, ideas, or bug reports, reach us at: </p>

          <p className="mt-4">
            <a href="mailto:support@caloriebomb.com">support@caloriebomb.com</a>
          </p>
        </section>
      </div>
    </>
  );
}

export default Contact;
