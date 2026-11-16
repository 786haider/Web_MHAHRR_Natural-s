import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ADMIN_FILE = path.join(process.cwd(), 'data', 'admin.json');

function getAdminData() {
  try {
    if (fs.existsSync(ADMIN_FILE)) {
      const data = fs.readFileSync(ADMIN_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading admin data:', err);
  }
  return {
    username: 'admin',
    password: 'admin123',
    name: 'MHAHRR Administrator',
    email: 'admin@mhahrr.com',
  };
}

function saveAdminData(data: Record<string, unknown>) {
  fs.writeFileSync(ADMIN_FILE, JSON.stringify(data, null, 2), 'utf8');
}

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    const admin = getAdminData();

    if (
      username?.trim().toLowerCase() === admin.username.toLowerCase() &&
      password === admin.password
    ) {
      // Simple secure session token
      const token = Buffer.from(
        `${admin.username}:${Date.now()}:${admin.password.slice(0, 4)}`
      ).toString('base64');

      return NextResponse.json({
        success: true,
        token,
        user: {
          username: admin.username,
          name: admin.name || 'MHAHRR Administrator',
          email: admin.email || 'admin@mhahrr.com',
        },
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid admin username or password' },
      { status: 401 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: 'Internal server error during authentication' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const [user] = decoded.split(':');
    const admin = getAdminData();

    if (user === admin.username) {
      return NextResponse.json({
        authenticated: true,
        user: {
          username: admin.username,
          name: admin.name,
          email: admin.email,
        },
      });
    }
  } catch {
    // token decoding failed
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function PUT(req: Request) {
  try {
    const { currentPassword, newPassword, newUsername, email, name } = await req.json();
    const admin = getAdminData();

    if (currentPassword !== admin.password) {
      return NextResponse.json(
        { success: false, error: 'Current password is incorrect' },
        { status: 400 }
      );
    }

    if (newPassword && newPassword.length < 6) {
      return NextResponse.json(
        { success: false, error: 'New password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const updated = {
      ...admin,
      username: newUsername?.trim() || admin.username,
      password: newPassword || admin.password,
      email: email?.trim() || admin.email,
      name: name?.trim() || admin.name,
      updatedAt: new Date().toISOString(),
    };

    saveAdminData(updated);

    return NextResponse.json({
      success: true,
      message: 'Admin credentials updated successfully',
      user: {
        username: updated.username,
        name: updated.name,
        email: updated.email,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: 'Failed to update admin credentials' },
      { status: 500 }
    );
  }
}
