/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	  },
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		remotePatterns: [
			{
			  protocol: 'https',
			  hostname: 'art.pixilart.com',
			},
			{
				protocol: 'https',
				hostname: 'firebasestorage.googleapis.com',
			  },
		  ],
	},
	logging: {
		fetches: {
			fullUrl:true
		}
	}
};

export default nextConfig;