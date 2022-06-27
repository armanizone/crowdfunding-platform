<?php

namespace Database\Seeders;

use App\Models\Carousel;
use Illuminate\Database\Seeder;

class CarouselSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $carousel1 = new Carousel();
        $carousel1->title = 'Первая карусель';
        $carousel1->description = 'Описание первой карусели';
        $carousel1->link = 'ссылка не рабочая';
        $carousel1->image = 'ссылка image не рабочая';
        $carousel1->save();

        $carousel2 = new Carousel();
        $carousel2->title = 'Вторая карусель';
        $carousel2->description = 'Описание первой карусели';
        $carousel2->link = 'ссылка не рабочая';
        $carousel2->image = 'ссылка image не рабочая';
        $carousel2->save();

        $carousel3 = new Carousel();
        $carousel3->title = 'Третья карусель';
        $carousel3->description = 'Описание первой карусели';
        $carousel3->link = 'ссылка не рабочая';
        $carousel3->image = 'ссылка image не рабочая';
        $carousel3->save();

        $carousel4 = new Carousel();
        $carousel4->title = 'Четвертая карусель';
        $carousel4->description = 'Описание первой карусели';
        $carousel4->link = 'ссылка не рабочая';
        $carousel4->image = 'ссылка image не рабочая';
        $carousel4->save();
    }
}
