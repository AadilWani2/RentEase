import { useEffect, useState } from "react";
import { createMaintenanceRequest, getMyMaintenanceRequests } from "../../features/maintenance/maintenanceService";
import toast from "react-hot-toast";
import { FiTool, FiSend, FiClock, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";

const MaintenanceSection = () => {
  const [requests, setRequests] = useState([]);
  const [issue, setIssue] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await getMyMaintenanceRequests();
      setRequests(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!issue.trim()) return toast.error("Please describe the issue");

    try {
      setSubmitting(true);
      await createMaintenanceRequest({ issue });
      setIssue("");
      fetchRequests();
      toast.success("Care request received");
    } catch (error) {
      toast.error("Failed to submit request");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Syncing Tickets...</p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {/* Form */}
      <div>
        <div className="mb-10">
          <h2 className="text-4xl font-black tracking-tighter uppercase">Concierge Support</h2>
          <p className="text-text-muted text-sm font-bold mt-1">Request white-glove care for your rental pieces.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <textarea
            placeholder="Detailed description of the structural or cosmetic issue..."
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 p-8 rounded-[2.5rem] h-48 focus:border-primary focus:outline-none transition-all font-medium resize-none leading-relaxed"
          />

          <button
            type="submit"
            disabled={submitting}
            className="pill-button px-10 py-5"
          >
            {submitting ? "Processing..." : "Request Care"}
            <FiSend />
          </button>
        </form>
      </div>

      {/* Requests */}
      <div>
        <h2 className="text-2xl font-black tracking-tight uppercase mb-8">Service History</h2>

        {requests.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-[3rem] border border-gray-100 border-dashed">
            <p className="text-xl text-text-muted font-bold italic">No active maintenance tickets.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {requests.map((request, idx) => (
              <motion.div
                key={request._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                    <FiTool className="text-xl" />
                  </div>
                  <div>
                    <p className="text-lg font-black tracking-tight text-black max-w-md line-clamp-1">
                      {request.issue}
                    </p>
                    <div className="flex items-center gap-4 mt-1 text-text-muted font-bold text-[10px]">
                      <span className="flex items-center gap-1">
                        <FiClock />
                        {new Date(request.createdAt).toLocaleDateString()}
                      </span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span className="uppercase tracking-widest">Ticket #{request._id.slice(-6).toUpperCase()}</span>
                    </div>
                  </div>
                </div>

                <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  request.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                }`}>
                  {request.status}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MaintenanceSection;