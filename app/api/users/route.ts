import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// GET /api/users - Get all users
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        roles: {
          include: {
            role: true
          }
        }
      }
    });

    // Transform the data to hide sensitive information
    const sanitizedUsers = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      active: user.active,
      roles: user.roles.map(ur => ur.role.name)
    }));

    return NextResponse.json(sanitizedUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/users - Create a new user
export async function POST(request: Request) {
  try {
    const { name, email, password, roles } = await request.json();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with roles
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        roles: {
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

    // Return sanitized user data
    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      active: user.active,
      roles: user.roles.map(ur => ur.role.name)
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 