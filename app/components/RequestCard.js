import Link from 'next/link';

const RequestCard = ({ request }) => {
    return (
        <div key={request.id}
            className="border rounded-lg p-4 shadow-md transition-transform transform hover:scale-105 bg-white hover:bg-gray-100 mb-4 max-w-sm mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl"
            style={{ width: '576px', height: '183px' }} // Устанавливаем стандартные размеры
        >
            <div className="mt-6">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">{request.title}</h2>
                <div className="border-t border-gray-200 mt-2 pt-2">
                    <div className="text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap max-w-full"
                    >
                        {request.description}
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <Link href={`/request/${request.id}`} className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-200 text-center">
                    Подробнее
                </Link>
            </div>
        </div>
    );
};

export default RequestCard;
