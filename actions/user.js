"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    // Start a transaction to handle both operations
    const result = await db.$transaction(
      async (tx) => {
        // First check if the user already has industry insights
        const existingUserInsight = await tx.industryInsight.findFirst({
          where: {
            userId: user.id,
          },
        });

        let industryInsight;

        if (
          existingUserInsight &&
          existingUserInsight.industry === data.industry
        ) {
          // Keep existing insights if industry hasn't changed
          industryInsight = existingUserInsight;
        } else {
          // Generate new insights for the selected industry
          const insights = await generateAIInsights(data.industry);

          if (existingUserInsight) {
            // Update existing user insights if industry changed
            industryInsight = await tx.industryInsight.update({
              where: { id: existingUserInsight.id },
              data: {
                industry: data.industry,
                ...insights,
                lastUpdated: new Date(),
                nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              },
            });
          } else {
            // Create new user insights
            industryInsight = await tx.industryInsight.create({
              data: {
                industry: data.industry,
                ...insights,
                lastUpdated: new Date(),
                nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                userId: user.id,
              },
            });
          }
        }

        // Now update the user
        const updatedUser = await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            name: data.name,
            industry: data.industry,
            experience: data.experience,
            bio: data.bio,
            skills: data.skills,
          },
        });

        return { updatedUser, industryInsight };
      },
      {
        timeout: 10000, // default: 5000
      }
    );

    revalidatePath("/");
    return result.updatedUser;
  } catch (error) {
    console.error("Error updating user and industry:", error.message);
    throw new Error("Failed to update profile");
  }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        industry: true,
      },
    });

    return {
      isOnboarded: !!user?.industry,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
}
