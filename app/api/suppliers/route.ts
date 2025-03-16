import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/suppliers - Get all suppliers
export async function GET() {
  try {
    const suppliers = await prisma.supplier.findMany();
    return NextResponse.json(suppliers);
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/suppliers - Create a new supplier
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const supplier = await prisma.supplier.create({
      data
    });
    return NextResponse.json(supplier);
  } catch (error) {
    console.error('Error creating supplier:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 