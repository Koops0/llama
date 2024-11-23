import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import ollama from "ollama";

export async function POST(request: Request) {
  const { filePath } = await request.json();

  if (!filePath) {
    return NextResponse.json({ success: false, error: "No file path provided" });
  }

  try {
    // Convert the image file to Base64
    const imageAbsolutePath = path.join(process.cwd(), "public", filePath);
    const imageBuffer = await fs.readFile(imageAbsolutePath);
    const base64Image = imageBuffer.toString("base64");

    // Pass the Base64-encoded image to ollama
    const response = await ollama.chat({
      model: "llama3.2-vision",
      messages: [
        {
          role: "user",
          content:
            "Identify the given object, if uncertain, indicate as much with best guess. Provide a detailed list of all electrical components used in the object, including component values (e.g., resistor/capacitor ratings) and IC part numbers if certain. Do not describe how individual components work. Explain in technical terms suitable for a PCB Designer or Electronics/Hardware Engineer.",
          images: [base64Image],
        },
      ],
    });

    return NextResponse.json({ success: true, data: response });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
