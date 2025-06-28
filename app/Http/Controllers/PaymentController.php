<?php

namespace App\Http\Controllers;

use App\Enums\MessageType;
use App\Enums\PaymentType;
use App\Http\Requests\PaymentRequest;
use App\Http\Resources\PaymentResource;
use App\Models\Payment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;
use Throwable;

class PaymentController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth'),
            new Middleware('can:update,payment', only: ['edit', 'update']),
            new Middleware('can:delete,payment', only: ['destroy']),
        ];
    }

    public function index(): Response
    {
        $payments = Payment::query()
            ->select([
                'id',
                'user_id',
                'name',
                'type',
                'account_number',
                'account_owner',
                'created_at',
            ])
            ->where('user_id', Auth::user()->id)
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->paginate(request()->load ?? 10);

        return inertia('Payments/Index', [
            'page_settings' => fn () => [
                'title' => 'Metode Pembayaran',
                'subtitle' => 'Menampilkan semua metode pembayaran yang tersedia pada akun Anda.',
            ],
            'payments' => fn () => PaymentResource::collection($payments)->additional([
                'meta' => [
                    'has_pages' => $payments->hasPages(),
                ],
            ]),
            'state' => fn () => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => request()->load ?? 10,
            ],
            'items' => fn () => [
                ['label' => 'CuanKu💲', 'href' => route('dashboard')],
                ['label' => 'Metode Pembayaran'],
            ],
        ]);
    }

    public function create(): Response
    {
        return inertia('Payments/Create', [
            'page_settings' => fn () => [
                'title' => 'Tambah Metode Pembayaran',
                'subtitle' => 'Buat metode pembayaran baru di sini, klik submit setelah selesai.',
                'method' => 'POST',
                'action' => route('payments.store'),
            ],
            'items' => fn () => [
                ['label' => 'CuanKu💲', 'href' => route('dashboard')],
                ['label' => 'Metode Pembayaran', 'href' => route('payments.index')],
                ['label' => 'Tambah Metode Pembayaran'],
            ],
            'payment_types' => fn () => PaymentType::options(),
        ]);
    }

    public function store(PaymentRequest $request): RedirectResponse
    {
        try {
            Payment::create([
                'user_id' => Auth::user()->id,
                'name' => $request->name,
                'type' => $request->type,
                'account_owner' => $request->account_owner,
                'account_number' => $request->account_number,
            ]);

            flashMessage(MessageType::CREATED->message('Metode Pembayaran.'));

            return to_route('payments.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');

            return to_route('payments.index');
        }
    }

    public function edit(Payment $payment): Response
    {
        return inertia('Payments/Edit', [
            'page_settings' => fn () => [
                'title' => 'Edit Metode Pembayaran',
                'subtitle' => 'Edit metode pembayaran di sini. klik submit setelah selesai.',
                'method' => 'PUT',
                'action' => route('payments.update', $payment),
            ],
            'payment' => fn () => $payment,
            'items' => fn () => [
                ['label' => 'CuanKu💲', 'href' => route('dashboard')],
                ['label' => 'Metode Pembayaran', 'href' => route('payments.index')],
                ['label' => 'Perbarui Metode Pembayaran'],
            ],
            'payment_types' => fn () => PaymentType::options(),
        ]);
    }

    public function update(Payment $payment, PaymentRequest $request): RedirectResponse
    {
        try {
            $updateData = [
                'name' => $request->name,
                'type' => $request->type,
                'account_owner' => $request->account_owner,
            ];

            if ($request->type === PaymentType::CASH->value) {
                $updateData['account_number'] = null;
            } elseif (! empty($request->account_number)) {
                $updateData['account_number'] = $request->account_number;
            }

            $payment->update($updateData);

            flashMessage(MessageType::UPDATED->message('Metode Pembayaran.'));

            return to_route('payments.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');

            return to_route('payments.index');
        }
    }

    public function destroy(Payment $payment): RedirectResponse
    {
        try {
            if ($payment->user_id !== Auth::id()) {
                return back()->with('error', 'Anda tidak diizinkan menghapus data ini');
            }

            $payment->delete();
            flashMessage(MessageType::DELETED->message('Metode Pembayaran.'));

            return to_route('payments.index', [], 303);
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');

            return to_route('payments.index', [], 303);
        }
    }
}
