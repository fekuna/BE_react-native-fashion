import { IsNotEmpty } from 'class-validator';

export class OrderCreateRequest {
  @IsNotEmpty({ message: 'shipping fee cannot be null' })
  shippingFee: number;

  @IsNotEmpty({ message: 'Please add your address' })
  address: string;
}
