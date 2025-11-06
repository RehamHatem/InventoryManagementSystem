<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory as FakerFactory;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Supplier>
 */
class SupplierFactory extends Factory
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
            'name' => $faker->company(),
            'email' => $faker->unique()->companyEmail(),
            'phone' => $faker->phoneNumber(),
            'address' => $faker->address(),
        ];
    }
}
