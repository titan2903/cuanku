export default function HeaderTitle({ title, subtitle, icon: Icon }) {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row items-center gap-x-3">
                <div className="rounded-xl bg-emerald-50 p-1">
                    <Icon className="size-6 text-emerald-600" />
                </div>
                <h1 className="text-2xl font-medium leading-relaxed tracking-wide text-foreground">{title}</h1>
            </div>
            <p className="text-sm font-light text-muted-foreground">{subtitle}</p>
        </div>
    );
}
