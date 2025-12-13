import Link from "next/link";
import logo from "@/assets/logo/logo2.png";
import Image from "next/image";
const Footer = () => {
  return (
    <footer className="w-full bg-white text-gray-400 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Column 1 - Logo & Contact */}
          <div className="space-y-4">
            <Image src={logo} alt="logo" />
            <p className="text-green-500 text-lg">+1 800-123-4567</p>
            <p className="text-green-500">info@123456.com</p>
            <p className="text-gray-400">
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
                <Link href="/privacy" className="text-gray-400">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-400">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400">
                  Terms and conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Discover */}
          <div>
            <h3 className="text-white font-semibold mb-4">Discover</h3>
            <ul className="space-y-3 text-gray-400">
              <li>New York City</li>
              <li>Chicago</li>
              <li>Los Angeles</li>
              <li>San Diego</li>
              <li>Boston</li>
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div className="space-y-3">
            <p className="text-gray-400">
              Email:{" "}
              <span className="text-white">akashroyakash6@gmail.com</span>
            </p>
            <p className="text-gray-400">
              Phone: <span className="text-white">+088019828734939</span>
            </p>
            <p className="text-gray-400">
              Location: <span className="text-white">Bangladesh</span>
            </p>
            <p className="text-gray-400 mt-6">Join our website</p>
          </div>
        </div>

        {/* Optional: Copyright (you can remove if not needed) */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          © 2025 EASY BETS. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
