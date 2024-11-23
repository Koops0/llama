import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("image") as File;

  if (!file) {
    return NextResponse.json({ success: false, error: "No file uploaded" });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filePath = path.join(UPLOAD_DIR, file.name);

  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ success: true, filePath: `/uploads/${file.name}` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
