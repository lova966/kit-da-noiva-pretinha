import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';

const CLOUD_STORE_ID = 'ff808181a09d98f701a0ee427b8c445a';
const CLOUD_STORE_URL = `https://api.restful-api.dev/objects/${CLOUD_STORE_ID}`;

function getLocalLeadsFilePath(): string {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    return path.join(dataDir, 'leads.json');
  } catch {
    return path.join(os.tmpdir(), 'leads_pretinha.json');
  }
}

function readLocalLeads(): any[] {
  try {
    const filePath = getLocalLeadsFilePath();
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.warn('Read local leads warning:', err);
  }
  return [];
}

function saveLocalLeads(leads: any[]) {
  try {
    const filePath = getLocalLeadsFilePath();
    fs.writeFileSync(filePath, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Save local leads warning:', err);
  }
}

async function fetchCloudLeads(): Promise<any[]> {
  try {
    const res = await fetch(CLOUD_STORE_URL, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store'
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.data && Array.isArray(data.data.leads)) {
        return data.data.leads;
      }
    }
  } catch (err) {
    console.warn('Cloud fetch warning (using local fallback):', err);
  }
  return [];
}

async function updateCloudLeads(leads: any[]): Promise<boolean> {
  try {
    const res = await fetch(CLOUD_STORE_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Atelier_Pretinha_Oficial_Leads_DB',
        data: {
          updatedAt: new Date().toISOString(),
          leads: leads
        }
      })
    });
    return res.ok;
  } catch (err) {
    console.error('Cloud update error:', err);
    return false;
  }
}

// Deduplicate leads by phone and keep authoritative list
function mergeAndDeduplicate(listA: any[], listB: any[]): any[] {
  const map = new Map<string, any>();
  const all = [...listA, ...listB];
  for (const item of all) {
    if (!item || !item.phone) continue;
    const cleanPhone = item.phone.replace(/\D/g, '');
    const key = cleanPhone || (item.name ? item.name.toLowerCase().trim() : item.id);
    if (!map.has(key)) {
      map.set(key, item);
    } else {
      // Keep the most recent or more complete entry
      const existing = map.get(key);
      const isNewer = new Date(item.createdAt || 0) > new Date(existing.createdAt || 0);
      if (isNewer) {
        map.set(key, { ...existing, ...item });
      }
    }
  }
  return Array.from(map.values()).sort((a, b) => 
    new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
  );
}

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

    const cleanPhone = phone.replace(/\D/g, '');

    const newLead = {
      id: 'lead-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      name: name.trim(),
      phone: cleanPhone,
      weddingDatePeriod: weddingDatePeriod || 'definindo',
      dressStatus: dressStatus || 'pesquisando',
      materialChoice: materialChoice || 'ambos',
      createdAt: new Date().toISOString()
    };

    // 1. Fetch current leads from cloud and local
    const cloudLeads = await fetchCloudLeads();
    const localLeads = readLocalLeads();

    // 2. Add new lead and deduplicate
    const updatedLeads = mergeAndDeduplicate([newLead], [...cloudLeads, ...localLeads]);

    // 3. Save to cloud database (permanent across Vercel)
    await updateCloudLeads(updatedLeads);

    // 4. Also save to local file as secondary backup
    saveLocalLeads(updatedLeads);

    return NextResponse.json({ success: true, lead: newLead, totalCount: updatedLeads.length });
  } catch (error: any) {
    console.error('Lead capture error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    // 1. Fetch cloud leads first (authoritative persistent source)
    const cloudLeads = await fetchCloudLeads();
    const localLeads = readLocalLeads();

    const merged = mergeAndDeduplicate(cloudLeads, localLeads);

    // If cloud had data that local didn't have, sync local
    if (cloudLeads.length > 0) {
      saveLocalLeads(merged);
    }

    return NextResponse.json({ 
      success: true, 
      leads: merged,
      source: cloudLeads.length > 0 ? 'cloud_database' : 'local_fallback',
      total: merged.length 
    });
  } catch (error: any) {
    console.error('Lead retrieval error:', error);
    const localLeads = readLocalLeads();
    return NextResponse.json({ success: true, leads: localLeads, fallback: true });
  }
}
