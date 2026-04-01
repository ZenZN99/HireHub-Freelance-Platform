interface ProjectItemProps {
  title: string;
  client: string;
  budget: string;
}

const ProjectItem = ({ title, client, budget }: ProjectItemProps) => (
  <div className="bg-[#0a0a0a] border border-white/[0.03] p-8 rounded-[2rem] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:bg-[#111] transition-all group">
    <div className="flex-1">
      <h4 className="text-[17px] font-bold mb-2 group-hover:text-emerald-400 transition-colors">
        {title}
      </h4>
      <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest mb-6">
        {client} • <span className="text-white/40">{budget}</span>
      </p>
      <div className="flex gap-2">
        <span className="text-[8px] bg-white/5 px-4 py-1.5 rounded-md text-white/30 uppercase font-black">
          React
        </span>
        <span className="text-[8px] bg-white/5 px-4 py-1.5 rounded-md text-white/30 uppercase font-black">
          Tailwind
        </span>
      </div>
    </div>
    <button className="w-full md:w-auto bg-[#151515] border border-white/5 hover:bg-white hover:text-black px-10 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all">
      Submit Proposal
    </button>
  </div>
);

export default ProjectItem;
