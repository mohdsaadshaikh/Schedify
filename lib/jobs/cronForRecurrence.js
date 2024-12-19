// // for development only
// const cron = require("node-cron");
// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();

// // Schedule cron job to run every minute
// // cron.schedule("* * * * *", async () => {
// // Schedule cron job to run at 12:00 AM daily
// cron.schedule("0 0 * * *", async () => {
//   console.log("Cron job started at:", new Date());

//   try {
//     const recurringTasks = await prisma.task.findMany({
//       where: {
//         NOT: { recurrence: "NONE" },
//       },
//     });

//     for (const task of recurringTasks) {
//       const {
//         recurrence,
//         startTime,
//         endTime,
//         date,
//         userId,
//         title,
//         description,
//         color,
//         priority,
//       } = task;

//       console.log("date", date);

//       let newDate = new Date(date);

//       switch (recurrence) {
//         case "DAILY":
//           newDate.setDate(newDate.getDate() + 1);
//           break;
//         case "WEEKLY":
//           newDate.setDate(newDate.getDate() + 7);
//           break;
//         case "MONTHLY":
//           newDate.setMonth(newDate.getMonth() + 1);
//           break;
//         case "YEARLY":
//           newDate.setFullYear(newDate.getFullYear() + 1);
//           break;
//       }

//       const existingTask = await prisma.task.findFirst({
//         where: {
//           title,
//           date: newDate,
//           userId,
//         },
//       });

//       if (!existingTask) {
//         await prisma.task.create({
//           data: {
//             title,
//             description,
//             startTime,
//             endTime,
//             date: newDate,
//             recurrence,
//             color,
//             priority,
//             userId,
//             completed: false,
//           },
//         });
//         console.log(`New task created for user ${userId} on date ${newDate}`);
//       } else {
//         console.log(
//           `Task already exists for user ${userId} on date ${newDate}`
//         );
//       }
//     }

//     console.log("Cron job completed!");
//   } catch (error) {
//     console.error("Error running cron job:", error);
//   }
// });

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

(async () => {
  console.log("Cron job started at:", new Date());

  try {
    const recurringTasks = await prisma.task.findMany({
      where: {
        NOT: { recurrence: "NONE" },
      },
    });

    for (const task of recurringTasks) {
      const {
        recurrence,
        startTime,
        endTime,
        date,
        userId,
        title,
        description,
        color,
        priority,
      } = task;

      console.log("date", date);

      let newDate = new Date(date);

      switch (recurrence) {
        case "DAILY":
          newDate.setDate(newDate.getDate() + 1);
          break;
        case "WEEKLY":
          newDate.setDate(newDate.getDate() + 7);
          break;
        case "MONTHLY":
          newDate.setMonth(newDate.getMonth() + 1);
          break;
        case "YEARLY":
          newDate.setFullYear(newDate.getFullYear() + 1);
          break;
      }

      const existingTask = await prisma.task.findFirst({
        where: {
          title,
          date: newDate,
          userId,
        },
      });

      if (!existingTask) {
        await prisma.task.create({
          data: {
            title,
            description,
            startTime,
            endTime,
            date: newDate,
            recurrence,
            color,
            priority,
            userId,
            completed: false,
          },
        });
        console.log(`New task created for user ${userId} on date ${newDate}`);
      } else {
        console.log(
          `Task already exists for user ${userId} on date ${newDate}`
        );
      }
    }

    console.log("Cron job completed!");
  } catch (error) {
    console.error("Error running cron job:", error);
  } finally {
    await prisma.$disconnect();
  }
})();
