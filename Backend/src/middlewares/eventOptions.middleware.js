const { Op } = require("sequelize");
const {HelperValidations}=require('../validations/helper.validation')


const eventOptionsMiddleware = async (req, res, next) => {
  const { status, categoryId, runningNow } = req.query;

  const where = {};

  // Filter by status
  if (status) {
    if (!["Available", "Finished", "Cancelled"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }
    where.status = status;
  }

  // Filter by categoryId
  if (categoryId) {
    if (HelperValidations.validateId(categoryId)) {
      return res.status(400).json({ error: "Invalid categoryId value" });
    }
    where.categoryId = categoryId;
  }

  // Filter by RunningNow (current date between startDate & endDate)
  if (runningNow === "true") {
    const now = new Date();
    where.startDate = { [Op.lte]: now };
    where.endDate = { [Op.gte]: now };
  }

  // Attach it to request object
  req.eventOptions = where;

  next();
};

module.exports = {eventOptionsMiddleware};
