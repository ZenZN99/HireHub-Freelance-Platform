const Tabs = () => {
  return (
    <div className="flex items-center gap-6 border-b border-[#111] mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
      {[
        "Overview",
        "Submitted Proposals",
        "Current Jobs",
        "My Services",
        "Reviews & Ratings",
      ].map((tab, idx) => (
        <button
          key={tab}
          className={`pb-4 text-[12px] font-medium transition-colors ${idx === 0 ? "text-white border-b-2 border-white" : "text-gray-500 hover:text-gray-300"}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
