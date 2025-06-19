import {IntegerProperty, StringProperty, UserProperty, WordProperty} from "../../src/annotations/dto.params.annotation";
import {User} from "../../src/classes/entities/User";
import {CommandDtoAdapter} from "../../src/classes/adapter/CommandDtoAdapter";
import {DTO} from "../setup/DTO";

describe("DTO test", () => {
    test("Check DTOs valid", async () => {
        const result = await CommandDtoAdapter.getDto<DTO>(
            DTO,
            ["anyword", "[id123|Test]", "123", "some", "text"]
        )
        expect(result.word).toEqual("anyword")
        expect(result.user.userId).toBe(123)
        expect(result.int).toBe(123)
        expect(result.str).toEqual("some text")
    })

    test("Check DTOs exceptions", async () => {
        let result = await CommandDtoAdapter.getDto<DTO>(
            DTO,
            ["anyword", "[id123|Test]"]
        ).catch(() => null)
        expect(result).toBeNull()

        result = await CommandDtoAdapter.getDto<DTO>(
            DTO,
            ["anyword", "[id123|Test]", "hi", "some"]
        ).catch(() => null)
        expect(result).toBeNull()

        result = await CommandDtoAdapter.getDto<DTO>(
            DTO,
            ["anyword", "Test]", "123", "some"]
        ).catch(() => null)
        expect(result).toBeNull()
    })
})