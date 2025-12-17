import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import typescript from '@rollup/plugin-typescript';

const NODE_ENV = process.env.NODE_ENV || 'development'
const outputFile = './lib/index.js'

export default {
    input: './src/index.ts',
    output: {
        file: outputFile,
        format: 'cjs',
        sourcemap: true,
    },
    plugins: [
        typescript(),
        replace({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
        }),
        babel({
            exclude: 'node_modules/**',
        }),
        resolve(),
    ],
    external: ['react', 'react-dom'],
}
