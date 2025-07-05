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

// Favicon icon component untuk social media
const FaviconIcon = ({ domain, alt, className = "h-6 w-6" }) => (
    <img
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
        alt={alt}
        className={className}
        loading="lazy"
    />
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
                                    className="inline-flex items-center gap-x-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
                                >
                                    <FaviconIcon domain="whatsapp.com" alt="WhatsApp" className="h-5 w-5" />
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
                                        <FaviconIcon domain="instagram.com" alt="Instagram" className="h-6 w-6 filter grayscale hover:grayscale-0 transition-all" />
                                    </a>
                                    <a
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 transition hover:text-emerald-500"
                                    >
                                        <span className="sr-only">TikTok</span>
                                        <FaviconIcon domain="tiktok.com" alt="TikTok" className="h-6 w-6 filter grayscale hover:grayscale-0 transition-all" />
                                    </a>
                                    <a
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 transition hover:text-emerald-500"
                                    >
                                        <span className="sr-only">Twitter</span>
                                        <FaviconIcon domain="twitter.com" alt="Twitter" className="h-6 w-6 filter grayscale hover:grayscale-0 transition-all" />
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
