import { useEffect, useState } from "react";
import { contentAPI } from "../../services/api";
import { motion } from "framer-motion";

// Animation configurations
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};

export default function LeadershipPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeadership = async () => {
      try {
        await contentAPI.getLeadership();
      } catch (error) {
        console.error("Error loading leadership:", error);
      } finally {
        setLoading(false);
      }
    };
    loadLeadership();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 font-medium text-gray-500">
        Loading Team...
      </div>
    );
  }

  const directorData = {
    name: "Joshua Angatia Panyako",
    title: "Director & Founder",
    image: "/leaders/director.jpeg",
    message: `Mr. Joshua Angatia Panyako is a board member and the founder of St. Bill Community Education Centre in Dandora. He was born and raised in a humble family of eight children, characterized by extreme poverty. His parents were peasant farmers who struggled to afford basic needs for their family. Out of the eight children, six dropped out of school at the primary level due to a lack of school fees. Only two (him part of the two) were able to continue beyond secondary school, thanks to bursaries, friends, and well-wishers.

In 2008, after completing his university education, Joshua moved to Dandora in search of employment. However, he was unable to secure a formal job because his professional documents were withheld by the university due to an outstanding fees balance. As a result, he decided to volunteer as a teacher at an orphanage in Dandora. This experience, surrounded by the lives of innocent orphans and vulnerable children, ignited his passion for serving humanity.

After a year of teaching at the orphanage, Joshua dreamed of creating a community-based institution to provide quality education in Dandora. He was convinced that education was the key to breaking the cycle of poverty that plagued the area for generations.

In 2009, Joshua turned his dream into reality by establishing St. Bill Community Education Centre. It started as a modest facility with two semi-permanent classrooms, two students, and one untrained teacher. Over the years, the center has grown into a comprehensive educational institution serving children and youth from diverse backgrounds. Today, it serves over 350 learners, supported by 25 teachers and five staff members.

Joshua holds a degree in computer science and is currently pursuing a diploma in addiction counseling. His goal is to help the Dandora community, which is also affected by substance abuse and drug-related issues.`,
  };

  const boardMembers = [
    {
      name: "Daniel Kamau",
      title: "Chairperson of the Board",
      image: "/leaders/Daniel_Kamau.jpeg",
      bio: `Mr. Daniel Kamau is the current chairman of the Board. He has experience of more than 20 years in the Information Technology (IT) field. More than 10 years of experience in management in IT infrastructure and 2 years in IT consultancy.

He holds a degree of BSc. Information Technology, a higher diploma in Management Information Systems (IMIS), he is a certified Fibre Optics Technician (CFOT), and he is certified in CCNA.`,
    },
    {
      name: "Fredrick Radome",
      title: "Board Secretary",
      image: "/leaders/Fredrick_Radome.jpeg",
      bio: `Mr. Fredrick Radome is the current Board Secretary of St. Bill Community Education Centre, located in Dandora. Fredrick has extensive experience in public health and project management.

He has worked with KEMRI's Department for the Centre of Public Health Research (CPHR), JKIA Port Health, and is currently with SAPTA-KRC's Global Fund-funded project. This project contributes to the attainment of universal health coverage through comprehensive HIV prevention, treatment, care, and support for people who inject drugs (PWIDs) in Nairobi.

Fredrick is passionate about helping communities register Community-Based Organizations (CBOs) and securing funding through proposal writing. He is also dedicated to linking reformed drug users and pupils from vulnerable backgrounds with scholarship opportunities.`,
    },
    {
      name: "Rose Kavevi",
      title: "Board Member & Business Liaison",
      image: "/leaders/Rose_Kavevi.jpeg",
      bio: `Ms. Rose Kavevi is the current Board member of St. Bill Community Education Centre, located in Dandora. Rose has extensive experience in business management and plant maintenance.

She has worked with Spicers Eastern Africa and is currently with Wichmann Systems Ltd as business director. Her expertise contributes to the success of the business, having attained a 26% growth in the year 2023-2024. Rose is passionate about giving back to the community through her expertise, creating job opportunities, and spending time with the disadvantaged in the community to inspire hope in them.

Rose has a degree in International Business Management and a diploma in Electrical and Electronic Engineering.`,
    },
  ];

  const partnerData = {
    name: "Denise Mcsheffrey",
    title: "Primary Global Partner",
    image: "/leaders/Denise_Mcsheffery.jpeg",
    description: `As a partner to ST Bill Community Education Centre Dandora Kenya, you will be making a difference to the vulnerable, underprivileged, orphaned and disadvantaged children in Dandora slum and its environs. Education is the only powerful tool that can break the chain of poverty from one generation to the next generation.`,
  };

  const AvatarPlaceholder = () => (
    <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center text-gray-400 p-4 text-center">
      <svg
        className="w-12 h-12 mb-2 opacity-50"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
      <span className="text-xs bg-gray-200/60 px-2 py-0.5 rounded font-mono">
        Photo Box
      </span>
    </div>
  );

  return (
    <div className="space-y-16 bg-gray-50/40 min-h-screen pb-20 overflow-hidden">
      {/* Page Header */}
      <section className="bg-primary text-white py-14 shadow-sm relative">
        <div className="container-main">
          {/* Animated Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mb-4"
          >
            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white font-medium transition-colors group"
            >
              <span className="transform group-hover:-translate-x-1 transition-transform inline-block">
                ←
              </span>
              Back to Home
            </a>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold tracking-tight"
          >
            Leadership & Governance
          </motion.h1>
          <p className="mt-1 text-white/80 text-sm">
            The visionary team driving inclusive education and structural
            transformation in Dandora.
          </p>
        </div>
      </section>

      {/* Main Layout Containers */}
      <div className="container-main space-y-20">
        {/* TIER 1: EXECUTIVE DIRECTOR */}
        <section className="space-y-6">
          <h2 className="section-title text-primary border-b pb-2">
            Executive Leadership
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden grid grid-cols-1 lg:grid-cols-3 items-stretch"
          >
            {/* Image Wrap */}
            <div className="relative bg-gray-100 h-72 lg:h-auto min-h-[340px] lg:col-span-1 overflow-hidden">
              {directorData.image ? (
                <img
                  src={directorData.image}
                  alt={directorData.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <AvatarPlaceholder />
              )}
            </div>

            {/* Context Text Content */}
            <div className="p-8 lg:col-span-2 flex flex-col justify-center space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-primary">
                  {directorData.name}
                </h3>
                <p className="text-secondary font-semibold text-sm uppercase tracking-wider mt-0.5">
                  {directorData.title}
                </p>
              </div>
              <div className="relative">
                <span className="absolute -top-5 -left-2 text-5xl text-secondary/10 font-serif">
                  “
                </span>
                <div className="text-gray-600 text-sm md:text-base leading-relaxed pl-4 space-y-3 whitespace-pre-line">
                  {directorData.message}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* TIER 2: BOARD MEMBERS GRID */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-6"
        >
          <h2 className="section-title text-primary border-b pb-2">
            The Advisory Board
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {boardMembers.map((member, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)",
                }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col transition-all"
              >
                {/* Photo space */}
                <div className="h-56 bg-gray-100 relative">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <AvatarPlaceholder />
                  )}
                </div>
                {/* Details */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-primary leading-snug">
                      {member.name}
                    </h3>
                    <p className="text-xs text-accent font-semibold uppercase tracking-wide mt-1">
                      {member.title}
                    </p>
                  </div>
                  <p className="text-gray-600 text-xs leading-relaxed flex-grow whitespace-pre-line">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* TIER 3: STRATEGIC PARTNERS */}
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6 max-w-3xl mx-auto"
        >
          <h2 className="section-title text-primary border-b pb-2 text-center">
            Global Partnership
          </h2>

          <div className="bg-white rounded-xl shadow-sm border border-dashed border-gray-300 p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Partner Logo/Photo Box */}
            <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-100 rounded-xl flex-shrink-0 relative overflow-hidden border shadow-inner">
              {partnerData.image ? (
                <img
                  src={partnerData.image}
                  alt={partnerData.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <AvatarPlaceholder />
              )}
            </div>

            {/* Content info */}
            <div className="text-center md:text-left space-y-2 flex-grow">
              <div>
                <h3 className="text-xl font-bold text-primary">
                  {partnerData.name}
                </h3>
                <p className="text-xs text-secondary font-semibold uppercase tracking-wider mt-0.5">
                  {partnerData.title}
                </p>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed pt-2 italic border-t border-gray-100">
                "{partnerData.description}"
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
