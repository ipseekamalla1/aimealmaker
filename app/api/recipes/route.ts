import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

// POST — Save a new recipe
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, ingredients, steps } = await req.json();

    if (!title || !ingredients?.length || !steps?.length) {
      return NextResponse.json(
        { error: "Missing title, ingredients, or steps" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const recipe = await prisma.recipe.create({
      data: {
        title,
        ingredients,
        steps,
        userId: user.id,
      },
      include: { user: true },
    });

    return NextResponse.json(recipe, { status: 201 });
  } catch (error) {
    console.error("Error saving recipe:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET — Fetch all recipes
export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(recipes);
  } catch (err) {
    console.error("Error fetching recipes:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
