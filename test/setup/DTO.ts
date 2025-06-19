import {IntegerProperty, StringProperty, UserProperty, WordProperty} from "../../src/annotations/dto.params.annotation";
import {User} from "../../src/classes/entities/User";

export class DTO {
    @WordProperty
    public word!: string;

    @UserProperty
    public user!: User;

    @IntegerProperty
    public int!: number;

    @StringProperty
    public str!: string
}