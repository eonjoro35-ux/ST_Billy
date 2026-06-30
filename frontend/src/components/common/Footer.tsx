import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Linkedin,
  Youtube,
  Heart,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-20">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">About School</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Providing alternative basic education, psychological support, and
              nutritional safety nets to children in Dandora.
            </p>
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors"
            >
              <Heart size={12} fill="currentColor" /> Support Our Mission
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <Link to="/about" className="hover:text-accent">
                  About
                </Link>
              </li>
              <li>
                <Link to="/leadership" className="hover:text-accent">
                  Leadership
                </Link>
              </li>
              <li>
                <Link to="/academic-programs" className="hover:text-accent">
                  Programs
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-accent">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent">
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/donate"
                  className="hover:text-accent font-semibold text-accent"
                >
                  Donate Directly
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex gap-2 items-center">
                <Phone size={18} /> +254 729 974 353
              </li>
              <li className="flex gap-2 items-center">
                <Mail size={18} className="break-all" />{" "}
                stbilleducationalcentre@gmail.com
              </li>
              <li className="flex gap-2 items-start">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>
                  Dandora Slums,
                  <br />
                  Nairobi, Kenya
                </span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/stbillcommunityeducationalcentre"
                className="hover:text-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={26} />
              </a>
              <a
                href="https://www.linkedin.com/company/st-bill-community-education-centre-dandora-kenya/"
                className="hover:text-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={26} />
              </a>
              <a
                href="https://www.youtube.com/@stbilltv"
                className="hover:text-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube size={26} />
              </a>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="flex flex-col md:flex-row justify-center items-center text-center text-gray-300 text-sm">
          <p>
            &copy; {new Date().getFullYear()} St Bill Community Education
            Center. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
