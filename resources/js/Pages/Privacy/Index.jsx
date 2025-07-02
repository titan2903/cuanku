import { Head, Link } from '@inertiajs/react';

// --- Komponen Ikon (dibuat inline agar mandiri) ---
const ArrowLeftIcon = (props) => (
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
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
    </svg>
);

const ShieldCheckIcon = (props) => (
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
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="m9 12 2 2 4-4" />
    </svg>
);

// --- Komponen Utama Halaman Kebijakan Privasi ---
export default function PrivacyPolicy(props) {
    return (
        <>
            <Head title="Kebijakan Privasi" />
            <div className="min-h-screen bg-gray-50 dark:bg-zinc-900">
                <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                    <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-zinc-800 sm:p-12">
                        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row">
                            <div>
                                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                                    {props.page_settings.title}
                                </h1>
                                <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                                    {props.page_settings.subtitle}
                                </p>
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    Terakhir diperbarui: 30 Juni 2025
                                </p>
                            </div>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-x-2 whitespace-nowrap rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                            >
                                <ArrowLeftIcon className="h-4 w-4" />
                                Kembali
                            </Link>
                        </div>

                        {/* --- PERBAIKAN: Menggunakan 'space-y-6' untuk jarak antar elemen --- */}
                        <div className="prose prose-emerald dark:prose-invert max-w-none space-y-6">
                            <p className="lead">
                                Selamat datang di CuanKu💲. Kami berkomitmen untuk melindungi privasi dan keamanan data
                                Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan
                                melindungi informasi pribadi Anda saat Anda menggunakan layanan kami.
                            </p>

                            <hr className="dark:border-zinc-700" />

                            <div>
                                <h2 id="informasi">1. Informasi yang Kami Kumpulkan</h2>
                                <p className="mt-4">
                                    Untuk memberikan layanan terbaik, kami mengumpulkan beberapa jenis informasi:
                                </p>
                                <ul className="mt-4 space-y-2">
                                    <li>
                                        <strong>Data Pribadi:</strong> Saat Anda mendaftar, kami mengumpulkan informasi
                                        identifikasi pribadi seperti nama, alamat email, dan password yang terenkripsi.
                                    </li>
                                    <li>
                                        <strong>Data Keuangan:</strong> Kami menyimpan data keuangan yang Anda masukkan
                                        secara sukarela, termasuk (namun tidak terbatas pada) data pemasukan,
                                        pengeluaran, anggaran, tujuan keuangan, aset, dan kewajiban.
                                    </li>
                                    <li>
                                        <strong>Data Penggunaan Teknis:</strong> Kami secara otomatis mengumpulkan
                                        informasi tentang bagaimana Anda berinteraksi dengan layanan kami, seperti
                                        alamat IP, jenis browser, dan halaman yang Anda kunjungi, untuk tujuan analisis
                                        dan peningkatan layanan.
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h2 id="penggunaan">2. Bagaimana Kami Menggunakan Data Anda</h2>
                                <p className="mt-4">Data Anda digunakan untuk tujuan berikut:</p>
                                <ul className="mt-4 space-y-2">
                                    <li>
                                        <strong>Menyediakan dan Mempersonalisasi Layanan:</strong> Data keuangan Anda
                                        digunakan untuk menampilkan laporan, menganalisis arus kas, dan membantu Anda
                                        mencapai tujuan keuangan yang telah Anda tetapkan.
                                    </li>
                                    <li>
                                        <strong>Komunikasi:</strong> Kami mungkin menggunakan email Anda untuk mengirim
                                        pembaruan penting terkait layanan, notifikasi keamanan, atau informasi tentang
                                        fitur baru.
                                    </li>
                                    <li>
                                        <strong>Analisis dan Peningkatan:</strong> Kami tidak akan pernah menjual atau
                                        membagikan data pribadi atau keuangan Anda kepada pihak ketiga untuk tujuan
                                        pemasaran tanpa izin eksplisit dari Anda. Data agregat dan anonim dapat kami
                                        gunakan untuk analisis statistik guna meningkatkan platform kami.
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h2 id="keamanan">3. Keamanan Data</h2>
                                <p className="mt-4">
                                    Keamanan data Anda adalah prioritas utama kami. Kami menerapkan langkah-langkah
                                    keamanan standar industri untuk melindungi informasi Anda dari akses, pengubahan,
                                    atau penghancuran yang tidak sah.
                                </p>
                                <blockquote className="mt-4">
                                    <div className="flex items-start gap-x-3">
                                        <ShieldCheckIcon className="mt-1 h-6 w-6 flex-shrink-0 text-emerald-500" />
                                        <span>
                                            Kami menggunakan enkripsi (hashing) untuk password Anda dan menerapkan
                                            praktik keamanan lainnya untuk melindungi integritas data Anda.
                                        </span>
                                    </div>
                                </blockquote>
                            </div>

                            <div>
                                <h2 id="hak-pengguna">4. Hak Anda sebagai Pengguna</h2>
                                <p className="mt-4">Anda memiliki kontrol penuh atas data Anda di CuanKu:</p>
                                <ul className="mt-4 space-y-2">
                                    <li>
                                        <strong>Akses dan Pembaruan:</strong> Anda dapat mengakses dan memperbarui data
                                        pribadi dan keuangan Anda kapan saja melalui dashboard akun Anda.
                                    </li>
                                    <li>
                                        <strong>Penghapusan Data:</strong> Anda dapat menghapus data transaksi atau
                                        tujuan keuangan Anda kapan saja.
                                    </li>
                                    <li>
                                        <strong>Penutupan Akun:</strong> Jika Anda tidak ingin lagi menggunakan layanan
                                        kami, Anda memiliki hak untuk menghapus akun Anda. Menghapus akun akan menghapus
                                        semua data pribadi dan keuangan Anda dari sistem kami secara permanen sesuai
                                        dengan kebijakan retensi data kami.
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h2 id="cookie">5. Cookie dan Teknologi Pelacakan</h2>
                                <p className="mt-4">
                                    Kami dapat menggunakan cookie dan teknologi serupa untuk menyimpan preferensi Anda,
                                    mengamankan sesi login Anda, dan meningkatkan pengalaman pengguna secara
                                    keseluruhan. Anda dapat mengontrol penggunaan cookie melalui pengaturan browser
                                    Anda.
                                </p>
                            </div>

                            <div>
                                <h2 id="kontak">6. Hubungi Kami</h2>
                                <p className="mt-4">
                                    Jika Anda memiliki pertanyaan atau kekhawatiran mengenai Kebijakan Privasi ini,
                                    jangan ragu untuk menghubungi kami melalui email di{' '}
                                    <a href="mailto:support@cuanku.com" className="text-emerald-500 hover:underline">
                                        support@cuanku.com
                                    </a>
                                    .
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
