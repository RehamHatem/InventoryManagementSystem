<?php

namespace Database\Factories;

use App\Models\Supplier;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory as FakerFactory;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = $this->faker ?? FakerFactory::create();
        return [
            //
            'name' => $faker->word(),
            'sku' => strtoupper($faker->unique()->bothify('PROD-###??')),
            'supplier_id' => Supplier::inRandomOrder()->first()?->id ?? Supplier::factory(),
            'cost' => $faker->randomFloat(2, 10, 200),
            'price' => $faker->randomFloat(2, 20, 400),
            'quantity' => $faker->numberBetween(1, 100),
            'threshold' => $faker->numberBetween(1, 5),
        ];
    }
}
