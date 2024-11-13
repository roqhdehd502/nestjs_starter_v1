import { ApiProperty } from '@nestjs/swagger';

export class GetCommonOkDto {
  @ApiProperty({ type: 'string', example: 'ok' })
  readonly status: string;
}
