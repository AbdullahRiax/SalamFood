const AboutUs = () => {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-100 sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange-700">
          Our story
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-stone-900">
          Food that feels like home
        </h1>
        <p className="mt-4 text-stone-600">
          SalamFood brings nearby restaurants together in one simple, reliable
          place to browse, order, and enjoy a meal. We focus on a clean
          experience so you can find what you want quickly — whether that is a
          popular local favorite or a new dish to try.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-orange-50 p-4">
            <h2 className="font-semibold text-orange-800">Fresh picks</h2>
            <p className="mt-1 text-sm text-stone-600">
              Curated restaurants with ratings you can trust.
            </p>
          </div>
          <div className="rounded-xl bg-orange-50 p-4">
            <h2 className="font-semibold text-orange-800">Fast ordering</h2>
            <p className="mt-1 text-sm text-stone-600">
              Search, filter, and add dishes in a few taps.
            </p>
          </div>
          <div className="rounded-xl bg-orange-50 p-4">
            <h2 className="font-semibold text-orange-800">Made for everyone</h2>
            <p className="mt-1 text-sm text-stone-600">
              A responsive layout that looks great on any screen.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
