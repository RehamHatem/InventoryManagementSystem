<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    //
    protected $fillable = [
    'name',
    'sku',         
    'cost',       
    'price',       
    'quantity',    
    'supplier_id', 
];
public function supplier() {
    return $this->belongsTo(Supplier::class);
}

public function transactions() {
    return $this->hasMany(StockTransaction::class);
}


}
