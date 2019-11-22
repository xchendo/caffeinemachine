<?php

use Illuminate\Database\Seeder;

class CaffeinatedDrinksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $caffeinated_drinks = [
            [            
                'name' => 'Monster Ultra Sunrise',
                'caffeine_mg' => 75,
                'servings' => 2,
            ],
            [            
                'name' => 'Black Coffee',
                'caffeine_mg' => 95,
                'servings' => 1,
            ],
            [            
                'name' => 'Americano',
                'caffeine_mg' => 77,
                'servings' => 1,
            ],
            [            
                'name' => 'Sugar free NOS',
                'caffeine_mg' => 130,
                'servings' => 2,
            ],
            [            
                'name' => '5 Hour Energy',
                'caffeine_mg' => 200,
                'servings' => 1,
            ]
        ];

        DB::table('caffeinated_drinks')->insert($caffeinated_drinks);
    }
}