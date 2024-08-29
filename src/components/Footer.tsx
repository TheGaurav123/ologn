export default function Footer() {
    return (
        <footer className="bg-[#F2F2F2] flex flex-col gap-4 p-3 md:py-4 md:px-6 text-gray-800 text-xs md:text-sm font-light w-screen  bottom-0">
            <div>
                <ul>
                    <li>India</li>
                </ul>
            </div>
            <div className="flex justify-between">
                <ul className="flex gap-5 flex-wrap">
                    <li>About</li>
                    <li>Advertising</li>
                    <li>Business</li>
                    <li>How Search works</li>
                </ul>
                <ul className="flex flex-wrap gap-5">
                    <li>Privacy</li>
                    <li>Terms</li>
                    <li>Settings</li>
                </ul>
            </div>
        </footer>
    );
}
