import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";

export class walletDetailResponseVm  {
    @ApiProperty()
    id: string;
  
    @ApiProperty()
    ownedBy: string;
  
    @ApiProperty()
    status: string;

    @ApiProperty()
    enableAt: Date;

    @ApiProperty()
    balance: number;

  }

  export class walletPayloadVm  {
    @ApiProperty()
    isDisable: boolean;
  

  }

  export class walletResponseVm {
    @ApiProperty({ type: () => walletDetailResponseVm})
    wallet: walletDetailResponseVm[];
  }