const Testimonials = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-12">
          What Citizens Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            "Finally, someone is listening!",
            "My streetlight was fixed in 3 days!",
            "Best civic app in Dhaka!",
          ].map((t, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur p-8 rounded-2xl border border-white/20"
            >
              <p className="text-gray-300 italic">"{t}"</p>
              <p className="mt-4 text-cyan-400 font-bold">- A Happy Citizen</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
