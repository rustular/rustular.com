/// <reference path="../.astro/types.d.ts" />
/// <reference types="@astrojs/image/client" />

declare namespace Intl {
  type Key =
    | 'calendar'
    | 'collation'
    | 'currency'
    | 'numberingSystem'
    | 'timeZone'
    | 'unit';

  function supportedValuesOf(input: Key): string[];
}