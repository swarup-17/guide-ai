import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) return null;

  try {
    let existingUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (!existingUser) {
      existingUser = await db.user.create({
        data: {
          clerkUserId: user.id,
          name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
          imageUrl: user.imageUrl,
          email: user.emailAddresses[0]?.emailAddress ?? "",
        },
      });
    }

    return existingUser;
  } catch (error) {
    console.error("Error checking/creating user:", error.message);
    return null;
  }
};
