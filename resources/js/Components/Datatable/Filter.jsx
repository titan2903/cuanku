import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { IconRefresh } from '@tabler/icons-react';

export default function Filter({ params, setParams, state, children }) {
    function handleClearAll() {
        const resettableParams = Object.fromEntries(
            Object.entries(params)
                .filter(([key]) => !['page', 'load'].includes(key))
                .map(([key, value]) => [key, '']),
        );

        setParams({
            ...params,
            ...resettableParams,
            page: 1,
            load: state.load,
        });
    }

    return (
        <div className="flex w-full flex-col gap-4 px-4 py-2 lg:flex-row lg:items-center">
            <Input
                className="w-full sm:w-1/4"
                placeholder="Search..."
                value={params?.search}
                onChange={(e) => setParams((prev) => ({ ...prev, search: e.target.value }))}
            />
            <Select value={params?.load} onValueChange={(e) => setParams({ ...params, page: 1, load: e })}>
                <SelectTrigger className="w-full sm:w-24">
                    <SelectValue placeholder="Load" />
                </SelectTrigger>
                <SelectContent>
                    {[10, 25, 50, 75, 100].map((number, index) => (
                        <SelectItem key={index} value={String(number)}>
                            {number}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {children}
            <Button variant="red" onClick={handleClearAll} size="xl">
                <IconRefresh className="size-4" />
                Bersihkan
            </Button>
        </div>
    );
}
