
# Laravel Backend - User Roles Management

This is the backend API for the Laravel React User Roles project. It provides user authentication, role management, and API endpoints for the frontend React app.

## Features

- User registration and authentication
- Role-based access control
- RESTful API endpoints for users and roles
- Database migrations and seeders
- Integration with Laravel Sanctum for API authentication

## Getting Started

### Prerequisites
- PHP >= 8.0
- Composer
- MySQL or other supported database

### Installation
1. Clone the repository:
	```bash
	git clone https://github.com/yourusername/laravel-react-user-roles.git
	cd laravel-react-user-roles/backend
	```
2. Install dependencies:
	```bash
	composer install
	```
3. Copy the example environment file and configure your settings:
	```bash
	cp .env.example .env
	# Edit .env for your database and other settings
	```
4. Generate application key:
	```bash
	php artisan key:generate
	```
5. Run migrations and seeders:
	```bash
	php artisan migrate --seed
	```
6. Start the development server:
	```bash
	php artisan serve
	```

## API Endpoints

See `routes/api.php` for available endpoints. Authentication is required for protected routes.

## Running Tests

To run backend tests:
```bash
php artisan test
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
