import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const LatestIssues = () => {
  const { data: issues = [], isLoading } = useQuery({
    queryKey: ["latestResolved"],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/issues/latest-resolved?limit=6`
      );
      return res.json();
    },
  });

  if (isLoading)
    return (
      <div className="py-20 text-center text-white">
        Loading latest fixes...
      </div>
    );

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center text-white mb-4">
          Recently Fixed Issues
        </h2>
        <p className="text-center text-gray-400 mb-12 text-lg">
          See how your reports are making a real difference!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {issues.map((issue) => (
            <div
              key={issue._id}
              className="bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 hover:border-cyan-400 transition-all"
            >
              <img
                src={issue.imageUrl}
                alt={issue.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {issue.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4">{issue.location}</p>
                <div className="flex justify-between items-center">
                  <span className="badge badge-success">Resolved</span>
                  <Link
                    to={`/issue/${issue._id}`}
                    className="text-cyan-400 hover:underline"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestIssues;
