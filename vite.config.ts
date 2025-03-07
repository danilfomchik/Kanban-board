import react from '@vitejs/plugin-react';
import {resolve} from 'path';
import {defineConfig} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const outDir = resolve(__dirname, 'dist');

export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    build: {
        outDir,
    },
});
