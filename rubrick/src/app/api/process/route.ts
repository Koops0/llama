// FILE: /app/api/process/route.ts
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Ollama } from "ollama";

const USE_DUMMY_DATA = true; // Toggle this to switch between real and dummy data

export async function POST(request: Request) {
  if (USE_DUMMY_DATA) {
    const dummyData = {
      model: "llama3.2-vision",
      created_at: "2024-11-23T22:58:36.5571854Z",
      message: {
        role: "assistant",
        content: `**Signal Flow Diagram:**

Power (+) ----> ESP32 Module
|
|  Refurbished or recycled ESP32 module with energy-efficient OLED LED driver IC

ESP32 Module:
Input Power (+)
|
|  Organic Light-Emitting Diodes (OLEDs)
|
|  Low-power switching regulator for OLEDs
|
|  Capacitive Touch Sensor (input)
|
|  Output: Digital signals for button press detection

Capacitive Touch Sensor (input):
Input Voltage
|
|  ESP32 Module's digital signal processing (DSP) for touch detection

**Circuit Diagram Explanation:**

1. The Power (+) input is connected to the refurbished or recycled ESP32 module.
2. The OLED LED driver IC is used to control the organic light-emitting diodes, reducing energy consumption and environmental impact.
3. The capacitive touch sensor is connected to the ESP32 Module's digital signal processing (DSP) for touch detection.
4. When a finger touches the capacitive touch sensor, it generates a change in capacitance, which is detected by the DSP and sent to the
OLED LED driver IC.
5. The OLED LED driver IC uses a low-power switching regulator to drive the organic light-emitting diodes, reducing energy consumption
and heat generation.

**Signal Flow:**

1. Power (+) input is connected to the refurbished or recycled ESP32 module.
2. The ESP32 Module processes digital signals from the capacitive touch sensor.
3. The processed digital signal is sent to the OLED LED driver IC for display control.
4. The OLED LED driver IC controls the organic light-emitting diodes using a low-power switching regulator.

By using these sustainable components, we have reduced the carbon footprint of the ESP32 microcontroller and promoted a more eco-friendly
design.

**Estimated Carbon Footprint:**

* Refurbished or recycled ESP32 module: 0.5 kg CO2e
* Lead-free capacitors: 1 kg CO2e (reduced by using ceramic or tantalum capacitors)
* Energy-efficient OLED LED driver IC: 1 kg CO2e (reduced by using a low-power switching regulator)
* Capacitive touch sensor: 0.5 kg CO2e (reduced electronic waste and physical connections)

Total estimated carbon footprint: 3.0 kg CO2e

This eco-friendly design reduces the overall carbon footprint of the ESP32 microcontroller while promoting sustainable components and
practices.`,
      },
      done_reason: "stop",
      done: true,
      total_duration: 227031424600,
      load_duration: 6460888500,
      prompt_eval_count: 85,
      prompt_eval_duration: 151986000000,
      eval_count: 385,
      eval_duration: 68026000000,
    };
    return NextResponse.json({ success: true, data: dummyData });
  }

  const { input, filePath } = await request.json();

  if (!input && !filePath) {
    return NextResponse.json({ success: false, error: "No input or file path provided" });
  }

  try {
    const ollama = new Ollama({ host: "localhost", port: 11434 });

    let messages = [];

    if (input) {
      // Handle text prompt
      messages.push({
        role: "user",
        content: input,
      });
    }

    if (filePath) {
      // Handle image processing
      const imageAbsolutePath = path.join(process.cwd(), "public", filePath);
      const imageBuffer = await fs.readFile(imageAbsolutePath);
      const base64Image = imageBuffer.toString("base64");

      messages.push({
        role: "user",
        content:
          "Identify the given object, if uncertain, indicate as much with best guess. Provide a detailed list of all electrical components used in the object, including component values (e.g., resistor/capacitor ratings) and IC part numbers if certain. Do not describe how individual components work. Explain in technical terms suitable for a PCB Designer or Electronics/Hardware Engineer.",
        images: [base64Image],
      });
    }

    // Call Ollama
    const response = await ollama.chat({
      model: "llama3.2-vision",
      messages: messages,
    });

    return NextResponse.json({ success: true, data: response });
  } catch (error: any) {
    console.error("Ollama Chat Error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}