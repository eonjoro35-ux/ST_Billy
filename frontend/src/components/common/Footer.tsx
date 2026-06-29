import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-20">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">About School</h3>
            <p className="text-gray-300">
              Providing quality education and nurturing young minds for a
              brighter future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/admissions" className="hover:text-accent">
                  Admissions
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-accent">
                  News
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-accent">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex gap-2">
                <Phone size={20} /> +254 729 974 353
              </li>
              <li className="flex gap-2">
                <Mail size={20} /> stbilleducationalcentre@gmail.com
              </li>
              <li className="flex gap-2">
                <MapPin size={20} /> Dandora, Nairobi, Kenya
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

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-300">
          <p>
            &copy; {new Date().getFullYear()} St Bill Community Education
            Center. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
