import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../Logo";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

function Footer() {
  return (
    <section className="relative overflow-hidden w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-3">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo & Copyright */}
          <div>
            <div className="mb-4 inline-flex items-center">
              <Logo width="100px" className="bg-slate-100 h-28 " />
            </div>
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} All Rights Reserved by DevUI.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold uppercase text-gray-300 mb-4">Company</h3>
            <ul>
              <li className="mb-2">
                <Link className="text-gray-400 hover:text-white transition" to="/">Features</Link>
              </li>
              <li className="mb-2">
                <Link className="text-gray-400 hover:text-white transition" to="/">Pricing</Link>
              </li>
              <li className="mb-2">
                <Link className="text-gray-400 hover:text-white transition" to="/">Affiliate Program</Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white transition" to="/">Press Kit</Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold uppercase text-gray-300 mb-4">Support</h3>
            <ul>
              <li className="mb-2">
                <Link className="text-gray-400 hover:text-white transition" to="/">Account</Link>
              </li>
              <li className="mb-2">
                <Link className="text-gray-400 hover:text-white transition" to="/">Help</Link>
              </li>
              <li className="mb-2">
                <Link className="text-gray-400 hover:text-white transition" to="/">Contact Us</Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white transition" to="/">Customer Support</Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold uppercase text-gray-300 mb-4">Legals</h3>
            <ul>
              <li className="mb-2">
                <Link className="text-gray-400 hover:text-white transition" to="/">Terms &amp; Conditions</Link>
              </li>
              <li className="mb-2">
                <Link className="text-gray-400 hover:text-white transition" to="/">Privacy Policy</Link>
              </li>
              <li>
                <Link className="text-gray-400 hover:text-white transition" to="/">Licensing</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="mt-8 flex justify-center space-x-6">
  <Link to="/" className="text-gray-400 hover:text-white transition">
    <Facebook size={24} />
  </Link>
  <Link to="/" className="text-gray-400 hover:text-white transition">
    <Twitter size={24} />
  </Link>
  <Link to="/" className="text-gray-400 hover:text-white transition">
    <Instagram size={24} />
  </Link>
  <Link to="/" className="text-gray-400 hover:text-white transition">
    <Linkedin size={24} />
  </Link>
</div>

{/*A deprecated error means that a feature, function, or module is outdated and no longer recommended for use. 
It may still work, but it is likely to be removed in future updates.
Think of it like an old road sign—you can still follow it, but a newer,
 better road exists, and soon the old one will be removed. */}

      </div>
    </section>
  );
}

export default Footer;
