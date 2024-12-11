<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\App;

class FishResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        App::setLocale('ru');
        return [
            'id' => $this->id,
            'user' => new UserResources($this->user),
            'fish_name' => new FishNameResources($this->fishName),
            'type' => $this->type->name,
            'photos' => PhotoResources::collection($this->photos),
            'weight' => $this->weight,
            'cost_per_kg' => $this->cost_per_kg,
            'date' => \Carbon\Carbon::parse($this->date)->translatedFormat('d F Y'),
        ];
    }
}
