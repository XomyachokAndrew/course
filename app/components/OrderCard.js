import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import PhotoCard from './PhotoCard';
import { deleteOrder } from '../api/handlers';

const OrderCard = ({ order }) => {
    const { user } = useAuth();
    const isThisUser = user ? (user.id === order.user.id) : null;
    const router = useRouter(); // Инициализируем useRouter

    const handleDelete = async (id) => {
        if (confirm('Вы уверены, что хотите удалить эту заказ?')) {
            try {
                await deleteOrder(order.id);

                router.push('/profile'); // Перенаправление после удаления
            } catch (error) {
                console.error('Ошибка при удалении заказа:', error);
                alert('Произошла ошибка при удалении заказа. Попробуйте еще раз.');
            }
        }
    };

    return (
        <div key={order.id} className="border rounded-lg p-4 shadow-md transition-transform transform hover:scale-105 bg-white hover:bg-gray-100 mb-4">
            <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-800">{order.fish.fish_name.name}</h2>
                <div className="border-t border-gray-200 mt-2 pt-2">
                    <PhotoCard key={order.id} photos={order.fish.photos} fishName={order.fish.fish_name.name} />
                    <div className="text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
                        <p><strong>Вес:</strong> {order.weight} кг</p>
                        <p><strong>Тип:</strong> {order.fish.type}</p>
                        <p><strong>Сумма:</strong> {order.weight * order.fish.cost_per_kg} руб.</p>
                        <p><strong>Дата заказа:</strong> {order.date}</p>
                        {order.fish.user.id != user.id ? (
                            <>
                                <p><strong>Заказано у:</strong> {order.fish.user.name}</p>
                                <p><strong>Номер телефона:</strong> {order.fish.user.number}</p>
                            </>
                        ) : (
                            <>
                                <p><strong>Заказчик:</strong> {order.user.name}</p>
                                <p><strong>Номер телефона:</strong> {order.user.number}</p>
                            </>
                        )}
                        <div className="flex flex-col items-start">
                            {
                                user ? (
                                    isThisUser ? (
                                        <button
                                            onClick={() => handleDelete(order.id)}
                                            className="inline-block w-full text-red-500 py-3 hover:text-red-700"
                                        >
                                            Удалить
                                        </button>
                                    ) : null
                                ) : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;