<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $category = new Category();
        $category->name = 'БИЗНЕС';
        $category->slug = 'business';
        $category->save();

        $category = new Category();
        $category->name = 'ЕДА';
        $category->slug = 'food';
        $category->save();

        $category = new Category();
        $category->name = 'ТЕХНОЛОГИИ';
        $category->slug = 'tech';
        $category->save();

        $category = new Category();
        $category->name = 'ИННОВАЦИИ';
        $category->slug = 'innovation';
        $category->save();

        $category = new Category();
        $category->name = 'ОБРАЗОВАНИЕ';
        $category->slug = 'education';
        $category->save();

        $category = new Category();
        $category->name = 'РАЗНОЕ';
        $category->slug = 'another';
        $category->save();
    }
}
