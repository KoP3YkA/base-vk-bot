import {ButtonColorUnion} from "vk-io";

export class Color {

    public static BLUE : ButtonColorUnion = 'primary'
    public static WHITE : ButtonColorUnion = 'secondary'
    public static RED : ButtonColorUnion = 'negative'
    public static GREEN : ButtonColorUnion = 'positive'

    public static findByName(name: string) : Color {
        return name === 'primary' ? this.BLUE :
            name === 'secondary' ? this.WHITE :
                name === 'negative' ? this.RED :
                    name === 'positive' ? this.GREEN : this.WHITE
    }

}