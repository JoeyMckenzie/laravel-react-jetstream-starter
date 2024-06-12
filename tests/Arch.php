<?php

declare(strict_types=1);

namespace Tests;

arch('app')
    ->expect('App')
    ->toUseStrictTypes();

arch('tests')
    ->expect('Feature')
    ->toUseStrictTypes()
    ->and('Unit')
    ->toUseStrictTypes();
