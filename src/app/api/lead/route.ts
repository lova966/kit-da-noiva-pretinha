import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, weddingDatePeriod, dressStatus, materialChoice } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Nome e WhatsApp são obrigatórios.' },
        { status: 400 }
      );
    }

    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const filePath = path.join(dataDir, 'leads.json');
    let leads = [];

    if (fs.existsSync(filePath)) {
      try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        leads = JSON.parse(raw);
        if (!Array.isArray(leads)) leads = [];
      } catch {
        leads = [];
      }
    }

    const newLead = {
      id: 'lead-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      name: name.trim(),
      phone: phone.trim(),
      weddingDatePeriod: weddingDatePeriod || 'definindo',
      dressStatus: dressStatus || 'pesquisando',
      materialChoice: materialChoice || 'ambos',
      createdAt: new Date().toISOString()
    };

    leads.unshift(newLead);
    fs.writeFileSync(filePath, JSON.stringify(leads, null, 2), 'utf-8');

    return NextResponse.json({ success: true, lead: newLead });
  } catch (error: any) {
    console.error('Lead capture error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'leads.json');
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const leads = JSON.parse(raw);
      return NextResponse.json({ success: true, leads });
    }
    return NextResponse.json({ success: true, leads: [] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
