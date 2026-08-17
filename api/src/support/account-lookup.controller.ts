import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

import { Protect } from '../auth/protect.decorator';
import { SupabaseService } from '../supabase/supabase.service';

const CONNECTION_FIELDS =
  'id, project_id, provider, social_provider_user_name, access_token, refresh_token, access_token_expires_at';

@Controller('support/connections')
@ApiExcludeController()
@Protect()
export class AccountLookupController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Get()
  async listConnections(@Query('project_id') projectId: string) {
    const { data, error } = await this.supabaseService.supabaseServiceRole
      .from('social_provider_connections')
      .select(CONNECTION_FIELDS)
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return { data };
  }

  @Get(':id')
  async getConnection(@Param('id') id: string) {
    const { data, error } = await this.supabaseService.supabaseServiceRole
      .from('social_provider_connections')
      .select(CONNECTION_FIELDS)
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return { data };
  }
}
