<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class AuthenticatedSessionController extends Controller
{
    public function store(LoginRequest $request): JsonResponse
    {
        try {
            $request->authenticate();
        } catch (ValidationException $e) {
            return response()->json([], Response::HTTP_UNAUTHORIZED);
        }
        $user = $request->user();
        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user,
        ]);
    }
}
