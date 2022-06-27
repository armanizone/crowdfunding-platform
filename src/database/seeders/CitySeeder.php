<?php

namespace Database\Seeders;

use App\Models\City;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $category = new City();
        $category->name = 'Астана (Нур-Султан)';
        $category->save();
        
        $category = new City();
        $category->name = 'Алма-ата';
        $category->save();
        
        $category = new City();
        $category->name = 'Шымкент';
        $category->save();
        
        $category = new City();
        $category->name = 'Актобе';
        $category->save();
        
        $category = new City();
        $category->name = 'Актау';
        $category->save();
        
        $category = new City();
        $category->name = 'Атырау';
        $category->save();
        
        $category = new City();
        $category->name = 'Караганда';
        $category->save();
        
        $category = new City();
        $category->name = 'Костанай';
        $category->save();
        
        $category = new City();
        $category->name = 'Кокшетау';
        $category->save();
        
        $category = new City();
        $category->name = 'Кызылорда';
        $category->save();
        
        $category = new City();
        $category->name = 'Талдыкорган';
        $category->save();
        
        $category = new City();
        $category->name = 'Петропавловск';
        $category->save();
        
        $category = new City();
        $category->name = 'Семей';
        $category->save();
        
        $category = new City();
        $category->name = 'Павлодар';
        $category->save();
        
        $category = new City();
        $category->name = 'Рудный';
        $category->save();
        
        $category = new City();
        $category->name = 'Тараз';
        $category->save();
        
        $category = new City();
        $category->name = 'Темиртау';
        $category->save();
        
        $category = new City();
        $category->name = 'Туркестан';
        $category->save();
        
        $category = new City();
        $category->name = 'Уральск';
        $category->save();
        
        $category = new City();
        $category->name = 'Усть-Каменогорск';
        $category->save();
        
        $category = new City();
        $category->name = 'Екибастуз';
        $category->save();
    }
}
