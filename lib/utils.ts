import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomBrightColor(): string {
  // Helper function to generate a random integer between min and max values
  const randomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  // Ensure at least one component is high (near 255) to keep the color bright
  const r = randomInt(30, 255); // Random value between 128 and 255
  const g = randomInt(118, 255); // Random value between 128 and 255
  const b = randomInt(150, 255); // Random value between 128 and 255

  // Randomly shuffle RGB values to get diverse bright colors
  const rgb = [r, g, b].sort(() => 0.5 - Math.random());

  // Return the RGB color as a string
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

export function capitalizeFirstLetter(str: string): string {
  const result = str.slice(0, 1).toUpperCase() + str.slice(1);
  return result;
}

export function subtaskTotal (subTasks: SubTask[]) {
  const result = subTasks.reduce(
    (acc, curr) => (curr.is_complete ? acc + 1 : acc),
    0
  );

  return result
}
