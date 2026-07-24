import path from 'node:path';
import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

const isDev = process.env.NODE_ENV !== 'production';

export default defineConfig({
  entry: './src/index.tsx',
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'cheap-module-source-map' : false,
  output: {
    // See todo-app/rspack.config.ts for why this isn't 'auto': the initial
    // <script> tag in index.html needs a build-time-known prefix so deep
    // links served via the SPA not_found_page fallback resolve correctly.
    publicPath: isDev ? '/' : '/mf-chart-app/',
    uniqueName: 'chartApp',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: { syntax: 'typescript', tsx: true },
              transform: { react: { runtime: 'automatic', development: isDev } },
            },
          },
        },
        type: 'javascript/auto',
      },
      {
        test: /\.module\.css$/,
        type: 'css/module',
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        type: 'css',
      },
    ],
    parser: {
      'css/module': { namedExports: false },
    },
    generator: {
      'css/module': { exportsConvention: 'camel-case-only' },
    },
  },
  plugins: [
    new rspack.HtmlRspackPlugin({ template: './public/index.html' }),
    new rspack.DefinePlugin({
      'process.env.API_MODE': JSON.stringify(process.env.API_MODE ?? 'mock'),
      'process.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL ?? ''),
    }),
    new ModuleFederationPlugin({
      name: 'chartApp',
      filename: 'remoteEntry.js',
      exposes: {
        './ChartWidget': './src/ChartWidget.tsx',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^19.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
        'react-router': { singleton: true, requiredVersion: '^7.0.0' },
      },
    }),
  ],
  devServer: {
    port: 3002,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
  },
});
