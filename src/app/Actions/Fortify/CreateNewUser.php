<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use Haruncpi\LaravelIdGenerator\IdGenerator;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array  $input
     * @return \App\Models\User
     */
    public function create(array $input)
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255', 'regex:/^([а-яА-ЯёЁa-zA-Z]{1,}?([-]{1}|[а-яА-ЯёЁa-zA-Z]{1,19})){2,20}$/u'],
            'email' => [
                'required',
                'regex:/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/u',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
        ])->validate();

        return User::create([
            'id' => IdGenerator::generate(['table' => 'users', 'length' => 9, 'prefix' =>date('dmy')]),
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => Hash::make($input['password']),
        ]);
    }
}
