<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\App;

class OrderResources extends JsonResource
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
            'weight' => $this->weight,
            'date' => \Carbon\Carbon::parse($this->date)->translatedFormat('d F Y'),
            'fish' => new FishResources($this->fish),
            'user' => new UserResources($this->user),
        ];
    }
}
