import { Head, Link } from '@inertiajs/react';

// --- Komponen Ikon (dibuat inline agar mandiri) ---
const ArrowLeftIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
    </svg>
);

const FileTextIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
        <path d="M10 9H8" />
    </svg>
);


// --- Komponen Utama Halaman Syarat & Ketentuan ---
export default function TermsAndConditions() {
    return (
        <>
            <Head title="Syarat dan Ketentuan" />
            <div className="bg-gray-50 dark:bg-zinc-900 min-h-screen">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-8 sm:p-12">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                                    Syarat dan Ketentuan CuanKu💲
                                </h1>
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    Efektif berlaku mulai: 3 Juli 2025
                                </p>
                            </div>
                            <Link 
                                href="/"
                                className="inline-flex items-center gap-x-2 rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 whitespace-nowrap"
                            >
                                <ArrowLeftIcon className="h-4 w-4" />
                                Kembali
                            </Link>
                        </div>
                        
                        <div className="prose prose-emerald dark:prose-invert max-w-none space-y-8">
                            <p className="lead">
                                Harap baca Syarat dan Ketentuan ("Ketentuan") ini dengan saksama sebelum menggunakan aplikasi CuanKu ("Layanan") yang dioperasikan oleh kami. Akses dan penggunaan Anda atas Layanan ini mengkondisikan penerimaan dan kepatuhan Anda terhadap Ketentuan ini.
                            </p>

                            <hr className="dark:border-zinc-700"/>

                            <div>
                                <h2 id="penerimaan">1. Penerimaan Syarat</h2>
                                <p>
                                    Dengan mengakses atau menggunakan Layanan kami, Anda setuju untuk terikat oleh Ketentuan ini. Jika Anda tidak setuju dengan bagian mana pun dari ketentuan ini, maka Anda tidak diizinkan untuk mengakses Layanan.
                                </p>
                            </div>

                            <div>
                                <h2 id="layanan">2. Deskripsi Layanan</h2>
                                <p>
                                    CuanKu adalah aplikasi manajemen keuangan pribadi yang dirancang untuk membantu pengguna melacak pendapatan, pengeluaran, membuat anggaran, menetapkan tujuan keuangan, dan menganalisis pola keuangan mereka. Layanan ini disediakan "sebagaimana adanya" dan hanya untuk tujuan informasi dan pengelolaan pribadi, bukan sebagai nasihat keuangan profesional.
                                </p>
                            </div>

                            <div>
                                <h2 id="kewajiban">3. Kewajiban Pengguna</h2>
                                <p>Sebagai pengguna Layanan CuanKu, Anda setuju untuk:</p>
                                <ul className="mt-4 space-y-2">
                                    <li>Memberikan informasi pendaftaran yang akurat, terkini, dan lengkap.</li>
                                    <li>Menjaga kerahasiaan kata sandi dan semua informasi akun Anda.</li>
                                    <li>Bertanggung jawab penuh atas semua aktivitas yang terjadi di bawah akun Anda.</li>
                                    <li>Tidak menggunakan Layanan untuk tujuan ilegal, melanggar hukum, atau aktivitas yang merugikan pihak lain.</li>
                                </ul>
                            </div>

                            <div>
                                <h2 id="pembatasan">4. Pembatasan dan Penafian Tanggung Jawab</h2>
                                <p>
                                    Meskipun kami berusaha memberikan layanan terbaik, ada beberapa batasan:
                                </p>
                                <ul className="mt-4 space-y-2">
                                    <li>Kami berhak menangguhkan atau menghentikan akun Anda tanpa pemberitahuan sebelumnya jika terjadi pelanggaran terhadap Ketentuan ini.</li>
                                    <li>Layanan mungkin tidak tersedia secara terus-menerus (24/7) karena pemeliharaan sistem, peningkatan, atau masalah teknis di luar kendali kami.</li>
                                    <li>CuanKu tidak bertanggung jawab atas kerugian finansial, keputusan investasi, atau konsekuensi apa pun yang timbul dari penggunaan informasi yang disajikan dalam aplikasi. Anda bertanggung jawab penuh atas keputusan keuangan Anda.</li>
                                </ul>
                            </div>
                            
                            <div>
                                <h2 id="kekayaan-intelektual">5. Kekayaan Intelektual</h2>
                                <p>
                                    Semua konten, fitur, merek dagang, logo, dan teknologi di dalam Layanan CuanKu adalah milik eksklusif CuanKu dan para pemberi lisensinya. Materi ini dilindungi oleh hak cipta dan undang-undang kekayaan intelektual lainnya. Anda tidak diizinkan untuk menyalin, memodifikasi, atau mendistribusikan ulang konten kami tanpa izin tertulis.
                                </p>
                            </div>

                            <div>
                                <h2 id="penghentian">6. Penghentian Layanan</h2>
                                <p>
                                    Anda dapat berhenti menggunakan Layanan kami dan menghapus akun Anda kapan saja. Kami juga berhak, atas kebijakan kami sendiri, untuk menangguhkan atau menghentikan akses Anda ke Layanan, dengan atau tanpa pemberitahuan, untuk alasan apa pun, termasuk pelanggaran Ketentuan ini.
                                </p>
                            </div>
                            
                            <div>
                                <h2 id="perubahan">7. Perubahan Syarat dan Ketentuan</h2>
                                <p>
                                    Kami berhak untuk memodifikasi atau mengganti Ketentuan ini kapan saja. Jika revisi bersifat material, kami akan berusaha memberikan pemberitahuan setidaknya 30 hari sebelum ketentuan baru berlaku, baik melalui aplikasi maupun email. Dengan terus menggunakan Layanan setelah revisi tersebut berlaku, Anda setuju untuk terikat oleh ketentuan yang direvisi.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
