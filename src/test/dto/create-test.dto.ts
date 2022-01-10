import { ApiProperty } from "@nestjs/swagger";

export class CreateTestDto {

    id: number;
    
    @ApiProperty()
    name: string;
}
