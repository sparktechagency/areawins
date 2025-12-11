import { Input } from "@/components/ui/input";

const ContactUs = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        <h2 className="text-4xl font-bold text-green-600 mb-12">Contact Us</h2>

        {/* Contact Form Card */}
        <div className="bg-white rounded-2xl p-8 md:p-12">
          {/* Subtitle */}
          <div className="text-left mb-8">
            <h3 className="text-xl font-semibold text-gray-900">
              Get in touch with us.
            </h3>
            <p className="text-gray-600 mt-1">
              Contact us anytime for quick support.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input type="text" placeholder="First Name" />
              <Input type="text" placeholder="Last Name" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Input type="tel" placeholder="Phone *" required />
              <Input type="email" placeholder="Email *" required />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Input type="text" placeholder="Country" />
              <Input type="email" placeholder="Email *" required />
            </div>

            {/* Submit Button */}
            <div className="text-left pt-6">
              <button
                type="submit"
                className="bg-gray-900 text-white font-medium px-10 py-4 rounded-lg"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
