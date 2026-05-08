const AdminOrders = () => {
  return (
    <div className="vibrant-card p-12">
      <h2 className="text-4xl font-black tracking-tighter mb-4">ORDERS</h2>
      <p className="text-text-muted text-sm font-bold mb-10 uppercase tracking-widest">Transaction & Fulfillment Queue</p>
      
      <div className="py-24 bg-gray-50 rounded-[3rem] border border-gray-100 border-dashed flex flex-col items-center justify-center text-center px-10">
        <p className="text-2xl text-black font-black italic mb-2 tracking-tight">System Terminal Standby</p>
        <p className="text-text-muted text-sm font-medium">Order management logic is being calibrated. Check back shortly.</p>
      </div>
    </div>
  );
};

export default AdminOrders;