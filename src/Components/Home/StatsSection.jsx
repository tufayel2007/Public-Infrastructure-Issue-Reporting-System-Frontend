const StatsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-900/50 to-cyan-900/50">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {[
          { number: "2,847+", label: "Issues Reported" },
          { number: "1,292+", label: "Issues Resolved" },
          { number: "89%", label: "Resolution Rate" },
          { number: "15,000+", label: "Active Citizens" },
        ].map((stat, i) => (
          <div key={i}>
            <h3 className="text-5xl font-extrabold text-cyan-400">
              {stat.number}
            </h3>
            <p className="text-gray-300 mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default StatsSection;
