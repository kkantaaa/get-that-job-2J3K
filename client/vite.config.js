import path from "path";
import { defineConfig, loadEnv } from 'vite';
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";

// Get the current directory and filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables based on the current mode
const env = loadEnv(process.env.NODE_ENV, process.cwd());

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // Define environment variables that can be accessed in your code
    'process.env': env,
  },
});