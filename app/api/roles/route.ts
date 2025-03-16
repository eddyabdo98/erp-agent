import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/roles - Get all roles
export async function GET() {
  try {
    const roles = await prisma.role.findMany();
    return NextResponse.json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/roles - Create a new role
export async function POST(request: Request) {
  try {
    const { name, description } = await request.json();
    const role = await prisma.role.create({
      data: {
        name,
        description
      }
    });
    return NextResponse.json(role);
  } catch (error) {
    console.error('Error creating role:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 