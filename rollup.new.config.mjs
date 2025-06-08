import resolve from '@rollup/plugin-node-resolve'; // ✅ nuovo package
import typescript from '@rollup/plugin-typescript'; // ✅ moderno
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser'; // ✅ va destrutturato
import execute from 'rollup-plugin-execute'; // ancora valido
import commonjs from '@rollup/plugin-commonjs'; // 👈 nuovo import

export default {
    input: 'src/ha-weather-ecard.ts',
    output: {
        //dir: './dist',
        file: 'dist/ha-card-weather-conditions.js', // 👈 nome file forzato
        format: 'esm',
        sourcemap: 'inline',
        banner: false,
        // comments: false
    },
    plugins: [
        resolve({
            browser: true, // 👈 molto importante per card frontend
            exportConditions: ['browser']
        }),
        commonjs(), // 👈 serve per convertire eventuali commonjs a es6
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
