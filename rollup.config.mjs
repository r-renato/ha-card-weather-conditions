import resolve from '@rollup/plugin-node-resolve'; 
import typescript from '@rollup/plugin-typescript'; 
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser'; 
import execute from 'rollup-plugin-execute'; 
import commonjs from '@rollup/plugin-commonjs'; 

export default {
    input: 'src/ha-card-weather-conditions.ts',
    output: {
        dir: './dist',
        format: 'esm',
        sourcemap: 'inline',
        banner: false,
        // comments: false
    },
    plugins: [
        resolve({
            browser: true, 
            exportConditions: ['browser']
        }),
        commonjs(),
        typescript({
            tsconfig: './tsconfig.json'
        }),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            extensions: ['.js', '.ts']
        }),
        terser(),
        execute([
            `echo "$(date '+%d/%m/%Y %H:%M:%S') rollup done." ; echo -e '\\007'`
        ])
    ]
};
