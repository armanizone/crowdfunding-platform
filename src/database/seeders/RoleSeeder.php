<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $manager = new Role();
        $manager->name = 'Admin';
        $manager->slug = 'admin';
        $manager->save();

        $developer = new Role();
        $developer->name = 'Curator';
        $developer->slug = 'curator';
        $developer->save();

        $developer = new Role();
        $developer->name = 'Business Angel';
        $developer->slug = 'b-angel';
        $developer->save();

        $developer = new Role();
        $developer->name = 'Booster';
        $developer->slug = 'booster';
        $developer->save();


    }
}
