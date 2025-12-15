import logo from "@/assets/logo/logo2.png";
import Image from "next/image";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="w-full bg-background text-foreground py-16 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Column 1 - Logo & Contact */}
          <div className="space-y-4">
            <Image src={logo} alt="logo" />
            <p className="text-green-500 text-lg">+1 800-123-4567</p>
            <p className="text-green-500">info@123456.com</p>
            <p className="text-foreground">
              1234 Name Street,
              <br />
              City, State
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-foreground">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-foreground">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-foreground">
                  Contact us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-foreground">
                  Terms and conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Discover */}
          <div>
            <h3 className="text-white font-semibold mb-4">Discover</h3>
            <ul className="space-y-3 text-foreground">
              <li>New York City</li>
              <li>Chicago</li>
              <li>Los Angeles</li>
              <li>San Diego</li>
              <li>Boston</li>
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div className="space-y-3">
            <p className="text-foreground">
              Email:{" "}
              <span className="text-white">akashroyakash6@gmail.com</span>
            </p>
            <p className="text-foreground">
              Phone: <span className="text-white">+088019828734939</span>
            </p>
            <p className="text-foreground">
              Location: <span className="text-white">Bangladesh</span>
            </p>
            <p className="text-foreground mt-6">Join our website</p>
          </div>
        </div>

        {/* Optional: Copyright (you can remove if not needed) */}
        <div className="mt-12 pt-8 border-t border-border text-center text-foreground text-sm">
          © 2025 EASY BETS. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
