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

const FileTextIcon = (props) => (
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
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
        <path d="M10 9H8" />
    </svg>
);

// --- Komponen Utama Halaman Kebijakan Privasi ---
export default function PrivacyPolicy(props) {
    return (
        <>
            <Head title="Kebijakan Privasi" />
            <div className="bg-gradient-to-b from-white to-emerald-50 dark:from-zinc-900 dark:to-zinc-800 min-h-screen">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl overflow-hidden">
                        <div className="bg-emerald-500 dark:bg-emerald-600 py-6 px-8">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                                        {props.page_settings?.title || 'Kebijakan Privasi'}
                                    </h1>
                                    <p className="mt-2 text-lg text-emerald-50">
                                        {props.page_settings?.subtitle || 'Perlindungan Data dan Privasi Pengguna CuanKu'}
                                    </p>
                                </div>
                                <Link
                                    href="/"
                                    className="inline-flex items-center gap-x-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-emerald-600 shadow-sm transition hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white whitespace-nowrap"
                                >
                                    <ArrowLeftIcon className="h-4 w-4" />
                                    Kembali
                                </Link>
                            </div>
                        </div>

                        <div className="p-8 sm:p-10">
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6 pb-6 border-b border-gray-100 dark:border-zinc-700">
                                <FileTextIcon className="h-4 w-4 text-emerald-500" />
                                <span>Terakhir diperbarui: 3 Juli 2025</span>
                            </div>

                            <div className="prose prose-emerald dark:prose-invert max-w-none space-y-10">
                                <p className="text-lg text-gray-700 dark:text-gray-200 bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border-l-4 border-emerald-500">
                                    Selamat datang di CuanKu💲. Kami berkomitmen untuk melindungi privasi dan keamanan data
                                    Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan
                                    melindungi informasi pribadi Anda saat Anda menggunakan layanan kami.
                                </p>

                                <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-700">
                                    <details className="group">
                                        <summary className="flex justify-between items-center p-5 bg-emerald-50 dark:bg-emerald-900/20 cursor-pointer">
                                            <h2 className="text-lg font-semibold m-0 text-gray-900 dark:text-white">
                                                1. Informasi yang Kami Kumpulkan
                                            </h2>
                                            <span className="text-emerald-500 group-open:rotate-180 transition-transform">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="m6 9 6 6 6-6" />
                                                </svg>
                                            </span>
                                        </summary>
                                        <div className="p-5 bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700">
                                            <p>Untuk memberikan layanan terbaik, kami mengumpulkan beberapa jenis informasi:</p>
                                            <ul className="mt-4 space-y-3">
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
                                    </details>

                                    <details className="group border-t border-gray-200 dark:border-zinc-700">
                                        <summary className="flex justify-between items-center p-5 bg-emerald-50 dark:bg-emerald-900/20 cursor-pointer">
                                            <h2 className="text-lg font-semibold m-0 text-gray-900 dark:text-white">
                                                2. Bagaimana Kami Menggunakan Data Anda
                                            </h2>
                                            <span className="text-emerald-500 group-open:rotate-180 transition-transform">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="m6 9 6 6 6-6" />
                                                </svg>
                                            </span>
                                        </summary>
                                        <div className="p-5 bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700">
                                            <p>Data Anda digunakan untuk tujuan berikut:</p>
                                            <ul className="mt-4 space-y-3">
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
                                    </details>

                                    <details className="group border-t border-gray-200 dark:border-zinc-700">
                                        <summary className="flex justify-between items-center p-5 bg-emerald-50 dark:bg-emerald-900/20 cursor-pointer">
                                            <h2 className="text-lg font-semibold m-0 text-gray-900 dark:text-white">
                                                3. Keamanan Data
                                            </h2>
                                            <span className="text-emerald-500 group-open:rotate-180 transition-transform">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="m6 9 6 6 6-6" />
                                                </svg>
                                            </span>
                                        </summary>
                                        <div className="p-5 bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700">
                                            <p>
                                                Keamanan data Anda adalah prioritas utama kami. Kami menerapkan langkah-langkah
                                                keamanan standar industri untuk melindungi informasi Anda dari akses, pengubahan,
                                                atau penghancuran yang tidak sah.
                                            </p>
                                            <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 rounded-r-lg flex items-start gap-x-3">
                                                <ShieldCheckIcon className="h-6 w-6 flex-shrink-0 text-emerald-500" />
                                                <span>
                                                    Kami menggunakan enkripsi (hashing) untuk password Anda dan menerapkan
                                                    praktik keamanan lainnya untuk melindungi integritas data Anda.
                                                </span>
                                            </div>
                                            <p className="mt-4">
                                                Tindakan keamanan yang kami terapkan meliputi:
                                            </p>
                                            <ul className="mt-3 space-y-2">
                                                <li>Enkripsi data sensitif dengan standar industri</li>
                                                <li>Pengamanan server dengan firewall dan sistem deteksi intrusi</li>
                                                <li>Pemantauan keamanan 24/7 untuk aktivitas mencurigakan</li>
                                                <li>Pembaruan keamanan secara berkala untuk melindungi dari kerentanan baru</li>
                                                <li>Akses terbatas ke data Anda hanya untuk karyawan yang membutuhkannya</li>
                                            </ul>
                                        </div>
                                    </details>

                                    <details className="group border-t border-gray-200 dark:border-zinc-700">
                                        <summary className="flex justify-between items-center p-5 bg-emerald-50 dark:bg-emerald-900/20 cursor-pointer">
                                            <h2 className="text-lg font-semibold m-0 text-gray-900 dark:text-white">
                                                4. Hak Anda sebagai Pengguna
                                            </h2>
                                            <span className="text-emerald-500 group-open:rotate-180 transition-transform">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="m6 9 6 6 6-6" />
                                                </svg>
                                            </span>
                                        </summary>
                                        <div className="p-5 bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700">
                                            <p>Anda memiliki kontrol penuh atas data Anda di CuanKu:</p>
                                            <ul className="mt-4 space-y-3">
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
                                                <li>
                                                    <strong>Permintaan Data:</strong> Anda dapat meminta salinan data pribadi Anda yang kami simpan dengan menghubungi tim dukungan kami.
                                                </li>
                                                <li>
                                                    <strong>Pembatasan Pemrosesan:</strong> Dalam kondisi tertentu, Anda dapat meminta kami membatasi pemrosesan data Anda.
                                                </li>
                                            </ul>
                                        </div>
                                    </details>

                                    <details className="group border-t border-gray-200 dark:border-zinc-700">
                                        <summary className="flex justify-between items-center p-5 bg-emerald-50 dark:bg-emerald-900/20 cursor-pointer">
                                            <h2 className="text-lg font-semibold m-0 text-gray-900 dark:text-white">
                                                5. Cookie dan Teknologi Pelacakan
                                            </h2>
                                            <span className="text-emerald-500 group-open:rotate-180 transition-transform">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="m6 9 6 6 6-6" />
                                                </svg>
                                            </span>
                                        </summary>
                                        <div className="p-5 bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700">
                                            <p>
                                                Kami menggunakan cookie dan teknologi serupa untuk meningkatkan pengalaman Anda dengan layanan kami:
                                            </p>
                                            <ul className="mt-4 space-y-3">
                                                <li>
                                                    <strong>Cookie Esensial:</strong> Diperlukan untuk fungsi dasar situs, seperti mempertahankan status login Anda.
                                                </li>
                                                <li>
                                                    <strong>Cookie Preferensi:</strong> Memungkinkan kami mengingat pilihan Anda, seperti bahasa atau tema gelap/terang.
                                                </li>
                                                <li>
                                                    <strong>Cookie Analitik:</strong> Membantu kami memahami bagaimana Anda menggunakan situs kami, memungkinkan kami meningkatkan pengalaman pengguna.
                                                </li>
                                            </ul>
                                            <p className="mt-4">
                                                Anda dapat mengontrol penggunaan cookie melalui pengaturan browser Anda. Perlu diketahui bahwa menonaktifkan cookie tertentu mungkin memengaruhi fungsionalitas situs.
                                            </p>
                                        </div>
                                    </details>

                                    <details className="group border-t border-gray-200 dark:border-zinc-700">
                                        <summary className="flex justify-between items-center p-5 bg-emerald-50 dark:bg-emerald-900/20 cursor-pointer">
                                            <h2 className="text-lg font-semibold m-0 text-gray-900 dark:text-white">
                                                6. Pembagian Data dengan Pihak Ketiga
                                            </h2>
                                            <span className="text-emerald-500 group-open:rotate-180 transition-transform">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="m6 9 6 6 6-6" />
                                                </svg>
                                            </span>
                                        </summary>
                                        <div className="p-5 bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700">
                                            <p>
                                                Kami sangat selektif dalam berbagi data Anda:
                                            </p>
                                            <ul className="mt-4 space-y-3">
                                                <li>
                                                    <strong>Penyedia Layanan:</strong> Kami dapat berbagi informasi dengan pihak ketiga terpercaya yang membantu kami menjalankan layanan, seperti penyedia hosting cloud atau layanan analitik.
                                                </li>
                                                <li>
                                                    <strong>Kepatuhan Hukum:</strong> Kami dapat mengungkapkan informasi jika diwajibkan oleh hukum atau dalam menanggapi proses hukum yang sah.
                                                </li>
                                                <li>
                                                    <strong>Dengan Izin Anda:</strong> Kami hanya akan membagikan data pribadi Anda dengan pihak ketiga lainnya dengan persetujuan eksplisit dari Anda.
                                                </li>
                                            </ul>
                                            <p className="mt-4 text-amber-600 dark:text-amber-400">
                                                Kami TIDAK menjual data pribadi atau keuangan Anda kepada pengiklan atau pihak ketiga untuk tujuan pemasaran.
                                            </p>
                                        </div>
                                    </details>

                                    <details className="group border-t border-gray-200 dark:border-zinc-700">
                                        <summary className="flex justify-between items-center p-5 bg-emerald-50 dark:bg-emerald-900/20 cursor-pointer">
                                            <h2 className="text-lg font-semibold m-0 text-gray-900 dark:text-white">
                                                7. Retensi Data
                                            </h2>
                                            <span className="text-emerald-500 group-open:rotate-180 transition-transform">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="m6 9 6 6 6-6" />
                                                </svg>
                                            </span>
                                        </summary>
                                        <div className="p-5 bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700">
                                            <p>
                                                Kebijakan retensi data kami dirancang untuk menyimpan informasi hanya selama diperlukan:
                                            </p>
                                            <ul className="mt-4 space-y-3">
                                                <li>
                                                    Kami menyimpan data akun Anda selama Anda memiliki akun aktif dengan kami.
                                                </li>
                                                <li>
                                                    Setelah penutupan akun, kami akan menyimpan data Anda selama 30 hari, setelah itu data akan dihapus secara permanen dari sistem kami.
                                                </li>
                                                <li>
                                                    Kami mungkin menyimpan beberapa informasi untuk periode yang lebih lama jika diperlukan untuk kepatuhan hukum, penyelesaian sengketa, atau kepentingan bisnis yang sah.
                                                </li>
                                            </ul>
                                        </div>
                                    </details>

                                    <details className="group border-t border-gray-200 dark:border-zinc-700">
                                        <summary className="flex justify-between items-center p-5 bg-emerald-50 dark:bg-emerald-900/20 cursor-pointer">
                                            <h2 className="text-lg font-semibold m-0 text-gray-900 dark:text-white">
                                                8. Perubahan pada Kebijakan Privasi
                                            </h2>
                                            <span className="text-emerald-500 group-open:rotate-180 transition-transform">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="m6 9 6 6 6-6" />
                                                </svg>
                                            </span>
                                        </summary>
                                        <div className="p-5 bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700">
                                            <p>
                                                Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu:
                                            </p>
                                            <ul className="mt-4 space-y-3">
                                                <li>
                                                    Perubahan signifikan akan diberitahukan kepada Anda melalui email atau pemberitahuan dalam aplikasi.
                                                </li>
                                                <li>
                                                    Kami akan memperbarui tanggal "Terakhir diperbarui" di bagian atas Kebijakan Privasi ini.
                                                </li>
                                                <li>
                                                    Dengan terus menggunakan layanan kami setelah perubahan tersebut, Anda menyetujui Kebijakan Privasi yang direvisi.
                                                </li>
                                            </ul>
                                        </div>
                                    </details>
                                </div>

                                <div className="mt-12 p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Hubungi Kami</h2>
                                    <p>Jika Anda memiliki pertanyaan atau kekhawatiran mengenai Kebijakan Privasi ini, jangan ragu untuk menghubungi kami:</p>
                                    <ul className="mt-4 space-y-2">
                                        <li className="flex items-center gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-emerald-500"
                                            >
                                                <rect width="20" height="16" x="2" y="4" rx="2" />
                                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                            </svg>
                                            <a
                                                href="mailto:support@cuanku.id"
                                                className="text-emerald-600 dark:text-emerald-400 hover:underline"
                                            >
                                                support@cuanku.id
                                            </a>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-emerald-500"
                                            >
                                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                            </svg>
                                            <span>+62 21 5678 9012</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-emerald-500"
                                            >
                                                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                                <circle cx="12" cy="10" r="3" />
                                            </svg>
                                            <span>Gedung CuanKu, Jl. Sudirman No.123, Jakarta Selatan, Indonesia</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
