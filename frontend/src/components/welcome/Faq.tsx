import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

const faqs = [
  {
    q: "What is HireHub?",
    a: "HireHub is a freelance platform that connects clients with top global talent in development, design, marketing, and more.",
  },
  {
    q: "How do I hire a freelancer?",
    a: "Simply sign up as a client, browse freelancers or services, and start a project instantly.",
  },
  {
    q: "How do freelancers get paid?",
    a: "Payments are securely processed through HireHub and released after project completion or milestone approval.",
  },
  {
    q: "Can I work globally?",
    a: "Yes, HireHub is a global platform that allows freelancers and clients from all countries to collaborate.",
  },
  {
    q: "Is HireHub safe?",
    a: "Yes, all users are verified and payments are protected through secure escrow systems.",
  },
  {
    q: "Can I switch roles?",
    a: "Yes, users can act as both freelancer and client depending on their needs.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="min-h-screen bg-[#0A0A0A] text-white px-6 py-32">
      {/* HEADER */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-white/30 text-sm uppercase tracking-[0.4em]">
          EVERYTHING_YOU_NEED_TO_KNOW
        </p>
      </div>

      {/* FAQ LIST */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="bg-[#0C0C0C] border border-white/5 rounded-2xl overflow-hidden"
          >
            {/* QUESTION */}
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/5 transition"
            >
              <span className="font-black text-sm md:text-base">{item.q}</span>

              <LuChevronDown
                className={`transition-transform ${
                  openIndex === index
                    ? "rotate-180 text-[#34d399]"
                    : "text-white/40"
                }`}
              />
            </button>

            {/* ANSWER */}
            <div
              className={`px-6 text-white/30 text-sm leading-relaxed transition-all duration-300 ${
                openIndex === index
                  ? "max-h-40 pb-6 opacity-100"
                  : "max-h-0 overflow-hidden opacity-0"
              }`}
            >
              {item.a}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
