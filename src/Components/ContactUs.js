import { useState } from "react";
import Button from "./Button";

const ContactUs = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-100 sm:p-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-stone-900">
          Contact us
        </h1>
        <p className="mt-2 text-stone-600">
          Questions, feedback, or partnership ideas? Send us a message and we
          will get back to you.
        </p>

        {submitted ? (
          <p className="mt-8 rounded-xl bg-green-50 px-4 py-3 font-medium text-green-800">
            Thanks for reaching out. We will reply soon.
          </p>
        ) : (
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block text-sm font-medium text-stone-700" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="h-11 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 text-sm outline-none focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-stone-700" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="h-11 w-full rounded-xl border border-stone-200 bg-stone-50 px-4 text-sm outline-none focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-stone-700" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows="4"
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
                placeholder="How can we help?"
              />
            </div>
            <Button
              title="Send message"
              type="submit"
              className="bg-orange-600 hover:bg-orange-700"
              textClassName="text-white"
            />
          </form>
        )}
      </section>
    </div>
  );
};

export default ContactUs;
