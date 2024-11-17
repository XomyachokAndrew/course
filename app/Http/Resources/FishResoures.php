<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FishResoures extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => new UserResoures($this->user),
            'fish_name' => $this->fishName,
            'weight' => $this->weight,
            'cost_per_kg' => $this->cost_per_kg,
        ];
    }
}
