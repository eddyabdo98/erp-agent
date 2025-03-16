import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// GET /api/users/[id] - Get a specific user
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        roles: {
          include: {
            role: true
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Return sanitized user data
    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      active: user.active,
      roles: user.roles.map(ur => ur.role.name)
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/users/[id] - Update a user
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, email, password, roles } = await request.json();
    const userId = parseInt(params.id);

    // Start building the update data
    const updateData: any = {
      name,
      email,
    };

    // Only update password if provided
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Update user and their roles
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...updateData,
        roles: {
          deleteMany: {},
          create: roles.map((roleId: number) => ({
            role: {
              connect: { id: roleId }
            }
          }))
        }
      },
      include: {
        roles: {
          include: {
            role: true
          }
        }
      }
    });

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      active: user.active,
      roles: user.roles.map(ur => ur.role.name)
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH /api/users/[id] - Update user status
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { active } = await request.json();
    const userId = parseInt(params.id);

    const user = await prisma.user.update({
      where: { id: userId },
      data: { active },
      include: {
        roles: {
          include: {
            role: true
          }
        }
      }
    });

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      active: user.active,
      roles: user.roles.map(ur => ur.role.name)
    });
  } catch (error) {
    console.error('Error updating user status:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 