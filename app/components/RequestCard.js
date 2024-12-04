import Link from 'next/link';

const RequestCard = ({ request }) => {
    return (
        <div key={request.id} className="border rounded-lg p-4 shadow-md transition-transform transform hover:scale-105 bg-white hover:bg-gray-100 mb-4">
            <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-800">{request.title}</h2>
                <div className="border-t border-gray-200 mt-2 pt-2">
                    <div className="text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                        {request.description}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestCard;