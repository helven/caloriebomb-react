// 1. React and React ecosystem imports

// 2. Asset imports

// 3. Project services and utilities

// 4. Components and UI elements
import PageHeading from '@/components/common/PageHeading';

function PrivacyPolicy() {
  return (
    <>
      <section className="page-breadcrumb">
        <div className="mb-6 flex justify-between"></div>
      </section>

      <div className="mx-auto mb-8 grid max-w-4xl grid-cols-1 px-4">
        <PageHeading
          title="Privacy Policy"
          description=""
          className="text-center"
        />

        <section className="container mx-auto px-4">
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <div className="space-y-6">
            <div>
              <h2 className="mb-2 font-semibold">Information We Collect</h2>
              <p className="text-sm">CalorieBomb does not collect, store, or share any personal information. We do not require user accounts or track individual usage.</p>
            </div>

            <div>
              <h2 className="mb-2 font-semibold">Local Storage</h2>
              <p className="text-sm">We use browser local storage only to save your theme preference (light/dark mode). This data never leaves your device.</p>
            </div>

            <div>
              <h2 className="mb-2 font-semibold">Third-Party Services</h2>
              <p className="text-sm">CalorieBomb uses external APIs to fetch food nutrition data. No personal information is sent to these services.</p>
            </div>

            <div>
              <h2 className="mb-2 font-semibold">Cookies</h2>
              <p className="text-sm">We do not use cookies for tracking or analytics purposes.</p>
            </div>

            <div>
              <h2 className="mb-2 font-semibold">Changes to This Policy</h2>
              <p className="text-sm">We may update this privacy policy from time to time. Any changes will be reflected on this page.</p>
            </div>

            <div>
              <h2 className="mb-2 font-semibold">Contact</h2>
              <p className="text-sm">If you have questions about this privacy policy, please visit our contact page.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default PrivacyPolicy;
