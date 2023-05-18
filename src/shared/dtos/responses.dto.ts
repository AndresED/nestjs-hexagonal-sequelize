import { ApiProperty } from "@nestjs/swagger";

export class MessageError {
    @ApiProperty({
      description:
        'Error controlado que ha sido generado al momento de realizar un proceso interno en el api',
      type: String,
    })
    message: string;
  }

  export class MessageString {
    @ApiProperty({
      description: 'Operación realizada con exito',
      type: String,
    })
    message: string;
  }


  export class MessageErrorCreateUser {
    @ApiProperty({ type: String })
    message: string;
    @ApiProperty({ type: String })
    value: string;
    @ApiProperty({ type: Boolean })
    error: boolean;
  }
  export class MessageError500 {
    @ApiProperty({
      description: 'Error inesperado',
      default: 'Error inesperado',
      type: String,
    })
    message: string;
  }
  export class ResponseError {
    @ApiProperty({ default: 422 })
    statusCode: number;
    @ApiProperty({ description: 'Por defecto el valor sera true' })
    error: boolean;
    @ApiProperty({ description: 'Retornará el path del api consumido' })
    path: string;
    @ApiProperty({
      description: 'Hora acorde al servidor en que se realizo la petición',
    })
    timestamp: Date;
    @ApiProperty({ type: MessageError })
    data: MessageError;
  }

  export class ResponseError422 {
    @ApiProperty({ default: 422 })
    statusCode: number;
    @ApiProperty({ description: 'Por defecto el valor sera true' })
    error: boolean;
    @ApiProperty({ description: 'Retornará el path del api consumido' })
    path: string;
    @ApiProperty({
      description: 'Hora acorde al servidor en que se realizo la petición',
    })
    timestamp: Date;
    @ApiProperty({ type: MessageError })
    data: MessageError;
  }
  
  export class ResponseError422String {
    @ApiProperty({ default: 422 })
    statusCode: number;
    @ApiProperty({ description: 'Por defecto el valor sera true' })
    error: boolean;
    @ApiProperty({ description: 'Retornará el path del api consumido' })
    path: string;
    @ApiProperty({
      description: 'Hora acorde al servidor en que se realizo la petición',
    })
    timestamp: Date;
    @ApiProperty()
    data: string;
  }
  
  
  
  export class ResponseBadRequestError {
    @ApiProperty({ default: 400 })
    statusCode: number;
    @ApiProperty({ description: 'Por defecto el valor sera true' })
    error: boolean;
    @ApiProperty({ description: 'Retornará el path del api consumido' })
    path: string;
    @ApiProperty({
      description: 'Hora acorde al servidor en que se realizo la petición',
    })
    timestamp: Date;
    @ApiProperty({ type: [String] })
    data: string[];
  }
  
  export class ResponseError500 {
    @ApiProperty({ default: 500 })
    statusCode: number;
    @ApiProperty({ description: 'Por defecto el valor sera true' })
    error: boolean;
    @ApiProperty({ description: 'Retornará el path del api consumido' })
    path: string;
    @ApiProperty({
      description: 'Hora acorde al servidor en que se realizo la petición',
    })
    timestamp: Date;
    @ApiProperty({ type: MessageError500 })
    data: MessageError500;
  }


  
export class ResponseUnauthorizedAndRoleDto {
  @ApiProperty({ default: 401 })
  statusCode: number;
  @ApiProperty()
  error: boolean;
  @ApiProperty({
      default: 'Your role is wrong',
      type: String,
  })
  data: string;
}
