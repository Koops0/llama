import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import ollama from "ollama";

const USE_DUMMY_DATA = true; // Toggle this to switch between real and dummy data

export async function POST(request: Request) {
  if (USE_DUMMY_DATA) {
    const dummyData = {
      model: "llama3.2-vision",
      created_at: "2024-11-23T22:58:36.5571854Z",
      message: {
        role: "assistant",
        content: `The object depicted is an ESP32-WROVER-I module, a microcontroller unit designed by Espressif Systems.

**Electrical Components:**

### Microcontroller:

* Processor: ESP32-D0WD-V3 (32-bit RISC CPU with Wi-Fi and Bluetooth capabilities)

### Memory:

* Flash memory: 4 MB (128 KB of instruction cache + 64 KB of data cache)
* RAM: 2 MB

### Power Management:

* Voltage regulator: Integrated voltage regulator for 3.3V operation
* Low-dropout linear regulator (LDO): For powering peripherals and I/Os

### Communication Interfaces:

* UART:
  + RX0
  + TX0
  + CTS0
  + RTS0
* SPI:
  + SCK
  + MOSI
  + MISO
  + CS
* I2C:
  + SDA
  + SCL

### Analog-to-Digital Converter (ADC):

* 12-bit ADC with up to 18 channels

### Digital-to-Analog Converter (DAC):

* None

### Clock Generation:

* Crystal oscillator: For generating a stable clock signal (typically 40 MHz)
* PLL: Phase-locked loop for generating a high-frequency clock signal

### Power and Reset:

* VDD pin: Connects to the 3.3V power supply
* GND pin: Connects to ground
* RST pin: Resets the microcontroller

### Other Components:

* Crystal oscillator capacitor (e.g., 22 pF)
* Decoupling capacitors (e.g., 10 uF, 100 nF)

**Note:** The exact component values and part numbers may vary depending on the specific ESP32-WROVER-I module variant. This list provides a general overview of the electrical components typically found in an ESP32-WROVER-I module.`,
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

  // Real API call
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