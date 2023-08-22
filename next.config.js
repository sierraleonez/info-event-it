/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'fastly.picsum.photos'
            }
        ]
    }
}

module.exports = nextConfig
