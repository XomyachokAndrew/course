import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FishCard from './FishCard';
import { useAuth } from '../context/AuthContext';
import * as api from '../api/handlers';
import { useRouter } from 'next/navigation';

// Мокаем хук useAuth
jest.mock('../context/AuthContext', () => ({
    useAuth: jest.fn(),
}));

// Мокаем хук useRouter
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

// Мокаем API функции
jest.mock('../api/handlers', () => ({
    deleteFish: jest.fn(),
    getFish: jest.fn(),
    getOrderFish: jest.fn(),
    getPhotosFish: jest.fn(),
    deletePhoto: jest.fn(),
}));

describe('FishCard', () => {
    const mockFish = {
        id: 1,
        user: { id: 1 },
        fish_name: { name: 'Salmon' },
        weight: 2,
        type: 'Freshwater',
        cost_per_kg: 500,
        date: '2023-10-01',
        photos: [],
    };

    const mockUser = { id: 1 };

    beforeEach(() => {
        useAuth.mockReturnValue({ user: mockUser });
        useRouter.mockReturnValue({ push: jest.fn() });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // Тестируем рендеринг описания рыбы
    test('Рендеринг описания рыбы корректно', () => {
        render(<FishCard fish={mockFish} />);

        expect(screen.getByText('Salmon')).toBeInTheDocument();
        expect(screen.getByText(/Вес:/)).toHaveTextContent('Вес: 2 кг');
    });

    // Тестируем вызов функции handleDelete после нажатия кнопки
    test('Вызов функции handleDelete, после нажатия кнопки', async () => {
        const { deleteFish, getFish } = api;
        getFish.mockResolvedValue(mockFish);
        deleteFish.mockResolvedValue();

        render(<FishCard fish={mockFish} />);

        const deleteButton = screen.getByText('Удалить');
        window.confirm = jest.fn(() => true); // Мокаем confirm, чтобы он возвращал true

        fireEvent.click(deleteButton);

        expect(getFish).toHaveBeenCalledWith(mockFish.id);
        expect(deleteFish).toHaveBeenCalledWith(mockFish.id);
    });

    // Тестируем отображение кнопки заказа для не-владельцев
    test('Отображает кнопку заказа для не-владельцев', () => {
        useAuth.mockReturnValue({ user: { id: 2 } }); // Меняем пользователя на не-владельца
        render(<FishCard fish={mockFish} />);

        expect(screen.getByText('Заказать')).toBeInTheDocument();
    });
});
