import { Link } from "@inertiajs/react";

export default function Pagination({Links}) {
    return (
        <nav className="text-center mt-4">
            {Links.map((link) => (
                <Link
                href={link.url || ""}
                key={link.label}
                className={
                    "inline-block px-2 py-3 rounded-lg text-gray-200 text-xs "
                    + (link.active ? "bg-gray-500 " : " ")
                    + (!link.url ? "!text-gray-500 cursor-not-allowed" : "hover:bg-gray-950")
                }
                dangerouslySetInnerHTML={{__html: link.label}}></Link>
            ))}
        </nav>
    )
}