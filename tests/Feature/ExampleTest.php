<?php

declare(strict_types=1);

namespace Tests;

it('returns a successful response', function (): void {
    $response = $this->get('/');

    $response->assertStatus(200);
});
