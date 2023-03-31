import { uglify } from 'rollup-plugin-uglify';
import babel from "rollup-plugin-babel";
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from "rollup-plugin-replace";

const isDev = process.env.NODE_ENV !== 'production';

export default {
    input: "src/main.js",
    output: [
        {
            file: "dist/main.umd.js",
            format: "umd",
            name: 'gscCommonTools'
        },
        {
            file: "dist/main.esm.js",
            format: "es"
        },
        {
            file: "dist/main.cjs.js",
            format: "cjs"
        },
    ],
    plugins: [
       !isDev && uglify(),
        babel({
            exclude: 'node_modules/**',
        }),
        resolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        commonjs(),
        replace({
            ENV: JSON.stringify(process.env.NODE_ENV || "development")
        }),
    ]
};