module.exports = {
    // Указываем, что тесты будут выполняться в среде браузера
    testEnvironment: 'jsdom',

    // Паттерн для поиска тестовых файлов
    testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],

    // Настройка трансформации файлов с помощью Babel
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },

    // Указываем расширения файлов, которые Jest будет обрабатывать
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],

    // Игнорируем папку node_modules при трансформации
    transformIgnorePatterns: ['<rootDir>/node_modules/'],

    // Настройка маппинга модулей для статических файлов (например, изображений)
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Мокаем стили
        '\\.(gif|jpg|jpeg|png|svg)$': '<rootDir>/__mocks__/fileMock.js', // Мокаем изображения
    },

    // Настройка для покрытия кода
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,jsx}', // Указываем, какие файлы будут учитываться для покрытия
        '!src/index.js', // Исключаем файл, который не нужно учитывать
    ],
    coverageReporters: ['text', 'lcov'], // Форматы отчетов о покрытии
};
