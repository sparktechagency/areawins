

import Image from "next/image";

const AboutUs = () => {
  return (
    <section className="bg-background px-5 py-10 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-primary">About Us</h2>

            <p className="text-lg text-foreground leading-relaxed">
              We may collect different types of information to provide a safe
              and reliable betting experience. This includes personal details
              such as your full name, date of birth, contact information, and
              identity verification documents.
            </p>
          </div>

          {/* Right side - Image from Unsplash */}
          <div className="flex justify-center md:justify-end">
            <Image
              src="https://images.unsplash.com/photo-1504016798967-59a258e9386d"
              alt="Football on the field"
              width={800}
              height={600}
              className="rounded-lg object-cover w-full max-w-md"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
