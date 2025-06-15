import { router } from '@inertiajs/react';
import pkg from 'lodash';
import { useCallback, useEffect } from 'react';
export function useFilter({ route, values, only, wait = 300 }) {
    const { debounce, pickBy } = pkg;

    const reload = useCallback(
        debounce((query) => {
            router.get(route, pickBy(query), {
                only: only,
                preserveState: true,
                preserveScroll: true,
            });
        }, wait),
        [],
    );

    // Reload when values change
    useEffect(() => reload(values), [values, reload]);

    return { values };
}
