import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [react(), dts({ include: ['src'] })],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            formats: ['es'],
        },
        rollupOptions: {
            external: ['react', 'react/jsx-runtime'],
        },
    },
});
