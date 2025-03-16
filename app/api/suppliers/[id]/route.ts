import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/suppliers/[id] - Get a specific supplier
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supplier = await prisma.supplier.findUnique({
      where: { id: parseInt(params.id) }
    });

    if (!supplier) {
      return NextResponse.json(
        { message: 'Supplier not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(supplier);
  } catch (error) {
    console.error('Error fetching supplier:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/suppliers/[id] - Update a supplier
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const supplierId = parseInt(params.id);

    const supplier = await prisma.supplier.update({
      where: { id: supplierId },
      data
    });

    return NextResponse.json(supplier);
  } catch (error) {
    console.error('Error updating supplier:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH /api/suppliers/[id] - Update supplier status
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { active } = await request.json();
    const supplierId = parseInt(params.id);

    const supplier = await prisma.supplier.update({
      where: { id: supplierId },
      data: { active }
    });

    return NextResponse.json(supplier);
  } catch (error) {
    console.error('Error updating supplier status:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 