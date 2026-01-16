declare var process: {
    env: {
        NODE_ENV: 'development' | 'production';
        SERVER_PORT: number;
        DB_DRIVER: string;
    };
};