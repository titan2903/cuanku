<?php

namespace App\Traits;

use App\Http\Resources\ReportTrackingResource;

trait FormatReportTrait
{
    private function formatReport($data)
    {
        return [
            'data' => ReportTrackingResource::collection($data),
            'total' => [
                'plan' => $data->sum('plan'),
                'actual' => $data->sum('actual'),
                'difference' => $data->sum('difference'),
            ],
        ];
    }
}
