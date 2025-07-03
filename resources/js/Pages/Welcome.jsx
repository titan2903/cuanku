import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

// --- Komponen Ikon (dibuat inline agar mandiri) ---
const CheckIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M20 6 9 17l-5-5" />
    </svg>
);

const SparklesIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="m12 3-1.9 4.8-4.8 1.9 4.8 1.9 1.9 4.8 1.9-4.8 4.8-1.9-4.8-1.9Z" />
        <path d="M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z" />
    </svg>
);

const SunIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m4.93 19.07 1.41-1.41" />
        <path d="m17.66 6.34 1.41-1.41" />
    </svg>
);

const MoonIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
);

const InstagramIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
    </svg>
);

const TiktokIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-1-6.66-2.91-1.83-1.9-2.75-4.37-2.75-6.81 0-2.44 1.04-4.87 2.96-6.69 1.83-1.72 4.2-2.65 6.55-2.61.01 2.2.02 4.4-.02 6.6.01-.21.01-.43.03-.63.01-1.08.28-2.15.69-3.16.4-1 .95-1.92 1.58-2.75.05-.07.09-.13.14-.19.04-.05.09-.1.13-.15.04-.04.08-.08.12-.12.01-.01.02-.02.03-.03.01-.01.03-.02.04-.03.01-.01.02-.02.03-.03.02-.02.04-.03.06-.05.01-.01.03-.02.04-.03.01-.01.02-.02.03-.02.02-.02.04-.03.06-.04.01-.01.02-.02.04-.03.01-.01.02-.02.03-.03.02-.01.04-.02.06-.03.02-.01.03-.02.05-.02.01-.01.02-.01.04-.02.02-.01.04-.02.06-.03.01-.01.02-.01.03-.02.02-.01.04-.02.07-.02.02-.01.03-.01.05-.02.02-.01.04-.01.06-.02.02-.01.03-.01.05-.01.02,0 .04-.01.06-.01.02,0 .03-.01.05-.01.02,0 .04,0 .06,0 .01,0 .02,0 .03,0h.01Z" />
    </svg>
);

const WhatsappIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.74.45 3.48 1.34 5.04l-1.36 4.95 5.07-1.33c1.52.81 3.21 1.23 4.86 1.23h.01c5.46 0 9.9-4.44 9.91-9.9C21.96 6.45 17.5 2 12.04 2zM9.52 7.34c.12-.22.34-.35.53-.35h.1c.15 0 .3.03.41.05.16.03.32.14.44.3.15.18.53.64.53 1.55s-.53 1.8-.61 1.92c-.08.12-.53.84-.53.84s-.22.26-.44.33c-.22.08-.47.1-.69.08-.22-.03-.44-.06-1.36-.5s-1.55-1.4-1.63-1.55c-.08-.15-.18-.34-.18-.53s.08-.3.18-.41zm6.05 4.35c-.15-.08-.9-.44-.9-.44s-.15-.06-.22.08c-.06.15 0 .3 0 .3s.15.18.3.3c.15.12.18.18.18.18s.03.08-.03.18c-.06.1-.5.58-.58.66-.08.08-.18.1-.22.1s-.18 0-.26-.03c-.08-.03-.18-.06-.87-.3-1.03-.38-1.6-1-1.6-1s-.12-.15-.12-.3c0-.15.12-.22.12-.22s.22-.26.3-.33c.08-.08.12-.15.18-.26s.03-.18,0-.26c-.03-.08-.06-.1-.35-.5s-1.09-1.31-1.09-1.31c-.16-.16-.33-.18-.5-.18s-.3.03-.44.03h-.01c-.15,0-.35.06-.53.3s-.72.7-.72,1.7c0,1,.75,1.96.87,2.11.12.15,1.4,2.2,3.48,3.06,2.08.86,2.49.96,2.89.96.4,0,1.03-.15,1.21-.33.18-.18.58-1.25.66-1.4.08-.15.08-.26.06-.33z" />
    </svg>
);

const TwitterIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 2.9,4.79C2.53,5.42 2.33,6.16 2.33,6.96C2.33,8.43 3.07,9.74 4.17,10.49C3.47,10.47 2.82,10.28 2.2,10.01C2.2,10.03 2.2,10.05 2.2,10.06C2.2,12.24 3.69,14.08 5.75,14.51C5.42,14.59 5.07,14.64 4.71,14.64C4.43,14.64 4.17,14.61 3.92,14.56C4.49,16.39 6.25,17.72 8.3,17.76C6.83,18.89 4.97,19.56 2.95,19.56C2.62,19.56 2.3,19.54 1.96,19.5C3.88,20.78 6.18,21.56 8.63,21.56C16,21.56 20.25,15.22 20.25,9.65C20.25,9.48 20.25,9.3 20.24,9.13C21.04,8.56 21.83,7.84 22.46,6Z" />
    </svg>
);

// --- Komponen Utama ---
export default function Welcome({ auth }) {
    // --- State dan Logic untuk Dark Mode ---
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-gradient-to-b from-white to-emerald-300 text-gray-800 transition-colors duration-300 dark:from-zinc-900 dark:to-zinc-800 dark:text-gray-200">
                {/* --- Header / Navbar --- */}
                <header className="fixed left-0 right-0 top-0 z-50 bg-white/80 backdrop-blur-sm dark:bg-zinc-900/80">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <Link href="/" className="text-xl font-bold text-emerald-500">
                                    CuanKu💲
                                </Link>
                            </div>
                            <div className="flex items-center gap-x-4">
                                {/* --- Navbar dari permintaan Anda --- */}
                                <nav className="-mx-3 flex flex-1 justify-end">
                                    {auth.user ? (
                                        <Link
                                            href={route('dashboard')}
                                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route('login')}
                                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:bg-emerald-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-white dark:hover:bg-emerald-500 dark:hover:text-white"
                                            >
                                                Log in
                                            </Link>
                                            <Link
                                                href={route('register')}
                                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:bg-emerald-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-white dark:hover:bg-emerald-500 dark:hover:text-white"
                                            >
                                                Register
                                            </Link>
                                        </>
                                    )}
                                </nav>
                                {/* --- Tombol Dark Mode --- */}
                                <button
                                    onClick={toggleDarkMode}
                                    className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-zinc-800"
                                    aria-label="Toggle dark mode"
                                >
                                    {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="pt-16">
                    {/* --- Hero Section --- */}
                    <section className="py-20 sm:py-32">
                        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
                            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
                                Kelola Keuangan, Wujudkan Impianmu
                            </h1>
                            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600 dark:text-gray-400">
                                CuanKu adalah platform all-in-one untuk melacak pengeluaran, membuat anggaran, dan
                                merencanakan tujuan keuangan pribadi Anda dengan cerdas dan terarah.
                            </p>
                            <div className="mt-10 flex justify-center gap-x-6">
                                <a
                                    href="#pricing"
                                    className="rounded-md bg-emerald-500 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                                >
                                    Lihat Paket <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* --- Pricing Section --- */}
                    <section id="pricing" className="bg-white py-20 dark:bg-zinc-900/50 sm:py-32">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl text-center">
                                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                                    Paket Langganan yang Tepat untuk Anda
                                </h2>
                                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                                    Pilih paket yang sesuai dengan kebutuhan Anda untuk memulai perjalanan finansial
                                    yang lebih baik.
                                </p>
                            </div>
                            <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
                                {/* Basic Plan */}
                                <div className="rounded-2xl border border-gray-200 p-8 dark:border-zinc-800">
                                    <h3 className="text-lg font-semibold leading-8 text-gray-900 dark:text-white">
                                        Basic
                                    </h3>
                                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                                        Semua fitur esensial untuk mengelola keuangan harian Anda.
                                    </p>
                                    <p className="mt-6 flex items-baseline gap-x-1">
                                        <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                                            Rp 50.000
                                        </span>
                                        <span className="text-xl font-semibold text-gray-600 dark:text-gray-400">
                                            /bulan
                                        </span>
                                    </p>
                                    <ul role="list" className="mt-8 space-y-3 text-sm text-gray-600 dark:text-gray-400">
                                        <li className="flex gap-x-3">
                                            <CheckIcon
                                                className="h-6 w-5 flex-none text-emerald-500"
                                                aria-hidden="true"
                                            />
                                            Akses semua fitur utama
                                        </li>
                                        <li className="flex gap-x-3">
                                            <CheckIcon
                                                className="h-6 w-5 flex-none text-emerald-500"
                                                aria-hidden="true"
                                            />
                                            Anggaran & Tujuan Tak Terbatas
                                        </li>
                                        <li className="flex gap-x-3">
                                            <CheckIcon
                                                className="h-6 w-5 flex-none text-emerald-500"
                                                aria-hidden="true"
                                            />
                                            Laporan Keuangan
                                        </li>
                                    </ul>
                                </div>

                                {/* Ultimate Plan */}
                                <div className="relative rounded-2xl border-2 border-emerald-500 p-8">
                                    <div className="absolute top-0 -translate-y-1/2 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                                        Paling Populer
                                    </div>
                                    <h3 className="text-lg font-semibold leading-8 text-gray-900 dark:text-white">
                                        Ultimate
                                    </h3>
                                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                                        Dapatkan analisis cerdas dan prediksi keuangan dengan kekuatan AI.
                                    </p>
                                    <p className="mt-6 flex items-baseline gap-x-1">
                                        <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                                            Rp 100.000
                                        </span>
                                        <span className="text-xl font-semibold text-gray-600 dark:text-gray-400">
                                            /bulan
                                        </span>
                                    </p>
                                    <ul role="list" className="mt-8 space-y-3 text-sm text-gray-600 dark:text-gray-400">
                                        <li className="flex gap-x-3">
                                            <CheckIcon
                                                className="h-6 w-5 flex-none text-emerald-500"
                                                aria-hidden="true"
                                            />
                                            Semua fitur di paket Basic
                                        </li>
                                        <li className="flex gap-x-3">
                                            <SparklesIcon
                                                className="h-6 w-5 flex-none text-emerald-500"
                                                aria-hidden="true"
                                            />
                                            <span>
                                                <span className="font-semibold text-gray-800 dark:text-white">
                                                    Agentic AI
                                                </span>{' '}
                                                untuk Analisis Cerdas
                                            </span>
                                        </li>
                                        <li className="flex gap-x-3">
                                            <SparklesIcon
                                                className="h-6 w-5 flex-none text-emerald-500"
                                                aria-hidden="true"
                                            />
                                            <span>
                                                <span className="font-semibold text-gray-800 dark:text-white">
                                                    Chatbot AI
                                                </span>{' '}
                                                untuk dukungan dan pertanyaan keuangan 24/7
                                            </span>
                                        </li>
                                        <li className="flex gap-x-3">
                                            <SparklesIcon
                                                className="h-6 w-5 flex-none text-emerald-500"
                                                aria-hidden="true"
                                            />
                                            Prediksi & Rekomendasi Keuangan
                                        </li>
                                        <li className="flex gap-x-3">
                                            <SparklesIcon
                                                className="h-6 w-5 flex-none text-emerald-500"
                                                aria-hidden="true"
                                            />
                                            Dukungan Prioritas
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* --- Footer --- */}
                    <footer className="border-t border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50">
                        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                            <div className="flex flex-col items-center gap-y-6">
                                {/* Tautan Kontak CS */}
                                <a
                                    href="https://wa.me/6281234567890?text=Halo%20Admin%20CuanKu%2C%20saya%20tertarik%20untuk%20berlangganan."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-x-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600"
                                >
                                    <WhatsappIcon className="h-5 w-5" />
                                    Hubungi Kami untuk Berlangganan
                                </a>

                                {/* Ikon Media Sosial */}
                                <div className="flex justify-center space-x-6">
                                    <a
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 transition hover:text-emerald-500"
                                    >
                                        <span className="sr-only">Instagram</span>
                                        <InstagramIcon className="h-6 w-6" />
                                    </a>
                                    <a
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 transition hover:text-emerald-500"
                                    >
                                        <span className="sr-only">TikTok</span>
                                        <TiktokIcon className="h-6 w-6" />
                                    </a>
                                    <a
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 transition hover:text-emerald-500"
                                    >
                                        <span className="sr-only">Twitter</span>
                                        <TwitterIcon className="h-6 w-6" />
                                    </a>
                                </div>
                            </div>
                            <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                                CuanKu💲 &copy; {new Date().getFullYear()}. All rights reserved.
                            </p>
                        </div>
                    </footer>
                </main>
            </div>
        </>
    );
}
