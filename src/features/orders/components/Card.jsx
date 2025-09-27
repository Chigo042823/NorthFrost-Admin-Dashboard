export const Card = ({span, title, href, children, height}) => {
    const spans = [
        "",
        "sm:col-span-1",
        "sm:col-span-2",
        "sm:col-span-3",
        "sm:col-span-4",
    ];
    return (
    <div className={`p-2 shadow border border-stone-300 ${height? height: "h-72"} rounded-lg col-span-1 ${spans[span]}`}>
        <div className="flex place-content-between">
            <p className="text-sm text-stone-500 m-2 mt-1">{title}</p>
            <a href={href} className="text-sm text-stone-500 m-2 mt-1 hover:underline hover:text-stone-400 transition duration-150">See more</a>
        </div>
        {children}
    </div>)
}