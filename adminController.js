import { PrismaClient } from "@prisma/client";

//Database enums, user RideStatus.pending for example
import { UserRole } from "@prisma/client";
import { RouteId } from "@prisma/client";
import { RefundRequestStatus } from "@prisma/client";

const prisma = new PrismaClient();

const admins = prisma.User; //use Admin.findMany() for example, instead of typing prisma.User every time 
//remember to check check that role === admin in queries

const getAllAdmins = async (req, res) => {
  try {
    res.status(200).json({data: {hello:"from admin service"}});
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default {
  getAllAdmins,
};
