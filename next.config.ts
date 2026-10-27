import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // EN: Allow the local WordPress media library for next/image optimization
  // FR: Autorise la médiathèque WordPress locale pour l'optimisation next/image
  images: {
    // EN: Local by Flywheel resolves clean-and-bliss.local to a private IP —
    //     explicitly trusted for next/image (dev-only environment)
    // FR: Local by Flywheel résout clean-and-bliss.local vers une IP privée —
    //     explicitement autorisée pour next/image (environnement de dev)
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "clean-and-bliss.local",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
