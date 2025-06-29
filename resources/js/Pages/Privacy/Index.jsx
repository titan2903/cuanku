@extends('layouts.app') {{-- Ganti kalau pakai layout lain --}}

@section('content')
<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Kebijakan Privasi - CuanKu$</h1>

    <div class="space-y-6 text-gray-800">
        <div>
            <h2 class="text-xl font-semibold">1. Informasi yang Kami Kumpulkan</h2>
            <ul class="list-disc pl-6 mt-2">
                <li>Data pribadi seperti nama, email, dan password.</li>
                <li>Data keuangan yang Anda input (pengeluaran, pemasukan, dll.).</li>
            </ul>
        </div>

        <div>
            <h2 class="text-xl font-semibold">2. Penggunaan Data</h2>
            <ul class="list-disc pl-6 mt-2">
                <li>Data digunakan untuk keperluan analisis dan membantu Anda mengelola keuangan.</li>
                <li>Kami tidak menjual atau membagikan data Anda ke pihak ketiga tanpa izin.</li>
            </ul>
        </div>

        <div>
            <h2 class="text-xl font-semibold">3. Keamanan</h2>
            <p class="mt-2">Kami menggunakan enkripsi dan langkah-langkah keamanan lainnya untuk melindungi data Anda.</p>
        </div>

        <div>
            <h2 class="text-xl font-semibold">4. Hak Pengguna</h2>
            <ul class="list-disc pl-6 mt-2">
                <li>Anda dapat mengakses, memperbarui, atau menghapus data Anda kapan saja.</li>
                <li>Anda dapat menghapus akun Anda jika tidak ingin menggunakan layanan ini lagi.</li>
            </ul>
        </div>

        <div>
            <h2 class="text-xl font-semibold">5. Cookie & Teknologi Pelacakan</h2>
            <p class="mt-2">Kami mungkin menggunakan cookie untuk meningkatkan pengalaman pengguna.</p>
        </div>
    </div>
</div>
@endsection

