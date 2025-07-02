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
export default function TermsAndConditions(props) {
    return (
        <>
            <Head title="Syarat dan Ketentuan" />
            <div className="bg-gradient-to-b from-white to-emerald-50 dark:from-zinc-900 dark:to-zinc-800 min-h-screen">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl overflow-hidden">
                        <div className="bg-emerald-500 dark:bg-emerald-600 py-6 px-8">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                                        {props.page_settings?.title || "Syarat dan Ketentuan"}
                                    </h1>
                                    <p className="mt-2 text-lg text-emerald-50">
                                        {props.page_settings?.subtitle || "Ketentuan Penggunaan Aplikasi CuanKu"}
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
                                    Dokumen ini merupakan perjanjian hukum antara Anda ("Pengguna") dan CuanKu ("Kami", "Perusahaan"). Dengan mengakses atau menggunakan aplikasi CuanKu, Anda menyatakan bahwa Anda telah membaca, memahami, dan menyetujui untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak menyetujui sebagian atau seluruh isi dokumen ini, Anda tidak diperkenankan menggunakan Layanan kami.
                                </p>

                                <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-700">
                                    <details className="group">
                                        <summary className="flex justify-between items-center p-5 bg-emerald-50 dark:bg-emerald-900/20 cursor-pointer">
                                            <h2 className="text-lg font-semibold m-0 text-gray-900 dark:text-white">1. Definisi</h2>
                                            <span className="text-emerald-500 group-open:rotate-180 transition-transform">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="m6 9 6 6 6-6"/>
                                                </svg>
                                            </span>
                                        </summary>
                                        <div className="p-5 bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700">
                                            <p>Dalam Syarat dan Ketentuan ini:</p>
                                            <ul className="mt-4 space-y-3">
                                                <li><strong>"Layanan"</strong> merujuk pada aplikasi CuanKu, termasuk semua fitur, konten, dan fungsinya.</li>
                                                <li><strong>"Pengguna"</strong> merujuk pada individu yang mengakses atau menggunakan Layanan.</li>
                                                <li><strong>"Konten Pengguna"</strong> merujuk pada data, informasi, atau materi yang Anda unggah, simpan, atau kelola melalui Layanan.</li>
                                                <li><strong>"Data Pribadi"</strong> merujuk pada informasi yang dapat diidentifikasi dengan Anda sebagai individu.</li>
                                            </ul>
                                        </div>
                                    </details>
                                    
                                    <details className="group border-t border-gray-200 dark:border-zinc-700">
                                        <summary className="flex justify-between items-center p-5 bg-emerald-50 dark:bg-emerald-900/20 cursor-pointer">
                                            <h2 className="text-lg font-semibold m-0 text-gray-900 dark:text-white">2. Deskripsi Layanan</h2>
                                            <span className="text-emerald-500 group-open:rotate-180 transition-transform">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="m6 9 6 6 6-6"/>
                                                </svg>
                                            </span>
                                        </summary>
                                        <div className="p-5 bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700">
                                            <p>CuanKu adalah aplikasi manajemen keuangan pribadi yang dirancang untuk membantu pengguna:</p>
                                            <ul className="mt-4 space-y-3">
                                                <li>Melacak pendapatan dan pengeluaran secara real-time</li>
                                                <li>Membuat dan mengelola anggaran keuangan</li>
                                                <li>Menetapkan dan memantau tujuan keuangan</li>
                                                <li>Menganalisis pola pengeluaran dan tabungan</li>
                                                <li>Mengelola aset dan kewajiban untuk perhitungan kekayaan bersih</li>
                                                <li>Mendapatkan wawasan tentang kebiasaan keuangan melalui visualisasi data</li>
                                            </ul>
                                            <p className="mt-4">Layanan ini disediakan "sebagaimana adanya" dan dimaksudkan untuk tujuan informasi serta pengelolaan pribadi, bukan sebagai pengganti nasihat keuangan profesional.</p>
                                        </div>
                                    </details>
                                    
                                    <details className="group border-t border-gray-200 dark:border-zinc-700">
                                        <summary className="flex justify-between items-center p-5 bg-emerald-50 dark:bg-emerald-900/20 cursor-pointer">
                                            <h2 className="text-lg font-semibold m-0 text-gray-900 dark:text-white">3. Akun Pengguna</h2>
                                            <span className="text-emerald-500 group-open:rotate-180 transition-transform">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="m6 9 6 6 6-6"/>
                                                </svg>
                                            </span>
                                        </summary>
                                        <div className="p-5 bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700">
                                            <p>Untuk menggunakan Layanan CuanKu, Anda harus:</p>
                                            <ul className="mt-4 space-y-3">
                                                <li>Membuat akun dengan memberikan informasi yang akurat, lengkap, dan terkini</li>
                                                <li>Menjaga kerahasiaan kredensial akun Anda (nama pengguna dan kata sandi)</li>
                                                <li>Segera memberitahu kami jika mengetahui adanya pelanggaran keamanan atau penggunaan tidak sah atas akun Anda</li>
                                                <li>Bertanggung jawab atas semua aktivitas yang terjadi di bawah akun Anda</li>
                                            </ul>
                                            <p className="mt-4">Kami berhak menangguhkan atau menghentikan akun Anda jika terdapat aktivitas mencurigakan atau pelanggaran terhadap Syarat dan Ketentuan ini.</p>
                                        </div>
                                    </details>
                                    
                                    <details className="group border-t border-gray-200 dark:border-zinc-700">
                                        <summary className="flex justify-between items-center p-5 bg-emerald-50 dark:bg-emerald-900/20 cursor-pointer">
                                            <h2 className="text-lg font-semibold m-0 text-gray-900 dark:text-white">4. Privasi dan Keamanan Data</h2>
                                            <span className="text-emerald-500 group-open:rotate-180 transition-transform">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="m6 9 6 6 6-6"/>
                                                </svg>
                                            </span>
                                        </summary>
                                        <div className="p-5 bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700">
                                            <p>Perlindungan privasi Anda sangat penting bagi kami:</p>
                                            <ul className="mt-4 space-y-3">
                                                <li>Kami mengumpulkan dan memproses data pribadi Anda sesuai dengan Kebijakan Privasi kami</li>
                                                <li>Data keuangan Anda dienkripsi menggunakan standar industri untuk memastikan keamanan maksimal</li>
                                                <li>Kami tidak menjual data pribadi Anda kepada pihak ketiga tanpa persetujuan eksplisit dari Anda</li>
                                                <li>Kami dapat menggunakan data anonim dan teragregasi untuk analisis, pengembangan produk, dan peningkatan layanan</li>
                                            </ul>
                                            <p className="mt-4">Dengan menggunakan Layanan, Anda menyetujui pengumpulan dan pemrosesan data sesuai dengan Kebijakan Privasi kami.</p>
                                        </div>
                                    </details>
                                    
                                    <details className="group border-t border-gray-200 dark:border-zinc-700">
                                        <summary className="flex justify-between items-center p-5 bg-emerald-50 dark:bg-emerald-900/20 cursor-pointer">
                                            <h2 className="text-lg font-semibold m-0 text-gray-900 dark:text-white">5. Kewajiban Pengguna</h2>
                                            <span className="text-emerald-500 group-open:rotate-180 transition-transform">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="m6 9 6 6 6-6"/>
                                                </svg>
                                            </span>
                                        </summary>
                                        <div className="p-5 bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700">
                                            <p>Dalam menggunakan Layanan CuanKu, Anda setuju untuk tidak:</p>
                                            <ul className="mt-4 space-y-3">
                                                <li>Menggunakan Layanan untuk tujuan ilegal atau melanggar hukum yang berlaku</li>
                                                <li>Mencoba mengakses akun pengguna lain atau sistem backend kami tanpa otorisasi</li>
                                                <li>Menggunakan metode otomatis (bot, crawler, scraper) untuk mengakses Layanan</li>
                                                <li>Menyebarkan malware, virus, atau kode berbahaya lainnya melalui Layanan</li>
                                                <li>Melakukan tindakan yang dapat membahayakan infrastruktur atau ketersediaan Layanan</li>
                                                <li>Menyalahgunakan Layanan untuk penipuan, pencucian uang, atau aktivitas keuangan ilegal lainnya</li>
                                            </ul>
                                        </div>
                                    </details>
                                    
                                    <details className="group border-t border-gray-200 dark:border-zinc-700">
                                        <summary className="flex justify-between items-center p-5 bg-emerald-50 dark:bg-emerald-900/20 cursor-pointer">
                                            <h2 className="text-lg font-semibold m-0 text-gray-900 dark:text-white">6. Pembatasan Tanggung Jawab</h2>
                                            <span className="text-emerald-500 group-open:rotate-180 transition-transform">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="m6 9 6 6 6-6"/>
                                                </svg>
                                            </span>
                                        </summary>
                                        <div className="p-5 bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700">
                                            <p>Meskipun kami berusaha memberikan layanan terbaik:</p>
                                            <ul className="mt-4 space-y-3">
                                                <li>CuanKu tidak bertanggung jawab atas kerugian finansial, keputusan investasi, atau konsekuensi yang timbul dari penggunaan informasi dalam aplikasi</li>
                                                <li>Kami tidak menjamin keakuratan, kelengkapan, atau keandalan data keuangan atau informasi yang disajikan</li>
                                                <li>Layanan dapat mengalami gangguan, penundaan, atau ketidaktersediaan karena pemeliharaan sistem atau masalah teknis</li>
                                                <li>Dalam keadaan apa pun, tanggung jawab kami tidak akan melebihi jumlah yang telah Anda bayarkan kepada kami selama 12 bulan terakhir</li>
                                            </ul>
                                            <p className="mt-4 text-amber-600 dark:text-amber-400">Aplikasi CuanKu dimaksudkan sebagai alat bantu pengelolaan keuangan, bukan sebagai pengganti nasihat keuangan profesional. Selalu konsultasikan dengan penasihat keuangan berkualifikasi sebelum membuat keputusan keuangan penting.</p>
                                        </div>
                                    </details>
                                    
                                    <details className="group border-t border-gray-200 dark:border-zinc-700">
                                        <summary className="flex justify-between items-center p-5 bg-emerald-50 dark:bg-emerald-900/20 cursor-pointer">
                                            <h2 className="text-lg font-semibold m-0 text-gray-900 dark:text-white">7. Kekayaan Intelektual</h2>
                                            <span className="text-emerald-500 group-open:rotate-180 transition-transform">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="m6 9 6 6 6-6"/>
                                                </svg>
                                            </span>
                                        </summary>
                                        <div className="p-5 bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700">
                                            <p>Semua aspek Layanan CuanKu dilindungi oleh hukum kekayaan intelektual:</p>
                                            <ul className="mt-4 space-y-3">
                                                <li>Logo, merek dagang, dan nama CuanKu adalah milik eksklusif perusahaan</li>
                                                <li>Konten, desain, antarmuka, kode, dan elemen visual lainnya dilindungi oleh hak cipta</li>
                                                <li>Anda dilarang menyalin, mendistribusikan, memodifikasi, atau membuat karya turunan dari materi yang dilindungi tanpa izin tertulis</li>
                                                <li>Konten pengguna tetap menjadi milik Anda, tetapi Anda memberikan kami lisensi non-eksklusif untuk menggunakan, menyimpan, dan menampilkan konten tersebut sesuai kebutuhan layanan</li>
                                            </ul>
                                        </div>
                                    </details>
                                    
                                    <details className="group border-t border-gray-200 dark:border-zinc-700">
                                        <summary className="flex justify-between items-center p-5 bg-emerald-50 dark:bg-emerald-900/20 cursor-pointer">
                                            <h2 className="text-lg font-semibold m-0 text-gray-900 dark:text-white">8. Penghentian Layanan</h2>
                                            <span className="text-emerald-500 group-open:rotate-180 transition-transform">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="m6 9 6 6 6-6"/>
                                                </svg>
                                            </span>
                                        </summary>
                                        <div className="p-5 bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700">
                                            <p>Berkaitan dengan penghentian penggunaan Layanan:</p>
                                            <ul className="mt-4 space-y-3">
                                                <li>Anda dapat menghentikan penggunaan Layanan dan menghapus akun Anda kapan saja melalui pengaturan aplikasi</li>
                                                <li>Kami berhak menangguhkan atau menghentikan akses Anda ke Layanan, dengan atau tanpa pemberitahuan, jika terjadi pelanggaran terhadap Ketentuan ini</li>
                                                <li>Setelah penghentian, data Anda akan disimpan selama 30 hari sebelum dihapus secara permanen, kecuali diwajibkan oleh hukum untuk menyimpannya lebih lama</li>
                                                <li>Anda dapat meminta ekspor data Anda sebelum penghapusan akun</li>
                                            </ul>
                                        </div>
                                    </details>
                                    
                                    <details className="group border-t border-gray-200 dark:border-zinc-700">
                                        <summary className="flex justify-between items-center p-5 bg-emerald-50 dark:bg-emerald-900/20 cursor-pointer">
                                            <h2 className="text-lg font-semibold m-0 text-gray-900 dark:text-white">9. Perubahan Syarat dan Ketentuan</h2>
                                            <span className="text-emerald-500 group-open:rotate-180 transition-transform">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="m6 9 6 6 6-6"/>
                                                </svg>
                                            </span>
                                        </summary>
                                        <div className="p-5 bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700">
                                            <p>Kami dapat merevisi Syarat dan Ketentuan ini dari waktu ke waktu:</p>
                                            <ul className="mt-4 space-y-3">
                                                <li>Perubahan signifikan akan diberitahukan kepada Anda melalui aplikasi atau email minimal 30 hari sebelum berlaku</li>
                                                <li>Kami akan menandai tanggal terakhir pembaruan di bagian atas dokumen ini</li>
                                                <li>Dengan terus menggunakan Layanan setelah perubahan berlaku, Anda dianggap menyetujui ketentuan yang direvisi</li>
                                                <li>Jika Anda tidak setuju dengan perubahan, Anda harus berhenti menggunakan Layanan dan menutup akun Anda</li>
                                            </ul>
                                        </div>
                                    </details>
                                    
                                    <details className="group border-t border-gray-200 dark:border-zinc-700">
                                        <summary className="flex justify-between items-center p-5 bg-emerald-50 dark:bg-emerald-900/20 cursor-pointer">
                                            <h2 className="text-lg font-semibold m-0 text-gray-900 dark:text-white">10. Hukum yang Berlaku</h2>
                                            <span className="text-emerald-500 group-open:rotate-180 transition-transform">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="m6 9 6 6 6-6"/>
                                                </svg>
                                            </span>
                                        </summary>
                                        <div className="p-5 bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700">
                                            <p>Syarat dan Ketentuan ini akan diatur dan ditafsirkan sesuai dengan hukum Republik Indonesia:</p>
                                            <ul className="mt-4 space-y-3">
                                                <li>Setiap sengketa yang timbul dari atau sehubungan dengan Syarat dan Ketentuan ini akan diselesaikan melalui negosiasi bersama</li>
                                                <li>Jika sengketa tidak dapat diselesaikan melalui negosiasi, kedua belah pihak setuju untuk menyelesaikannya melalui arbitrase di Jakarta, Indonesia</li>
                                                <li>Anda setuju untuk tidak bergabung dengan tuntutan hukum kolektif atau mengajukan tuntutan kolektif terhadap CuanKu</li>
                                            </ul>
                                        </div>
                                    </details>
                                </div>
                                
                                <div className="mt-12 p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Hubungi Kami</h2>
                                    <p>Jika Anda memiliki pertanyaan atau kekhawatiran tentang Syarat dan Ketentuan ini, silakan hubungi kami di:</p>
                                    <ul className="mt-4 space-y-2">
                                        <li className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
                                                <rect width="20" height="16" x="2" y="4" rx="2"/>
                                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                                            </svg>
                                            <span>support@cuanku.id</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
                                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                            </svg>
                                            <span>+62 21 5678 9012</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
                                                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                                                <circle cx="12" cy="10" r="3"/>
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
