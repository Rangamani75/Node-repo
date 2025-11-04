const { Service } = require("../models/service.model");
const { sendEmail } = require("../utils/sendEmail");

exports.bookService = async (req, res) => {
  try {
    const { vehicleModel, serviceType, bookingDate } = req.body;
    const userId = req.user.userId;

    const costMap = { basic: 1000, premium: 2000, full: 3000 };
    const cost = costMap[serviceType];

    const service = await Service.create({
      userId,
      vehicleModel,
      serviceType,
      bookingDate,
      cost,
    });

    const html = `
      <h3>AutoCare Service Center</h3>
      <p>Your vehicle service has been successfully booked!</p>
      <p><strong>Booking ID:</strong> ${service._id}</p>
      <p>Service Type: ${serviceType}</p>
      <p>Booking Date: ${bookingDate}</p>
      <p>Total Cost: ₹${cost}</p>
    `;

    await sendEmail(req.user.email, "Service Booking Confirmation", html);

    res.json({ message: "Service booked successfully", serviceId: service._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.completeService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id).populate("userId");
    if (!service) return res.status(404).json({ error: "Service not found" });

    service.status = "completed";
    await service.save();

    const html = `
      <h3>AutoCare Service Center</h3>
      <p>Your vehicle service (Booking ID: ${service._id}) has been completed successfully!</p>
    `;

    await sendEmail(service.userId.email, "Service Completed", html);
    res.json({ message: "Service marked as completed" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getReport = async (req, res) => {
  try {
    const report = await Service.aggregate([
      {
        $group: {
          _id: "$serviceType",
          count: { $sum: 1 },
          totalRevenue: { $sum: "$cost" },
        },
      },
    ]);

    const total = await Service.aggregate([
      {
        $group: {
          _id: null,
          totalBookings: { $sum: 1 },
          totalRevenue: { $sum: "$cost" },
          avgCostPerUser: { $avg: "$cost" },
        },
      },
    ]);

    const result = {
      totalBookings: total[0]?.totalBookings || 0,
      totalRevenue: total[0]?.totalRevenue || 0,
      avgCostPerUser: total[0]?.avgCostPerUser || 0,
      serviceBreakdown: report.map(r => ({
        serviceType: r._id,
        count: r.count,
        totalRevenue: r.totalRevenue,
      })),
    };

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
