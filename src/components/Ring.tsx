interface Props {
    centerText?: string;
    className?: string;
    title?: string;
}

export default function Ring({ centerText, className, title }: Props) {
    return (
        <section className="flex flex-col justify-center items-center gap-3">
            <div className="relative flex items-center justify-center">
                <div
                    className={`ring-2 bg-opacity-5  shadow-md rounded-full h-16 w-16 md:w-20 md:h-20 flex items-center justify-center`}
                >
                    <p
                        className={`font-semibold text-center ${className} text-sm md:text-md`}
                    >
                        {centerText}
                    </p>
                </div>
            </div>
            <p className="font-light text-sm font-sans">{title}</p>
        </section>
    );
}
