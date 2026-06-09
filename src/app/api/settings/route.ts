/**
 * API Route: Settings
 * GET /api/settings - Get all settings
 * PUT /api/settings - Update settings
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAllSettings, updateSetting } from '@/lib/db/queries';

export async function GET(request: NextRequest) {
  try {
    const settings = await getAllSettings();
    
    // Convert array to object for easier access
    const settingsObject = settings.reduce((acc: any, setting) => {
      acc[setting.key_name] = setting.key_value;
      return acc;
    }, {});

    return NextResponse.json({ success: true, data: settingsObject });
  } catch (error: any) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // Update multiple settings at once
    for (const [key, value] of Object.entries(body)) {
      await updateSetting(key, value as string, 1); // TODO: Get userId from session
    }

    return NextResponse.json({ success: true, message: 'Settings updated successfully' });
  } catch (error: any) {
    console.error('Error updating setting:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
