import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOption";
import { getCollection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
    try {
        const session = await getServerSession({ req, ...authOptions });
        if (!session?.user?.email) {
            return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
        }

        const body = await req.json();
        const { poiCompleted } = body;
        if (typeof poiCompleted !== "number") {
            return new Response(
                JSON.stringify({ message: "poiCompleted (number) is required" }),
                { status: 400 }
            );
        }

        const usersCol = await getCollection("users");
        if (!usersCol) return new Response(JSON.stringify({ message: "Users collection not found" }), { status: 500 });

        // Normalize email for case-insensitive lookup
        const normalizedEmail = (session.user.email || "").toLowerCase().trim();
        const user = await usersCol.findOne({ 
          email: { $regex: new RegExp(`^${normalizedEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') }
        });
        if (!user) return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });

        // Ensure we have an array that lists every POI the user has finished
        const alreadyCompleted: number[] = Array.isArray(user.completedPOIs)
            ? user.completedPOIs
            : [];

        // Only store the new POI if it hasn't been stored before
        const hasCompleted = alreadyCompleted.includes(poiCompleted);
        const updatedCompletedPOIs = hasCompleted
            ? alreadyCompleted
            : [...alreadyCompleted, poiCompleted];

        const newPOIsCompleted = updatedCompletedPOIs.length;
        const newPoints = user.points || 0; // keep points logic untouched for now
        let newLevel = user.currentLevel || 1;


        const milestones = [3, 6, 9, 12, 13];
        const maxLevel = 5;

        milestones.forEach((milestone, idx) => {
            if (newPOIsCompleted >= milestone && newLevel < idx + 2) {
                newLevel = Math.min(idx + 2, maxLevel);
            }
        });


        await usersCol.updateOne(
            { _id: new ObjectId(user._id) },
            {
                $addToSet: {
                    completedPOIs: poiCompleted,
                },
                $set: {
                    POIsCompleted: newPOIsCompleted, // keep numeric counter for backward compatibility
                    currentLevel: newLevel,
                    points: newPoints,
                },
            }
        );

        return new Response(
            JSON.stringify({
                message: "POI progress updated",
                completedPOIs: updatedCompletedPOIs,
                POIsCompleted: newPOIsCompleted,
                currentLevel: newLevel,
                points: newPoints,
            }),
            { status: 200 }
        );
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
    }
}
