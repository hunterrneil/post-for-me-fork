import { Module } from '@nestjs/common';

import { AccountLookupController } from './account-lookup.controller';

/**
 * Temporary internal support endpoints. Remove before merge.
 */
@Module({
  controllers: [AccountLookupController],
})
export class SupportModule {}
