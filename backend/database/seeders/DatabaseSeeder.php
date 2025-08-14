<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Seed roles
        $roles = ['Author', 'Editor', 'Subscriber', 'Administrator'];
        foreach ($roles as $role) {
            $slug = strtolower(str_replace(' ', '_', $role));
            \App\Models\Role::firstOrCreate([
                'name' => $role,
                'slug' => $slug
            ]);
        }
    }
}
