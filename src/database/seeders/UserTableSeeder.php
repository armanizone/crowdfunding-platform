<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserTableSeeder extends Seeder
{
    public function run() {

        $admin = Role::where('slug','admin')->first();
        $curator = Role::where('slug','curator')->first();
        $angel = Role::where('slug','b-angel')->first();
        $booster = Role::where('slug','booster')->first();

        $projectManipulation = Permission::where('slug','project-manipulation')->first();

        $admin->permissions()->attach($projectManipulation);
        $curator->permissions()->attach($projectManipulation);
        $angel->permissions()->attach($projectManipulation);
        $booster->permissions()->attach($projectManipulation);

        
        $user1 = new User();
        $user1->name = 'Admin';
        $user1->email = 'admin@mail.ru';
        $user1->password = bcrypt('password');
        $user1->save();
        $user1->roles()->attach($admin);
        $user2 = new User();
        $user2->name = 'Curator';
        $user2->email = 'Curator@mail.ru';
        $user2->password = bcrypt('password');
        $user2->save();
        $user2->roles()->attach($curator);
    }
}
