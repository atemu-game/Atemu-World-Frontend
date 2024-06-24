/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: { emotion: true },
    reactStrictMode: true,
    webpack(config) {
        config.externals.push({
            'utf-8-validate': 'commonjs utf-8-validate',
            'bufferutil': 'commonjs bufferutil',
        })
            ,
            config.module.rules.push(
                {
                    test: /\.svg$/i,
                    use: [
                        {
                            loader: "babel-loader",
                        },
                        {
                            loader: "react-svg-loader",
                            options: {
                                jsx: false, // true outputs JSX tags
                                svgo: {
                                    plugins: [
                                        { removeViewBox: false },
                                    ],
                                },
                            }
                        },

                    ]
                }
            );
        return config;
    },

    env: {
        PUBLIC_NEXT_API: process.env.PUBLIC_NEXT_API || 'http://localhost:8088',
        PUBLIC_NEXT_SOCKET_PORT: process.env.PUBLIC_NEXT_SOCKET_PORT || 'http://localhost:8000'
    }
};

export default nextConfig;
