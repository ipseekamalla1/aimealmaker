import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { ingredients } = data

    if (!ingredients) {
      return NextResponse.json({ error: 'Ingredients required' }, { status: 400 })
    }

    const newEntry = await prisma.ingredientList.create({
      data: {
        ingredients,
      },
    })

    return NextResponse.json(newEntry)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const allIngredients = await prisma.ingredientList.findMany()
    return NextResponse.json(allIngredients)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
