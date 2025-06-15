export default function Banner({ title, subtitle }) {
    return (
        <div className="flex flex-col rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-500 to-yellow-100 p-4 text-white">
            <h2 className="text-2xl font-medium leading-relaxed tracking-wide">{title}</h2>
            <p className="text-sm leading-relaxed">{subtitle}</p>
        </div>
    );
}
