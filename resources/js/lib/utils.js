import { Toaster } from '@/Components/ui/sonner';
import { router } from '@inertiajs/react';
import { clsx } from 'clsx';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

function flashMessage(params) {
    return params.props.flash;
}

const deleteAction = (url, { closeModal, ...options } = {}) => {
    const defaultOptions = {
        preserveScroll: true,
        preserveState: true,
        onSuccess: (success) => {
            const flash = flashMessage(success);

            if (flash) {
                Toaster[flash.type](flash.message);
            }

            if (closeModal && typeof closeModal === 'function') {
                closeModal();
            }
        },
        ...options,
    };

    router.delete(url, defaultOptions);
};

const formatDateIndo = (dateString) => {
    if (!dateString) return '-';

    return format(parseISO(dateString), 'eeee, dd MMMM yyyy', {
        locale: id,
    });
};

const formatToRupiah = (amount) => {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    return formatter.format(amount);
};

const BUDGETTYPE = {
    INCOME: 'Penghasilan',
    SAVING: 'Tabungan dan Investasi',
    DEBT: 'Cicilan Hutang',
    BILL: 'Tagihan',
    SHOPPING: 'Belanja',
};
const BUDGETTYPEVARIANTS = {
    [BUDGETTYPE.INCOME]: 'emerald',
    [BUDGETTYPE.SAVING]: 'orange',
    [BUDGETTYPE.DEBT]: 'red',
    [BUDGETTYPE.BILL]: 'sky',
    [BUDGETTYPE.SHOPPING]: 'purple',
};

const MONTHTYPE = {
    JANUARI: 'Januari',
    FEBRUARI: 'Februari',
    MARET: 'Maret',
    APRIL: 'April',
    MEI: 'Mei',
    JUNI: 'Juni',
    JULI: 'Juli',
    AGUSTUS: 'Agustus',
    SEPTEMBER: 'September',
    OKTOBER: 'Oktober',
    NOVEMBER: 'November',
    DESEMBER: 'Desember',
};
const MONTHTYPEVARIANTS = {
    [MONTHTYPE.JANUARI]: 'fuchsia',
    [MONTHTYPE.FEBRUARI]: 'orange',
    [MONTHTYPE.MARET]: 'emerald',
    [MONTHTYPE.APRIL]: 'sky',
    [MONTHTYPE.MEI]: 'purple',
    [MONTHTYPE.JUNI]: 'rose',
    [MONTHTYPE.JULI]: 'pink',
    [MONTHTYPE.AGUSTUS]: 'red',
    [MONTHTYPE.SEPTEMBER]: 'violet',
    [MONTHTYPE.OKTOBER]: 'blue',
    [MONTHTYPE.NOVEMBER]: 'lime',
    [MONTHTYPE.DESEMBER]: 'teal',
};

const ASSETTYPE = {
    CASH: 'Kas',
    PERSONAL: 'Personal',
    SHORTTERM: 'Investasi Jangka Pendek',
    MIDTERM: 'Investasi Jangka Menengah',
    LONGTERM: 'Investasi Jangka Panjang',
};
const ASSETTYPEVARIANTS = {
    [ASSETTYPE.CASH]: 'emerald',
    [ASSETTYPE.PERSONAL]: 'orange',
    [ASSETTYPE.SHORTTERM]: 'red',
    [ASSETTYPE.MIDTERM]: 'sky',
    [ASSETTYPE.LONGTERM]: 'purple',
};
const ASSETDESCRIPTION = {
    [ASSETTYPE.CASH]: 'Uang tunai yang tersedia untuk kebutuhan sehari-hari',
    [ASSETTYPE.PERSONAL]:
        'Pengelolaan keuangan pribadi termasuk tabungan dan anggaran untuk mencapai tujuan keuangan jangka pendek dan jangka panjang',
    [ASSETTYPE.SHORTTERM]: 'Investasi yang bertujuan untuk memperoleh keuntungan dalam waktu singkat',
    [ASSETTYPE.MIDTERM]: 'Investasi dengan periode pengembalian antara 1 hingga 5 tahun',
    [ASSETTYPE.LONGTERM]:
        'Investasi dengan periode pengembalian lebih dari 5 tahun, bertujuan untuk pertumbuhan modal jangka panjang',
};

const LIABILITYTYPE = {
    SHORTTERMDEBT: 'Hutang Jangka Pendek',
    MIDTERMDEBT: 'Hutang Jangka Menengah',
    LONGTERMDEBT: 'Hutang Jangka Panjang',
};

const LIABILITYTYPEVARIANT = {
    [LIABILITYTYPE.SHORTTERMDEBT]: 'emerald',
    [LIABILITYTYPE.MIDTERMDEBT]: 'orange',
    [LIABILITYTYPE.LONGTERMDEBT]: 'red',
};

const LIABILITYDESCRIPTION = {
    [LIABILITYTYPE.SHORTTERMDEBT]: 'Tenor dalam jangka waktu kurang dari 1 tahun sampai 5 tahun',
    [LIABILITYTYPE.MIDTERMDEBT]: 'Tenor dalam jangka waktu 5 tahun sampai 10 tahun',
    [LIABILITYTYPE.LONGTERMDEBT]: 'Tenor dalam jangka waktu lebih dari 10 tahun',
};

const messages = {
    503: {
        title: 'Service Unavailable',
        description:
            'The server is currently unable to handle the request due to temporary overloading or maintenance of the server.',
        status: 503,
    },
    500: {
        title: 'Internal Server Error',
        description: 'An unexpected error occurred on the server.',
        status: 500,
    },
    404: {
        title: 'Not Found',
        description: 'The requested resource could not be found.',
        status: 404,
    },
    400: {
        title: 'Bad Request',
        description: 'The request could not be understood by the server due to malformed syntax.',
        status: 400,
    },
    403: {
        title: 'Forbidden',
        description: 'You do not have permission to access the requested resource.',
        status: 403,
    },
    401: {
        title: 'Unauthorized',
        description: 'You must be authenticated to access this resource.',
        status: 401,
    },
    422: {
        title: 'Unprocessable Entity',
        description: 'The request was well-formed but was unable to be followed due to semantic errors.',
        status: 422,
    },
    429: {
        title: 'Too Many Requests',
        description: 'You have sent too many requests in a given amount of time, please try again later.',
        status: 429,
    },
    419: {
        title: 'Page Expired',
        description: 'The page has expired due to inactivity, please refresh and try again.',
        status: 419,
    },
};

export {
    ASSETDESCRIPTION,
    ASSETTYPE,
    ASSETTYPEVARIANTS,
    BUDGETTYPE,
    BUDGETTYPEVARIANTS,
    cn,
    deleteAction,
    flashMessage,
    formatDateIndo,
    formatToRupiah,
    LIABILITYDESCRIPTION,
    LIABILITYTYPE,
    LIABILITYTYPEVARIANT,
    messages,
    MONTHTYPE,
    MONTHTYPEVARIANTS,
};
