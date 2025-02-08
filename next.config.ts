//import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  distDir: 'build',
  experimental: {
    forceSwcTransforms: true,
  },
}

module.exports = nextConfig