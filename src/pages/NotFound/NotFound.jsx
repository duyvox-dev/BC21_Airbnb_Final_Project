import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    document.title = '404 Not Found';

    return (
        <div className="container flex items-center justify-start min-h-full mx-auto text-2xl font-bold py-36">
            <span>Không tìm thấy trang, vui lòng quay lại </span>
            <Link
                className="pl-1 hover:underline text-[#ff5a5e] hover:text-[#ff5a5e]"
                to={'/'}
            >
                trang chủ.
            </Link>
        </div>
    );
}
