<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string $content
 * @property string|null $image
 * @property bool $is_published
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class News extends Model
{
    protected $fillable = ['title', 'slug', 'content', 'image', 'is_published'];

    protected function casts(): array
    {
        return [
            'is_published' => 'boolean',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
