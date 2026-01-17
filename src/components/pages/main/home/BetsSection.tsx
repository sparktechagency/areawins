import { Button } from "@/components/ui/button";
import Image from "next/image";

const BetsSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-primary text-center mb-12">
          Bets
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - 3 Sport Images (2 on top, 1 on bottom) */}
          <div className="grid grid-cols-2 gap-4">
            {/* Top Row - Basketball + Tennis */}
            <div className="space-y-4">
              <Image
                src="https://images.unsplash.com/photo-1546519638-68e109498ffc"
                alt="Basketball"
                width={600}
                height={800}
                className="rounded-lg object-cover w-full h-64"
              />
            </div>

            <div className="space-y-4">
              <Image
                src="https://images.unsplash.com/flagged/photo-1576972405668-2d020a01cbfa"
                alt="Tennis"
                width={600}
                height={400}
                className="rounded-lg object-cover w-full h-64"
              />
            </div>

            {/* Bottom Row - Full width Football */}
            <div className="col-span-2">
              <Image
                src="https://images.unsplash.com/photo-1570498839593-e565b39455fc"
                alt="Football"
                width={800}
                height={500}
                className="rounded-lg object-cover w-full h-56"
              />
            </div>
          </div>

          {/* Right Side - Text + Button */}
          <div className="space-y-8">
            <p className="text-lg text-foreground leading-relaxed">
              We may collect different types of information to provide a safe
              and reliable betting experience. This includes personal details
              such as your full name, date of birth, contact information, and
              identity verification documents.
            </p>

            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-10 py-4 cursor-pointer h-12 rounded-md text-lg">
              Create
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BetsSection;
