<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call(RoleSeeder::class);
        $this->call(PermissionSeeder::class);
        $this->call(UserTableSeeder::class);
        $this->call(CarouselSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(CitySeeder::class);
    }
}
