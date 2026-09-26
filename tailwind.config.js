export default {
    content: ['./index.html', './src/**/*.{ts,js}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
            },
            letterSpacing: {
                tightest: '-0.045em',
            },
            screens: {
                xs: '375px',
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px',
            },
            spacing: {
                'safe-top': 'env(safe-area-inset-top)',
                'safe-bottom': 'env(safe-area-inset-bottom)',
                'safe-left': 'env(safe-area-inset-left)',
                'safe-right': 'env(safe-area-inset-right)',
            },
            minHeight: {
                screen: '100svh',
            },
            transitionTimingFunction: {
                smooth: 'cubic-bezier(0.32, 0.72, 0, 1)',
            },
        },
    },
    plugins: [],
}