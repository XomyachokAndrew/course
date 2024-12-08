import PhotoCard from './PhotoCard';

const OrderCard = ({ order }) => {
    return (
        <div key={order.id} className="border rounded-lg p-4 shadow-md transition-transform transform hover:scale-105 bg-white hover:bg-gray-100 mb-4">
            <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-800">{order.fish.fish_name.name}</h2>
                <div className="border-t border-gray-200 mt-2 pt-2">
                    <PhotoCard key={order.id} photos={order.fish.photos} fishName={order.fish.fish_name.name} />
                    <div className="text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                        <p><strong>Вес:</strong> {order.weight} кг</p>
                        <p><strong>Сумма:</strong> {order.weight * order.fish.cost_per_kg} руб.</p>
                        <p><strong>Дата заказа:</strong> {order.date}</p>
                        <p><strong>Заказано у:</strong> {order.fish.user.name}</p>
                        <p><strong>Заказчик:</strong> {order.user.name}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;